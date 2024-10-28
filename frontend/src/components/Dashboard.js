import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary components for charts
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/sheets/data');
        console.log('Respons lengkap dari backend:', response);
        console.log('Data yang diterima:', response.data.values);

        if (response.data && Array.isArray(response.data.values) && response.data.values.length > 1) {
          setData(response.data.values);
        } else {
          setError('Data tidak valid atau kosong');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Gagal mengambil data dari backend');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // If loading or error occurs
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Assuming the data structure is an array and skipping the first row (header)
  const usiaCount = {};
  const jenisKelaminCount = {};
  const lokasiCount = {};
  const pendidikanCount = {};
  const profesiCount = {};
  const lamaUsahaCount = {};
  const penghasilanCount = {};
  const menabungCount = { 'Ya': 0, 'Tidak': 0 };
  const pinjamanCount = { 'Ya': 0, 'Tidak': 0 };

  // Parsing data from each row and counting occurrences
  data.slice(1).forEach(row => {
    const usia = row[3]; // Kolom Usia
    const jenisKelamin = row[4]; // Kolom Jenis Kelamin
    const lokasi = row[5]; // Kolom Lokasi
    const pendidikan = row[6]; // Kolom Tingkat Pendidikan
    const profesi = row[7]; // Kolom Profesi Utama
    const lamaUsaha = row[8]; // Kolom Lama Berprofesi/Usaha
    const penghasilan = row[20]; // Kolom Penghasilan Bulanan Rata-rata
    const menabung = row[21]; // Kolom Menabung
    const pinjaman = row[22]; // Kolom Pinjaman

    // Hitung distribusi usia
    usiaCount[usia] = (usiaCount[usia] || 0) + 1;

    // Hitung distribusi jenis kelamin
    jenisKelaminCount[jenisKelamin] = (jenisKelaminCount[jenisKelamin] || 0) + 1;

    // Hitung distribusi lokasi
    lokasiCount[lokasi] = (lokasiCount[lokasi] || 0) + 1;

    // Hitung distribusi tingkat pendidikan
    pendidikanCount[pendidikan] = (pendidikanCount[pendidikan] || 0) + 1;

    // Hitung distribusi profesi utama
    profesiCount[profesi] = (profesiCount[profesi] || 0) + 1;

    // Hitung distribusi lama usaha
    lamaUsahaCount[lamaUsaha] = (lamaUsahaCount[lamaUsaha] || 0) + 1;

    // Hitung distribusi penghasilan bulanan
    penghasilanCount[penghasilan] = (penghasilanCount[penghasilan] || 0) + 1;

    // Hitung distribusi menabung
    menabungCount[menabung] += 1;

    // Hitung distribusi pinjaman
    pinjamanCount[pinjaman] += 1;
  });

  // Menghitung jumlah total responden (mengurangi header)
  const totalResponden = data.length - 1;

  // Data for the charts
  const usiaChartData = {
    labels: Object.keys(usiaCount),
    datasets: [{
      label: 'Jumlah Responden Berdasarkan Usia',
      data: Object.values(usiaCount),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }],
  };

  const jenisKelaminChartData = {
    labels: Object.keys(jenisKelaminCount),
    datasets: [{
      label: 'Jumlah Responden Berdasarkan Jenis Kelamin',
      data: Object.values(jenisKelaminCount),
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
    }],
  };

  const lokasiChartData = {
    labels: Object.keys(lokasiCount),
    datasets: [{
      label: 'Jumlah Responden Berdasarkan Lokasi',
      data: Object.values(lokasiCount),
      backgroundColor: 'rgba(255, 159, 64, 0.6)',
    }],
  };

  const pendidikanChartData = {
    labels: Object.keys(pendidikanCount),
    datasets: [{
      label: 'Jumlah Responden Berdasarkan Tingkat Pendidikan',
      data: Object.values(pendidikanCount),
      backgroundColor: 'rgba(255, 206, 86, 0.6)',
    }],
  };

  const profesiChartData = {
    labels: Object.keys(profesiCount),
    datasets: [{
      label: 'Jumlah Responden Berdasarkan Profesi Utama',
      data: Object.values(profesiCount),
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
    }],
  };

  const lamaUsahaChartData = {
    labels: Object.keys(lamaUsahaCount),
    datasets: [{
      label: 'Jumlah Responden Berdasarkan Lama Berprofesi/Usaha',
      data: Object.values(lamaUsahaCount),
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
    }],
  };

  const penghasilanChartData = {
    labels: Object.keys(penghasilanCount),
    datasets: [{
      label: 'Jumlah Responden Berdasarkan Penghasilan Bulanan',
      data: Object.values(penghasilanCount),
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
    }],
  };

  const menabungChartData = {
    labels: Object.keys(menabungCount),
    datasets: [{
      label: 'Jumlah Responden yang Menabung',
      data: Object.values(menabungCount),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }],
  };

  const pinjamanChartData = {
    labels: Object.keys(pinjamanCount),
    datasets: [{
      label: 'Jumlah Responden yang Pernah Mengambil Pinjaman',
      data: Object.values(pinjamanCount),
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
    }],
  };

  return (
    <div className="dashboard-container">
      <h2>Total Responden: {totalResponden}</h2>

      <h2>Distribusi Usia Responden</h2>
      <div className="chart-container">
        <Bar data={usiaChartData} />
      </div>

      <h2>Distribusi Jenis Kelamin Responden</h2>
      <div className="chart-container">
        <Bar data={jenisKelaminChartData} />
      </div>

      <h2>Distribusi Lokasi Responden</h2>
      <div className="chart-container">
        <Bar data={lokasiChartData} />
      </div>

      <h2>Distribusi Tingkat Pendidikan Responden</h2>
      <div className="chart-container">
        <Bar data={pendidikanChartData} />
      </div>

      <h2>Distribusi Profesi Utama Responden</h2>
      <div className="chart-container">
        <Bar data={profesiChartData} />
      </div>

      <h2>Distribusi Lama Berprofesi/Usaha</h2>
      <div className="chart-container">
        <Bar data={lamaUsahaChartData} />
      </div>

      <h2>Distribusi Penghasilan Bulanan</h2>
      <div className="chart-container">
        <Bar data={penghasilanChartData} />
      </div>

      <h2>Responden yang Menabung</h2>
      <div className="chart-container">
        <Bar data={menabungChartData} />
      </div>

      <h2>Responden yang Pernah Mengambil Pinjaman</h2>
      <div className="chart-container">
        <Bar data={pinjamanChartData} />
      </div>
    </div>
  );
};

export default Dashboard;
