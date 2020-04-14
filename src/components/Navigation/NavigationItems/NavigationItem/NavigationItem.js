import React from "react";
import classes from "./NavigationItem.css";
import { NavLink } from "react-router-dom";
export default function navigationItem(props) {
  return (
    <li className={classes.NavigationItem}>
      <NavLink exact activeClassName={classes.active} to={props.link}>
        {props.children}
      </NavLink>
    </li>
  );
}
