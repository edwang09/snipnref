import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import { withRouter } from "react-router-dom";

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
  render() {
    const { errors } = this.props;
    return (
      <div className="login">
      <div className="login__card">
      <div className="login__title">
      <i class="fas fa-shield-alt"></i>
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
          <button type="submit" className="button--success">
            Login
          </button>
        </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
