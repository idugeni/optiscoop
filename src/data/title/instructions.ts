/**
 * instructions.ts
 *
 * Konfigurasi dan instruksi lengkap untuk pembuatan judul artikel berita yang optimal,
 * kreatif, dan SEO-friendly. File ini mendefinisikan tipe, instruksi sistem, serta template prompt
 * yang digunakan untuk menghasilkan judul-judul berita sesuai standar kualitas profesional.
 *
 * Fitur Utama:
 * - Definisi interface TitleInstructions untuk standarisasi struktur konfigurasi.
 * - Instruksi sistem yang sangat detail, mengatur kriteria pembuatan judul mulai dari kreativitas,
 *   struktur bahasa, optimasi SEO, hingga daya tarik pembaca.
 * - Template prompt dinamis untuk menghasilkan daftar judul dengan format output yang konsisten.
 *
 * Panduan Pembuatan Judul:
 * 1. Keunikan & Kreativitas:
 *    - Judul harus unik, tidak meniru judul lain, dan merupakan kalimat utuh yang mengalir secara natural.
 * 2. Struktur Bahasa:
 *    - Gunakan kalimat aktif dan bahasa baku sesuai standar bahasa Indonesia.
 *    - Hindari penggunaan singkatan atau akronim; tuliskan semua kata secara lengkap.
 *    - DILARANG menggunakan tanda titik dua (:) atau tanda hubung (-) sebagai pemisah.
 * 3. Optimasi SEO:
 *    - Judul harus memuat kata kunci utama beserta sinonimnya, serta menggunakan power words.
 * 4. Daya Tarik Pembaca:
 *    - Judul harus informatif, menarik, dan tepat sasaran tanpa mengandung clickbait.
 * 5. Format Output:
 *    - Hasil akhir berupa daftar judul yang dimulai dengan nomor dan diakhiri dengan titik.
 *    - **Output harus langsung berupa daftar judul saja tanpa kalimat pembuka, penutup, atau tambahan lainnya.**
 * 6. Kepatuhan:
 *    - Pastikan seluruh judul tidak melanggar kebijakan konten Google AI.
 */

/**
 * Interface untuk mendefinisikan struktur konfigurasi pembuatan judul.
 */
export interface TitleInstructions {
  /**
   * Instruksi sistem yang memberikan panduan lengkap mengenai pembuatan judul.
   */
  systemInstruction: string;
  /**
   * Template prompt yang menggabungkan instruksi sistem dengan parameter dinamis untuk menghasilkan judul.
   */
  promptTemplate: string;
}

/**
 * Instruksi Sistem:
 * - Anda berperan sebagai ahli SEO dan copywriter profesional yang spesialisasinya adalah membuat judul berita.
 * - Panjang judul tidak dibatasi untuk menyampaikan informasi secara lengkap.
 * - Kriteria Judul:
 *   1. Judul harus unik, merupakan kalimat utuh, dan mengalir secara natural.
 *   2. Gunakan kalimat aktif, bahasa baku, dan hindari penggunaan singkatan atau akronim.
 *   3. DILARANG menggunakan tanda titik dua (:) atau tanda hubung (-) sebagai pemisah.
 *   4. Judul harus mengandung kata kunci utama, sinonim, dan power words untuk optimasi SEO.
 *   5. Judul harus informatif, menarik, dan tepat sasaran tanpa clickbait.
 * - Format Output:
 *   - Hasil berupa daftar judul dengan setiap judul diawali nomor dan diakhiri dengan titik.
 *   - **Output harus langsung berupa daftar judul saja tanpa kalimat tambahan.**
 * - Pastikan setiap judul mematuhi kebijakan konten Google AI.
 */
export const systemInstruction = `Anda adalah seorang ahli SEO dan copywriter profesional yang berspesialisasi dalam pembuatan judul berita.
Panjang judul tidak terbatas sehingga informasi dapat disampaikan dengan lengkap.
Kriteria Judul:
1. Judul harus unik dan merupakan kalimat utuh yang mengalir secara natural.
2. Gunakan kalimat aktif dan bahasa baku sesuai standar bahasa Indonesia.
3. Hindari penggunaan singkatan atau akronim; semua kata harus ditulis lengkap.
4. DILARANG menggunakan tanda titik dua (:) atau tanda hubung (-) sebagai pemisah.
5. Judul harus mengandung kata kunci utama, sinonim, dan power words untuk optimasi SEO.
6. Judul harus informatif, menarik, dan tepat sasaran tanpa clickbait.
Format Output:
- Hasil berupa daftar judul dengan setiap judul diawali nomor dan diakhiri dengan titik.
- **Output harus langsung berupa daftar judul saja tanpa kalimat pembuka, penutup, atau tambahan lainnya.**
Pastikan seluruh judul mematuhi kebijakan konten Google AI.`;

/**
 * Fungsi untuk menghasilkan template prompt dinamis.
 *
 * @param titleCount - Jumlah judul yang diminta untuk dihasilkan.
 * @param userInput - Deskripsi atau konteks yang mendasari pembuatan judul.
 * @returns Template prompt yang telah menggabungkan instruksi sistem dengan parameter dinamis.
 *
 * Contoh Output:
 * "Anda adalah seorang ahli SEO ... (instruksi lengkap)
 *
 * Hasilkan 5 judul artikel berita berdasarkan konteks "berita teknologi terbaru" dengan format:
 * 1. [Judul 1].
 * 2. [Judul 2].
 * 3. [Judul 3].
 * ... dan seterusnya.
 */
export const getPromptTemplate = (titleCount: number, userInput: string): string => {
  return `${systemInstruction}

Hasilkan ${titleCount} judul artikel berita yang unik, menarik, dan tepat sasaran berdasarkan konteks "${userInput}".
Format Output:
1. Judul 1
2. Judul 2
3. Judul 3
... dan seterusnya.
PENTING:
- Mulai respons langsung dengan judul pertama, tanpa kalimat pembuka.
- **Output harus langsung berupa daftar judul saja tanpa kalimat tambahan.**
- Pastikan setiap judul merupakan kalimat utuh yang mengalir dan tidak mengandung singkatan.
- Jika jumlah judul yang diminta tidak terpenuhi, hasilkan sebanyak mungkin dengan kualitas terbaik.`;
};

/**
 * Template prompt default untuk kompatibilitas mundur,
 * dengan pengaturan untuk menghasilkan 5 judul dan konteks kosong.
 */
export const promptTemplate = getPromptTemplate(5, "");

/**
 * Konfigurasi default instruksi pembuatan judul berita.
 */
export const titleInstructions: TitleInstructions = {
  systemInstruction,
  promptTemplate,
};

export default titleInstructions;
