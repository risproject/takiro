import { RiWifiFill, RiThunderstormsFill, RiSignalTowerFill, RiBookOpenFill, RiSunCloudyLine } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa6";

export default function Informasi() {
  return (
    <div className="p-4 md:p-8 text-slate-700 h-full">
            
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Pusat Informasi</h1>
          <p className="text-sm text-slate-500">Status Perangkat & Log Aktivitas Kebun</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-xs font-bold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Sistem Online
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Column Left: Logs */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden h-fit">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-lg text-slate-800">Riwayat Aktivitas (Log)</h3>
            
            <div className="flex gap-2">
              <button className="text-xs px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-md font-medium transition-colors">Semua</button>
              <button className="text-xs px-3 py-1 bg-white border border-slate-200 hover:bg-red-50 hover:text-red-500 rounded-md transition-colors">Error</button>
            </div>
          </div>

          <div className="p-6">
            <div className="relative border-l-2 border-slate-200 ml-3 space-y-8">
              
              {/* Log Item 1 */}
              <div className="ml-8 relative">
                <div className="absolute -left-[41px] top-1 bg-white border-4 border-blue-500 h-5 w-5 rounded-full"></div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-blue-800 text-sm">Penyiraman Terjadwal</h4>
                    <span className="text-xs text-slate-500 font-mono">14:00 WIB</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">Sistem menyalakan pompa selama 2 menit sesuai jadwal sore.</p>
                </div>
              </div>

              {/* Log Item 2 */}
              <div className="ml-8 relative">
                <div className="absolute -left-[41px] top-1 bg-white border-4 border-amber-400 h-5 w-5 rounded-full"></div>
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-amber-700 text-sm">Kelembaban Drop (Peringatan)</h4>
                    <span className="text-xs text-slate-500 font-mono">12:30 WIB</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">Sensor mendeteksi kelembaban &lt; 40% karena cuaca panas terik.</p>
                </div>
              </div>

              {/* Log Item 3 */}
              <div className="ml-8 relative">
                <div className="absolute -left-[41px] top-1 bg-white border-4 border-emerald-500 h-5 w-5 rounded-full"></div>
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-slate-800 text-sm">Sinkronisasi Data</h4>
                    <span className="text-xs text-slate-500 font-mono">10:00 WIB</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">Data sensor berhasil diunggah ke cloud database.</p>
                </div>
              </div>

              {/* Log Item 4 (Kemarin) */}
              <div className="ml-8 relative opacity-75">
                <span className="absolute -left-[68px] top-2 text-[10px] font-bold text-slate-400 -rotate-90 w-10 origin-center">KEMARIN</span>
                <div className="absolute -left-[41px] top-1 bg-white border-4 border-red-500 h-5 w-5 rounded-full"></div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-red-700 text-sm">Gagal Koneksi WiFi</h4>
                    <span className="text-xs text-slate-500 font-mono">21 Nov, 18:00</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">Perangkat IoT kehilangan sinyal WiFi. Mencoba reconnect...</p>
                </div>
              </div>

            </div>
            
            <div className="text-center mt-8">
              <button className="text-sm text-[#2A9D8F] font-semibold hover:underline">Muat Lebih Banyak...</button>
            </div>
          </div>
        </div>

        {/* Column Right: Widgets */}
        <div className="space-y-6">

          {/* NodeMCU Status Card */}
          <div className="bg-[#264653] text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
            <RiWifiFill className="absolute -right-4 -bottom-4 text-9xl text-white opacity-5" />
            
            <h3 className="font-bold text-lg mb-4">Status Alat (NodeMCU)</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-sm text-gray-300">Koneksi WiFi</span>
                <span className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                    <RiSignalTowerFill /> Kuat (90%)
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-sm text-gray-300">Tegangan</span>
                <span className="text-sm font-bold text-amber-400 flex items-center gap-2">
                    <RiThunderstormsFill /> 4.8 V
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Versi Firmware</span>
                <span className="text-sm font-bold">v1.2.0</span>
              </div>
            </div>
            
            <button className="mt-6 w-full bg-white/10 hover:bg-white/20 py-2 rounded-lg text-sm font-semibold transition">
              Reboot Perangkat
            </button>
          </div>

          {/* Guide Accordion */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <RiBookOpenFill className="text-[#2A9D8F]" /> Panduan Cabai
            </h3>

            <div className="space-y-3">
              
              <details className="group bg-slate-50 rounded-lg p-3 cursor-pointer open:bg-slate-100 transition-colors">
                <summary className="font-semibold text-sm text-slate-700 flex justify-between items-center list-none">
                  Standar pH Tanah
                  <FaChevronDown className="text-xs text-slate-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Tanaman cabai tumbuh optimal pada pH 6.0 - 7.0. Jika pH &lt; 5.5 (Asam), tambahkan kapur dolomit.
                </p>
              </details>

              <details className="group bg-slate-50 rounded-lg p-3 cursor-pointer open:bg-slate-100 transition-colors">
                <summary className="font-semibold text-sm text-slate-700 flex justify-between items-center list-none">
                  Gejala Kutu Kebul
                  <FaChevronDown className="text-xs text-slate-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Daun menguning dan keriting. Terdapat serbuk putih di bawah daun. Semprot dengan insektisida nabati.
                </p>
              </details>

              <details className="group bg-slate-50 rounded-lg p-3 cursor-pointer open:bg-slate-100 transition-colors">
                <summary className="font-semibold text-sm text-slate-700 flex justify-between items-center list-none">
                  Waktu Penyiraman
                  <FaChevronDown className="text-xs text-slate-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Pagi hari (07:00 - 09:00) atau Sore hari (15:00 - 17:00). Hindari menyiram saat matahari terik.
                </p>
              </details>
            </div>
            
            <button className="w-full mt-4 text-xs text-center text-[#2A9D8F] hover:text-teal-700 font-medium flex items-center justify-center gap-1">
              Lihat Panduan Lengkap <span aria-hidden="true">&rarr;</span>
            </button>
          </div>

          {/* Weather Widget */}
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-5 rounded-xl shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs opacity-80">Cuaca Purworejo</p>
                <h3 className="text-2xl font-bold mt-1">32°C</h3>
                <p className="text-xs font-semibold">Cerah Berawan</p>
              </div>
              <RiSunCloudyLine className="text-5xl opacity-90" />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}