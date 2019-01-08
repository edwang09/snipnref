import React, { Component } from "react";

export default class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: ""
    };
  }
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
  componentWillMount() {
    const { project } = this.props;
    this.setState({ note: project.note });
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.project !== prevProps.project) {
      this.setState({ note: this.props.project.note });
    }
  }
  savenote = () => e => {
    const { projectkey } = this.props;
    const { note } = this.state;
    this.props.updateProjectNote(note, projectkey);
  };
  render() {
    const { project, projectkey } = this.props;
    const urlRender = project.urls.map(site => {
      return (
        <div className="site">
          <a href={site.url} target="_blank" rel="noopener noreferrer">
            <strong>{site.name}</strong>
          </a>
          <small>{site.description}</small>
        </div>
      );
    });
    return (
      <div className="project">
        <h4>
          {project.name}
          <span
            className={"status " + project.status}
            onClick={this.toggleStatus()}
          >
            {project.status}
          </span>
          <span
            className="edit"
            onClick={() =>
              this.props.loadModal("EDITPROJECT_MODAL", { projectkey })
            }
          >
            <i className="far fa-edit" />
          </span>
          <span className="save" onClick={this.savenote()}>
            <i className="far fa-save" />
          </span>
        </h4>
        <small> created on: {project.createdate}</small>
        <p>{project.description}</p>
        <div className="project__row">
          <div className="project__url">
          <h4>
            Related URLs
          </h4>
          {urlRender}
          </div>
          <div className="project__note">
            <label htmlFor="comment">Notes:</label>
            <textarea
              rows="9"
              id="note"
              value={this.state.note}
              onChange={e => this.setState({ note: e.target.value })}
            />
          </div>
        </div>
      </div>
    );
  }
}
