import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { SearchOutlined } from "@ant-design/icons";
import { byQuery } from "../redux/slices/filterSlice";
import { useNavigate } from "react-router-dom";

const SearchComponent = () => {
  const [loading, setLoading] = useState(false);
  const { query } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/shop?${query}`);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(byQuery(e.target.value));
  };

  return (
    <form className="form-inline my-2 m-lg-0" onSubmit={handleSubmit}>
      <input
        type="search"
        value={query}
        className="form-control mr-sm-2"
        placeholder="search"
        onChange={onChangeHandler}
        
      />
      <button type="submit" className="btn bg-none" autoFocus={false}>
        <SearchOutlined
          type="submit"
          className="mt-2"
          style={{
            cursor: "pointer",
          }}
        />
      </button>
    </form>
  );
};

export default SearchComponent;
