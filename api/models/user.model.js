const mongoose = require("mongoose");
require("mongoose-type-email");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: [true, "Email required"],
    unique: [true, "This email is registered"],
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  listas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "list"
    },
  ],
});

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
