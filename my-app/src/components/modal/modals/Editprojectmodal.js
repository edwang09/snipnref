import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "../Modal";
import { hideModal } from "../../../actions/modalActions";
import { editProject } from "../../../actions/dashboardActions";

export class Editprojectmodal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {
        name: "",
        description: "",
        urls: []
      }
    };
  }

  componentWillMount() {
    this.setState({
      project: this.props.dashboard.projects[
        this.props.modal.options.projectkey
      ]
    });
  }
  onClose = () => e => {
    this.props.hideModal();
  };
  edit = () => e => {
    const { project } = this.state;
    const { projectkey } = this.props.modal.options;
    this.props.editProject(project, projectkey);
    this.props.hideModal();
  };

  render() {
    const urlsRender = this.state.project.urls.map((url, id) => {
      return (
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id={"name" + id}
            placeholder="site name"
            value={this.state.project.urls[id].name}
            onChange={e => {
              const newurls = this.state.project.urls.map((item, iid) => {
                if (iid === id) {
                  return { ...item, name: e.target.value };
                }
                return item;
              });
              this.setState({
                project: { ...this.state.project, urls: newurls }
              });
            }}
          />
          <input
            type="text"
            className="form-control"
            id={"url" + id}
            placeholder="site url"
            value={this.state.project.urls[id].url}
            onChange={e => {
              const newurls = this.state.project.urls.map((item, iid) => {
                if (iid === id) {
                  return { ...item, url: e.target.value };
                }
                return item;
              });
              this.setState({
                project: { ...this.state.project, urls: newurls }
              });
            }}
          />
          <textarea
            id={"description" + id}
            placeholder="description"
            className="form-control"
            value={this.state.project.urls[id].description}
            onChange={e => {
              const newurls = this.state.project.urls.map((item, iid) => {
                if (iid === id) {
                  return { ...item, description: e.target.value };
                }
                return item;
              });
              this.setState({
                project: { ...this.state.project, urls: newurls }
              });
            }}
          />
        </div>
      );
    });
    return (
      <Modal onClose={this.onClose} title="Confirmation">
        <div className="">
          <h5>Are you sure you want to edit this item from the list?</h5>
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="project name"
                value={this.state.project.name}
                onChange={e =>
                  this.setState({
                    project: { ...this.state.project, name: e.target.value }
                  })
                }
              />
              <textarea
                id="description"
                placeholder="description"
                className="form-control"
                value={this.state.project.description}
                onChange={e =>
                  this.setState({
                    project: {
                      ...this.state.project,
                      description: e.target.value
                    }
                  })
                }
              />
            </div>
            {urlsRender}
          </form>
        </div>
        <hr />
        <div className="clear-fix" />
        <div className="float-right">
          <button className="btn btn-danger" onClick={this.edit()}>
            Update
          </button>
          <button className="btn btn-primary ml-2" onClick={this.onClose()}>
            Cancel
          </button>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.modal,
  dashboard: state.dashboard
});

export default connect(
  mapStateToProps,
  { hideModal, editProject }
)(Editprojectmodal);
