import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderAction } from "../../actions/orderAction";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";
import { Button } from "react-bootstrap";
import { clearCart } from "../../redux/cartSlice";

export const OrderComp = () => {
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.orderInfo);
  const orderNumber = localStorage.getItem("orderNumber");
  const { cart } = useSelector((state) => state.cartInfo);

  useEffect(() => {
    dispatch(getOrderAction());
  }, [dispatch]);

  const shipping = 10;
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity + shipping,
    0
  );

  return (
    <div>
      <Header />

      <div className="text-center mb-5 mt-4">
        <h1 className="text-4xl font-bold text-black mb-2">
          Thank You for Shopping!
        </h1>
        <p className="text-lg text-gray-700">
          Your order has been successfully placed.
        </p>
        <span className="ordernumber">Your Order Number is: {orderNumber}</span>
      </div>

      <div className="mb-4">
        <h2>Your Order Summary</h2>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Item Name</th>
            <th>Order Quantity</th>
            <th>Price</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-end mb-4">
        <span className="fw-bold">Amount Paid: ${totalAmount.toFixed(2)}</span>
      </div>

      <div className="d-flex justify-content-end mb-5">
        <Link to="/">
          <Button variant="success">Continue Shopping</Button>
        </Link>
      </div>

      <Footer />
    </div>
  );
};
