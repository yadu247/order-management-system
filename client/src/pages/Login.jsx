import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../api/auth';
import { loginSuccess } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = await login({ email, password });

      console.log('Login Response:', data);

      if (data.token) {
        dispatch(loginSuccess(data.token));
        navigate('/dashboard');
      } else {
        console.error('Token missing in response!');
      }
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-600 to-purple-600">
      <div className="bg-white/10 backdrop-blur-md shadow-lg p-8 rounded-xl w-96 border border-white/20">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <button
            type="submit"
            className="w-full bg-white text-blue-600 font-semibold py-3 rounded-lg transition-all duration-300 hover:bg-blue-500 hover:text-white"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
