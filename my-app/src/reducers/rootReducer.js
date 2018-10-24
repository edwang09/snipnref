import { combineReducers } from "redux";
import authReducer from "./authReducer";
import dashboardReducer from "./dashboardReducer";
import errorReducer from "./errorReducer";
import modalReducer from "./modalReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  dashboard: dashboardReducer,
  modal: modalReducer
});
