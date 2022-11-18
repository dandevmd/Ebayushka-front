import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminSideBarComponent from "../../../components/sidebar/AdminSideBarComponent";
import Loader from "../../../components/Loader";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { update, read } from "../../../services/categoryServ";

import { toast } from "react-toastify";
import { updateCategory } from "../../../redux/slices/categorySlice";

const AdminCategoryItemPage = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);
  const [catToUpdate, setCatToUpdate] = useState({
    name: "",
    slug: "",
  });

  useEffect(() => {
    const fetchCategoryById = async () => {
      const category = slug && (await read(slug));
      category
        ? setCatToUpdate({ name: category.name, slug: category.slug })
        : setCatToUpdate({ name: "", slug: "" });
    };

    fetchCategoryById();
  }, []);

  const updateCategoryHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const updatedCategory = await update(
      user && user.token,
      slug as string,
      catToUpdate
    );
    setLoading(false);
    updatedCategory && dispatch(updateCategory(updatedCategory));
    setCatToUpdate({ slug: "", name: "" });
    toast.success("New category was updated.");
    navigate("/admin/category");
  };

  if (loading) return <Loader />;
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminSideBarComponent />
        </div>
        <div className="col mt-2">
          <form onSubmit={updateCategoryHandler}>
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
                value={catToUpdate.name}
                onChange={(e) =>
                  setCatToUpdate({ ...catToUpdate, name: e.target.value })
                }
              />
            </div>
            <div className="form-group mt-5">
              <label htmlFor="name">
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
                value={catToUpdate.slug}
                onChange={(e) =>
                  setCatToUpdate({ ...catToUpdate, slug: e.target.value })
                }
              />
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

export default AdminCategoryItemPage;
