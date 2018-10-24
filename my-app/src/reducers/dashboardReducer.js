import isEmpty from "../utils/is-empty";

import {
  SET_USER_DASHBOARD,
  SET_USER_ROUTINES,
  SET_USER_PROJECTS,
  SET_USER_USEFULSITES
} from "../actions/types";

const initialState = {
  projects: {},
  routines: {},
  usefulsites: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER_DASHBOARD:
      return {
        ...state,
        projects: action.payload.projects,
        routines: action.payload.routines,
        usefulsites: action.payload.usefulsites
      };
    case SET_USER_ROUTINES:
      return {
        ...state,
        routines: action.payload
      };
    case SET_USER_PROJECTS:
      return {
        ...state,
        projects: action.payload
      };
    case SET_USER_USEFULSITES:
      return {
        ...state,
        usefulsites: action.payload
      };
    default:
      return state;
  }
}
