import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import ProductCardComponent from "../components/ProductCardComponent";
import { useAppSelector } from "../redux/hooks";
import {  getBySub } from "../redux/slices/productSlice";
import { getProductsBySubCategory } from "../services/productService";

const SubCategoryProductsPage = () => {
  const [loading, setLoading] = useState(false);
  const { bySub } = useAppSelector((state) => state.product);
  const { slug } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    productsBySub();
  }, [slug]);

  const productsBySub = async () => {
    setLoading(true);
    const subProducts = slug && (await getProductsBySubCategory(slug));
    dispatch(getBySub(subProducts));
    setLoading(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="h1 text-center p-3 my-5 jumbotron">
        {bySub && `(${bySub.length})`} {slug?.toUpperCase()} Products
      </div>
      <div className="row mt-3">
        <ProductCardComponent instance="products-by-sub-category" />
      </div>
    </>
  );
};

export default SubCategoryProductsPage;
