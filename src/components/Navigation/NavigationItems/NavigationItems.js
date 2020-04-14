import React from "react";
import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import { Link } from "react-router-dom";
export default function navigationItems() {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" active>
        Burger Builder
      </NavigationItem>
      <NavigationItem link="/Checkout">Checkout</NavigationItem>
    </ul>
  );
}
