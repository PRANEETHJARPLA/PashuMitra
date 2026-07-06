const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ['Cow', 'Buffalo', 'Goat', 'Sheep', 'Poultry', 'Pig', 'Horse', 'Rabbit', 'Pet'],
    },
    breed: {
      type: String,
      required: true,
    },
    age: {
      type: Number, // age in months
      required: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
      required: true,
    },
    weight: {
      type: Number, // in kg
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    photoUrl: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    sellerName: {
      type: String,
      required: true,
    },
    sellerContact: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Available', 'Sold'],
      default: 'Available',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Animal', animalSchema);
