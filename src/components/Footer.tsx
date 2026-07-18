/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Facebook, Instagram, Youtube, Send, ArrowUp, Mail, Phone, MapPin } from "lucide-react";
import { useContent } from "../context/ContentContext";
import SchoolLogo from "./SchoolLogo";

interface FooterProps {
  onScrollToTop: () => void;
}

export default function Footer({ onScrollToTop }: FooterProps) {
  const { schoolInfo } = useContent();
  const currentYear = new Date().getFullYear();

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-850" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800" id="footer-grid">
          
          {/* Column 1: Logo and Brief (4/12 width) */}
          <div className="lg:col-span-5 space-y-6" id="footer-brand-column">
            <div className="bg-white/5 p-2 rounded-2xl inline-block" id="footer-logo-wrapper">
              <SchoolLogo size="md" textColorClass="text-white" />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              {schoolInfo.nama} menyelenggarakan pendidikan vokasi terakreditasi {schoolInfo.akreditasi} yang unggul, bermartabat, berlandaskan akidah Islamiyah, serta berorientasi penuh pada kesiapan kerja abad ke-21.
            </p>
            
            {/* Social Media Links */}
            <div className="flex items-center gap-3" id="footer-socials">
              <a
                href={`https://wa.me/${schoolInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-xl bg-slate-800 hover:bg-hijau-primary hover:text-white flex items-center justify-center transition-colors shadow-2xs"
                aria-label="WhatsApp"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-xl bg-slate-800 hover:bg-oranye-primary hover:text-white flex items-center justify-center transition-colors shadow-2xs"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-xl bg-slate-800 hover:bg-red-600 hover:text-white flex items-center justify-center transition-colors shadow-2xs"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-xl bg-slate-800 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors shadow-2xs"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (3/12 width) */}
          <div className="lg:col-span-3 space-y-6" id="footer-nav-column">
            <h4 className="text-white text-xs font-extrabold uppercase tracking-widest border-l-2 border-oranye-primary pl-3">Navigasi Cepat</h4>
            <ul className="space-y-2.5 text-sm font-semibold" id="footer-nav-list">
              {[
                { label: "Beranda Utama", id: "home" },
                { label: "Tentang Sekolah", id: "about" },
                { label: "Visi & Misi Kami", id: "visimisi" },
                { label: "Program Keahlian", id: "programs" },
                { label: "Galeri Dokumentasi", id: "gallery" },
                { label: "Hubungi Kontak", id: "contact" },
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className="hover:text-hijau-secondary text-slate-400 transition-colors cursor-pointer text-left focus:outline-none"
                  >
                    &rsaquo; {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Info (4/12 width) */}
          <div className="lg:col-span-4 space-y-6" id="footer-contact-column">
            <h4 className="text-white text-xs font-extrabold uppercase tracking-widest border-l-2 border-hijau-secondary pl-3">Hubungi Sekolah</h4>
            <ul className="space-y-4 text-xs sm:text-sm text-slate-400" id="footer-contact-list">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-hijau-secondary flex-shrink-0" />
                <span className="font-semibold leading-relaxed">{schoolInfo.alamat}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-oranye-primary flex-shrink-0" />
                <span className="font-bold">{schoolInfo.telepon}</span>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-hijau-secondary flex-shrink-0" />
                <span className="font-semibold">{schoolInfo.email}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright section */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500" id="footer-bottom">
          <div className="text-center md:text-left">
            <p>&copy; {currentYear} {schoolInfo.nama}. Hak Cipta Dilindungi Undang-Undang.</p>
            <p className="mt-1 text-[10px] text-slate-600 uppercase tracking-wide">
              NPSN: {schoolInfo.npsn} | Akreditasi: {schoolInfo.akreditasi} | <a href="#admin" className="hover:text-hijau-secondary underline transition-colors">Panel Admin</a>
            </p>
          </div>

          {/* Scroll to top button */}
          <button
            onClick={onScrollToTop}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-800 text-slate-300 hover:text-white rounded-xl border border-slate-750 transition-colors shadow-sm hover:border-slate-700 cursor-pointer"
            aria-label="Kembali ke atas"
            id="back-to-top-btn"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
