import {
  SET_USER_DASHBOARD,
  SET_USER_ROUTINES,
  SET_USER_PROJECTS,
  SET_USER_USEFULSITES,
  SET_USER_MEMOS
} from "../actions/types";

const initialState = {
  projects: {},
  routines: {},
  memos: {},
  usefulsites: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER_DASHBOARD:
      return {
        ...state,
        projects: action.payload.projects,
        routines: action.payload.routines,
        usefulsites: action.payload.usefulsites,
        memos: action.payload.memos
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
    case SET_USER_MEMOS:
      return {
        ...state,
        memos: action.payload.memos
      };
    default:
      return state;
  }
}
