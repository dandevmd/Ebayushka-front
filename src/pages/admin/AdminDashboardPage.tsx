import React, { useState } from "react";
import Loader from "../../components/Loader";
import ProductCardComponent from "../../components/ProductCardComponent";
import AdminSideBarComponent from "../../components/sidebar/AdminSideBarComponent";
import { useAppSelector } from "../../redux/hooks";
import { IProduct } from "../../redux/slices/productSlice";

const AdminDashboardPage = () => {
  const [loading, setLoading] = useState(false);
  const { products } = useAppSelector((state) => state.product);

  return loading ? (
    <Loader />
  ) : (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminSideBarComponent />
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
