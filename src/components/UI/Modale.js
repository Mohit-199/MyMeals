import React from "react";
import ReactDom from "react-dom";
import classes from "./Modale.module.css";

const Backdrop = (props) =>{
    return <div className={classes.backdrop} onClick={props.onBackDropClick}></div>
}

const ModaleOverlay = (props) =>{
    return <div className={classes.modal}>
            <div>{props.children}</div>
        </div>
}
const Modale = (props) =>{
    return <React.Fragment>
        {ReactDom.createPortal(<Backdrop onBackDropClick={props.onHide}/>,document.getElementById("overlays"))}
        {ReactDom.createPortal(<ModaleOverlay>{props.children}</ModaleOverlay>,document.getElementById("overlays"))}
    </React.Fragment>
}

export default Modale;