import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import ProductCardComponent from "../components/ProductCardComponent";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  getAllProd,
  getByCategory,
  getByFilter,
} from "../redux/slices/productSlice";
import {
  fetchProductsByQuery,
  getAllProducts,
} from "../services/productService";
import { resetQuery } from "../redux/slices/filterSlice";
import { Menu, Slider, Checkbox, Rate, Select } from "antd";
import {
  DollarOutlined,
  CloseCircleOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { colorFilterTypes } from "../assets";

const ShopPage = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.category);
  const { query } = useAppSelector((state) => state.filter);
  const [loading, setLoading] = useState(false);
  const [productsPropsToPass, setProductsPropsToPass] = useState("");
  const [filter, setFilter] = useState({
    price: [0, 4999] as [number, number] | undefined,
    category: "" as string | null,
    rating: null as number | null,
    color: "Select color..." as string,
  });

  useEffect(() => {
    if (
      query ||
      query !== "" ||
      (filter.price && (filter.price[0] !== 0 || filter.price[1] !== 4999)) ||
      filter.category ||
      filter.rating !== null ||
      filter.color !== "Select color..."
    ) {
      const timer = setTimeout(() => {
        getProdByFilter();
        setProductsPropsToPass("products-by-filter");
      }, 500);

      return () => clearTimeout(timer);
    }
    getProducts();
    setProductsPropsToPass("all-products");
  }, [
    query,
    filter.price && filter.price[0],
    filter.price && filter.price[1],
    filter.category,
    filter.rating,
    filter.color,
  ]);

  const getProducts = async () => {
    setLoading(true);
    const ptc = await getAllProducts();
    ptc && dispatch(getAllProd(ptc));
    setLoading(false);
  };
  const getProdByFilter = async () => {
    setLoading(true);
    const pdt = await fetchProductsByQuery({ ...filter }, query);
    pdt && dispatch(getByFilter(pdt));
    setLoading(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="row mr-5 mt-3">
      <div className="col-md-3">
        <h4 className="text-center">Search/Filter</h4>
        <Menu defaultOpenKeys={["1", "2", "3", "4"]} mode="inline">
          <Menu.SubMenu
            title={
              <span className="h6">
                <DollarOutlined /> Price
              </span>
            }
            key="1"
          >
            <div>
              <Slider
                key="slider"
                className="ml-4 mr-3"
                tipFormatter={(v) => v}
                range
                value={filter.price}
                onChange={(v) => v && setFilter({ ...filter, price: v })}
                min={0}
                max={4999}
              />
            </div>
          </Menu.SubMenu>
          <Menu.SubMenu key="2" title={<span className="h6">Category</span>}>
            {categories &&
              categories.map((c) => {
                return (
                  <div key={c._id} className="mb-1 pl-3">
                    <Checkbox
                      value={c._id}
                      name="category"
                      onChange={(e) =>
                        setFilter({ ...filter, category: e.target.value })
                      }
                      checked={filter.category === c._id}
                    >
                      {c.name}
                    </Checkbox>
                  </div>
                );
              })}
          </Menu.SubMenu>
          <Menu.SubMenu key="3" title={<span className="h6">Rating</span>}>
            <div className="pl-3">
              <div onClick={() => setFilter({ ...filter, rating: 5 })}>
                <Rate disabled defaultValue={5} />{" "}
                {filter.rating === 5 && <CheckOutlined className="ml-3" />}
              </div>
              <div onClick={() => setFilter({ ...filter, rating: 4 })}>
                <Rate disabled defaultValue={4} />{" "}
                {filter.rating === 4 && <CheckOutlined className="ml-3" />}
              </div>
              <div onClick={() => setFilter({ ...filter, rating: 3 })}>
                <Rate disabled defaultValue={3} />{" "}
                {filter.rating === 3 && <CheckOutlined className="ml-3" />}
              </div>
              <div onClick={() => setFilter({ ...filter, rating: 2 })}>
                <Rate disabled defaultValue={2} />{" "}
                {filter.rating === 2 && <CheckOutlined className="ml-3" />}
              </div>
              <div onClick={() => setFilter({ ...filter, rating: 1 })}>
                <Rate disabled defaultValue={1} />{" "}
                {filter.rating === 1 && <CheckOutlined className="ml-3" />}
              </div>
            </div>
          </Menu.SubMenu>{" "}
          <Menu.SubMenu key="4" title={<span className="h6">Color</span>}>
            <div className="pl-3">
              <Select
                options={colorFilterTypes.color.map((c: string) => {
                  return { value: c, label: c };
                })}
                className="w-100"
                value={filter.color}
                onChange={(e) => setFilter({ ...filter, color: e })}
              />
            </div>
          </Menu.SubMenu>
        </Menu>
      </div>

      <div className="col-md-9">
        <div className="row align-items-center mb-3">
          <span className="h5">Selected Filters:</span>
          {filter.category && (
            <button className="ml-3 btn btn-raised position-relative ">
              {categories.map((c) => c._id === filter.category && c.name)}{" "}
              <CloseCircleOutlined
                onClick={() => setFilter({ ...filter, category: "" })}
                className="close_btn_ant_badge"
              />
            </button>
          )}
          {query && (
            <button className="ml-3 btn btn-raised position-relative ">
              {query}{" "}
              <CloseCircleOutlined
                onClick={() => dispatch(resetQuery())}
                className="close_btn_ant_badge"
              />
            </button>
          )}
          {filter.rating && (
            <button className="ml-3 btn btn-raised position-relative ">
              {filter.rating} stars only{" "}
              <CloseCircleOutlined
                onClick={() => setFilter({ ...filter, rating: null })}
                className="close_btn_ant_badge"
              />
            </button>
          )}
          {filter.price &&
            (filter.price[0] > 0 || filter.price[1] < 4999) && (
              <button className="ml-3 btn btn-raised ">
                {`between ${filter.price[0]} $ - ${filter.price[1]} $`}{" "}
                <CloseCircleOutlined
                  className="close_btn_ant_badge"
                  onClick={() => setFilter({ ...filter, price: [0, 4999] })}
                />
              </button>
            )}{" "}
          {filter.color && filter.color !== "Select color..." && (
            <button className="ml-3 btn btn-raised ">
              {filter.color} color items{" "}
              <CloseCircleOutlined
                className="close_btn_ant_badge"
                onClick={() =>
                  setFilter({ ...filter, color: "Select color..." })
                }
              />
            </button>
          )}
        </div>
        <h4 className="text-danger ">Products</h4>
        <div className="row ">
          <ProductCardComponent instance={productsPropsToPass} />
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
