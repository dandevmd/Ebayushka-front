import React, {
  useEffect,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { Card, Tabs } from "antd";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import CarouselComponent from "./CarouselComponent";
import ProductDescriptionListComponent from "./ProductDescriptionListComponent";
import { rateProductRequest } from "../services/productService";
import { Rate } from "antd";
import { toast } from "react-toastify";
import ModalComponent from "./ModalComponent";
import { addProductTocart, IProduct } from "../redux/slices/productSlice";
import { toggleDrawer } from "../redux/slices/cartDrawerSlice";
import { add } from "../services/wishlistService";

interface IcomponentProps {
  setRerenderAfterRatingChange: Dispatch<SetStateAction<boolean>>;
}

const SingleProductComponent: React.FC<IcomponentProps> = ({
  setRerenderAfterRatingChange,
}) => {
  const { product, cart } = useAppSelector((state) => state.product);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [newProductRating, setNewProductRating] = useState(0);

  const averageRating = useMemo(
    () =>
      product &&
      product.ratings &&
      product.ratings.length &&
      product.ratings.reduce((a, c) => c.rating + a, 0) /
        product.ratings.length,
    [product.ratings]
  );

  const handleAddToCart = (p: IProduct) => {
    const existingItem = cart && cart.find((i: IProduct) => i._id === p._id);
    if (existingItem) return;
    dispatch(addProductTocart({ ...p, count: 1 }));
    cart.length >= 1 && toast.success("Item added to the cart.");
  };

  const addToCartFromCover = (p: IProduct) => {
    return !cart.length
      ? (handleAddToCart(p), dispatch(toggleDrawer()))
      : handleAddToCart(p);
  };

  const addToWishList = async () => {
    try {
      const data = await add(user.token, product._id);
      if (data.ok) {
        toast.success("Item was added to yours wishlist.");
        navigate('/user/wishlist')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="col-md-7">
        {product.images && product.images.length ? (
          <CarouselComponent images={product.images} />
        ) : (
          <Card
            cover={
              <img
                src="/images/default-image.png"
                alt="default-img"
                style={{
                  height: "450px",
                  objectFit: "cover",
                }}
              />
            }
          />
        )}
        <Tabs type="card" style={{ marginTop: "8%" }}>
          <Tabs.TabPane tab="Description" key="1">
            {product?.description && product.description}
          </Tabs.TabPane>{" "}
          <Tabs.TabPane tab="More" key="2">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate
            minus possimus vel animi. Temporibus qui atque recusandae
            repellendus dignissimos omnis, nesciunt voluptatum aliquid maxime
            numquam ducimus nostrum ratione quasi sunt!
          </Tabs.TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="p-3 bg-info rounded text-center">{product.title}</h1>
        <div className="d-flex justify-content-between  align-items-center px-2">
          <span className="h5 mr-3">
            Product Rating ({product?.ratings?.length}) :{" "}
          </span>{" "}
          <Rate disabled className="mb-2" defaultValue={averageRating} />{" "}
        </div>
        <Card
          actions={[
            <>
              <ShoppingCartOutlined
                className="text-success"
                onClick={() => addToCartFromCover(product)}
                disabled={product.quantity === 0}
              />{" "}
              <br />
              Add to Cart
            </>,
            <>
              <HeartOutlined className="text-info" onClick={addToWishList} />{" "}
              <br /> Add to Wishlist
            </>,
            <>
              <ModalComponent
                newProductRating={newProductRating}
                setRerenderAfterRatingChange={setRerenderAfterRatingChange}
              >
                <Rate
                  defaultValue={averageRating}
                  onChange={(e) => setNewProductRating(e)}
                />
              </ModalComponent>
            </>,
          ]}
        >
          <ProductDescriptionListComponent product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProductComponent;
