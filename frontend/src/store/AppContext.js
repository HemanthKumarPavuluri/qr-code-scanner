import { createContext } from "react";

export const initialState = {
  module: "",
  selectedRoute: "",
  client: "",
  role: "",
};

export const AppContext = createContext(initialState);
