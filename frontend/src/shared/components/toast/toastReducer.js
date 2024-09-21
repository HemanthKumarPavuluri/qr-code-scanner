import { initialState } from "./ToastContext";

export const toastReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_TOAST":
      return {
        ...state,
        ...action.payload,
      };
    case "LOAD_TOAST":
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case "HIDE_TOAST":
      return {
        ...initialState,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
