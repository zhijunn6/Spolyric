import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  NavLink,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";

class AppNavbar extends Component {
  state = {
    isOpen: false,
    showModal: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  handleToggleModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    let showModal = () => this.setState({ addItem: false });

    const max_style = {
      padding: "20px 10px 20px 10px"
    };

    const ar_style = {
      cursor: "pointer"
    };

    const yeet = {
      fontWeight: "100"
    };

    const authLinks = (
      <Fragment>
        <NavItem id="PopoverLegacy">
          <span className="navbar-text mr-3" style={ar_style}>
            <strong>{user ? `Welcome ${user.name}` : ""}</strong>
          </span>
          <UncontrolledPopover
            trigger="legacy"
            placement="bottom"
            target="PopoverLegacy"
          >
            <PopoverHeader>Account Details</PopoverHeader>
            <PopoverBody style={max_style}>
              {user ? `User ID: ${user._id}` : ""} <br />
              {user ? `Name: ${user.name}` : ""} <br />
              {user ? `Email: ${user.email}` : ""}
            </PopoverBody>
          </UncontrolledPopover>
        </NavItem>
        <NavItem>
          <NavLink href="/history">History</NavLink>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="http://localhost:5000/api/spotify" style={yeet}>
              Spolyric, Spotify + Lyrics!
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavbar);
