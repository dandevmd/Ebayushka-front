import React, {
  useEffect,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { Card, Tabs } from "antd";
import { useAppSelector } from "../redux/hooks";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import CarouselComponent from "./CarouselComponent";
import ProductDescriptionListComponent from "./ProductDescriptionListComponent";
import { rateProductRequest } from "../services/productService";
import { Rate } from "antd";
import { toast } from "react-toastify";
import ModalComponent from "./ModalComponent";

interface IcomponentProps {
  setRerenderAfterRatingChange: Dispatch<SetStateAction<boolean>>;
}

const SingleProductComponent: React.FC<IcomponentProps> = ({
  setRerenderAfterRatingChange,
}) => {
  const { product } = useAppSelector((state) => state.product);
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const averageRating = useMemo(
    () =>
      product &&
      product.ratings &&
      product.ratings.length &&
      product.ratings.reduce((a, c) => c.rating + a, 0) /
        product.ratings.length,
    [product.ratings]
  );
  const [newProductRating, setNewProductRating] = useState(0);

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
          <span className="h5 mr-3">Product Rating ({product?.ratings?.length}) : </span>{" "}
          <Rate disabled className="mb-2" defaultValue={averageRating} />{" "}
        </div>
        <Card
          actions={[
            <>
              <ShoppingCartOutlined className="text-success" /> <br />
              Add to Cart
            </>,
            <>
              <HeartOutlined
                className="text-info"
                onClick={() => navigate("/")}
              />{" "}
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
