import { createContext } from "react";

export const initialState = {
  module: "",
  selectedRoute: "",
  client: "",
};

export const AppContext = createContext(initialState);
