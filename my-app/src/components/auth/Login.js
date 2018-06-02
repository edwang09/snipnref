import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Popover } from "antd";
import classnames from "classnames";
import { loginUser } from "../../actions/authActions";

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

  render() {
    const { errors } = this.props;
    const content = (
      <div>
        <form onSubmit={this.onSubmit()}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              name="email"
              className={classnames("form-control", {
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
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              name="password"
              className={classnames("form-control", {
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
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
    return (
      <Popover
        overlayStyle={{ width: "20rem" }}
        content={content}
        title="Login"
        trigger="click"
      >
        <a className="nav-link">Login</a>
      </Popover>
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

export default connect(mapStateToProps, { loginUser })(Login);
