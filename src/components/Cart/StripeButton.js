import React, {Component} from 'react';
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export default function StripeButton({value}) {
    const {cartTotal, clearCart} = value;
  const [product] = React.useState({
    name: "My Shop",
    price: cartTotal,
    description: "1234 Blenfield Drive"
  });

  async function handleToken2(token, addresses, props) {
    await axios.post(
      process.env.STRIPE_BACKEND,
      { token, product })
    .then(function (response){
        const { status } = response.data;
        console.log("Response:", status);
        if (status === "success") {
            toast("Success! Check email for details", { type: "success" });
            
          } 
          else {
            toast("Something went wrong", { type: "error" });
          }
          clearCart();
    })
    .catch(function (error){
        console.log("error: ", error)
        toast("Something went wrong", { type: "error" });
    })
    ;
  }

  return (
    <div className="container">
      <div className="product">
      </div>
      <StripeCheckout
        stripeKey={process.env.STRIPE_KEY}
        token={handleToken2}
        amount={cartTotal * 100}
        name="Tesla Roadster"
        billingAddress
        shippingAddress
      />
    </div>
  );
}