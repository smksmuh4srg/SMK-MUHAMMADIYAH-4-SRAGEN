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
import SPMB from "./components/SPMB";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isAdminView, setIsAdminView] = useState<boolean>(false);

  // Check URL hash to switch to/from Admin Panel
  useEffect(() => {
    const checkHash = () => {
      setIsAdminView(window.location.hash === "#admin");
    };
    
    // Initial check
    checkHash();
    
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  // Dynamic viewport scroll listener to highlight active nav link on scroll
  useEffect(() => {
    if (isAdminView) return;

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
  }, [isAdminView]);

  // Custom slow-motion slide-up animations on scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        threshold: 0.02,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const elements = document.querySelectorAll(".slowmo-reveal");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const slowScrollTo = (targetPosition: number, duration: number = 1400) => {
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

  const handleLearnMore = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = aboutSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      slowScrollTo(offsetPosition, 1600);
      setActiveSection("about");
    }
  };

  const handleRegister = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = contactSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      slowScrollTo(offsetPosition, 1650);
      setActiveSection("contact");
    }
  };

  const handleScrollToTop = () => {
    slowScrollTo(0, 1650);
    setActiveSection("home");
  };

  if (isAdminView) {
    return (
      <div className="min-h-screen flex flex-col font-sans" id="root-app-wrapper">
        {/* 1. Header Navigation */}
        <Navbar activeSection="admin" setActiveSection={() => {}} />

        {/* 2. Admin Panel Dashboard View */}
        <main className="flex-grow pt-16 bg-slate-50" id="main-content">
          <AdminPanel />
        </main>

        {/* 3. Footer Branding */}
        <Footer onScrollToTop={handleScrollToTop} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans" id="root-app-wrapper">
      {/* 1. Header Navigation */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* 2. Main Page Content Sections */}
      <main className="flex-grow" id="main-content">
        {/* Hero Section */}
        <Hero onLearnMore={handleLearnMore} onRegister={handleRegister} />

        {/* Tentang Sekolah Section */}
        <About />

        {/* Visi Misi Section */}
        <VisiMisi />

        {/* Program Keahlian Section */}
        <Programs />

        {/* Galeri Dokumentasi Section */}
        <Gallery />

        {/* Penerimaan Siswa Baru Section */}
        <SPMB />

        {/* Kontak & Peta Section */}
        <Contact />
      </main>

      {/* 3. Footer Branding */}
      <Footer onScrollToTop={handleScrollToTop} />
    </div>
  );
}
