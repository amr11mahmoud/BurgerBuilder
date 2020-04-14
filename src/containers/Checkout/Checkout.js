import React, { Component } from "react";
import CheckoutSummray from "../../components/Order/CheckoutSummary/CheckoutSummray";
export default class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      chesse: 1,
      bacon: 1,
    },
  };
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      // ['salad','1']
      ingredients[param[0]] = +param[1];
    }
    this.setState({
      ingredients: ingredients,
    });
  }

  cancelHandler = () => {
    this.props.history.goBack();
  };

  continueHandler = () => {
    this.props.history.replace("./checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummray
          ingredients={this.state.ingredients}
          cancelClicked={this.cancelHandler}
          continueClicked={this.continueHandler}
        />
      </div>
    );
  }
}
