import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import type { Animal } from '../types/Animal';

function MyListings() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMyAnimals = () => {
    setLoading(true);
    api
      .get('/animals/mine')
      .then((response) => {
        setAnimals(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load your listings.');
        setLoading(false);
        console.error(err);
      });
  };

  useEffect(() => {
    fetchMyAnimals();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this listing?');
    if (!confirmed) return;

    try {
      await api.delete(`/animals/${id}`);
      setAnimals(animals.filter((a) => a._id !== id));
    } catch (err) {
      alert('Failed to delete listing.');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 p-8">
        <p className="text-gray-600">Loading your listings...</p>
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
      <h1 className="text-3xl font-bold text-green-800 mb-6">My Listings</h1>

      {animals.length === 0 ? (
        <p className="text-gray-600">
          You haven't created any listings yet.{' '}
          <Link to="/create" className="text-green-700 underline">
            Create one now
          </Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {animals.map((animal) => (
            <div key={animal._id} className="bg-white rounded-lg shadow p-4">
              <Link to={`/animals/${animal._id}`}>
                <h2 className="text-xl font-semibold text-green-800">
                  {animal.breed} ({animal.category})
                </h2>
                <p className="text-gray-600">Age: {animal.age} months</p>
                <p className="text-gray-600">Location: {animal.location}</p>
                <p className="text-lg font-bold text-green-700 mt-2">
                  ₹{animal.price.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">Status: {animal.status}</p>
              </Link>

              <div className="flex gap-3 mt-4">
                <Link
                  to={`/edit/${animal._id}`}
                  className="text-green-700 underline text-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(animal._id)}
                  className="text-red-600 underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyListings;
