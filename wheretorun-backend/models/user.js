const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
      },
    idcard: {
        type: Number,
        required: true
      },
    phone: {
       type: Number,
       required: true
    },
    brithday: {
       type: Date,
       required: true
    },
    gender: {
        type: String,
        required: true
      },
   
  });
  
  module.exports = mongoose.model('User', userSchema);