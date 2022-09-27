import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Sidebar } from "../../Components";

const FindByNo = () => {
  const [form, setForm] = useState({
    state: "",
  });
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submit = () => {
    fetch("https://ridgelinebackend.herokuapp.com/api/employees/find", {
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
      .then((data) => setEmployees(data))
      .catch((err) => setError(err));
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login", { replace: true, state: { from: "/" } });
    }
  }, [navigate]);

  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="col-md-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Find By Number</h4>

                  <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">
                      Select Country
                    </label>
                    <select
                      className="form-control form-control-lg"
                      id="exampleFormControlSelect1"
                      onChange={(e) =>
                        setForm({ ...form, state: e.target.value })
                      }
                    >
                      <option value="usa">USA</option>
                      <option value="uk">UK</option>
                      <option value="australia">Australia</option>
                    </select>
                    <button
                      onClick={submit}
                      className="btn btn-block btn-lg mt-4"
                      style={{ backgroundColor: "#1a73e8", color: "#fff" }}
                    >
                      Find
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {employees.length > 0 && (
            <div className="content-wrapper">
              <div className="col-12 grid-margin">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Recent Tickets</h4>
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th> Name </th>
                            <th> Email </th>
                            <th> Phone </th>
                            <th> Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {employees.map((employee, index) => (
                            <tr key={index}>
                              <td>
                                <img
                                  src="/images/aman.png"
                                  className="me-2"
                                  alt="image"
                                />{" "}
                                {employee.name}
                              </td>
                              <td>{employee.email}</td>

                              <td>{employee.phoneNumber}</td>
                              <td>
                                <label className="badge badge-gradient-success">
                                  DONE
                                </label>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
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

export default FindByNo;
