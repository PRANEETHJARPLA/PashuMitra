import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

function CreateAnimal() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    category: 'Cow',
    breed: '',
    age: '',
    gender: 'Female',
    weight: '',
    price: '',
    description: '',
    location: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPhoto(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('category', form.category);
      formData.append('breed', form.breed);
      formData.append('age', form.age);
      formData.append('gender', form.gender);
      formData.append('price', form.price);
      formData.append('location', form.location);
      if (form.weight) formData.append('weight', form.weight);
      if (form.description) formData.append('description', form.description);
      if (photo) formData.append('photo', photo);

      const response = await api.post('/animals', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate(`/animals/${response.data._id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create listing. Please try again.');
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-green-50 p-8">
        <p className="text-gray-700 mb-4">You need to be logged in to create a listing.</p>
        <Link to="/login" className="text-green-700 underline">
          Log in
        </Link>
        {' or '}
        <Link to="/signup" className="text-green-700 underline">
          Sign up
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Create a Listing</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6 max-w-xl space-y-4"
      >
        {error && <p className="text-red-600">{error}</p>}

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="w-full border rounded px-3 py-2"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 h-40 w-40 object-cover rounded"
            />
          )}
        </div>

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
