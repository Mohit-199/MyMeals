import React, { useContext,useState,useEffect } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) =>{
    const cartCtx = useContext(CartContext);
    const [btnIsHighlighted,setBtnIsHighlighted] = useState(false);

    const numberOfCartItems = cartCtx.items.reduce((curNumber,item)=>{
        return curNumber+item.amount;
    },0);

    const btnClasses =  `${classes.button} ${btnIsHighlighted ? classes.bump : ""}`;
    const { items } = cartCtx;
    useEffect(()=>{
        if(items.length===0){
            return;
        }
        setBtnIsHighlighted(true);

        const timer = setTimeout(()=>{
            setBtnIsHighlighted(false);
        },300);

        return ()=>{
            clearTimeout(timer);
        }
    },[items]);
    return <div>
        <button className={btnClasses} onClick={props.onShow}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    </div>
}

export default HeaderCartButton;