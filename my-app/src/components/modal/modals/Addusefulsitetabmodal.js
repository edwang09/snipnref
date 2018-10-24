import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "../Modal";
import { hideModal } from "../../../actions/modalActions";
import { addUsefulsitetab } from "../../../actions/dashboardActions";

export class Addusefulsitetabmodal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: {
        name: "",
        description: "",
        content: []
      }
    };
  }

  onClose = () => e => {
    this.props.hideModal();
  };
  Add = () => e => {
    const { category } = this.state;
    this.props.addUsefulsitetab(category);
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
  { hideModal, addUsefulsitetab }
)(Addusefulsitetabmodal);
