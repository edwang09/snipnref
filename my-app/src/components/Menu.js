import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../actions/authActions";
import classNames from 'classnames';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slideOpen: false,
      applicationDropdownOpen: false,
      authDropdownOpen: false
    };
  }

  toggleSlide = () => (e) => {
    console.log(this.state.slideOpen)
    this.setState({slideOpen:!this.state.slideOpen})
  }  
  toggleDropdown = (dropdown) => (e) => {
    if (dropdown==="applications"){
      this.setState({applicationDropdownOpen:!this.state.applicationDropdownOpen})
    }else if (dropdown==="auth"){
      this.setState({authDropdownOpen:!this.state.authDropdownOpen})
    }
  }


  render() {
    const { auth } = this.props;
    const guestLink = (
      <ul className="navbar__auth">
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Owner Login
        </Link>
        </li>
      </ul>
    );
    const userLink = (
      <ul className="navbar__auth">


        <li className="nav-item dropdown">
          <p className="nav-link" onClick={this.toggleDropdown("applications")}>{auth.user.name}</p>
          <div className={classNames("dropdown-content",{"dropdown-open":this.state.applicationDropdownOpen})}>
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
            <a className="nav-link" onClick={this.props.logoutUser}>
              Log out
            </a>
          </div>
        </li>
      </ul>
    );
    return (
      <nav className="navbar">
          <div className="navbar__toggle" onClick={this.toggleSlide()}>
                <svg width="30" height="30">
                    <path d="M0,5 30,5" stroke="#333" strokeWidth="5"/>
                    <path d="M0,14 30,14" stroke="#333" strokeWidth="5"/>
                    <path d="M0,23 30,23" stroke="#333" strokeWidth="5"/>
                </svg>
          </div>
          <Link to="/" className="navbar__brand">
            Yoshio Space
          </Link>
          <div className={classNames("navbar__menu",{"sidebar-open":this.state.slideOpen})}>
            <ul className="navbar__nav">
              <a  className="btn-close" onClick={this.toggleSlide()}>&times;</a>
              <li className="nav-item dropdown">
                <p className="nav-link" onClick={this.toggleDropdown("applications")}>Applications</p>
                <div className={classNames("dropdown-content",{"dropdown-open":this.state.applicationDropdownOpen})}>
                  <Link className="nav-link" to="/demos/vote">
                    Voter App
                  </Link>
                  <Link className="nav-link" to="/demos/bazi">
                    Destiny App
                  </Link>
                  <Link className="nav-link" to="/demos/lunarcalendar">
                    Lunar Calendar
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About me
                </Link>
              </li>
            </ul>
            {auth.isAuthenticated ? userLink : guestLink}
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
