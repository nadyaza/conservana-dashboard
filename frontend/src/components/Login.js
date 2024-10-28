// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Untuk melakukan navigasi setelah login
import '../styles/Login.css';  // Mengimpor file CSS untuk styling

const Login = () => {
  const [username, setUsername] = useState('');  // State untuk menyimpan username
  const [password, setPassword] = useState('');  // State untuk menyimpan password
  const navigate = useNavigate();  // Hook untuk navigasi halaman

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi login dengan username dan password yang benar
    if (username === 'admin' && password === 'admin123') {
      navigate('/dashboard');  // Redirect ke halaman dashboard
    } else {
      alert('Invalid credentials!');  // Pesan kesalahan jika username atau password salah
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}  // Mengubah nilai username
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}  // Mengubah nilai password
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
