import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminSideBarComponent from "../../../components/sidebar/AdminSideBarComponent";
import Loader from "../../../components/Loader";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  addSubCategory,
  deleteSubCategory,
  ISubCategoryItem,
} from "../../../redux/slices/subCategorySlice";
import { createSub, removeSub } from "../../../services/subCategoryServ";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { ICategoryItem } from "../../../redux/slices/categorySlice";

const AdminSubCategoryPage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { categories } = useAppSelector((state) => state.category);
  const { subCategories } = useAppSelector((state) => state.subCategory);
  const [subCat, setSubCat] = useState({
    name: "",
    parent: "",
  });
  const [filteredSubs, setFilteredSubs] = useState(subCategories);
  const [loading, setLoading] = useState(false);

  //shows only sub category by category
  useEffect(() => {
    const filteredByCat = subCategories.filter(
      (sb: ISubCategoryItem) => sb.parent === subCat.parent
    );
    setFilteredSubs(filteredByCat);
  }, [subCat.parent, subCategories]);

  const createCategoryHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!subCat.parent) {
      return toast.error("Choose parent category.");
    }

    setLoading(true);
    const newSubCategory = await createSub(user && user.token, subCat);
    setLoading(false);

    newSubCategory && dispatch(addSubCategory(newSubCategory));
    setSubCat({ name: "", parent: "" });
    toast.success("New category was created.");
  };

  const handleRemove = async (slug: string) => {
    setLoading(true);
    const removedSubCategory = await removeSub(user && user.token, slug);
    removedSubCategory && dispatch(deleteSubCategory(removedSubCategory));
    setLoading(false);
    toast.success("Category was removed.");
  };

  if (loading) return <Loader />;
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminSideBarComponent />
        </div>
        <div className="col mt-2">
          <div className="form-group">
            <label htmlFor="category">
              <b>Parent Category</b>
            </label>
            <select
              name="category"
              id="category"
              className="custom-select"
              required
              autoFocus
              onChange={(e) => setSubCat({ ...subCat, parent: e.target.value })}
            >
              <option value="">Select parent category...</option>
              {categories.length > 0 &&
                categories.map((c: ICategoryItem) => (
                  <option value={c._id} key={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <form onSubmit={createCategoryHandler} className="mt-5">
            <div className="form-group">
              <label htmlFor="name">
                <b>
                  Create New sub-Category.{" "}
                  <i className="text-warning">Name must be unique!</i>
                </b>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                placeholder="Enter new category name..."
                required
                value={subCat.name}
                onChange={(e) => setSubCat({ ...subCat, name: e.target.value })}
              />
            </div>
            <br />
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
          </form>
          <hr />

          {filteredSubs.length > 0 &&
            filteredSubs.map((c: ISubCategoryItem) => (
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
                  <Link to={`/admin/sub-category/${c.slug}`}>
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

export default AdminSubCategoryPage;
