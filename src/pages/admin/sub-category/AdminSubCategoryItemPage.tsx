import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminSideBarComponent from "../../../components/sidebar/AdminSideBarComponent";
import Loader from "../../../components/Loader";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { readSub, updateSub } from "../../../services/subCategoryServ";

import { toast } from "react-toastify";
import { updateSubCategory } from "../../../redux/slices/subCategorySlice";
import { ICategoryItem } from "../../../redux/slices/categorySlice";

const AdminSubCategoryItemPage = () => {
  const { user } = useAppSelector((state) => state.user);
  const { categories } = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);
  const [subCatUpdate, setSubCatUpdate] = useState({
    name: "",
    slug: "",
    parent: "",
  });

  useEffect(() => {
    const fetchSubCategoryById = async () => {
      const subCategory = slug && (await readSub(slug));

      subCategory
        ? setSubCatUpdate({
            name: subCategory.name,
            slug: subCategory.slug,
            parent: subCategory.parent,
          })
        : setSubCatUpdate({ name: "", slug: "", parent: "" });
    };

    fetchSubCategoryById();
  }, []);

  const updateSubCategoryHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    const updatedSubCategory = await updateSub(
      user && user.token,
      slug as string,
      subCatUpdate
    );
    setLoading(false);
    updatedSubCategory && dispatch(updateSubCategory(updatedSubCategory));
    setSubCatUpdate({ slug: "", name: "", parent: "" });
    toast.success("New category was updated.");
    navigate("/admin/sub-category");
  };

  if (loading) return <Loader />;
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminSideBarComponent />
        </div>
        <div className="col mt-2">
          <form onSubmit={updateSubCategoryHandler}>
            <div className="form-group">
              <label htmlFor="name">
                <b>Update Category Name</b>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                autoFocus
                placeholder="Enter new category name..."
                required
                value={subCatUpdate.name}
                onChange={(e) =>
                  setSubCatUpdate({ ...subCatUpdate, name: e.target.value })
                }
              />
            </div>
            <div className="form-group mt-5">
              <label htmlFor="slug">
                <b>
                  Update the category slug{" "}
                  <span className="text-warning">We do not recomend this.</span>
                </b>
              </label>
              <input
                type="text"
                name="slug"
                id="slug"
                className="form-control"
                placeholder="Enter new category slug..."
                value={subCatUpdate.slug}
                onChange={(e) =>
                  setSubCatUpdate({ ...subCatUpdate, slug: e.target.value })
                }
              />
            </div>
            <div className="form-group mt-5">
              <label htmlFor="category">
                <b>Update parent category</b>
              </label>
              <select
                name="category"
                id="category"
                className="custom-select"
                required
                onChange={(e) =>
                  setSubCatUpdate({ ...subCatUpdate, parent: e.target.value })
                }
              >
                <option value="">Select new parent category...</option>
                {categories.length > 0 &&
                  categories.map((c: ICategoryItem) => (
                    <option
                      value={c._id}
                      key={c._id}
                      selected={c._id === subCatUpdate.parent}
                    >
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>
            <br />
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
          </form>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default AdminSubCategoryItemPage;
