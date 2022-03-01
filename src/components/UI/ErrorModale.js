import React from "react";
import Card from "./Card";
import classes from "./Modale.module.css";
const ErrorModale = (props) => {
    return (
    <div>
        <div className={classes.backdrop}>
            <Card className={classes.modal}>
                <header className={classes.header}>
                    <h2>{props.title}</h2>
                </header>
                <div className={classes.content}>
                    <p>{props.message}</p>
                </div>
                </Card>
        </div>
    </div>
    )
}
export default ErrorModale;