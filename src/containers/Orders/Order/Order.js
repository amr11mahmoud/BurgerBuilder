import React from "react";
import classes from "./Order.css";
const order = (props) => {
  // same logic we used in burger comp to convert object into array
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName],
    });
  }

  const ingredientsOutput = ingredients.map((ig) => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px",
        }}
        key={ig.name}
      >
        {ig.name} {ig.amount} <br />
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>
        Ingredients:
        {ingredientsOutput}
      </p>
      <p>
        Total Price : <strong>USD {(+props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
