import React from "react";
import classes from "./Modal.css";
import Aux from "../../../hoc/Auxilliry";
import Backdrop from "../Backdrop/Backdrop";
export default function modal(props) {
  return (
    <Aux>
      <Backdrop show={props.show} hideOrder={props.hideOrder} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
}
