"use client";

import { useState, useEffect } from "react";
// Pastikan path ini sesuai (mundur 2 folder)
import { db } from "../../lib/firebase"; 
import { ref, onValue } from "firebase/database";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from "recharts";
// PERBAIKAN IMPORT IKON DI SINI
import { 
  FaTemperatureHalf, FaDroplet, FaFlask, FaJugDetergent, 
  FaCircleCheck, FaTriangleExclamation, FaLeaf, FaClock, FaSeedling 
} from "react-icons/fa6";

export default function Statistik() {
  const [sensorData, setSensorData] = useState({
    suhu: 0, kelembaban: 0, ph: 0, suhuTanah: 0
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // 1. Ambil Data Realtime
    const sensorRef = ref(db, "/");
    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSensorData(data);
        updateChart(data.kelembaban || 60); 
      }
    });

    // 2. Generate Data Awal Grafik
    const initialData = Array.from({ length: 12 }, (_, i) => ({
      time: `${i * 2}:00`, 
      value: 60 + Math.floor(Math.random() * 15) - 5 
    }));
    setChartData(initialData);

    return () => unsubscribe();
  }, []);

  const updateChart = (realValue) => {
    setChartData(prev => {
        const newData = [...prev];
        newData.shift(); 
        const now = new Date();
        const timeLabel = `${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`;
        newData.push({ time: timeLabel, value: realValue });
        return newData;
    });
  };

  // DATA DUMMY LOG (Menggunakan ikon baru FaCircleCheck & FaTriangleExclamation)
  const logs = [
    { time: "10:45", event: "Pompa Air Menyala Otomatis", type: "success" },
    { time: "09:30", event: "Suhu Udara Meningkat (>32°C)", type: "warning" },
    { time: "08:00", event: "Penyiraman Pagi Selesai", type: "success" },
    { time: "06:00", event: "Sistem Online & Terhubung", type: "info" },
  ];

  return (
    <div className="p-6 text-slate-800 min-h-screen pb-20">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
            <h1 className="text-2xl font-bold text-slate-800">Statistik Tanaman</h1>
            <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-semibold">Online</span>
                <span>• Plant-01, Purworejo • Cabai Rawit Merah</span>
            </div>
        </div>
        <button className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:bg-slate-50 transition-colors">
            📅 7 Hari Terakhir
        </button>
      </div>

      {/* --- BAGIAN KARTU RINGKASAN --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
            title="RATA-RATA KELEMBABAN"
            value={`${sensorData.kelembaban || 0}%`}
            status="Stabil (Normal)"
            statusColor="text-emerald-600"
            icon={<FaDroplet className="text-emerald-500" />}
            borderColor="border-emerald-200"
        />
        <StatCard 
            title="RATA-RATA SUHU"
            value={`${sensorData.suhu || 0}°C`}
            status={sensorData.suhu > 30 ? "Sedikit Panas" : "Normal"}
            statusColor={sensorData.suhu > 30 ? "text-amber-600" : "text-emerald-600"}
            icon={<FaTemperatureHalf className="text-amber-500" />}
            borderColor="border-amber-200"
        />
        <StatCard 
            title="PH TANAH"
            value={sensorData.ph || 7}
            status="Kondisi Netral"
            statusColor="text-slate-500"
            icon={<FaFlask className="text-purple-500" />}
            borderColor="border-purple-200"
        />
        <StatCard 
            title="FREKUENSI SIRAM"
            value="3x"
            status="Hari ini (Total 1.5 Liter)"
            statusColor="text-blue-600"
            icon={<FaJugDetergent className="text-blue-500" />}
            borderColor="border-blue-200"
        />
      </div>

      {/* --- LAYOUT UTAMA --- */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* KOLOM KIRI: GRAFIK & LOG */}
        <div className="xl:col-span-2 flex flex-col gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-lg font-bold">Tren Kelembaban Tanah</h2>
                        <p className="text-xs text-slate-400">Update Realtime setiap detik</p>
                    </div>
                    <button className="text-xs bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded text-slate-600 transition">
                        Lihat Detail
                    </button>
                </div>
                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10}/>
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}/>
                            <Area type="monotone" dataKey="value" stroke="#0d9488" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* LOG AKTIVITAS (Timeline) */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <FaClock className="text-slate-400" /> Log Aktivitas Sistem
                </h2>
                <div className="space-y-4">
                    {logs.map((log, i) => (
                        <div key={i} className="flex gap-4 items-start relative">
                            {/* Garis Timeline */}
                            {i !== logs.length - 1 && (
                                <div className="absolute left-[11px] top-6 bottom-[-20px] w-0.5 bg-slate-100"></div>
                            )}
                            
                            {/* Ikon Status dengan Nama Baru */}
                            <div className={`z-10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 
                                ${log.type === 'success' ? 'bg-green-100 text-green-600' : 
                                  log.type === 'warning' ? 'bg-amber-100 text-amber-600' : 
                                  'bg-blue-100 text-blue-600'}`}>
                                {log.type === 'success' ? <FaCircleCheck size={12}/> : 
                                 log.type === 'warning' ? <FaTriangleExclamation size={12}/> : 
                                 <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                            </div>
                            
                            <div className="flex-1 pb-1">
                                <p className="text-sm font-medium text-slate-700">{log.event}</p>
                                <p className="text-xs text-slate-400">{log.time} WIB</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* KOLOM KANAN: INFO BUDIDAYA */}
        <div className="xl:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden sticky top-6">
                
                <div className="h-32 bg-gradient-to-r from-emerald-500 to-teal-600 relative p-6 flex flex-col justify-end">
                    <FaSeedling className="text-white opacity-20 absolute top-4 right-4" size={80} />
                    <h2 className="text-white font-bold text-xl relative z-10">Info Budidaya</h2>
                    <p className="text-emerald-100 text-sm relative z-10">Cabai Rawit Merah</p>
                </div>

                <div className="p-6">
                    {/* Status Fase Tanam */}
                    <div className="mb-6">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-500">Fase Tanam</span>
                            <span className="font-bold text-emerald-600">Generatif (Bunga)</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2.5">
                            <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-slate-400 mt-1">
                            <span>Hari ke-1</span>
                            <span>Hari ke-45</span>
                            <span>Panen (H-90)</span>
                        </div>
                    </div>

                    <hr className="border-slate-100 my-4" />

                    {/* Tips Harian */}
                    <div className="flex gap-3 items-start">
                        <div className="bg-amber-50 p-2 rounded-lg text-amber-500 shrink-0">
                            <FaLeaf />
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm text-slate-700">Tips Hari Ini</h3>
                            <p className="text-xs text-slate-500 leading-relaxed mt-1">
                                Kelembaban tanah saat ini cukup ideal. Pastikan pH tanah tetap di angka 6.0 - 7.0 agar penyerapan nutrisi maksimal saat fase berbunga.
                            </p>
                        </div>
                    </div>

                    <hr className="border-slate-100 my-4" />

                    {/* Estimasi Panen */}
                    <div className="bg-slate-50 rounded-lg p-4 text-center border border-slate-100">
                        <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Estimasi Panen</p>
                        <p className="text-2xl font-bold text-slate-700">14 Februari 2026</p>
                        <p className="text-xs text-emerald-600 font-medium mt-1">± 45 Hari Lagi</p>
                    </div>

                    <button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-sm font-medium transition">
                        Lihat Panduan Lengkap
                    </button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, status, statusColor, icon, borderColor }) {
    return (
        <div className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${borderColor}`}>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{title}</h3>
                    <div className="text-3xl font-bold text-slate-800 mb-2">{value}</div>
                    <p className={`text-xs font-medium ${statusColor}`}>
                        {status}
                    </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-full">
                    {icon}
                </div>
            </div>
        </div>
    );
}