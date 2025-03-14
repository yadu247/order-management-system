import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/auth';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('⚠️ Passwords do not match!');
      return;
    }

    try {
      await register({ name, email, password });
      navigate('/login');
    } catch (err) {
      setError(
        err.response?.data?.message || '⚠️ Registration failed. Try again!'
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-green-500 to-blue-600">
      <div className="bg-white/10 backdrop-blur-md shadow-lg p-8 rounded-xl w-96 border border-white/20">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Create an Account
        </h2>
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 bg-white/20 text-white rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-white placeholder-white/70"
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 bg-white/20 text-white rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-white placeholder-white/70"
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 bg-white/20 text-white rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-white placeholder-white/70"
            onChange={e => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 bg-white/20 text-white rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-white placeholder-white/70"
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-white text-blue-600 font-semibold py-3 rounded-lg transition-all duration-300 hover:bg-blue-500 hover:text-white"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
