require('dotenv').config();
const mongoose = require('mongoose');
const Scheme = require('../models/Scheme');

const schemes = [
  {
    title: 'Rural Poultry Entrepreneurship (NLM-EDP)',
    category: 'Poultry',
    schemeType: 'Central',
    subsidyPercent: '50% capital subsidy',
    maxSubsidyAmount: 'Up to ₹25 lakh per unit (in two installments)',
    minimumUnit: 'Minimum 1,000 parent birds with hatchery and brooder-cum-mother unit',
    eligibleBeneficiaries: 'Individuals, SHGs, FPOs, Farmer Cooperative Societies, JLGs, Section 8 companies',
    description:
      'Supports establishment of rural poultry breeding farms, including hatchery and brooder-cum-mother units, to bring backyard poultry into organized, income-generating enterprises.',
    officialLink: 'https://nlm.udyamimitra.in',
  },
  {
    title: 'Sheep & Goat Breeding Entrepreneurship (NLM-EDP)',
    category: 'Sheep & Goat',
    schemeType: 'Central',
    subsidyPercent: '50% capital subsidy',
    maxSubsidyAmount: 'Up to ₹50 lakh per unit (in two installments)',
    minimumUnit:
      'Standard unit: 500 does/ewes + 25 bucks/rams. Smaller units also supported: 400+20, 300+15, 200+10, 100+5',
    eligibleBeneficiaries: 'Individuals, SHGs, FPOs, Farmer Cooperative Societies, JLGs, Section 8 companies',
    description:
      'Capital subsidy for setting up sheep or goat breeding farms, covering shed construction, doe/ewe purchase, and related infrastructure. Smaller unit sizes are supported with proportionally lower subsidy ceilings for entrepreneurs starting with fewer animals.',
    officialLink: 'https://nlm.udyamimitra.in',
  },
  {
    title: 'Piggery Entrepreneurship (NLM-EDP)',
    category: 'Piggery',
    schemeType: 'Central',
    subsidyPercent: '50% capital subsidy',
    maxSubsidyAmount: 'Up to ₹30 lakh per unit (in two installments); smaller unit (50 sows + 5 boars) capped at ₹15 lakh',
    minimumUnit: 'Minimum 100 sows + 25 boars for the full-ceiling unit',
    eligibleBeneficiaries: 'Individuals, SHGs, FPOs, Farmer Cooperative Societies, JLGs, Section 8 companies',
    description:
      'Financial support for establishing pig breeding units, covering sty construction, farrowing pens, piglet costs, equipment, and veterinary aid.',
    officialLink: 'https://nlm.udyamimitra.in',
  },
  {
    title: 'Feed & Fodder Entrepreneurship (NLM-EDP)',
    category: 'Feed & Fodder',
    schemeType: 'Central',
    subsidyPercent: '50% capital subsidy',
    maxSubsidyAmount: 'Up to ₹50 lakh per unit',
    minimumUnit: 'Silage bailer, fodder block, or Total Mixed Ration (TMR) production unit',
    eligibleBeneficiaries: 'Individuals, SHGs, FPOs, Farmer Cooperative Societies, JLGs, Section 8 companies',
    description:
      'Supports setting up hay, silage, fodder block, or TMR-making units to improve feed availability and quality for livestock, including machinery and storage infrastructure.',
    officialLink: 'https://nlm.udyamimitra.in',
  },
  {
    title: 'Livestock Insurance under NLM',
    category: 'Insurance',
    schemeType: 'Central',
    subsidyPercent: 'Premium subsidy (varies by category)',
    maxSubsidyAmount:
      'APL farmers: pay ~40% of premium (govt covers ~60%). BPL/SC/ST farmers: pay ~20% of premium (govt covers ~80%)',
    minimumUnit: 'Coverage available for up to 10 cattle units per household',
    eligibleBeneficiaries: 'All livestock-owning farmers, with higher subsidy for BPL/SC/ST categories',
    description:
      'Reduces the cost of insuring livestock against death and related risks, protecting farmers from catastrophic financial loss if an animal dies. Premium subsidy percentage is higher for BPL, SC, and ST farmers.',
    officialLink: 'https://nlm.udyamimitra.in',
  },
  {
    title: 'Equine (Horse) Breeding Entrepreneurship',
    category: 'Equine & Camel',
    schemeType: 'Central',
    subsidyPercent: '50% capital subsidy',
    maxSubsidyAmount: 'Up to ₹50 lakh per unit',
    minimumUnit: 'Minimum 10 mares + 2 stallions',
    eligibleBeneficiaries: 'Individuals, SHGs, FPOs, Farmer Cooperative Societies, JLGs, Section 8 companies',
    description:
      'Part of NLM\'s expansion to bring horse, donkey, and camel breeding into the organized sector, supporting entrepreneurs setting up dedicated breeding units.',
    officialLink: 'https://nlm.udyamimitra.in',
  },
  {
    title: 'Indigenous Donkey Breeding Entrepreneurship',
    category: 'Donkey',
    schemeType: 'Central',
    subsidyPercent: '50% capital subsidy',
    maxSubsidyAmount: 'Up to ₹50 lakh per unit',
    minimumUnit: 'Minimum 50 females + 5 males',
    eligibleBeneficiaries: 'Individuals, SHGs, FPOs, Farmer Cooperative Societies, JLGs, Section 8 companies',
    description:
      'Supports breeding units for indigenous donkey breeds, part of NLM\'s effort to formalize and preserve working animal breeding as a viable enterprise.',
    officialLink: 'https://nlm.udyamimitra.in',
  },
];

const seedSchemes = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding');

    await Scheme.deleteMany({});
    console.log('Cleared existing schemes');

    await Scheme.insertMany(schemes);
    console.log(`Inserted ${schemes.length} schemes successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

seedSchemes();
