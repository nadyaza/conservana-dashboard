import React, { useState, useEffect } from 'react';

function User() {
  const [user, setUser] = useState(null);

  // Simulasi mengambil data pengguna dari API atau localStorage
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    } else {
      window.location.href = '/'; // Redirect ke halaman login jika user tidak ada di localStorage
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('user'); // Menghapus data user dari localStorage
    setUser(null); // Menghapus data user dari state
    window.location.href = '/'; // Redirect ke halaman login
  };

  if (!user) {
    return <p>Loading...</p>; // Tampilkan loading
  }

  return (
    <div>
      <h2>Welcome, {user.username}</h2>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default User;
