import React, { Component } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import PropTypes from "prop-types";

class ItemList extends Component {
  //when u bring in an action, it gets stored as a prop

  state = {
    modal: false,
    lyrics: "",
    songName: ""
  };

  static propTypes = {
    getItems: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = id => {
    console.log("Gonna delete this!: " + id);
    this.props.deleteItem(id);
  };

  changeModalState(item, songName) {
    this.setState({
      modal: !this.state.modal,
      lyrics: item,
      songName: songName
    });
  }

  closetoggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    const { items } = this.props.item;

    const listStyle = {
      backgroundColor: "rgba(230, 230, 230, 0.8)"
    };

    const divStyle = {
      backgroundColor: "rgb(248, 249, 250)",
      margin: "5px",
      paddingTop: "10px",
      paddingBottom: "10px"
    };

    const imageStyle = {
      alignSelf: "center"
    };

    const imgStyle = {
      width: "150px",
      height: "150px"
    };

    const songArtistStyle = {
      marginTop: "20px",
      fontWeight: "100"
    };

    return (
      <React.Fragment>
        <Container>
          <ListGroup>
            <TransitionGroup className="item-list">
              {items.map(
                ({ _id, songName, artistName, songLyrics, songImageArt }) => (
                  <CSSTransition key={_id} timeout={500} classNames="fade">
                    <ListGroupItem style={listStyle}>
                      <div className="row" style={divStyle}>
                        <div
                          className="col-md-2 col-sm-2 col-xs2"
                          style={imageStyle}
                        >
                          <img
                            src={songImageArt}
                            alt="Song Album Art"
                            style={imgStyle}
                            className="rounded mx-auto d-block img-thumbnail"
                            width="150px"
                            height="150px"
                          />
                        </div>
                        <div
                          className="col-md-8 col-sm-8 col-xs-8"
                          style={imageStyle}
                        >
                          <h5 style={songArtistStyle}>{songName}</h5>
                          <h6>
                            {"by "} {artistName}
                          </h6>
                        </div>
                        <div className="col-md col-sm col-xs">
                          <div
                            className="col-md-2 col-sm-2 col-xs-2"
                            style={imageStyle}
                          >
                            <Button
                              color="dark"
                              style={{
                                marginBottom: "2rem",
                                marginTop: "1rem"
                              }}
                              onClick={() =>
                                this.changeModalState(songLyrics, songName)
                              }
                            >
                              View lyrics
                            </Button>
                          </div>

                          <div
                            className="col-md-2 col-sm-2 col-xs-2"
                            style={imageStyle}
                          >
                            {this.props.isAuthenticated ? (
                              <Button
                                className="remove-btn"
                                color="danger"
                                size="xs-2"
                                margin="10px"
                                onClick={this.onDeleteClick.bind(this, _id)}
                              >
                                &times;
                              </Button>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </ListGroupItem>
                  </CSSTransition>
                )
              )}
            </TransitionGroup>
          </ListGroup>
        </Container>

        <div>
          <Modal isOpen={this.state.modal}>
            <ModalHeader toggle={this.closetoggle}>
              {this.state.songName} Lyrics
            </ModalHeader>
            <ModalBody>
              <p>{this.state.lyrics}</p>
            </ModalBody>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  //follow the reducer in index.js for item:
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

// allows us to take the item state and turn/map this into a component property
export default connect(mapStateToProps, { getItems, deleteItem })(ItemList);
