import React, { Component } from "react";
import Aux from "../../hoc/Auxilliry";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummray/OrderSummray";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandling/withErrorHandler";
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.5,
  bacon: 0.6,
};
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchesable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get("https://burgerbuilder-7940b.firebaseio.com/ingredients.json")
      .then((response) => {
        this.setState({
          ingredients: response.data,
        });
      })
      .catch((error) => {
        this.setState({
          error: true,
        });
      });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({
      purchesable: sum > 0,
    });
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const updatedPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: updatedPrice,
      ingredients: updatedIngredients,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceSubstract = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const updatedPrice = oldPrice - priceSubstract;
    if (this.state.ingredients[type] > 0) {
      this.setState({
        totalPrice: updatedPrice,
        ingredients: updatedIngredients,
      });
      this.updatePurchaseState(updatedIngredients);
    }
  };

  purchaseHandler = () => {
    // const purchasingState = this.state.purchasing;
    this.setState({
      purchasing: true,
    });
  };

  hideOrder = () => {
    // WILL USE THIS FOR CANCEL BUTTON TOO
    this.setState({
      purchasing: false,
    });
  };

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push("price=" + this.state.totalPrice);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "./checkout",
      search: "?" + queryString,
    });
  };

  render() {
    const disableInfo = {
      ...this.state.ingredients,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    // {salad:true, meat:false, .... }

    let OrderSummaryy = null;

    let burger = this.state.error ? (
      <p style={{ textAlign: "center" }}>
        <strong>Ingredients can't be loaded</strong>{" "}
      </p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients != null) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            addIngredient={this.addIngredientHandler}
            removeIngredient={this.removeIngredientHandler}
            disabled={disableInfo}
            totalprice={this.state.totalPrice}
            purchesable={this.state.purchesable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );

      OrderSummaryy = (
        <OrderSummary
          ingredients={this.state.ingredients}
          continueClicked={this.purchaseContinueHandler}
          cancelClicked={this.hideOrder}
          totalprice={this.state.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      OrderSummaryy = <Spinner />;
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} hideOrder={this.hideOrder}>
          {OrderSummaryy}
        </Modal>

        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
