const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const organizerSchema = new Schema({
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
        type: String,
        required: true
      },
    phone: {
       type: String,
       required: true
    },
    brithday: {
       type: String,
       required: true
    },
    gender: {
        type: String,
        required: true
      },
    // image: {
    //   type: String,
    //   required: true
    // },
   
  });
  
  module.exports = mongoose.model('Organizer', organizerSchema);