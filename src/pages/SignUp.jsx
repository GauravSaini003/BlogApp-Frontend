import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../service/api';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupUser({
        username: name,   // <== map correctly
        email,
        password,
        role: 'user',     // <== add role if backend expects it
      });
      alert('Signup successful! Please login.');
      navigate('/login');  // <== works as you wanted
    } catch (err) {
      console.error(err);
      alert('Signup failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded w-96">
        <h2 className="text-2xl mb-6 text-center">Signup</h2>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 mb-4 border"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
