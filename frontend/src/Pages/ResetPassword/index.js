import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import bacckImage from "./imagess.jpg";

const ResetPassword = () => {
  const [form, setForm] = useState({
    password: "",
  });
  const [error, setError] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { token } = useParams();

  const submit = (e) => {
    e.preventDefault();
    if (form.password !== "") {
      fetch("http://localhost:4000/api/auth/reset", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(() => {
          navigate("/login", {
            replace: true,
            state: { from: "/resetpassword" },
          });
        })
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
          <h1 className="display-4 text-center mb-3">Reset password</h1>
          <p className="text-muted text-center mb-5">
            Enter your email to get a password reset link.
          </p>
          <form onSubmit={submit}>
            {error && <p className="text-danger text-center">{error}</p>}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-group input-group-merge">
                <input
                  className="form-control"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="input-group-text"
                >
                  <i
                    className={!showPassword ? "fa fa-eye" : "fa fa-eye-slash"}
                  ></i>
                </span>
              </div>
            </div>
            <button className="btn btns btn-lg btn-block btn-primary mb-3">
              Reset Password
            </button>
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

export default ResetPassword;
