import MoistureChart from "../../components/MoistureChart";
import { RiDropFill, RiTempHotFill, RiFlaskFill, RiCalendarLine, RiArrowUpLine, RiErrorWarningFill } from "react-icons/ri";
import { GiWateringCan } from "react-icons/gi";
import { FaChevronDown, FaClockRotateLeft, FaLightbulb } from "react-icons/fa6";

export default function Statistik() {
  return (
    <div className="p-4 md:p-8 text-slate-700">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Statistik Tanaman</h1>
          <p className="text-sm text-slate-500">Plant-01, Purworejo • Cabai Rawit Merah</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200 text-sm font-medium cursor-pointer hover:bg-slate-50 flex items-center transition-colors">
          <RiCalendarLine className="mr-2 text-teal-600" /> 
          7 Hari Terakhir 
          <FaChevronDown className="ml-2 text-xs opacity-50" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Card 1: Kelembaban */}
        <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-[#2A9D8F]">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Rata-rata Kelembaban</p>
              <h3 className="text-2xl font-bold text-slate-800">68%</h3>
            </div>
            <div className="p-2 bg-teal-50 rounded-full text-[#2A9D8F]">
              <RiDropFill size={20} />
            </div>
          </div>
          <p className="text-xs text-green-500 font-semibold flex items-center gap-1">
            <RiArrowUpLine /> Stabil (Normal)
          </p>
        </div>

        {/* Card 2: Suhu */}
        <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-orange-400">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Rata-rata Suhu</p>
              <h3 className="text-2xl font-bold text-slate-800">29°C</h3>
            </div>
            <div className="p-2 bg-orange-50 rounded-full text-orange-400">
              <RiTempHotFill size={20} />
            </div>
          </div>
          <p className="text-xs text-orange-500 font-semibold flex items-center gap-1">
            <RiErrorWarningFill /> Sedikit Panas
          </p>
        </div>

        {/* Card 3: pH */}
        <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-purple-400">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">pH Tanah</p>
              <h3 className="text-2xl font-bold text-slate-800">6.5</h3>
            </div>
            <div className="p-2 bg-purple-50 rounded-full text-purple-400">
              <RiFlaskFill size={20} />
            </div>
          </div>
          <p className="text-xs text-slate-400">Kondisi Netral</p>
        </div>

        {/* Card 4: Siram */}
        <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-blue-500">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Frekuensi Siram</p>
              <h3 className="text-2xl font-bold text-slate-800">3x</h3>
            </div>
            <div className="p-2 bg-blue-50 rounded-full text-blue-500">
              <GiWateringCan size={20} />
            </div>
          </div>
          <p className="text-xs text-slate-400">Hari ini (Total 1.5 Liter)</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg text-slate-800">Tren Kelembaban Tanah (24 Jam)</h3>
          <button className="text-xs bg-slate-100 px-3 py-1 rounded hover:bg-slate-200 transition-colors">Lihat Detail</button>
        </div>
        <div className="w-full h-64">
          <MoistureChart />
        </div>
      </div>

      {/* Bottom Grid: Logs & Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Activity Log */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-slate-800">
            <FaClockRotateLeft className="text-slate-400" /> Log Aktivitas Sistem
          </h3>
          
          <div className="relative border-l-2 border-slate-200 ml-3 space-y-8 pb-2">
            
            {/* Item 1 */}
            <div className="ml-6 relative">
              <div className="absolute -left-[31px] top-1 bg-green-500 h-4 w-4 rounded-full border-4 border-white shadow-sm"></div>
              <p className="text-xs text-slate-400 font-mono mb-1">14:30 WIB</p>
              <p className="font-semibold text-slate-800">Penyiraman Otomatis Selesai</p>
              <p className="text-sm text-slate-500">Tanah mencapai target kelembaban 70%.</p>
            </div>

            {/* Item 2 */}
            <div className="ml-6 relative">
              <div className="absolute -left-[31px] top-1 bg-blue-400 h-4 w-4 rounded-full border-4 border-white shadow-sm"></div>
              <p className="text-xs text-slate-400 font-mono mb-1">14:15 WIB</p>
              <p className="font-semibold text-slate-800">Pompa Air Nyala (Trigger: Sensor)</p>
              <p className="text-sm text-slate-500">Sistem mendeteksi tanah kering (35%).</p>
            </div>

            {/* Item 3 */}
            <div className="ml-6 relative">
              <div className="absolute -left-[31px] top-1 bg-amber-400 h-4 w-4 rounded-full border-4 border-white shadow-sm"></div>
              <p className="text-xs text-slate-400 font-mono mb-1">12:00 WIB</p>
              <p className="font-semibold text-slate-800">Peringatan Suhu Tinggi</p>
              <p className="text-sm text-slate-500">Suhu area kebun mencapai 34°C.</p>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 h-fit">
          <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
            <FaLightbulb /> Info Budidaya
          </h3>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-bold text-sm text-slate-700">Fase Pembuahan</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Saat cabai mulai berbunga, pastikan tanah tidak terlalu basah agar bunga tidak rontok. Jaga kelembaban di 60-70%.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-bold text-sm text-slate-700">Indikasi Hama</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Jika daun mengeriting, periksa bagian bawah daun untuk kutu kebul.
              </p>
            </div>
          </div>
        </div>

      </div>
      
      <div className="mt-10 text-center text-xs text-slate-400">
        &copy; 2025 Takiro Sync IoT Dashboard. Developed for Chili Farming.
      </div>

    </div>
  );
}