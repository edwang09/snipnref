import React, { Component } from "react";
class Routineitem extends Component {
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
      <div className="routine__item">
        <p className="item__title">
          {item.name}
          <span
            className={"routine__toggle " + item.status}
            onClick={this.toggleStatus()}
          >
            {item.status}
          </span>
          <span className="routine__delete">
            <small
              onClick={() =>
                loadModal("CONFIRM_MODAL", {
                  listkey,
                  itemkey
                })
              }
            >
              <i className="far fa-trash-alt" />
            </small>
          </span>
        </p>
        <p>{item.note}</p>
      </div>
    );
  }
}
export default Routineitem;
