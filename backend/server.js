const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const AppRouter = require("./Routers");

dotenv.config();
const app = express();

app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(cors());

app.use("/api", AppRouter);

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(process.env.PORT);
