/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Lightbulb, Target, Sparkles, Star, Milestone } from "lucide-react";
import { SCHOOL_INFO } from "../data";

export default function VisiMisi() {
  const misiList = [
    "Menyelenggarakan proses pembelajaran yang berbasis iman, takwa, dan akhlakul karimah secara konsisten untuk melahirkan kader persyarikatan yang religius.",
    "Meningkatkan kompetensi keahlian dan penguasaan iptek siswa melalui model pengajaran modern yang disesuaikan dengan tuntutan dunia kerja global.",
    "Mengembangkan kurikulum sekolah (Link & Match) secara berkelanjutan bersama mitra dunia usaha dan dunia industri (DUDI).",
    "Membekali siswa dengan jiwa kepemimpinan, wirausaha (entrepreneurship), dan kemandirian ekonomi yang tangguh.",
    "Menyelenggarakan tata kelola sekolah yang profesional, dinamis, transparan, akuntabel, dan berbasis digital."
  ];

  const goals = [
    { title: "Kualitas Akademis", text: "Lulusan menguasai teori dasar dan keterampilan praktis berkualitas tinggi." },
    { title: "Kepribadian Islami", text: "Terbentuknya akhlak mulia dan kedisiplinan ibadah sehari-hari." },
    { title: "Kesiapan Kerja", text: "Lulusan siap terserap langsung di industri besar maupun mandiri berwirausaha." },
  ];

  return (
    <section id="visimisi" className="py-20 md:py-28 bg-hijau-pastel/30 border-t border-b border-hijau-light/30 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="visi-header">
          <h2 className="text-xs font-bold tracking-widest text-oranye-primary uppercase mb-2">Arah Pendidikan</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Visi, Misi, dan Tujuan Sekolah
          </p>
          <div className="h-1.5 w-20 bg-oranye-secondary mx-auto mt-4 rounded-full" />
        </div>

        {/* Visi & Misi Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="visi-misi-grid">
          
          {/* VISI CARD (Left/Top) */}
          <div className="lg:col-span-5 flex flex-col justify-start" id="visi-card-wrapper">
            <div className="sticky top-28 bg-white border border-hijau-light rounded-3xl p-8 card-shadow flex flex-col h-full justify-between" id="visi-card">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-wider text-hijau-primary bg-hijau-light px-3 py-1.5 rounded-xl mb-6">
                  <Lightbulb className="w-4 h-4 text-hijau-primary animate-pulse" />
                  VISI SEKOLAH
                </div>

                <blockquote className="relative">
                  {/* Styled quotation marks */}
                  <span className="absolute -top-6 -left-4 text-7xl text-hijau-light/80 font-serif leading-none select-none">&ldquo;</span>
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-800 leading-snug tracking-tight relative z-10 pl-2">
                    Terwujudnya lulusan yang <span className="text-hijau-primary">Berakhlak Mulia</span>, Unggul dalam Prestasi,{" "}
                    <span className="text-oranye-primary">Terampil di Bidang Iptek</span>, Mandiri, dan Siap Kerja.
                  </p>
                  <span className="absolute -bottom-14 right-2 text-7xl text-hijau-light/80 font-serif leading-none select-none">&rdquo;</span>
                </blockquote>
              </div>

              {/* Extra visual decoration: values checklist */}
              <div className="mt-14 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4" id="visi-values">
                <div className="flex items-center gap-2">
                  <Star className="w-4.5 h-4.5 text-oranye-primary fill-oranye-primary" />
                  <span className="text-sm font-bold text-slate-700">Religius</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4.5 h-4.5 text-oranye-primary fill-oranye-primary" />
                  <span className="text-sm font-bold text-slate-700">Kompeten</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4.5 h-4.5 text-oranye-primary fill-oranye-primary" />
                  <span className="text-sm font-bold text-slate-700">Mandiri</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4.5 h-4.5 text-oranye-primary fill-oranye-primary" />
                  <span className="text-sm font-bold text-slate-700">Berdaya Saing</span>
                </div>
              </div>
            </div>
          </div>

          {/* MISI CARD (Right/Bottom) */}
          <div className="lg:col-span-7 flex flex-col justify-start" id="misi-card-wrapper">
            <div className="bg-white border border-slate-100 rounded-3xl p-8 card-shadow" id="misi-card">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-wider text-oranye-primary bg-oranye-light px-3 py-1.5 rounded-xl mb-6">
                <Target className="w-4 h-4 text-oranye-primary" />
                MISI SEKOLAH
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6">Langkah-Langkah Strategis Kami</h3>
              
              <div className="space-y-6" id="misi-items-list">
                {misiList.map((misi, index) => (
                  <div
                    key={index}
                    className="flex gap-4 items-start group hover:bg-slate-55/20 p-2 rounded-xl transition-colors"
                  >
                    {/* Circle number */}
                    <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-hijau-light border border-hijau-secondary/15 flex items-center justify-center font-bold text-hijau-primary text-sm shadow-2xs group-hover:bg-oranye-primary group-hover:text-white group-hover:border-oranye-primary transition-all">
                      {index + 1}
                    </div>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-0.5 group-hover:text-slate-800 transition-colors">
                      {misi}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Goals / Tujuan Section inside VisiMisi */}
        <div className="mt-16 bg-white border border-slate-100 rounded-3xl p-8 shadow-xs" id="school-goals">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-oranye-light text-oranye-primary">
                <Milestone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">Tujuan Strategis Pendidikan</h3>
                <p className="text-xs text-slate-500 font-medium">Target capaian kualitas SMK Muhammadiyah 4 Sragen</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {goals.map((goal, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 hover:bg-hijau-pastel/10 hover:border-hijau-light border border-transparent transition-all">
                <div className="h-2 w-10 bg-hijau-secondary rounded-full mb-4" />
                <h4 className="font-bold text-slate-800 mb-2 text-base">{goal.title}</h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{goal.text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
