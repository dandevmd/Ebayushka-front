import { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/slices/userSlice";
import { logoutFromFirebase } from "../firebase";

const { SubMenu, Item } = Menu;

const NavbarComponent = () => {
  const [current, setCurrent] = useState("home");
  const { user } = useAppSelector((state) => state.user);
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
          <Item key='option:1'>
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
    </Menu>
  );
};

export default NavbarComponent;
