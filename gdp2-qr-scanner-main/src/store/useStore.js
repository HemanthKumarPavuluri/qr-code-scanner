import { useContext } from "react";
import { AppContext } from "./AppContext";

export const useStore = () => useContext(AppContext);
