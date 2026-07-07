# 🖼️ Görsel İşleyici

Modern ve kullanıcı dostu bir görsel düzenleme uygulaması. Fotoğraflara farklı efektler uygulayabilir, efekt yoğunluğunu ayarlayabilir, sürüklenebilir emojiler ekleyebilir ve düzenlediğiniz görselleri yüksek kalitede kaydedebilirsiniz.

---

## ✨ Özellikler

- 📂 Bilgisayardan görsel yükleme
- 🎨 Birden fazla görsel efekt
- 🎚️ Ayarlanabilir efekt yoğunluğu
- 😀 Sürüklenebilir ve yeniden boyutlandırılabilir emojiler
- 💾 Yüksek kaliteli PNG olarak kaydetme
- ⚡ Hızlı ve modern arayüz

---

## 🛠️ Kullanılan Teknolojiler

### Frontend

- React
- Axios
- React RND
- HTML2Canvas

### Backend

- FastAPI
- Pillow (PIL)
- Uvicorn

---

# Kurulum

## 1. Projeyi İndirin

```bash
git clone https://github.com/KULLANICI_ADINIZ/gorsel-isleyici.git
```

veya ZIP olarak indirip çıkartın.

---

## 2. Backend Kurulumu

Backend klasörüne girin.

```bash
cd backend
```

Gerekli paketleri yükleyin.

```bash
pip install fastapi uvicorn pillow python-multipart
```

Sunucuyu başlatın.

```bash
python main.py
```

Sunucu aşağıdaki adreste çalışacaktır.

```
http://localhost:8000
```

---

## 3. Frontend Kurulumu

Frontend klasörüne girin.

```bash
cd frontend
```

Bağımlılıkları yükleyin.

```bash
npm install
```

Projeyi başlatın.

```bash
npm start
```

veya

```bash
npm run dev
```

(Kullandığınız React sürümüne göre.)

---

# Nasıl Kullanılır

1. Görsel yükleyin.
2. Efekt seçin.
3. Efekt yoğunluğunu ayarlayın.
4. İsterseniz emoji ekleyin.
5. Emojileri sürükleyin veya boyutlandırın.
6. **Kaydet** butonuna basarak düzenlenen görseli bilgisayarınıza indirin.

---

# Desteklenen Efektler

- Grayscale
- Sepia
- Brightness
- Contrast
- Sharpness
- Blur
- Emboss
- Contour
- Detail
- Edge Enhance

---

# Proje Yapısı

```
gorsel-isleyici/
│
├── backend/
│   ├── main.py
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── ...
│
└── README.md
```

---

# Lisans

Bu proje eğitim ve kişisel kullanım amacıyla geliştirilmiştir.

---