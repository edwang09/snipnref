import React, { Component } from "react";
import Project from "./Project";
export default class Projects extends Component {
  render() {
    const { projectlist } = this.props;
    let projectlistRender;
    if (projectlist.length) {
      projectlistRender = projectlist.map((project, id) => {
        return (
          <Project
            project={project}
            projectkey={id}
            loadModal={this.props.loadModal}
            updateProjectStatus={this.props.updateProjectStatus}
            updateProjectNote={this.props.updateProjectNote}
          />
        );
      });
    }
    return <div>{projectlistRender}</div>;
  }
}
