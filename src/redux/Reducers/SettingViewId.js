const initialState = null;

const SettingViewId = (state = initialState, action) => {
  switch (action.type) {
    case "SET_VIEW_ID":
      return action.payload;
    default:
      return state;
  }
};

export default SettingViewId;