import React from "react";
import burgrLogo from "../../assets/images/logo.png";
import classes from "./Logo.css";
export default function logo(props) {
  return (
    <div
      className={classes.Logo}
      style={{ height: props.height, marginBottom: props.marginBottom }}
    >
      <img src={burgrLogo} alt="myBurger" />
    </div>
  );
}
