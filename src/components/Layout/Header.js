import React, { useContext } from "react"
import classes from "./Header.module.css";
import mealsImage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";
import { Link, Redirect } from "react-router-dom";
import AuthContext from "../../store/auth-context";
const Header = (props) =>{
    const logoutHandler = ()=>{
        console.log(authCtx.logout()+"Hello");
    }
    const authCtx = useContext(AuthContext);
    return <React.Fragment>
        <header className={classes.header}>
            <h1>MyMeals</h1>
            <HeaderCartButton onShow={props.onShowClick}/>
            <nav>
                <ul>
                    <li><Link to="/OrderSummary">OrderSummary</Link></li>
                    {!authCtx.isLoggedIn && <li><Link to="/login">Login/Register</Link></li>}
                    {authCtx.isLoggedIn && <li><Link to='/' onClick={logoutHandler}>Logout</Link></li>}
                </ul>
            </nav>
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImage} alt="A table full of delicious food!"/>
        </div>
        
    </React.Fragment>
}

export default Header;