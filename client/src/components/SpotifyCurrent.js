import React, { Component } from "react";
import { Button } from "reactstrap";
import { getLyrics, getCurrentLyrics } from "../actions/lyricsActions";
import { addItem } from "../actions/itemActions";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearErrors } from "../actions/errorActions";

import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class SpotifyCurrent extends Component {
  static propTypes = {
    getLyrics: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    lyrics: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    addItem: PropTypes.func.isRequired
  };

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }

    return hashParams;
  }

  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: {
        name: "Not Checked",
        albumArt: "",
        artistName: "Not Checked"
      }
    };
  }

  getNowPlaying() {
    this.props.clearErrors();
    spotifyApi
      .getMyCurrentPlaybackState()
      .then(response => {
        this.setState({
          nowPlaying: {
            name: response.item.name,
            albumArt: response.item.album.images[0].url,
            artistName: response.item.artists[0].name
          }
        });
        var nowPlayingC = {
          name: response.item.name,
          artistName: response.item.artists[0].name
        };
        //console.log(nowPlayingC);
        this.props.getCurrentLyrics(nowPlayingC);
      })
      .catch(err => {
        this.setState({
          nowPlaying: {
            name: "-",
            albumArt: "",
            artistName: "-"
          }
        });
        var nowPlayingC = {
          name: "",
          artistName: ""
        };
        //console.log(nowPlayingC);
        this.props.getCurrentLyrics(nowPlayingC);
      });
  }

  addToDB() {
    var newRecord = {
      songName: this.state.nowPlaying.name,
      artistName: this.state.nowPlaying.artistName,
      songImageArt: this.state.nowPlaying.albumArt,
      songLyrics: this.props.lyrics.lyrics
    };

    this.props.addItem(newRecord);

    if (this.props.item.items) alert("Song successfully saved in database!");
    else alert("Error! Unable to save song in database");
  }

  render() {
    const logo = require("./no_lyric.png");

    return (
      <div className="SpotifyPlayer">
        {!this.state.loggedIn && (
          <Button href="https://damp-ravine-93319.herokuapp.com/api/spotify">
            Login to Spotify{" "}
          </Button>
        )}
        <div>
          <img
            src={this.state.nowPlaying.albumArt}
            style={{ height: 150 }}
            alt="Album Art"
            onError={e => {
              e.target.onerror = null;
              e.target.src = String(logo);
            }}
          />
        </div>
        <div>Now Playing: {this.state.nowPlaying.name}</div>
        <div>Artist: {this.state.nowPlaying.artistName}</div>
        {this.state.loggedIn && (
          <button
            className="btn-success btn"
            style={{
              marginTop: "1rem"
            }}
            onClick={() => this.getNowPlaying()}
          >
            Check Now Playing
          </button>
        )}

        {this.props.error.status ? (
          ""
        ) : (
          <div>
            {this.props.isAuthenticated ? (
              <button
                className="btn-success btn"
                style={{
                  marginTop: "1rem"
                }}
                onClick={() => this.addToDB()}
              >
                Save
              </button>
            ) : (
              <button
                className="btn-success btn"
                style={{
                  marginTop: "1rem"
                }}
                onClick={() => this.addToDB()}
                disabled="disabled"
              >
                Save
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  //follow the reducer in index.js for item:
  lyrics: state.lyrics,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  item: state.item
});

// allows us to take the item state and turn/map this into a component property
export default connect(mapStateToProps, {
  getLyrics,
  getCurrentLyrics,
  clearErrors,
  addItem
})(SpotifyCurrent);
