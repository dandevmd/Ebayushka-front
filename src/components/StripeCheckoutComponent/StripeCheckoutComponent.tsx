import React, { useEffect, useState } from "react";
import { useElements, CardElement, useStripe } from "@stripe/react-stripe-js";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { StripeCardElementChangeEvent } from "@stripe/stripe-js";
import { createPaymentIntent } from "../../services/stripeService";
import "./stripe.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetDiscountedPrice } from "../../redux/slices/couponSlice";
import { emptyCart } from "../../redux/slices/productSlice";
import { removeCart } from "../../services/cartService";
import { createOder } from "../../services/orderService";

const cartStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#32325d",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const StripeCheckoutComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { discountedPrice } = useAppSelector((state) => state.coupon);
  const { cart } = useAppSelector((state) => state.product);
  const { user } = useAppSelector((state) => state.user);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState<undefined | string>("");
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [cartData, setCartData] = useState("");
  const cartTotal = cart && cart.reduce((a, c) => a + c.count * c.price, 0);

  useEffect(() => {
    getClientSecret();
  }, []);

  const getClientSecret = async () => {
    try {
      const { data } = await createPaymentIntent(user.token);
      data && setClientSecret(data?.clientSec);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const payload = await stripe?.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements!.getElement(CardElement)!,
        },
      });

      if (payload?.paymentIntent) {
        try {
          // createOrder return undefined so don't worry
          const newOrder = await createOder(user?.token, payload.paymentIntent);
          if (newOrder?.ok) {
            await removeCart(user?.token);
            navigate("/user/history");
            dispatch(resetDiscountedPrice());
            dispatch(emptyCart());
            toast.success(
              "Your payment is succeeded. We order will be processed soon."
            );
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setProcessing(false);
  };

  const handleChange = (e: StripeCardElementChangeEvent) => {
    // is a state observable on the cart element
    setDisabled(e.empty);
    setError(e.error && e.error.message);
  };

  return (
    <div>
      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <div className="d-flex flex-row justify-content-between align-items-center mx-3 mb-5">
          <h5> {discountedPrice ? "To pay with discount:" : "To pay:"}</h5>
          <h5>{discountedPrice ? discountedPrice : cartTotal} $</h5>
        </div>
        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={(e) => handleChange(e)}
        />
        <button
          className="stripe-button mt-3"
          disabled={processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner" /> : "Pay"}
          </span>
        </button>
        {error && (
          <div className="error my-3" role="error">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default StripeCheckoutComponent;
