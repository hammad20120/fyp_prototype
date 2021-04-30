const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userId: String,
    gender: String,
    age: Number,
    email: String,
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
