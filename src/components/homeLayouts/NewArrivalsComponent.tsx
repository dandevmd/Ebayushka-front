import ProductCardComponent from "../../components/ProductCardComponent";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import SkeletonComponent from "../../components/SkeletonComponent";
import {
  getNewestArrivals,
} from "../../redux/slices/productSlice";
import { getProductsByFilter } from "../../services/productService";
import { useEffect, useState } from "react";
import { Pagination, PaginationProps } from "antd";
import { setLoading } from "../../redux/slices/userSlice";

const NewArrivalsComponent = () => {
  const dispatch = useAppDispatch();
  const { newestArrivedProducts } = useAppSelector((state) => state.product);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(3);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFilteredProducts();
  }, [page]);

  const getFilteredProducts = async () => {
    setLoading(true);
    const filteredProducts = await getProductsByFilter(
      "createdAt",
      "desc",
      page,
      perPage
    );
    if (!filteredProducts) {
      console.log("Fetching filtered products gone wrong!");
      return;
    }
    dispatch(getNewestArrivals(filteredProducts));
    setLoading(false);
  };

  return (
    <>
      <div className="container">
        {loading ? (
          <SkeletonComponent count={3}/>
        ) : (
          <div className="row">
            <ProductCardComponent instance="new-arrivals" />
          </div>
        )}
        <div className="d-flex justify-content-center my-2">
          <Pagination
            defaultCurrent={page}
            total={Math.round((newestArrivedProducts.countDocuments / 3) * 10)}
            onChange={(newPg) => setPage(newPg)}
          />
        </div>
      </div>
    </>
  );
};

export default NewArrivalsComponent;
