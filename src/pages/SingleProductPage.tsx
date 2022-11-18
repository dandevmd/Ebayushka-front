import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  getProductBySlug,
  getRelatedProducts,
} from "../services/productService";
import {
  getSingleProduct,
  gotRelatedProducts,
} from "../redux/slices/productSlice";
import Loader from "../components/Loader";
import SingleProductComponent from "../components/SingleProductComponent";
import ProductCardComponent from "../components/ProductCardComponent";

const SingleProductPage = () => {
  const [loading, setLoading] = useState(false);
  const { product, relatedProducts } = useAppSelector((state) => state.product);
  const [rerenderAfterRatingChange, setRerenderAfterRatingChange] =
    useState(false);
  const dispatch = useAppDispatch();
  const { slug } = useParams();

  useEffect(() => {
    setRerenderAfterRatingChange(false);
    getCurrentProduct();
  }, [slug, rerenderAfterRatingChange]);

  // Related product apar in dependeta de currentprod. De asta 2 useEffecte(primul pentru product si in dependenta de product -> cele relative)
  useEffect(() => {
    getRelProd();
  }, [product, slug]);

  const getCurrentProduct = async () => {
    setLoading(true);
    const currentProduct = slug && (await getProductBySlug(slug));
    if (!currentProduct)
      return console.log("Fetching product by slug gone wrong");
    dispatch(getSingleProduct(currentProduct));

    setLoading(false);
  };

  const getRelProd = async () => {
    if (product?._id) {
      setLoading(true);
      const relatedProducts = await getRelatedProducts(product._id);
      dispatch(gotRelatedProducts(relatedProducts));
      setLoading(false);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProductComponent
          setRerenderAfterRatingChange={setRerenderAfterRatingChange}
        />
      </div>

      <div className="row ">
        <div className="text-center py-5 w-100">
          <hr />
          <h1>Related Products</h1>
          <hr />
          {relatedProducts && (
            <div className="row">
              <ProductCardComponent instance="related-products" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
