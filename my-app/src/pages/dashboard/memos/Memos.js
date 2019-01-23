import React, { Component } from "react";

class Memos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memo: "",
      idea: "",
      curiosity: ""
    };
  }

  savememos = () => e => {
    this.props.updateMemos(this.state);
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.memos !== this.props.memos) {
      //Perform some operation
      this.setState({ ...nextProps.memos });
    }
  }
  render() {
    return (
      <div>
        <h2>
          Memos
          <span className="save" onClick={this.savememos()}>
            <i className="far fa-save" />
          </span>
        </h2>
        <div className="memo__row">
          <div  className="memo__card">
            <h4>Memo</h4>
              <textarea
                rows="9"
                id="memo"
                value={this.state.memo}
                onChange={e => this.setState({ memo: e.target.value })}
              />
          </div>
          <div  className="memo__card">
            <h4>Idea</h4>
              <textarea
                rows="9"
                id="idea"
                value={this.state.idea}
                onChange={e => this.setState({ idea: e.target.value })}
              />
          </div>
          <div  className="memo__card">
            <h4>Curiosity</h4>
              <textarea
                rows="9"
                id="curiosity"
                value={this.state.curiosity}
                onChange={e => this.setState({ curiosity: e.target.value })}
              />
            </div>
        </div>
      </div>
    );
  }
}
export default Memos;
