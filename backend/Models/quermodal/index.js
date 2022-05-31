const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuerySchema = new Schema(
  {
    name: {
      type: String,
      required: ["name is required", true],
    },
    email: {
      type: String,
      required: ["email is required", true],
      unique: ["email should be unique", true],
    },
    password: {
      type: String,
      required: ["password is required", true],
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Query", QuerySchema);

module.exports = User;
