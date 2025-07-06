import React from "react";
import CartItem from "./CartItem";

function CartItems({ cartItems }) {
  return (
    <>
      {cartItems.map((item, idx) => (
        <React.Fragment key={idx}>
          <CartItem item={item} />
        </React.Fragment>
      ))}
    </>
  );
}

export default CartItems;
