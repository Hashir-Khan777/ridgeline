const express = require("express");
const { Query } = require("../../Models");
const expressAsyncHandler = require("express-async-handler");
const { isAuth } = require("../../Services/jwtservice");

const QueryRouter = express.Router();

QueryRouter.get(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const queries = await Query.find();
    res.send(queries);
  })
);

QueryRouter.post(
  "/post",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { email } = req.body;
    const query = await Query.findOne({ email });
    if (query) {
      res.status(400).send("Query already exists");
    } else {
      const newQuery = await Query.create(req.body);
      res.send(newQuery);
    }
  })
);

module.exports = QueryRouter;
