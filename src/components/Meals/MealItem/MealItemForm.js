import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import React, { useContext, useState } from "react";
import AuthContext from "../../../store/auth-context";

const MealItemForm = (props) =>{
    const [amountIsValid,setAmountIsValid] = useState(true);
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    const submitHandler = (event) =>{
                event.preventDefault();
                const enteredAmount = +event.target[0].value;
                if(enteredAmount<1 || enteredAmount>5){
                        setAmountIsValid(false);
                        return;
                }
                props.onAddToCart(enteredAmount);
    }
    return <form className={classes.form} onSubmit={submitHandler}>
            <Input 
                label="Amount"
                input={{
                    id : "amount"+props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue:"1",
                }}
            />
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
        </form>
}
export default MealItemForm;