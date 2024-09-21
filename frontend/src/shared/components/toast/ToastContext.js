// @ts-nocheck
import { createContext } from "react";

export const initialState = {
  message: "",
  type: "",
  loading: false,
};

export const ToastContext = createContext(initialState);
