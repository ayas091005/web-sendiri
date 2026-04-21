<!DOCTYPE html>
<html lang="id">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Edukasi Kesehatan — OrganCek</title>
  <meta name="description"
    content="Panduan Do & Don't kesehatan untuk jantung, hati, paru-paru, dan ginjal berdasarkan hasil kuesioner Anda." />
  <link rel="stylesheet" href="/css/style.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
  <link rel="icon" type="image/svg+xml"
    href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'><path fill='%2306b6d4' d='M142.4 21.9c5.6 16.8-3.5 34.9-20.2 40.5L96 71.1 96 192c0 53 43 96 96 96s96-43 96-96l0-120.9-26.1-8.7c-16.8-5.6-25.8-23.7-20.2-40.5s23.7-25.8 40.5-20.2l26.1 8.7C334.4 19.1 352 43.5 352 71.1L352 192c0 77.2-54.6 141.6-127.3 156.7C231 404.6 278.4 448 336 448c61.9 0 112-50.1 112-112l0-70.7c-28.3-12.3-48-40.5-48-73.3c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3l0 70.7c0 97.2-78.8 176-176 176c-92.9 0-168.9-71.9-175.5-163.1C87.2 334.2 32 269.6 32 192L32 71.1c0-27.5 17.6-52 43.8-60.7l26.1-8.7c16.8-5.6 34.9 3.5 40.5 20.2zM480 224a32 32 0 1 0 0-64 32 32 0 1 0 0 64z'/></svg>" />

</head>

<body>

  <!-- NAVBAR -->
  <nav class="navbar">
    <a href="/" class="navbar-brand">
      <div class="navbar-logo"><i class="fa-solid fa-stethoscope"></i></div>
      <span class="navbar-title">Organ<span>Cek</span></span>
    </a>
    <ul class="navbar-nav">
      <li><a href="/" class="nav-link" data-page="home">Beranda</a></li>
      <li><a href="/asesmen" class="nav-link" data-page="kuis">Asesmen</a></li>
      <li><a href="/hasil" class="nav-link" data-page="hasil">Hasil</a></li>
      <li><a href="/edukasi" class="nav-link active" data-page="edukasi">Edukasi</a></li>
    </ul>
  </nav>

  <div class="page-wrapper" style="padding-top: var(--nav-height);">
    <div class="disclaimer-ribbon">
      <i class="fa-solid fa-triangle-exclamation"></i> <strong>Disclaimer:</strong> Tes ini hanya untuk prediksi awal
      dan tidak menggantikan diagnosis medis profesional.
    </div>

    <div class="edukasi-wrapper">

      <!-- Page Header -->
      <div class="text-center mb-3 anim-fadeup">
        <h1
          style="font-family: 'Poppins', sans-serif; font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 900; margin-bottom: 0.75rem; line-height: 1.1;">
          <span class="gradient-text" style="display: inline-block; margin-bottom: -0.1em;">Panduan Kesehatan</span>
          <br /><span style="font-size: 0.65em; font-weight: 650;">Know More About Your Body</span>
        </h1>
        <p
          style="color: var(--text-secondary); font-size: 0.92rem; max-width: 560px; margin: 0 auto; line-height: 1.8;">
          Panduan gaya hidup berbasis bukti ilmiah untuk menjaga kesehatan organ Anda.
        </p>
      </div>

      <!-- Organ Tabs -->
      <div class="organ-tabs" id="edu-tabs" role="tablist">
        <!-- Rendered by JS -->
      </div>

      <!-- Panels -->
      <div id="edu-panels">
        <!-- Rendered by JS -->
      </div>

      <!-- Disclaimer -->
      <div class="disclaimer-banner mt-4">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <span>
          <strong>Penting:</strong> Panduan di halaman ini bersifat edukatif umum dan <strong>bukan pengganti saran
            medis profesional</strong>.
          Kondisi setiap individu berbeda. Selalu konsultasikan perubahan gaya hidup signifikan dengan dokter Anda.
        </span>
      </div>

    </div>
  </div>

  <!-- FOOTER -->
  <footer>
    <div class="container">
      <p>
        <strong style="color: var(--accent)">OrganCheck</strong> &mdash;
        Alat skrining kesehatan mandiri berbasis gejala. <strong>BUKAN PENGGANTI DIAGNOSIS MEDIS PROFESIONAL.</strong>
      </p>
      <p class="mt-1">Hasil kuesioner ini tidak menggantikan pemeriksaan oleh tenaga medis profesional.
        Selalu konsultasikan kondisi kesehatan Anda dengan dokter yang berkompeten.</p>
    </div>
  </footer>

  <script src="/js/app.js"></script>
  <script src="/js/edukasi.js"></script>
</body>

</html>