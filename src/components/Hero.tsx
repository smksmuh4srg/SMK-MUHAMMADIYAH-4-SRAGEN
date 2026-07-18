/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { ArrowRight, GraduationCap, Users, Award, ShieldCheck, BookmarkCheck, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { useContent } from "../context/ContentContext";
import schoolHeroImg from "../assets/images/school_hero_campus_1784355094217.jpg";
import { motion, AnimatePresence } from "motion/react";

interface HeroProps {
  onLearnMore: () => void;
  onRegister: () => void;
}

const categoryDetails = {
  Praktek: {
    label: "Praktek Kejuruan",
    desc: "Pembelajaran vokasi berbasis kompetensi industri dengan alat modern & standar kerja nyata.",
    bgColor: "bg-emerald-500",
    textColor: "text-emerald-500",
    lightBg: "bg-emerald-50/50"
  },
  Fasilitas: {
    label: "Fasilitas & Sarana",
    desc: "Gedung modern, laboratorium canggih, masjid sekolah, dan sarana olahraga lengkap.",
    bgColor: "bg-blue-500",
    textColor: "text-blue-500",
    lightBg: "bg-blue-50/50"
  },
  Eskul: {
    label: "Ekstrakurikuler",
    desc: "Melatih kepemimpinan, bakat, minat, seni, olahraga, dan kepanduan Hizbul Wathan.",
    bgColor: "bg-amber-500",
    textColor: "text-amber-500",
    lightBg: "bg-amber-50/50"
  },
  Kegiatan: {
    label: "Kegiatan Islami & Sosial",
    desc: "Pembiasaan ibadah harian, kajian keislaman, tadarus, dan kunjungan industri rutin.",
    bgColor: "bg-violet-500",
    textColor: "text-violet-500",
    lightBg: "bg-violet-50/50"
  },
  Prestasi: {
    label: "Prestasi Siswa",
    desc: "Apresiasi atas torehan juara lomba kompetensi, seni, akademik, dan olahraga tingkat nasional.",
    bgColor: "bg-rose-500",
    textColor: "text-rose-500",
    lightBg: "bg-rose-50/50"
  }
};

export default function Hero({ onLearnMore, onRegister }: HeroProps) {
  const { schoolInfo, gallery = [] } = useContent();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying || gallery.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % gallery.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, gallery.length]);

  const stats = [
    { label: "Siswa Aktif", value: "850+", icon: Users, color: "text-hijau-primary bg-hijau-light/70" },
    { label: "Akreditasi BAN-SM", value: `A (Unggul)`, icon: ShieldCheck, color: "text-oranye-primary bg-oranye-light/70" },
    { label: "Guru & Asesor", value: "48+", icon: Award, color: "text-hijau-primary bg-hijau-light/70" },
    { label: "Peluang Kerja & Kuliah", value: "96%", icon: BookmarkCheck, color: "text-oranye-primary bg-oranye-light/70" },
  ];

  return (
    <section
      id="home"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden school-gradient-bg"
    >
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-gradient-to-b from-hijau-light/30 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-gradient-to-t from-oranye-light/20 to-transparent rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content Left */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left" id="hero-left">
            {/* Tagline / Subtitle */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 self-center lg:self-start bg-hijau-light text-hijau-primary rounded-full text-xs font-semibold tracking-wide mb-6 shadow-xs border border-hijau-secondary/10" id="hero-badge">
              <span className="flex h-2 w-2 rounded-full bg-oranye-primary animate-ping" />
              Sistem Penerimaan Murid Baru (SPMB) 2026/2027 Dibuka
            </div>

            {/* School Name */}
            <h1 className="tracking-tight leading-none" id="hero-title">
              <span className="text-xl sm:text-2xl md:text-3.5xl font-medium text-slate-500 tracking-wide block mb-0.5 leading-none">
                Selamat datang
              </span>
              <span className="text-4xl sm:text-5xl md:text-6.5xl font-black text-hijau-primary block uppercase leading-[1.05]">
                {schoolInfo.nama}
              </span>
            </h1>

            {/* Sub-tagline */}
            <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto lg:mx-0" id="hero-description">
              {schoolInfo.tagline}. Mencetak generasi muda yang <span className="text-oranye-primary font-bold">Terampil</span>, memiliki{" "}
              <span className="text-hijau-primary font-bold">Karakter Islami</span> kuat, unggul secara iptek, dan siap bersaing di dunia kerja maupun perguruan tinggi.
            </p>

            {/* Action buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start" id="hero-actions">
              <button
                onClick={onLearnMore}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-hijau-primary hover:bg-hijau-secondary text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
                id="hero-btn-primary"
              >
                Kenali Kami
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={onRegister}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-oranye-pastel text-oranye-primary border-2 border-oranye-light font-semibold rounded-xl shadow-sm hover:shadow transition-all transform hover:-translate-y-0.5 cursor-pointer"
                id="hero-btn-secondary"
              >
                <GraduationCap className="w-5 h-5 text-oranye-primary" />
                Daftar SPMB Online
              </button>
            </div>
          </div>

          {/* Hero Slideshow Right */}
          <div className="lg:col-span-5 flex flex-col justify-center" id="hero-right">
            <div className="relative w-full max-w-md lg:max-w-none bg-white p-4.5 rounded-3xl shadow-xl border border-slate-100 flex flex-col" id="hero-slideshow-wrapper">
              
              {/* Photo Slideshow Frame with Aspect Ratio */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-inner bg-slate-50 group">
                <AnimatePresence mode="wait">
                  {gallery.length > 0 ? (
                    <motion.div
                      key={currentSlideIndex}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <img
                        src={gallery[currentSlideIndex].imageUrl}
                        alt={gallery[currentSlideIndex].title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ) : (
                    <img
                      src={schoolHeroImg}
                      alt="SMK Muhammadiyah 4 Sragen Campus"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  )}
                </AnimatePresence>

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

                {/* Top Overlay Badges */}
                {gallery.length > 0 && (
                  <div className="absolute top-3 left-3 flex gap-2 items-center z-10">
                    <span className={`text-[10px] font-extrabold px-3 py-1.5 text-white rounded-lg shadow-sm uppercase tracking-wider flex items-center gap-1.5 ${
                      categoryDetails[gallery[currentSlideIndex].category as keyof typeof categoryDetails]?.bgColor || "bg-hijau-primary"
                    }`}>
                      <span className="h-1.5 w-1.5 bg-white rounded-full animate-pulse" />
                      {gallery[currentSlideIndex].category}
                    </span>
                  </div>
                )}

                {/* Manual Navigation Controls */}
                {gallery.length > 1 && (
                  <>
                    <button
                      onClick={() => {
                        setCurrentSlideIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
                        setIsPlaying(false);
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/90 hover:bg-white text-slate-800 rounded-full shadow-md backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all cursor-pointer duration-200"
                      title="Sebelumnya"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        setCurrentSlideIndex((prev) => (prev + 1) % gallery.length);
                        setIsPlaying(false);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/90 hover:bg-white text-slate-800 rounded-full shadow-md backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all cursor-pointer duration-200"
                      title="Berikutnya"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Play/Pause Button */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute bottom-3 right-3 w-8 h-8 flex items-center justify-center bg-black/40 hover:bg-black/60 text-white rounded-lg backdrop-blur-xs transition-colors cursor-pointer text-xs z-10"
                  title={isPlaying ? "Jeda Otomatis" : "Putar Otomatis"}
                >
                  {isPlaying ? (
                    <span className="flex items-center gap-1">
                      <Pause className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-bold tracking-wide pr-0.5">AUTO</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Play className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-bold tracking-wide pr-0.5">PAUSED</span>
                    </span>
                  )}
                </button>
              </div>

              {/* Photo Caption Details (No Tag selection or Tag description) */}
              <div className="mt-4 flex-1 flex flex-col justify-between">
                {gallery.length > 0 ? (
                  <>
                    <div>
                      <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 mb-3">
                        {/* Specific Image Title & Description */}
                        <h4 className="font-extrabold text-slate-800 text-sm leading-snug">
                          {gallery[currentSlideIndex].title}
                        </h4>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed mt-2 line-clamp-3">
                          {gallery[currentSlideIndex].description}
                        </p>
                      </div>
                    </div>

                    {/* Progress Dots */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-50">
                      <span className="text-[10px] font-bold text-slate-400 font-mono">
                        FOTO {currentSlideIndex + 1} / {gallery.length}
                      </span>
                      <div className="flex gap-1">
                        {gallery.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setCurrentSlideIndex(idx);
                              setIsPlaying(false);
                            }}
                            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                              idx === currentSlideIndex
                                ? "w-4.5 bg-hijau-primary"
                                : "w-1.5 bg-slate-200 hover:bg-slate-300"
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-6 text-slate-400 text-xs font-bold">
                    Mengunduh data galeri...
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* School Stats Section */}
        <div className="mt-20 lg:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6" id="hero-stats">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-5 md:p-6 rounded-2xl border border-slate-100 card-shadow hover:translate-y-[-4px] transition-all duration-300 flex flex-col items-center text-center sm:items-start sm:text-left"
            >
              <div className={`p-3 rounded-xl mb-4 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <p className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">{stat.value}</p>
              <p className="text-xs md:text-sm font-semibold text-slate-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

