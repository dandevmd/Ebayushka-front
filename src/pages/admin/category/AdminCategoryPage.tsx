import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminSideBarComponent from "../../../components/sidebar/AdminSideBarComponent";
import Loader from "../../../components/Loader";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  addCategory,
  deleteCategory,
  ICategoryItem,
} from "../../../redux/slices/categorySlice";
import {
  create as createCategory,
  remove as removeCategory,
} from "../../../services/categoryServ";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const AdminCategoryPage = () => {
  const { user } = useAppSelector((state) => state.user);
  const { categories } = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();
  const [catName, setCatName] = useState("");
  const [loading, setLoading] = useState(false);

  const createCategoryHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const newCategory = await createCategory(user && user.token, catName);
    setLoading(false);

    newCategory && dispatch(addCategory(newCategory));
    setCatName("");
    toast.success("New category was created.");
  };

  const handleRemove = async (slug: string) => {
    setLoading(true);
    const removedCategory = await removeCategory(user && user.token, slug);
    removedCategory && dispatch(deleteCategory(removedCategory));
    setLoading(false);
    toast.success("Category was removed.");
  };

  //hf that filter maped cat by keyword
  const rtSearch = (keyword: string) => (c: ICategoryItem) =>
    c.name.toLocaleLowerCase().includes(keyword);

  if (loading) return <Loader />;
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminSideBarComponent />
        </div>
        <div className="col mt-2">
          <form onSubmit={createCategoryHandler}>
            <div className="form-group">
              <label htmlFor="name">
                <b>
                  Create New Category.{" "}
                  <i className="text-warning">Category name must be unique!</i>
                </b>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                autoFocus
                placeholder="Enter new category name..."
                required
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
              />
            </div>
            <br />
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
          </form>
          <hr />
          {categories.length > 0 &&
            categories
              .filter(rtSearch(catName.toLocaleLowerCase()))
              .map((c: ICategoryItem) => (
                <div
                  key={c._id}
                  className="d-flex flex-row justify-content-between align-items-center alert alert-secondary "
                >
                  <div>{c.name} </div>
                  <div>
                    <span
                      className="btn btn-small "
                      onClick={() => handleRemove(c.slug)}
                    >
                      <DeleteOutlined />
                    </span>{" "}
                    <Link to={`/admin/category/${c.slug}`}>
                      <span className="btn btn-small ">
                        <EditOutlined className="text-danger" />
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCategoryPage;
