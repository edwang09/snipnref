import React, { Component } from "react";
import Highlight from "react-highlight";

class reactform extends Component {
  render() {
    return (
      <div className="container">
        <p className="display-4">Three ways of Creating Form in React.js</p>
        <p className="lead">
          In react JS there are countless way of creating a form. I am going to
          summarize three basic ways of creating a fully functional form from
          the easiest to the hardest and discuss there pros and cons.
        </p>
        <p className="h4">DOM Form</p>
        <p>
          DOM API is a very underestimated tool in building form. This method is
          very suitable for creating simple form with minimum interactions.
        </p>
        <p>
          Besides a function to handle Submit of the form, we need another
          custom function to parse and transform FormData from the form into
          javascript objects. The following function is an example of this:
        </p>
        <Highlight className="javascript">
          {`
  stringifyFormData(fd) {
    const data = {};
    for (let key of fd.keys()) {
      data[key] = fd.get(key);
    }
    /*
      perform Data transformations here
    */
    return JSON.stringify(data, null, 2);
  }
`}
        </Highlight>
        <p>
          And each input tag will need to have a <strong>name</strong> property
          to indicate the property name of that field. By doing so, the only
          thing left to do is render the form like in plain HTML.
        </p>
        <Highlight className="javascript">{`
import React, { Component } from "react";
class MyForm extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  stringifyFormData(fd) {
    const data = {};
    for (let key of fd.keys()) {
      data[key] = fd.get(key);
    }
    /*
      perform Data transformations here
    */
    return JSON.stringify(data, null, 2);
  }
  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(this.stringifyFormData(data));
    const parsedData = this.stringifyFormData(data)

    fetch("/api/form-submit-url", {
      method: "POST",
      body: parsedData
    });
  }

  render() {
    return (
      <form className="text-left container m-5" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Enter username</label>
          <input
            id="username"
            name="username"
            type="text"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <button type="submit">Send data!</button>
        </div>
      </form>
    );
  }
}
export default MyForm;

`}</Highlight>
        <p>
          When handling form validation the best way is actully very simple.We
          can add HTML built-in validators such as "required" key word or
          "pattern" attributes,then we only need to add following css properties
          and that is all we need.
        </p>

        <Highlight className="css">{`

input:invalid {
  /*
  adding css properties for the input box
  */
  border-color: red;
}

input:invalid ~ small {
  /*
  adding css properties for the hint text
  */
  display: block !important;
}

`}</Highlight>
        <p>
          Detail example can be found{" "}
          <a href="https://codesandbox.io/s/xryj938k5o" target="_blank">
            here
          </a>
        </p>
        <p className="h4">Uncontrolled Form</p>
        <p>
          To write an uncontrolled component, instead of writing an event
          handler for every state update, you can use a ref to get form values
          from the DOM.
        </p>
      </div>
    );
  }
}

export default reactform;
