import { createContext } from "react";

export const initialState = {
  module: "",
  selectedRoute: "",
  client: "",
  role: "",
  professorID: "673cf6e4ba911c76430b06e7",
};


export const AppContext = createContext(initialState);
