import { productsOptions } from "../../assets";
import { useAppSelector } from "../../redux/hooks";
import { ICategoryItem } from "../../redux/slices/categorySlice";
import { ISubCategoryItem } from "../../redux/slices/subCategorySlice";
import { Select } from "antd";
import { ReactNode } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { IProduct } from "../../redux/slices/productSlice";

interface IcomponentProps {
  form: IProduct;
  setForm: any;
  previousCatAndSubs: {
    category: string;
    subs: string[] | [];
  };
  setPreviousCatAndSubs: any;
  resetFormValue: () => void;
  createProductHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  updateProductHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  createOnChangeHandler: (
    e:
      | React.ChangeEvent<HTMLFormElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  children: ReactNode;
}

const CreateOrUpdateProductForm: React.FC<IcomponentProps> = ({
  form,
  createProductHandler,
  createOnChangeHandler,
  resetFormValue,
  updateProductHandler,
  setForm,
  children,
  previousCatAndSubs,
  setPreviousCatAndSubs,
}) => {
  const { categories } = useAppSelector((state) => state.category);
  const { subCategories } = useAppSelector((state) => state.subCategory);
  const { slug } = useParams();

  useEffect(() => {
    if (!slug) {
      return resetFormValue();
    }
  }, [slug]);

  useEffect(() => {
    setForm({ ...form, subs: [] });
    if (form.category === previousCatAndSubs.category)
      setForm({
        ...form,
        category: previousCatAndSubs.category,
        subs: previousCatAndSubs.subs,
      });
  }, [form.category]);

  return (
    <form
      onSubmit={!slug ? createProductHandler : updateProductHandler}
      className="form-group mt-2"
    >
      <div className="mb-3">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className="form-control"
          required
          autoFocus
          value={form.title}
          id="title"
          name="title"
          placeholder="ex. Mac book Retina Pro"
          onChange={createOnChangeHandler}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="slug">Slug</label>
        <input
          type="text"
          value={form.slug}
          className="form-control"
          id="slug"
          name="slug"
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />
      </div>{" "}
      <div className="mb-3">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          className="form-control"
          required
          id="description"
          name="description"
          value={form.description}
          placeholder="ex. 16gb Ram, Intel i5 processor..."
          onChange={createOnChangeHandler}
        />
      </div>{" "}
      <div className="mb-3">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          className="form-control"
          required
          id="price"
          name="price"
          value={form.price}
          placeholder="US dollars"
          onChange={createOnChangeHandler}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="shipping">Shipping</label>
        <select
          name="shipping"
          id="shipping"
          required
          value={form.shipping}
          className="form-control"
          onChange={createOnChangeHandler}
        >
          <option>Please select shipping...</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>{" "}
      <div className="mb-3">
        <label htmlFor="quantity">Quantity</label>
        <input
          name="quantity"
          id="quantity"
          type="number"
          value={form.quantity}
          className="form-control"
          onChange={createOnChangeHandler}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="color">Color</label>
        <select
          name="color"
          id="color"
          required
          className="form-control"
          value={form.color}
          onChange={createOnChangeHandler}
        >
          <option>Please select color...</option>
          {productsOptions.colors.map((c: string) => {
            return (
              <option value={c} key={c}>
                {c}
              </option>
            );
          })}
        </select>
      </div>{" "}
      <div className="mb-3">
        <label htmlFor="brand">Brand</label>
        <select
          name="brand"
          id="brand"
          required
          value={form.brand}
          className="form-control"
          onChange={createOnChangeHandler}
        >
          <option>Please select brand...</option>
          {productsOptions.brands.map((b: string) => {
            return (
              <option value={b} key={b}>
                {b}
              </option>
            );
          })}
        </select>
      </div>{" "}
      <div className="mb-3">
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
          required
          value={form.category}
          className="form-control"
          onChange={createOnChangeHandler}
        >
          <option>Please select category...</option>
          {categories.map((c: ICategoryItem) => {
            return (
              <option value={c._id} key={c._id}>
                {c.name}
              </option>
            );
          })}
        </select>
      </div>{" "}
      <div className="mb-3">
        <label htmlFor="subs">Sub-categories</label>
        <Select
          id="subs"
          value={form.subs}
          onChange={(value) => setForm({ ...form, subs: value })}
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Please select"
          disabled={form.category === (null || undefined || "")}
        >
          {subCategories.length &&
            subCategories.map((s: ISubCategoryItem) => {
              if (s.parent === form.category) {
                return (
                  <Select.Option value={s._id} key={s._id}>
                    {s.name}
                  </Select.Option>
                );
              }
            })}
        </Select>
      </div>
      {/* <div className="mb-3">
        <label htmlFor="subs">Sub-categories</label>
        <select
          name="subs"
          id="subs"
          required
          className="form-control"
          disabled={form.category === (null || undefined || "")}
          onChange={createOnChangeHandler}
        >
          <option>
            {document.getElementById("subs")?.closest("[disabled=true]") !==
            null
              ? "Please select Category first"
              : "PLease select sub-category..."}
          </option>
          {subCategories.map((s: ISubCategoryItem) => {
            if (s.parent === form.category) {
              return (
                <option value={s._id} key={s._id}>
                  {s.name}
                </option>
              );
            }
          })}
        </select>
      </div>{" "} */}
      {children && <div className="mb-3">{children}</div>}
      <div className="mb-3">
        <button type="submit" className="btn btn-outline-primary">
          {!slug ? "Create" : "Update"}
        </button>
      </div>
    </form>
  );
};

export default CreateOrUpdateProductForm;
