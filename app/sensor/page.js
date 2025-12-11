"use client";

import { useState } from "react";
import { 
    FaDroplet, 
    FaDropletSlash, 
    FaTemperatureLow, 
    FaTemperatureHigh, 
    FaWind, 
    FaSun, 
    FaRotate 
} from "react-icons/fa6";

export default function SensorPage() {
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Simulasi fungsi refresh
    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 1000);
    };

    // Data Sensor (Array Object) agar mudah dikelola
    const sensorData = [
        {
            id: 1,
            title: "Kelembaban Tanah A",
            status: "ONLINE",
            value: 72,
            unit: "%",
            label: "Basah",
            color: "#16a39b", // Teal
            icon: <FaDroplet />,
            iconColor: "text-[#16a39b]",
            footerLeft: "Blok: Utara 1",
            footerRight: "Kalibrasi",
            type: "moisture"
        },
        {
            id: 2,
            title: "Kelembaban Tanah B",
            status: "ONLINE",
            value: 45,
            unit: "%",
            label: "Agak Kering",
            color: "#fb923c", // Orange
            icon: <FaDropletSlash />,
            iconColor: "text-orange-400",
            footerLeft: "Blok: Selatan 2",
            footerRight: "Kalibrasi",
            type: "moisture"
        },
        {
            id: 3,
            title: "Suhu Tanah A",
            status: "ONLINE",
            value: 25,
            unit: "°C",
            label: "Sejuk",
            color: "#3b82f6", // Blue
            icon: <FaTemperatureLow />,
            iconColor: "text-blue-500",
            footerLeft: "DS18B20 - Probe 1",
            footerRight: "Stabil",
            type: "temp"
        },
        {
            id: 4,
            title: "Suhu Tanah B",
            status: "ONLINE",
            value: 28,
            unit: "°C",
            label: "Normal",
            color: "#3b82f6", // Blue
            icon: <FaTemperatureHigh />,
            iconColor: "text-blue-500",
            footerLeft: "DS18B20 - Probe 2",
            footerRight: "Naik +1°C",
            type: "temp"
        },
        {
            id: 5,
            title: "DHT22 (Udara)",
            status: "ONLINE",
            value: 32,
            unit: "°C",
            label: "RH: 60%",
            color: "#a855f7", // Purple
            icon: <FaWind />,
            iconColor: "text-purple-500",
            footerLeft: "Suhu: 32.4°C",
            footerRight: "Lembab: 60%",
            type: "dual" // Tipe khusus untuk layout footer beda
        },
        {
            id: 6,
            title: "Sensor Cahaya",
            status: "ONLINE",
            value: 3250,
            unit: "Lux",
            label: "Cerah",
            color: "#eab308", // Yellow
            icon: <FaSun />,
            iconColor: "text-yellow-500",
            footerLeft: "BH1750 Digital",
            footerRight: "Intensitas Tinggi",
            type: "light"
        }
    ];

    return (
        <div className="p-6 lg:p-10 text-gray-700 h-full">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Monitoring Sensor</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                        <p className="text-sm text-gray-500 font-medium">Real-time Data Update (5s)</p>
                    </div>
                </div>
                <button 
                    onClick={handleRefresh}
                    className="bg-white px-5 py-2.5 rounded-xl shadow-sm border border-gray-100 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition flex items-center gap-2"
                >
                    <FaRotate className={`text-[#16a39b] ${isRefreshing ? 'animate-spin' : ''}`} /> 
                    Refresh
                </button>
            </div>

            {/* GRID SENSOR */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                {sensorData.map((sensor) => (
                    <SensorCard key={sensor.id} data={sensor} />
                ))}
            </div>

            {/* Footer */}
            <div className="mt-8 text-center text-xs text-gray-400 pb-4">
                &copy; 2025 Takiro Sync Dashboard. System v2.0
            </div>

        </div>
    );
}

// === KOMPONEN REUSABLE UNTUK KARTU SENSOR ===
function SensorCard({ data }) {
    // Membuat style gradient dinamis berdasarkan prop warna dan nilai
    // Nilai maks chart biasanya 100, kecuali Lux yang ribuan (kita skala-kan visualnya)
    let visualPercent = data.value;
    if(data.unit === "Lux") visualPercent = (data.value / 4000) * 100; // Skala lux max 4000
    if(visualPercent > 100) visualPercent = 100;

    const gradientStyle = {
        background: `conic-gradient(${data.color} ${visualPercent}%, #e2e8f0 0)`
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-gray-300 transition duration-300 relative overflow-hidden group">
            
            {/* Watermark Icon */}
            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition text-6xl ${data.iconColor}`}>
                {data.icon}
            </div>
            
            {/* Card Header */}
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-700">{data.title}</h3>
                <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded-md">{data.status}</span>
            </div>

            {/* Circular Gauge (CSS Custom Implementation) */}
            <div className="relative w-[140px] h-[140px] rounded-full flex items-center justify-center mx-auto transition-transform duration-500 group-hover:scale-105" style={gradientStyle}>
                {/* Inner White Circle */}
                <div className="absolute w-[110px] h-[110px] bg-white rounded-full"></div>
                
                {/* Content inside Gauge */}
                <div className="relative z-10 text-center flex flex-col justify-center">
                    <span className="text-3xl font-bold text-gray-800">
                        {data.value}
                        <span className="text-sm font-normal ml-0.5">{data.unit}</span>
                    </span>
                    <span className="text-xs font-medium mt-1" style={{ color: data.color }}>
                        {data.label}
                    </span>
                </div>
            </div>

            {/* Footer Detail */}
            {data.type === 'dual' ? (
                // Footer Khusus DHT22 (2 Kolom)
                <div className="mt-6 grid grid-cols-2 gap-2 text-center text-xs border-t pt-4 border-gray-100">
                    <div>
                        <span className="block text-gray-400">Suhu Udara</span>
                        <span className="font-bold text-gray-700">{data.footerLeft.split(': ')[1]}</span>
                    </div>
                    <div className="border-l border-gray-100">
                        <span className="block text-gray-400">Lembab Udara</span>
                        <span className="font-bold text-gray-700">{data.footerRight.split(': ')[1]}</span>
                    </div>
                </div>
            ) : (
                // Footer Standard
                <div className="mt-6 flex justify-between items-center text-xs">
                    <div className="text-gray-400">
                        {data.type === 'moisture' ? 'Blok: ' : ''} 
                        <span className="text-gray-600 font-semibold">{data.footerLeft.replace('Blok: ', '')}</span>
                    </div>
                    {data.footerRight === 'Kalibrasi' ? (
                        <button className="text-[#16a39b] hover:underline font-medium">Kalibrasi</button>
                    ) : (
                        <div className="text-gray-600 font-semibold">{data.footerRight}</div>
                    )}
                </div>
            )}
        </div>
    );
}