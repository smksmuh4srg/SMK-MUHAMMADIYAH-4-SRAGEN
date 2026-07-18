/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  Calendar,
  FileText,
  Search,
  CheckCircle,
  AlertCircle,
  Info,
  Clock,
  ClipboardList,
  UserCheck,
  Coins,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { SCHOOL_INFO } from "../data";

export default function SPMB() {
  const [activeTab, setActiveTab] = useState<"jadwal" | "syarat" | "biaya">("jadwal");
  const [nisnSearch, setNisnSearch] = useState("");
  const [searchResult, setSearchResult] = useState<any | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Mock selection announcement results
  const mockSelectionResults: { [key: string]: { nama: string; status: "Lulus" | "Cadangan"; jurusan: string; catatan: string } } = {
    "1234567890": {
      nama: "Ananda Rizky Pratama",
      status: "Lulus",
      jurusan: "Teknik Komputer & Jaringan (TKJ)",
      catatan: "Selamat! Anda dinyatakan LULUS SELEKSI UTAMA. Silakan melakukan registrasi ulang pada tanggal 20-25 Juli 2026 di Ruang Panitia SPMB."
    },
    "2026010203": {
      nama: "Siti Aminah",
      status: "Lulus",
      jurusan: "Akuntansi & Keuangan Lembaga (AKL)",
      catatan: "Selamat! Anda dinyatakan LULUS SELEKSI UTAMA. Silakan melakukan registrasi ulang pada tanggal 20-25 Juli 2026 di Ruang Panitia SPMB."
    },
    "3039090807": {
      nama: "Budi Santoso",
      status: "Cadangan",
      jurusan: "Teknik Kendaraan Ringan Otomotif (TKRO)",
      catatan: "Anda dinyatakan masuk dalam daftar CADANGAN. Panitia akan menghubungi Anda jika ada kuota kosong setelah masa daftar ulang gelombang pertama selesai."
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nisnSearch.trim()) return;

    const result = mockSelectionResults[nisnSearch.trim()];
    setSearchResult(result || null);
    setHasSearched(true);
  };

  const waves = [
    {
      nama: "Gelombang 1 (Unggulan)",
      tanggal: "01 Januari - 31 Maret 2026",
      status: "Selesai",
      colorClass: "border-slate-200 bg-slate-50/50 text-slate-400"
    },
    {
      nama: "Gelombang 2 (Reguler I)",
      tanggal: "01 April - 30 Juni 2026",
      status: "Selesai",
      colorClass: "border-slate-200 bg-slate-50/50 text-slate-400"
    },
    {
      nama: "Gelombang 3 (Reguler II)",
      tanggal: "01 Juli - 15 Agustus 2026",
      status: "Sedang Berlangsung",
      colorClass: "border-hijau-light bg-hijau-pastel/50 text-hijau-primary"
    }
  ];

  const requirements = [
    "Mengisi formulir pendaftaran online maupun offline.",
    "Fotokopi Ijazah / Surat Keterangan Lulus (SKL) SMP/MTs dilegalisir (2 lembar).",
    "Fotokopi Kartu Keluarga (KK) dan Akta Kelahiran (2 lembar).",
    "Pas foto terbaru ukuran 3x4 berwarna (4 lembar).",
    "Fotokopi kartu penunjang (KIP/KKS/PKH) bagi yang memiliki.",
    "Menyerahkan fotokopi piagam prestasi akademis/non-akademis (jika ada)."
  ];

  return (
    <section id="spmb" className="py-20 md:py-28 bg-white scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 slowmo-reveal" id="spmb-header">
          <h2 className="text-xs font-bold tracking-widest text-oranye-primary uppercase mb-2">Penerimaan Siswa Baru</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Pendaftaran Siswa Baru (SPMB)
          </p>
          <p className="text-slate-500 mt-3 text-sm sm:text-base font-medium">
            Bergabunglah bersama keluarga besar {SCHOOL_INFO.nama} untuk meraih masa depan cerah berkarakter mulia.
          </p>
          <div className="h-1.5 w-20 bg-hijau-secondary mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12" id="spmb-wrapper">
          
          {/* LEFT PANEL: Informasi SPMB Tabs */}
          <div className="lg:col-span-7 space-y-6 scroll-mt-24" id="spmb-info">
            <div className="bg-slate-50/70 border border-slate-100 p-6 sm:p-8 rounded-3xl card-shadow">
              
              <div className="flex items-center gap-2.5 mb-6 border-b border-slate-200/60 pb-4">
                <ClipboardList className="w-6 h-6 text-hijau-primary" />
                <h3 className="text-xl font-bold text-slate-800">Panduan & Informasi SPMB</h3>
              </div>

              {/* Tab Selector */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setActiveTab("jadwal")}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeTab === "jadwal"
                      ? "bg-hijau-primary text-white shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100"
                  }`}
                >
                  Jadwal Gelombang
                </button>
                <button
                  onClick={() => setActiveTab("syarat")}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeTab === "syarat"
                      ? "bg-hijau-primary text-white shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100"
                  }`}
                >
                  Syarat Berkas
                </button>
                <button
                  onClick={() => setActiveTab("biaya")}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeTab === "biaya"
                      ? "bg-hijau-primary text-white shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100"
                  }`}
                >
                  Biaya Pendaftaran
                </button>
              </div>

              {/* Tab Contents */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100/80 min-h-[220px] flex flex-col justify-between">
                
                {/* 1. JADWAL TAB */}
                {activeTab === "jadwal" && (
                  <div className="space-y-4">
                    <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                      Proses seleksi penerimaan siswa baru {SCHOOL_INFO.nama} dibagi dalam 3 gelombang dengan kuota terbatas pada tiap gelombang:
                    </p>
                    <div className="space-y-3">
                      {waves.map((w, index) => (
                        <div key={index} className={`flex items-center justify-between p-3 border rounded-xl ${w.colorClass}`}>
                          <div className="space-y-1">
                            <p className="text-xs sm:text-sm font-bold">{w.nama}</p>
                            <div className="flex items-center gap-1.5 text-[11px] font-medium">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{w.tanggal}</span>
                            </div>
                          </div>
                          <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ${
                            w.status === "Sedang Berlangsung"
                              ? "bg-hijau-primary text-white animate-pulse"
                              : "bg-slate-200 text-slate-500"
                          }`}>
                            {w.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. SYARAT TAB */}
                {activeTab === "syarat" && (
                  <div className="space-y-4">
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">
                      Berikut ini beberapa berkas administratif wajib yang harus dipersiapkan calon siswa saat mendaftar:
                    </p>
                    <ul className="space-y-2.5">
                      {requirements.map((req, idx) => (
                        <li key={idx} className="flex gap-2 items-start text-xs sm:text-sm font-medium text-slate-600">
                          <CheckCircle className="w-4 h-4 text-hijau-secondary mt-0.5 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 3. BIAYA TAB */}
                {activeTab === "biaya" && (
                  <div className="space-y-4">
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">
                      Sebagai wujud komitmen dakwah pendidikan Muhammadiyah, rincian biaya pendaftaran kami rancang ramah dan transparan:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-hijau-pastel/30 border border-hijau-light p-4 rounded-xl space-y-1">
                        <div className="flex items-center gap-1.5 text-hijau-primary">
                          <Coins className="w-4 h-4" />
                          <span className="text-xs font-bold uppercase tracking-wide">Formulir Pendaftaran</span>
                        </div>
                        <p className="text-lg font-extrabold text-slate-800">GRATIS</p>
                        <p className="text-[10px] text-slate-400 font-semibold uppercase">Tanpa Biaya Administrasi Awal</p>
                      </div>
                      <div className="bg-oranye-pastel/30 border border-oranye-light p-4 rounded-xl space-y-1">
                        <div className="flex items-center gap-1.5 text-oranye-primary">
                          <Sparkles className="w-4 h-4" />
                          <span className="text-xs font-bold uppercase tracking-wide">Beasiswa Pendidikan</span>
                        </div>
                        <p className="text-lg font-extrabold text-slate-800">POTONGAN HINGGA 100%</p>
                        <p className="text-[10px] text-slate-400 font-semibold uppercase">Bagi Siswa Berprestasi & Yatim/Piatu</p>
                      </div>
                    </div>
                    <div className="text-[11px] font-medium text-slate-400 bg-slate-50 p-2.5 rounded-lg flex gap-1.5 items-start">
                      <Info className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                      <span>Segera hubungi tim konsultasi untuk mendapatkan rincian uang seragam dan DSP yang dapat diangsur secara fleksibel.</span>
                    </div>
                  </div>
                )}

                {/* CTA to online form */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-oranye-primary" />
                    <span className="text-xs font-bold text-slate-600">Gelombang 3 Terbuka s.d 15 Agustus 2026</span>
                  </div>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-oranye-primary hover:bg-oranye-secondary py-2.5 px-4 rounded-xl transition-colors cursor-pointer"
                  >
                    <span>Daftar Online Sekarang</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>

              </div>

            </div>
          </div>

          {/* RIGHT PANEL: Pengumuman Portal */}
          <div className="lg:col-span-5 space-y-6 scroll-mt-24" id="spmb-pengumuman">
            <div className="bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl card-shadow h-full flex flex-col justify-between">
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
                  <UserCheck className="w-6 h-6 text-oranye-primary" />
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">Pengumuman Kelulusan</h3>
                    <p className="text-xs text-slate-400 font-semibold uppercase">Portal Seleksi SPMB 2026/2027</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                  Masukkan 10 digit <strong>NISN</strong> pendaftar Anda untuk mengecek status persetujuan akhir panitia penerimaan siswa baru.
                </p>

                {/* Search Form */}
                <form onSubmit={handleSearch} className="flex gap-2">
                  <div className="relative flex-grow">
                    <span className="absolute inset-y-0 left-3.5 flex items-center text-slate-400">
                      <Search className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      placeholder="Masukkan NISN Anda..."
                      value={nisnSearch}
                      onChange={(e) => setNisnSearch(e.target.value)}
                      className="w-full text-xs sm:text-sm pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-oranye-primary focus:bg-white transition-all font-semibold text-slate-700"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-oranye-primary hover:bg-oranye-secondary text-white px-4 py-3 rounded-xl font-bold text-xs sm:text-sm transition-colors cursor-pointer flex-shrink-0"
                  >
                    Cek Status
                  </button>
                </form>

                {/* Info Box detailing mock candidates to try */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex gap-2 items-start text-[11px] font-medium text-slate-500">
                  <Info className="w-4 h-4 text-oranye-primary mt-0.5 flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="font-bold text-slate-700">Contoh NISN Uji Coba:</p>
                    <p>Lulus Utama: <strong className="text-slate-700 select-all font-mono">1234567890</strong> (TKJ) atau <strong className="text-slate-700 select-all font-mono">2026010203</strong> (AKL)</p>
                    <p>Cadangan: <strong className="text-slate-700 select-all font-mono">3039090807</strong> (TKRO)</p>
                  </div>
                </div>
              </div>

              {/* Lookup Result Panel */}
              <div className="mt-6">
                {hasSearched ? (
                  searchResult ? (
                    <div className="p-4 rounded-2xl animate-in fade-in zoom-in-95 duration-200 border bg-hijau-pastel/30 border-hijau-light/60 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Nama Pendaftar</p>
                          <p className="text-sm font-extrabold text-slate-800">{searchResult.nama}</p>
                        </div>
                        <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md ${
                          searchResult.status === "Lulus"
                            ? "bg-hijau-primary text-white"
                            : "bg-oranye-primary text-white"
                        }`}>
                          {searchResult.status === "Lulus" ? "Diterima" : "Cadangan"}
                        </span>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Program Keahlian</p>
                        <p className="text-xs font-bold text-slate-700">{searchResult.jurusan}</p>
                      </div>
                      <div className="pt-2 border-t border-hijau-light/40 flex gap-2 items-start text-xs font-semibold text-slate-600 leading-relaxed">
                        <AlertCircle className="w-4 h-4 text-hijau-primary mt-0.5 flex-shrink-0" />
                        <span>{searchResult.catatan}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl animate-in fade-in zoom-in-95 duration-200 border bg-oranye-pastel/20 border-oranye-light/40 flex gap-3 items-start text-xs font-semibold text-slate-600 leading-relaxed">
                      <AlertCircle className="w-5 h-5 text-oranye-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-slate-800 mb-0.5">NISN Tidak Ditemukan</p>
                        <span>NISN <strong className="font-mono">{nisnSearch}</strong> tidak ditemukan atau berkas Anda masih dalam proses seleksi. Silakan cek berkala atau hubungi hotline panitia SPMB.</span>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="p-5 border border-dashed border-slate-200 rounded-2xl text-center py-8">
                    <Info className="w-7 h-7 text-slate-300 mx-auto mb-2" />
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Menunggu Pencarian</p>
                    <p className="text-[11px] text-slate-400 mt-1">Hasil seleksi berkas administrasi dan tes minat bakat akan muncul di sini.</p>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
