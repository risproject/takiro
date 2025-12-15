"use client";

import { useState, useEffect } from "react";
import { 
    Radar, RadarChart, PolarGrid, 
    PolarAngleAxis, PolarRadiusAxis, 
    ResponsiveContainer, Tooltip 
} from "recharts";
import { db } from "../lib/firebase";
import { ref, onValue } from "firebase/database";

export default function Grafik() {
    const [sensorData, setSensorData] = useState(null);

    useEffect(() => {
        // Mengambil data realtime dari Firebase
        const sensorRef = ref(db, "/");
        
        const unsubscribe = onValue(sensorRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setSensorData(data);
            }
        });

        return () => unsubscribe();
    }, []);

    // Jika data belum masuk, tampilkan data dummy 0 agar tidak error
    const currentData = sensorData || { suhu: 0, kelembaban: 0, cahaya: 0, ph: 0, suhuTanah: 0 };

    // Format data untuk Recharts Radar Chart
    // Kita memetakan data Firebase ke bentuk sudut-sudut grafik
    const chartData = [
        { subject: 'Suhu Udara', A: currentData.suhu || 0, fullMark: 50 },
        { subject: 'Kelembaban', A: currentData.kelembaban || 0, fullMark: 100 },
        // Asumsi ada data lain, jika tidak ada di firebase akan 0
        { subject: 'Cahaya', A: currentData.cahaya || 0, fullMark: 100 }, 
        { subject: 'Suhu Tanah', A: currentData.suhuTanah || 0, fullMark: 50 },
        { subject: 'pH Tanah', A: currentData.ph || 0, fullMark: 14 },
    ];

    return (
        <div className="bg-white p-4 rounded-xl shadow-md border border-slate-200 flex flex-col items-center justify-center">
            <h3 className="text-slate-600 font-semibold mb-2">Peta Kesehatan Tanaman</h3>
            
            <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                            name="Kondisi Saat Ini"
                            dataKey="A"
                            stroke="#0ea5e9"
                            strokeWidth={2}
                            fill="#0ea5e9"
                            fillOpacity={0.4}
                        />
                        <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
            
            <div className="text-xs text-slate-400 mt-2 text-center">
                Grafik menyesuaikan data realtime dari sensor
            </div>
        </div>
    );
}