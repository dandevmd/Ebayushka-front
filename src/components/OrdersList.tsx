import { Select } from "antd";
import React, { SetStateAction } from "react";
import { showOrderInTheTable } from "../pages/user/UserHistoryPage";
import ShowPaymentInfo from "./ShowPaymentInfo";

interface IcomponentProps {
  orders: any[];
  changeOrderStatus: (orderId: string, newOrderStatus: string) => void;
}

const OrdersList: React.FC<IcomponentProps> = ({
  orders,
  changeOrderStatus,
}) => {
  return (
    <div className="mt-3">
      {orders &&
        orders.map((o: any) => {
          return (
            <div key={o?._id} className='my-2'>
              <div
                className=" d-flex flex-column w-100 p-4"
                style={{
                  backgroundColor: "#ccc",
                  color: "#000",
                }}
              >
                <h5>Made by: {o?.orderBy?.name}</h5>
                <ShowPaymentInfo order={o} />
                <div className="row">
                  <div className="col-md-4">Delivery Status</div>
                  <div className="col-md-8">
                    <select
                      className="form-control text-primary px-2"
                      id="order_status"
                      onChange={(e) =>
                        changeOrderStatus(o?._id, e.target.value)
                      }
                    >
                      <option>Change order status</option>
                      <option value="Not processed">Not processed</option>
                      <option value="Pending">Pending</option>
                      <option value="Dispatched">Dispatched</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
                <div className="my-3">{showOrderInTheTable(o)}</div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default OrdersList;
