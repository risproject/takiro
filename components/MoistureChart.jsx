"use client";

import { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

export default function MoistureChart() {
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState({
        datasets: [],
    });

    useEffect(() => {
        const chart = chartRef.current;

        if (!chart) {
            return;
        }

        const chartData = {
            labels: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
            datasets: [
                {
                    label: 'Kelembaban Tanah (%)',
                    data: [65, 63, 60, 55, 40, 35, 70, 68],
                    borderColor: '#2A9D8F',
                    backgroundColor: (context) => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                        gradient.addColorStop(0, 'rgba(42, 157, 143, 0.5)');
                        gradient.addColorStop(1, 'rgba(42, 157, 143, 0)');
                        return gradient;
                    },
                    borderWidth: 2,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#2A9D8F',
                    pointRadius: 4,
                    tension: 0.4,
                    fill: true,
                },
            ],
        };

        setChartData(chartData);
    }, []);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#264653',
                titleColor: '#fff',
                bodyColor: '#fff',
                displayColors: false,
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                grid: { borderDash: [2, 4], color: '#e5e7eb' },
                ticks: { font: { size: 10 } }
            },
            x: {
                grid: { display: false },
                ticks: { font: { size: 10 } }
            }
        }
    };

    return <Line ref={chartRef} data={chartData} options={options} />;
}