<!DOCTYPE html>
<html lang="id">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>Kuesioner — OrganCek</title>
  <meta name="description"
    content="Isi kuesioner skrining kesehatan organ pilihan Anda dan dapatkan hasil analisis risiko secara instan." />
  <link rel="stylesheet" href="/css/style.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
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
      <li><a href="/kuesioner" class="nav-link active" data-page="kuis">Kuesioner</a></li>
      <li><a href="/hasil" class="nav-link" data-page="hasil">Hasil</a></li>
      <li><a href="/edukasi" class="nav-link" data-page="edukasi">Edukasi</a></li>
    </ul>
  </nav>

  <div class="page-wrapper">
    <!-- ===== DISCLAIMER (Moved to Top) ===== -->
    <section class="section" style="padding-top: 2.5rem; padding-bottom: 0;">
      <div class="container">
        <div class="disclaimer-banner" style="border-color: var(--danger); background: rgba(239, 68, 68, 0.1);">
          <i class="fa-solid fa-triangle-exclamation" style="color: var(--danger);"></i>
          <span style="color: #FFBAB6;">
            <strong style="color: var(--danger);">Disclaimer:</strong> OrganCek adalah alat <em>skrining mandiri</em>
            berbasis gejala dan <strong>bukan merupakan alat diagnostik medis</strong>.
            Hasil kuesioner ini tidak menggantikan pemeriksaan oleh tenaga medis profesional.
            Selalu konsultasikan kondisi kesehatan Anda dengan dokter yang berkompeten.
            Data Anda <strong>tidak disimpan</strong> dan akan terhapus otomatis saat browser ditutup.
          </span>
        </div>
      </div>
    </section>

    <div class="kuis-wrapper">

      <!-- ===== STEP 1: ORGAN SELECTION ===== -->
      <div id="step-select" class="anim-fadein">
        <div class="text-center mb-4">
          <div class="section-label"><i class="fa-solid fa-hand-pointer"></i> Langkah 1 dari 2</div>
          <h1 style="font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight: 800; margin-bottom: 0.75rem;">
            Pilih <span class="gradient-text">Organ</span> yang Ingin Dicek
          </h1>
          <p style="color: var(--text-secondary); font-size: 0.95rem; max-width: 480px; margin: 0 auto;">
            Pilih satu atau lebih organ. Kuesioner akan muncul sesuai organ yang dipilih.
          </p>
        </div>

        <div class="organ-select-grid" id="organ-select-grid">
          <!-- Cards rendered by JS -->
        </div>

        <div class="bmi-form glass-card" style="max-width: 400px; margin: 2rem auto 1rem; padding: 1.5rem; text-align: left;">
          <h3 style="font-size: 1.1rem; margin-bottom: 0.5rem; text-align: center;">Data Fisik</h3>
          <p style="text-align: center; font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 1.25rem;">Digunakan untuk menghitung Indeks Massa Tubuh (BMI) yang memengaruhi skor akhir risiko.</p>
          <div style="display: flex; gap: 1rem;">
            <div style="flex: 1;">
              <label for="input-weight" style="display: block; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem;">Berat Badan (kg)</label>
              <input type="number" id="input-weight" style="width: 100%; padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border); background: rgba(0,0,0,0.2); color: white; outline: none; font-family: 'Inter', sans-serif;" placeholder="Cth: 65">
            </div>
            <div style="flex: 1;">
              <label for="input-height" style="display: block; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem;">Tinggi Badan (cm)</label>
              <input type="number" id="input-height" style="width: 100%; padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border); background: rgba(0,0,0,0.2); color: white; outline: none; font-family: 'Inter', sans-serif;" placeholder="Cth: 165">
            </div>
          </div>
        </div>

        <div style="text-align: center; margin-top: 1rem;">
          <p id="select-hint" style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1.25rem;">
            <i class="fa-solid fa-circle-info"></i> Pilih minimal satu organ untuk melanjutkan
          </p>
          <button id="btn-start-quiz" class="btn btn-primary btn-lg" disabled>
            <i class="fa-solid fa-arrow-right"></i> Mulai Kuesioner
          </button>
        </div>

        <div class="mt-4">
          <div class="disclaimer-banner">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <span>
              <strong>Ingat:</strong> Kuesioner ini adalah alat skrining mandiri dan <strong>bukan diagnosis
                medis</strong>.
              Hasil akan <strong>terhapus otomatis</strong> saat Anda menutup browser.
            </span>
          </div>
        </div>
      </div>

      <!-- ===== STEP 2: QUIZ ===== -->
      <div id="step-quiz" class="hidden">

        <!-- Organ progress dots -->
        <div class="organ-steps" id="organ-steps-dots"></div>

        <!-- Quiz header (organ label + progress) -->
        <div class="quiz-header">
          <div class="quiz-organ-label">
            <div class="organ-icon" id="quiz-organ-icon"></div>
            <div>
              <div id="quiz-organ-name" class="quiz-organ-name"></div>
              <div style="color: var(--text-muted); font-size: 0.8rem;">Jawab semua pertanyaan dengan jujur</div>
            </div>
          </div>

          <div class="quiz-progress-info">
            <span id="quiz-progress-text"></span>
            <span id="quiz-progress-pct" style="color: var(--text-primary); font-weight: 600;"></span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" id="quiz-progress-bar" style="width: 0%"></div>
          </div>
        </div>

        <!-- Questions container -->
        <div id="questions-container"></div>

        <!-- Navigation -->
        <div class="quiz-nav">
          <button id="btn-prev" class="btn btn-secondary">
            <i class="fa-solid fa-arrow-left"></i> Sebelumnya
          </button>
          <div id="quiz-nav-center" style="color: var(--text-muted); font-size: 0.8rem; text-align: center;"></div>
          <button id="btn-next" class="btn btn-primary">
            Selanjutnya <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>

      <!-- ===== STEP 3: DONE (all organs complete) ===== -->
      <div id="step-done" class="hidden" style="text-align: center; padding: 3rem 1rem;">
        <div style="font-size: 5rem; margin-bottom: 1.5rem;" class="anim-beat">✅</div>
        <h2 style="font-size: 2rem; font-weight: 800; margin-bottom: 0.75rem;">Kuesioner Selesai!</h2>
        <p
          style="color: var(--text-secondary); margin-bottom: 2rem; max-width: 400px; margin-left: auto; margin-right: auto;">
          Semua jawaban telah tersimpan. Lihat hasil analisis dan rekomendasi kesehatan organmu.
        </p>
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <a href="/hasil" class="btn btn-primary btn-lg">
            <i class="fa-solid fa-chart-bar"></i> Lihat Hasil Saya
          </a>
          <button onclick="resetAndRestart()" class="btn btn-secondary">
            <i class="fa-solid fa-rotate-left"></i> Ulangi Kuesioner
          </button>
        </div>
      </div>

    </div>
  </div>

  <!-- FOOTER -->
  <footer>
    <div class="container">
      <p>
        <strong style="color: var(--accent)">OrganCek</strong> &mdash;
        Bukan pengganti diagnosis medis profesional.
      </p>
    </div>
  </footer>

  <script src="/js/app.js"></script>
  <script src="/js/kuesioner.js"></script>
</body>

</html>