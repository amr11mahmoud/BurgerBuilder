import React, { Component } from "react";
import Aux from "../../../hoc/Auxilliry";
import Button from "../../UI/Button/Button";

class OrderSummray extends Component {
  // componentWillUpdate() {
  //   console.log("[order summary ] will update");
  // }

  render() {
    const ingredientSummray = Object.keys(this.props.ingredients).map(
      (igKey) => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
            {this.props.ingredients[igKey]}
          </li>
        );
      }
    );

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients: </p>
        <ul>{ingredientSummray}</ul>
        <p>
          Total Price: <strong>{this.props.totalprice.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout</p>

        <Button btnType="Danger" clicked={this.props.cancelClicked}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.continueClicked}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummray;
