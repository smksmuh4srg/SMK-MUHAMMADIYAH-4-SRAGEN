/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ArrowRight, GraduationCap, Users, Award, ShieldCheck, BookmarkCheck } from "lucide-react";
import { useContent } from "../context/ContentContext";
import schoolHeroImg from "../assets/images/school_hero_campus_1784355094217.jpg";

interface HeroProps {
  onLearnMore: () => void;
  onRegister: () => void;
}

export default function Hero({ onLearnMore, onRegister }: HeroProps) {
  const { schoolInfo } = useContent();
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

          {/* Hero Image Right */}
          <div className="lg:col-span-5 flex justify-center" id="hero-right">
            <div className="relative w-full max-w-md lg:max-w-none group" id="hero-image-wrapper">
              {/* Oranye Background Accent Frame */}
              <div className="absolute inset-0 bg-gradient-to-tr from-oranye-primary to-oranye-secondary rounded-3xl transform rotate-3 scale-102 opacity-80 blur-xs group-hover:rotate-1 transition-all duration-300" />
              
              {/* Image Frame */}
              <div className="relative bg-white p-2.5 rounded-3xl shadow-xl overflow-hidden transform group-hover:scale-101 transition-all duration-300">
                <img
                  src={schoolHeroImg}
                  alt="SMK Muhammadiyah 4 Sragen Campus"
                  referrerPolicy="no-referrer"
                  className="w-full h-[280px] sm:h-[350px] lg:h-[400px] object-cover rounded-2xl"
                />
                
                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-slate-100/50 flex items-center gap-3">
                  <div className="bg-oranye-pastel p-2.5 rounded-lg">
                    <GraduationCap className="w-6 h-6 text-oranye-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Bimbingan Karier</p>
                    <p className="text-sm font-bold text-slate-800">MoU dengan 20+ Industri</p>
                  </div>
                </div>
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
