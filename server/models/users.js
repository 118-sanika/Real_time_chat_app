const mongoose = require('../db/connection');
const { Schema } = mongoose;



const userSchema = new Schema({
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  token: { type: String }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
