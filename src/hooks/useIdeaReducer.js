export const initialForm = {};

export function ideaReducer(state, action) {
  switch (action.type) {

    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };

    case "SET_DRAFT":
      return {
        ...action.payload,
      };

    case "RESET":
      return {};

    default:
      return state;
  }
}