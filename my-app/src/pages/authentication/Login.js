import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser, loginGoogleUser, loginFacebookUser } from "../../actions/authActions";
import classnames from "classnames";
import GoogleLogin from 'react-google-login';
//import FacebookLogin from 'react-facebook-login';
import { withRouter, Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }
  onChange = () => e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = () => e => {
    e.preventDefault();
    this.props.loginUser(this.state);
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  responseFacebook = () => (response)=>{
    console.log("success")
    this.props.loginFacebookUser(response)
  }
  responseSuccessGoogle = () => (response)=>{
    console.log("success")
    this.props.loginGoogleUser(response)
  }
  responseFailGoogle = () => (response)=>{
    console.log("fail")
    console.log(response)
  }
  render() {
    const { errors } = this.props;
    return (
      <div className="login">
      <div className="login__card">
      <div className="login__title">
      <i className="fas fa-shield-alt"></i>
      Log in
      </div>
      <form onSubmit={this.onSubmit()} className="form login__form">
          <div className="formgroup">
            <label htmlFor="email">Email address</label>
            <input
              type="text"
              name="email"
              className={classnames("formcontrol", {
                "is-invalid": errors.email
              })}
              value={this.state.email}
              onChange={this.onChange()}
              placeholder="Enter email"
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <div className="formgroup">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className={classnames("formcontrol", {
                "is-invalid": errors.password
              })}
              value={this.state.password}
              onChange={this.onChange()}
              placeholder="Password"
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <hr/>
          Do not have an account right now? <Link to="/register">Register</Link> now!!
          <button type="submit" className="button--success login-button">
            Login
          </button>
          <hr/>
          <p>Log in with third-party accounts?</p>
          <div className="thirdparty-links">
          <GoogleLogin
            clientId="637487796198-j2rgfbme47eioo2lusoop68fkfd98qav.apps.googleusercontent.com"
            onSuccess={this.responseSuccessGoogle()}
            onFailure={this.responseFailGoogle()}
            uxMode = "popup"
          />
          {/* <FacebookLogin
            appId="384791348986446"
            autoLoad={false}
            size="small"
            fields="name"
            callback={this.responseFacebook()}
          /> */}
            {/* <a href="www.facebook.com" target="_blank">
            <i className="fab fa-facebook"></i><span>FaceBook</span> 
            </a> */}
          </div>
          
        </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  loginGoogleUser: PropTypes.func.isRequired,
  loginFacebookUser:PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser, loginGoogleUser, loginFacebookUser }
)(withRouter(Login));
