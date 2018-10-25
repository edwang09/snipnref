import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "../Modal";
import { hideModal } from "../../../actions/modalActions";
import { editUsefulsitetab } from "../../../actions/dashboardActions";

export class Editusefulsitetabmodal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: {
        name: "",
        description: ""
      }
    };
  }
  componentWillMount() {
    this.setState({
      category: this.props.dashboard.usefulsites[
        this.props.modal.options.tabkey
      ]
    });
  }
  onClose = () => e => {
    this.props.hideModal();
  };
  edit = () => e => {
    const { category } = this.state;
    this.props.editUsefulsitetab(category, this.props.modal.options.tabkey);
    this.props.hideModal();
  };

  render() {
    return (
      <Modal onClose={this.onClose} title="Confirmation">
        <div className="">
          <h5>Are you sure you want to make this update?</h5>
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Category name"
                value={this.state.category.name}
                onChange={e =>
                  this.setState({
                    category: { ...this.state.category, name: e.target.value }
                  })
                }
              />
              <textarea
                id="description"
                placeholder="descriptions"
                className="form-control"
                value={this.state.category.description}
                onChange={e =>
                  this.setState({
                    category: {
                      ...this.state.category,
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
  { hideModal, editUsefulsitetab }
)(Editusefulsitetabmodal);
