# **Web2Zip**

Web2Zip adalah aplikasi web sederhana yang memungkinkan pengguna untuk mengonversi sebuah website menjadi file ZIP yang dapat diunduh.

---

## **Fitur**
- Input URL website untuk dikonversi.
- Proses otomatis untuk membuat file ZIP dari konten website.
- Status proses dan tautan unduhan ZIP yang tersedia setelah konversi berhasil.

---

## **Teknologi yang Digunakan**
- **HTML5:** Struktur halaman web.
- **CSS3:** Desain tampilan.
- **JavaScript:** Logika frontend untuk menangani proses konversi dan interaksi dengan server.
- **Node.js & Express.js (Backend):** API untuk memproses konversi website ke file ZIP.

---

## **Cara Menjalankan Proyek**
1. Clone repository ini atau unduh file ZIP:
   ```bash
   git clone https://github.com/dani-techno/web2zip.git
   ```
2. Buka file `index.html` di browser atau jalankan server lokal.
3. Pastikan backend API `/api/web2zip` telah dikonfigurasi untuk memproses permintaan.

---

## **Cara Menggunakan**
1. Masukkan URL website yang ingin dikonversi ke dalam input form.
2. Klik tombol "Convert".
3. Tunggu proses hingga status menunjukkan "ZIP file created successfully!".
4. Klik tombol "Download ZIP File" untuk mengunduh hasilnya.

---

## **API Endpoint**
- **POST /api/web2zip**
  - Body: 
    ```json
    {
      "url": "https://example.com"
    }
    ```
  - Response:
    ```json
    {
      "zipPath": "/path/to/generated.zip"
    }
    ```

---

## **Kontak Pengembang**
- **Nama:** Dani Technology (Full Stack Engineer)  
- **WhatsApp:** +62 838-3499-4479 / +62 823-2066-7363  
- **Email:** [dani.technology.id@gmail.com](mailto:dani.technology.id@gmail.com)  

---

## **Lisensi**
Proyek ini menggunakan lisensi [MIT](LICENSE.txt). Silakan gunakan dan modifikasi sesuai kebutuhan.