const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
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
    phoneNumber: {
      type: Number,
      required: ["Phone number is required", true],
    },
    password: {
      type: String,
      required: ["password is required", true],
    },
    image: {
      type: String,
      required: ["image is required", true],
      default: "https://www.w3schools.com/howto/img_avatar.png",
    },
    state: {
      type: String,
      required: ["state is required", true],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
