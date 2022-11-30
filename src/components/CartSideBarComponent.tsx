import { Drawer, Button } from "antd";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import { toggleDrawer } from "../redux/slices/cartDrawerSlice";

const CartSideBarComponent = () => {
  const { cart } = useAppSelector((state) => state.product);
  const { user } = useAppSelector((state) => state.user);
  const { drawer } = useAppSelector((state) => state.drawerRed);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Drawer
        className="text-center"
        title={`(${cart.length}) Cart Item`}
        placement="right"
        onClose={() => dispatch(toggleDrawer())}
        open={drawer}
      >
        {cart.map((i) => (
          <div
            key={i._id}
            className="row justify-content-around align-items-center"
          >
            <div onClick={() => navigate(`/product/${i.slug}`)}>
              {" "}
              <img
                className="d-flex justify-conten-center"
                src={
                  i.images.length > 0
                    ? i.images[0].secure_url
                    : "/images/default-image.png"
                }
                style={{
                  width: "80px",
                  height: "80px",
                }}
              />
            </div>
            <p className="pt-2">{i.title}</p>
            {user ? (
              <button
                className="btn btn-primary btn-raised"
                onClick={() => (dispatch(toggleDrawer()), navigate("/cart"))}
              >
                Buy it Now
              </button>
            ) : (
              <button
                className="btn btn-primary btn-raised"
                onClick={() => (dispatch(toggleDrawer()), navigate("/login"))}
              >
                Login to buy
              </button>
            )}
          </div>
        ))}
      </Drawer>
    </>
  );
};

export default CartSideBarComponent;
