import React, { Component } from "react";
import CheckoutSummray from "../../components/Order/CheckoutSummary/CheckoutSummray";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
export default class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0,
  };
  UNSAFE_componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      // ['salad','1'] ... etc
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({
      ingredients: ingredients,
      price: price,
    });
  }

  cancelHandler = () => {
    this.props.history.goBack();
  };

  continueHandler = () => {
    this.props.history.push("./checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummray
          ingredients={this.state.ingredients}
          cancelClicked={this.cancelHandler}
          continueClicked={this.continueHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.price}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}
