import React, { Component } from "react";
import Highlight from "react-highlight";
class Modal extends Component {
  render() {
    const { name, parameters, remarks, example } = this.props.content;
    let parametersContent, remarksContent, exampleContent;
    if (parameters && parameters.length) {
      const parametersList = parameters.map((param, index) => (
        <p key={index}>
          <b>{param.name}</b> : <em>[{param.type}]</em> {param.description}
        </p>
      ));
      parametersContent = (
        <div>
          <h6>Parameters</h6>
          {parametersList}
        </div>
      );
    } else {
      parametersContent = <div />;
    }
    if (remarks && remarks.length) {
      const remarksList = remarks.map((remark, index) => (
        <p key={index}>{remark}</p>
      ));
      remarksContent = (
        <div>
          <h6>Remarks</h6>
          {remarksList}
        </div>
      );
    } else {
      remarksContent = <div />;
    }
    if (example) {
      exampleContent = (
        <div>
          <h6>Example</h6>
          <Highlight className="vbscript">{example}</Highlight>
        </div>
      );
    } else {
      exampleContent = <div />;
    }
    return (
      <div
        className="modal fade"
        id="Modal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="Modal">
                {name}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {parametersContent}
              {remarksContent}
              {exampleContent}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
