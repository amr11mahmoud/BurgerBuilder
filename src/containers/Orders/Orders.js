import React, { Component } from "react";
import Order from "./Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandling/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
class Orders extends Component {
  // state = {
  //   orders: [],
  //   loading: true,
  // };
  componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    let orders = <Spinner />;

    if (this.props.loading == false) {
      orders = (
        <div>
          {this.props.orders.map((order) => (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.price}
            />
          ))}
        </div>
      );
    }

    return orders;
  }
}
const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
