const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Poultry', 'Sheep & Goat', 'Piggery', 'Feed & Fodder', 'Insurance', 'Equine & Camel', 'Donkey'],
    },
    schemeType: {
      type: String,
      enum: ['Central', 'State'],
      default: 'Central',
    },
    subsidyPercent: {
      type: String,
    },
    maxSubsidyAmount: {
      type: String,
    },
    minimumUnit: {
      type: String,
    },
    eligibleBeneficiaries: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    officialLink: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      default: 'Department of Animal Husbandry & Dairying, Govt. of India',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Scheme', schemeSchema);
