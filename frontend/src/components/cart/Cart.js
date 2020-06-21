import React from "react";
import { connect } from "react-redux";
import { removeFromCart } from "../../actions/cartActions.js";
import "./styles/styles.css";
import strings from "./strings";

function Cart(props) {
  const handleRemoval = (id) => {
    props.removeFromCart(id);
  };

  const getNoItems = () => {
    return (
      <div id="cart-master-wrapper">
        <div id="cart-content-wrapper">
          <div id="cart-title">{strings.noItems}</div>
        </div>
      </div>
    );
  };

  const getItems = () => {
    return props.cart.cart.map((product) => {
      return (
        <div id="cart-item">
          <img
            id="cart-thumbnail"
            src={`data:image/jpeg;base64,${product.image}`}
            alt={strings.accessibility.productImage}
          />
          <div id="cart-item-name">
            <div class="cart-name">{product.brand}</div>
            <div class="cart-name">{product.model}</div>
          </div>
          <div id="cart-item-remove-wrapper">
            <div
              id="cart-item-remove-btn"
              onClick={() => handleRemoval(product._id)}
            >
              {strings.remove}
            </div>
          </div>
          <div id="cart-item-price">${product.price}</div>
        </div>
      );
    });
  };

  const getGrandTotal = () => {
    let grandTotal = 0;
    for (let i in props.cart.cart) {
      grandTotal += parseInt(props.cart.cart[i].price);
    }
    return grandTotal;
  };

  return props.cart.cart.length === 0 ? (
    getNoItems()
  ) : (
    <div id="cart-master-wrapper">
      <div id="cart-content-wrapper">
        <div id="cart-item-list">{getItems()}</div>
        <div id="cart-user-details-wrapper">
          Put user shipping details here. Total price: ${getGrandTotal()}
        </div>
      </div>
    </div>
  );
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

export default connect(mapStateToProps, { removeFromCart })(Cart);
