import React from 'react'
import {currencyFormatter} from "../util/formatting.js";
import { Button } from './UI/Button.jsx';
import { useCartContext } from '../store/CartContext.jsx';
export const MealItem = ({ meal }) => {
  const {addItem} = useCartContext();
  const handleAddItemToCart = () => {
    addItem(meal)
  }
  return (
    <li className="meal-item">
        <article>
            <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
            <div>
                <h3>{meal.name}</h3>
                <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
                <p className="meal-item-description">{meal.description}</p>
            </div>
            <div className="meal-item-actions">
                <Button onClick={handleAddItemToCart}>Add to Cart</Button>
            </div>
        </article>
    </li>
  )
}
