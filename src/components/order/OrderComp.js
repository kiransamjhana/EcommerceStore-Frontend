import React from "react";
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";

export const OrderComp = () => {
  return (
    <div>
      <Header />

      <p> Your Order has been procced</p>
      <p> please find your order number below for tracking your delivery</p>
      <Footer />
    </div>
  );
};
