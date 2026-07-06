import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { api } from '../services/api';

function EditAnimal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    category: 'Cow',
    breed: '',
    age: '',
    gender: 'Female',
    weight: '',
    price: '',
    description: '',
    location: '',
    status: 'Available',
  });

  useEffect(() => {
    api
      .get(`/animals/${id}`)
      .then((response) => {
        const a = response.data;
        setForm({
          category: a.category,
          breed: a.breed,
          age: String(a.age),
          gender: a.gender,
          weight: a.weight ? String(a.weight) : '',
          price: String(a.price),
          description: a.description || '',
          location: a.location,
          status: a.status,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError('Could not load this listing.');
        setLoading(false);
        console.error(err);
      });
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const payload = {
        ...form,
        age: Number(form.age),
        price: Number(form.price),
        weight: form.weight ? Number(form.weight) : undefined,
      };

      await api.put(`/animals/${id}`, payload);
      navigate(`/animals/${id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update listing.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 p-8">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error && !form.breed) {
    return (
      <div className="min-h-screen bg-green-50 p-8">
        <p className="text-red-600">{error}</p>
        <Link to="/my-listings" className="text-green-700 underline mt-4 inline-block">
          Back to My Listings
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Edit Listing</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6 max-w-xl space-y-4"
      >
        {error && <p className="text-red-600">{error}</p>}

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option>Cow</option>
            <option>Buffalo</option>
            <option>Goat</option>
            <option>Sheep</option>
            <option>Poultry</option>
            <option>Pig</option>
            <option>Horse</option>
            <option>Rabbit</option>
            <option>Pet</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Breed</label>
          <input
            type="text"
            name="breed"
            value={form.breed}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Age (months)</label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option>Female</option>
              <option>Male</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={form.weight}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option>Available</option>
            <option>Sold</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-green-700 text-white font-semibold px-6 py-2 rounded hover:bg-green-800 transition disabled:opacity-50"
        >
          {submitting ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}

export default EditAnimal;
