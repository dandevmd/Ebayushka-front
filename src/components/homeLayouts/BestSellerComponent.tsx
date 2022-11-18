import ProductCardComponent from "../../components/ProductCardComponent";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import SkeletonComponent from "../../components/SkeletonComponent";
import { getBestSelled } from "../../redux/slices/productSlice";
import { getProductsByFilter } from "../../services/productService";
import { useEffect, useState } from "react";
import { Pagination } from "antd";

const BestSellerComponent = () => {
  const dispatch = useAppDispatch();
  const { bestSelledProducts } = useAppSelector((state) => state.product);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(3);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFilteredProducts();
  }, [page]);

  const getFilteredProducts = async () => {
    setLoading(true);
    const filteredProducts = await getProductsByFilter(
      "sold",
      "desc",
      page,
      perPage
    );
    if (!filteredProducts) {
      console.log("Fetching filtered products gone wrong!");
      return;
    }
    dispatch(getBestSelled(filteredProducts));
    setLoading(false);
  };

  return (
    <>
      <div className="container">
        {loading ? (
          <SkeletonComponent count={3} />
        ) : (
          <div className="row">
            <ProductCardComponent instance="best-seller" />
          </div>
        )}
        <div className="d-flex justify-content-center my-2">
          <Pagination
            defaultCurrent={page}
            total={Math.round((bestSelledProducts.countDocuments / 3) * 10)}
            onChange={(newPg) => setPage(newPg)}
          />
        </div>
      </div>
    </>
  );
};

export default BestSellerComponent;
