import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { api } from '../services/api';

function EditAnimal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [existingPhotoUrl, setExistingPhotoUrl] = useState<string | null>(null);

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
        setExistingPhotoUrl(a.photoUrl || null);
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
      formData.append('status', form.status);
      if (form.weight) formData.append('weight', form.weight);
      if (form.description) formData.append('description', form.description);
      if (photo) formData.append('photo', photo);

      await api.put(`/animals/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
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
          <label className="block font-semibold text-gray-700 mb-1">Photo</label>

          {preview ? (
            <img
              src={preview}
              alt="New preview"
              className="mb-2 h-40 w-40 object-cover rounded"
            />
          ) : existingPhotoUrl ? (
            <img
              src={existingPhotoUrl}
              alt="Current"
              className="mb-2 h-40 w-40 object-cover rounded"
            />
          ) : (
            <div className="mb-2 h-40 w-40 bg-gray-100 flex items-center justify-center rounded">
              <span className="text-gray-400 text-sm">No photo</span>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="w-full border rounded px-3 py-2"
          />
          <p className="text-xs text-gray-500 mt-1">
            Leave empty to keep the current photo.
          </p>
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
