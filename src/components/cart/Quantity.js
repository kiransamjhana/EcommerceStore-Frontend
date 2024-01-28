import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const Quantity = () => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="quantity-control d-flex gap-4">
      <div>
        {" "}
        <button className="quantity-button" onClick={decreaseQuantity}>
          <FaMinus />
        </button>
      </div>

      <span className="quantity-display">{quantity}</span>
      <div>
        {" "}
        <button className="quantity-button" onClick={increaseQuantity}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default Quantity;
