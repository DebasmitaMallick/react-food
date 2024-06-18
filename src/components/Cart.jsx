import React from "react";
import { useCartContext } from "../store/CartContext";
import { Modal } from "./UI/Modal";
import { currencyFormatter } from "../util/formatting.js";
import { Button } from "./UI/Button";
import useUserProgressContext from "../store/UserProgressContext.jsx";

export const Cart = () => {
  const { items } = useCartContext();
  const {progress, hideCart} = useUserProgressContext();

  const cartTotal = items
    .reduce(
      (totalPrice, item) => totalPrice + parseFloat(item.price) * item.quantity,
      0
    )
    .toFixed(2);
  const handleCloseCart = () => {
    hideCart();
  }
  return (
    <Modal className="cart" open={progress === "cart"}>
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity}
          </li>
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>Close</Button>
        <Button>Go to Checkout</Button>
      </p>
    </Modal>
  );
};
