import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Scheme } from '../types/Scheme';

const CATEGORIES = ['Poultry', 'Sheep & Goat', 'Piggery', 'Feed & Fodder', 'Insurance', 'Equine & Camel', 'Donkey'];

function SchemeFinder() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('');

  const fetchSchemes = (activeCategory = category) => {
    setLoading(true);
    setError('');

    const params: Record<string, string> = {};
    if (activeCategory) params.category = activeCategory;

    api
      .get('/schemes', { params })
      .then((response) => {
        setSchemes(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load schemes.');
        setLoading(false);
        console.error(err);
      });
  };

  useEffect(() => {
    fetchSchemes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCategory(value);
    fetchSchemes(value);
  };

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <h1 className="text-3xl font-bold text-green-800 mb-2">Government Scheme Finder</h1>
      <p className="text-gray-600 mb-6 max-w-2xl">
        Browse National Livestock Mission (NLM) subsidy schemes by livestock category. This is
        general information only, always confirm current details on the official NLM portal
        before applying, as subsidy amounts and eligibility rules can change.
      </p>

      <div className="bg-white rounded-lg shadow p-4 mb-6 flex items-end gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Filter by Category
          </label>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="border rounded px-3 py-2"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading schemes...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : schemes.length === 0 ? (
        <p className="text-gray-600">No schemes found for this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {schemes.map((scheme) => (
            <div key={scheme._id} className="bg-white rounded-lg shadow p-6">
              <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded mb-2">
                {scheme.category}
              </span>
              <h2 className="text-xl font-semibold text-green-800 mb-2">{scheme.title}</h2>
              <p className="text-gray-600 mb-4">{scheme.description}</p>

              <div className="space-y-1 text-sm text-gray-700 mb-4">
                {scheme.subsidyPercent && (
                  <p>
                    <span className="font-semibold">Subsidy:</span> {scheme.subsidyPercent}
                  </p>
                )}
                {scheme.maxSubsidyAmount && (
                  <p>
                    <span className="font-semibold">Amount:</span> {scheme.maxSubsidyAmount}
                  </p>
                )}
                {scheme.minimumUnit && (
                  <p>
                    <span className="font-semibold">Minimum Unit:</span> {scheme.minimumUnit}
                  </p>
                )}
                {scheme.eligibleBeneficiaries && (
                  <p>
                    <span className="font-semibold">Eligible:</span> {scheme.eligibleBeneficiaries}
                  </p>
                )}
              </div>

              
              <a
                href={scheme.officialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-700 text-white font-semibold px-4 py-2 rounded hover:bg-green-800 transition text-sm"
              >
                Apply on Official NLM Portal
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SchemeFinder;
