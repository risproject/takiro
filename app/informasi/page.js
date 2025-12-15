"use client";

import { useState, useEffect } from "react";
// Pastikan path firebase benar (mundur 2 folder)
import { db } from "../../lib/firebase"; 
import { ref, onValue } from "firebase/database";
import { 
  FaWifi, FaBolt, FaMicrochip, FaPowerOff, 
  FaChevronDown, FaChevronUp, FaBookOpen,
  FaCircleCheck, FaTriangleExclamation, FaCircleXmark, FaCircleInfo,
  FaCloudSun, FaWind, FaDroplet, FaLocationDot, FaUmbrella
} from "react-icons/fa6";

export default function Informasi() {
  // State untuk Status Alat (Realtime dari Firebase)
  const [deviceStatus, setDeviceStatus] = useState({
    wifi: 0, voltage: 0, firmware: "v1.2.0", isOnline: false
  });

  // State untuk Accordion Panduan
  const [openGuide, setOpenGuide] = useState(null);

  // Ambil Data dari Firebase
  useEffect(() => {
    const statusRef = ref(db, "/"); 
    const unsubscribe = onValue(statusRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setDeviceStatus({
            wifi: data.wifi || 85, 
            voltage: data.voltage || 4.8,
            firmware: "v1.2.0",
            isOnline: true 
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const logs = [
    { id: 1, type: 'info', title: 'Penyiraman Terjadwal', time: '14:00 WIB', desc: 'Sistem menyalakan pompa selama 2 menit sesuai jadwal sore.' },
    { id: 2, type: 'warning', title: 'Kelembaban Drop', time: '12:30 WIB', desc: 'Sensor mendeteksi kelembaban < 40% karena cuaca panas terik.' },
    { id: 3, type: 'success', title: 'Sinkronisasi Data', time: '10:00 WIB', desc: 'Data sensor berhasil diunggah ke cloud database.' },
    { id: 4, type: 'error', title: 'Gagal Koneksi WiFi', time: '08:15 WIB', desc: 'Perangkat IoT kehilangan sinyal WiFi. Mencoba reconnect...' },
  ];

  const guides = [
    { id: 1, title: "Standar pH Tanah", content: "pH tanah ideal untuk cabai adalah 6.0 - 7.0. Jika terlalu asam (< 6), tambahkan kapur dolomit." },
    { id: 2, title: "Gejala Kutu Kebul", content: "Daun mengkerut, menguning, dan ada serbuk putih. Semprot dengan insektisida nabati." },
    { id: 3, title: "Waktu Penyiraman", content: "Penyiraman terbaik pagi (06:00-08:00) atau sore (16:00-17:00). Hindari siang hari." }
  ];

  const toggleGuide = (id) => setOpenGuide(openGuide === id ? null : id);

  return (
    <div className="p-6 text-slate-800 min-h-screen pb-20">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Pusat Informasi</h1>
          <p className="text-slate-500 text-sm mt-1">Status Perangkat & Log Aktivitas Kebun</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
           Sistem Online
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- KOLOM KIRI: LOG --- */}
        <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">Riwayat Aktivitas (Log)</h2>
                <div className="flex gap-2">
                    <button className="px-3 py-1 text-xs border rounded bg-slate-50 text-slate-600">Semua</button>
                    <button className="px-3 py-1 text-xs border rounded bg-white text-slate-400 hover:bg-slate-50">Error</button>
                </div>
            </div>

            <div className="space-y-6 relative pl-2">
                <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-200"></div>
                {logs.map((log) => (
                    <div key={log.id} className="relative flex gap-4">
                        <div className={`z-10 w-9 h-9 rounded-full border-4 border-white shrink-0 flex items-center justify-center shadow-sm
                            ${log.type === 'info' ? 'bg-blue-500 text-white' : 
                              log.type === 'warning' ? 'bg-amber-400 text-white' : 
                              log.type === 'success' ? 'bg-emerald-500 text-white' : 
                              'bg-red-500 text-white'}`}>
                            {log.type === 'info' && <FaCircleInfo size={14}/>}
                            {log.type === 'warning' && <FaTriangleExclamation size={14}/>}
                            {log.type === 'success' && <FaCircleCheck size={14}/>}
                            {log.type === 'error' && <FaCircleXmark size={14}/>}
                        </div>
                        <div className={`flex-1 p-4 rounded-xl border shadow-sm bg-white
                            ${log.type === 'warning' ? 'border-amber-100 bg-amber-50/30' : 
                              log.type === 'error' ? 'border-red-100 bg-red-50/30' : 'border-slate-100'}`}>
                            <div className="flex justify-between items-start mb-1">
                                <h3 className={`font-semibold text-sm 
                                    ${log.type === 'warning' ? 'text-amber-700' : 
                                      log.type === 'error' ? 'text-red-700' : 
                                      log.type === 'info' ? 'text-blue-700' : 'text-slate-800'}`}>
                                    {log.title}
                                </h3>
                                <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">{log.time}</span>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">{log.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* --- KOLOM KANAN --- */}
        <div className="lg:col-span-1 space-y-6">
            
            {/* 1. STATUS ALAT */}
            <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-slate-700 rounded-full opacity-50 blur-2xl"></div>
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2 relative z-10">
                    Status Alat (NodeMCU)
                </h2>
                <div className="space-y-4 relative z-10">
                    <div className="flex justify-between items-center py-2 border-b border-slate-700">
                        <span className="text-slate-300 text-sm flex items-center gap-2"><FaWifi /> Koneksi WiFi</span>
                        <span className={`font-semibold text-sm ${deviceStatus.wifi > 50 ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {deviceStatus.wifi > 80 ? 'Kuat' : 'Sedang'} ({deviceStatus.wifi}%)
                        </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-700">
                        <span className="text-slate-300 text-sm flex items-center gap-2"><FaBolt /> Tegangan</span>
                        <span className="font-semibold text-amber-400 text-sm">⚡ {deviceStatus.voltage} V</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-700">
                        <span className="text-slate-300 text-sm flex items-center gap-2"><FaMicrochip /> Versi Firmware</span>
                        <span className="font-mono text-slate-200 text-sm">{deviceStatus.firmware}</span>
                    </div>
                </div>
            </div>

            {/* 2. PANDUAN CABAI */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-800">
                    <FaBookOpen className="text-emerald-600"/> Panduan Cabai
                </h2>
                <div className="space-y-3">
                    {guides.map((guide) => (
                        <div key={guide.id} className="border border-slate-100 rounded-xl overflow-hidden">
                            <button onClick={() => toggleGuide(guide.id)} className="w-full flex justify-between items-center p-3 bg-slate-50 hover:bg-slate-100 transition text-left">
                                <span className="text-sm font-semibold text-slate-700">{guide.title}</span>
                                {openGuide === guide.id ? <FaChevronUp className="text-slate-400" size={12}/> : <FaChevronDown className="text-slate-400" size={12}/>}
                            </button>
                            {openGuide === guide.id && (
                                <div className="p-3 bg-white text-xs text-slate-500 leading-relaxed border-t border-slate-100">{guide.content}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. PANTAUAN CUACA REAL-TIME (BARU DITAMBAHKAN) */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                {/* Awan Hiasan */}
                <FaCloudSun className="absolute -right-4 -top-4 text-blue-400 opacity-30 w-32 h-32" />
                
                <div className="relative z-10">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-sm font-medium text-blue-100 flex items-center gap-1">
                                <FaLocationDot size={12}/> Purworejo, ID
                            </h2>
                            <p className="text-xs text-blue-200 mt-1">Senin, 15 Des 2025</p>
                        </div>
                        <div className="bg-white/20 px-2 py-1 rounded text-xs font-semibold backdrop-blur-sm">
                            Live
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mt-6">
                        <div className="text-5xl font-bold">29°</div>
                        <div>
                            <p className="font-semibold text-lg">Cerah Berawan</p>
                            <p className="text-xs text-blue-100">Terasa seperti 32°</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-6 border-t border-blue-400/30 pt-4">
                        <div className="text-center">
                            <FaDroplet className="mx-auto text-blue-200 mb-1" />
                            <p className="text-xs text-blue-100">Kelembaban</p>
                            <p className="font-semibold text-sm">75%</p>
                        </div>
                        <div className="text-center border-l border-blue-400/30">
                            <FaWind className="mx-auto text-blue-200 mb-1" />
                            <p className="text-xs text-blue-100">Angin</p>
                            <p className="font-semibold text-sm">12 km/h</p>
                        </div>
                        <div className="text-center border-l border-blue-400/30">
                            <FaUmbrella className="mx-auto text-blue-200 mb-1" />
                            <p className="text-xs text-blue-100">Hujan</p>
                            <p className="font-semibold text-sm">10%</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}