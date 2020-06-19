import constants from "../constants";

const initialState = {
  cart: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case constants.actions.addToCart:
      state.cart.push(action.payload);
      return {
        ...state,
        cart: state.cart,
      };
    default:
      return state;
  }
}
