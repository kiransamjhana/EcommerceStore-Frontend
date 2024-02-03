import React, { useEffect } from "react";
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getOrderAction } from "../../actions/orderAction";
import Table from "react-bootstrap/Table";
export const OrderComp = () => {
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.orderInfo);
  console.log(order);
  const orderNumeber = localStorage.getItem("orderNumber");
  const { cart } = useSelector((state) => state.cartInfo);
  console.log(cart);

  useEffect(() => {
    dispatch(getOrderAction());

    // dispatch(autoLogin());
  }, [dispatch]);
  const shipping = 10;
  const totalAmount = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity + shipping;
  }, 0);
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
        <span className="ordernumber">
          {" "}
          your order Number is :: {orderNumeber}
        </span>
      </div>

      <div> Your Order Summary</div>
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>#</th>
            <th>Item Name</th>
            <th>Order Quantity</th>
            <th>price</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.price * item.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <span className="d-flex justify-end">Amount Paid ${totalAmount}</span>

      {/* <div className="bg-indigo-100 p-4 rounded-lg text-center mb-6">
        <p className="text-lg font-semibold text-indigo-700 mb-2">
          Order Number
        </p>
        <p className="text-xl text-indigo-900">{orderNumeber} </p>
      </div> */}

      {/* <Footer /> */}
    </div>
  );
};
