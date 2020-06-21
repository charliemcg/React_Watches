import constants from "../constants";

export const addToCart = (product) => (dispatch) => {
  dispatch({
    type: constants.actions.addToCart,
    payload: product,
  });
};

export const removeFromCart = (id) => (dispatch) => {
  dispatch({
    type: constants.actions.removeFromCart,
    payload: id,
  });
};
