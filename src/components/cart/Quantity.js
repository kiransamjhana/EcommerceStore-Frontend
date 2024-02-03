import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const Quantity = ({ qty, quantity, increaseQuantity, decreaseQuantity }) => {
  return (
    <div className="quantity-control d-flex gap-3">
      <div>
        {" "}
        <button
          className="quantity-button col-span-2"
          onClick={decreaseQuantity}
        >
          <FaMinus />
        </button>
      </div>

      <span className="quantity-display">{quantity}</span>
      <div>
        {" "}
        <button
          className="quantity-button col-start-auto"
          onClick={
            quantity > qty ? window.alert("maximum limit") : increaseQuantity
          }
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default Quantity;
