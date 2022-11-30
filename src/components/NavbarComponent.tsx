import { useState } from "react";
import { Menu, Badge } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/slices/userSlice";
import { logoutFromFirebase } from "../firebase";
import SearchComponent from "./SearchComponent";
import { resetQuery } from "../redux/slices/filterSlice";

const { SubMenu, Item } = Menu;

const NavbarComponent = () => {
  const { user } = useAppSelector((state) => state.user);
  const { cart } = useAppSelector((state) => state.product);

  const [current, setCurrent] = useState("home");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logoutFromFirebase();
    dispatch(logout({ user: null }));
    navigate("/login");
  };

  return (
    <Menu
      onClick={(e) => setCurrent(e.key)}
      selectedKeys={[current]}
      mode="horizontal"
    >
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      <Item
        key="shop"
        icon={<ShopOutlined />}
        onClick={() => dispatch(resetQuery())}
      >
        <Link to="/shop">Shop</Link>
      </Item>

      <Item
        key="cart"
        icon={<ShoppingCartOutlined />}
        onClick={() => navigate("/cart")}
        className="position-relative"
      >
        <Badge
          count={cart ? cart.length : null}
          style={{
            position: "absolute",
            top: "-3px",
            right: "-15px",
          }}
        >
          Cart
        </Badge>
      </Item>

      {user && (
        <SubMenu
          style={{
            position: "absolute",
            right: 0,
          }}
          icon={<SettingOutlined />}
          title={user && user.email.split("@")[0]}
          key="username"
        >
          <Item key="option:1">
            <Link
              to={
                user && user.role === "subscriber"
                  ? "/user/history"
                  : "/admin/dashboard"
              }
            >
              DashBoard
            </Link>
          </Item>

          <Item
            key="setting:3"
            icon={<LogoutOutlined />}
            onClick={logoutHandler}
          >
            Logout
          </Item>
        </SubMenu>
      )}

      {!user && (
        <Item
          key="login"
          icon={<UserOutlined />}
          style={{
            position: "absolute",
            right: "100px",
          }}
        >
          <Link to="/login">Login</Link>
        </Item>
      )}

      {!user && (
        <Item
          key="register"
          icon={<UserAddOutlined />}
          style={{
            position: "absolute",
            right: "0",
          }}
        >
          <Link to="/register">Register</Link>
        </Item>
      )}

      <Item
        key="search"
        style={{
          position: "absolute",
          right: "200px",
        }}
      >
        <SearchComponent />
      </Item>
    </Menu>
  );
};

export default NavbarComponent;
