import { useReducer } from "react";
import CartContext from "./cart-context";


const defaultCartState = {
    items: [],
    totalAmount: 0
}
const cartReducer = (state,action)=>{
    if(action.type==="ADD"){
        let updatedItems
        console.log(state.items);
        console.log(action.item);
        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.item.id
        );
        const existingCartItem = state.items[existingCartItemIndex];
        console.log(existingCartItem);
        if(existingCartItem){
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount+action.item.amount
            }
            updatedItems=[...state.items];
            updatedItems[existingCartItemIndex]=updatedItem;
        }
        else{
            updatedItems = state.items.concat(action.item);
        }
        const updatedTotalAmount = state.totalAmount + action.item.price*action.item.amount; 
        return {
                items : updatedItems,
                totalAmount : updatedTotalAmount
            };
    }
    else if(action.type==="REMOVE"){
        let updatedItems;
        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.id
            );
            const existingCartItem = state.items[existingCartItemIndex];
            const updatedTotalAmount = state.totalAmount-existingCartItem.price;
            if(existingCartItem.amount===1){
                updatedItems = state.items.filter(item=>item.id!==action.id);
                
            }else{
                const updatedItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount-1
                }
                updatedItems=[...state.items]
                updatedItems[existingCartItemIndex]=updatedItem;
            }
          
        return {
                items : updatedItems,
                totalAmount : updatedTotalAmount
            };
            
            
    }
    if (action.type === 'CLEAR') {
        return defaultCartState;
      }
    return defaultCartState;
}

const CartProvider =(props)=>{
    const [cartState,dispatchCartAction] = useReducer(cartReducer,defaultCartState);
    const addItemCartHandler=(item)=>{
        dispatchCartAction({
            type: "ADD",
            item: item
        })
    };
    const removeItemCartHandler=(id)=>{
        dispatchCartAction({
            type: "REMOVE",
            id : id
        })
    };
    const clearCartHandler = () => {
        dispatchCartAction({type: 'CLEAR'});
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemCartHandler,
        removeItem: removeItemCartHandler,
        clearCart: clearCartHandler
    };

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>

}
export default CartProvider;