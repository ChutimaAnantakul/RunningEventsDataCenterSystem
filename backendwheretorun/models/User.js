var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  password: String,
  idcard: String,
  phone: String,
  brithday: String,
  gender: String,
  // published_year: { type: Number, min: 1945, max: 2019 },
  // publisher: String,
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);