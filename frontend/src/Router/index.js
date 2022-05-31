import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  FindByNo,
  ForgotPassword,
  Home,
  Login,
  Query,
  ResetPassword,
  SignUp,
  Updateuser,
  ViewUser,
} from "../Pages";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route caseSensitive path="/" element={<Home />} />
        <Route caseSensitive path="/login" element={<Login />} />
        <Route caseSensitive path="/signup" element={<SignUp />} />
        <Route
          caseSensitive
          path="/forgotpassword"
          element={<ForgotPassword />}
        />
        <Route
          caseSensitive
          path="/resetpassword/:token"
          element={<ResetPassword />}
        />
        <Route caseSensitive path="/addquery" element={<Query />} />
        <Route caseSensitive path="/profile" element={<ViewUser />} />
        <Route caseSensitive path="/update" element={<Updateuser />} />
        <Route caseSensitive path="/find" element={<FindByNo />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
