import Header from "../components/Layout/Header";
import Cart from "../components/Cart/Cart";
import Meals from "../components/Meals/Meals";
import { useState } from "react";
import CartProvider from "../store/CartProvider"
const HomePage = () =>{
    const [isCartClicked, setCartClicked] = useState(false);

    const showCartHandler = () =>{
      setCartClicked(true);
    }
    const hideCartHandler = () =>{
      setCartClicked(false);
    }
    return(
        <CartProvider>
            {isCartClicked && <Cart onHideClick={hideCartHandler}/>}
            <Header onShowClick={showCartHandler} /> 
            <main>
            <Meals />
            </main> 
        </CartProvider>
    )
}

export default HomePage