import React, { useState, useEffect } from "react";
import { auth, gProvider } from "../../firebase";
import { sendSignInLinkToEmail, getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_COMPLETE!,
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, config);
      localStorage.setItem("emailForSignIn", email);
      toast.success("An email for confirmation was sent.");
      navigate("/register/complete");
    } catch (error) {
      error instanceof Error ? console.log(error.message) : console.log(error);
    }
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              className="form-control"
            />

            <button type="submit" className="btn btn-raised mt-2">
              Register /{email}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
