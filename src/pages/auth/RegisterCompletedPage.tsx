import React, { useEffect, useState } from "react";
import {
  signInWithEmailLink,
  updatePassword,
  getIdTokenResult,
} from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/slices/userSlice";
import { useAppDispatch } from "../../redux/hooks";
import { createOrUpdateUser } from "../../services/auth";

const RegisterCompletedPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const [form, setForm] = useState({
    email: localStorage.getItem("emailForSignIn")
      ? localStorage.getItem("emailForSignIn")!
      : "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return toast.error("All fields are mandatory!");
    }

    if (form.password.length < 6) {
      return toast.error("Password is to weak");
    }

    try {
      const result = await signInWithEmailLink(
        auth,
        form.email,
        window.location.href
      );

      if (result.user?.emailVerified) {
        localStorage.removeItem("emailForSignIn");
        let user = auth.currentUser;
        user && (await updatePassword(user, form.password));
        const idTokenRes = user && (await getIdTokenResult(user));
        const token = idTokenRes?.token
        const userFromMongo = token &&  await createOrUpdateUser(token);

        dispatch(login({ ...userFromMongo, token }));

        navigate("/");
      }
    } catch (error) {
      error instanceof Error ? console.log(error.message) : console.log(error);
    }
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Complete the Registration</h4>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              className="form-control"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              disabled={
                form.email === localStorage.getItem("emailForSignIn")
                  ? true
                  : false
              }
            />
            <input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              autoFocus
              className="form-control my-3"
            />
            <button type="submit" className="btn btn-raised mt-2">
              Complete Registration
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterCompletedPage;
