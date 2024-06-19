import React from "react";
import { useCartContext } from "../store/CartContext";
import { Modal } from "./UI/Modal";
import { currencyFormatter } from "../util/formatting.js";
import { Button } from "./UI/Button";
import useUserProgressContext from "../store/UserProgressContext.jsx";
import { CartItem } from "./CartItem.jsx";

export const Cart = () => {
  const { items, addItem, removeItem } = useCartContext();
  const { progress, hideCart } = useUserProgressContext();

  const cartTotal = items
    .reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0)
    .toFixed(2);
  const handleCloseCart = () => {
    hideCart();
  };
  return (
    <Modal className="cart" open={progress === "cart"}>
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onIncrease={() => addItem(item)}
            onDecrease={() => removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {
          items.length > 0 && <Button>Go to Checkout</Button>
        }
      </p>
    </Modal>
  );
};
