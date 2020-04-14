import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummray.css";

const checkoutSummray = (props) => {
  return (
    <div className={classes.CheckoutSummray}>
      <h1>We hope it tastes well !</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button clicked={props.cancelClicked} btnType="Danger">
        CANCEL
      </Button>
      <Button clicked={props.continueClicked} btnType="Success">
        CONTINUE
      </Button>
    </div>
  );
};

export default checkoutSummray;
