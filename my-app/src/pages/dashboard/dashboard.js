import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getUserDashboard } from "../../actions/dashboardActions";
import {
  updateRoutineStatus,
  updateProjectStatus,
  updateProjectNote,
  updateMemos
} from "../../actions/dashboardActions";
import { loadModal } from "../../actions/modalActions";

import Routinelist from "./routines/Routinelist";
import Usefulsites from "./usefulsites/usefulsites";
import Projects from "./projects/Projects";
import Memos from "./memos/Memos";

class Dashboard extends Component {
  componentWillMount() {
    // check if user has been logged in.
    const { auth } = this.props;
    if (!auth.isAuthenticated) {
      this.props.history.push("/");
    }
    this.props.getUserDashboard();
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  render() {
    const { dashboard } = this.props;
    let routinelistRender;
    if (dashboard.routines.length) {
      routinelistRender = dashboard.routines.map((routine, idx) => {
        return (
          <Routinelist
            key={routine.name}
            name={routine.name}
            listkey={idx}
            title={routine.title}
            itemlist={routine.content}
            updateRoutineStatus={this.props.updateRoutineStatus}
            loadModal={this.props.loadModal}
          />
        );
      });
    }
    return (
      <div className="container dashboard">
        <h2> Dashboard</h2>

        <div className="routines">
          <h4>Routines</h4>
          <div className="d-flex justify-content-around">
            {dashboard && routinelistRender}
          </div>
        </div>
        <div className="memos">
          {dashboard && (
            <Memos
              memos={dashboard.memos}
              updateMemos={this.props.updateMemos}
            />
          )}
        </div>

        <div className="usefulsites">
          <h4>
            Useful Sites
            <span
              className="action"
              onClick={() => this.props.loadModal("ADDUSEFULSITETAB_MODAL")}
            >
              <i className="fas fa-plus" />
            </span>
          </h4>

          <p>
            This is a list of websites that can be useful in different senerios
          </p>
          {dashboard && (
            <Usefulsites
              loadModal={this.props.loadModal}
              sitelist={dashboard.usefulsites}
            />
          )}
        </div>

        <div className="projects">
          <h4>
            Ongoing Projects
            <span
              className="action"
              onClick={() => this.props.loadModal("ADDPROJECT_MODAL")}
            >
              <i className="fas fa-plus" />
            </span>
          </h4>
          {dashboard && (
            <Projects
              projectlist={dashboard.projects}
              loadModal={this.props.loadModal}
              updateProjectStatus={this.props.updateProjectStatus}
              updateProjectNote={this.props.updateProjectNote}
            />
          )}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  dashboard: PropTypes.object.isRequired,
  getUserDashboard: PropTypes.func.isRequired,
  updateRoutineStatus: PropTypes.func.isRequired,
  updateProjectStatus: PropTypes.func.isRequired,
  loadModal: PropTypes.func.isRequired,
  updateMemos: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  dashboard: state.dashboard
});
export default connect(
  mapStateToProps,
  {
    getUserDashboard,
    updateRoutineStatus,
    updateProjectStatus,
    loadModal,
    updateProjectNote,
    updateMemos
  }
)(withRouter(Dashboard));
