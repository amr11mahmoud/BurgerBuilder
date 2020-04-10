import React from "react";
import classes from "./Modal.css";
export default function modal(props) {
  return <div className={classes.Modal}>{props.children}</div>;
}
