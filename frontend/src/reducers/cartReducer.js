import constants from "../constants";

const initialState = {
  cart: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case constants.actions.addToCart:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    default:
      return state;
  }
}
