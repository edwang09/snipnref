import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "../Modal";
import { hideModal } from "../../../actions/modalActions";
import Axios from "axios";

export class Karaokeordermodal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: {},
      roomid:""
    };
  }
  componentWillMount() {
    this.setState({
        video:this.props.modal.options.video,
        roomid: this.props.modal.options.roomid
    });
  }
  onClose = () => e => {
    this.props.hideModal();
  };
  makeOrder=()=>e=>{
      Axios.post('/api/karaokes/order',{
        roomid: this.state.roomid,
        order:this.state.video
    }).then(res=>{
        console.log(res)
    }).catch(err=>{
        console.log(err)
    })
    this.props.hideModal();
  }
  addToTop=()=>e=>{
      
  }
  render() {
    return (
      <Modal onClose={this.onClose()} title="Confirmation">
        <h3>Are you sure you want to make this order?</h3>
        <div className="karaoke__card">
          <img src={this.state.video.img} alt=""/>
          <p>{this.state.video.title}</p>
        </div>
        <hr />
        <div className="clear-fix" />
        <div className="actions">
          <button className="button--success" onClick={this.makeOrder()}>
            Make order
          </button>
          <button className="button--success" onClick={this.addToTop()}>
            Add to top
          </button>
          <button className="button--secondary" onClick={this.onClose()}>
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
  { hideModal }
)(Karaokeordermodal);
