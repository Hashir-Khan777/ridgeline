const express = require("express");
const { User } = require("../../Models");
const expressAsyncHandler = require("express-async-handler");
const { isAuth } = require("../../Services/jwtservice");
const { JWTServices } = require("../../Services");

const EmployeeRouter = express.Router();

EmployeeRouter.get(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const employees = await User.find();
    res.send(employees);
  })
);

EmployeeRouter.get(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const employees = await User.find();
    res.send(employees);
  })
);

EmployeeRouter.put(
  "/update",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { _id } = req.body;
    if (_id) {
      const user = await User.findOneAndUpdate(
        { _id },
        { $set: req.body },
        { new: true }
      );
      res.send({
        ...user._doc,
        token: JWTServices.generateToken(user, "30d"),
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  })
);

EmployeeRouter.post(
  "/find",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { state } = req.body;
    const employees = await User.find({ state });
    res.send(employees);
  })
);

module.exports = EmployeeRouter;
