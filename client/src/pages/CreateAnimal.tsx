import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

function CreateAnimal() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    category: 'Cow',
    breed: '',
    age: '',
    gender: 'Female',
    weight: '',
    price: '',
    description: '',
    location: '',
    sellerName: '',
    sellerContact: '',
  });

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

      const response = await api.post('/animals', payload);
      navigate(`/animals/${response.data._id}`);
    } catch (err) {
      setError('Failed to create listing. Please check the fields and try again.');
      console.error(err);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Create a Listing</h1>

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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Your Name</label>
            <input
              type="text"
              name="sellerName"
              value={form.sellerName}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Contact Number</label>
            <input
              type="text"
              name="sellerContact"
              value={form.sellerContact}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-green-700 text-white font-semibold px-6 py-2 rounded hover:bg-green-800 transition disabled:opacity-50"
        >
          {submitting ? 'Creating...' : 'Create Listing'}
        </button>
      </form>
    </div>
  );
}

export default CreateAnimal;
