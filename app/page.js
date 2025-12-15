// app/page.js
import Kartu from "../components/kartu";
import Grafik from "../components/grafik";

export default function Home() {
  return (
    <div className="px-4 py-6 text-slate-800 ">
      <h1 className="text-xl mb-4 font-semibold">Beranda</h1>

      {/* Wrapper untuk grid utama */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Grafik />
        <div className="grid grid-cols-2 gap-4"> 
          {/* Cukup panggil Kartu, dia akan otomatis looping sesuai sensorConfig */}
          <Kartu />
        </div>
      </div>
    </div>
  );
}