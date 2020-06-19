import React, { useEffect } from "react";
import { connect } from "react-redux";

function Cart(props) {
  useEffect(function () {
    console.log(props);
  });

  return (
    <div>
      <p style={{ color: "pink" }}>{props.cart.cart[0].model}</p>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  // return {
  // removeFromCart: (product) => {
  //   dispatch(removeFromCart(product));
  // },
  // };
  return null;
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
