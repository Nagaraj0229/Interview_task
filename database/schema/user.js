const mongoose = require("mongoose");

const UserdeatilsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    default: false,
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const CreateUserSchema = mongoose.model("User", userSchema);
const UserDetailsSchema = mongoose.model("UserDetails", UserdeatilsSchema);

module.exports = { CreateUserSchema, UserDetailsSchema };
