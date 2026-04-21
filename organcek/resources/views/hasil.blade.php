<!DOCTYPE html>
<html lang="id">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hasil Asesmen - OrganCheck</title>
  <link
    href="https://fonts.googleapis.com/css2?family=Poppins:wght@700;800;900&family=Inter:wght@400;500;600&display=swap"
    rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
  <link rel="icon" type="image/svg+xml"
    href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'><path fill='%2306b6d4' d='M142.4 21.9c5.6 16.8-3.5 34.9-20.2 40.5L96 71.1 96 192c0 53 43 96 96 96s96-43 96-96l0-120.9-26.1-8.7c-16.8-5.6-25.8-23.7-20.2-40.5s23.7-25.8 40.5-20.2l26.1 8.7C334.4 19.1 352 43.5 352 71.1L352 192c0 77.2-54.6 141.6-127.3 156.7C231 404.6 278.4 448 336 448c61.9 0 112-50.1 112-112l0-70.7c-28.3-12.3-48-40.5-48-73.3c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3l0 70.7c0 97.2-78.8 176-176 176c-92.9 0-168.9-71.9-175.5-163.1C87.2 334.2 32 269.6 32 192L32 71.1c0-27.5 17.6-52 43.8-60.7l26.1-8.7c16.8-5.6 34.9 3.5 40.5 20.2zM480 224a32 32 0 1 0 0-64 32 32 0 1 0 0 64z'/></svg>" />

</head>

<body>
  <nav class="navbar">
    <a href="/" class="navbar-brand">
      <div class="navbar-logo"><i class="fa-solid fa-stethoscope"></i></div>
      <span class="navbar-title">Organ<span>Check</span></span>
    </a>
    <ul class="navbar-nav">
      <li><a href="/" class="nav-link" data-page="home">Beranda</a></li>
      <li><a href="/asesmen" class="nav-link" data-page="kuis">Asesmen</a></li>
      <li><a href="/hasil" class="nav-link active" data-page="hasil">Hasil</a></li>
      <li><a href="/edukasi" class="nav-link" data-page="edukasi">Edukasi</a></li>
    </ul>
  </nav>

  <div class="page-wrapper">
    <div class="disclaimer-ribbon">
      <i class="fa-solid fa-triangle-exclamation"></i> <strong>Disclaimer:</strong> Tes ini hanya untuk prediksi awal
      dan tidak menggantikan diagnosis medis profesional.
    </div>

    <div class="page-wrapper" style="padding-top: 0rem;">
      <div id="empty-state" class="container text-center hidden" style="padding: 8rem 1rem;">
        <div style="font-size: 4.5rem; margin-bottom: 1.5rem; opacity: 0.5;">📋</div>
        <h2
          style="font-size: 1.8rem; font-weight: 800; margin-bottom: 0.75rem; color: var(--text-secondary); font-family: 'Poppins', sans-serif;">
          Belum Ada Hasil Kuesioner</h2>
        <p
          style="color: var(--text-muted); margin-bottom: 2rem; font-size: 1rem; max-width: 500px; margin-left: auto; margin-right: auto;">
          Silakan isi kuesioner terlebih dahulu untuk melihat hasil analisis kesehatan organ Anda.</p>
        <a href="/asesmen" class="btn btn-primary btn-lg"><i class="fa-solid fa-play"></i> Mulai Kuesioner</a>
      </div>

      <div id="results-area" class="hidden">
        <div id="printable-area">
          <section class="section" style="padding-top: 2rem; padding-bottom: 0; text-align: center;">
            <div class="container">
              <h1
                style="font-family: 'Poppins', sans-serif; font-weight: 900; font-size: clamp(2.2rem, 5vw, 3.5rem); margin-bottom: 0.75rem; letter-spacing: -1px;">
                Laporan <span class="gradient-text">Kesehatan Organmu</span>
              </h1>
              <p
                style="color: var(--text-secondary); font-size: 1.05rem; max-width: 800px; margin: 0 auto; line-height: 1.6;">
                Berdasarkan jawaban kuesioner Anda, berikut adalah analisis risiko organ yang diperiksa.
              </p>
            </div>
            <div class="disclaimer-banner"
              style="margin-top: 2rem; max-width: 700px; margin-left: auto; margin-right: auto; text-align: left;">
              <i class="fa-solid fa-triangle-exclamation" style="color: var(--danger);"></i>
              <span style="color: #FFBAB6; font-size: 0.85rem;">
                <strong style="color: var(--danger);">Penting:</strong> Data Anda <strong><U>TIDAK DISIMPAN</U></strong>
                di server dan akan terhapus otomatis saat browser ditutup atau kuesioner diulangi. Silakan unduh hasil
                Anda untuk menyimpannya.
              </span>
            </div>
          </section>

          <section class="section" style="padding-top: 1rem;">
            <div class="container">
              <div class="laporan-grid" id="laporan-grid">
                <!-- Dynamically filled by javascript -->
              </div>
            </div>
          </section>
        </div>

        <section class="section" style="padding-top: 0rem;">
          <div class="container">
            <div class="action-area">
              <div style="display: flex; gap: 1rem; margin-top: 1rem; justify-content: center; flex-wrap: wrap;">
                <button id="btn-download-pdf" class="btn btn-primary btn-lg anim-pulse"
                  style="display: inline-flex; align-items: center; gap: 0.75rem; border: none; font-size: 1rem;">
                  <i class="fa-solid fa-image"></i> Download Hasil (Gambar)
                </button>
                <a href="/asesmen" class="btn btn-outline btn-lg"
                  style="display: inline-flex; align-items: center; gap: 0.75rem; font-size: 1rem; text-decoration: none;">
                  <i class="fa-solid fa-rotate-right"></i> Ulangi Kuesioner
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

    </div>

    <footer style="margin-top: 2rem;">
      <div class="container">
        <p>
          <strong style="color: var(--accent)">OrganCheck</strong> &mdash;
          Alat skrining kesehatan mandiri berbasis gejala. <strong>BUKAN PENGGANTI DIAGNOSIS MEDIS PROFESIONAL.</strong>
        </p>
        <p class="mt-1">Hasil kuesioner ini tidak menggantikan pemeriksaan oleh tenaga medis profesional.
          Selalu konsultasikan kondisi kesehatan Anda dengan dokter yang berkompeten.</p>
      </div>
    </footer>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <script src="/js/app.js"></script>
    <script src="/js/hasil.js"></script>
</body>

</html>