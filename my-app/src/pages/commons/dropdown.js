import React, { Component } from "react";

class dropdown extends Component {
  render() {
    const { id, title, description, content } = this.props;
    return (
      <div class="card mb-2">
        <div
          class="card-header curser-pointer"
          id="headingOne"
          data-toggle="collapse"
          data-target={"#collapseOne" + id}
          aria-expanded="true"
          aria-controls={"collapseOne" + id}
        >
          <span class="mb-0">
            <b class="h6">{title}</b> <em>{description}</em>
          </span>
        </div>

        <div
          id={"collapseOne" + id}
          class="collapse"
          aria-labelledby="headingOne"
        >
          <div class="card-body">{content}</div>
        </div>
      </div>
    );
  }
}

export default dropdown;
