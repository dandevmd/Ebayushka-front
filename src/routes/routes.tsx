import AdminCategoryItemPage from "../pages/admin/category/AdminCategoryItemPage";
import AdminCategoryPage from "../pages/admin/category/AdminCategoryPage";
import AdminCouponPage from "../pages/admin/AdminCouponPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminPasswordPage from "../pages/admin/AdminPasswordPage";
import AdminProductItemPage from "../pages/admin/product/AdminProductItemPage";
import AdminProductsPage from "../pages/admin/product/AdminProductsPage";
import AdminSubCategoryPage from "../pages/admin/sub-category/AdminSubCategoryPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterCompletedPage from "../pages/auth/RegisterCompletedPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPassword from "../pages/ForgotPassword";
import UserHistoryPage from "../pages/user/UserHistoryPage";
import UserPasswordPage from "../pages/user/UserPasswordPage";
import UserWishlistPage from "../pages/user/UserWishlistPage";
import AdminSubCategoryItemPage from "../pages/admin/sub-category/AdminSubCategoryItemPage";
import SingleProductPage from "../pages/SingleProductPage";
import CategoryProductsPage from "../pages/CategoryProductsPage";
import SubCategoryProductsPage from "../pages/SubCategoryProductsPage";
import ShopPage from "../pages/ShopPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";

export const publicRoutes = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/register/complete",
    element: <RegisterCompletedPage />,
  },
  {
    path: "/forgot/password",
    element: <ForgotPassword />,
  },
  {
    path: "/product/:slug",
    element: <SingleProductPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
];

export const userRoutes = [
  {
    path: "/user/history",
    element: <UserHistoryPage />,
  },
  {
    path: "/user/password",
    element: <UserPasswordPage />,
  },
  {
    path: "/user/wishlist",
    element: <UserWishlistPage />,
  },
  {
    path: "/product/:slug",
    element: <SingleProductPage />,
  },
  {
    path: "/category/:slug",
    element: <CategoryProductsPage />,
  },
  {
    path: "/sub/:slug",
    element: <SubCategoryProductsPage />,
  },
  {
    path: "/shop",
    element: <ShopPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
];

export const adminRoutes = [
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
  {
    path: "/shop",
    element: <ShopPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/category/:slug",
    element: <CategoryProductsPage />,
  },
  {
    path: "/sub/:slug",
    element: <SubCategoryProductsPage />,
  },
  {
    path: "/product/:slug",
    element: <SingleProductPage />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboardPage />,
  },
  {
    path: "/admin/products",
    element: <AdminProductsPage />,
  },
  {
    path: "/admin/product",
    element: <AdminProductItemPage />,
  },
  {
    path: "/admin/product/:slug",
    element: <AdminProductItemPage />,
  },
  {
    path: "/admin/category",
    element: <AdminCategoryPage />,
  },
  {
    path: "/admin/category/:slug",
    element: <AdminCategoryItemPage />,
  },
  {
    path: "/admin/sub-category",
    element: <AdminSubCategoryPage />,
  },
  {
    path: "/admin/sub-category/:slug",
    element: <AdminSubCategoryItemPage />,
  },
  {
    path: "/admin/coupon",
    element: <AdminCouponPage />,
  },
  {
    path: "/admin/password",
    element: <AdminPasswordPage />,
  },
];
