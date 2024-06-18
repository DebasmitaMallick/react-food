import { createContext, useContext } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

export const useCartContext = () => useContext(CartContext);

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
  }

  if (action.type === "REMOVE_ITEM") {
  }

  return state;
};

export const CartContextProvider = ({ children }) => {
  return <CartContext.Provider>{children}</CartContext.Provider>;
};
export default CartContextProvider;
