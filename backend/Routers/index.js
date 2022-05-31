const express = require("express");
const AuthRouter = require("./auth");
const EmployeeRouter = require("./employees");
const QueryRouter = require("./query");

const AppRouter = express.Router();

AppRouter.use("/auth", AuthRouter);
AppRouter.use("/employees", EmployeeRouter);
AppRouter.use("/queries", QueryRouter);

module.exports = AppRouter;
