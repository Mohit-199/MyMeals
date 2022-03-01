import React, { useContext } from "react";
import CartContext from "../../../store/cart-context";
import MealItemForm from "./MealItemForm";
import classes from "./MealItems.module.css";


const MealItems = (props) =>{
    const cartCtx = useContext(CartContext);
    const addToCartHandler = (amount) =>{
        cartCtx.addItem({
                    id: props.id,
                    name : props.mealName,
                    price: props.mealPrice,
                    amount:amount
            }
        );
    } 
    return <li className={classes.meal}>
             <div >
                <h3>{props.mealName}</h3>
                <div className={classes.description}>{props.mealDescription}</div>
                <div className={classes.price}>{"$"+props.mealPrice}</div>
             </div>
             <div>
                 <MealItemForm id={props.id} onAddToCart={addToCartHandler}/>
             </div>
           </li>
}

export default MealItems;