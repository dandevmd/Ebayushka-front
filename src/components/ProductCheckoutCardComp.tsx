import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { centerEverything, colorFilterTypes } from "../assets";
import {
  CloseOutlined,
  LeftOutlined,
  RightOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import {
  changeItemColor,
  decreaseCartQty,
  increaseCartQty,
  IproductInCart,
  removeFromCart,
  TColor,
} from "../redux/slices/productSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { Select } from "antd";

const ProductCheckoutCardComp = () => {
  const { cart } = useAppSelector((state) => state.product);
  const { categories } = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const removeItem = (i: IproductInCart) => {
    const newCart = cart && cart.filter((p) => p._id !== i._id);
    dispatch(removeFromCart(newCart));
  };

  const increaseCount = (i: IproductInCart) => {
    const newState =
      cart &&
      cart.map((c) => {
        return c._id === i._id ? { ...i, count: i.count + 1 } : c;
      });
    return dispatch(increaseCartQty(newState));
  };

  const decreaseCount = (i: IproductInCart) => {
    const newState = cart.map((c: IproductInCart) => {
      const x =
        c._id === i._id && c.count > 1 ? { ...i, count: i.count - 1 } : c;

      return x;
    });
    return dispatch(decreaseCartQty(newState));
  };

  const changeColor = (e: TColor, i: IproductInCart) => {
    const newState = cart.map((c: IproductInCart) => {
      const x = c._id === i._id ? { ...i, color: e } : c;

      return x;
    });
    dispatch(changeItemColor(newState));
  };

  return (
    <tbody>
      {cart &&
        cart.map((i: IproductInCart) => {
          return (
            <tr key={i._id}>
              <td
                className={centerEverything}
                onClick={() => navigate(`/product/${i.slug}`)}
              >
                {" "}
                <img
                  src={
                    i.images.length > 0
                      ? i.images[0].secure_url
                      : "/images/default-image.png"
                  }
                  style={{
                    width: "80px",
                    height: "80px",
                  }}
                />
              </td>
              <td className="text-center pt-5">{i.title}</td>
              <td className="text-center pt-5">{i.price} $</td>
              <td className="text-center pt-5">
                {
                  // @ts-ignore
                  i.category?.name
                }
              </td>
              <td className="pt-5">
                <div className="text-center">
                  <LeftOutlined onClick={() => decreaseCount(i)} />
                  <span className="mx-3">{i.count}</span>
                  <RightOutlined onClick={() => increaseCount(i)} />
                </div>
              </td>
              <td className="pt-5 text-center">
                <Select
                  options={colorFilterTypes.color.map((c: string) => {
                    return { value: c, label: c };
                  })}
                  className="w-100 "
                  bordered={false}
                  value={i.color}
                  onChange={(e) => changeColor(e, i)}
                />
              </td>
              <td className="pt-5 text-center">
                {i.shipping ? (
                  <CheckCircleFilled className="text-success" />
                ) : (
                  <CheckCircleFilled className="text-secondary" />
                )}
              </td>
              <td className="pt-5 text-center">
                <CloseOutlined
                  className="text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => removeItem(i)}
                />
              </td>
            </tr>
          );
        })}
    </tbody>
  );
};

export default ProductCheckoutCardComp;
