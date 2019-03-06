import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "../Modal";
import { hideModal } from "../../../actions/modalActions";
import { editUsefulsitetab } from "../../../actions/dashboardActions";
import Axios from "axios";

export class Karaokeeditmodal extends Component {
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
  }
  addToTop=()=>e=>{
      
  }
  render() {
    return (
      <Modal onClose={this.onClose()} title="Confirmation">
        <h3>This is a placeholder for editing queue</h3>
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
)(Karaokeeditmodal);
