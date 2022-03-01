import { Fragment } from 'react';
import AuthForm from '../components/Auth/AuthForm';
import classes from "../components/Layout/Header.module.css"
import { Link } from 'react-router-dom';
import mealsImage from "../assets/meals.jpg"
const AuthPage = () => {
    const MainTheme = <div>
            <header className={classes.header}>
                    <h1>MyMeals</h1>
                    <nav>
                        <ul>
                            <li><Link to="/OrderSummary">OrderSummary</Link></li>
                            <li><Link to="/login">Login/Register</Link></li>
                        </ul>
                    </nav>
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt="A table full of delicious food!"/>
            </div>
        </div>
  return <Fragment>
      {MainTheme}
      <AuthForm />
  </Fragment>;
};

export default AuthPage;