import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart, setCart } from "../../redux/cartSlice";
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Quantity from "./Quantity";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { getProductById } from "../../helper/axios";

export const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cartInfo);
  console.log(cart);

  const [totalAmount, setTotalAmount] = useState();
  const _id = cart._id;
  const { users } = useSelector((state) => state.userInfo);
  const { products } = useSelector((state) => state.productInfo);
  console.log(products);
  console.log(products);
  // const [qty, setQty] = useState([]);
  const [quantity, setQuantity] = useState(cart.quantity);

  const [product, setProduct] = useState({});

  useEffect(() => {
    // call data
    // set to state
    async function getData() {
      const { products } = await getProductById(_id);
      if (products) {
        setProduct(products);
      }
    }
    getData();
  }, [_id]);
  useEffect(() => {
    const totalAmount = cart.reduce((acc, item) => {
      return acc + item.price * item.quantity + shipping;
    }, 0);
    setTotalAmount(totalAmount);
  }, [cart]);
  const { qty } = product;

  const handleOnCheckOut = () => {
    users._id
      ? navigate("/checkOut") || setCart(totalAmount)
      : navigate("/login");
  };
  if (cart.length === 0) {
    return (
      <div className="h-[90vh] flex justify-center items-center text-4xl ">
        Please Select the product first
      </div>
    );
  }

  const handleOnDelete = (_id) => {
    dispatch(removeItemFromCart(_id));
    navigate("/cart");
  };
  const handleInc = (_id) => {
    cart.map((item) => {
      if (item._id === _id) {
        if (item.quantity < item.qty) {
          return dispatch(setCart({ ...item, orderQty: item.orderQty + 1 }));
        } else {
          toast.error("Limit fulfilled");
        }
      }
      return item;
    });

    navigate("/cart");
  };

  const increaseQuantity = (_id) => {
    quantity < qty ? setQuantity(quantity + 1) : setQuantity(qty);
  };

  const decreaseQuantity = (_id) => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  //shipping charge
  const shipping = 10;

  // const handleDec = (_id) => {
  //   cart.map((item) => {
  //     if (item._id === _id) {
  //       const newQuantity = Math.max(item.quantity - 1, 1);
  //       return dispatch(setCart({ ...item, quantity: newQuantity }));
  //     }
  //     return item;
  //   });

  navigate("/cart");

  let discount = (20 / 100) * totalAmount;
  let excludeDecimalDiscont = Math.floor(discount);
  // useEffect(() => {
  //   dispatch(setCart(qty));
  // }, [qty]);

  return (
    <div>
      <Header />

      <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol size="12">
              <MDBCard
                className="card-registration card-registration-2"
                style={{ borderRadius: "15px" }}
              >
                <MDBCardBody className="p-0">
                  <MDBRow className="g-0">
                    <MDBCol key={_id} lg="8">
                      <div className="p-5">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                          <MDBTypography
                            tag="h1"
                            className="fw-bold mb-0 text-black"
                          >
                            Shopping Cart
                          </MDBTypography>

                          <MDBTypography className="mb-0 text-muted">
                            {cart.length}
                          </MDBTypography>
                        </div>

                        <hr className="my-4" />
                        {cart?.map((item, _id) => {
                          return (
                            <MDBRow className="mb-4  d-flex justify-content-between align-items-center">
                              <MDBCol md="2" lg="2" xl="2">
                                <MDBCardImage
                                  src={
                                    process.env.REACT_APP_ROOTSERVER +
                                    item.thumbnail?.slice(6)
                                  }
                                  fluid
                                  className="rounded-3"
                                  alt="Cotton T-shirt"
                                />
                              </MDBCol>
                              <MDBCol md="3" lg="3" xl="3">
                                <MDBTypography
                                  tag="h6"
                                  className="text-black mb-0"
                                >
                                  {item.name}
                                  <br></br>${item.price}
                                </MDBTypography>
                              </MDBCol>
                              <MDBCol md="3" lg="2" xl="2" className="text-end">
                                <MDBTypography tag="h6" className="mb-0">
                                  ${item.price * item.quantity}
                                </MDBTypography>
                              </MDBCol>

                              <MDBCol
                                md="3"
                                lg="3"
                                xl="3"
                                className="d-flex align-items-center"
                              >
                                <Quantity
                                  quantity={item.quantity}
                                  increaseQuantity={increaseQuantity}
                                  decreaseQuantity={decreaseQuantity}
                                  qty={item.qty}
                                />
                              </MDBCol>

                              <MDBCol
                                md="1"
                                lg="1"
                                xl="1 "
                                className="text-center"
                              >
                                <button
                                  className="text-gray-600 transition hover:text-red-600"
                                  onClick={() => {
                                    handleOnDelete(item._id);
                                  }}
                                >
                                  <span className="sr-only">Remove item</span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-4 w-4"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                  </svg>
                                </button>
                              </MDBCol>
                            </MDBRow>
                          );
                        })}

                        <hr className="my-4" />

                        <hr className="my-4" />

                        <div className="pt-5">
                          <MDBTypography tag="h6" className="mb-0">
                            <MDBCardText
                              tag="a"
                              href="#!"
                              className="text-body"
                            >
                              <MDBIcon fas icon="long-arrow-alt-left me-2" />{" "}
                              Back to shop
                            </MDBCardText>
                          </MDBTypography>
                        </div>
                      </div>
                    </MDBCol>
                    <MDBCol lg="4" className="bg-grey">
                      <div className="p-5">
                        <MDBTypography
                          tag="h3"
                          className="fw-bold mb-5 mt-2 pt-1"
                        >
                          Summary
                        </MDBTypography>

                        <hr className="my-4" />

                        <MDBTypography tag="h5" className="text-uppercase mb-3">
                          Shipping cost
                        </MDBTypography>

                        <div className="mb-4 pb-2">$10</div>

                        <hr className="my-4" />

                        <div className="d-flex justify-content-between mb-5">
                          <MDBTypography tag="h5" className="text-uppercase">
                            Total price
                          </MDBTypography>
                          <MDBTypography tag="h5">${totalAmount}</MDBTypography>
                        </div>

                        <MDBBtn
                          color="dark"
                          block
                          size="lg"
                          onClick={handleOnCheckOut}
                        >
                          checkOut
                        </MDBBtn>
                      </div>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      <Footer />
    </div>
  );
};
