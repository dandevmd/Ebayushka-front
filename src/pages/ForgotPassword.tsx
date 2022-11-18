import React, { useState, useEffect } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { Button } from "antd";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    //keep the code in the page, and redirect after google reset password to the indicated env var
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD!,
      handleCodeInApp: true,
    };

    try {
      await sendPasswordResetEmail(auth, email, config);
      toast.success("A confirmation message was sent to your email.");
    } catch (error) {
      error instanceof Error ? console.log(error.message) : console.log(error);
    }

    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container col-md-6 p-5">
      <form className="d-flex flex-column">
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />

        <Button
          type="default"
          shape="round"
          className="btn btn-raised my-3"
          size="large"
          disabled={!email}
          onClick={handleSubmit}
        >
          Restore Password
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
