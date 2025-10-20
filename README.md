# **ClickUp CLI**

Tool CLI sederhana dan efisien untuk mempermudah interaksi dengan ClickUp langsung dari terminal Anda. Dengan perintah-perintah intuitif, Anda dapat login, mengecek status laporan, dan mengubah status hanya dengan satu baris perintah.

---

## ✨ **Fitur Utama**

- 🔐 **Autentikasi cepat** melalui CLI
- 📊 **Ambil status laporan** secara real time
- ✏️ **Ubah status laporan** hanya dengan satu perintah
- ⚡ **Ringan dan mudah digunakan**

---

## 🚀 **Instalasi**

```bash
npm install -g clickup
```

---

## 📌 **Penggunaan Umum**

```bash
clickup [options] [command]
```

### **Options**

| Opsi            | Deskripsi             |
| --------------- | --------------------- |
| `-V, --version` | Menampilkan versi CLI |
| `-h, --help`    | Menampilkan bantuan   |

---

## 🔧 **Daftar Perintah**

### 🔑 **Login Akun ClickUp**

Autentikasi akun Anda agar dapat menggunakan fitur lainnya.

```bash
clickup auth
```

### 📄 **Cek Status Laporan**

Menampilkan status laporan terkini Anda.

```bash
clickup status
```

### ✏️ **Set Status Laporan**

Mengubah status laporan ke status tertentu.

```bash
clickup set <status>
```

**Contoh:**

```bash
clickup set completed
```

### ❓ **Bantuan**

Melihat bantuan untuk perintah tertentu.

```bash
clickup help [command]
```

---

## 🔄 **Contoh Alur Penggunaan**

```bash
clickup auth
clickup status
clickup set in_progress
clickup status
```

---

## 🧭 **Roadmap**

- ✅ Autentikasi dasar
- ✅ Ambil dan ubah status laporan
- 🔜 Integrasi task management lanjutan
- 🔜 Support multi-workspace

---

## 🤝 **Kontribusi**

Kontribusi sangat terbuka! Silakan buat issue atau pull request untuk fitur baru atau perbaikan bug.

---

## 📄 **Lisensi**

Dirilis di bawah lisensi MIT.
