import React from "react";
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";

export const OrderComp = () => {
  return (
    <div>
      <Header />

      <p> Thank you for your order</p>
      <p> please find your order number below for tracking your delivery</p>
      <Footer />
    </div>
  );
};
