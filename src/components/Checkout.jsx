import React from "react";
import { Modal } from "./UI/Modal";
import { currencyFormatter } from "../util/formatting.js";
import { useCartContext } from "../store/CartContext";
import useUserProgressContext from "../store/UserProgressContext.jsx";
import { Input } from "./UI/Input";
import { Button } from "./UI/Button";

export const Checkout = () => {
  const { items } = useCartContext();
  const { progress, hideCheckout } = useUserProgressContext();
  const cartTotal = items
    .reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0)
    .toFixed(2);

  const handleCloseCheckout = () => {
    hideCheckout();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const customerData = Object.fromEntries(formData.entries());

    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          items,
          customer: customerData,
        },
      }),
    });
  };
  return (
    <Modal open={progress === "checkout"} onClose={handleCloseCheckout}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleCloseCheckout}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
};
