import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import AdminSideBarComponent from "../../components/sidebar/AdminSideBarComponent";
import { useAppSelector } from "../../redux/hooks";
import {
  createCoupon,
  deleteCoupon,
  getAllCoupons,
} from "../../services/couponService";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

export interface Icoupon {
  _id?: string;
  name: string;
  expire: Date;
  discount: string;
}

const AdminCouponPage = () => {
  const { user } = useAppSelector((state) => state.user);
  const [coupons, setCoupons] = useState<Icoupon[]>([]);
  const [loading, setLoading] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    name: "",
    expire: new Date(),
    discount: "",
  });

  console.log(coupons);

  const refreshForm = () => {
    setNewCoupon({
      name: "",
      expire: new Date(),
      discount: "",
    });
  };

  useEffect(() => {
    getAllCpns();
  }, []);

  const getAllCpns = async () => {
    setLoading(true);
    try {
      const data = await getAllCoupons(user?.token);
      setCoupons(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const createCpns = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await createCoupon(
        user.token,
        newCoupon.name.toLowerCase(),
        Number(newCoupon.discount),
        newCoupon.expire
      );

      if (data) {
        setCoupons([...coupons, data]);
        toast.success("New coupon created");
        refreshForm();
        return;
      }
      toast.error("Was unable to create new coupon.Try again later.");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const deleteCpns = async (id: string) => {
    setLoading(true);
    try {
      const data = id && (await deleteCoupon(user?.token, id));
      if (data?.ok) {
        setCoupons(coupons.filter((c: Icoupon) => c._id !== id));
        toast.success("Coupon deleted");
        return;
      }
      toast.error("Was unable to remove the coupon");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCoupon({ ...newCoupon, [e.target.id]: e.target.value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminSideBarComponent />
        </div>
        <div className="col-md-10 mt-3">
          <form className="form-group" onSubmit={(e) => createCpns(e)}>
            <>
              <label htmlFor="name" className="text-muted">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                value={newCoupon.name}
                id="name"
                autoFocus
                onChange={handleChange}
                required
              />
            </>
            <div className="mt-3">
              <label htmlFor="discount" className="text-muted">
                Discount %
              </label>
              <input
                type="text"
                className="form-control"
                value={newCoupon.discount}
                id="discount"
                onChange={handleChange}
                required
              />
            </div>

            <div className="my-3">
              <label htmlFor="expire" className="text-muted">
                Expire
              </label>
              <DatePicker
                selected={newCoupon.expire}
                onChange={(date: Date) =>
                  setNewCoupon({ ...newCoupon, expire: date })
                }
                className="form-control"
              />
            </div>

            <div className="">
              <button
                type="submit"
                className="btn  btn-primary"
                disabled={
                  !newCoupon.name.length ||
                  !newCoupon.expire ||
                  !newCoupon.discount ||
                  newCoupon.name.length < 3
                }
              >
                Create coupon
              </button>
            </div>
          </form>

          <br />
          <br />
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th className="col">Name</th>
                <th className="col">Discount</th>
                <th className="col">Expire</th>
                <th className="col">Actions</th>
              </tr>
            </thead>

            <tbody>
              {coupons.length &&
                coupons.map((i: Icoupon) => (
                  <tr key={i._id}>
                    <td className="col">{i.name}</td>
                    <td className="col">{i.discount} %</td>
                    <td className="col">
                      {new Date(i.expire).toLocaleDateString()}
                    </td>
                    <td className="col">
                      <button
                        className="btn btn-danger"
                        onClick={() => i._id && deleteCpns(i._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCouponPage;
