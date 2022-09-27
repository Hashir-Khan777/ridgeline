import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/vendor.bundle.base.css";
import "./css/style.css";
import { Navbar, Sidebar } from "../../Components";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [queries, setQueries] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login", { replace: true, state: { from: "/" } });
    }
  }, [navigate]);

  useEffect(() => {
    fetch("https://ridgelinebackend.herokuapp.com/api/employees", {
      method: "GET",
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
  }, []);

  useEffect(() => {
    fetch("https://ridgelinebackend.herokuapp.com/api/queries", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => setQueries(data))
      .catch((err) => setError(err));
  }, []);

  return (
    <div className="container-scroller">
      <div className="fixed-top pb-5">
        <div className="row p-0 m-0 proBanner" id="proBanner">
          <div className="col-md-12 p-0 m-0">
            <div className="card-body card-body-padding d-flex align-items-center justify-content-between">
              <div className="ps-lg-1">
                <div className="d-flex align-items-center justify-content-between">
                  <p className="mb-0 font-weight-medium me-3 buy-now-text"></p>
                  <a
                    href="https://theridgelinemarketing.com/"
                    target="_blank"
                    className="btn me-2 buy-now-btn border-0"
                  >
                    Now more About Our Business
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Navbar />
      </div>
      <div
        className="container-fluid page-body-wrapper"
        style={{ paddingTop: "10rem" }}
      >
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">
                <span
                  className="page-title-icon  text-white me-2"
                  style={{ backgroundColor: "#1A73E8" }}
                >
                  <i className="mdi mdi-home"></i>
                </span>{" "}
                Dashboard
              </h3>
              <nav aria-label="breadcrumb">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item active" aria-current="page">
                    <span></span>Overview{" "}
                    <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="row">
              <div className="col-md-6 stretch-card grid-margin">
                <div className="card bg-gradient-danger card-img-holder text-white">
                  <div className="card-body">
                    <img
                      src="/images/dashboard/circle.svg"
                      className="card-img-absolute"
                      alt="circle-image"
                      style={{ opacity: "0.1" }}
                    />
                    <h4 className="font-weight-normal mb-3">
                      Clients{" "}
                      <i className="mdi mdi-account mdi-24px float-right"></i>
                    </h4>
                    <h2 className="mb-5">{queries.length}</h2>
                  </div>
                </div>
              </div>
              <div className="col-md-6 stretch-card grid-margin">
                <div className="card bg-gradient-info card-img-holder text-white">
                  <div className="card-body">
                    <img
                      src="/images/dashboard/circle.svg"
                      className="card-img-absolute"
                      alt="circle-image"
                      style={{ opacity: "0.1" }}
                    />
                    <h4 className="font-weight-normal mb-3">
                      No Of Employees{" "}
                      <i className="mdi mdi-account mdi-24px float-right"></i>
                    </h4>
                    <h2 className="mb-5">{employees.length}</h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
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

export default Home;
