const express = require('express');
const cors = require('cors'); // Tambahkan ini
const { google } = require('googleapis');
const keys = require('./credentials.json'); // File credentials Google API, pastikan sudah benar

const app = express();
const PORT = 5000; // Backend berjalan di port 5000

app.use(cors()); // Gunakan middleware ini untuk mengizinkan permintaan dari origin yang berbeda

// Inisialisasi client JWT untuk Google API
const client = new google.auth.JWT(
  keys.client_email,
  null,
  keys.private_key,
  ['https://www.googleapis.com/auth/spreadsheets.readonly'] // Pastikan Anda memiliki izin yang sesuai
);

// ID dan rentang dari spreadsheet
const spreadsheetId = '11sE6UAGHoMlel_9iGu7TDIL8sIFqDiVJ3XBkgNHGfic'; // Ganti dengan ID spreadsheet Anda
const range = 'Form responses 1!A1:AN11'; // Rentang data yang digunakan

// Route untuk mengambil data dari Google Sheets
app.get('/sheets/data', async (req, res) => {
  try {
    await client.authorize();
    const sheets = google.sheets({ version: 'v4', auth: client });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    res.json(response.data); // Kirim data sebagai response dalam format JSON
  } catch (error) {
    console.error('Error accessing Google Sheets:', error);
    res.status(500).json({ error: 'Error accessing Google Sheets' });
  }
});

// Route default untuk root
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
