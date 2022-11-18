import { useEffect, useState } from "react";
import ProductCardComponent from "../../../components/ProductCardComponent";
import AdminSideBarComponent from "../../../components/sidebar/AdminSideBarComponent";
import SkeletonComponent from "../../../components/SkeletonComponent";
import { useAppDispatch } from "../../../redux/hooks";
import { getAllProd } from "../../../redux/slices/productSlice";
import { getAllProducts } from "../../../services/productService";

const AdminProductsPage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getAllProductsWithoutFilter();
  }, []);

  const getAllProductsWithoutFilter = async () => {
    setLoading(true);
    const getAllP = await getAllProducts();
    getAllP && dispatch(getAllProd(getAllP));
    setLoading(false);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminSideBarComponent />
        </div>
        <div className="col">
          {loading ? (
            <SkeletonComponent />
          ) : (
            <div className="row mt-3">
              <ProductCardComponent instance="all-products" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProductsPage;
