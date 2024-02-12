import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderAction } from "../../actions/orderAction";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";

const OrderComp = () => {
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

      <div className="text-center mb-8 mt-5">
        <h1 className="text-4xl font-bold text-black mb-4">
          Thank You for Shopping!
        </h1>
        <p className="text-lg text-gray-700">
          Your order has been successfully placed.
        </p>
        <span className="ordernumber">Your order Number is: {orderNumber}</span>
      </div>

      <div className="mb-4">Your Order Summary</div>
      <Table striped bordered hover variant="light">
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
          {cart.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-end">
        <span className="fw-bold">Amount Paid: ${totalAmount}</span>
      </div>

      <div className="d-flex justify-content-end mt-4">
        <Link to="/">
          <button type="button" className="btn btn-success btn-lg me-2">
            Continue shopping
          </button>
        </Link>
      </div>

      {/* Additional UI elements you may want to uncomment and use */}
      {/* <div className="bg-indigo-100 p-4 rounded-lg text-center mb-6">
        <p className="text-lg font-semibold text-indigo-700 mb-2">Order Number</p>
        <p className="text-xl text-indigo-900">{orderNumber}</p>
      </div> */}

      {/* <Footer /> */}
    </div>
  );
};

export default OrderComp;
