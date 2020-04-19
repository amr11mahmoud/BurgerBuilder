import React, { Component } from "react";
import Aux from "../../hoc/Auxilliry";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummray/OrderSummray";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandling/withErrorHandler";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    purchesable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    // axios
    //   .get("https://burgerbuilder-7940b.firebaseio.com/ingredients.json")
    //   .then((response) => {
    //     this.setState({
    //       ingredients: response.data,
    //     });
    //   })
    //   .catch((error) => {
    //     this.setState({
    //       error: true,
    //     });
    //   });
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

  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients,
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const updatedPrice = oldPrice + priceAddition;
  //   this.setState({
  //     totalPrice: updatedPrice,
  //     ingredients: updatedIngredients,
  //   });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients,
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceSubstract = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const updatedPrice = oldPrice - priceSubstract;
  //   if (this.state.ingredients[type] > 0) {
  //     this.setState({
  //       totalPrice: updatedPrice,
  //       ingredients: updatedIngredients,
  //     });
  //     this.updatePurchaseState(updatedIngredients);
  //   }
  // };

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
      ...this.props.ings,
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

    if (this.props.ings != null) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            addIngredient={this.props.onIngredientAdded}
            removeIngredient={this.props.onIngredientRemoved}
            disabled={disableInfo}
            totalprice={this.props.price}
            purchesable={this.state.purchesable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );

      OrderSummaryy = (
        <OrderSummary
          ingredients={this.props.ings}
          continueClicked={this.purchaseContinueHandler}
          cancelClicked={this.hideOrder}
          totalprice={this.props.price}
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

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: (ingName) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName,
      }),
  };
};

// order is !!! very important here , it should be mapStateToProps First
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
