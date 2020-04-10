import React from "react";
import classes from "./Backdrop.css";
export default function backdrop(props) {
  return props.show ? (
    <div className={classes.Backdrop} onClick={props.hideOrder}></div>
  ) : null;
}
