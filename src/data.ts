/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProgramKeahlian, GalleryItem, Testimonial } from "./types";

export const SCHOOL_INFO = {
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
};

export const PROGRAMS_DATA: ProgramKeahlian[] = [
  {
    id: "tkj",
    nama: "Teknik Komputer dan Jaringan",
    singkatan: "TKJ",
    deskripsi: "Menyiapkan tenaga ahli di bidang instalasi jaringan, administrasi server, keamanan siber, dan perakitan perangkat keras.",
    deskripsiLengkap: "Program Keahlian Teknik Komputer dan Jaringan (TKJ) SMK Muhammadiyah 4 Sragen mendidik siswa untuk menguasai teknologi jaringan terkini, mulai dari jaringan lokal (LAN), jaringan luas (WAN), administrasi server cloud, hingga konfigurasi perangkat jaringan kelas industri seperti MikroTik dan Cisco. Kurikulum kami diselaraskan dengan industri digital untuk mencetak teknisi IT yang tanggap dan berdaya saing tinggi.",
    iconName: "Network",
    keunggulan: [
      "Sertifikasi Kompetensi Industri Terakreditasi",
      "Laboratorium Komputer Modern Full AC",
      "MikroTik Academy (Siswa dapat sertifikat resmi MTCNA)",
      "Pembelajaran Berbasis Proyek (Project-Based Learning)"
    ],
    materiPokok: [
      "Administrasi Infrastruktur Jaringan",
      "Administrasi Sistem Jaringan (Linux/Windows Server)",
      "Teknologi Layanan Jaringan & Keamanan Siber",
      "Pemrograman Dasar & Internet of Things (IoT)",
      "Cloud Computing & Virtualization"
    ],
    prospekKarir: [
      "Network Engineer / Administrator Jaringan",
      "IT Support & System Administrator",
      "Teknisi Jaringan & Komputer",
      "Wirausaha di Bidang Jasa IT (ISP, RT/RW Net)"
    ],
    bannerUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "tkro",
    nama: "Teknik Kendaraan Ringan Otomotif",
    singkatan: "TKRO",
    deskripsi: "Membekali siswa dengan kompetensi perawatan dan perbaikan mesin otomotif, sistem kelistrikan, dan sasis kendaraan ringan.",
    deskripsiLengkap: "Program Keahlian Teknik Kendaraan Ringan Otomotif (TKRO) berfokus pada penguasaan teknologi otomotif roda empat yang berkembang pesat. Siswa dilatih secara intensif untuk melakukan diagnosis, servis berkala, dan perbaikan mesin (engine tune-up), sistem transmisi, sasis, kemudi, hingga sistem kelistrikan modern berbasis EFI (Electronic Fuel Injection). Sinergi dengan industri otomotif ternama memastikan lulusan kami siap diserap pasar kerja nasional.",
    iconName: "Wrench",
    keunggulan: [
      "Bekerjasama dengan Industri Otomotif Terkemuka",
      "Bengkel Praktik yang Luas dengan Peralatan Standar Industri",
      "Pelatihan Mengemudi Mobil & Pembekalan Lisensi",
      "Uji Kompetensi Langsung oleh Asesor Profesional"
    ],
    materiPokok: [
      "Pemeliharaan Mesin Kendaraan Ringan (Engine)",
      "Pemeliharaan Sasis dan Pemindah Tenaga (Chassis)",
      "Pemeliharaan Kelistrikan Kendaraan Ringan (EFI & ECU)",
      "Teknologi Otomotif Hybrid dan Listrik (E-Vehicle)",
      "Gambar Teknik Otomotif Berbasis CAD"
    ],
    prospekKarir: [
      "Mekanik Profesional di Bengkel Resmi",
      "Service Advisor / Koordinator Bengkel",
      "Operator Perakitan Industri Otomotif",
      "Wirausaha Bengkel Mandiri / Toko Suku Cadang"
    ],
    bannerUrl: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "akl",
    nama: "Akuntansi dan Keuangan Lembaga",
    singkatan: "AKL",
    deskripsi: "Menghasilkan lulusan yang ahli dalam pengelolaan keuangan, pembukuan digital, perpajakan, dan administrasi perkantoran modern.",
    deskripsiLengkap: "Program Keahlian Akuntansi dan Keuangan Lembaga (AKL) membekali siswa dengan kecakapan dalam mengelola transaksi keuangan secara manual maupun digital. Melalui kurikulum berbasis akuntansi modern, siswa dilatih mengoperasikan software akuntansi populer (seperti MYOB, Zahir, dan Spreadsheet canggih) serta memahami administrasi perpajakan dan perbankan syariah. Ketelitian, integritas, dan literasi finansial merupakan nilai utama yang kami tanamkan.",
    iconName: "Calculator",
    keunggulan: [
      "Laboratorium Akuntansi Manual & Komputer Akuntansi",
      "Sinergi Magang dengan Bank Syariah dan Instansi Daerah",
      "Penyelarasan Kompetensi dengan Standar Ikatan Akuntan Indonesia",
      "Pelatihan Aplikasi Keuangan Terkini"
    ],
    materiPokok: [
      "Akuntansi Keuangan & Praktikum Lembaga/Instansi Pemerintah",
      "Komputer Akuntansi (MYOB Accounting & Spreadsheet)",
      "Administrasi Pajak & SPT Elektronik",
      "Perbankan Dasar & Lembaga Keuangan Mikro/Syariah",
      "Etika Profesi & Tata Kelola Keuangan"
    ],
    prospekKarir: [
      "Staff Akuntansi / Finance Officer",
      "Teller & Customer Service Perbankan",
      "Staff Administrasi Kantor / Kasir",
      "Wirausaha Muda Berbasis Digital & Jasa Keuangan"
    ],
    bannerUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800"
  }
];

export const GALLERY_DATA: GalleryItem[] = [
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
];

export const TESTIMONIALS_DATA: Testimonial[] = [
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
];
