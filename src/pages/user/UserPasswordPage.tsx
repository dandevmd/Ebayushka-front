import React, { useState } from "react";
import { auth } from "../../firebase/index";
import { updatePassword } from "firebase/auth";

import Loader from "../../components/Loader";
import UserSideBarComponent from "../../components/sidebar/UserSideBarComponent";
import { toast } from "react-toastify";
import { useAppSelector } from "../../redux/hooks";
import AdminSideBarComponent from "../../components/sidebar/AdminSideBarComponent";

const UserPasswordPage = () => {
  const { user } = useAppSelector((state) => state.user);
  const [form, setForm] = useState({
    newPassword: "",
    loading: false,
  });

  const changePasswordHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loggedUser = auth?.currentUser;
    setForm({ ...form, loading: true });
    try {
      loggedUser && (await updatePassword(loggedUser, form.newPassword));
      toast.success("Your password was successfully changed.");
    } catch (error) {
      error instanceof Error ? console.log(error.message) : console.log(error);
    }
    setForm({ ...form, loading: false });
  };

  if (form.loading) return <Loader />;
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          {user.role === 'admin' ? (
            <AdminSideBarComponent />
          ) : (
            <UserSideBarComponent />
          )}
        </div>
        <div className="col">
          <h4>Password Update </h4>
          <form onSubmit={changePasswordHandler} className="mt-5">
            <div className="form-group">
              <label htmlFor="password">
                <b>Your new password</b>
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Enter you new password"
                onChange={(e) =>
                  setForm({ ...form, newPassword: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              className="btn btn-raised btn-primary"
              disabled={form.newPassword.length < 6}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserPasswordPage;
