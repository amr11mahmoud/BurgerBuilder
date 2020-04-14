import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import withRouter from "react-router-dom";
class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const order = {
      ingredients: this.props.ingredients,
      // in real app we should calculate these info in server side so user can't maniuplate it
      price: this.props.price,
      customer: {
        name: "amir",
        address: {
          street: "15 street",
          zipCode: 1515,
          country: "Egypt",
        },
        email: "amir@gmail.com",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })

      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form>
        <input
          type="text"
          name="name"
          placeholder="name"
          className={classes.Input}
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          className={classes.Input}
        />
        <input
          type="text"
          name="street"
          placeholder="street"
          className={classes.Input}
        />
        <input
          type="text"
          name="postalcode"
          placeholder="postal code"
          className={classes.Input}
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          Order
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
