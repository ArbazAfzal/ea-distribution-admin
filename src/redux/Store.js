import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";

import { settingReducers } from "./Reducers/SettingReducers";
import { addToSideBarMenuReducer } from "./Reducers/SideBarMenuReducers";
import SettingId from "./Reducers/SettingId";

const reducer = combineReducers({
  addToSideBar: addToSideBarMenuReducer,
  setting: settingReducers,
    id:SettingId
});

const initialState = {
  addToSideBar: {
    sideBarAdd: JSON.parse(localStorage.getItem("_sideBarAdd"))
      ? JSON.parse(localStorage.getItem("_sideBarAdd"))
      : {},
  },

  setting: {
    settingItem: JSON.parse(localStorage.getItem("_settingItem"))
      ? JSON.parse(localStorage.getItem("_settingItem"))
      : [],
  },
  id:null
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
