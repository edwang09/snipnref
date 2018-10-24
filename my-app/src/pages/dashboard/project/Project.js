import React, { Component } from "react";

export default class Project extends Component {
  toggleStatus = () => e => {
    const { projectkey, project, updateProjectStatus } = this.props;
    switch (project.status) {
      case "todo":
        updateProjectStatus(projectkey, "working");
        break;

      case "working":
        updateProjectStatus(projectkey, "done");
        break;

      case "done":
        updateProjectStatus(projectkey, "skip");
        break;

      case "skip":
        updateProjectStatus(projectkey, "todo");
        break;

      default:
        break;
    }
  };
  render() {
    const { project } = this.props;
    const urlRender = project.urls.map(site => {
      return (
        <div className="site">
          <a href={site.url} target="_blank">
            <strong>{site.name}</strong>
          </a>
          <small>{site.description}</small>
        </div>
      );
    });
    return (
      <div className="project">
        <h5>
          {project.name}
          <span
            className={"status " + project.status}
            onClick={this.toggleStatus()}
          >
            {project.status}
          </span>
          <span className="action">
            <i class="far fa-edit" />
          </span>
        </h5>
        <small> created on: {project.createdate}</small>
        <p>{project.description}</p>
        <div className="row">
          <div className="col-md-3 urls">{urlRender}</div>
          <div className="col-md-9 form-group">
            <label for="comment">Notes:</label>
            <textarea
              className="form-control"
              rows="5"
              id="note"
              value={project.note}
            />
          </div>
        </div>
      </div>
    );
  }
}
