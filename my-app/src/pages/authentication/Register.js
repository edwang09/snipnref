import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import { withRouter, Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
        name: "",
        email: "",
        password: "",
        password2: ""
    };
  }
  onChange = () => e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = () => e => {
    e.preventDefault();
    this.props.registerUser(this.state, this.props.history);
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    const { errors } = this.props;
    return (
      <div className="login">
      <div className="login__card">
      <div className="login__title">
      <i className="fas fa-shield-alt"></i>
      Register
      </div>
      <form onSubmit={this.onSubmit()} className="form login__form">
        <div className="formgroup">
            <label htmlFor="email">Nickname</label>
            <input
              type="text"
              name="name"
              className={classnames("formcontrol", {
                "is-invalid": errors.email
              })}
              value={this.state.name}
              onChange={this.onChange()}
              placeholder="Enter your nickname"
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>
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
          
          <div className="formgroup">
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              name="password2"
              className={classnames("formcontrol", {
                "is-invalid": errors.password2
              })}
              value={this.state.password2}
              onChange={this.onChange()}
              placeholder="Confirm Password"
            />
            {errors.password2 && (
              <div className="invalid-feedback">{errors.password2}</div>
            )}
          </div>
          <hr/>
          Already have an account? <Link to="/login">Sign in</Link> now!!
          <button type="submit" className="button--success login-button">
            Register
          </button>
        </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Login));
