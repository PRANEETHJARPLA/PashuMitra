import { useState } from 'react';
import { api } from '../services/api';

interface PriceRecord {
  state: string;
  district: string;
  market: string;
  commodity: string;
  variety: string;
  grade: string;
  arrival_date: string;
  min_price: string;
  max_price: string;
  modal_price: string;
}

const FEED_COMMODITIES = ['Maize', 'Soyabean', 'Bajra', 'Jowar', 'Wheat', 'Groundnut'];

function MarketPrices() {
  const [commodity, setCommodity] = useState('Maize');
  const [records, setRecords] = useState<PriceRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const fetchPrices = (selectedCommodity: string) => {
    setLoading(true);
    setError('');
    setSearched(true);

    api
      .get('/market/feed-prices', { params: { commodity: selectedCommodity } })
      .then((response) => {
        setRecords(response.data.records);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load price data. The government data source may be temporarily unavailable.');
        setLoading(false);
        console.error(err);
      });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPrices(commodity);
  };

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <h1 className="text-3xl font-bold text-green-800 mb-2">Feed Commodity Prices</h1>
      <p className="text-gray-600 mb-6 max-w-2xl">
        Live daily mandi prices for major livestock feed commodities, sourced from the
        Government of India's Agmarknet data via data.gov.in. Prices vary by market and
        may differ from your local mandi.
      </p>

      <form
        onSubmit={handleSearch}
        className="bg-white rounded-lg shadow p-4 mb-6 flex flex-wrap items-end gap-4"
      >
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Feed Commodity
          </label>
          <select
            value={commodity}
            onChange={(e) => setCommodity(e.target.value)}
            className="border rounded px-3 py-2"
          >
            {FEED_COMMODITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-700 text-white font-semibold px-5 py-2 rounded hover:bg-green-800 transition"
        >
          Check Prices
        </button>
      </form>

      {loading ? (
        <p className="text-gray-600">Fetching live prices...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : !searched ? (
        <p className="text-gray-600">Select a commodity and click "Check Prices" to see live mandi rates.</p>
      ) : records.length === 0 ? (
        <p className="text-gray-600">No price records found for this commodity right now.</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-green-100 text-green-800">
              <tr>
                <th className="text-left p-3">State</th>
                <th className="text-left p-3">Market</th>
                <th className="text-left p-3">Variety</th>
                <th className="text-right p-3">Min Price</th>
                <th className="text-right p-3">Max Price</th>
                <th className="text-right p-3">Modal Price</th>
                <th className="text-left p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3">{r.state}</td>
                  <td className="p-3">{r.market}</td>
                  <td className="p-3">{r.variety}</td>
                  <td className="p-3 text-right">₹{r.min_price}</td>
                  <td className="p-3 text-right">₹{r.max_price}</td>
                  <td className="p-3 text-right font-semibold">₹{r.modal_price}</td>
                  <td className="p-3">{r.arrival_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-gray-500 p-3">
            Prices are per quintal, as reported to Agmarknet. Source: data.gov.in
          </p>
        </div>
      )}
    </div>
  );
}

export default MarketPrices;
