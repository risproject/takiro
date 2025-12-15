"use client";

import { useState, useEffect } from "react";
import { db } from "../lib/firebase"; 
import { ref, onValue } from "firebase/database";
import { getStatusLabel, getStatusColor } from "./levelLogic";
import { FaTemperatureHalf, FaFlask } from "react-icons/fa6"; 
import { FaHandHoldingWater } from "react-icons/fa";
import { RiSunLine } from "react-icons/ri";

// --- PENGATURAN WARNA ---
// Ganti kode ini dengan warna hijau sidebar websitemu
// Contoh Teal: "#0f766e" atau "#0d9488"
const WARNA_WEBSITE = "#0d9488"; 

const sensorConfig = [
  {
    dbKey: "suhu", 
    parameter: "Suhu Udara",
    subjudul: "Sensor DHT",
    satuan: "°C",
    min: 20, 
    max: 32, 
  },
  {
    dbKey: "kelembaban", 
    parameter: "Kelembaban Udara",
    subjudul: "Sensor DHT",
    satuan: "%",
    min: 50,
    max: 90,
  },
  {
    dbKey: "cahaya", 
    parameter: "Intensitas Cahaya",
    subjudul: "Sensor LDR/Lux",
    satuan: "Lx",
    min: 100, 
    max: 2000,
  },
  {
    dbKey: "suhuTanah", 
    parameter: "Suhu Tanah",
    subjudul: "Sensor DS18B20",
    satuan: "°C",
    min: 18,
    max: 30,
  },
  {
    dbKey: "ph", 
    parameter: "pH Tanah",
    subjudul: "Sensor pH",
    satuan: "pH",
    min: 6.0, 
    max: 7.5,
  },
];

export default function Kartu() {
  const [sensorData, setSensorData] = useState({});

  useEffect(() => {
    const sensorRef = ref(db, "/");
    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSensorData(data);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      {sensorConfig.map((config, i) => {
        const nilaiAsli = sensorData[config.dbKey] || 0;
        
        let levelHitungan = 2; 
        if (nilaiAsli < config.min) levelHitungan = 1; 
        if (nilaiAsli > config.max) levelHitungan = 3; 

        return (
          <KartuItem
            key={i}
            {...config}
            nilai={nilaiAsli}
            level={levelHitungan}
          />
        );
      })}
    </>
  );
}

function KartuItem({ parameter, subjudul, nilai, satuan, level, min, max }) {
  const statusLabel = getStatusLabel(level);
  
  // 1. Ambil warna default dari logic level (merah/kuning/hijau)
  let ringColor = getStatusColor(level);

  const p = parameter.toLowerCase();
  const isCahaya = p.includes("cahaya") || p.includes("light");

  // 2. OVERRIDE WARNA (LOGIKA BARU)
  // Jika BUKAN cahaya, kita paksa warnanya jadi Hijau Website
  if (!isCahaya) {
      // Jika statusnya Normal (2) atau Waspada (1), pakai hijau website biar seragam
      // Tapi jika Bahaya (3), tetap biarkan Merah (dari ringColor awal) supaya user sadar ada masalah
      if (level !== 3) {
          ringColor = WARNA_WEBSITE;
      }
      
      // CATATAN: Kalau kamu mau SEMUANYA hijau (meskipun bahaya), hapus "if" di atas
      // dan langsung tulis: ringColor = WARNA_WEBSITE;
  }

  let Icon = null;
  if (p.includes("suhu") || p.includes("temperature")) Icon = FaTemperatureHalf;
  else if (p.includes("kelembaban") || p.includes("humidity")) Icon = FaHandHoldingWater;
  else if (p.includes("cahaya") || p.includes("light")) Icon = RiSunLine;
  else if (p.includes("ph")) Icon = FaFlask; 

  const cardBgClass = {
    1: "bg-amber-50",
    2: "bg-teal-50",
    3: "bg-red-50",
  }[level];

  let ringBackground;

  if (isCahaya) {
    if (level === 2) {
      const rangePercent = Math.min(Math.max(((nilai - min) / (max - min)) * 100, 0), 100);
      const angle = rangePercent * 3.6;
      ringBackground = `conic-gradient(${ringColor} 0deg ${angle}deg, white ${angle}deg 360deg)`;
    } else {
      ringBackground = ringColor;
    }
  } else {
    let percent = ((nilai - 0) / (100 - 0)) * 100; 
    
    if (p.includes("suhu")) percent = (nilai / 50) * 100; 
    else if (p.includes("ph")) percent = (nilai / 14) * 100; 

    percent = Math.min(Math.max(percent, 0), 100);
    const angle = percent * 3.6;
    ringBackground = `conic-gradient(${ringColor} 0deg ${angle}deg, white ${angle}deg 360deg)`;
  }

  const innerBgClass = {
    1: "bg-amber-100",
    2: "bg-teal-100",
    3: "bg-red-100",
  }[level];

  return (
    <div
      className={`relative border-2 rounded-2xl shadow-md p-4 flex flex-col items-center select-none overflow-hidden ${cardBgClass}`}
      style={{ borderColor: ringColor }}
    >
      {Icon && (
        <Icon
          className="absolute opacity-15 pointer-events-none"
          size={140}
          style={{ bottom: -10, left: -10 }}
          color={ringColor}
        />
      )}

      <div className="text-center mb-3 z-10">
        <div className="font-semibold">{parameter}</div>
        <div className="text-xs opacity-80">{subjudul}</div>
      </div>

      <div
        className="relative w-27 h-27 rounded-full flex items-center justify-center z-10"
        style={{ background: ringBackground }}
      >
        <div
          className={`absolute w-24 h-24 rounded-full flex flex-col items-center justify-center ${innerBgClass}`}
        >
          <div className="text-xl font-semibold">
            {nilai}
            {satuan}
          </div>
          <div className="text-sm opacity-90">{statusLabel}</div>
        </div>
      </div>

      <div className="mt-4 flex justify-between w-full px-3 text-[11px] opacity-80 z-10">
        <div className="text-center">
          <div className="text-sm font-semibold">{min}{satuan}</div> Min
        </div>
        <div className="text-center">
          <div className="text-sm font-semibold">{max}{satuan}</div> Max
        </div>
      </div>
    </div>
  );
}