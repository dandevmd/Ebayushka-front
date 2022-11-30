import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const CategoryListComponent = () => {
  const { categories } = useAppSelector((state) => state.category);
  const navigate = useNavigate();

  return (
    <div className="container">
      {categories &&
        categories.map((c) => {
          return (
            <div
              onClick={() => navigate(`/category/${c.slug}`)}
              key={c._id}
              className="btn btn-outlined-primary btn-lg btn-raised m-3"
            >
              {c.name}
            </div>
          );
        })}
    </div>
  );
};

export default CategoryListComponent;
