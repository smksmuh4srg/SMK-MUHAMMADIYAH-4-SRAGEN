/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Maximize2, X, ChevronLeft, ChevronRight, Calendar, Tag } from "lucide-react";
import { GALLERY_DATA } from "../data";
import { GalleryItem } from "../types";

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleNavFilter = (e: Event) => {
      const category = (e as CustomEvent).detail;
      if (category) {
        setSelectedCategory(category);
      }
    };
    window.addEventListener("nav-filter-gallery", handleNavFilter);
    return () => window.removeEventListener("nav-filter-gallery", handleNavFilter);
  }, []);

  const categories = ["Semua", "Praktek", "Fasilitas", "Eskul", "Kegiatan", "Prestasi"];

  // Filter items based on active category
  const filteredItems = selectedCategory === "Semua"
    ? GALLERY_DATA
    : GALLERY_DATA.filter((item) => item.category === selectedCategory);

  const openLightbox = (item: GalleryItem) => {
    // Find index of clicked item in the filtered list
    const index = GALLERY_DATA.findIndex((g) => g.id === item.id);
    if (index !== -1) {
      setLightboxIndex(index);
    }
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % GALLERY_DATA.length);
    }
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + GALLERY_DATA.length) % GALLERY_DATA.length);
    }
  };

  const activeLightboxItem = lightboxIndex !== null ? GALLERY_DATA[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-20 md:py-28 bg-hijau-pastel/20 border-t border-b border-hijau-light/30 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 slowmo-reveal" id="gallery-header">
          <h2 className="text-xs font-bold tracking-widest text-oranye-primary uppercase mb-2">Dokumentasi</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Galeri Kegiatan & Fasilitas
          </p>
          <p className="text-slate-500 mt-3 text-sm sm:text-base font-medium">
            Sekilas potret keseruan proses belajar mengajar, sarana prasarana, serta tradisi kejuaraan siswa kami.
          </p>
          <div className="h-1.5 w-20 bg-oranye-secondary mx-auto mt-4 rounded-full" />
        </div>

        {/* Filter Tab Row */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 slowmo-reveal" id="gallery-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4.5 py-2 rounded-xl text-xs sm:text-sm font-bold border cursor-pointer transition-all ${
                selectedCategory === cat
                  ? "bg-oranye-primary text-white border-oranye-primary shadow-xs scale-102"
                  : "bg-white text-slate-600 hover:text-oranye-primary hover:bg-oranye-pastel/30 border-slate-200/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 slowmo-reveal" id="gallery-grid">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item)}
              className="group relative bg-white border border-slate-100 rounded-2xl overflow-hidden cursor-pointer card-shadow hover:translate-y-[-4px] transition-all duration-300"
            >
              {/* Image box */}
              <div className="relative aspect-4/3 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform group-hover:scale-104 transition-transform duration-500"
                />
                
                {/* Dark Hover overlay */}
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/90 p-3 rounded-full shadow-md text-slate-800 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 className="w-5 h-5 text-hijau-primary" />
                  </div>
                </div>

                {/* Category badge floating */}
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-hijau-primary text-[10px] font-extrabold px-2.5 py-1 rounded-md shadow-2xs uppercase">
                  {item.category}
                </span>
              </div>

              {/* Text caption box */}
              <div className="p-4.5">
                <h4 className="font-bold text-slate-800 text-sm sm:text-base group-hover:text-hijau-primary transition-colors line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed font-medium">
                  {item.description}
                </p>
                {item.date && (
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400 mt-3 pt-3 border-t border-slate-50">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty state filter */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-slate-400 font-semibold" id="gallery-empty">
            Tidak ada foto dalam kategori ini.
          </div>
        )}

        {/* LIGHTBOX MODAL POPUP */}
        {activeLightboxItem && (
          <div
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-sm flex flex-col items-center justify-center p-4"
            onClick={closeLightbox}
            id="gallery-lightbox"
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-3 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors"
              aria-label="Tutup"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left/Prev Arrow */}
            <button
              onClick={showPrev}
              className="absolute left-4 p-3 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors hidden md:block"
              aria-label="Sebelumnya"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Image display */}
            <div
              className="max-w-4xl w-full max-h-[70vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeLightboxItem.imageUrl}
                alt={activeLightboxItem.title}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Right/Next Arrow */}
            <button
              onClick={showNext}
              className="absolute right-4 p-3 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors hidden md:block"
              aria-label="Selanjutnya"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Caption Box */}
            <div
              className="mt-6 max-w-2xl w-full bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-center gap-4 text-xs text-slate-400 mb-2">
                <span className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-md text-oranye-primary font-bold uppercase text-[10px]">
                  <Tag className="w-3 h-3" />
                  {activeLightboxItem.category}
                </span>
                {activeLightboxItem.date && (
                  <span className="flex items-center gap-1 font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    {activeLightboxItem.date}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{activeLightboxItem.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                {activeLightboxItem.description}
              </p>
              
              {/* Mobile next/prev navigations */}
              <div className="flex items-center justify-center gap-6 mt-4 md:hidden">
                <button
                  onClick={showPrev}
                  className="p-2.5 bg-slate-800 text-white rounded-xl hover:bg-slate-700"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs text-slate-400 font-semibold">
                  {lightboxIndex! + 1} / {GALLERY_DATA.length}
                </span>
                <button
                  onClick={showNext}
                  className="p-2.5 bg-slate-800 text-white rounded-xl hover:bg-slate-700"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
