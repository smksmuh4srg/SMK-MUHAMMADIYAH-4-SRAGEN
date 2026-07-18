/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { BookOpen, Award, Shield, UserCheck, Heart, Sparkles, Quote, GraduationCap } from "lucide-react";
import { SCHOOL_INFO, TESTIMONIALS_DATA } from "../data";

export default function About() {
  const pillars = [
    {
      icon: Shield,
      title: "Pendidikan Karakter Islami",
      description: "Pembekalan akidah dan akhlak mulia melalui program pembiasaan ibadah harian, kajian keislaman ortom Muhammadiyah, dan bimbingan rohani terarah.",
      colorClass: "bg-hijau-light text-hijau-primary",
    },
    {
      icon: Award,
      title: "Kurikulum Link & Match",
      description: "Kurikulum teori dan praktik disinkronisasi penuh dengan standar kompetensi industri terkemuka (Astra, Telkom) demi memastikan kesiapan kerja maksimal.",
      colorClass: "bg-oranye-light text-oranye-primary",
    },
    {
      icon: Sparkles,
      title: "Fasilitas Belajar Unggul",
      description: "Laboratorium komputer berstandar industri, bengkel otomotif bersertifikasi resmi, perpustakaan digital, serta lingkungan kelas kondusif full AC.",
      colorClass: "bg-hijau-light text-hijau-primary",
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-white scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 slowmo-reveal" id="about-header">
          <h2 className="text-xs font-bold tracking-widest text-oranye-primary uppercase mb-2">Tentang Kami</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Mengenal Lebih Dekat {SCHOOL_INFO.nama}
          </p>
          <div className="h-1.5 w-20 bg-hijau-secondary mx-auto mt-4 rounded-full" />
        </div>

        {/* Core Description: Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16 slowmo-reveal" id="about-content">
          
          {/* Column Left: Text Description */}
          <div className="lg:col-span-7 space-y-6" id="about-left">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 leading-snug">
              Menghadirkan Pendidikan Vokasi yang Relevan, Berakhlak, dan Inovatif Sejak Tahun {SCHOOL_INFO.tahunBerdiri}
            </h3>
            <p className="text-slate-600 leading-relaxed">
              <strong>SMK Muhammadiyah 4 Sragen</strong> adalah salah satu lembaga pendidikan kejuruan swasta terkemuka di Sragen, Jawa Tengah. Berdiri di bawah naungan Majelis Pendidikan Dasar dan Menengah Pimpinan Daerah Muhammadiyah Sragen, kami memikul amanah besar untuk membidani lulusan yang unggul lahir batin—kompeten di bidang keahliannya dan memiliki kedalaman spiritual berlandaskan Al-Qur'an dan Sunnah.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Dengan mengandalkan 3 Program Keahlian unggulan (TKJ, TKRO, AKL), kami terus melakukan transformasi kurikulum, mematangkan uji sertifikasi kompetensi mandiri, serta mempererat jejaring kemitraan kerja dengan puluhan dunia usaha dan dunia industri (DUDI) di tingkat lokal maupun nasional.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100" id="about-metrics">
              <div>
                <p className="text-3xl font-extrabold text-hijau-primary">25+</p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Tahun Mengabdi</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-oranye-primary">3.000+</p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Alumni Tersebar</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-hijau-primary">100%</p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Sertifikasi BNSP</p>
              </div>
            </div>
          </div>

          {/* Column Right: Kepala Sekolah Letter / Card */}
          <div className="lg:col-span-5 scroll-mt-28" id="sambutan">
            <div className="relative bg-hijau-pastel/40 border border-hijau-light rounded-3xl p-6 sm:p-8 card-shadow" id="sambutan-card">
              {/* Corner accent */}
              <div className="absolute top-4 right-4 text-hijau-secondary/15">
                <BookOpen className="w-20 h-20" />
              </div>

              {/* Speech bubble styling */}
              <div className="relative space-y-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-hijau-primary bg-white px-3 py-1 rounded-full border border-hijau-light shadow-2xs">
                  <UserCheck className="w-3.5 h-3.5" />
                  Sambutan Kepala Sekolah
                </div>
                
                <p className="text-slate-700 italic text-sm sm:text-base leading-relaxed">
                  &ldquo;Selamat datang di laman resmi SMK Muhammadiyah 4 Sragen. Kami berkomitmen mewujudkan generasi cerdas, berketerampilan mumpuni, serta berjiwa mulia yang siap bersaing menyambut era globalisasi tanpa kehilangan jati diri sebagai hamba Allah.&rdquo;
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-hijau-light/60">
                  <div className="h-14 w-14 rounded-full bg-slate-200 border-2 border-hijau-primary overflow-hidden flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150"
                      alt={SCHOOL_INFO.kepalaSekolah}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm sm:text-base">{SCHOOL_INFO.kepalaSekolah}</h4>
                    <p className="text-xs text-slate-500 font-medium">Kepala {SCHOOL_INFO.nama}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars / Key Advantages Grid */}
        <div className="mt-16 bg-oranye-pastel/30 border border-oranye-light/30 rounded-3xl p-8 lg:p-12 slowmo-reveal" id="about-pillars">
          <div className="max-w-2xl mb-10">
            <h4 className="text-xs font-extrabold tracking-wider text-oranye-primary uppercase mb-2">Pilar Kami</h4>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Kenapa Memilih {SCHOOL_INFO.nama}?
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl border border-slate-100/80 shadow-xs hover:shadow-md transition-all duration-300"
              >
                <div className={`p-3.5 rounded-xl inline-block mb-5 ${pillar.colorClass}`}>
                  <pillar.icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-3">{pillar.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Alumni Testimonials Section */}
        <div className="mt-24 border-t border-slate-100 pt-20 scroll-mt-28 slowmo-reveal" id="alumni">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-oranye-primary uppercase mb-2">Testimoni Alumni</h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Kisah Sukses Lulusan Kami
            </p>
            <p className="text-slate-500 mt-3 text-sm sm:text-base font-medium">
              Dengar langsung cerita para alumni yang kini telah sukses berkarier di industri terkemuka nasional.
            </p>
            <div className="h-1.5 w-16 bg-hijau-secondary mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS_DATA.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-all duration-300 relative flex flex-col justify-between"
              >
                {/* Quote Icon Background */}
                <div className="absolute top-6 right-6 text-slate-100">
                  <Quote className="w-10 h-10 rotate-180" />
                </div>

                <div className="space-y-4 relative z-10">
                  <div className="text-slate-600 italic text-sm leading-relaxed">
                    &ldquo;{testimonial.testimoni}&rdquo;
                  </div>
                </div>

                <div className="flex items-center gap-3.5 pt-6 mt-6 border-t border-slate-100 relative z-10">
                  <div className="h-12 w-12 rounded-full overflow-hidden border border-slate-100 bg-slate-100 flex-shrink-0">
                    <img
                      src={testimonial.avatarUrl}
                      alt={testimonial.nama}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800 text-sm">{testimonial.nama}</h5>
                    <p className="text-xs text-slate-500 font-medium">{testimonial.peran}</p>
                    <div className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-hijau-primary bg-hijau-light/50 px-2 py-0.5 rounded-md">
                      <GraduationCap className="w-3 h-3" />
                      <span>{testimonial.angkatan}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
