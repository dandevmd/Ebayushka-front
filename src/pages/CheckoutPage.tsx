import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AddressInput from "../components/AddressInput";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { emptyCart as emptyCartFront } from "../redux/slices/productSlice";
import { saveAddress } from "../services/auth";
import { getCart, removeCart } from "../services/cartService";

const CheckoutPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const { cart } = useAppSelector((state) => state.product);
  const [cartFromBack, setCartFromBack] = useState<any>({});
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
        toast.success("Order successfully placed");
      }
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
        <h4>Delivery Adress</h4>
        <AddressInput addressChangeHandler={addressChangeHandler} />
        <hr />
        <br />
        <button className="btn btn-primary-outlined mt-2 ">Save</button>
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
        <div>Total: {cartFromBack?.cartTotal} $</div>
        <div className="d-flex flex-row justify-content-between align-items-center mt-5">
          <button
            className="btn btn-primary"
            onClick={saveUserAddress}
            disabled={
              !address.country ||
              address.country.length < 6 ||
              !address.city ||
              address.city.length < 6 ||
              !address.address ||
              address.address.length < 6
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
