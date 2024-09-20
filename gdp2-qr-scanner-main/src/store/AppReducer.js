export const AppReducer = (state, action) => {
  switch (action.type) {
    case "SET_MODULE":
      return {
        ...state,
        module: action.payload,
      };
    case "SET_ROUTE":
      return {
        ...state,
        selectedRoute: action.payload,
      };
    case "SET_CLIENT":
      return {
        ...state,
        client: action.payload,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
