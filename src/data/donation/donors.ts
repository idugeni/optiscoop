// src/data/donation/donors.ts

export interface Donor {
  name: string;
  amount: string;
  imageUrl?: string; // Optional Google Drive image URL
}

export const donors: Donor[] = [
  { name: 'Kementerian Imigrasi dan Pemasyarakat', amount: 'Rp 25.000.000', imageUrl: 'https://drive.google.com/uc?export=view&id=1fi6A4AvumIUtofSvvGbTdXKlGtBb8M9C' },
  { name: 'Direktorat Jenderal Imigrasi', amount: 'Rp 15.000.000', imageUrl: 'https://drive.google.com/uc?export=view&id=1oRDIMGGp8tN7lzn_gOMttFP8-UZVzsNj' },
  { name: 'Direktorat Jenderal Pemasyarakatan', amount: 'Rp 15.000.000', imageUrl: 'https://drive.google.com/uc?export=view&id=1YVl8p2B76f4OiLjV6Rb_rJXxm3tFjbdr' },
];