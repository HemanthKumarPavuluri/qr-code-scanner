// @ts-nocheck
import { useReducer } from "react";
import React from "react";
import { initialState, AppContext } from "./AppContext";
import { AppReducer } from "./AppReducer";

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const setModule = (module) => {
    dispatch({
      type: "SET_MODULE",
      payload: module,
    });
  };

  const setClient = (client) => {
    dispatch({
      type: "SET_CLIENT",
      payload: client,
    });
  };

  const setRoute = (module) => {
    dispatch({
      type: "SET_ROUTE",
      payload: module,
    });
  };

  const setRole = (role) => {
    dispatch({
      type: "SET_ROLE",
      payload: role,
    });
  };

  const store = { ...state, setModule, setRoute, setClient, setRole };

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
