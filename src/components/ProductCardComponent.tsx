import { Card, Rate } from "antd";
import { IProduct, removeProduct, Timage } from "../redux/slices/productSlice";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { deleteProductById } from "../services/productService";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addProductTocart } from "../redux/slices/productSlice";
import CardSideBarComponent from "../components/CartSideBarComponent";
import { toggleDrawer } from "../redux/slices/cartDrawerSlice";

interface IcomponentProps {
  instance?: string;
}

const ProductCardComponent: React.FC<IcomponentProps> = ({ instance }) => {
  const {
    products,
    newestArrivedProducts,
    bestSelledProducts,
    byCategory,
    bySub,
    byFilter,
    relatedProducts,
  } = useAppSelector((state) => state.product);
  const { cart } = useAppSelector((state) => state.product);
  const { user } = useAppSelector((state) => state.user);
  const { drawer } = useAppSelector((state) => state.drawerRed);
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const deleteProductHandler = async (_id: string) => {
    const deletedItem = await deleteProductById(user?.token, _id);
    if (!deletedItem) return toast.error("Deleting item gone wrong.");
    dispatch(removeProduct(deletedItem));
    toast.success("Product was successfully deleted");
  };

  const handleAddToCart = (p: IProduct) => {
    const existingItem = cart && cart.find((i: IProduct) => i._id === p._id);
    if (existingItem) return;
    dispatch(addProductTocart({ ...p, count: 1 }));
   cart.length >=1 && toast.success("Item added to the cart.");
  };

  const addToCartFromCover = (p: IProduct) => {
    return !cart.length
      ? (handleAddToCart(p), dispatch(toggleDrawer()))
      : handleAddToCart(p);
  };

  const productsToMapByInstance = () => {
    switch (instance) {
      case "new-arrivals":
        return newestArrivedProducts.sortedProducts;
      case "best-seller":
        return bestSelledProducts.sortedProducts;
      case "related-products":
        return relatedProducts;
      case "products-by-category":
        return byCategory;
      case "products-by-sub-category":
        return bySub;
      case "products-by-filter":
        return byFilter;
      case "all-products":
        return products;

      default:
        return products;
    }
  };


  return (
    <>
      {productsToMapByInstance().map((p: IProduct) => {
        return (
          <div className="col-md-4 " key={p._id && p._id}>
            {p?.ratings?.length > 0 ? (
              <div className="d-flex justify-content-center  align-items-center ">
                <Rate
                  disabled
                  defaultValue={
                    p?.ratings?.reduce((a, c) => c.rating + a, 0) /
                    p.ratings.length
                  }
                />{" "}
                <span className="ml-2">
                  {p.ratings.length > 0 && `(${p.ratings.length})`}
                </span>
              </div>
            ) : (
              <div className="d-flex justify-content-center  align-items-center ">
                Not rated yet.
              </div>
            )}
            <Card
              key={p._id}
              cover={
                <img
                  style={{
                    height: "150px",
                    objectFit: "cover",
                  }}
                  src={
                    p.images && p.images.length > 0
                      ? p.images[0].secure_url
                      : "/images/default-image.png"
                  }
                  className="p-1"
                />
              }
              actions={
                pathname && pathname === "/admin/products"
                  ? [
                      <>
                        <EditOutlined
                          className="text-warning"
                          onClick={() => navigate(`/admin/product/${p.slug}`)}
                          key="edit"
                        />{" "}
                        <br />
                        Edit Product
                      </>,
                      <>
                        <DeleteOutlined
                          className="text-danger"
                          onClick={() => deleteProductHandler(p._id)}
                          key="delete"
                        />{" "}
                        <br />
                        Delete Product
                      </>,
                    ]
                  : [
                      <>
                        <EyeOutlined
                          className="text-warning"
                          onClick={() => navigate(`/product/${p.slug}`)}
                          key="eye"
                        />{" "}
                        <br /> View Product
                      </>,
                      <div onClick={() => addToCartFromCover(p)}>
                        <ShoppingCartOutlined
                          className="text-danger"
                          key="cart"
                        />{" "}
                        <br /> Add to Cart
                      </div>,
                    ]
              }
              className="m-3"
            >
              <Card.Meta
                description={`${
                  p.description && p.description.substring(0, 100)
                }...`}
                title={p.title}
              />
            </Card>
          </div>
        );
      })}
      <CardSideBarComponent />
    </>
  );
};

export default ProductCardComponent;
