const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  dob: { type: Date, required: true },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
  friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
