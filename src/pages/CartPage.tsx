import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProductCheckoutCardComp from "../components/ProductCheckoutCardComp";
import { useAppSelector } from "../redux/hooks";
import { saveUserCart } from "../services/cartService";

const CartPage = () => {
  const { user } = useAppSelector((state) => state.user);
  const { cart } = useAppSelector((state) => state.product);
  const navigate = useNavigate();

  const getTotal = () => {
    return cart.reduce((a, c) => {
      return a + c.count * c.price;
    }, 0);
  };

  const saveCartToDb = async () => {
    try {
      const savedCart = await saveUserCart(user?.token, cart );
      
      savedCart.ok
        ? navigate("/checkout")
        : toast.error("Unable to save the cart to db.");
    } catch (error) {
      toast.error("Was unable to save your cart.");
      console.log(error);
    }
  };

  const navigateBackToCart = () => {
    const x = navigate("/login");
    localStorage.setItem(
      "previous_user_route",
      JSON.stringify({ from: "/cart" })
    );
    return x;
  };


  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart / {cart.length} Product</h4>

          {!cart.length ? (
            <p>
              No products in cart. <Link to="/shop">Continue Shopping.</Link>
            </p>
          ) : (
            <>
              <table className="table table-bordered">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Category</th>
                    <th scope="col">Count</th>
                    <th scope="col">Color</th>
                    <th scope="col">Shipping</th>
                    <th scope="col">Remove</th>
                  </tr>
                </thead>
                {cart && <ProductCheckoutCardComp />}
              </table>
            </>
          )}
        </div>
        <div className="col-md-4">
          <h4>Cart Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = ${c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          Total: <b>${getTotal()}</b>
          <hr />
          {user ? (
            <button
              className="btn btn-sm btn-primary mt-2"
              disabled={!cart.length}
              onClick={saveCartToDb}
            >
              Proceed to Checkout
            </button>
          ) : (
            <button
              className="btn btn-sm btn-primary mt-2"
              onClick={navigateBackToCart}
            >
              {" "}
              Login to Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
