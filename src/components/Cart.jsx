import React from "react";
import { useCartContext } from "../store/CartContext";
import { Modal } from "./UI/Modal";
import { currencyFormatter } from "../util/formatting.js";
import { Button } from "./UI/Button";

export const Cart = ({open}) => {
  const { items } = useCartContext();
  const cartTotal = items
    .reduce(
      (totalPrice, item) => totalPrice + parseFloat(item.price) * item.quantity,
      0
    )
    .toFixed(2);
  return (
    <Modal className="cart" open={open}>
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
        <Button textOnly>Close</Button>
        <Button>Go to Checkout</Button>
      </p>
    </Modal>
  );
};
