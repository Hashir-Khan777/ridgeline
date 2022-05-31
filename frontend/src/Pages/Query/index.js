import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Sidebar } from "../../Components";

const Query = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    comment: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (form.name !== "" && form.email !== "" && form.password !== "") {
      fetch("http://localhost:4000/api/queries/post", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      })
        .then((res) => res.json())
        .then(() =>
          navigate("/", { replace: true, state: { from: "/addquery" } })
        )
        .catch((err) => setError(err));
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login", { replace: true, state: { from: "/addquery" } });
    }
  }, [navigate]);

  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="col-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Add a query</h4>
                  <p className="card-description">Add query</p>
                  <form className="forms-sample" onSubmit={submit}>
                    <div className="form-group">
                      <label htmlFor="exampleInputName1">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputName1"
                        placeholder="Name"
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail3">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail3"
                        placeholder="Email"
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="exampleInputPassword4">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword4"
                        placeholder="Password"
                        onChange={(e) =>
                          setForm({ ...form, password: e.target.value })
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="exampleTextarea1">Comment</label>
                      <textarea
                        placeholder="Comment"
                        className="form-control"
                        id="exampleTextarea1"
                        rows="4"
                        onChange={(e) =>
                          setForm({ ...form, comment: e.target.value })
                        }
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="btn me-2"
                      style={{ backgroundColor: "#1a73e8", color: "#fff" }}
                    >
                      Add
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <footer className="footer">
            <div className="container-fluid d-flex justify-content-between">
              <span className="text-muted d-block text-center text-sm-start d-sm-inline-block">
                Copyright © Ridgeline 2021
              </span>
              <span className="float-none float-sm-end mt-1 mt-sm-0 text-end">
                <a href="https://theridgelinemarketing.com/" target="_blank">
                  Made By
                </a>
                Ridgeline
              </span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Query;
