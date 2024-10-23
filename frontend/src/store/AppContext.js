import { createContext } from "react";

export const initialState = {
  module: "",
  selectedRoute: "",
  client: "",
  role: "",
  professorID: "6719097113ebb6d6fb1624d3",
};

export const AppContext = createContext(initialState);
