import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import type { Animal } from '../types/Animal';

const CATEGORIES = ['Cow', 'Buffalo', 'Goat', 'Sheep', 'Poultry', 'Pig', 'Horse', 'Rabbit', 'Pet'];

function BrowseAnimals() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [filters, setFilters] = useState({
    category: '',
    location: '',
    minPrice: '',
    maxPrice: '',
  });

  const fetchAnimals = (activeFilters = filters) => {
    setLoading(true);
    setError('');

    const params: Record<string, string> = {};
    if (activeFilters.category) params.category = activeFilters.category;
    if (activeFilters.location) params.location = activeFilters.location;
    if (activeFilters.minPrice) params.minPrice = activeFilters.minPrice;
    if (activeFilters.maxPrice) params.maxPrice = activeFilters.maxPrice;

    api
      .get('/animals', { params })
      .then((response) => {
        setAnimals(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load listings. Is the backend running?');
        setLoading(false);
        console.error(err);
      });
  };

  useEffect(() => {
    fetchAnimals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAnimals(filters);
  };

  const handleClear = () => {
    const cleared = { category: '', location: '', minPrice: '', maxPrice: '' };
    setFilters(cleared);
    fetchAnimals(cleared);
  };

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Browse Animals</h1>

      <form
        onSubmit={handleSearch}
        className="bg-white rounded-lg shadow p-4 mb-6 flex flex-wrap gap-4 items-end"
      >
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="border rounded px-3 py-2"
          >
            <option value="">All</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            placeholder="e.g. Mahabubabad"
            className="border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Min Price</label>
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            className="border rounded px-3 py-2 w-28"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Max Price</label>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            className="border rounded px-3 py-2 w-28"
          />
        </div>

        <button
          type="submit"
          className="bg-green-700 text-white font-semibold px-5 py-2 rounded hover:bg-green-800 transition"
        >
          Search
        </button>

        <button
          type="button"
          onClick={handleClear}
          className="text-gray-600 underline px-2 py-2"
        >
          Clear
        </button>
      </form>

      {loading ? (
        <p className="text-gray-600">Loading listings...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : animals.length === 0 ? (
        <p className="text-gray-600">No listings match your filters.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {animals.map((animal) => (
            <Link
              to={`/animals/${animal._id}`}
              key={animal._id}
              className="bg-white rounded-lg shadow p-4 hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-green-800">
                {animal.breed} ({animal.category})
              </h2>
              <p className="text-gray-600">Age: {animal.age} months</p>
              <p className="text-gray-600">Location: {animal.location}</p>
              <p className="text-lg font-bold text-green-700 mt-2">
                ₹{animal.price.toLocaleString()}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default BrowseAnimals;
