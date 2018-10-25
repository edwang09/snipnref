import axios from "axios";

import {
  GET_ERRORS,
  SET_USER_DASHBOARD,
  SET_USER_ROUTINES,
  SET_USER_PROJECTS,
  SET_USER_USEFULSITES,
  SET_USER_MEMOS
} from "./types";

// Login - Get User Token
export const getUserDashboard = () => dispatch => {
  axios
    .get("/api/users/dashboard")
    .then(res => {
      // Save to localStorage
      const dashboard = res.data;
      console.log(dashboard);
      // Set current user
      dispatch(setUserDashboard(dashboard));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const updateRoutineStatus = (itemkey, listkey, status) => dispatch => {
  console.log("action", itemkey, listkey, status);
  axios
    .post("/api/users/routines/updatestatus", { itemkey, listkey, status })
    .then(res => {
      console.log(res);
      const routines = res.data;
      dispatch(setUserRoutines(routines));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const removeRoutineItem = (itemkey, listkey) => dispatch => {
  console.log("action", itemkey, listkey);
  axios
    .post("/api/users/routines/removeitem", { itemkey, listkey })
    .then(res => {
      console.log(res);
      const routines = res.data;
      dispatch(setUserRoutines(routines));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addRoutineItem = (item, listkey) => dispatch => {
  console.log("action", item, listkey);
  axios
    .post("/api/users/routines/additem", { item, listkey })
    .then(res => {
      console.log(res);
      const routines = res.data;
      dispatch(setUserRoutines(routines));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addUsefulsitetab = category => dispatch => {
  console.log("action", category);
  axios
    .post("/api/users/usefulsites/addtab", { category })
    .then(res => {
      console.log(res);
      const usefulsites = res.data;
      dispatch(setUserUsefulsites(usefulsites));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const removeUsefulsiteItem = (urlkey, tabkey) => dispatch => {
  console.log("action", urlkey, tabkey);
  axios
    .post("/api/users/usefulsites/removeitem", { urlkey, tabkey })
    .then(res => {
      console.log(res);
      const usefulsites = res.data;
      dispatch(setUserUsefulsites(usefulsites));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addUsefulSite = (site, tabkey) => dispatch => {
  console.log("action", site, tabkey);
  axios
    .post("/api/users/usefulsites/addsite", { site, tabkey })
    .then(res => {
      console.log(res);
      const usefulsites = res.data;
      dispatch(setUserUsefulsites(usefulsites));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const editUsefulsitetab = (category, tabkey) => dispatch => {
  console.log("action", category, tabkey);
  axios
    .post("/api/users/usefulsites/edittab", { category, tabkey })
    .then(res => {
      console.log(res);
      const usefulsites = res.data;
      dispatch(setUserUsefulsites(usefulsites));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const updateMemos = memos => dispatch => {
  console.log("action", memos);
  axios
    .post("/api/users/memos/update", { memos })
    .then(res => {
      console.log(res);
      const memos = res.data;
      dispatch(setUserMemos(memos));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const updateProjectStatus = (projectkey, status) => dispatch => {
  console.log("action", projectkey, status);
  axios
    .post("/api/users/projects/updatestatus", { projectkey, status })
    .then(res => {
      console.log(res);
      const projects = res.data;
      dispatch(setUserProjects(projects));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addProject = project => dispatch => {
  console.log("action", project);
  axios
    .post("/api/users/projects/add", { project })
    .then(res => {
      console.log(res);
      const projects = res.data;
      dispatch(setUserProjects(projects));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const editProject = (project, projectkey) => dispatch => {
  console.log("action", project, projectkey);
  axios
    .post("/api/users/projects/update", { project, projectkey })
    .then(res => {
      console.log(res);
      const projects = res.data;
      dispatch(setUserProjects(projects));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const updateProjectNote = (projectnote, projectkey) => dispatch => {
  console.log("action", projectnote, projectkey);
  axios
    .post("/api/users/projects/updatenote", { projectnote, projectkey })
    .then(res => {
      console.log(res);
      const projects = res.data;
      dispatch(setUserProjects(projects));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Set user dashboard
export const setUserDashboard = dashboard => {
  return {
    type: SET_USER_DASHBOARD,
    payload: dashboard
  };
};
// Set user routines
export const setUserRoutines = routines => {
  return {
    type: SET_USER_ROUTINES,
    payload: routines
  };
};
// Set user routines
export const setUserUsefulsites = usefulsites => {
  return {
    type: SET_USER_USEFULSITES,
    payload: usefulsites
  };
};
// Set user routines
export const setUserMemos = memos => {
  return {
    type: SET_USER_MEMOS,
    payload: memos
  };
};
// Set user projects
export const setUserProjects = projects => {
  return {
    type: SET_USER_PROJECTS,
    payload: projects
  };
};
