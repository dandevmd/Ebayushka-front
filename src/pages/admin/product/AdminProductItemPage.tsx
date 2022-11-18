import React, { useState } from "react";
import AdminSideBarComponent from "../../../components/sidebar/AdminSideBarComponent";
import Loader from "../../../components/Loader";
import {
  IProduct,
  Tbrand,
  TColor,
  Tshipping,
} from "../../../redux/slices/productSlice";
import CreateProductFormComponent from "../../../components/form/CreateOrUpdateProductForm";
import {
  createSingleProduct,
  updateProduct,
} from "../../../redux/slices/productSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  getProductBySlug,
  postProduct,
  putProduct,
} from "../../../services/productService";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import FileUploadFormComponent from "../../../components/form/FileUploadFormComponent";
import { useEffect } from "react";

const AdminProductItemPage = () => {
  const { user } = useAppSelector((state) => state.user);
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [previousCatAndSubs, setPreviousCatAndSubs] = useState({
    category: "",
    subs: [],
  });
  const [formValue, setFormValue] = useState<IProduct>({
    _id: "",
    title: "",
    slug: "",
    description: "",
    price: 1,
    category: "",
    subs: [],
    quantity: 10,
    sold: 0,
    shipping: "" as Tshipping,
    color: "" as TColor,
    brand: "" as Tbrand,
    images: [],
    ratings:[]
  });
  const resetFormValue = () =>
    setFormValue({
      _id: "",
      title: "",
      slug: "",
      description: "",
      price: 1,
      category: "",
      subs: [],
      quantity: 10,
      sold: 0,
      shipping: "" as Tshipping,
      color: "" as TColor,
      brand: "" as Tbrand,
      images: [],
      ratings:[]
    });

  const productRequest = async () => {
    setLoading(true);
    const itemToEdit = slug && (await getProductBySlug(slug));
    setLoading(false);

    if (itemToEdit) {
      setFormValue({
        _id: itemToEdit?._id || "",
        title: itemToEdit?.title || "",
        slug: itemToEdit?.slug || "",
        description: itemToEdit?.description || "",
        price: itemToEdit?.price || 1,
        category: itemToEdit?.category || "",
        subs: itemToEdit?.subs || [],
        quantity: itemToEdit?.quantity || 10,
        sold: itemToEdit?.sold || 0,
        shipping: itemToEdit?.shipping || ("" as Tshipping),
        color: itemToEdit?.color || ("" as TColor),
        brand: itemToEdit?.brand || ("" as Tbrand),
        images: itemToEdit?.images || [],
        ratings: itemToEdit?.ratings || []
      });

      setPreviousCatAndSubs({
        category: itemToEdit?.category || "",
        subs: itemToEdit?.subs || [],
      });
    }
  };

  useEffect(() => {
    if (slug) {
      productRequest();
    }
  }, [slug]);

  const createOnChangeHandler = (
    e:
      | React.ChangeEvent<HTMLFormElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormValue({ ...formValue, [e.target.id]: e.target.value });
  };

  const cProductHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formValue.title ||
      !formValue.description ||
      formValue.price === 1 ||
      !formValue.brand ||
      !formValue.color
    ) {
      return toast.error("All fields except slug field are mandatory.");
    }

    const createdProduct = await postProduct(user.token, formValue);
    if (!createdProduct)
      return toast.error("Was not possible to create new product");

    dispatch(createSingleProduct(createdProduct));
    toast.success(`Product was successfully created`);
    resetFormValue();
    navigate("/admin/products");
  };

  const updateProductHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formValue.title ||
      !formValue.description ||
      formValue.price === 1 ||
      !formValue.brand ||
      !formValue.color
    ) {
      return toast.error("All fields except slug field are mandatory.");
    }

    const updatedProduct =
      slug && (await putProduct(user.token, slug, formValue));
    if (!updatedProduct)
      return toast.error("Was not possible to update the product");

    dispatch(updateProduct(updatedProduct));
    toast.success(`Product was successfully updated`);
    resetFormValue();
    navigate("/admin/products");
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminSideBarComponent />
        </div>
        <div className="col">
          <CreateProductFormComponent
            form={formValue}
            setForm={setFormValue}
            createProductHandler={cProductHandler}
            createOnChangeHandler={createOnChangeHandler}
            resetFormValue={resetFormValue}
            updateProductHandler={updateProductHandler}
            previousCatAndSubs={previousCatAndSubs}
            setPreviousCatAndSubs={setPreviousCatAndSubs}
          >
            <FileUploadFormComponent
              formValue={formValue}
              setFormValue={setFormValue}
            />
          </CreateProductFormComponent>
        </div>
      </div>
    </div>
  );
};

export default AdminProductItemPage;
