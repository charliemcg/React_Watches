import React from "react";
import { connect } from "react-redux";

function Cart(props) {
  const getNoItems = () => {
    return (
      <div>
        <p>There are no items</p>
      </div>
    );
  };

  const getItems = () => {
    return props.cart.cart.map((product) => {
      return (
        <div>
          <p>{product.brand}</p>
          <p>{product.model}</p>
          <p>{product.price}</p>
        </div>
      );
    });
  };

  return props.cart.cart.length === 0 ? getNoItems() : getItems();
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//   removeFromCart: (product) => {
//     dispatch(removeFromCart(product));
//   },
//   };
// };

export default connect(mapStateToProps, null)(Cart);
