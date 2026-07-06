import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import type { Animal } from '../types/Animal';

function AnimalDetail() {
  const { id } = useParams();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get(`/animals/${id}`)
      .then((response) => {
        setAnimal(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Could not find this listing.');
        setLoading(false);
        console.error(err);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 p-8">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error || !animal) {
    return (
      <div className="min-h-screen bg-green-50 p-8">
        <p className="text-red-600">{error}</p>
        <Link to="/animals" className="text-green-700 underline mt-4 inline-block">
          Back to Browse
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <Link to="/animals" className="text-green-700 underline mb-4 inline-block">
        ← Back to Browse
      </Link>

      <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <h1 className="text-3xl font-bold text-green-800 mb-2">
          {animal.breed} ({animal.category})
        </h1>
        <p className="text-2xl font-bold text-green-700 mb-4">
          ₹{animal.price.toLocaleString()}
        </p>

        <div className="grid grid-cols-2 gap-4 text-gray-700 mb-4">
          <p><span className="font-semibold">Age:</span> {animal.age} months</p>
          <p><span className="font-semibold">Gender:</span> {animal.gender}</p>
          {animal.weight && (
            <p><span className="font-semibold">Weight:</span> {animal.weight} kg</p>
          )}
          <p><span className="font-semibold">Location:</span> {animal.location}</p>
          <p><span className="font-semibold">Status:</span> {animal.status}</p>
        </div>

        {animal.description && (
          <p className="text-gray-600 mb-4">{animal.description}</p>
        )}

        <div className="border-t pt-4 mt-4">
          <h2 className="font-semibold text-green-800 mb-1">Seller Details</h2>
          <p className="text-gray-700">{animal.sellerName}</p>
          <p className="text-gray-700">{animal.sellerContact}</p>
        </div>
      </div>
    </div>
  );
}

export default AnimalDetail;
