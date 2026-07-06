import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import type { Animal } from '../types/Animal';

function BrowseAnimals() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/animals')
      .then((response) => {
        setAnimals(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load listings. Is the backend running?');
        setLoading(false);
        console.error(err);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 p-8">
        <p className="text-gray-600">Loading listings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-green-50 p-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Browse Animals</h1>

      {animals.length === 0 ? (
        <p className="text-gray-600">No listings yet.</p>
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
