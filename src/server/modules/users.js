const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  id: String,
  name: String,
  avatar: String,
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
