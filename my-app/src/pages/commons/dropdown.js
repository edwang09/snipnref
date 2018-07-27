import React, { Component } from "react";

class dropdown extends Component {
  render() {
    const { id, title, description, content } = this.props;
    return (
      <div className="card mb-2">
        <div
          className="card-header curser-pointer"
          id="headingOne"
          data-toggle="collapse"
          data-target={"#collapseOne" + id}
          aria-expanded="true"
          aria-controls={"collapseOne" + id}
        >
          <span className="mb-0">
            <b className="h6">{title}</b> <em>{description}</em>
          </span>
        </div>

        <div
          id={"collapseOne" + id}
          className="collapse"
          aria-labelledby="headingOne"
        >
          <div className="card-body">{content}</div>
        </div>
      </div>
    );
  }
}

export default dropdown;
