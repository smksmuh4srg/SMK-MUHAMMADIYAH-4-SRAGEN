/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Menu, X, PhoneCall, GraduationCap, ChevronDown } from "lucide-react";
import { useContent } from "../context/ContentContext";
import SchoolLogo from "./SchoolLogo";

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const { schoolInfo } = useContent();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);

  const menuItems = [
    { label: "Beranda", id: "home" },
    {
      label: "Profil",
      id: "profil",
      subItems: [
        { label: "Profil Sekolah", id: "about" },
        { label: "Visi & Misi Sekolah", id: "visimisi" },
        { label: "Sambutan Kepala Sekolah", id: "sambutan" }
      ]
    },
    {
      label: "Program Pendidikan",
      id: "program",
      subItems: [
        { label: "Intrakurikuler (Jurusan)", id: "programs" },
        { label: "Ekstrakurikuler", id: "gallery", category: "Eskul" },
        { label: "Prestasi", id: "gallery", category: "Prestasi" }
      ]
    },
    {
      label: "Informasi",
      id: "informasi",
      subItems: [
        { label: "Kegiatan & Berita", id: "gallery", category: "Kegiatan" },
        { label: "Galeri", id: "gallery", category: "Semua" },
        { label: "Alumni", id: "alumni" }
      ]
    },
    {
      label: "SPMB",
      id: "spmb-menu",
      subItems: [
        { label: "Informasi SPMB", id: "spmb-info" },
        { label: "Daftar Online", id: "contact" },
        { label: "Pengumuman", id: "spmb-pengumuman" }
      ]
    }
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

  const slowScrollTo = (targetPosition: number, duration: number = 1500) => {
    const startPosition = window.scrollY || window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const easeInOutQuart = (t: number) => {
      return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
    };

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutQuart(progress);
      
      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

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

      slowScrollTo(offsetPosition, 1600);
    }
  };

  const handleSubItemClick = (subItem: { label: string; id: string; category?: string }) => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setMobileDropdownOpen(null);
    
    if (subItem.category !== undefined) {
      // Dispatch the custom event to filter the gallery
      window.dispatchEvent(new CustomEvent("nav-filter-gallery", { detail: subItem.category }));
    }

    const element = document.getElementById(subItem.id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      slowScrollTo(offsetPosition, 1600);
      setActiveSection(subItem.id);
    }
  };

  const toggleMobileDropdown = (id: string) => {
    if (mobileDropdownOpen === id) {
      setMobileDropdownOpen(null);
    } else {
      setMobileDropdownOpen(id);
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-hijau-light/50 shadow-sm py-2"
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
            <SchoolLogo size="md" showText={false} />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" id="desktop-menu">
            {menuItems.map((item) => {
              if (!item.subItems) {
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id!)}
                    className={`relative px-3 py-2 text-sm font-bold rounded-lg transition-colors duration-200 cursor-pointer ${
                      activeSection === item.id
                        ? "text-hijau-primary bg-hijau-light/40"
                        : "text-slate-600 hover:text-hijau-primary hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-oranye-primary rounded-full" />
                    )}
                  </button>
                );
              }

              const isSubActive = item.subItems.some((sub) => activeSection === sub.id);

              return (
                <div
                  key={item.id}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(item.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-bold rounded-lg transition-colors duration-200 cursor-pointer ${
                      isSubActive
                        ? "text-hijau-primary bg-hijau-light/40"
                        : "text-slate-600 hover:text-hijau-primary hover:bg-slate-50"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-0 mt-1 w-60 bg-white border border-slate-100/80 rounded-xl shadow-lg py-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50 hidden group-hover:block">
                    {item.subItems.map((sub) => (
                      <button
                        key={sub.label}
                        onClick={() => handleSubItemClick(sub)}
                        className={`block w-full text-left px-4 py-2.5 text-xs sm:text-sm font-semibold transition-colors ${
                          activeSection === sub.id
                            ? "text-hijau-primary bg-hijau-light/30"
                            : "text-slate-600 hover:text-hijau-primary hover:bg-slate-50"
                        }`}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Call to Action Buttons */}
          <div className="hidden lg:flex items-center gap-3" id="nav-actions">
            <a
              href={`https://wa.me/${schoolInfo.whatsapp}?text=Halo%20SMK%20Muhammadiyah%204%20Sragen%2C%20saya%20ingin%20bertanya%20mengenai%20penerimaan%20siswa%20baru...`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-oranye-primary hover:text-oranye-dark bg-oranye-pastel border border-oranye-light px-3 py-2 rounded-lg transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Tanya Admin
            </a>
            <button
              onClick={() => handleNavClick("spmb")}
              className="flex items-center gap-1.5 text-xs font-bold text-white bg-hijau-primary hover:bg-hijau-secondary px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all"
            >
              <GraduationCap className="w-4 h-4" />
              Portal SPMB 2026/2027
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
          <div className="px-4 pt-2 pb-6 space-y-2 bg-white border-b border-slate-100 shadow-lg max-h-[80vh] overflow-y-auto">
            {menuItems.map((item) => {
              if (!item.subItems) {
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      handleNavClick(item.id!);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                      activeSection === item.id
                        ? "text-hijau-primary bg-hijau-light font-bold"
                        : "text-slate-700 hover:text-hijau-primary hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              }

              const isOpen = mobileDropdownOpen === item.id;
              const isSubActive = item.subItems.some((sub) => activeSection === sub.id);

              return (
                <div key={item.id} className="space-y-1">
                  <button
                    onClick={() => toggleMobileDropdown(item.id)}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-base font-bold transition-all ${
                      isSubActive
                        ? "text-hijau-primary bg-hijau-light/30"
                        : "text-slate-700 hover:text-hijau-primary hover:bg-slate-50"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180 text-hijau-primary" : "text-slate-400"}`} />
                  </button>
                  
                  {isOpen && (
                    <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50/70 rounded-xl border border-slate-100">
                      {item.subItems.map((sub) => (
                        <button
                          key={sub.label}
                          onClick={() => handleSubItemClick(sub)}
                          className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                            activeSection === sub.id
                              ? "text-hijau-primary bg-hijau-light/40"
                              : "text-slate-600 hover:text-hijau-primary hover:bg-slate-50"
                          }`}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/${schoolInfo.whatsapp}?text=Halo%20SMK%20Muhammadiyah%204%20Sragen...`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full text-sm font-semibold text-oranye-primary bg-oranye-pastel border border-oranye-light px-4 py-3 rounded-xl hover:bg-oranye-light transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                Hubungi Kami via WA
              </a>
              <button
                onClick={() => {
                  handleNavClick("spmb");
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full text-sm font-bold text-white bg-hijau-primary px-4 py-3 rounded-xl hover:bg-hijau-secondary shadow transition-all"
              >
                <GraduationCap className="w-4 h-4" />
                Daftar SPMB Online
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
