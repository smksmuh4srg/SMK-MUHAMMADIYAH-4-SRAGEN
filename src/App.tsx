/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import VisiMisi from "./components/VisiMisi";
import Programs from "./components/Programs";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("home");

  // Dynamic viewport scroll listener to highlight active nav link on scroll
  useEffect(() => {
    const handleScrollIntersection = () => {
      const sections = ["home", "about", "visimisi", "programs", "gallery", "contact"];
      const scrollPosition = window.scrollY + 160; // offset factor

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollIntersection);
    return () => window.removeEventListener("scroll", handleScrollIntersection);
  }, []);

  const handleLearnMore = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = aboutSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection("about");
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setActiveSection("home");
  };

  return (
    <div className="min-h-screen flex flex-col font-sans" id="root-app-wrapper">
      {/* 1. Header Navigation */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* 2. Main Page Content Sections */}
      <main className="flex-grow" id="main-content">
        {/* Hero Section */}
        <Hero onLearnMore={handleLearnMore} />

        {/* Tentang Sekolah Section */}
        <About />

        {/* Visi Misi Section */}
        <VisiMisi />

        {/* Program Keahlian Section */}
        <Programs />

        {/* Galeri Dokumentasi Section */}
        <Gallery />

        {/* Kontak & Peta Section */}
        <Contact />
      </main>

      {/* 3. Footer Branding */}
      <Footer onScrollToTop={handleScrollToTop} />
    </div>
  );
}
