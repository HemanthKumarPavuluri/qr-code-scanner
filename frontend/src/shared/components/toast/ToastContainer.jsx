import React from "react";
import Toast from "./Toast";

const ToastContainer = (props) => {
  if (props.message) return <Toast {...props} />;
  return "";
};

export default ToastContainer;
