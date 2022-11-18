import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, gProvider } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/slices/userSlice";
import { createOrUpdateUser } from "../../services/auth";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user: reduxUser } = useAppSelector((state) => state.user);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return toast.error("All fields are mandatory!");
    }

    if (form.password.length < 6) {
      return toast.error("Password is to weak");
    }

    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      if (!user) {
        return;
      }

      const { token } = await user.getIdTokenResult();
      const userFromMongo = await createOrUpdateUser(token);
      //I don't need dispatch here because of useEffect from App.ts and the redirect. It redirects me, then useEffect grabs the token and email
      dispatch(login({ ...userFromMongo, token }));
      userFromMongo?.role === "admin" ? navigate("/") : navigate("/");
    } catch (error) {
      toast.error("Wrong credentials. Try again.");
      error instanceof Error ? console.log(error.message) : console.log(error);
    }
  };

  const googleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (form.email.length < 6) {
      toast.error("Enter you gmail and git google button again.");
      return;
    }

    try {
      const { user } = await signInWithPopup(auth, gProvider);
      const { token } = await user.getIdTokenResult();
      const userFromMongo = await createOrUpdateUser(token);

      dispatch(login({ ...userFromMongo, token }));

      //Let use effect form App to work
      userFromMongo?.role === "admin" ? navigate("/") : navigate("/");
    } catch (error) {
      error instanceof Error ? console.log(error.message) : console.log(error);
    }
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Login</h4>
          <form className="d-flex flex-column">
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              className="form-control"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              autoFocus
            />
            <input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="form-control my-3"
            />
            <Button
              type="default"
              onClick={handleSubmit}
              className="btn btn-raised mb-3"
              size="large"
              icon={<MailOutlined />}
              shape="round"
              disabled={!form.email || !form.password}
            >
              Login / {form.email}
            </Button>{" "}
            <Button
              type="ghost"
              onClick={googleLogin}
              className="btn btn-raised btn-danger"
              size="large"
              icon={<GoogleOutlined />}
              shape="round"
            >
              Login with Google
            </Button>
            <Link
              to="/forgot/password"
              className="d-flex justify-content-end text-danger fw-bold"
            >
              Forgot Password
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
