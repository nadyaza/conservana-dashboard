const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const users = [
  {
    username: 'admin',
    passwordHash: '$2a$10$K1W7Qn6bEyyG9.tEJmJ6xuViA2zXe1gNf9n8MwWEZjVBBkNcE02G6' // Hash dari 'admin123'
  }
];

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(400).json({ message: 'Invalid username' });
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);

  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  // Kirim respons dengan data user
  res.status(200).json({ message: 'Login successful', user: { username } });
});

module.exports = router;
