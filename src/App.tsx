import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ApplicationRouter from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { login, setLoading } from "./redux/slices/userSlice";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import NavbarComponent from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";
import Loader from "./components/Loader";
import { currentUser } from "./services/auth";
import { getAllCategories } from "./redux/slices/categorySlice";
import { getAll } from "./services/categoryServ";
import { getAllSubs } from "./services/subCategoryServ";
import { getAllSubCategories } from "./redux/slices/subCategorySlice";
import "./index.css";
import CartSideBarComponent from "./components/CartSideBarComponent";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const getAuthUser = () => {
      setLoading(true);
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const idTokenResult = await user.getIdTokenResult();
          const token = idTokenResult.token;
          const currentUserInfo = await currentUser(token);
          dispatch(login({ ...currentUserInfo, token }));
        }
      });
      setLoading(true);
    };

    getAuthUser();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const getAllCat = async () => {
      setLoading(true);
      const categoriesData = await getAll();
      categoriesData && dispatch(getAllCategories(categoriesData));
      const subCategoriesData = await getAllSubs();
      subCategoriesData && dispatch(getAllSubCategories(subCategoriesData));
      setLoading(false);
    };
    getAllCat();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Router>
        <NavbarComponent />
        <ApplicationRouter />
      </Router>
      <FooterComponent />
      <ToastContainer />
    </>
  );
}

export default App;
