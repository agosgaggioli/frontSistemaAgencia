import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement,
  Title, Tooltip, Legend
} from 'chart.js';

import styles from './grafico.module.css';
const API = import.meta.env.VITE_API_URL;

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function GraficoVehiculosPeritados() {
  const [dataSet, setDataSet] = useState({
    labels: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
    series: Array(12).fill(0),
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    axios.get(`${API}/peritaje/stats/vehiculos-peritados`)
      .then(({ data }) => setDataSet(data))
      .catch(() => {}); // deja ceros si falla
  }, []);

  const data = {
    labels: dataSet.labels,
    datasets: [
      {
        label: `Vehículos peritados ${dataSet.year}`,
        data: dataSet.series,
        backgroundColor: '#4F6EDB',      // azul pastel
        borderRadius: 6,
        barPercentage: 0.7,
        categoryPercentage: 0.6,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },        // sin leyenda
      title: { display: true, text: 'Vehículos peritados', font: { size: 28 } }
    },
    scales: {
      x: { grid: { display: false } , ticks: { font: { size: 20 } }  },
      y: { beginAtZero: true, ticks: { stepSize: 20 , font: { size: 20 } } }
    }
  };

  return <div className={styles.chartWrap}>
    <Bar data={data} options={options} />
  </div>;
}