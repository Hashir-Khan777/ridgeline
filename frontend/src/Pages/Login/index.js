import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bacckImage from "./imagess.jpg";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState();
  const [showPassword, setShowPassword] = useState();

  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (form.email !== "" && form.password !== "") {
      fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.token) {
            localStorage.setItem("user", JSON.stringify(data));
            navigate("/", { replace: true, state: { from: "/login" } });
          } else {
            setError(data.message);
          }
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
      navigate("/", { replace: true, state: { from: "/login" } });
    }
  }, [navigate]);

  return (
    <div className="container-fluid">
      <div className="row align-items-center justify-content-center">
        <div className="col-12 col-md-5 col-lg-6 col-xl-4 px-lg-6 my-5">
          <h1 className="display-4 text-center mb-3">Sign in</h1>
          <p className="text-muted text-center mb-5">
            Free access to our dashboard.
          </p>
          <form onSubmit={submit}>
            {error && <p className="text-danger text-center">{error}</p>}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="name@address.com"
              />
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col">
                  <label className="form-label">Password</label>
                </div>
                <div className="col-auto">
                  <Link
                    to="/forgotpassword"
                    className="form-text small text-muted"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
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
              Sign in
            </button>
            <p className="text-center">
              <small className="text-muted text-center">
                Don't have an account yet? <Link to="/signup">Sign up</Link>.
              </small>
            </p>
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

export default Login;
