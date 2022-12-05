import React, { useEffect, useState } from "react";
import UserSideBarComponent from "../../components/sidebar/UserSideBarComponent";
import { useAppSelector } from "../../redux/hooks";
import { getUserOrders } from "../../services/orderService";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

export const showOrderInTheTable = (order: any) => (
  <table className="table table-bordered">
    <thead className="thead-light">
      <tr>
        <th>Title</th>
        <th>Price</th>
        <th>Count</th>
        <th>Color</th>
      </tr>
    </thead>

    <tbody>
      {order &&
        order?.products &&
        order?.products?.map((product: any) => (
          <tr key={product?._id}>
            <td>{product?.title}</td>
            <td>{product?.price} $</td>
            <td>
              {product?.count} {product?.count > 1 ? "units" : "unit"}
            </td>
            <td>{product?.color}</td>
          </tr>
        ))}
    </tbody>
  </table>
);

const UserHistoryPage = () => {
  const { user } = useAppSelector((state) => state.user);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getUserHistory();
  }, []);

  const getUserHistory = async () => {
    try {
      const orders = await getUserOrders(user.token);
      setOrders(orders);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserSideBarComponent />
        </div>
        <div className="col">
          <h4>
            {orders.length > 0 ? "User purchase order" : "User has no orders"}
          </h4>
          <div>
            {orders &&
              orders.map((o: any) => {
                return (
                  <div className="m-5 p-3 card">
                    <p>Show payment Info</p>
                    {showOrderInTheTable(o)}

                    <div className="d-flex justify-content-between align-items center m-2">
                      <div>Order Status:</div>
                      <div className="badge rounded-pill badge-primary text-center mt-1 ">
                        <span
                          style={{
                            fontSize: "14px",
                          }}
                        >
                          {o?.orderStatus}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items center m-2 ">
                      <div>
                        <b>Total paid:</b>
                      </div>
                      <div>
                        <b>{o?.paymentIntent?.amount / 100} $</b>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHistoryPage;
