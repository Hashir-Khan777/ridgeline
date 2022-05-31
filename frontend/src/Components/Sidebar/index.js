import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item nav-profile">
          <a href="#" className="nav-link">
            <div className="nav-profile-image">
              <img
                src={JSON.parse(localStorage.getItem("user")).image}
                alt="profile"
              />
              <span className="login-status online"></span>
            </div>
            <div className="nav-profile-text d-flex flex-column">
              <span className="font-weight-bold mb-2">
                {JSON.parse(localStorage.getItem("user")).name}
              </span>
            </div>
            <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
          </a>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link">
            <span className="menu-title" style={{ color: "#1A73E8" }}>
              Dashboard
            </span>
            <i
              className="mdi mdi-home menu-icon"
              style={{ color: "#1A73E8" }}
            ></i>
          </Link>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="collapse"
            href="#ui-basic"
            aria-expanded="false"
            aria-controls="ui-basic"
          >
            <span className="menu-title">User</span>
            <i className="menu-arrow"></i>
            <i className="mdi mdi-account"></i>
          </a>
          <div className="collapse" id="ui-basic">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                {" "}
                <Link className="nav-link" to="/profile">
                  View Profile
                </Link>
              </li>
              <li className="nav-item">
                {" "}
                <Link className="nav-link" to="/update">
                  Edit Profile
                </Link>
              </li>
            </ul>
          </div>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/find">
            <span className="menu-title">Find by no</span>
            <i className="mdi mdi-format-list-bulleted menu-icon"></i>
          </Link>
        </li>
        <li className="nav-item sidebar-actions">
          <span className="nav-link">
            <div className="border-bottom">
              <h6 className="font-weight-normal mb-3">Queries</h6>
            </div>
            <Link
              className="btn btn-block btn-lg  mt-4"
              to="/addquery"
              style={{ backgroundColor: "#1A73E8", color: "#fff" }}
            >
              + Add a Query
            </Link>
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
