import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "../Modal";
import { hideModal } from "../../../actions/modalActions";
import {
  removeRoutineItem,
  removeUsefulsiteItem
} from "../../../actions/dashboardActions";

export class Confirmmodal extends Component {
  onClose = () => e => {
    this.props.hideModal();
  };
  Delete = () => e => {
    const { listkey, itemkey, tabkey, urlkey } = this.props.modal.options;
    if (listkey !== undefined && itemkey !== undefined) {
      this.props.removeRoutineItem(itemkey, listkey);
    } else if (tabkey !== undefined && urlkey !== undefined) {
      this.props.removeUsefulsiteItem(urlkey, tabkey);
    }
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
  { hideModal, removeRoutineItem, removeUsefulsiteItem }
)(Confirmmodal);
