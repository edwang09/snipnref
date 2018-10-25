import React, { Component } from "react";
import Routineitem from "./Routineitem";
class Routinelist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        name: "",
        note: ""
      }
    };
  }
  render() {
    const { itemlist, title, loadModal, listkey } = this.props;
    let itemlistRender;
    if (itemlist.length) {
      itemlistRender = itemlist.map((item, id) => {
        if (id === 0) {
          return (
            <Routineitem
              item={item}
              itemkey={id}
              updateRoutineStatus={this.props.updateRoutineStatus}
              listkey={this.props.listkey}
              loadModal={this.props.loadModal}
            />
          );
        }
        return (
          <div>
            <hr />
            <Routineitem
              item={item}
              itemkey={id}
              updateRoutineStatus={this.props.updateRoutineStatus}
              listkey={this.props.listkey}
              loadModal={this.props.loadModal}
            />
          </div>
        );
      });
    }
    return (
      <div className="routinelist">
        <h5>{title}</h5>
        <span
          className="action"
          onClick={() => loadModal("ADDROUTINEITEM_MODAL", { listkey })}
        >
          <i class="fas fa-plus" />
        </span>
        <div className="itemlist">{itemlistRender}</div>
      </div>
    );
  }
}
export default Routinelist;
