/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import * as LucideIcons from "lucide-react";
import { PROGRAMS_DATA } from "../data";
import { ProgramKeahlian } from "../types";

export default function Programs() {
  const [activeTabId, setActiveTabId] = useState<string>("tkj");

  // Dynamic Lucide icon helper
  const renderIcon = (iconName: string, className: string) => {
    // Dynamically retrieve the component from all Lucide imports
    const IconComponent = (LucideIcons as any)[iconName];
    if (IconComponent) {
      return <IconComponent className={className} />;
    }
    return <LucideIcons.BookOpen className={className} />;
  };

  const selectedProgram = PROGRAMS_DATA.find((p) => p.id === activeTabId) || PROGRAMS_DATA[0];

  return (
    <section id="programs" className="py-20 md:py-28 bg-white scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="programs-header">
          <h2 className="text-xs font-bold tracking-widest text-oranye-primary uppercase mb-2">Program Studi</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Program Keahlian Unggulan
          </p>
          <p className="text-slate-500 mt-3 text-sm sm:text-base font-medium">
            Kurikulum berbasis industri modern yang dirancang untuk membina keterampilan vokasional siap kerja.
          </p>
          <div className="h-1.5 w-20 bg-hijau-secondary mx-auto mt-4 rounded-full" />
        </div>

        {/* Tab Selector buttons */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12" id="programs-tabs">
          {PROGRAMS_DATA.map((program) => (
            <button
              key={program.id}
              onClick={() => setActiveTabId(program.id)}
              className={`flex items-center gap-2 px-5 py-3.5 rounded-2xl text-sm md:text-base font-bold transition-all cursor-pointer ${
                activeTabId === program.id
                  ? "bg-hijau-primary text-white shadow-md scale-102"
                  : "bg-slate-50 text-slate-600 hover:text-hijau-primary hover:bg-hijau-light/40 border border-slate-100"
              }`}
            >
              {renderIcon(program.iconName, "w-5 h-5")}
              <span className="hidden sm:inline">{program.nama}</span>
              <span className="sm:hidden">{program.singkatan}</span>
            </button>
          ))}
        </div>

        {/* Selected Major detail panel */}
        <div
          key={selectedProgram.id}
          className="bg-slate-50/50 border border-slate-100 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 animate-in fade-in slide-in-from-bottom duration-300"
          id="program-details-panel"
        >
          {/* Left Column: Cover & Core Features */}
          <div className="lg:col-span-5 flex flex-col justify-between" id="program-panel-left">
            <div className="space-y-6">
              {/* Badge & Title */}
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-oranye-primary bg-oranye-light px-3 py-1 rounded-full border border-oranye-light mb-3">
                  {renderIcon(selectedProgram.iconName, "w-3.5 h-3.5")}
                  Program {selectedProgram.singkatan}
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  {selectedProgram.nama}
                </h3>
              </div>

              {/* Cover Image */}
              <div className="relative rounded-2xl overflow-hidden aspect-video shadow-sm border border-slate-200">
                <img
                  src={selectedProgram.bannerUrl}
                  alt={selectedProgram.nama}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-500"
                />
              </div>

              {/* Mini paragraph description */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {selectedProgram.deskripsiLengkap}
              </p>
            </div>
          </div>

          {/* Right Column: Keunggulan, Silabus, Karir */}
          <div className="lg:col-span-7 space-y-8" id="program-panel-right">
            
            {/* 1. Keunggulan Jurusan */}
            <div>
              <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                <LucideIcons.ShieldAlert className="w-4 h-4 text-hijau-primary" />
                Keunggulan Jurusan
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="program-advantages">
                {selectedProgram.keunggulan.map((keunggulan, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start bg-white p-3 rounded-xl border border-slate-100">
                    <LucideIcons.CheckCircle className="w-5 h-5 text-hijau-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-700 leading-tight">{keunggulan}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Materi Pembelajaran Pokok */}
            <div>
              <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                <LucideIcons.BookOpenText className="w-4 h-4 text-hijau-primary" />
                Materi Pokok & Keahlian
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" id="program-curriculum">
                {selectedProgram.materiPokok.map((materi, idx) => (
                  <div key={idx} className="flex gap-2 items-center text-xs sm:text-sm text-slate-600 font-medium">
                    <div className="h-1.5 w-1.5 bg-oranye-primary rounded-full" />
                    <span>{materi}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Prospek Lulusan / Karir */}
            <div>
              <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                <LucideIcons.Briefcase className="w-4 h-4 text-hijau-primary" />
                Prospek Karir & Masa Depan
              </h4>
              <div className="flex flex-wrap gap-2" id="program-careers">
                {selectedProgram.prospekKarir.map((karir, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold text-slate-700 bg-white border border-slate-100 rounded-xl px-3 py-2 flex items-center gap-1.5 shadow-2xs hover:border-oranye-light hover:bg-oranye-pastel/30 transition-colors"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-hijau-secondary" />
                    {karir}
                  </span>
                ))}
              </div>
            </div>

            {/* PPDB Button call */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs text-slate-400 font-medium">Tertarik bergabung dengan program ini?</p>
                <p className="text-sm font-bold text-slate-700">Daftar sekarang sebelum kuota kelas terpenuhi.</p>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-xs font-bold text-white bg-oranye-primary hover:bg-oranye-secondary px-5 py-3 rounded-xl transition-all shadow-sm hover:shadow"
              >
                Hubungi Konsultasi Jurusan
                <LucideIcons.ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
