import React from "react";
import classes from "./Backdrop.css";
export default function backdrop(props) {
  let place = [classes.Backdrop];
  if (props.sideDrawer) {
    place = [classes.Backdrop, classes.SideDrawer].join(" ");
  }
  return props.show ? (
    <div className={place} onClick={props.hideOrder}></div>
  ) : null;
}
