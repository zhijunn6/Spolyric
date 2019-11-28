import React, { Component } from "react";
import { Container } from "reactstrap";
import { getCurrentLyrics } from "../actions/lyricsActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class DisplayLyrics extends Component {
  static propTypes = {
    getCurrentLyrics: PropTypes.func.isRequired,
    lyrics: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getCurrentLyrics();
  }

  onScanClick = () => {
    console.log("Pressed!");
  };

  render() {
    console.log(this.props.error.status);
    const { lyrics } = this.props.lyrics;
    const image2 = require("./check_lyric.png");

    const banjjak = {
      backgroundColor: "rgb(248, 249, 250)",
      margin: "5px",
      paddingTop: "10px",
      paddingBottom: "10px"
    };

    return (
      <Container className="Lyrics">
        {this.props.error.status ? (
          <div>
            <img
              src={image2}
              alt="Check Image"
              width="500px"
              height="500px"
            ></img>
            <div>No lyrics found!</div>
            <div>Hmm... Did you open Spotify? :o</div>
          </div>
        ) : (
          <div style={banjjak}>{lyrics}</div>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  //follow the reducer in index.js for item:
  lyrics: state.lyrics,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

// allows us to take the item state and turn/map this into a component property
export default connect(mapStateToProps, { getCurrentLyrics })(DisplayLyrics);
