import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'Both',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const response = await api.post('/auth/signup', form);
      login(response.data.user, response.data.token);
      navigate('/animals');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 p-8 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6 max-w-md w-full space-y-4 h-fit"
      >
        <h1 className="text-2xl font-bold text-green-800 mb-2">Sign Up</h1>

        {error && <p className="text-red-600">{error}</p>}

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">I am a</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="Both">Farmer & Buyer</option>
            <option value="Farmer">Farmer (seller)</option>
            <option value="Buyer">Buyer only</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-green-700 text-white font-semibold px-6 py-2 rounded hover:bg-green-800 transition disabled:opacity-50 w-full"
        >
          {submitting ? 'Creating account...' : 'Sign Up'}
        </button>

        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-green-700 underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
