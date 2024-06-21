import React from "react";
import { Modal } from "./UI/Modal";
import { currencyFormatter } from "../util/formatting.js";
import { useCartContext } from "../store/CartContext";
import useUserProgressContext from "../store/UserProgressContext.jsx";
import { Input } from "./UI/Input";
import { Button } from "./UI/Button";
import useHttp from "../hooks/useHttp.js";
import { Error } from "./Error.jsx";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export const Checkout = () => {
  const { items, clearCart } = useCartContext();
  const { progress, hideCheckout } = useUserProgressContext();

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const cartTotal = items
    .reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0)
    .toFixed(2);

  const handleCloseCheckout = () => {
    hideCheckout();
  };

  const handleFinish = () => {
    hideCheckout();
    clearCart();
    clearData();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const customerData = Object.fromEntries(formData.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items,
          customer: customerData,
        },
      })
    );
  };

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleCloseCheckout}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if(isSending) {
    actions = <span>Sending order data...</span>
  }

  if(data && !error) {
    return (
      <Modal open={progress === "checkout"} onClose={handleFinish}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>We will get back to you with more details via email within the next few minutes.</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    )
  }

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

        {error && <Error title="Failed to submit order." message={error} />}

        <p className="modal-actions">
          {actions}
        </p>
      </form>
    </Modal>
  );
};
