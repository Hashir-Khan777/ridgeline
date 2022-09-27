import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Sidebar } from "./../../Components";

const Updateuser = () => {
  const [form, setForm] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    fetch("https://ridgelinebackend.herokuapp.com/api/employees/update", {
      method: "PUT",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("user", JSON.stringify(data));
        }
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login", { replace: true, state: { from: "/update" } });
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
                  <h4 className="card-title">User Update Detailed</h4>
                  <p className="card-description">Edit User</p>
                  <form className="forms-sample" onSubmit={submit}>
                    <div className="form-group">
                      <label htmlhtmlFor="exampleInputName1">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputName1"
                        placeholder="Name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlhtmlFor="exampleInputEmail3">
                        Email address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail3"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label htmlhtmlFor="exampleInputPassword4">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword4"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) =>
                          setForm({ ...form, password: e.target.value })
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label>File upload</label>
                      <input
                        type="file"
                        name="img[]"
                        className="file-upload-default"
                      />
                      <div className="input-group col-xs-12">
                        <input
                          type="text"
                          className="form-control file-upload-info"
                          disabled
                          placeholder="Upload Image"
                        />
                        <span className="input-group-append">
                          <button
                            className="file-upload-browse btn"
                            type="button"
                            style={{
                              backgroundColor: "#1a73e8",
                              color: "#fff",
                            }}
                          >
                            Upload
                          </button>
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn me-2"
                      style={{ backgroundColor: "#1a73e8", color: "#fff" }}
                    >
                      Edit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <footer className="footer">
            <div className="container-fluid d-flex justify-content-between">
              <span className="text-muted d-block text-center text-sm-start d-sm-inline-block">
                Copyright © Mellontical Solutions {new Date().getFullYear()}
              </span>
              <span className="float-none float-sm-end mt-1 mt-sm-0 text-end">
                {" "}
                <a href="https://www.mellonticalsolutions.com/" target="_blank">
                  Made By
                </a>{" "}
                Mellontical Solutions
              </span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Updateuser;
