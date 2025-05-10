import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", formData);
    // Integrate API here if needed
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white px-4">
      <div className="bg-zinc-800 w-full max-w-md p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Log In</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm mb-1">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm mb-1">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded text-white font-semibold"
          >
            Log In
          </button>
        </form>

        <p className="text-sm mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
