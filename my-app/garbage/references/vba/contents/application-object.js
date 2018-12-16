import React, { Component } from "react";
//import Dropdown from "../../../commons/dropdown";
import Highlight from "react-highlight";
import { events, methods } from "../data/application-object";
import Modal from "../../../commons/modal";

class excelproperties extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentModal: {}
    };
  }

  showModal = item => e => {
    this.setState({
      currentModal: item
    });
  };
  render() {
    const eventtable = events.map((event, index) => {
      return (
        <tr key={index}>
          <td>{event.name}</td>
          <td>{event.description}</td>
          <td>
            <button
              className="btn btn-link"
              data-toggle="modal"
              data-target="#Modal"
              onClick={this.showModal(event)}
            >
              more
            </button>
          </td>
        </tr>
      );
    });
    const methodtable = methods.map((method, index) => {
      return (
        <tr key={index}>
          <td>{method.name}</td>
          <td>{method.description}</td>
          <td>
            <button
              className="btn btn-link"
              data-toggle="modal"
              data-target="#Modal"
              onClick={this.showModal(method)}
            >
              more
            </button>
          </td>
        </tr>
      );
    });
    return (
      <div>
        <Modal content={this.state.currentModal} />
        <h1>Application Object</h1>
        <p>Represents the entire Microsoft Excel application</p>

        {/*Event Section*/}
        <section>
          <h2>Events Reference</h2>
          <p>
            Events are functions triggered by certain occurence of event of an
            Excel application. They are usually defined as follow, notice that
            the instance of application object need to be declared with a
            "WithEvent" keyword and events are defined with a name of [instance
            name]_[event name].
          </p>
          <div className="px-3">
            <Highlight className="vbscript ">{`'Declare myApp
Public WithEvents myApp As Applications

'Involk this function to set myApp to current application
Private Sub myFunction()
    Set myApp = Application
End Sub

'Define AfterCalculate event
Private Sub myApp_AfterCalculate()
  'Function content
End Sub`}</Highlight>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Event</th>
                <th>Description</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>{eventtable}</tbody>
          </table>
          <p>
            Untracked Events :{" "}
            <span className="text-primary">
              WorkbookAddinInstall(), WorkbookAddinUninstall(),
              SheetLensGalleryRenderComplete(), WorkbookAfterXmlExport(),
              WorkbookAfterXmlImport(), WorkbookBeforeXmlExport(),
              WorkbookBeforeXmlImport(), WorkbookPivotTableCloseConnection(),
              WorkbookPivotTableOpenConnection(), WorkbookRowsetComplete(),
              WorkbookModelChange()
            </span>
          </p>
        </section>

        {/*Method Section*/}
        <section>
          <h2>Method Reference</h2>
          <p>Methods are functions triggered manually by vba code.</p>
          <table className="table">
            <thead>
              <tr>
                <th>Method</th>
                <th>Description</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>{methodtable}</tbody>
          </table>
          <p>
            Untracked Methods :{" "}
            <span className="text-primary">
              CalculateUntilAsyncQueriesDone(), DisplayXMLSourcePane(XmlMap)，
              DoubleClick(), GetPhonetic(text), Help()
            </span>
          </p>
        </section>
      </div>
    );
  }
}
export default excelproperties;
