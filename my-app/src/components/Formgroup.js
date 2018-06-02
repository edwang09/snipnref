import React from "react";
import classnames from "classnames";

export default () => {
  return (
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
      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
    </div>
  );
};
