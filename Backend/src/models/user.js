const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    patientProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient', // This assumes you have a 'Patient' model
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);


