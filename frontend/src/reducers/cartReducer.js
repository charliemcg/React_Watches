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
    case constants.actions.removeFromCart:
      state.cart.splice(
        state.cart.findIndex(function (e) {
          return e._id === action.payload;
        }),
        1
      );
      return {
        ...state,
      };
    default:
      return state;
  }
}
