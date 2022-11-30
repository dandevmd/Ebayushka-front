import { useEffect, useState } from "react";
import { publicRoutes, userRoutes, adminRoutes } from "./routes";
import { Routes, Route } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import NotFoundPage from "../pages/NotFoundPage";
import HomePage from "../pages/HomePage";
import { currentAdmin } from "../services/auth";
import { toast } from "react-toastify";

const ApplicationRouter = () => {
  const { user } = useAppSelector((state) => state.user);
  const [isAdmin, setIsAdmin] = useState(false);

  //Extra layer of security for admin users. Get the auth from backend
  useEffect(() => {
    const checkAdmin = async () => {
      if (user && user.token) {
        try {
          const admin = await currentAdmin(user.token);
          admin ? setIsAdmin(true) : setIsAdmin(false);
        } catch (error) {
          toast.error("You are not authorized!");
        }
      }
    };

    checkAdmin();
  }, [user]);

  //try to wrap products in useMemo to avoid no found page
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {!user ? (
        publicRoutes.map((r: { path: string; element: JSX.Element }) => (
          <Route path={r.path} element={r.element} key={r.path + 1} />
        ))
      ) : (
        <Route path="*" element={<NotFoundPage />} />
      )}
      {user && (user.role === "subscriber" || isAdmin) ? (
        userRoutes.map((r: { path: string; element: JSX.Element }) => (
          <Route path={r.path} element={r.element} key={r.path + 1} />
        ))
      ) : (
        <Route path="*" element={<NotFoundPage />} />
      )}
      {user && isAdmin ? (
        adminRoutes.map((r: { path: string; element: JSX.Element }) => (
          <Route path={r.path} element={r.element} key={r.path + 1} />
        ))
      ) : (
        <Route path="*" element={<NotFoundPage />} />
      )}
    </Routes>
  );
};

export default ApplicationRouter;
