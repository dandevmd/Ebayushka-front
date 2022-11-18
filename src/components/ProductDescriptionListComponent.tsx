import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { IProduct } from "../redux/slices/productSlice";

interface IcomponentProps {
  product: IProduct;
}

const ProductDescriptionListComponent: React.FC<IcomponentProps> = ({
  product,
}) => {
  const { categories } = useAppSelector((state) => state.category);
  const { subCategories } = useAppSelector((state) => state.subCategory);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    price,
    category,
    subs,
    shipping,
    color,
    quantity,
    sold,
    brand,
    description,
  } = product;
  const categoryObject = categories.find((c) => c._id === category);

  return (
    <ul className="list-group">
      <li className="list-group-item">
        Price:{" "}
        <span className="label label-default labe-pill pull-xs-right">
          {price}
        </span>{" "}
      </li>{" "}
      <li className="list-group-item">
        Brand:{" "}
        <span className="label label-default labe-pill pull-xs-right">
          {brand}
        </span>{" "}
      </li>{" "}
      {category && (
        <li className="list-group-item">
          Category:{" "}
          <span
            style={{
              cursor: "pointer",
            }}
            className="badge rounded-pill badge-primary justify-self-end ml-auto mr-0"
            onClick={() => navigate(`/category/${categoryObject?.slug}`)}
          >
            {categoryObject?.name}
          </span>
        </li>
      )}
      {subs &&
        subs.map((sub) => (
          <li key={sub} className="list-group-item">
            Sub-category:
            {subCategories.map((s) => (
              <span
                key={s._id}
                style={{
                  cursor: "pointer",
                }}
                className="badge rounded-pill badge-primary  ml-auto mr-0"
                onClick={() => s._id === sub && navigate(`/sub/${s.slug}`)}
              >
                {s._id === sub && s.name}
              </span>
            ))}
          </li>
        ))}
      <li className="list-group-item">
        Do we ship?:{" "}
        <span className="label label-default labe-pill pull-xs-right">
          {shipping}
        </span>{" "}
      </li>{" "}
      <li className="list-group-item">
        Color:{" "}
        <span className="label label-default labe-pill pull-xs-right">
          {color}
        </span>{" "}
      </li>{" "}
      <li className="list-group-item">
        Available:{" "}
        <span className="label label-default labe-pill pull-xs-right">
          {quantity}
        </span>{" "}
      </li>{" "}
      <li className="list-group-item">
        Sold:{" "}
        <span className="label label-default labe-pill pull-xs-right">
          {sold}
        </span>{" "}
      </li>{" "}
    </ul>
  );
};

export default ProductDescriptionListComponent;
