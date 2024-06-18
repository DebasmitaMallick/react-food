import React, { useState } from "react";
import logoImg from "../assets/logo.jpg";
import { Button } from "./UI/Button.jsx";
import { useCartContext } from "../store/CartContext.jsx";
import { Cart } from "./Cart.jsx";
export const Header = () => {
  const {items} = useCartContext();
  const totalCartItems = items.reduce((totalNumberOfItems, item) => totalNumberOfItems + item.quantity, 0);

  const [showCart, setShowCart] = useState(false);
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly onClick={() => setShowCart(true)}>Cart ({totalCartItems})</Button>
        <Cart open={showCart} />
      </nav>
    </header>
  );
};
