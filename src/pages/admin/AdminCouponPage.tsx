import React from "react";
import AdminSideBarComponent from "../../components/sidebar/AdminSideBarComponent";

const AdminCouponPage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminSideBarComponent />
        </div>
        <div className="col">AdminDashboardPage</div>
      </div>
    </div>
  );
};

export default AdminCouponPage;
