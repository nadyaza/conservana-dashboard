const express = require('express');
const { google } = require('googleapis');
const keys = require('../credentials.json');
const router = express.Router();

// Buat client JWT menggunakan kunci Service Account
const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);

// ID spreadsheet dan rentang yang digunakan
const spreadsheetId = '11sE6UAGHoMlel_9iGu7TDIL8sIFqDiVJ3XBkgNHGfic';
const range = 'Form responses 1!A1:AN11';

// Route untuk mengambil data dari Google Sheets
router.get('/data', async (req, res) => {
    try {
        await client.authorize();
        const sheets = google.sheets({ version: 'v4', auth: client });

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        res.status(200).json({ data: response.data.values });
    } catch (error) {
        console.error('Error accessing spreadsheet:', error);
        res.status(500).json({ error: 'Error accessing spreadsheet' });
    }
});

// Route untuk menambahkan data ke Google Sheets
router.post('/data', async (req, res) => {
    try {
        await client.authorize();
        const sheets = google.sheets({ version: 'v4', auth: client });

        const { values } = req.body; // Data yang akan ditambahkan, pastikan ini array sesuai dengan kolom
        const resource = {
            values: [values],
        };

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: 'RAW',
            resource,
        });

        res.status(201).json({ message: 'Data added successfully' });
    } catch (error) {
        console.error('Error adding data to spreadsheet:', error);
        res.status(500).json({ error: 'Error adding data to spreadsheet' });
    }
});

module.exports = router;
