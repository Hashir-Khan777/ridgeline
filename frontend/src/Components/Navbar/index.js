import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("user");
    navigate("/login", { replace: true, state: { from: "/" } });
  };

  return (
    <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <a className="navbar-brand brand-logo" href="index.html">
          <img src="/images/ridgeline-logo.png" alt="logo" />
        </a>
        <a className="navbar-brand brand-logo-mini" href="index.html">
          <img src="/images/ridgeline-logo.png" alt="logo" />
        </a>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-stretch">
        <button
          className="navbar-toggler navbar-toggler align-self-center"
          type="button"
          data-toggle="minimize"
        >
          <span className="mdi mdi-menu"></span>
        </button>
        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item nav-profile position-relative">
            <a
              className="nav-link dropdown-toggle"
              id="profileDropdown"
              href="#"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div className="nav-profile-img">
                <img
                  src={
                    JSON.parse(localStorage.getItem("user")) &&
                    JSON.parse(localStorage.getItem("user")).image
                  }
                  alt="image"
                />
                <span className="availability-status online"></span>
              </div>
              <div className="nav-profile-text">
                <p className="mb-1 text-black">
                  {JSON.parse(localStorage.getItem("user")) &&
                    JSON.parse(localStorage.getItem("user")).name}
                </p>
              </div>
            </a>
            <div
              className="dropdown-menu navbar-dropdown position-absolute"
              aria-labelledby="profileDropdown"
              style={{ right: 0 }}
            >
              <div
                className="d-flex dropdown-item"
                role="button"
                onClick={signOut}
              >
                <i className="mdi mdi-logout me-2 text-primary"></i>{" "}
                <span>Signout</span>
              </div>
            </div>
          </li>
        </ul>
        <button
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          data-toggle="offcanvas"
        >
          <span className="mdi mdi-menu"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
