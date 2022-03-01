import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItems from "./MealItem/MealItems";
import {useEffect,useState} from "react";
import ErrorModale from "../UI/ErrorModale";
const AvailableMeals = () =>{
        const [meals,setMeals] = useState([]);
        const [error,setError] = useState();

        useEffect(() => {
          const fetchMealsHandler = async()=>{
            const loadedMeals=[];
            const fetchmeals = await fetch(process.env.DATABASE_URL + "/meals.json");
            if(!fetchmeals.ok){
              throw new Error("Something went wrong");
            }
            const data = await fetchmeals.json();
            for(const key in data){
              loadedMeals.push({
                id:key,
                description: data[key].description,
                name: data[key].name,
                price: data[key].price
              })
            }
            setMeals(loadedMeals);
          }
          fetchMealsHandler().catch((error)=>{
              setError(error.message);
          });
        }, []);
        if(error){
          return <ErrorModale title={"Sorry!! Can't Load Items"} message={error}/>
        }
        return <section className={classes.meals}>
                <Card>
                    <ul>
                        {meals.map(mealItem =>
                            <MealItems 
                                id={mealItem.id}
                                key={mealItem.id}
                                mealName={mealItem.name}
                                mealDescription={mealItem.description}
                                mealPrice={mealItem.price}
                            />
                        )}
                   </ul>
                </Card>
            </section>
}

export default AvailableMeals;