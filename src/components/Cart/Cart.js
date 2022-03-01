import classes from "./Cart.module.css";
import React, { useContext,useState } from "react";
import Modale from "../UI/Modale";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import AuthContext from "../../store/auth-context";
const Cart = (props) =>{

    const cartCtx = useContext(CartContext);

    const authCtx = useContext(AuthContext);

    const hasItems = cartCtx.items.length>0;

    const [isCheckout,setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartItemAddHandler = (item)=>{
        cartCtx.addItem({...item,amount:1});
    }
    const cartItemRemoveHandler = (id)=>{
        cartCtx.removeItem(id);
    }
    const orderHandler = ()=>{
      setIsCheckout(true);
    }
    
    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch(process.env.DATABASE_URL + '/orders.json', {
          method: 'POST',
          body: JSON.stringify({
            user: userData,
            orderedItems: cartCtx.items,
          }),
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
      };

    const cartItems = (
        <ul className={classes['cart-items']}>
          {cartCtx.items.map((item) => (
            <CartItem 
                key={item.id} 
                name={item.name} 
                price={item.price} 
                amount={item.amount} 
                onRemove={cartItemRemoveHandler.bind(null,item.id)}
                onAdd={cartItemAddHandler.bind(null,item)}
              />
          ))}
        </ul>
      );
      const modalActions = (
        <div className={classes.actions}>
          <button className={classes['button--alt']} onClick={props.onHideClick}>
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      );
      const cartModalContent = (
        <React.Fragment>
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>${cartCtx.totalAmount.toFixed(2)}</span>
          </div>
          {isCheckout && (
            <Checkout onConfirm={submitOrderHandler} onCancel={props.onHideClick} />
          )}
          {!isCheckout && modalActions}
        </React.Fragment>
      );

      const isSubmittingModalContent = <p>Sending order data...</p>;

      const didSubmitModalContent = (
        <React.Fragment>
          <p>Successfully sent the order!</p>
          <div className={classes.actions}>
          <button className={classes.button} onClick={props.onHideClick}>
            Close
          </button>
        </div>
        </React.Fragment>
      );

        return <Modale onHide={props.onHideClick}>
                    {!isSubmitting && !didSubmit && cartModalContent}
                    {isSubmitting && isSubmittingModalContent}
                    {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modale>
}

export default Cart;