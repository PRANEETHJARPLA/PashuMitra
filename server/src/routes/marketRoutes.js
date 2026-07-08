const express = require('express');
const router = express.Router();
const { getFeedPrices } = require('../controllers/marketController');

router.get('/feed-prices', getFeedPrices);

module.exports = router;
