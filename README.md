# bank-lantabur

Prototipe interaktif **Lantabur AI Financing**, dibuat oleh [amantech.id](https://amantech.id/) untuk memvisualisasikan integrasi sistem bank dengan AI credit scoring.

![Preview dashboard](docs/preview.jpg)

## Menjalankan

Gunakan Node.js 22 atau lebih baru dan npm.

```bash
npm ci
npm run dev
```

Buka http://127.0.0.1:3000/. Dashboard tersedia langsung di halaman utama.

```bash
npm test
npm run typecheck
npm run build
```

Konfigurasi memakai static export Next.js. Hasil build ada di `out/`, siap disajikan melalui static hosting. Untuk preview hasil build:

```bash
python3 -m http.server 3000 --bind 127.0.0.1 --directory out
```

## Fitur

- Ringkasan pengajuan dan plafon pembiayaan.
- Pencarian dan filter risiko pengajuan.
- Pemilihan nasabah, enam input yang dapat diubah, dan perhitungan tiga zona risiko.
- Visualisasi alur integrasi serta sinkronisasi data dummy.
- Ringkasan konsep model AI dan ekspor CSV dummy.
- Tampilan responsif dan dukungan reduced motion.

## Batasan demo

Seluruh nama, pengajuan, nominal, dan probabilitas merupakan fixture fiktif. Mesin `dummy-logistic-v1` berjalan lokal di browser tanpa API key. Model menggunakan rumus sigmoid dengan bobot manual, bukan hasil training CatBoost atau model yang tervalidasi. Tidak ada koneksi ke sistem bank, database nasabah, API inferensi eksternal, atau model terlatih. Tidak ada keputusan pembiayaan nyata.

Konsep mengacu pada notebook credit scoring BPRS yang diberikan pemilik proyek: preprocessing, perbandingan delapan model, dan zona risiko <20%, 20–55%, >55%. Notebook, dataset, dan artefak model tidak disertakan dalam repository ini.

## Stack dan aset

Next.js, React, TypeScript, Lucide React, dan CSS. Logo Lantabur bersumber dari [situs resmi BPRS Lantabur](https://bprslantabur.id/wp-content/uploads/2022/11/Logo-LTI-Horizontal-1.png). Hak merek tetap milik pemiliknya. Ini adalah prototipe visual oleh amantech.id.

## Cara mencoba model dummy

1. Pilih nasabah di tabel sebagai skenario awal.
2. Ubah plafon, tenor, pendapatan bulanan, beban lain, tunggakan, atau lama usaha.
3. Klik **Jalankan simulasi**. Skor, zona, rasio beban, dan faktor terbesar dihitung dari input tersebut.
4. Turunkan pendapatan atau tambah tunggakan, lalu hitung ulang untuk membandingkan hasil. Perubahan input menghapus hasil lama agar tidak tertukar.

Rumus: `sigmoid(-4.8 + 5 × min(rasioBeban, 3) + 0.8 × tunggakan + 0.8 × tenor/60 + indikatorUsahaBaru × 0.8)`. Rasio beban menggunakan `(plafon/tenor + bebanLain)/pendapatan`; pembagian pokok ini tidak menghitung margin bank. Faktor yang ditampilkan adalah komponen rumus dummy, bukan penjelasan model terlatih. Input usia, gender, dan identitas pribadi tidak digunakan.
