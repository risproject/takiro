"use client";

import { useState, useEffect } from "react";
// Pastikan path firebase benar (mundur 2 folder)
import { db } from "../../lib/firebase"; 
import { ref, onValue, update } from "firebase/database";
// PERBAIKAN: Mengganti FaSave menjadi FaFloppyDisk
import { 
  FaFloppyDisk, FaEye, FaEyeSlash, FaUser, FaPen 
} from "react-icons/fa6";

export default function Setelan() {
  // --- STATE DATA ---
  const [settings, setSettings] = useState({
    deviceId: "ESP32-PLANT-001",
    authToken: "takiro-secure-token-123",
    minKelembaban: 40,  // Batas slider (default 40%)
    durasiSiram: 120,   // Detik
    jedaSiram: 30,      // Menit
    alertTanah: false,  // Toggle Notifikasi 1
    alertSuhu: true     // Toggle Notifikasi 2
  });

  const [showToken, setShowToken] = useState(false); // Untuk tombol mata (hide/show)
  const [isSaving, setIsSaving] = useState(false);   // Efek loading tombol simpan

  // --- 1. AMBIL DATA DARI FIREBASE SAAT LOAD ---
  useEffect(() => {
    const configRef = ref(db, "/config");
    
    const unsubscribe = onValue(configRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSettings(prev => ({
          ...prev,
          ...data 
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  // --- 2. FUNGSI UPDATE STATE LOKAL ---
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // --- 3. FUNGSI SIMPAN KE FIREBASE (ACTION) ---
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const configRef = ref(db, "/config");
      await update(configRef, {
        deviceId: settings.deviceId,
        authToken: settings.authToken,
        minKelembaban: Number(settings.minKelembaban),
        durasiSiram: Number(settings.durasiSiram),
        jedaSiram: Number(settings.jedaSiram),
        alertTanah: settings.alertTanah,
        alertSuhu: settings.alertSuhu
      });
      
      setTimeout(() => {
        setIsSaving(false);
        alert("Pengaturan Berhasil Disimpan ke Perangkat IoT! ✅");
      }, 800);
      
    } catch (error) {
      console.error("Gagal simpan:", error);
      setIsSaving(false);
      alert("Gagal menyimpan pengaturan.");
    }
  };

  return (
    <div className="p-6 text-slate-800 min-h-screen pb-20 bg-slate-50/50">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Pengaturan Aplikasi</h1>
          <p className="text-slate-500 text-sm mt-1">Konfigurasi Alat IoT dan Parameter Tanaman</p>
        </div>
        
        {/* TOMBOL SIMPAN (Pojok Kanan Atas) */}
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium shadow-md transition-all
            ${isSaving ? "bg-emerald-400 cursor-wait" : "bg-emerald-600 hover:bg-emerald-700 active:scale-95"}`}
        >
          {/* PERBAIKAN: Menggunakan FaFloppyDisk disini */}
          <FaFloppyDisk /> {isSaving ? "Menyimpan..." : "Simpan"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- KOLOM KIRI (FORM UTAMA) --- */}
        <div className="lg:col-span-2 space-y-6">

          {/* 1. KARTU KONEKSI PERANGKAT */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              🔗 Koneksi Perangkat
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Device ID */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-2">Device ID</label>
                <input 
                  type="text" 
                  name="deviceId"
                  value={settings.deviceId}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                  placeholder="Contoh: ESP32-PLANT-001"
                />
              </div>

              {/* Auth Token (Password Style) */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-2">Auth Token</label>
                <div className="relative">
                  <input 
                    type={showToken ? "text" : "password"} 
                    name="authToken"
                    value={settings.authToken}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition pr-10"
                  />
                  <button 
                    onClick={() => setShowToken(!showToken)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 transition"
                  >
                    {showToken ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 2. KARTU PARAMETER OTOMATISASI */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-sm font-bold text-slate-700 mb-6 flex items-center gap-2">
              🤖 Parameter Otomatisasi
            </h2>

            {/* Slider Kelembaban */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-700">Batas Minimal Kelembaban</label>
                <span className="text-sm font-bold text-emerald-600">{settings.minKelembaban}%</span>
              </div>
              
              <input 
                type="range" 
                name="minKelembaban"
                min="0" max="100" 
                value={settings.minKelembaban}
                onChange={handleChange}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              
              <div className="flex justify-between text-xs text-slate-400 mt-2">
                <span>0% (Kering)</span>
                <span>Jika &lt; {settings.minKelembaban}%, Pompa ON</span>
                <span>100% (Basah)</span>
              </div>
            </div>

            {/* Input Durasi & Jeda */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Durasi Siram (Detik)</label>
                <input 
                  type="number" 
                  name="durasiSiram"
                  value={settings.durasiSiram}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Jeda Siram (Menit)</label>
                <input 
                  type="number" 
                  name="jedaSiram"
                  value={settings.jedaSiram}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>
          </div>

        </div>

        {/* --- KOLOM KANAN (PROFIL & NOTIFIKASI) --- */}
        <div className="lg:col-span-1 space-y-6">

          {/* 3. KARTU PROFIL USER */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center text-slate-400 mb-4 shadow-inner">
               <FaUser size={40} />
            </div>
            <h3 className="font-bold text-lg text-slate-800">Petani Cabai 01</h3>
            <p className="text-sm text-slate-500 mb-6">petani@takiro.com</p>
            
            <button className="w-full py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition flex justify-center items-center gap-2">
               Edit Profil
            </button>
          </div>

          {/* 4. KARTU NOTIFIKASI */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">NOTIFIKASI</h2>
            
            {/* Toggle 1 */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <div className="text-sm font-semibold text-slate-700">Alert Tanah Kering</div>
                    <div className="text-xs text-slate-400">Saat pompa menyala.</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        name="alertTanah"
                        checked={settings.alertTanah} 
                        onChange={handleChange}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
            </div>

            {/* Toggle 2 */}
            <div className="flex justify-between items-center">
                <div>
                    <div className="text-sm font-semibold text-slate-700">Alert Suhu</div>
                    <div className="text-xs text-slate-400">Jika suhu &gt; 35°C.</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        name="alertSuhu"
                        checked={settings.alertSuhu} 
                        onChange={handleChange}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}