import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const SubCategoryListComponent = () => {
  const { subCategories } = useAppSelector((state) => state.subCategory);
  const navigate = useNavigate();

  return (
    <div className="container">
      {subCategories &&
        subCategories.map((s) => {
          return (
            <div
              onClick={() => navigate(`/sub/${s.slug}`)}
              key={s._id}
              className="btn btn-outlined-primary btn-lg btn-raised m-3"
            >
              {s.name}
            </div>
          );
        })}
    </div>
  );
};

export default SubCategoryListComponent;
