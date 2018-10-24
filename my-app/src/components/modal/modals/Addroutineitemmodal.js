import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "../Modal";
import { hideModal } from "../../../actions/modalActions";
import { addRoutineItem } from "../../../actions/dashboardActions";

export class Addroutineitemmodal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        name: "",
        note: "",
        status: "todo"
      }
    };
  }

  onClose = () => e => {
    this.props.hideModal();
  };
  Add = () => e => {
    const { listkey } = this.props.modal.options;
    const { item } = this.state;
    this.props.addRoutineItem(item, listkey);
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
                id="itemname"
                placeholder="Item name"
                value={this.state.item.name}
                onChange={e =>
                  this.setState({
                    item: { ...this.state.item, name: e.target.value }
                  })
                }
              />
              <textarea
                id="note"
                placeholder="notes"
                className="form-control"
                value={this.state.item.note}
                onChange={e =>
                  this.setState({
                    item: { ...this.state.item, note: e.target.value }
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
  { hideModal, addRoutineItem }
)(Addroutineitemmodal);
