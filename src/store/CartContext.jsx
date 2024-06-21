import { createContext, useContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {}
});

export const useCartContext = () => useContext(CartContext);

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];
    // check if item already exists
    const existingItemIndex = state.items.findIndex((item) => item.id === action.item.id);
    if(existingItemIndex > -1) { // item exists
      // increment the quantity of that item
      const existingItem = state.items[existingItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1
      }
      updatedItems[existingItemIndex] = updatedItem
    } else { // item does not exist
      updatedItems.push({
        ...action.item, quantity: 1
      });
    }
    return {
      ...state,
      items: updatedItems
    }
  }

  if (action.type === "REMOVE_ITEM") {
    const existingItemIndex = state.items.findIndex((item) => item.id === action.id);
    const existingCartItem = state.items[existingItemIndex];
    const updatedItems = [...state.items];
    if(existingCartItem.quantity === 1) {
      updatedItems.splice(existingItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1
      };
      updatedItems[existingItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems
    }
  }

  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      items: []
    }
  }

  return state;
};

export const CartContextProvider = ({ children }) => {
  const [cart, dispatchCartAction] = useReducer(cartReducer, {
    items: []
  });

  const addItem = (item) => {
    dispatchCartAction({
      type: "ADD_ITEM",
      item
    })
  };

  const removeItem = (id) => {
    dispatchCartAction({
      type: "REMOVE_ITEM",
      id
    })
  };

  const clearCart = () => {
    dispatchCartAction({
      type: "CLEAR_CART"
    })
  }

  const cartContextValue = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart
  };

  return <CartContext.Provider value={cartContextValue}>{children}</CartContext.Provider>;
};
export default CartContextProvider;
