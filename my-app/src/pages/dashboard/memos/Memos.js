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
        <h4>
          Memos
          <span className="action" onClick={this.savememos()}>
            <i className="far fa-save" />
          </span>
        </h4>
        <div className="row">
          <div className="col-md-4 item">
            <h5>Memo</h5>
            <div className="form-group">
              <textarea
                className="form-control"
                rows="5"
                id="memo"
                value={this.state.memo}
                onChange={e => this.setState({ memo: e.target.value })}
              />
            </div>
          </div>
          <div className="col-md-4 item">
            <h5>Idea</h5>
            <div className="form-group">
              <textarea
                className="form-control"
                rows="5"
                id="idea"
                value={this.state.idea}
                onChange={e => this.setState({ idea: e.target.value })}
              />
            </div>
          </div>
          <div className="col-md-4 item">
            <h5>Curiosity</h5>
            <div className="form-group">
              <textarea
                className="form-control"
                rows="5"
                id="curiosity"
                value={this.state.curiosity}
                onChange={e => this.setState({ curiosity: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Memos;
