import React, { useEffect, useState } from "react";
import AdminSideBarComponent from "../../components/sidebar/AdminSideBarComponent";
import { useAppSelector } from "../../redux/hooks";
import { getAllOrders, updateOrderStatus } from "../../services/orderService";
import OrdersList from "../../components/OrdersList";
import Loader from "../../components/Loader";

const AdminDashboardPage = () => {
  const { user } = useAppSelector((state) => state.user);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsersOrders();
  }, [loading]);

  const getUsersOrders = async () => {
    try {
      const orders = await getAllOrders(user.token);
      setOrders(orders);
    } catch (error) {
      console.log(error);
    }
  };

  const changeOrderStatus = async (orderId:string, newOrderStatus:string ) => {
    setLoading(true);
    try {
      const updated = await updateOrderStatus(
        user?.token,
        orderId,
        newOrderStatus
      );
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminSideBarComponent />
        </div>
        <div className="col">
          <OrdersList
            orders={orders}
            changeOrderStatus={changeOrderStatus}
          />
        </div>
      </div>{" "}
    </div>
  );
};

export default AdminDashboardPage;
