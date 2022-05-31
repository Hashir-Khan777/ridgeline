import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bacckImage from "./imagess.jpg";

const ForgotPassword = () => {
  const [form, setForm] = useState({
    email: "",
  });
  const [error, setError] = useState();

  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (form.email !== "") {
      fetch("http://localhost:4000/api/auth/forgot", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((err) => {
          setError(err.message);
        });
    } else {
      setError("Please fill all the fields");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/", { replace: true, state: { from: "/forgotpassword" } });
    }
  }, [navigate]);

  return (
    <div className="container-fluid">
      <div className="row align-items-center justify-content-center">
        <div className="col-12 col-md-5 col-lg-6 col-xl-4 px-lg-6 my-5">
          <h1 className="display-4 text-center mb-3">Forgot password</h1>
          <p className="text-muted text-center mb-5">
            Enter your email to get a password reset link.
          </p>
          <form onSubmit={submit}>
            {error && <p className="text-danger text-center">{error}</p>}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="form-control "
                placeholder="name@address.com"
              />
            </div>
            <button className="btn btns btn-lg btn-block btn-primary mb-3">
              Forgot Password
            </button>
            <div className="text-center">
              <small className="text-muted text-center">
                Remember your password? <Link to="/login">Log in</Link>.
              </small>
            </div>
          </form>
        </div>
        <div className="col-12 col-md-7 col-lg-6 col-xl-8 d-none d-lg-block">
          <img
            className="bg-cover vh-100 mt-n1 mr-n3"
            src={bacckImage}
            alt="background"
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
