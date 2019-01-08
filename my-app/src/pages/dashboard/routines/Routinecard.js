import React, { Component } from "react";
import Routineitem from "./Routineitem";
class Routinecard extends Component {
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
    const { itemcard, title, loadModal, cardkey } = this.props;
    let itemcardRender;
    if (itemcard.length) {
      itemcardRender = itemcard.map((item, id) => {
        if (id === 0) {
          return (
            <Routineitem
              item={item}
              itemkey={id}
              key={id}
              updateRoutineStatus={this.props.updateRoutineStatus}
              listkey={this.props.listkey}
              loadModal={this.props.loadModal}
            />
          );
        }
        return (
          <div
          key={id}>
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
      <div
      className="routine__card">
        <h4>{title}</h4>
        <span
          className="routine__add"
          onClick={() => loadModal("ADDROUTINEITEM_MODAL", { cardkey })}
        >
          <i className="fas fa-plus" />
        </span>
        <div className="routine__list">{itemcardRender}</div>
      </div>
    );
  }
}
export default Routinecard;
