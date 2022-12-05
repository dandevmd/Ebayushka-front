import { lazy } from "react";
const AdminCategoryItemPage = lazy(
  () => import("../pages/admin/category/AdminCategoryItemPage")
);
const AdminCategoryPage = lazy(
  () => import("../pages/admin/category/AdminCategoryPage")
);
const AdminCouponPage = lazy(() => import("../pages/admin/AdminCouponPage"));
const AdminDashboardPage = lazy(
  () => import("../pages/admin/AdminDashboardPage")
);
const AdminPasswordPage = lazy(
  () => import("../pages/admin/AdminPasswordPage")
);
const AdminProductItemPage = lazy(
  () => import("../pages/admin/product/AdminProductItemPage")
);
const AdminProductsPage = lazy(
  () => import("../pages/admin/product/AdminProductsPage")
);
const AdminSubCategoryPage = lazy(
  () => import("../pages/admin/sub-category/AdminSubCategoryPage")
);
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const RegisterCompletedPage = lazy(
  () => import("../pages/auth/RegisterCompletedPage")
);
const RegisterPage = lazy(() => import("../pages/auth/RegisterPage"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const UserHistoryPage = lazy(() => import("../pages/user/UserHistoryPage"));
const UserPasswordPage = lazy(() => import("../pages/user/UserPasswordPage"));
const UserWishlistPage = lazy(() => import("../pages/user/UserWishlistPage"));
const AdminSubCategoryItemPage = lazy(
  () => import("../pages/admin/sub-category/AdminSubCategoryItemPage")
);
const SingleProductPage = lazy(() => import("../pages/SingleProductPage"));
const CategoryProductsPage = lazy(
  () => import("../pages/CategoryProductsPage")
);
const SubCategoryProductsPage = lazy(
  () => import("../pages/SubCategoryProductsPage")
);
const ShopPage = lazy(() => import("../pages/ShopPage"));
const CartPage = lazy(() => import("../pages/CartPage"));
const CheckoutPage = lazy(() => import("../pages/CheckoutPage"));
const EndCheckoutPage = lazy(() => import("../pages/EndCheckoutPage"));

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
  {
    path: "/end-checkout",
    element: <EndCheckoutPage />,
  },
];

export const adminRoutes = [
  {
    path: "/user/history",
    element: <UserHistoryPage />,
  },
  {
    path: "/end-checkout",
    element: <EndCheckoutPage />,
  },
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
    element: <UserPasswordPage />,
  },
];
