// @ts-nocheck
import { useReducer } from "react";
import { toastReducer } from "./toastReducer";
import { ToastContext, initialState } from "./ToastContext";
import ToastContainer from "./ToastContainer";
import React from "react";

export const ToastContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const success = (message) => {
    dispatch({
      type: "SHOW_TOAST",
      payload: { message, type: "success", loading: false },
    });
  };

  const info = (message) => {
    dispatch({
      type: "SHOW_TOAST",
      payload: { message, type: "info", loading: false },
    });
  };

  const load = (message) => {
    dispatch({
      type: "SHOW_TOAST",
      payload: { message, type: "info", loading: true },
    });
  };

  const hide = () => {
    dispatch({ type: "HIDE_TOAST", payload: { message: "" } });
  };

  const error = (message) => {
    dispatch({
      type: "SHOW_TOAST",
      payload: { message, type: "error", loading: false },
    });
  };

  const value = { success, load, hide, info, error };

  return (
    <ToastContext.Provider value={value}>
      <ToastContainer {...state} />
      {children}
    </ToastContext.Provider>
  );
};
