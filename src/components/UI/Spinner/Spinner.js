import React from "react";
import classes from "./Spinner.css";
export default function spinner() {
  return (
    <div className={classes.Spinner}>
      <div className={classes.Bounce1}></div>
      <div className={classes.Bounce2}></div>
      <div className={classes.Bounce3}></div>
    </div>
  );
}
