import { createContext } from "react";

export const initialState = {
  module: "",
  selectedRoute: "",
  client: "",
  role: "",
  professorID: "670029e074d70a21375d31cb",
};

export const AppContext = createContext(initialState);
