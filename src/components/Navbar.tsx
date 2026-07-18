/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Menu, X, PhoneCall, GraduationCap } from "lucide-react";
import SchoolLogo from "./SchoolLogo";

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "Beranda", id: "home" },
    { label: "Tentang Kami", id: "about" },
    { label: "Visi & Misi", id: "visimisi" },
    { label: "Program Keahlian", id: "programs" },
    { label: "Galeri", id: "gallery" },
    { label: "Kontak", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
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
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-hijau-light shadow-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="nav-container">
        <div className="flex items-center justify-between h-16" id="nav-row">
          {/* Logo & Branding */}
          <button
            onClick={() => handleNavClick("home")}
            className="focus:outline-none transition-transform hover:scale-102"
            id="brand-logo-btn"
          >
            <SchoolLogo size="md" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" id="desktop-menu">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer ${
                  activeSection === item.id
                    ? "text-hijau-primary bg-hijau-light/50"
                    : "text-slate-600 hover:text-hijau-primary hover:bg-slate-50"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-oranye-primary rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Call to Action Buttons */}
          <div className="hidden lg:flex items-center gap-3" id="nav-actions">
            <a
              href="https://wa.me/6281234567890?text=Halo%20SMK%20Muhammadiyah%204%20Sragen%2C%20saya%20ingin%20bertanya%20mengenai%20penerimaan%20siswa%20baru..."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-oranye-primary hover:text-oranye-dark bg-oranye-pastel border border-oranye-light px-3 py-2 rounded-lg transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Tanya Admin
            </a>
            <button
              onClick={() => handleNavClick("contact")}
              className="flex items-center gap-1.5 text-xs font-semibold text-white bg-hijau-primary hover:bg-hijau-secondary px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all"
            >
              <GraduationCap className="w-4 h-4" />
              PPDB 2026/2027
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden" id="mobile-menu-toggle">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-hijau-primary hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden animate-in fade-in slide-in-from-top duration-200" id="mobile-drawer">
          <div className="px-4 pt-2 pb-6 space-y-2 bg-white border-b border-slate-100 shadow-lg">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  activeSection === item.id
                    ? "text-hijau-primary bg-hijau-light font-semibold"
                    : "text-slate-600 hover:text-hijau-primary hover:bg-slate-50"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/6281234567890?text=Halo%20SMK%20Muhammadiyah%204%20Sragen..."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full text-sm font-semibold text-oranye-primary bg-oranye-pastel border border-oranye-light px-4 py-3 rounded-xl hover:bg-oranye-light transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                Hubungi Kami via WA
              </a>
              <button
                onClick={() => handleNavClick("contact")}
                className="flex items-center justify-center gap-2 w-full text-sm font-semibold text-white bg-hijau-primary px-4 py-3 rounded-xl hover:bg-hijau-secondary shadow transition-all"
              >
                <GraduationCap className="w-4 h-4" />
                Daftar PPDB Online
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
