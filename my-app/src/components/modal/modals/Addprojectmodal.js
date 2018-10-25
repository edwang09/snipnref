import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "../Modal";
import { hideModal } from "../../../actions/modalActions";
import { addProject } from "../../../actions/dashboardActions";

export class Addprojectmodal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {
        name: "",
        description: ""
      }
    };
  }

  onClose = () => e => {
    this.props.hideModal();
  };
  Add = () => e => {
    const { project } = this.state;
    const createdate = new Date();
    this.props.addProject({
      ...project,
      createdate,
      status: "todo",
      urls: [],
      note: ""
    });
    this.props.hideModal();
  };

  render() {
    return (
      <Modal onClose={this.onClose} title="Confirmation">
        <div className="">
          <h5>Are you sure you want to Add this item from the list?</h5>
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
          </form>
        </div>
        <hr />
        <div className="clear-fix" />
        <div className="float-right">
          <button className="btn btn-danger" onClick={this.Add()}>
            Add
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
  modal: state.modal
});

export default connect(
  mapStateToProps,
  { hideModal, addProject }
)(Addprojectmodal);
