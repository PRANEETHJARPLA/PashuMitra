const axios = require('axios');

const RESOURCE_ID = '9ef84268-d588-465a-a308-a864a43d0070';
const BASE_URL = `https://api.data.gov.in/resource/${RESOURCE_ID}`;

exports.getFeedPrices = async (req, res) => {
  try {
    const { commodity, state } = req.query;

    const params = {
      'api-key': process.env.DATA_GOV_API_KEY,
      format: 'json',
      limit: 50,
    };

    if (commodity) params['filters[commodity]'] = commodity;
    if (state) params['filters[state]'] = state;

    const response = await axios.get(BASE_URL, { params });

    res.json({
      count: response.data.records ? response.data.records.length : 0,
      records: response.data.records || [],
    });
  } catch (error) {
    console.error('data.gov.in fetch failed:', error.message);
    res.status(502).json({ message: 'Failed to fetch market price data. Please try again later.' });
  }
};
