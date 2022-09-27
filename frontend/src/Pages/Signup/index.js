import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bacckImage from "./imagess.jpg";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    state: "abc",
  });
  const [error, setError] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (
      form.name !== "" &&
      form.email !== "" &&
      form.password !== "" &&
      form.confirmPassword !== "" &&
      form.phoneNumber !== "" &&
      form.state !== ""
    ) {
      if (form.password === form.confirmPassword) {
        fetch("https://ridgelinebackend.herokuapp.com/api/auth/register", {
          method: "POST",
          body: JSON.stringify(form),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem("user", JSON.stringify(data));
            navigate("/", { replace: true, state: { from: "/signup" } });
          })
          .catch((err) => {
            setError(err.message);
          });
      } else {
        setError("Password does not match");
      }
    } else {
      setError("Please fill all the fields");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/", { replace: true, state: { from: "/signup" } });
    }
  }, [navigate]);

  useEffect(() => {
    if (form.phoneNumber.startsWith("+1")) {
      setForm({ ...form, state: "usa" });
    } else if (form.phoneNumber.startsWith("+44")) {
      setForm({ ...form, state: "uk" });
    } else if (form.phoneNumber.startsWith("+61")) {
      setForm({ ...form, state: "australia" });
    }
  }, [form]);

  return (
    <div className="container-fluid">
      <div className="row align-items-center justify-content-center">
        <div className="col-12 col-md-5 col-lg-6 col-xl-4 px-lg-6 my-5">
          <h1 className="display-4 text-center mb-3">Sign up</h1>
          <p className="text-muted text-center mb-5">
            Free access to our dashboard.
          </p>
          <form onSubmit={submit}>
            {error && <p className="text-danger text-center">{error}</p>}
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="form-control"
                placeholder="Jhon Doe"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="form-control"
                placeholder="name@address.com"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                onChange={(e) =>
                  setForm({ ...form, phoneNumber: e.target.value })
                }
                className="form-control"
                placeholder="03000000000"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-group input-group-merge">
                <input
                  className="form-control"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
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
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div className="input-group input-group-merge">
                <input
                  className="form-control"
                  type={showConfirmPassword ? "text" : "password"}
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                  placeholder="Confirm your password"
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="input-group-text"
                >
                  <i
                    className={
                      !showConfirmPassword ? "fa fa-eye" : "fa fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <button className="btn btns btn-lg btn-block btn-primary mb-3">
              Sign up
            </button>
            <div className="text-center">
              <small className="text-muted text-center">
                Already have an account? <Link to="/login">Log in</Link>.
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

export default SignUp;
