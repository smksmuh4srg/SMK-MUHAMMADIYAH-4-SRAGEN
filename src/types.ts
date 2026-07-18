/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProgramKeahlian {
  id: string;
  nama: string;
  singkatan: string;
  deskripsi: string;
  deskripsiLengkap: string;
  iconName: string; // Used to map to Lucide icons
  keunggulan: string[];
  materiPokok: string[];
  prospekKarir: string[];
  bannerUrl: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Praktek" | "Fasilitas" | "Eskul" | "Kegiatan" | "Prestasi";
  imageUrl: string;
  description: string;
  date?: string;
}

export interface ContactSubmission {
  nama: string;
  email: string;
  telepon: string;
  peran: "Wali Siswa" | "Calon Siswa" | "Alumni" | "Masyarakat Umum";
  pesan: string;
}

export interface Testimonial {
  id: string;
  nama: string;
  peran: string;
  angkatan?: string;
  testimoni: string;
  avatarUrl: string;
}
