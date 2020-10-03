const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String,
  displayName: String,
  email: String,
  profilePic: String,
});

mongoose.model('Users', userSchema);
