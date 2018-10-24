import React, { Component } from "react";
import Taskitem from "./taskitem";
class Tasklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adding: false,
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
            <Taskitem
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
            <Taskitem
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
    const addingRender = (
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-sm"
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
            className="form-control form-control-sm"
            value={this.state.item.note}
            onChange={e =>
              this.setState({
                item: { ...this.state.item, note: e.target.value }
              })
            }
          />
        </div>
      </form>
    );
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
        {this.state.adding && addingRender}
      </div>
    );
  }
}
export default Tasklist;
