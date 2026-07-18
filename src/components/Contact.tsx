/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  HelpCircle,
  Map,
  ExternalLink
} from "lucide-react";
import { useContent } from "../context/ContentContext";
import { ContactSubmission } from "../types";

export default function Contact() {
  const { schoolInfo, submitInquiry } = useContent();
  const [formData, setFormData] = useState<ContactSubmission>({
    nama: "",
    email: "",
    telepon: "",
    peran: "Calon Siswa",
    pesan: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const roles: ContactSubmission["peran"][] = ["Calon Siswa", "Wali Siswa", "Alumni", "Masyarakat Umum"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama || !formData.telepon || !formData.pesan) {
      alert("Harap lengkapi kolom nama, nomor telepon, dan pesan Anda.");
      return;
    }

    setIsSubmitting(true);
    const res = await submitInquiry(formData);
    setIsSubmitting(false);
    if (res.success) {
      setIsSuccess(true);
    } else {
      alert(res.error || "Gagal mengirim pesan, coba lagi nanti.");
    }
  };

  const resetForm = () => {
    setFormData({
      nama: "",
      email: "",
      telepon: "",
      peran: "Calon Siswa",
      pesan: "",
    });
    setIsSuccess(false);
  };

  // Google Maps URL based on address
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=SMK+Muhammadiyah+4+Sragen`;

  return (
    <section id="contact" className="py-20 md:py-28 bg-transparent scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 slowmo-reveal" id="contact-header">
          <h2 className="text-xs font-bold tracking-widest text-oranye-primary uppercase mb-2">Hubungi Kami</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Hubungi atau Kunjungi Kami
          </p>
          <p className="text-slate-500 mt-3 text-sm sm:text-base font-medium">
            Mempunyai pertanyaan seputar pendaftaran SPMB, program keahlian, atau kemitraan? Kami siap melayani Anda.
          </p>
          <div className="h-1.5 w-20 bg-hijau-secondary mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 slowmo-reveal" id="contact-wrapper">
          
          {/* COLUMN 1: Contact Info Details & Map (Left) */}
          <div className="lg:col-span-5 space-y-8" id="contact-left">
            <div className="bg-hijau-pastel/40 border border-hijau-light p-6 sm:p-8 rounded-3xl space-y-6 card-shadow" id="info-panel">
              <h3 className="text-xl font-bold text-slate-800 border-b border-hijau-light pb-3">Informasi Kontak</h3>
              
              <div className="space-y-5" id="info-items">
                {/* Alamat */}
                <div className="flex gap-4">
                  <div className="h-11 w-11 rounded-xl bg-white border border-hijau-light flex items-center justify-center text-hijau-primary flex-shrink-0 shadow-2xs">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Alamat Sekolah</p>
                    <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed mt-0.5">{schoolInfo.alamat}</p>
                  </div>
                </div>

                {/* Telepon */}
                <div className="flex gap-4">
                  <div className="h-11 w-11 rounded-xl bg-white border border-hijau-light flex items-center justify-center text-hijau-primary flex-shrink-0 shadow-2xs">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Telepon Kantor</p>
                    <p className="text-sm sm:text-base text-slate-700 font-bold mt-0.5">{schoolInfo.telepon}</p>
                  </div>
                </div>

                {/* Surel */}
                <div className="flex gap-4">
                  <div className="h-11 w-11 rounded-xl bg-white border border-hijau-light flex items-center justify-center text-hijau-primary flex-shrink-0 shadow-2xs">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Alamat Surel (Email)</p>
                    <p className="text-sm sm:text-base text-slate-700 font-medium mt-0.5">{schoolInfo.email}</p>
                  </div>
                </div>

                {/* Jam Kerja */}
                <div className="flex gap-4">
                  <div className="h-11 w-11 rounded-xl bg-white border border-hijau-light flex items-center justify-center text-hijau-primary flex-shrink-0 shadow-2xs">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Jam Pelayanan</p>
                    <p className="text-sm sm:text-base text-slate-700 font-medium mt-0.5">{schoolInfo.jamKerja}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* STYLIZED MAP PLACEHOLDER */}
            <div className="bg-white border border-slate-100 rounded-3xl p-5 card-shadow flex flex-col justify-between" id="map-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-oranye-pastel text-oranye-primary rounded-xl">
                  <Map className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Lokasi Kampus Utama</h4>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Ngrampal, Sragen</p>
                </div>
              </div>

              {/* Styled Mock map background pattern with custom Pin */}
              <div className="relative h-44 w-full bg-slate-100 rounded-2xl overflow-hidden border border-slate-200/60 flex items-center justify-center">
                
                {/* SVG Abstract Grid Map representation */}
                <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#27a852" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  {/* Rivers / Roads Mock */}
                  <path d="M -10 80 Q 120 120 400 90" fill="none" stroke="#27a852" strokeWidth="6" />
                  <path d="M 200 -20 Q 180 100 220 200" fill="none" stroke="#f88c22" strokeWidth="4" />
                </svg>

                {/* Animated Pulsing Pin */}
                <div className="relative z-10 flex flex-col items-center gap-1.5">
                  <span className="absolute -top-1.5 h-6 w-6 bg-oranye-primary/35 rounded-full animate-ping" />
                  <div className="bg-oranye-primary text-white p-2.5 rounded-full shadow-md">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="bg-slate-900/95 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                    SMK Muh 4 Sragen
                  </span>
                </div>
                
                <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[9px] font-extrabold text-slate-500 uppercase tracking-wider border border-slate-100 shadow-2xs">
                  Sragen, Jawa Tengah
                </div>
              </div>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-1.5 text-xs font-bold text-white bg-oranye-primary hover:bg-oranye-secondary py-3 px-4 rounded-xl transition-colors shadow-2xs"
              >
                <span>Buka Petunjuk Arah Google Maps</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* COLUMN 2: Contact/Inquiry Form (Right) */}
          <div className="lg:col-span-7" id="contact-right">
            <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 md:p-10 card-shadow h-full flex flex-col justify-between" id="form-panel">
              
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-5" id="inquiry-form">
                  <div className="flex items-center gap-2 mb-2 pb-4 border-b border-slate-100">
                    <HelpCircle className="w-5 h-5 text-oranye-primary" />
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">Kirim Pertanyaan</h3>
                      <p className="text-xs text-slate-500 font-semibold">Tinggalkan pesan, tim Humas kami akan membalas segera.</p>
                    </div>
                  </div>

                  {/* Nama */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="nama" className="text-xs font-bold text-slate-700 uppercase tracking-wide">Nama Lengkap *</label>
                    <input
                      type="text"
                      id="nama"
                      name="nama"
                      value={formData.nama}
                      onChange={handleInputChange}
                      placeholder="Masukkan nama lengkap Anda..."
                      required
                      className="w-full text-sm sm:text-base px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary focus:bg-white transition-all font-medium text-slate-800"
                    />
                  </div>

                  {/* Grid Email & Telepon */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Surel */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-xs font-bold text-slate-700 uppercase tracking-wide">Alamat Email (Opsional)</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="contoh@email.com"
                        className="w-full text-sm px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary focus:bg-white transition-all font-medium text-slate-800"
                      />
                    </div>

                    {/* Telepon */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="telepon" className="text-xs font-bold text-slate-700 uppercase tracking-wide">Nomor Telepon/WA *</label>
                      <input
                        type="tel"
                        id="telepon"
                        name="telepon"
                        value={formData.telepon}
                        onChange={handleInputChange}
                        placeholder="0812xxxxxx"
                        required
                        className="w-full text-sm px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary focus:bg-white transition-all font-medium text-slate-800"
                      />
                    </div>
                  </div>

                  {/* Peran */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="peran" className="text-xs font-bold text-slate-700 uppercase tracking-wide">Hubungan dengan Sekolah</label>
                    <select
                      id="peran"
                      name="peran"
                      value={formData.peran}
                      onChange={handleInputChange}
                      className="w-full text-sm px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary focus:bg-white transition-all font-semibold text-slate-700"
                    >
                      {roles.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Pesan */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="pesan" className="text-xs font-bold text-slate-700 uppercase tracking-wide">Pesan / Pertanyaan Anda *</label>
                    <textarea
                      id="pesan"
                      name="pesan"
                      value={formData.pesan}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Tuliskan pertanyaan detail Anda di sini..."
                      required
                      className="w-full text-sm sm:text-base px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary focus:bg-white transition-all font-medium text-slate-800"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 text-sm font-bold text-white bg-hijau-primary hover:bg-hijau-secondary py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Kirim Pesan Sekarang</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* SUCCESS VIEW */
                <div className="text-center py-12 px-4 flex flex-col items-center justify-center h-full space-y-6" id="form-success">
                  <div className="h-16 w-16 bg-hijau-light text-hijau-primary rounded-full flex items-center justify-center shadow-xs">
                    <CheckCircle className="w-10 h-10 text-hijau-primary animate-bounce" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">Terima Kasih, {formData.nama}!</h3>
                    <p className="text-slate-500 mt-2 text-sm sm:text-base font-medium">
                      Pesan Anda berhasil terkirim. Admin Humas {schoolInfo.nama} akan menghubungi Anda kembali melalui nomor <strong>{formData.telepon}</strong> atau email Anda sesegera mungkin.
                    </p>
                  </div>
                  
                  {/* Submitted receipt summary */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 max-w-md w-full text-left text-xs sm:text-sm space-y-2">
                    <p className="font-bold text-slate-700 pb-1.5 border-b border-slate-200 uppercase tracking-wider text-[10px]">Ringkasan Pengiriman</p>
                    <p className="text-slate-600 font-medium"><strong className="text-slate-800">Nama:</strong> {formData.nama}</p>
                    <p className="text-slate-600 font-medium"><strong className="text-slate-800">Kategori Pengirim:</strong> {formData.peran}</p>
                    <p className="text-slate-600 font-medium"><strong className="text-slate-800">Telepon/WA:</strong> {formData.telepon}</p>
                    <p className="text-slate-600 font-medium line-clamp-3"><strong className="text-slate-800">Isi Pesan:</strong> &ldquo;{formData.pesan}&rdquo;</p>
                  </div>

                  <button
                    onClick={resetForm}
                    className="px-6 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors cursor-pointer"
                  >
                    Kirim Pesan Lainnya
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
