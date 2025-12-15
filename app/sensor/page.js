"use client";

import { useState, useEffect } from "react";
// Pastikan path ini benar (mundur 2 folder)
import { db } from "../../lib/firebase"; 
import { ref, onValue } from "firebase/database";
import { FaRotateRight } from "react-icons/fa6";

export default function SensorPage() {
  // 1. State Data Sensor
  const [data, setData] = useState({
    kelembabanA: 0, kelembabanB: 0,
    suhuTanahA: 0, suhuTanahB: 0,
    suhuUdara: 0, kelembabanUdara: 0,
    cahaya: 0
  });

  // 2. State untuk animasi refresh manual
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 3. Ambil Data Realtime
  useEffect(() => {
    const sensorRef = ref(db, "/");
    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const val = snapshot.val();
      if (val) {
        // Mapping data dari Firebase ke State (Sesuaikan key firebase kamu)
        setData({
          kelembabanA: val.kelembaban || 72, // Jika sensor cuma 1, kita pakai data sama dulu
          kelembabanB: val.kelembaban ? val.kelembaban - 15 : 45, // Simulasi beda dikit
          suhuTanahA: val.suhuTanah || 25,
          suhuTanahB: val.suhuTanah ? val.suhuTanah + 3 : 28,
          suhuUdara: val.suhu || 32,
          kelembabanUdara: val.kelembaban || 60,
          cahaya: val.cahaya || 3250
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="p-6 text-slate-800 min-h-screen pb-20 bg-slate-50/50">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Monitoring Sensor</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <p className="text-slate-500 text-sm">Real-time Data Update (5s)</p>
          </div>
        </div>
        
        <button 
          onClick={handleRefresh}
          className="bg-white hover:bg-slate-50 text-slate-600 px-4 py-2 rounded-lg border border-slate-200 shadow-sm text-sm font-medium flex items-center gap-2 transition"
        >
          <FaRotateRight className={isRefreshing ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* GRID SENSOR */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* 1. KELEMBABAN TANAH A */}
        <SensorCard 
            title="Kelembaban Tanah A"
            value={data.kelembabanA}
            unit="%"
            max={100}
            status={data.kelembabanA > 70 ? "Basah" : "Kering"}
            color="emerald" // Warna Hijau/Teal
            footerLeft="Blok: Utara 1"
            footerRight="Kalibrasi"
            isButton={true}
        />

        {/* 2. KELEMBABAN TANAH B */}
        <SensorCard 
            title="Kelembaban Tanah B"
            value={data.kelembabanB}
            unit="%"
            max={100}
            status={data.kelembabanB < 50 ? "Agak Kering" : "Lembab"}
            color="orange" // Warna Oranye
            footerLeft="Blok: Selatan 2"
            footerRight="Kalibrasi"
            isButton={true}
        />

        {/* 3. SUHU TANAH A */}
        <SensorCard 
            title="Suhu Tanah A"
            value={data.suhuTanahA}
            unit="°C"
            max={50}
            status="Sejuk"
            color="blue" // Warna Biru
            footerLeft="DS18B20 - Probe 1"
            footerRight="Stabil"
        />

        {/* 4. SUHU TANAH B */}
        <SensorCard 
            title="Suhu Tanah B"
            value={data.suhuTanahB}
            unit="°C"
            max={50}
            status="Normal"
            color="indigo" // Warna Biru Tua/Indigo
            footerLeft="DS18B20 - Probe 2"
            footerRight="Naik +1°C"
        />

        {/* 5. DHT22 (UDARA) - Spesial ada subtext RH */}
        <SensorCard 
            title="DHT22 (Udara)"
            value={data.suhuUdara}
            unit="°C"
            max={50}
            status={`RH: ${data.kelembabanUdara}%`}
            color="purple" // Warna Ungu
            footerLeft="Suhu Udara"
            footerRight="Lembab Udara"
        />

        {/* 6. SENSOR CAHAYA */}
        <SensorCard 
            title="Sensor Cahaya"
            value={data.cahaya}
            unit="Lx"
            max={5000} // Max lux
            status={data.cahaya > 3000 ? "Cerah" : "Redup"}
            color="yellow" // Warna Kuning
            footerLeft="BH1750 Digital"
            footerRight="Intensitas Tinggi"
        />

      </div>
    </div>
  );
}

// --- KOMPONEN KARTU SENSOR (REUSABLE) ---
function SensorCard({ title, value, unit, max, status, color, footerLeft, footerRight, isButton }) {
    
    // Konfigurasi Warna Tailwind
    const colors = {
        emerald: { stroke: "stroke-emerald-500", text: "text-emerald-600", bg: "bg-emerald-50", badge: "bg-emerald-100 text-emerald-700" },
        orange:  { stroke: "stroke-orange-400",  text: "text-orange-500",  bg: "bg-orange-50",  badge: "bg-orange-100 text-orange-700" },
        blue:    { stroke: "stroke-blue-500",    text: "text-blue-600",    bg: "bg-blue-50",    badge: "bg-blue-100 text-blue-700" },
        indigo:  { stroke: "stroke-indigo-500",  text: "text-indigo-600",  bg: "bg-indigo-50",  badge: "bg-indigo-100 text-indigo-700" },
        purple:  { stroke: "stroke-purple-500",  text: "text-purple-600",  bg: "bg-purple-50",  badge: "bg-purple-100 text-purple-700" },
        yellow:  { stroke: "stroke-amber-400",   text: "text-amber-500",   bg: "bg-amber-50",   badge: "bg-amber-100 text-amber-700" },
    };

    const c = colors[color] || colors.emerald;

    // Hitung Progress Lingkaran (SVG Logic)
    const radius = 55; // Jari-jari lingkaran
    const circumference = 2 * Math.PI * radius; // Keliling
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative">
            
            {/* Header Kartu */}
            <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-slate-700">{title}</h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${c.badge}`}>
                    ONLINE
                </span>
            </div>

            {/* Visualisasi Lingkaran (Donut Chart) */}
            <div className="relative flex justify-center items-center py-4">
                {/* Latar Belakang Lingkaran (Abu-abu tipis) */}
                <div className="absolute opacity-10 blur-xl w-32 h-32 rounded-full" style={{ backgroundColor: color }}></div>
                
                <div className="relative w-40 h-40">
                    <svg className="w-full h-full transform -rotate-90">
                        {/* Lingkaran Background */}
                        <circle
                            cx="80" cy="80" r={radius}
                            className="stroke-slate-100 fill-none"
                            strokeWidth="12"
                        />
                        {/* Lingkaran Progress */}
                        <circle
                            cx="80" cy="80" r={radius}
                            className={`${c.stroke} fill-none transition-all duration-1000 ease-out`}
                            strokeWidth="12"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                        />
                    </svg>
                    
                    {/* Teks di Tengah */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="flex items-baseline">
                            <span className="text-3xl font-bold text-slate-800">{value}</span>
                            <span className="text-sm font-medium text-slate-400 ml-0.5">{unit}</span>
                        </div>
                        <span className={`text-sm font-medium ${c.text} mt-1`}>{status}</span>
                    </div>
                </div>
            </div>

            {/* Footer Kartu */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-50 text-xs">
                <span className="text-slate-500 font-medium">{footerLeft}</span>
                
                {isButton ? (
                    <button className={`font-semibold ${c.text} hover:underline`}>
                        {footerRight}
                    </button>
                ) : (
                    <span className="text-slate-400 font-medium">{footerRight}</span>
                )}
            </div>
        </div>
    );
}