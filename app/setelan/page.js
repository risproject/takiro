"use client";

import { useState } from "react";
import { RiSave3Fill, RiLinkM, RiEyeLine, RiEyeOffLine, RiRobot2Fill, RiUserFill, RiNotification3Fill } from "react-icons/ri";

export default function Setelan() {
  // State untuk menangani nilai input
  const [settings, setSettings] = useState({
    deviceId: "ESP32-PLANT-001",
    authToken: "secret_token_123",
    minMoisture: 40, // Nilai slider awal
    duration: 120,
    interval: 30,
    notifDry: false,
    notifTemp: true,
  });

  const [showToken, setShowToken] = useState(false);

  // Handler untuk mengubah state
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handler khusus untuk Toggle Switch
  const toggleSwitch = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="p-4 md:p-8 text-slate-700 h-full">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Pengaturan Aplikasi</h1>
          <p className="text-sm text-slate-500">Konfigurasi Alat IoT dan Parameter Tanaman</p>
        </div>
        <button className="bg-[#2A9D8F] hover:bg-teal-700 text-white px-6 py-2 rounded-lg shadow-md transition flex items-center gap-2 font-medium">
          <RiSave3Fill size={18} /> Simpan
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Kolom Kiri: Konfigurasi Teknis */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Box 1: Koneksi Perangkat */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 pb-2 border-b border-slate-100">
              <RiLinkM className="text-[#2A9D8F]" size={20} /> Koneksi Perangkat
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Device ID */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Device ID</label>
                <input 
                  type="text" 
                  name="deviceId"
                  value={settings.deviceId} 
                  readOnly
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed focus:outline-none" 
                />
              </div>

              {/* Auth Token */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Auth Token</label>
                <div className="flex gap-2">
                  <input 
                    type={showToken ? "text" : "password"} 
                    name="authToken"
                    value={settings.authToken}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none transition-all"
                  />
                  <button 
                    onClick={() => setShowToken(!showToken)}
                    className="bg-slate-100 hover:bg-slate-200 px-3 rounded-lg text-slate-600 transition-colors"
                  >
                    {showToken ? <RiEyeOffLine /> : <RiEyeLine />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Box 2: Parameter Otomatisasi */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 pb-2 border-b border-slate-100">
              <RiRobot2Fill className="text-orange-500" size={20} /> Parameter Otomatisasi
            </h3>
            <div className="space-y-6">
              
              {/* Slider Kelembaban */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">Batas Minimal Kelembaban</label>
                  <span className="text-sm font-bold text-[#2A9D8F]">{settings.minMoisture}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  name="minMoisture"
                  value={settings.minMoisture}
                  onChange={handleChange}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2A9D8F]" 
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>0% (Kering)</span>
                  <span>Jika &lt; {settings.minMoisture}%, Pompa ON</span>
                  <span>100% (Basah)</span>
                </div>
              </div>

              {/* Durasi & Jeda */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-2">Durasi Siram (Detik)</label>
                  <input 
                    type="number" 
                    name="duration"
                    value={settings.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-2">Jeda Siram (Menit)</label>
                  <input 
                    type="number" 
                    name="interval"
                    value={settings.interval}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Profil & Notif */}
        <div className="space-y-8">
          
          {/* Profil Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-slate-200 rounded-full flex items-center justify-center text-3xl text-slate-400">
              <RiUserFill />
            </div>
            <h3 className="font-bold text-lg text-slate-800">Petani Cabai 01</h3>
            <p className="text-sm text-slate-500 mb-4">petani@takiro.com</p>
            <button className="w-full border border-slate-300 text-slate-600 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition">Edit Profil</button>
          </div>

          {/* Notifikasi */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                 Notifikasi
            </h3>
            <div className="space-y-5">
              
              {/* Toggle 1 */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700">Alert Tanah Kering</p>
                  <p className="text-xs text-slate-400">Saat pompa menyala.</p>
                </div>
                <ToggleSwitch 
                    isOn={settings.notifDry} 
                    onToggle={() => toggleSwitch('notifDry')} 
                />
              </div>

              {/* Toggle 2 */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700">Alert Suhu</p>
                  <p className="text-xs text-slate-400">Jika suhu &gt; 35°C.</p>
                </div>
                <ToggleSwitch 
                    isOn={settings.notifTemp} 
                    onToggle={() => toggleSwitch('notifTemp')} 
                />
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Komponen Kecil untuk Toggle Switch (Re-usable)
function ToggleSwitch({ isOn, onToggle }) {
    return (
        <button 
            onClick={onToggle}
            className={`relative w-11 h-6 rounded-full transition-colors duration-300 ease-in-out focus:outline-none ${isOn ? 'bg-[#2A9D8F]' : 'bg-slate-300'}`}
        >
            <span 
                className={`absolute top-[2px] left-[2px] bg-white w-5 h-5 rounded-full shadow-sm transition-transform duration-300 ease-in-out ${isOn ? 'translate-x-5' : 'translate-x-0'}`}
            />
        </button>
    );
}