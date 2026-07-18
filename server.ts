/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(process.cwd(), "data.json");

// Middleware
app.use(express.json());

// Initial default data
const DEFAULT_DATA = {
  schoolInfo: {
    nama: "SMK Muhammadiyah 4 Sragen",
    tagline: "Terampil, Berkarakter Islami, dan Siap Kerja",
    alamat: "Jl. Veteran No. 42, Kebonromo, Ngrampal, Sragen, Jawa Tengah 57252",
    telepon: "(0271) 891234",
    whatsapp: "6281234567890",
    email: "info@smkmuh4sragen.sch.id",
    jamKerja: "Senin - Sabtu, 07:00 - 14:00 WIB",
    akreditasi: "A",
    npsn: "20314040",
    kepalaSekolah: "Drs. H. Sugiyanto, M.Pd.",
    tahunBerdiri: "1998",
    acronym: "SMK MUHESA",
    customLogoUrl: ""
  },
  programs: [
    {
      id: "tkj",
      nama: "Teknik Komputer dan Jaringan",
      singkatan: "TKJ",
      deskripsi: "Menyiapkan tenaga ahli di bidang instalasi jaringan, administrasi server, keamanan siber, dan perakitan perangkat keras.",
      deskripsiLengkap: "Program Keahlian Teknik Komputer dan Jaringan (TKJ) SMK Muhammadiyah 4 Sragen mendidik siswa untuk menguasai teknologi jaringan terkini, mulai dari jaringan lokal (LAN), jaringan luas (WAN), administrasi server cloud, hingga konfigurasi perangkat jaringan kelas industri seperti MikroTik dan Cisco.",
      iconName: "Network",
      keunggulan: [
        "Sertifikasi Kompetensi Industri Terakreditasi",
        "Laboratorium Komputer Modern Full AC",
        "MikroTik Academy (Siswa dapat sertifikat resmi MTCNA)",
        "Pembelajaran Berbasis Proyek"
      ],
      materiPokok: [
        "Administrasi Infrastruktur Jaringan",
        "Administrasi Sistem Jaringan (Linux/Windows Server)",
        "Teknologi Layanan Jaringan & Keamanan Siber",
        "Pemrograman Dasar & Internet of Things"
      ],
      prospekKarir: [
        "Network Engineer / Administrator Jaringan",
        "IT Support & System Administrator",
        "Teknisi Jaringan & Komputer",
        "Wirausaha di Bidang Jasa IT"
      ],
      bannerUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "keperawatan",
      nama: "Asisten Keperawatan (Layanan Kesehatan)",
      singkatan: "KEPERAWATAN",
      deskripsi: "Membekali siswa dengan pengetahuan, keterampilan, dan sikap dalam memberikan asuhan keperawatan dasar berkualitas.",
      deskripsiLengkap: "Program Keahlian Asisten Keperawatan mendidik siswa untuk terampil dalam asuhan keperawatan dasar, etika profesi, komunikasi terapeutik, dan penanganan kebutuhan dasar pasien sesuai standar pelayanan kesehatan.",
      iconName: "Heart",
      keunggulan: [
        "Praktik Klinik di Rumah Sakit & Puskesmas",
        "Laboratorium Keperawatan Standar Rumah Sakit",
        "Sertifikasi Kompetensi Asisten Keperawatan Nasional"
      ],
      materiPokok: [
        "Konsep Dasar Keperawatan & Anatomi Fisiologi",
        "Kebutuhan Dasar Manusia & Keterampilan Tindakan Keperawatan",
        "Ilmu Kesehatan Masyarakat & Farmakologi Dasar"
      ],
      prospekKarir: [
        "Asisten Perawat di Rumah Sakit / Klinik",
        "Home Care Caregiver Profesional",
        "Tenaga Medis di Klinik/Puskesmas",
        "Melanjutkan Pendidikan Tinggi Keperawatan/Kebidanan"
      ],
      bannerUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "farmasi",
      nama: "Farmasi Klinis dan Komunitas",
      singkatan: "FARMASI",
      deskripsi: "Mendidik siswa terampil dalam pengelolaan obat-obatan, pembuatan sediaan obat, dan pelayanan kefarmasian di apotek dan rumah sakit.",
      deskripsiLengkap: "Program Keahlian Farmasi membekali siswa dengan pemahaman ilmu kimia farmasi, farmakognosi, teknik pembuatan obat, tata kelola administrasi apotek, serta etika pelayanan kefarmasian yang prima.",
      iconName: "Activity",
      keunggulan: [
        "Laboratorium Resep Farmasi yang Lengkap",
        "Kerjasama Praktik dengan Apotek & Rumah Sakit Terkemuka",
        "Uji Kompetensi Kompeten LSP Asisten Tenaga Kefarmasian"
      ],
      materiPokok: [
        "Farmakologi & Farmakognosi",
        "Pelayanan Kefarmasian (Resep & Sediaan)",
        "Kimia Farmasi & Administrasi Farmasi"
      ],
      prospekKarir: [
        "Asisten Tenaga Kefarmasian di Apotek/Klinik",
        "Staff Produksi di Industri Farmasi/Kosmetik",
        "Staff Logistik Obat di Rumah Sakit",
        "Wirausaha Toko Obat Mandiri"
      ],
      bannerUrl: "https://images.unsplash.com/photo-1587854692152-cbe660db0979?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "mplb",
      nama: "Manajemen Perkantoran dan Layanan Bisnis",
      singkatan: "MPLB",
      deskripsi: "Menghasilkan tenaga administrasi perkantoran yang profesional, terampil teknologi informasi kantor, kearsipan digital, dan komunikasi bisnis.",
      deskripsiLengkap: "Program Keahlian Manajemen Perkantoran dan Layanan Bisnis (MPLB) fokus pada penguasaan administrasi perkantoran modern, tata kelola dokumen digital, manajemen rapat, keprotokolan, dan layanan prima kepada kolega/pelanggan.",
      iconName: "Briefcase",
      keunggulan: [
        "Simulasi Lab Perkantoran Modern",
        "Sertifikasi Kearsipan Digital & Korespondensi",
        "Kerjasama Magang dengan BUMN dan Instansi Pemerintahan"
      ],
      materiPokok: [
        "Teknologi Perkantoran & Otomatisasi Tata Kelola",
        "Korespondensi Indonesia & Inggris",
        "Kearsipan Elektronik & Manajemen Rapat"
      ],
      prospekKarir: [
        "Sekretaris Junior / Asisten Administratif",
        "Customer Relation Officer & Resepsionis",
        "Arsiparis Digital / Data Entry Specialist",
        "Staf Kepegawaian (HRD Admin)"
      ],
      bannerUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "akl",
      nama: "Akuntansi dan Keuangan Lembaga",
      singkatan: "AKUNTANSI",
      deskripsi: "Menghasilkan lulusan yang ahli dalam pengelolaan keuangan, pembukuan digital, perpajakan, dan administrasi perkantoran modern.",
      deskripsiLengkap: "Program Keahlian Akuntansi dan Keuangan Lembaga membekali siswa dengan kecakapan dalam mengelola transaksi keuangan secara manual maupun digital menggunakan software akuntansi industri terkemuka.",
      iconName: "Calculator",
      keunggulan: [
        "Laboratorium Akuntansi Manual & Komputer Akuntansi",
        "Sinergi Magang dengan Perbankan Syariah dan Instansi Daerah",
        "Pelatihan Aplikasi MYOB, Accurate, & Spreadsheet Profesional"
      ],
      materiPokok: [
        "Akuntansi Keuangan & Praktikum Lembaga",
        "Komputer Akuntansi (MYOB Accounting & Spreadsheet)",
        "Administrasi Pajak & SPT Elektronik"
      ],
      prospekKarir: [
        "Staff Akuntansi / Finance Officer",
        "Teller & Customer Service Perbankan",
        "Staff Administrasi Kantor / Kasir",
        "Wirausaha & Konsultan Keuangan Pemula"
      ],
      bannerUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "tsm",
      nama: "Teknik Sepeda Motor",
      singkatan: "TSM",
      deskripsi: "Membekali siswa dengan kompetensi perawatan, diagnosis kerusakan, dan perbaikan mesin sepeda motor serta kelistrikan kendaraan roda dua.",
      deskripsiLengkap: "Program Keahlian Teknik Sepeda Motor (TSM) berfokus pada penguasaan teknologi otomotif roda dua terupdate, termasuk sistem injeksi, kelistrikan bodi, sasis, dan manajemen bengkel motor mandiri.",
      iconName: "Wrench",
      keunggulan: [
        "Bekerjasama dengan Industri Sepeda Motor Nasional",
        "Bengkel Praktik Berstandar AHASS",
        "Pelatihan Mekanik Injeksi Terpadu"
      ],
      materiPokok: [
        "Pemeliharaan Mesin Sepeda Motor (Engine)",
        "Pemeliharaan Sasis Sepeda Motor",
        "Pemeliharaan Kelistrikan Sepeda Motor & Sistem Injeksi"
      ],
      prospekKarir: [
        "Mekanik Profesional di Bengkel Resmi Sepeda Motor",
        "Kepala Mekanik / Service Advisor",
        "Wirausaha Bengkel Sepeda Motor & Toko Suku Cadang",
        "Modifikator Otomotif Profesional"
      ],
      bannerUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=800"
    }
  ],
  gallery: [
    {
      id: "g1",
      title: "Praktik Lab TKJ Jaringan Serat Optik",
      category: "Praktek",
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600",
      description: "Siswa TKJ sedang melakukan praktik penyambungan kabel fiber optik (splicing) menggunakan fusion splicer di Lab Komputer.",
      date: "12 Mei 2026"
    },
    {
      id: "g2",
      title: "Tune-up Mesin EFI Bengkel Otomotif",
      category: "Praktek",
      imageUrl: "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&q=80&w=600",
      description: "Praktik analisis sistem injeksi elektronik (Electronic Fuel Injection) roda empat menggunakan engine scanner terbaru di Bengkel TKRO.",
      date: "28 April 2026"
    },
    {
      id: "g3",
      title: "Simulasi Komputer Akuntansi Terpadu",
      category: "Praktek",
      imageUrl: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&q=80&w=600",
      description: "Siswa kelas XII AKL sedang menyusun laporan keuangan bulanan instansi pemerintah menggunakan aplikasi komputer akuntansi.",
      date: "05 Juni 2026"
    },
    {
      id: "g4",
      title: "Gedung Ruang Kelas Baru & Masjid",
      category: "Fasilitas",
      imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600",
      description: "Tampak depan ruang kelas teori yang nyaman dan asri, dilengkapi dengan Masjid sekolah untuk pembiasaan ibadah harian.",
      date: "10 Maret 2026"
    },
    {
      id: "g5",
      title: "Kajian Rutin & Salat Berjamaah",
      category: "Kegiatan",
      imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=600",
      description: "Kegiatan pembinaan karakter Islami harian berupa tadarus Al-Qur'an dan kajian fiqih remaja di Masjid sekolah.",
      date: "14 Juli 2026"
    },
    {
      id: "g6",
      title: "Latihan Ekstrakurikuler Hisbul Wathan",
      category: "Eskul",
      imageUrl: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=600",
      description: "Latihan kepanduan Hisbul Wathan (HW) untuk melatih kedisiplinan, kerjasama tim, dan kepemimpinan berlandaskan nilai Islam.",
      date: "18 Juni 2026"
    },
    {
      id: "g7",
      title: "Juara 1 LKS Tingkat Kabupaten Sragen",
      category: "Prestasi",
      imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600",
      description: "Siswa perwakilan SMK Muhammadiyah 4 Sragen meraih Juara Pertama dalam Lomba Kompetensi Siswa (LKS) bidang IT Network System Administration.",
      date: "20 Mei 2026"
    },
    {
      id: "g8",
      title: "Kunjungan Industri ke Pabrik Astra",
      category: "Kegiatan",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600",
      description: "Kegiatan rutin Kunjungan Industri bagi siswa kelas X untuk mengenalkan iklim kerja nyata langsung di lini produksi manufaktur.",
      date: "04 Februari 2026"
    }
  ],
  testimonials: [
    {
      id: "t1",
      nama: "Fajar Wicaksono",
      peran: "Network Administrator di Telkom Indonesia",
      angkatan: "Lulusan 2021 (TKJ)",
      testimoni: "Belajar di SMK Muhammadiyah 4 Sragen memberikan fondasi IT yang sangat kuat. Berkat sertifikasi MikroTik Academy yang difasilitasi sekolah, saya langsung diterima kerja sebelum wisuda kelulusan.",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: "t2",
      nama: "Anisa Rahmawati",
      peran: "Staf Akuntansi & Pajak di PT Kalbe Farma",
      angkatan: "Lulusan 2020 (AKL)",
      testimoni: "Bimbingan intensif dari guru-guru yang penyabar dan kompeten di lab komputer akuntansi membuat saya tidak canggung menghadapi laporan keuangan perusahaan skala besar. SMK Muhammadiyah 4 Sragen luar biasa!",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: "t3",
      nama: "Bambang Pamungkas",
      peran: "Kepala Bengkel di Astra Daihatsu Sragen",
      angkatan: "Lulusan 2018 (TKRO)",
      testimoni: "Fasilitas bengkel praktik di sekolah sangat representatif dengan standar dealer resmi. Pelatihan kedisiplinan dan pembentukan karakter Islami membuat kami tidak hanya terampil, tapi juga memiliki integritas tinggi yang dicari industri.",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
    }
  ],
  waves: [
    {
      nama: "Gelombang 1 (Unggulan)",
      tanggal: "01 Januari - 31 Maret 2026",
      status: "Selesai",
      colorClass: "border-slate-200 bg-slate-50/50 text-slate-400"
    },
    {
      nama: "Gelombang 2 (Reguler I)",
      tanggal: "01 April - 30 Juni 2026",
      status: "Selesai",
      colorClass: "border-slate-200 bg-slate-50/50 text-slate-400"
    },
    {
      nama: "Gelombang 3 (Reguler II)",
      tanggal: "01 Juli - 15 Agustus 2026",
      status: "Sedang Berlangsung",
      colorClass: "border-hijau-light bg-hijau-pastel/50 text-hijau-primary"
    }
  ],
  requirements: [
    "Mengisi formulir pendaftaran online maupun offline.",
    "Fotokopi Ijazah / Surat Keterangan Lulus (SKL) SMP/MTs dilegalisir (2 lembar).",
    "Fotokopi Kartu Keluarga (KK) dan Akta Kelahiran (2 lembar).",
    "Pas foto terbaru ukuran 3x4 berwarna (4 lembar).",
    "Fotokopi kartu penunjang (KIP/KKS/PKH) bagi yang memiliki.",
    "Menyerahkan fotokopi piagam prestasi akademis/non-akademis (jika ada)."
  ],
  selectionResults: {
    "1234567890": {
      nama: "Ananda Rizky Pratama",
      status: "Lulus",
      jurusan: "Teknik Komputer & Jaringan (TKJ)",
      catatan: "Selamat! Anda dinyatakan LULUS SELEKSI UTAMA. Silakan melakukan registrasi ulang pada tanggal 20-25 Juli 2026 di Ruang Panitia SPMB."
    },
    "2026010203": {
      nama: "Siti Aminah",
      status: "Lulus",
      jurusan: "Akuntansi & Keuangan Lembaga (AKL)",
      catatan: "Selamat! Anda dinyatakan LULUS SELEKSI UTAMA. Silakan melakukan registrasi ulang pada tanggal 20-25 Juli 2026 di Ruang Panitia SPMB."
    },
    "3039090807": {
      nama: "Budi Santoso",
      status: "Cadangan",
      jurusan: "Teknik Kendaraan Ringan Otomotif (TKRO)",
      catatan: "Anda dinyatakan masuk dalam daftar CADANGAN. Panitia akan menghubungi Anda jika ada kuota kosong setelah masa daftar ulang gelombang pertama selesai."
    }
  },
  inquiries: [
    {
      id: "inq-1",
      nama: "Ahmad Dani",
      email: "ahmaddani@gmail.com",
      telepon: "081234567899",
      peran: "Calon Siswa",
      pesan: "Kapan gelombang 3 ditutup dan apa saja tes masuknya?",
      tanggal: "18 Juli 2026"
    }
  ],
  spmbRegistrations: [
    {
      id: "spmb-1",
      nama: "Ananda Rizky Pratama",
      nisn: "1234567890",
      pilihanJurusan: "Teknik Komputer & Jaringan (TKJ)",
      telepon: "089876543210",
      sekolahAsal: "SMP Negeri 1 Sragen",
      status: "Verifikasi Berkas",
      tanggal: "15 Juli 2026"
    }
  ]
};

// Ensure data file exists with default template
const loadData = () => {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_DATA, null, 2), "utf-8");
    return DEFAULT_DATA;
  }
  try {
    const content = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    console.error("Error reading data.json, resetting to defaults", error);
    return DEFAULT_DATA;
  }
};

const saveData = (data: any) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
};

// API Endpoints
app.get("/api/content", (req, res) => {
  const data = loadData();
  res.json(data);
});

// Update content
app.post("/api/content/update", (req, res) => {
  const { passcode, section, content } = req.body;
  const adminPasscode = process.env.ADMIN_PASSCODE || "admin123";

  const normalizedPass = (passcode || "").trim().toLowerCase();
  const normalizedAdminPass = adminPasscode.trim().toLowerCase();

  if (
    normalizedPass !== "yusufromadhoni" &&
    normalizedPass !== "admin" &&
    normalizedPass !== normalizedAdminPass
  ) {
    return res.status(401).json({ error: "Sandi Admin Tidak Valid" });
  }

  const data = loadData();

  if (section && content !== undefined) {
    data[section] = content;
    saveData(data);
    return res.json({ success: true, message: `Berhasil memperbarui bagian ${section}` });
  } else {
    return res.status(400).json({ error: "Data atau nama bagian tidak valid" });
  }
});

// Admin Login validation
app.post("/api/login", (req, res) => {
  const { passcode } = req.body;
  const adminPasscode = process.env.ADMIN_PASSCODE || "admin123";

  const normalizedPass = (passcode || "").trim().toLowerCase();
  const normalizedAdminPass = adminPasscode.trim().toLowerCase();

  if (
    normalizedPass === "yusufromadhoni" ||
    normalizedPass === "admin" ||
    normalizedPass === normalizedAdminPass
  ) {
    res.json({ success: true, token: "admin_token_auth_valid" });
  } else {
    res.status(401).json({ success: false, error: "Sandi Admin Salah!" });
  }
});

// Post inquiry/contact submission
app.post("/api/inquiries", (req, res) => {
  const { nama, email, telepon, peran, pesan } = req.body;
  if (!nama || !telepon || !pesan) {
    return res.status(400).json({ error: "Kolom wajib tidak boleh kosong" });
  }

  const data = loadData();
  const newInquiry = {
    id: "inq-" + Date.now(),
    nama,
    email: email || "",
    telepon,
    peran: peran || "Calon Siswa",
    pesan,
    tanggal: new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  };

  data.inquiries = [newInquiry, ...(data.inquiries || [])];
  saveData(data);

  res.json({ success: true, data: newInquiry });
});

// Post SPMB registration submission (custom online registration!)
app.post("/api/spmb-register", (req, res) => {
  const { nama, nisn, pilihanJurusan, telepon, sekolahAsal } = req.body;
  if (!nama || !nisn || !pilihanJurusan || !telepon) {
    return res.status(400).json({ error: "Kolom wajib tidak boleh kosong" });
  }

  const data = loadData();
  
  // Register as SPMB Applicant
  const newReg = {
    id: "spmb-" + Date.now(),
    nama,
    nisn,
    pilihanJurusan,
    telepon,
    sekolahAsal: sekolahAsal || "-",
    status: "Verifikasi Berkas",
    tanggal: new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  };

  // Add registration to spmbRegistrations
  data.spmbRegistrations = [newReg, ...(data.spmbRegistrations || [])];

  // Also pre-populate selectionResults so the admin can search them easily later (default as "Cadangan" or pending)
  if (!data.selectionResults[nisn]) {
    data.selectionResults[nisn] = {
      nama,
      status: "Cadangan",
      jurusan: pilihanJurusan,
      catatan: "Pendaftaran Anda telah diterima secara online. Berkas Anda saat ini sedang dalam proses verifikasi panitia penerimaan."
    };
  }

  saveData(data);
  res.json({ success: true, data: newReg });
});

// Vite server integration
const startServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
