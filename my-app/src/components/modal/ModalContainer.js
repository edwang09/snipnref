import React, { Component } from "react";
import { connect } from "react-redux";

import Confirmmodal from "./modals/Confirmmodal";
import Testmodal from "./modals/Testmodal";
import Addroutineitemmodal from "./modals/Addroutineitemmodal";
import Addusefulsitetabmodal from "./modals/Addusefulsitetabmodal";
import Addusefulsitesitemmodal from "./modals/Addusefulsitesitemmodal";
import Editusefulsitetabmodal from "./modals/Editusefulsitetabmodal";
import Addprojectmodal from "./modals/Addprojectmodal";
import Editprojectmodal from "./modals/Editprojectmodal";
import Karaokeordermodal from "./modals/Karaokeordermodal";
import Karaokeeditmodal from "./modals/Karaokeeditmodal";
const MODAL_COMPONENTS = {
  TEST_MODAL: Testmodal,
  CONFIRM_MODAL: Confirmmodal,
  ADDROUTINEITEM_MODAL: Addroutineitemmodal,
  ADDUSEFULSITETAB_MODAL: Addusefulsitetabmodal,
  ADDUSEFULSITEITEM_MODAL: Addusefulsitesitemmodal,
  EDITUSEFULSITETAB_MODAL: Editusefulsitetabmodal,
  ADDPROJECT_MODAL: Addprojectmodal,
  EDITPROJECT_MODAL: Editprojectmodal,
  KARAOKEORDER_MODAL: Karaokeordermodal,
  KARAOKEEDIT_MODAL: Karaokeeditmodal
};

class ModalContainer extends Component {
  render() {
    if (!this.props.modalType) {
      return null;
    }

    const SpecificModal = MODAL_COMPONENTS[this.props.modalType];

    return <SpecificModal />;
  }
}

const mapStateToProps = state => ({
  modalType: state.modal.modalType
});

export default connect(
  mapStateToProps,
  {}
)(ModalContainer);
