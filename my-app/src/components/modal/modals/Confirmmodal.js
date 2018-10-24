import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "../Modal";
import { hideModal } from "../../../actions/modalActions";
import { removeRoutineItem } from "../../../actions/dashboardActions";

export class Confirmmodal extends Component {
  constructor(props) {
    super(props);
  }

  onClose = () => e => {
    this.props.hideModal();
  };
  Delete = () => e => {
    const { listkey, itemkey } = this.props.modal.options;
    this.props.removeRoutineItem(itemkey, listkey);
    this.props.hideModal();
  };

  render() {
    return (
      <Modal onClose={this.onClose} title="Confirmation">
        <div className="">
          <h5>Are you sure you want to delete this item from the list?</h5>
        </div>
        <hr />
        <div className="clear-fix" />
        <div className="float-right">
          <button className="btn btn-danger" onClick={this.Delete()}>
            Delete
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
  { hideModal, removeRoutineItem }
)(Confirmmodal);
