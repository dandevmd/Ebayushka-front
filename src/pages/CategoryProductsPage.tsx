import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import ProductCardComponent from "../components/ProductCardComponent";
import { useAppSelector } from "../redux/hooks";
import { getByCategory } from "../redux/slices/productSlice";
import { getProductsByCategory } from "../services/productService";

const CategoryProductsPage = () => {
  const [loading, setLoading] = useState(false);
  const { byCategory } = useAppSelector((state) => state.product);
  const { slug } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    productsByCat();
  }, [slug]);

  const productsByCat = async () => {
    setLoading(true);
    const categoryProducts = slug && (await getProductsByCategory(slug));
    dispatch(getByCategory(categoryProducts));
    setLoading(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="h1 text-center p-3 my-5 jumbotron">
        {byCategory && `(${byCategory.length})`} {slug?.toUpperCase()} Products
      </div>
      <div className="row mt-3">
        <ProductCardComponent instance="products-by-category" />
      </div>
    </>
  );
};

export default CategoryProductsPage;
