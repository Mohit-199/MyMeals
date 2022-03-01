import { Fragment ,useContext, useEffect ,useState} from "react";
import { Link ,Redirect,useHistory} from "react-router-dom";
import classes from "./OrderSummary.module.css";
import mealsImage from "../assets/meals.jpg";
import Card from "../components/UI/Card";
import AuthContext from "../store/auth-context";
const OrderSummary = ()=>{
    const [meals,setMeals] = useState([]);
    const [error,setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const authCtx = useContext(AuthContext);
    console.log(authCtx);

    const isLoggedIn = authCtx.isLoggedIn;
    const logoutHandler = ()=>{
        console.log(authCtx.logout()+"Hello");
    }
    const MainTheme = <div>
            <header className={classes.header}>
                    <h1>MyMeals</h1>
                    <nav>
                        <ul>
                            <li><Link to="/OrderSummary">OrderSummary</Link></li>
                            {!isLoggedIn && <li><Link to="/login">Login/Register</Link></li>}
                            {isLoggedIn===true && <li><Link to='/' onClick={logoutHandler}>Logout</Link></li>}
                        </ul>
                    </nav>
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt="A table full of delicious food!"/>
            </div>
        </div>
    useEffect(() => {
        if(isLoggedIn===true){
            const fetchOrderedMeals = async()=>{
            const loadedMeals=[];
            const fetchmeals = await fetch(process.env.DATABASE_URL);
            if(!fetchmeals.ok){
              throw new Error("Something went wrong");
            }
            setIsLoading(true);
            const data = await fetchmeals.json();
            console.log(data);
            for(const key in data){
                for(let i=0;i<data[key].orderedItems.length;i++){
                        loadedMeals.push({
                        key: data[key].orderedItems[i].id,
                        id:key,
                        name: data[key].orderedItems[i].name,
                        price: data[key].orderedItems[i].price,
                        amount: data[key].orderedItems[i].amount
                    })
                }
            }
            console.log(loadedMeals);
            setMeals(loadedMeals);
        }
        fetchOrderedMeals().catch((error)=>{
            setError(error.message);
        });
    }
    }, [])
    console.log("order ")
    if(isLoggedIn){
        if(meals.length===0){
            return <Fragment>
            {MainTheme}
            <section className={classes.meals}>
                        <Card>
                            {isLoading && <h3>Sorry!! You have not placed any order yet. Please place some order to see items in your Order Summary</h3> || <h3>Loading Data...</h3>}   
                        </Card>
                    </section>
            </Fragment>
        }
        if(meals.length>0){
            return <Fragment>
                {MainTheme}
                <section className={classes.meals}>
                <Card>
                    <ul>
                        {meals.map(mealItem =>
                                    <li key={mealItem.key}>
                                            <div className={classes.list} >
                                                <span><h3>{mealItem.name}</h3></span>
                                                <span>{"X "}{mealItem.amount}</span>
                                                <span className={classes.price}>{"$"+mealItem.price}</span>
                                            </div>
                                    </li>
                                )}
                        </ul>
                        </Card>
                </section>
            </Fragment>
        }
    }
if(!isLoggedIn){
    return <Fragment>
        {MainTheme}
            <section className={classes.meals}>
                    <Card>
                        {<h3>Sorry!! You cannot place orders as you are not LoggedIn, first login then place orders.</h3>}   
                    </Card>
            </section>
        </Fragment>

}
    return null;
}

export default OrderSummary;