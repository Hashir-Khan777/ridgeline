const express = require("express");
const { User } = require("../../Models");
const expressAsyncHandler = require("express-async-handler");
const { JWTServices, MailServices } = require("../../Services");
const jwt = require("jsonwebtoken");

const AuthRouter = express.Router();

AuthRouter.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
      res.send({
        ...user._doc,
        token: JWTServices.generateToken(user, "30d"),
      });
    } else {
      res.status(401).send({ message: "Invalid credentials" });
    }
  })
);

AuthRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.status(401).send({ message: "User already exists" });
    } else {
      const newUser = await User.create(req.body);
      res.send({
        ...newUser._doc,
        token: JWTServices.generateToken(newUser, "30d"),
      });
    }
  })
);

AuthRouter.post(
  "/forgot",
  expressAsyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const token = JWTServices.generateToken(user, "2h");
      const text = `Hi ${user.name},\n\nClick on the link below to reset your password. This link is valid for only 2 hours.\n\n${process.env.FRONTEND_URL}/resetpassword/${token}`;
      MailServices.sendMail(user.email, text, "Reset Password");
      res.send(user);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  })
);

AuthRouter.post(
  "/reset",
  expressAsyncHandler(async (req, res) => {
    const { password } = req.body;
    const { authorization } = req.headers;
    const token = authorization.slice(7, authorization.length);
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) res.status(401).send({ message: "Please login again" });
        if (user) {
          const { _id } = user.user;
          const updatedUser = await User.findOneAndUpdate(
            { _id },
            { password }
          );
          res.send(updatedUser);
        } else {
          res.status(404).send({ message: "User not found" });
        }
      });
    } else {
      res.status(404).send({ message: "Please login again" });
    }
  })
);

module.exports = AuthRouter;
