import React, { Component } from "react";
import { Link } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../actions/authActions";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { auth } = this.props;
    const guestLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Login />
        </li>
        <li className="nav-item">
          <Register />
        </li>
      </ul>
    );
    const userLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link"> Welcome back! </a>
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            id="authDropdown"
            data-toggle="dropdown"
          >
            <b>{auth.user.name}</b>
          </a>
          <div className="dropdown-menu" aria-labelledby="authDropdown">
            <a className="dropdown-item">Actions</a>
            <a className="dropdown-item" onClick={this.props.logoutUser}>
              Log out
            </a>
          </div>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Snip and Ref
          </Link>
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="authDropdown"
                  data-toggle="dropdown"
                >
                  <b>Snippets</b>
                </a>
                <div className="dropdown-menu" aria-labelledby="authDropdown">
                  <Link className="dropdown-item" to="/snippets/vba/getstart">
                    VBA
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="/snippets/reactjs/getstart"
                  >
                    React.js
                  </Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="authDropdown"
                  data-toggle="dropdown"
                >
                  <b>References</b>
                </a>
                <div className="dropdown-menu" aria-labelledby="authDropdown">
                  <Link className="dropdown-item" to="/references/vba/getstart">
                    VBA
                  </Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="authDropdown"
                  data-toggle="dropdown"
                >
                  <b>Packages</b>
                </a>
                <div className="dropdown-menu" aria-labelledby="authDropdown">
                  <Link
                    className="dropdown-item"
                    to="/packages/reactjs/getstart"
                  >
                    React.js
                  </Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="authDropdown"
                  data-toggle="dropdown"
                >
                  <b>Business Demos</b>
                </a>
                <div className="dropdown-menu" aria-labelledby="authDropdown">
                  <Link className="dropdown-item" to="/demos/bazi">
                    生辰八字
                  </Link>
                  <Link className="dropdown-item" to="/demos/vote">
                    Public Voter
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  About
                </Link>
              </li>
            </ul>
            {auth.isAuthenticated ? userLink : guestLink}
          </div>
        </div>
      </nav>
    );
  }
}
Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
