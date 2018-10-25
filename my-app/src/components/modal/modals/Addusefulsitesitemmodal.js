import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "../Modal";
import { hideModal } from "../../../actions/modalActions";
import { addUsefulSite } from "../../../actions/dashboardActions";

export class Addusefulsitesitemmodal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      site: {
        name: "",
        url: "",
        description: ""
      }
    };
  }

  onClose = () => e => {
    this.props.hideModal();
  };
  Add = () => e => {
    const { tabkey } = this.props.modal.options;
    const { site } = this.state;
    this.props.addUsefulSite(site, tabkey);
    this.props.hideModal();
  };

  render() {
    return (
      <Modal onClose={this.onClose} title="Confirmation">
        <div className="">
          <h5>Are you sure you want to Add this site from the list?</h5>
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="site name"
                value={this.state.site.name}
                onChange={e =>
                  this.setState({
                    site: { ...this.state.site, name: e.target.value }
                  })
                }
              />
              <input
                type="text"
                className="form-control"
                id="url"
                placeholder="site url"
                value={this.state.site.url}
                onChange={e =>
                  this.setState({
                    site: { ...this.state.site, url: e.target.value }
                  })
                }
              />
              <textarea
                id="description"
                placeholder="description"
                className="form-control"
                value={this.state.site.description}
                onChange={e =>
                  this.setState({
                    site: { ...this.state.site, description: e.target.value }
                  })
                }
              />
            </div>
          </form>
        </div>
        <hr />
        <div className="clear-fix" />
        <div className="float-right">
          <button className="btn btn-danger" onClick={this.Add()}>
            Add
          </button>
          <button className="btn btn-primary ml-2" onClick={this.onClose()}>
            Cancel
          </button>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.modal
});

export default connect(
  mapStateToProps,
  { hideModal, addUsefulSite }
)(Addusefulsitesitemmodal);
