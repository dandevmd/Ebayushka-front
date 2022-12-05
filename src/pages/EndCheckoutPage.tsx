import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutComponent from "../components/StripeCheckoutComponent/StripeCheckoutComponent";
import { useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);

const EndCheckoutPage = () => {
  const { cart } = useAppSelector((state) => state.product);
  const { discountedPrice } = useAppSelector((state) => state.coupon);
  const navigate = useNavigate();

  useEffect(() => {
    !cart.length && navigate("/shop");
  }, [cart.length]);

  return (
    <div className="container p-5 text-center">
      <h4>Complete your purchase</h4>

      <Elements stripe={promise}>
        <div className="col-md-8 offset-md-2">
          <StripeCheckoutComponent />
        </div>
      </Elements>
    </div>
  );
};

export default EndCheckoutPage;
