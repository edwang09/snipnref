import React, { Component } from "react";
import { loadModal } from "../../../actions/modalActions";

class Taskitem extends Component {
  toggleStatus = () => e => {
    const { listkey, itemkey, item, updateRoutineStatus } = this.props;
    switch (item.status) {
      case "todo":
        updateRoutineStatus(itemkey, listkey, "working");
        break;

      case "working":
        updateRoutineStatus(itemkey, listkey, "done");
        break;

      case "done":
        updateRoutineStatus(itemkey, listkey, "skip");
        break;

      case "skip":
        updateRoutineStatus(itemkey, listkey, "todo");
        break;

      default:
        break;
    }
  };
  render() {
    const { item, loadModal, listkey, itemkey } = this.props;
    return (
      <div className="item">
        <p>
          {item.name}
          <span
            className={"status " + item.status}
            onClick={this.toggleStatus()}
          >
            {item.status}
          </span>
          <span className="action">
            <small
              onClick={() =>
                this.props.loadModal("CONFIRM_MODAL", {
                  listkey,
                  itemkey
                })
              }
            >
              <i class="far fa-trash-alt" />
            </small>
          </span>
        </p>
        <small>{item.note}</small>
      </div>
    );
  }
}
export default Taskitem;
