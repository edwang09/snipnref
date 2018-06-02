import React, { Component } from "react";
import { Popover } from "antd";
import axios from "axios";
import classnames from "classnames";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }
  onChange = () => e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = () => e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    axios
      .post("/api/users/register", newUser)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }));
  };
  render() {
    const { errors } = this.state;
    const content = (
      <div>
        <form onSubmit={this.onSubmit()} className="needs-validation">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">User Name</label>
            <input
              type="text"
              name="name"
              className={classnames("form-control", {
                "is-invalid": errors.name
              })}
              value={this.state.name}
              onChange={this.onChange()}
              placeholder="Enter name"
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Your Email</label>
            <input
              type="email"
              name="email"
              className={classnames("form-control", {
                "is-invalid": errors.email
              })}
              value={this.state.email}
              onChange={this.onChange()}
              placeholder="email"
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
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Confirm Password</label>
            <input
              type="password"
              name="password2"
              className={classnames("form-control", {
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
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    );
    return (
      <Popover
        overlayStyle={{ width: "20rem" }}
        content={content}
        title="Register"
        trigger="click"
      >
        <a className="nav-link">Register</a>
      </Popover>
    );
  }
}

export default Register;
