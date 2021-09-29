import React from "react";

function CartInfo(props) {
  const { total_unique_items, formatted_with_symbol } = props;

  return (
    <div className="card" style={{ width: "18rem", margin: "0px auto" }}>
      <h4>Your Cart </h4>
      <p>Cart items : {total_unique_items}</p>
      <p>Cart Value : {formatted_with_symbol}</p>
      <a href="/product/checkout">
        <button className="btn btn-warning">Review Cart</button>
      </a>
    </div>
  );
}

export default CartInfo;
