/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { useContent } from "../context/ContentContext";
import {
  Settings,
  Lock,
  Unlock,
  Save,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  FileText,
  User,
  Phone,
  MapPin,
  Mail,
  GraduationCap,
  Image as ImageIcon,
  MessageSquare,
  HelpCircle,
  RefreshCw,
  LogOut,
  Sparkles,
  ClipboardList,
  Eye,
  EyeOff
} from "lucide-react";

export default function AdminPanel() {
  const {
    schoolInfo,
    programs,
    gallery,
    testimonials,
    waves,
    requirements,
    selectionResults,
    inquiries,
    spmbRegistrations,
    isAdmin,
    adminLogin,
    adminLogout,
    updateSection
  } = useContent();

  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<
    "profil" | "programs" | "gallery" | "testimonials" | "spmb-config" | "nisn-db" | "pendaftar" | "messages"
  >("profil");

  // Save feedback state
  const [saveStatus, setSaveStatus] = useState<{ [key: string]: { status: "idle" | "saving" | "success" | "error"; msg?: string } }>({});

  // 1. General Profile State
  const [tempProfile, setTempProfile] = useState({ ...schoolInfo });

  // 2. Programs States
  const [editingProgramId, setEditingProgramId] = useState<string | null>(null);
  const [tempProgram, setTempProgram] = useState<any>({
    id: "",
    nama: "",
    singkatan: "",
    deskripsi: "",
    deskripsiLengkap: "",
    iconName: "Network",
    keunggulan: [""],
    materiPokok: [""],
    prospekKarir: [""],
    bannerUrl: ""
  });

  // 3. Gallery States
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);
  const [tempGallery, setTempGallery] = useState<any>({
    id: "",
    title: "",
    category: "Praktek",
    imageUrl: "",
    description: "",
    date: ""
  });

  // 4. Testimonial States
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);
  const [tempTestimonial, setTempTestimonial] = useState<any>({
    id: "",
    nama: "",
    peran: "",
    angkatan: "",
    testimoni: "",
    avatarUrl: ""
  });

  // 5. SPMB Settings State
  const [tempWaves, setTempWaves] = useState([...waves]);
  const [tempRequirements, setTempRequirements] = useState([...requirements]);

  // 6. NISN Database State
  const [newNisn, setNewNisn] = useState("");
  const [newNisnData, setNewNisnData] = useState({
    nama: "",
    status: "Lulus" as "Lulus" | "Cadangan",
    jurusan: "",
    catatan: ""
  });

  // Sync edit states with content loaded from database
  useEffect(() => {
    if (schoolInfo && Object.keys(schoolInfo).length > 0) {
      setTempProfile({ ...schoolInfo });
    }
  }, [schoolInfo]);

  useEffect(() => {
    if (waves && waves.length > 0) {
      setTempWaves([...waves]);
    }
  }, [waves]);

  useEffect(() => {
    if (requirements && requirements.length > 0) {
      setTempRequirements([...requirements]);
    }
  }, [requirements]);

  // Initialize editing functions
  const handleStartEditProfile = () => {
    setTempProfile({ ...schoolInfo });
  };

  const handleStartEditProgram = (prog: any) => {
    setEditingProgramId(prog.id);
    setTempProgram({
      ...prog,
      keunggulan: prog.keunggulan && prog.keunggulan.length ? [...prog.keunggulan] : [""],
      materiPokok: prog.materiPokok && prog.materiPokok.length ? [...prog.materiPokok] : [""],
      prospekKarir: prog.prospekKarir && prog.prospekKarir.length ? [...prog.prospekKarir] : [""]
    });
  };

  const handleCreateNewProgram = () => {
    setEditingProgramId("NEW_PROGRAM");
    setTempProgram({
      id: "prog-" + Date.now(),
      nama: "",
      singkatan: "",
      deskripsi: "",
      deskripsiLengkap: "",
      iconName: "Network",
      keunggulan: [""],
      materiPokok: [""],
      prospekKarir: [""],
      bannerUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800"
    });
  };

  const handleStartEditGallery = (g: any) => {
    setEditingGalleryId(g.id);
    setTempGallery({ ...g });
  };

  const handleCreateNewGallery = () => {
    setEditingGalleryId("NEW_GALLERY");
    setTempGallery({
      id: "g" + Date.now(),
      title: "",
      category: "Praktek",
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600",
      description: "",
      date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
    });
  };

  const handleStartEditTestimonial = (t: any) => {
    setEditingTestimonialId(t.id);
    setTempTestimonial({ ...t });
  };

  const handleCreateNewTestimonial = () => {
    setEditingTestimonialId("NEW_TESTIMONIAL");
    setTempTestimonial({
      id: "t" + Date.now(),
      nama: "",
      peran: "",
      angkatan: "",
      testimoni: "",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
    });
  };

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const result = await adminLogin(passcode);
    if (!result.success) {
      setLoginError(result.error || "Gagal masuk");
    } else {
      setPasscode("");
    }
  };

  // Helper trigger action message feedback
  const triggerStatus = (key: string, status: "saving" | "success" | "error", msg?: string) => {
    setSaveStatus((prev) => ({
      ...prev,
      [key]: { status, msg }
    }));
    if (status === "success" || status === "error") {
      setTimeout(() => {
        setSaveStatus((prev) => ({
          ...prev,
          [key]: { status: "idle" }
        }));
      }, 3500);
    }
  };

  // Save General Profile
  const handleSaveProfile = async () => {
    triggerStatus("profil", "saving");
    const res = await updateSection("schoolInfo", tempProfile);
    if (res.success) {
      triggerStatus("profil", "success", "Berhasil menyimpan profil sekolah!");
    } else {
      triggerStatus("profil", "error", res.error || "Gagal menyimpan");
    }
  };

  // Save Programs List
  const handleSaveProgram = async () => {
    triggerStatus("programs", "saving");
    let updatedPrograms = [...programs];
    if (editingProgramId === "NEW_PROGRAM") {
      updatedPrograms.push(tempProgram);
    } else {
      updatedPrograms = updatedPrograms.map((p) => (p.id === editingProgramId ? tempProgram : p));
    }

    const res = await updateSection("programs", updatedPrograms);
    if (res.success) {
      triggerStatus("programs", "success", "Berhasil memperbarui program keahlian!");
      setEditingProgramId(null);
    } else {
      triggerStatus("programs", "error", res.error || "Gagal memperbarui");
    }
  };

  const handleDeleteProgram = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus program keahlian ini?")) return;
    triggerStatus("programs", "saving");
    const updatedPrograms = programs.filter((p) => p.id !== id);
    const res = await updateSection("programs", updatedPrograms);
    if (res.success) {
      triggerStatus("programs", "success", "Program keahlian berhasil dihapus!");
    } else {
      triggerStatus("programs", "error", res.error || "Gagal menghapus");
    }
  };

  // Save Gallery List
  const handleSaveGalleryItem = async () => {
    triggerStatus("gallery", "saving");
    let updatedGallery = [...gallery];
    if (editingGalleryId === "NEW_GALLERY") {
      updatedGallery = [tempGallery, ...updatedGallery];
    } else {
      updatedGallery = updatedGallery.map((g) => (g.id === editingGalleryId ? tempGallery : g));
    }

    const res = await updateSection("gallery", updatedGallery);
    if (res.success) {
      triggerStatus("gallery", "success", "Berhasil memperbarui galeri!");
      setEditingGalleryId(null);
    } else {
      triggerStatus("gallery", "error", res.error || "Gagal memperbarui");
    }
  };

  const handleDeleteGalleryItem = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus foto/kegiatan ini?")) return;
    triggerStatus("gallery", "saving");
    const updatedGallery = gallery.filter((g) => g.id !== id);
    const res = await updateSection("gallery", updatedGallery);
    if (res.success) {
      triggerStatus("gallery", "success", "Item galeri berhasil dihapus!");
    } else {
      triggerStatus("gallery", "error", res.error || "Gagal menghapus");
    }
  };

  // Save Testimonial List
  const handleSaveTestimonial = async () => {
    triggerStatus("testimonials", "saving");
    let updatedTestimonials = [...testimonials];
    if (editingTestimonialId === "NEW_TESTIMONIAL") {
      updatedTestimonials = [tempTestimonial, ...updatedTestimonials];
    } else {
      updatedTestimonials = updatedTestimonials.map((t) => (t.id === editingTestimonialId ? tempTestimonial : t));
    }

    const res = await updateSection("testimonials", updatedTestimonials);
    if (res.success) {
      triggerStatus("testimonials", "success", "Berhasil memperbarui testimoni!");
      setEditingTestimonialId(null);
    } else {
      triggerStatus("testimonials", "error", res.error || "Gagal memperbarui");
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus testimoni ini?")) return;
    triggerStatus("testimonials", "saving");
    const updatedTestimonials = testimonials.filter((t) => t.id !== id);
    const res = await updateSection("testimonials", updatedTestimonials);
    if (res.success) {
      triggerStatus("testimonials", "success", "Testimoni berhasil dihapus!");
    } else {
      triggerStatus("testimonials", "error", res.error || "Gagal menghapus");
    }
  };

  // Save SPMB Config (Gelombang & Syarat Berkas)
  const handleSaveSpmbConfig = async () => {
    triggerStatus("spmb-config", "saving");
    
    // Save waves
    const res1 = await updateSection("waves", tempWaves);
    if (!res1.success) {
      triggerStatus("spmb-config", "error", res1.error || "Gagal menyimpan jadwal");
      return;
    }

    // Save requirements
    const res2 = await updateSection("requirements", tempRequirements);
    if (res2.success) {
      triggerStatus("spmb-config", "success", "Berhasil memperbarui konfigurasi SPMB!");
    } else {
      triggerStatus("spmb-config", "error", res2.error || "Gagal menyimpan berkas");
    }
  };

  // NISN Database Actions
  const handleAddNisnResult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNisn.trim() || !newNisnData.nama || !newNisnData.jurusan) {
      alert("Harap lengkapi nomor NISN, Nama, dan Pilihan Jurusan");
      return;
    }

    triggerStatus("nisn-db", "saving");
    const updatedSelection = {
      ...selectionResults,
      [newNisn.trim()]: { ...newNisnData }
    };

    const res = await updateSection("selectionResults", updatedSelection);
    if (res.success) {
      triggerStatus("nisn-db", "success", `NISN ${newNisn} berhasil disimpan!`);
      setNewNisn("");
      setNewNisnData({ nama: "", status: "Lulus", jurusan: "", catatan: "" });
    } else {
      triggerStatus("nisn-db", "error", res.error || "Gagal menyimpan");
    }
  };

  const handleDeleteNisnResult = async (nisn: string) => {
    if (!confirm(`Hapus status kelulusan NISN ${nisn}?`)) return;
    triggerStatus("nisn-db", "saving");
    const updatedSelection = { ...selectionResults };
    delete updatedSelection[nisn];

    const res = await updateSection("selectionResults", updatedSelection);
    if (res.success) {
      triggerStatus("nisn-db", "success", `NISN ${nisn} berhasil dihapus.`);
    } else {
      triggerStatus("nisn-db", "error", res.error || "Gagal menghapus");
    }
  };

  const handleDeleteSpmbRegistration = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data pendaftar ini?")) return;
    triggerStatus("pendaftar", "saving");
    const updated = (spmbRegistrations || []).filter((r) => r.id !== id);
    const res = await updateSection("spmbRegistrations", updated);
    if (res.success) {
      triggerStatus("pendaftar", "success", "Data pendaftar berhasil dihapus!");
    } else {
      triggerStatus("pendaftar", "error", res.error || "Gagal menghapus");
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus pesan ini?")) return;
    triggerStatus("messages", "saving");
    const updated = (inquiries || []).filter((i) => i.id !== id);
    const res = await updateSection("inquiries", updated);
    if (res.success) {
      triggerStatus("messages", "success", "Pesan berhasil dihapus!");
    } else {
      triggerStatus("messages", "error", res.error || "Gagal menghapus");
    }
  };

  // Handle input changes for sub-arrays of Programs
  const handleArrayFieldChange = (field: "keunggulan" | "materiPokok" | "prospekKarir", index: number, value: string) => {
    setTempProgram((prev: any) => {
      const arr = [...prev[field]];
      arr[index] = value;
      return { ...prev, [field]: arr };
    });
  };

  const addArrayFieldRow = (field: "keunggulan" | "materiPokok" | "prospekKarir") => {
    setTempProgram((prev: any) => ({
      ...prev,
      [field]: [...prev[field], ""]
    }));
  };

  const removeArrayFieldRow = (field: "keunggulan" | "materiPokok" | "prospekKarir", index: number) => {
    setTempProgram((prev: any) => {
      const arr = prev[field].filter((_: any, i: number) => i !== index);
      return { ...prev, [field]: arr.length ? arr : [""] };
    });
  };

  return (
    <section id="admin" className="py-20 md:py-28 bg-slate-50/70 border-t border-slate-200/60 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="admin-header">
          <div className="bg-hijau-pastel/80 border border-hijau-light/60 text-hijau-primary p-2.5 rounded-full inline-block mb-3">
            <Settings className="w-6 h-6 animate-spin-slow" />
          </div>
          <h2 className="text-xs font-bold tracking-widest text-oranye-primary uppercase mb-1">Pusat Kendali Web</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Portal Administrasi Web
          </p>
          <p className="text-slate-500 mt-2.5 text-sm sm:text-base font-medium">
            Kelola dan perbarui seluruh konten website SMK Muhammadiyah 4 Sragen secara real-time.
          </p>
          <div className="h-1.5 w-20 bg-hijau-secondary mx-auto mt-4 rounded-full" />
        </div>

        {/* ADMIN UNAUTHORIZED STATE: show Login box */}
        {!isAdmin ? (
          <div className="max-w-md mx-auto" id="admin-login-box">
            <div className="bg-white border border-slate-100 p-8 sm:p-10 rounded-3xl card-shadow text-center">
              <div className="p-4 bg-oranye-pastel border border-oranye-light text-oranye-primary rounded-full inline-block mb-5">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-800 mb-2">Login Administrator</h3>
              <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed mb-6">
                Masukkan kode sandi otorisasi Admin Anda untuk mengakses panel manajemen konten.
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Sandi Admin (Bawaan: yusufromadhoni)"
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      className="w-full text-center pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary focus:bg-white transition-all font-mono tracking-widest text-slate-700"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors cursor-pointer"
                      title={showPassword ? "Sembunyikan sandi" : "Tampilkan sandi"}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {loginError && <p className="text-xs text-red-500 font-bold mt-2">{loginError}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full bg-hijau-primary hover:bg-hijau-secondary text-white font-bold py-3 px-4 rounded-xl transition-colors cursor-pointer text-sm shadow-xs flex items-center justify-center gap-1.5"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Buka Panel Kendali</span>
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* ADMIN AUTHORIZED DASHBOARD CONTAINER */
          <div className="bg-white border border-slate-200/70 rounded-3xl card-shadow overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[600px]" id="admin-dashboard">
            
            {/* Left Nav Tabs (Col 3) */}
            <div className="lg:col-span-3 bg-slate-900 text-slate-400 p-6 flex flex-col justify-between" id="admin-sidebar">
              <div className="space-y-6">
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
                  <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-hijau-secondary">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-extrabold uppercase tracking-wide">CMS Dashboard</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Status: Terautentikasi</p>
                  </div>
                </div>

                <nav className="space-y-1.5" id="admin-sidebar-menu">
                  {[
                    { id: "profil", label: "Profil & Kontak", icon: Settings },
                    { id: "programs", label: "Program Keahlian", icon: ClipboardList },
                    { id: "gallery", label: "Galeri & Berita", icon: ImageIcon },
                    { id: "testimonials", label: "Testimoni Alumni", icon: MessageSquare },
                    { id: "spmb-config", label: "Info & Syarat SPMB", icon: FileText },
                    { id: "nisn-db", label: "Database NISN", icon: GraduationCap },
                    { id: "pendaftar", label: "Pendaftar Online", icon: User },
                    { id: "messages", label: "Pesan Masuk", icon: HelpCircle }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeSubTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveSubTab(tab.id as any);
                          setEditingProgramId(null);
                          setEditingGalleryId(null);
                          setEditingTestimonialId(null);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer text-left ${
                          isActive
                            ? "bg-hijau-primary text-white font-extrabold shadow-sm"
                            : "hover:bg-slate-800 text-slate-400 hover:text-white"
                        }`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Sidebar Footer Logout */}
              <div className="pt-6 border-t border-slate-800">
                <button
                  onClick={adminLogout}
                  className="w-full flex items-center justify-center gap-2 bg-red-600/15 hover:bg-red-600 border border-red-500/20 text-red-400 hover:text-white font-bold py-2.5 px-3 rounded-xl transition-all cursor-pointer text-xs"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout Keluar</span>
                </button>
              </div>
            </div>

            {/* Right Form Workspace (Col 9) */}
            <div className="lg:col-span-9 p-6 sm:p-8 md:p-10" id="admin-workspace">
              
              {/* TAB 1: PROFIL DAN KONTAK SEKOLAH */}
              {activeSubTab === "profil" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <div>
                      <h3 className="text-xl font-extrabold text-slate-800">Informasi Umum Sekolah</h3>
                      <p className="text-xs text-slate-400 font-semibold">Ubah identitas, kontak, NPSN, dan akreditasi utama sekolah.</p>
                    </div>
                    <button
                      onClick={handleSaveProfile}
                      disabled={saveStatus["profil"]?.status === "saving"}
                      className="bg-hijau-primary hover:bg-hijau-secondary text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                    >
                      {saveStatus["profil"]?.status === "saving" ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      <span>Simpan Profil</span>
                    </button>
                  </div>

                  {saveStatus["profil"]?.status === "success" && (
                    <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-xs font-bold">
                      {saveStatus["profil"]?.msg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs sm:text-sm font-semibold">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-600 font-bold uppercase text-[10px]">Nama Sekolah</label>
                      <input
                        type="text"
                        value={tempProfile.nama}
                        onChange={(e) => setTempProfile({ ...tempProfile, nama: e.target.value })}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary text-slate-700"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-600 font-bold uppercase text-[10px]">Slogan / Tagline</label>
                      <input
                        type="text"
                        value={tempProfile.tagline}
                        onChange={(e) => setTempProfile({ ...tempProfile, tagline: e.target.value })}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary text-slate-700"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <label className="text-slate-600 font-bold uppercase text-[10px]">Alamat Sekolah</label>
                      <input
                        type="text"
                        value={tempProfile.alamat}
                        onChange={(e) => setTempProfile({ ...tempProfile, alamat: e.target.value })}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary text-slate-700"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-600 font-bold uppercase text-[10px]">Telepon Sekolah</label>
                      <input
                        type="text"
                        value={tempProfile.telepon}
                        onChange={(e) => setTempProfile({ ...tempProfile, telepon: e.target.value })}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary text-slate-700"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-600 font-bold uppercase text-[10px]">WhatsApp Official (Format: 62...)</label>
                      <input
                        type="text"
                        value={tempProfile.whatsapp}
                        onChange={(e) => setTempProfile({ ...tempProfile, whatsapp: e.target.value })}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary text-slate-700"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-600 font-bold uppercase text-[10px]">Surel (Email)</label>
                      <input
                        type="text"
                        value={tempProfile.email}
                        onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary text-slate-700"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-600 font-bold uppercase text-[10px]">Jam Kerja Pelayanan</label>
                      <input
                        type="text"
                        value={tempProfile.jamKerja}
                        onChange={(e) => setTempProfile({ ...tempProfile, jamKerja: e.target.value })}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary text-slate-700"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-600 font-bold uppercase text-[10px]">NPSN Sekolah</label>
                      <input
                        type="text"
                        value={tempProfile.npsn}
                        onChange={(e) => setTempProfile({ ...tempProfile, npsn: e.target.value })}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary text-slate-700"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-600 font-bold uppercase text-[10px]">Nilai Akreditasi</label>
                      <input
                        type="text"
                        value={tempProfile.akreditasi}
                        onChange={(e) => setTempProfile({ ...tempProfile, akreditasi: e.target.value })}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary text-slate-700"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-600 font-bold uppercase text-[10px]">Nama Kepala Sekolah</label>
                      <input
                        type="text"
                        value={tempProfile.kepalaSekolah}
                        onChange={(e) => setTempProfile({ ...tempProfile, kepalaSekolah: e.target.value })}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary text-slate-700"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-600 font-bold uppercase text-[10px]">Tahun Berdiri Sekolah</label>
                      <input
                        type="text"
                        value={tempProfile.tahunBerdiri}
                        onChange={(e) => setTempProfile({ ...tempProfile, tahunBerdiri: e.target.value })}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary text-slate-700"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 sm:col-span-2 border-t border-slate-100 pt-6 mt-2">
                      <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider">Visual Branding & Logo</h4>
                      <p className="text-xs text-slate-400 font-semibold mb-2">Sesuaikan singkatan lambang serta unggah gambar logo sekolah eksternal jika diinginkan.</p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-600 font-bold uppercase text-[10px]">Singkatan / Akronim (e.g. SMK MUHESA)</label>
                      <input
                        type="text"
                        value={tempProfile.acronym || ""}
                        onChange={(e) => setTempProfile({ ...tempProfile, acronym: e.target.value })}
                        placeholder="SMK MUHESA"
                        className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary text-slate-700 font-mono"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-600 font-bold uppercase text-[10px]">URL Gambar Logo Kustom (Kosongkan untuk Default SVG)</label>
                      <input
                        type="text"
                        value={tempProfile.customLogoUrl || ""}
                        onChange={(e) => setTempProfile({ ...tempProfile, customLogoUrl: e.target.value })}
                        placeholder="https://example.com/logo.png"
                        className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary text-slate-700 text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: MANAJEMEN JURUSAN / PROGRAM KEAHLIAN */}
              {activeSubTab === "programs" && (
                <div className="space-y-6">
                  {editingProgramId === null ? (
                    /* Program Keahlian List */
                    <div className="space-y-5">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                        <div>
                          <h3 className="text-xl font-extrabold text-slate-800">Manajemen Program Keahlian</h3>
                          <p className="text-xs text-slate-400 font-semibold">Tambah, perbarui, atau hapus kompetensi kejuruan sekolah.</p>
                        </div>
                        <button
                          onClick={handleCreateNewProgram}
                          className="bg-oranye-primary hover:bg-oranye-secondary text-white font-bold py-2 px-3.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Jurusan Baru</span>
                        </button>
                      </div>

                      {saveStatus["programs"]?.status === "success" && (
                        <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-xs font-bold animate-pulse">
                          {saveStatus["programs"]?.msg}
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {programs.map((prog) => (
                          <div key={prog.id} className="border border-slate-100 p-4 rounded-2xl flex justify-between items-start bg-slate-50/40 hover:bg-white transition-all card-shadow-hover">
                            <div className="space-y-1 max-w-[80%]">
                              <span className="text-[10px] bg-hijau-light/50 text-hijau-primary font-bold px-2 py-0.5 rounded-md uppercase">
                                {prog.singkatan}
                              </span>
                              <h4 className="text-sm font-extrabold text-slate-800 leading-snug mt-1">{prog.nama}</h4>
                              <p className="text-xs text-slate-400 line-clamp-2">{prog.deskripsi}</p>
                            </div>

                            <div className="flex flex-col gap-1.5 flex-shrink-0">
                              <button
                                onClick={() => handleStartEditProgram(prog)}
                                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors cursor-pointer"
                                title="Edit Jurusan"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteProgram(prog.id)}
                                className="p-2 bg-red-50 hover:bg-red-600 hover:text-white text-red-500 rounded-lg transition-colors cursor-pointer"
                                title="Hapus Jurusan"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Edit/New Program Form */
                    <div className="space-y-6 animate-in fade-in duration-200">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                        <div>
                          <h3 className="text-xl font-extrabold text-slate-800">
                            {editingProgramId === "NEW_PROGRAM" ? "Tambah Program Keahlian Baru" : `Edit Program: ${tempProgram.singkatan}`}
                          </h3>
                          <p className="text-xs text-slate-400 font-semibold">Isi detail lengkap jurusan berikut dengan komplit.</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingProgramId(null)}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2 px-3.5 rounded-xl text-xs transition-colors cursor-pointer"
                          >
                            Batal
                          </button>
                          <button
                            onClick={handleSaveProgram}
                            className="bg-hijau-primary hover:bg-hijau-secondary text-white font-bold py-2 px-3.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Save className="w-4 h-4" />
                            <span>Simpan</span>
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs sm:text-sm font-semibold">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-600 font-bold uppercase text-[10px]">Nama Program (Lengkap)</label>
                          <input
                            type="text"
                            placeholder="Teknik Komputer dan Jaringan"
                            value={tempProgram.nama}
                            onChange={(e) => setTempProgram({ ...tempProgram, nama: e.target.value })}
                            className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary text-slate-700"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-600 font-bold uppercase text-[10px]">Singkatan / Akronim</label>
                          <input
                            type="text"
                            placeholder="TKJ"
                            value={tempProgram.singkatan}
                            onChange={(e) => setTempProgram({ ...tempProgram, singkatan: e.target.value })}
                            className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary text-slate-700"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                          <label className="text-slate-600 font-bold uppercase text-[10px]">Deskripsi Singkat (Card)</label>
                          <textarea
                            rows={2}
                            placeholder="Membekali siswa dengan kompetensi teknologi..."
                            value={tempProgram.deskripsi}
                            onChange={(e) => setTempProgram({ ...tempProgram, deskripsi: e.target.value })}
                            className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary text-slate-700"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                          <label className="text-slate-600 font-bold uppercase text-[10px]">Deskripsi Lengkap (Halaman Profil)</label>
                          <textarea
                            rows={4}
                            placeholder="Tuliskan latar belakang detail, kurikulum, serta fasilitas praktik kejuruan secara komprehensif..."
                            value={tempProgram.deskripsiLengkap}
                            onChange={(e) => setTempProgram({ ...tempProgram, deskripsiLengkap: e.target.value })}
                            className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary text-slate-700"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-600 font-bold uppercase text-[10px]">Banner Image URL</label>
                          <input
                            type="text"
                            value={tempProgram.bannerUrl}
                            onChange={(e) => setTempProgram({ ...tempProgram, bannerUrl: e.target.value })}
                            className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary text-slate-700"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-600 font-bold uppercase text-[10px]">Icon Name (Lucide)</label>
                          <select
                            value={tempProgram.iconName}
                            onChange={(e) => setTempProgram({ ...tempProgram, iconName: e.target.value })}
                            className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary text-slate-700 font-bold"
                          >
                            <option value="Network">Network (TKJ)</option>
                            <option value="Wrench">Wrench (Otomotif/TKRO)</option>
                            <option value="Calculator">Calculator (Akuntansi/AKL)</option>
                            <option value="Cpu">Cpu</option>
                            <option value="HardDrive">HardDrive</option>
                            <option value="Settings">Settings</option>
                          </select>
                        </div>

                        {/* Array Fields: Keunggulan */}
                        <div className="sm:col-span-2 space-y-2">
                          <div className="flex justify-between items-center">
                            <label className="text-slate-600 font-extrabold uppercase text-[10px]">Fasilitas / Keunggulan Utama</label>
                            <button
                              type="button"
                              onClick={() => addArrayFieldRow("keunggulan")}
                              className="text-[10px] font-bold text-hijau-primary hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <Plus className="w-3 h-3" /> Tambah Baris
                            </button>
                          </div>
                          <div className="space-y-2">
                            {tempProgram.keunggulan.map((item: string, i: number) => (
                              <div key={i} className="flex gap-2">
                                <input
                                  type="text"
                                  value={item}
                                  onChange={(e) => handleArrayFieldChange("keunggulan", i, e.target.value)}
                                  className="flex-grow p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                                  placeholder="e.g. Laboratorium Komputer Full AC"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeArrayFieldRow("keunggulan", i)}
                                  className="p-2 bg-red-50 text-red-500 rounded-lg cursor-pointer hover:bg-red-500 hover:text-white"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Array Fields: Materi Pokok */}
                        <div className="sm:col-span-2 space-y-2">
                          <div className="flex justify-between items-center">
                            <label className="text-slate-600 font-extrabold uppercase text-[10px]">Syllabus / Materi Pokok Pembelajaran</label>
                            <button
                              type="button"
                              onClick={() => addArrayFieldRow("materiPokok")}
                              className="text-[10px] font-bold text-hijau-primary hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <Plus className="w-3 h-3" /> Tambah Baris
                            </button>
                          </div>
                          <div className="space-y-2">
                            {tempProgram.materiPokok.map((item: string, i: number) => (
                              <div key={i} className="flex gap-2">
                                <input
                                  type="text"
                                  value={item}
                                  onChange={(e) => handleArrayFieldChange("materiPokok", i, e.target.value)}
                                  className="flex-grow p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                                  placeholder="e.g. Pemeliharaan Kelistrikan Kendaraan Ringan"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeArrayFieldRow("materiPokok", i)}
                                  className="p-2 bg-red-50 text-red-500 rounded-lg cursor-pointer hover:bg-red-500 hover:text-white"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Array Fields: Prospek Karir */}
                        <div className="sm:col-span-2 space-y-2">
                          <div className="flex justify-between items-center">
                            <label className="text-slate-600 font-extrabold uppercase text-[10px]">Prospek Karir / Peluang Kerja</label>
                            <button
                              type="button"
                              onClick={() => addArrayFieldRow("prospekKarir")}
                              className="text-[10px] font-bold text-oranye-primary hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <Plus className="w-3 h-3" /> Tambah Baris
                            </button>
                          </div>
                          <div className="space-y-2">
                            {tempProgram.prospekKarir.map((item: string, i: number) => (
                              <div key={i} className="flex gap-2">
                                <input
                                  type="text"
                                  value={item}
                                  onChange={(e) => handleArrayFieldChange("prospekKarir", i, e.target.value)}
                                  className="flex-grow p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                                  placeholder="e.g. Network Engineer"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeArrayFieldRow("prospekKarir", i)}
                                  className="p-2 bg-red-50 text-red-500 rounded-lg cursor-pointer hover:bg-red-500 hover:text-white"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: MANAJEMEN GALERI & BERITA */}
              {activeSubTab === "gallery" && (
                <div className="space-y-6">
                  {editingGalleryId === null ? (
                    <div className="space-y-5">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                        <div>
                          <h3 className="text-xl font-extrabold text-slate-800">Manajemen Galeri & Berita</h3>
                          <p className="text-xs text-slate-400 font-semibold">Kelola album dokumentasi, kegiatan, sarana prasarana, serta pencapaian prestasi.</p>
                        </div>
                        <button
                          onClick={handleCreateNewGallery}
                          className="bg-oranye-primary hover:bg-oranye-secondary text-white font-bold py-2 px-3.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Dokumentasi Baru</span>
                        </button>
                      </div>

                      {saveStatus["gallery"]?.status === "success" && (
                        <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-xs font-bold">
                          {saveStatus["gallery"]?.msg}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {gallery.map((g) => (
                          <div key={g.id} className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50/30 flex flex-col justify-between">
                            <div className="h-28 w-full bg-slate-100 relative">
                              <img src={g.imageUrl} alt={g.title} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                              <span className="absolute top-2 left-2 text-[9px] bg-slate-900/80 text-white font-extrabold uppercase px-2 py-0.5 rounded-md">
                                {g.category}
                              </span>
                            </div>
                            <div className="p-3.5 flex-grow space-y-1">
                              <p className="text-slate-400 text-[10px] font-bold">{g.date}</p>
                              <h4 className="text-xs font-extrabold text-slate-800 line-clamp-1">{g.title}</h4>
                              <p className="text-[11px] text-slate-400 font-medium line-clamp-2 leading-relaxed">{g.description}</p>
                            </div>
                            <div className="p-2 border-t border-slate-100 flex gap-1.5 justify-end">
                              <button
                                onClick={() => handleStartEditGallery(g)}
                                className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-md transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1"
                              >
                                <Edit2 className="w-3 h-3" />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => handleDeleteGalleryItem(g.id)}
                                className="p-1.5 bg-red-50 hover:bg-red-600 hover:text-white text-red-500 rounded-md transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Hapus</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Edit/New Gallery Form */
                    <div className="space-y-6 animate-in fade-in duration-200">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                        <div>
                          <h3 className="text-xl font-extrabold text-slate-800">
                            {editingGalleryId === "NEW_GALLERY" ? "Tambah Dokumentasi Baru" : "Edit Item Galeri"}
                          </h3>
                          <p className="text-xs text-slate-400 font-semibold">Tentukan kategori, tanggal publikasi, serta penjelasan kegiatan.</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingGalleryId(null)}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2 px-3.5 rounded-xl text-xs transition-colors cursor-pointer"
                          >
                            Batal
                          </button>
                          <button
                            onClick={handleSaveGalleryItem}
                            className="bg-hijau-primary hover:bg-hijau-secondary text-white font-bold py-2 px-3.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Save className="w-4 h-4" />
                            <span>Simpan</span>
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs sm:text-sm font-semibold">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-600 font-bold uppercase text-[10px]">Judul Kegiatan / Album</label>
                          <input
                            type="text"
                            placeholder="Juara 1 LKS Tingkat Kabupaten"
                            value={tempGallery.title}
                            onChange={(e) => setTempGallery({ ...tempGallery, title: e.target.value })}
                            className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary text-slate-700"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-600 font-bold uppercase text-[10px]">Kategori Galeri</label>
                          <select
                            value={tempGallery.category}
                            onChange={(e) => setTempGallery({ ...tempGallery, category: e.target.value as any })}
                            className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary text-slate-700 font-bold"
                          >
                            <option value="Praktek">Praktek Kerja</option>
                            <option value="Fasilitas">Sarana & Fasilitas</option>
                            <option value="Eskul">Ekstrakurikuler</option>
                            <option value="Kegiatan">Kegiatan Sekolah</option>
                            <option value="Prestasi">Prestasi Siswa</option>
                          </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-600 font-bold uppercase text-[10px]">Image URL (Unsplash / Tautan Gambar)</label>
                          <input
                            type="text"
                            value={tempGallery.imageUrl}
                            onChange={(e) => setTempGallery({ ...tempGallery, imageUrl: e.target.value })}
                            className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary text-slate-700"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-600 font-bold uppercase text-[10px]">Tanggal Publikasi</label>
                          <input
                            type="text"
                            placeholder="e.g. 18 Juni 2026"
                            value={tempGallery.date}
                            onChange={(e) => setTempGallery({ ...tempGallery, date: e.target.value })}
                            className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary text-slate-700"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                          <label className="text-slate-600 font-bold uppercase text-[10px]">Keterangan / Penjelasan Kegiatan</label>
                          <textarea
                            rows={3}
                            placeholder="Berikan rangkuman deskripsi kegiatan secara santun..."
                            value={tempGallery.description}
                            onChange={(e) => setTempGallery({ ...tempGallery, description: e.target.value })}
                            className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary text-slate-700"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: MANAJEMEN TESTIMONI ALUMNI */}
              {activeSubTab === "testimonials" && (
                <div className="space-y-6">
                  {editingTestimonialId === null ? (
                    <div className="space-y-5">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                        <div>
                          <h3 className="text-xl font-extrabold text-slate-800">Manajemen Testimoni Alumni</h3>
                          <p className="text-xs text-slate-400 font-semibold">Tampilkan kisah sukses para alumni sebagai motivasi calon siswa.</p>
                        </div>
                        <button
                          onClick={handleCreateNewTestimonial}
                          className="bg-oranye-primary hover:bg-oranye-secondary text-white font-bold py-2 px-3.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Testimoni Baru</span>
                        </button>
                      </div>

                      {saveStatus["testimonials"]?.status === "success" && (
                        <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-xs font-bold">
                          {saveStatus["testimonials"]?.msg}
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {testimonials.map((t) => (
                          <div key={t.id} className="border border-slate-100 p-4 rounded-2xl flex flex-col justify-between bg-slate-50/30 hover:bg-white transition-all card-shadow-hover">
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <img src={t.avatarUrl} alt={t.nama} className="h-10 w-10 rounded-full object-cover border border-slate-100" referrerPolicy="no-referrer" />
                                <div>
                                  <h4 className="text-xs font-extrabold text-slate-800">{t.nama}</h4>
                                  <p className="text-[10px] text-slate-400 font-semibold">{t.peran}</p>
                                  <span className="inline-block text-[9px] bg-hijau-light/50 text-hijau-primary px-1.5 py-0.5 rounded-md font-bold mt-0.5">{t.angkatan}</span>
                                </div>
                              </div>
                              <p className="text-xs text-slate-500 italic line-clamp-3 leading-relaxed font-medium">&ldquo;{t.testimoni}&rdquo;</p>
                            </div>

                            <div className="flex gap-2 justify-end pt-3 mt-3 border-t border-slate-100">
                              <button
                                onClick={() => handleStartEditTestimonial(t)}
                                className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors cursor-pointer text-xs font-bold flex items-center gap-1"
                              >
                                <Edit2 className="w-3 h-3" />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => handleDeleteTestimonial(t.id)}
                                className="p-1.5 bg-red-50 hover:bg-red-600 hover:text-white text-red-500 rounded-lg transition-colors cursor-pointer text-xs font-bold flex items-center gap-1"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Hapus</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Edit/New Testimonial Form */
                    <div className="space-y-6 animate-in fade-in duration-200">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                        <div>
                          <h3 className="text-xl font-extrabold text-slate-800">
                            {editingTestimonialId === "NEW_TESTIMONIAL" ? "Tambah Testimoni Baru" : "Edit Testimoni Alumni"}
                          </h3>
                          <p className="text-xs text-slate-400 font-semibold">Tulis detail peran kerja dan isi kutipan testimoni.</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingTestimonialId(null)}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2 px-3.5 rounded-xl text-xs transition-colors cursor-pointer"
                          >
                            Batal
                          </button>
                          <button
                            onClick={handleSaveTestimonial}
                            className="bg-hijau-primary hover:bg-hijau-secondary text-white font-bold py-2 px-3.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Save className="w-4 h-4" />
                            <span>Simpan</span>
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs sm:text-sm font-semibold">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-600 font-bold uppercase text-[10px]">Nama Alumni</label>
                          <input
                            type="text"
                            placeholder="Fajar Wicaksono"
                            value={tempTestimonial.nama}
                            onChange={(e) => setTempTestimonial({ ...tempTestimonial, nama: e.target.value })}
                            className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary text-slate-700"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-600 font-bold uppercase text-[10px]">Peran / Pekerjaan Sekarang</label>
                          <input
                            type="text"
                            placeholder="Staff Jaringan di PT Telkom"
                            value={tempTestimonial.peran}
                            onChange={(e) => setTempTestimonial({ ...tempTestimonial, peran: e.target.value })}
                            className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary text-slate-700"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-600 font-bold uppercase text-[10px]">Lulusan Angkatan (Jurusan)</label>
                          <input
                            type="text"
                            placeholder="Lulusan 2021 (TKJ)"
                            value={tempTestimonial.angkatan}
                            onChange={(e) => setTempTestimonial({ ...tempTestimonial, angkatan: e.target.value })}
                            className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary text-slate-700"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-600 font-bold uppercase text-[10px]">Avatar/Foto URL</label>
                          <input
                            type="text"
                            value={tempTestimonial.avatarUrl}
                            onChange={(e) => setTempTestimonial({ ...tempTestimonial, avatarUrl: e.target.value })}
                            className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary text-slate-700"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                          <label className="text-slate-600 font-bold uppercase text-[10px]">Kutipan Testimoni</label>
                          <textarea
                            rows={3}
                            placeholder="Tulis testimoni kejujuran mengenai pengalaman belajar di sekolah..."
                            value={tempTestimonial.testimoni}
                            onChange={(e) => setTempTestimonial({ ...tempTestimonial, testimoni: e.target.value })}
                            className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary text-slate-700"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: KONFIGURASI GELOMBANG & SYARAT SPMB */}
              {activeSubTab === "spmb-config" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <div>
                      <h3 className="text-xl font-extrabold text-slate-800">Informasi & Syarat SPMB</h3>
                      <p className="text-xs text-slate-400 font-semibold">Atur masa pendaftaran gelombang penerimaan dan daftar berkas administrasi.</p>
                    </div>
                    <button
                      onClick={handleSaveSpmbConfig}
                      className="bg-hijau-primary hover:bg-hijau-secondary text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                    >
                      <Save className="w-4 h-4" />
                      <span>Simpan Jadwal & Syarat</span>
                    </button>
                  </div>

                  {saveStatus["spmb-config"]?.status === "success" && (
                    <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-xs font-bold">
                      {saveStatus["spmb-config"]?.msg}
                    </div>
                  )}

                  {/* Wave Configuration List */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-extrabold text-slate-800 border-l-2 border-hijau-primary pl-2.5">Jadwal Gelombang Pendaftaran</h4>
                    <div className="space-y-3">
                      {tempWaves.map((wave, idx) => (
                        <div key={idx} className="p-4 border border-slate-100 rounded-2xl bg-slate-50/50 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center text-xs">
                          <div className="font-bold text-slate-700">{wave.nama}</div>
                          <div>
                            <input
                              type="text"
                              value={wave.tanggal}
                              onChange={(e) => {
                                const newWaves = [...tempWaves];
                                newWaves[idx].tanggal = e.target.value;
                                setTempWaves(newWaves);
                              }}
                              className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                              placeholder="Tanggal Pelaksanaan"
                            />
                          </div>
                          <div>
                            <select
                              value={wave.status}
                              onChange={(e) => {
                                const newWaves = [...tempWaves];
                                const stat = e.target.value;
                                newWaves[idx].status = stat;
                                newWaves[idx].colorClass =
                                  stat === "Sedang Berlangsung"
                                    ? "border-hijau-light bg-hijau-pastel/50 text-hijau-primary"
                                    : "border-slate-200 bg-slate-50/50 text-slate-400";
                                setTempWaves(newWaves);
                              }}
                              className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold text-slate-700"
                            >
                              <option value="Belum Dibuka">Belum Dibuka</option>
                              <option value="Sedang Berlangsung">Sedang Berlangsung</option>
                              <option value="Selesai">Selesai / Ditutup</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Requirements List */}
                  <div className="space-y-4 pt-4 border-t border-slate-100 text-xs">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-extrabold text-slate-800 border-l-2 border-oranye-primary pl-2.5">Daftar Berkas & Syarat Pendaftaran</h4>
                      <button
                        type="button"
                        onClick={() => setTempRequirements([...tempRequirements, ""])}
                        className="text-[11px] font-bold text-hijau-primary hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Tambah Syarat
                      </button>
                    </div>
                    <div className="space-y-2">
                      {tempRequirements.map((req, idx) => (
                        <div key={idx} className="flex gap-2 items-center">
                          <input
                            type="text"
                            value={req}
                            onChange={(e) => {
                              const newReqs = [...tempRequirements];
                              newReqs[idx] = e.target.value;
                              setTempRequirements(newReqs);
                            }}
                            className="flex-grow p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                            placeholder="Syarat berkas pendaftaran..."
                          />
                          <button
                            onClick={() => {
                              const newReqs = tempRequirements.filter((_, i) => i !== idx);
                              setTempRequirements(newReqs.length ? newReqs : [""]);
                            }}
                            className="p-2.5 bg-red-50 text-red-500 rounded-xl cursor-pointer hover:bg-red-500 hover:text-white"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 6: DATABASE KELULUSAN / CARI NISN */}
              {activeSubTab === "nisn-db" && (
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-xl font-extrabold text-slate-800">Database Seleksi & Kelulusan (NISN)</h3>
                    <p className="text-xs text-slate-400 font-semibold">Tambahkan atau hapus status kelulusan calon siswa yang bisa dicari menggunakan NISN di portal.</p>
                  </div>

                  {saveStatus["nisn-db"]?.status === "success" && (
                    <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-xs font-bold">
                      {saveStatus["nisn-db"]?.msg}
                    </div>
                  )}

                  {/* Add New NISN Form */}
                  <form onSubmit={handleAddNisnResult} className="bg-slate-50 border border-slate-200/60 p-5 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
                    <div className="sm:col-span-2 flex items-center gap-1 text-hijau-primary border-b border-slate-200/50 pb-2 mb-1">
                      <Plus className="w-4 h-4" />
                      <span className="font-bold">Input Status Pendaftar Baru</span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-600 text-[10px] uppercase">Nomor NISN (10 Digit) *</label>
                      <input
                        type="text"
                        placeholder="Contoh: 1234567890"
                        value={newNisn}
                        onChange={(e) => setNewNisn(e.target.value)}
                        className="p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-600 text-[10px] uppercase">Nama Calon Siswa *</label>
                      <input
                        type="text"
                        placeholder="Ananda Rizky"
                        value={newNisnData.nama}
                        onChange={(e) => setNewNisnData({ ...newNisnData, nama: e.target.value })}
                        className="p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-600 text-[10px] uppercase">Jurusan yang Diterima *</label>
                      <input
                        type="text"
                        placeholder="Teknik Komputer & Jaringan (TKJ)"
                        value={newNisnData.jurusan}
                        onChange={(e) => setNewNisnData({ ...newNisnData, jurusan: e.target.value })}
                        className="p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-600 text-[10px] uppercase">Status Seleksi *</label>
                      <select
                        value={newNisnData.status}
                        onChange={(e) => setNewNisnData({ ...newNisnData, status: e.target.value as any })}
                        className="p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary font-bold text-slate-700"
                      >
                        <option value="Lulus">Lulus (Diterima Utama)</option>
                        <option value="Cadangan">Masuk Daftar Cadangan</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <label className="text-slate-600 text-[10px] uppercase">Catatan Panduan Daftar Ulang</label>
                      <textarea
                        rows={2}
                        placeholder="Selamat! Anda dinyatakan LULUS. Silakan lakukan registrasi ulang pada tanggal..."
                        value={newNisnData.catatan}
                        onChange={(e) => setNewNisnData({ ...newNisnData, catatan: e.target.value })}
                        className="p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-hijau-primary"
                      />
                    </div>

                    <div className="sm:col-span-2 text-right">
                      <button
                        type="submit"
                        className="bg-hijau-primary hover:bg-hijau-secondary text-white font-bold py-2 px-5 rounded-xl cursor-pointer shadow-2xs"
                      >
                        Tambah ke Database
                      </button>
                    </div>
                  </form>

                  {/* List of Registered NISNs */}
                  <div className="space-y-3 pt-2 text-xs">
                    <h4 className="font-extrabold text-slate-800 border-l-2 border-hijau-primary pl-2.5">Database Kelulusan Terdaftar</h4>
                    <div className="border border-slate-100 rounded-2xl overflow-hidden">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-100 border-b border-slate-200 text-slate-500 font-bold uppercase text-[9px] tracking-wider">
                            <th className="p-3">NISN</th>
                            <th className="p-3">Nama Lengkap</th>
                            <th className="p-3">Jurusan</th>
                            <th className="p-3 text-center">Status</th>
                            <th className="p-3 text-center">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                          {Object.keys(selectionResults).length === 0 ? (
                            <tr>
                              <td colSpan={5} className="p-4 text-center text-slate-400 font-bold">Database NISN Kosong</td>
                            </tr>
                          ) : (
                            Object.keys(selectionResults).map((nisn) => {
                              const cand = selectionResults[nisn];
                              return (
                                <tr key={nisn} className="hover:bg-slate-50/50 transition-colors">
                                  <td className="p-3 font-mono font-bold text-slate-600">{nisn}</td>
                                  <td className="p-3 font-bold">{cand.nama}</td>
                                  <td className="p-3 text-slate-500">{cand.jurusan}</td>
                                  <td className="p-3 text-center">
                                    <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                                      cand.status === "Lulus"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-oranye-pastel text-oranye-primary"
                                    }`}>
                                      {cand.status === "Lulus" ? "Utama" : "Cadangan"}
                                    </span>
                                  </td>
                                  <td className="p-3 text-center">
                                    <button
                                      onClick={() => handleDeleteNisnResult(nisn)}
                                      className="p-1.5 hover:bg-red-50 text-red-500 hover:text-red-700 rounded-lg transition-colors cursor-pointer"
                                      title="Hapus"
                                    >
                                      <Trash2 className="w-4 h-4 mx-auto" />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 7: PENDAFTAR ONLINE MASUK */}
              {activeSubTab === "pendaftar" && (
                <div className="space-y-6 text-xs">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-xl font-extrabold text-slate-800">Siswa Mendaftar Online</h3>
                    <p className="text-xs text-slate-400 font-semibold">Tinjau data pendaftar yang memasukkan formulir online secara langsung via web.</p>
                  </div>

                   <div className="border border-slate-100 rounded-2xl overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-200 text-slate-500 font-bold uppercase text-[9px] tracking-wider">
                          <th className="p-3">Tanggal</th>
                          <th className="p-3">Nama Pendaftar</th>
                          <th className="p-3">NISN</th>
                          <th className="p-3">Jurusan Pilihan</th>
                          <th className="p-3">Asal Sekolah</th>
                          <th className="p-3">Kontak WA</th>
                          <th className="p-3 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                        {spmbRegistrations && spmbRegistrations.length > 0 ? (
                          spmbRegistrations.map((reg) => (
                            <tr key={reg.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-3 text-slate-400 text-[10px]">{reg.tanggal}</td>
                              <td className="p-3 font-extrabold text-slate-800">{reg.nama}</td>
                              <td className="p-3 font-mono font-bold text-slate-600">{reg.nisn}</td>
                              <td className="p-3 font-bold text-hijau-primary">{reg.pilihanJurusan}</td>
                              <td className="p-3 text-slate-500">{reg.sekolahAsal}</td>
                              <td className="p-3">
                                <a
                                  href={`https://wa.me/${reg.telepon.replace(/^0/, "62")}?text=Halo%20${reg.nama}%2C%20berkas%20pendaftaran%20Anda%20di%20SMK%20Muhammadiyah%204%20Sragen%20telah%20kami%20terima...`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 font-bold text-hijau-primary hover:underline"
                                >
                                  <Phone className="w-3.5 h-3.5" />
                                  <span>{reg.telepon}</span>
                                </a>
                              </td>
                              <td className="p-3 text-center">
                                <button
                                  onClick={() => handleDeleteSpmbRegistration(reg.id)}
                                  className="p-1.5 hover:bg-rose-50 rounded-lg text-rose-500 hover:text-rose-700 transition-colors cursor-pointer"
                                  title="Hapus Pendaftar"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={7} className="p-5 text-center text-slate-400 font-bold">Belum Ada Pendaftar Online Masuk</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 8: HUBUNGI KAMI / PESAN MASUK */}
              {activeSubTab === "messages" && (
                <div className="space-y-6 text-xs animate-in fade-in duration-200">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-xl font-extrabold text-slate-800">Pertanyaan & Masukan (Humas)</h3>
                    <p className="text-xs text-slate-400 font-semibold">Tinjau pesan masuk dari halaman kontak untuk segera dijawab oleh Tim Humas.</p>
                  </div>

                  <div className="space-y-4">
                    {inquiries && inquiries.length > 0 ? (
                      inquiries.map((msg) => (
                        <div key={msg.id} className="border border-slate-100 p-5 rounded-2xl bg-slate-50/30 hover:bg-white transition-all card-shadow-hover space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                            <div>
                              <span className="text-[10px] font-bold text-slate-400">{msg.tanggal}</span>
                              <h4 className="font-extrabold text-slate-800 text-sm mt-0.5">{msg.nama} <span className="text-xs font-semibold text-slate-400">({msg.peran})</span></h4>
                            </div>
                            <div className="flex items-center gap-3">
                              <a
                                href={`mailto:${msg.email}`}
                                className="text-[11px] font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 border border-slate-200 px-2.5 py-1 rounded-lg"
                              >
                                <Mail className="w-3.5 h-3.5" />
                                <span>Kirim Email</span>
                              </a>
                              <a
                                href={`https://wa.me/${msg.telepon.replace(/^0/, "62")}?text=Halo%20${msg.nama}%2C%20terima%20kasih%20telah%20menghubungi%20SMK%20Muhammadiyah%204%20Sragen...`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[11px] font-bold text-hijau-primary hover:text-hijau-secondary flex items-center gap-1 border border-hijau-light bg-hijau-pastel/30 px-2.5 py-1 rounded-lg"
                              >
                                <Phone className="w-3.5 h-3.5" />
                                <span>Balas WA ({msg.telepon})</span>
                              </a>
                              <button
                                onClick={() => handleDeleteInquiry(msg.id)}
                                className="text-[11px] font-bold text-rose-500 hover:text-rose-700 hover:bg-rose-50 flex items-center gap-1 border border-rose-200 px-2.5 py-1 rounded-lg cursor-pointer"
                                title="Hapus Pesan"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Hapus</span>
                              </button>
                            </div>
                          </div>
                          <p className="text-slate-600 font-semibold leading-relaxed">&ldquo;{msg.pesan}&rdquo;</p>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 border border-dashed border-slate-200 rounded-2xl text-center">
                        <MessageSquare className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                        <p className="text-slate-400 font-bold uppercase text-[10px]">Belum Ada Pesan Masuk</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
