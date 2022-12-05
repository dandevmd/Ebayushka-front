import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AddressInput from "../components/AddressInput";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  resetDiscountedPrice,
  updateDiscountPrice,
} from "../redux/slices/couponSlice";
import { emptyCart as emptyCartFront } from "../redux/slices/productSlice";
import { saveAddress } from "../services/auth";
import { getCart, removeCart } from "../services/cartService";
import { verifiedCoupon } from "../services/couponService";

const CheckoutPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const { cart } = useAppSelector((state) => state.product);
  const { discountedPrice } = useAppSelector((state) => state.coupon);
  const [cartFromBack, setCartFromBack] = useState<any>({});
  const [coupon, setCoupon] = useState("");
  const [address, setAddress] = useState({
    country: "",
    city: "",
    address: "",
  });

  const refreshAddress = () => {
    setAddress({
      country: "",
      city: "",
      address: "",
    });
  };

  useEffect(() => {
    !cart.length && navigate("/");
  }, [cart.length]);

  useEffect(() => {
    getUserCart();
  }, []);

  const getUserCart = async () => {
    try {
      const data = await getCart(user?.token);
      setCartFromBack(data);
    } catch (error) {
      console.log(error);
    }
  };
  const emptyCart = async () => {
    try {
      const data = await removeCart(user?.token);
      if (data.ok) {
        dispatch(emptyCartFront());
        setCartFromBack({});
        toast.success("Enjoy you shopping.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveUserAddress = async () => {
    try {
      const data = await saveAddress(user?.token, address);
      if (data.ok) {
        refreshAddress();
        toast.success("Address successfully saved");
        navigate("/end-checkout");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyCoupon = async () => {
    try {
      const data = await verifiedCoupon(user.token, coupon.toUpperCase());
      if (data?.totalAfterDiscount) {
        dispatch(updateDiscountPrice(data?.totalAfterDiscount));
        toast.success("Congratulations you have a discount");
        setCoupon('')
        return;
      }

      if (data) {
        toast.error(data as string);
        setCoupon('')
        return;
      }
      toast.error('This coupon was already applied')
      setCoupon("");
    } catch (error) {
      console.log(error);
    }
  };

  const addressChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.id]: e.target.value });
  };

  return (
    <div className="row m-5 ">
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <AddressInput addressChangeHandler={addressChangeHandler} />
        <hr />
        <br />
        <div>
          <h4>Got coupon ?</h4>
          <>
            <label htmlFor="coupon">Enter below</label>
            <input
              type="text"
              id="coupon"
              value={coupon}
              className="form-control"
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button className="btn btn-primary my-2" onClick={verifyCoupon} disabled={!coupon}>
              Apply
            </button>
          </>
        </div>
      </div>

      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>Products {cartFromBack?.products?.length}</p>
        <hr />
        {cartFromBack &&
          cartFromBack?.products &&
          cartFromBack?.products.map((i: any) => {
            return (
              <div key={i?._id}>
                {i?.product?.title} ({i?.color}) x ({i?.count}) ={" "}
                {i?.price * i?.count} $
              </div>
            );
          })}
        <hr />
        <div>
          <p>Total: ${cartFromBack?.cartTotal} $</p>
          {discountedPrice && (
            <span className="btn-success p-2 disabled">
              Discounted Price : {discountedPrice} $
            </span>
          )}
        </div>
        <div className="d-flex flex-row justify-content-between align-items-center mt-5">
          <button
            className="btn btn-primary"
            onClick={saveUserAddress}
            disabled={
              !address.country ||
              address.country.length < 3 ||
              !address.city ||
              address.city.length < 3 ||
              !address.address ||
              address.address.length < 3
            }
          >
            Place Order
          </button>
          <button className="btn btn-primary" onClick={emptyCart}>
            Empty Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
