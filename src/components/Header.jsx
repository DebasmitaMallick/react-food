import React, { useState } from "react";
import logoImg from "../assets/logo.jpg";
import { Button } from "./UI/Button.jsx";
import { useCartContext } from "../store/CartContext.jsx";
import useUserProgressContext from "../store/UserProgressContext.jsx";

export const Header = () => {
  const {items} = useCartContext();
  const {showCart} = useUserProgressContext();

  const totalCartItems = items.reduce((totalNumberOfItems, item) => totalNumberOfItems + item.quantity, 0);

  const handleShowCart = () => {
    showCart();
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
};
