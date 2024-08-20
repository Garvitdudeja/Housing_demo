import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { HYDRATE } from "next-redux-wrapper";
import { webSlice } from "./web";

const mainReducer = combineReducers({
  auth: authSlice.reducer,
  web: webSlice.reducer
});

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE: // Handle the HYDRATE action
      return {
        ...state, // Keep any existing state
        // Merge in the rehydrated state
      };
    default:
      return mainReducer(state, action);
  }
};

export default rootReducer;
