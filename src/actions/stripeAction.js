// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { postPaymentIntent } from "../helper/axios";
// import { toast } from "react-toastify";

// export const postNewPayment = async (obj) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const pendingResp = postPaymentIntent(obj);
//   toast.promise(pendingResp, {
//     pending: " please wait ..",
//   });
//   toast[status](message);
//   const { status, message } = await pendingResp;
//   console.log(pendingResp);

//   const clientSecret = pendingResp.clientSecret;
//   const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//     payment_method: {
//       card: elements.getElement(CardElement),
//     },
//   });
//   if (paymentIntent.status === "succeeded") {
//     toast.message("Your order has been processed successfully");
//   } else {
//     toast.warning("Could'nt process your order now,,please try again");
//   }
// };
