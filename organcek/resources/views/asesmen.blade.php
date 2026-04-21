<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kuesioner Asesmen - Aplikasi Medis</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
    <link rel="icon" type="image/svg+xml"
        href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'><path fill='%2306b6d4' d='M142.4 21.9c5.6 16.8-3.5 34.9-20.2 40.5L96 71.1 96 192c0 53 43 96 96 96s96-43 96-96l0-120.9-26.1-8.7c-16.8-5.6-25.8-23.7-20.2-40.5s23.7-25.8 40.5-20.2l26.1 8.7C334.4 19.1 352 43.5 352 71.1L352 192c0 77.2-54.6 141.6-127.3 156.7C231 404.6 278.4 448 336 448c61.9 0 112-50.1 112-112l0-70.7c-28.3-12.3-48-40.5-48-73.3c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3l0 70.7c0 97.2-78.8 176-176 176c-92.9 0-168.9-71.9-175.5-163.1C87.2 334.2 32 269.6 32 192L32 71.1c0-27.5 17.6-52 43.8-60.7l26.1-8.7c16.8-5.6 34.9 3.5 40.5 20.2zM480 224a32 32 0 1 0 0-64 32 32 0 1 0 0 64z'/></svg>" />
    <style>
        .biodata-form input[type="number"] {
            color-scheme: dark;
        }
    </style>
</head>

<body>
    <nav class="navbar">
        <a href="/" class="navbar-brand">
            <div class="navbar-logo"><i class="fa-solid fa-stethoscope"></i></div>
            <span class="navbar-title">Organ<span>Check</span></span>
        </a>
        <ul class="navbar-nav">
            <li><a href="/" class="nav-link" data-page="home">Beranda</a></li>
            <li><a href="/asesmen" class="nav-link active" data-page="kuis">Asesmen</a></li>
            <li><a href="/hasil" class="nav-link" data-page="hasil">Hasil</a></li>
            <li><a href="/edukasi" class="nav-link" data-page="edukasi">Edukasi</a></li>
        </ul>
    </nav>

    <div class="page-wrapper">
        <div class="disclaimer-ribbon">
            <i class="fa-solid fa-triangle-exclamation"></i> <strong>Disclaimer:</strong> Tes ini hanya untuk prediksi
            awal
            dan tidak menggantikan diagnosis medis profesional.
        </div>

        <main id="app-container" class="wizard-container">
            <!-- Phase 0: Biodata -->
            <section id="phase0-biodata" class="active">
                <div class="card wizard-card text-center">
                    <h2
                        style="font-family: 'Poppins', sans-serif; font-size: 2.2rem; font-weight: 700; margin-bottom: 0.5rem; text-align: center;">
                        Informasi Dasar
                    </h2>
                    <p
                        style="color: var(--text-secondary); max-width: 550px; margin: 0 auto; font-size: 0.95rem; line-height: 1.6; text-align: center;">
                        Masukin tinggi dan berat badanmu dulu ya sebelum mulai jawab pertanyaannya.
                    </p>
                    <form id="biodata-form" class="biodata-form text-left" style="max-width: 400px; margin: 2rem auto;">
                        <div class="form-group">
                            <label>Tinggi Badan (cm)</label>
                            <input type="number" id="tinggi_badan" name="tinggi_badan" required
                                placeholder="Contoh: 170" min="50" max="250">
                        </div>
                        <div class="form-group">
                            <label>Berat Badan (kg)</label>
                            <input type="number" id="berat_badan" name="berat_badan" required placeholder="Contoh: 65"
                                min="10" max="300">
                        </div>
                        <div class="text-center" style="margin-top: 2rem;">
                            <button type="submit" class="btn-pill">Berikutnya &rarr;</button>
                        </div>
                    </form>
                </div>
                <div class="disclaimer-banner"
                    style="margin-top: 2rem; max-width: 700px; margin-left: auto; margin-right: auto; text-align: left;">
                    <i class="fa-solid fa-triangle-exclamation" style="color: var(--danger);"></i>
                    <span style="color: #FFBAB6; font-size: 0.85rem;">
                        <strong style="color: var(--danger);">Penting:</strong> Data Anda <strong><U>TIDAK
                                DISIMPAN</U></strong> di server dan akan terhapus otomatis saat browser ditutup atau
                        kuesioner
                        diulangi. Pastikan untuk mengunduh hasil di akhir sesi jika ingin menyimpannya.
                    </span>
                </div>
            </section>

            <section id="phase0-organ" class="hidden">
                <div class="card wizard-card text-center" style="margin-bottom: 2.5rem; text-align: center;">
                    <h2
                        style="font-family: 'Poppins', sans-serif; font-size: 2.2rem; font-weight: 800; margin-bottom: 0.5rem; text-align: center;">
                        Pilih <span class="gradient-text">Organ</span> Tujuanmu
                    </h2>
                    <p
                        style="color: var(--text-secondary); max-width: 570px; margin: 0 auto; font-size: 0.95rem; line-height: 1.6;">
                        Klik organ yang mau kamu periksa. Kuesionernya bakal ngikutin pilihanmu, lho
                    </p>

                    <div style="max-width: 500px; margin: 0 auto;">

                        <div class="organ-select-grid">
                            <div class="organ-select-card" data-organ="jantung">
                                <div class="check-icon"><i class="fa-solid fa-check"></i></div>
                                <div class="pilihan-organ-img">
                                    <img src="/img/jantung.png" alt="Jantung">
                                </div>
                                <h3
                                    style="font-family: 'Poppins', sans-serif; font-size: 1.3rem; font-weight: 800; margin-bottom: 0;">
                                    Jantung
                                </h3>
                            </div>

                            <div class="organ-select-card" data-organ="hati">
                                <div class="check-icon"><i class="fa-solid fa-check"></i></div>
                                <div class="pilihan-organ-img">
                                    <img src="/img/hati.png" alt="Hati">
                                </div>
                                <h3
                                    style="font-family: 'Poppins', sans-serif; font-size: 1.3rem; font-weight: 800; margin-bottom: 0;">
                                    Hati
                                </h3>
                            </div>

                            <div class="organ-select-card" data-organ="paru">
                                <div class="check-icon"><i class="fa-solid fa-check"></i></div>
                                <div class="pilihan-organ-img">
                                    <img src="/img/paru.png" alt="Paru-paru">
                                </div>
                                <h3
                                    style="font-family: 'Poppins', sans-serif; font-size: 1.3rem; font-weight: 800; margin-bottom: 0;">
                                    Paru-Paru
                                </h3>
                            </div>

                            <div class="organ-select-card" data-organ="ginjal">
                                <div class="check-icon"><i class="fa-solid fa-check"></i></div>
                                <div class="pilihan-organ-img">
                                    <img src="/img/ginjal.png" alt="Ginjal">
                                </div>
                                <h3
                                    style="font-family: 'Poppins', sans-serif; font-size: 1.3rem; font-weight: 800; margin-bottom: 0;">
                                    Ginjal
                                </h3>
                            </div>
                        </div>
                        <div style="text-align: center; margin-top: 1.5rem; margin-bottom: 1.5rem;">
                            <label
                                style="cursor: pointer; display: inline-flex; align-items: center; gap: 0.5rem; color: var(--text-secondary); font-size: 0.9rem; user-select: none;">
                                <input type="checkbox" id="cb-pilih-semua"
                                    style="width: 16px; height: 16px; accent-color: var(--accent); cursor: pointer;">
                                Pilih Semua
                            </label>
                        </div>
                        <div class="text-center" style="margin-top: 1rem;">
                            <p id="select-hint"
                                style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1rem;">
                                <i class="fa-solid fa-circle-info"></i> Pilih minimal satu organ untuk melanjutkan
                            </p>
                            <button type="button" id="btn-kembali-organ" class="btn-outline btn-pill"
                                style="padding: 14px 32px; font-size: 1rem; margin-right: 1rem;">&larr; Kembali</button>
                            <button type="button" id="btn-lanjut" class="btn-pill" disabled
                                style="padding: 14px 32px; font-size: 1rem;">Mulai Tes &rarr;</button>
                        </div>
                    </div>
                </div>



                <div class="disclaimer-banner"
                    style="margin-top: 2rem; max-width: 700px; margin-left: auto; margin-right: auto; text-align: left;">
                    <i class="fa-solid fa-triangle-exclamation" style="color: var(--danger);"></i>
                    <span style="color: #FFBAB6; font-size: 0.85rem;">
                        <strong style="color: var(--danger);">Penting:</strong> Data Anda <strong><U>TIDAK
                                DISIMPAN</U></strong> di server dan akan terhapus otomatis saat browser ditutup atau
                        kuesioner diulangi. Pastikan untuk mengunduh hasil di akhir sesi jika ingin menyimpannya.
                    </span>
                </div>
            </section>

            <!-- Phase 1: Kuesioner -->
            <section id="phase1-kuesioner" class="card wizard-card hidden">
                <!-- Progress Bar -->
                <div class="wizard-header">
                    <div class="wizard-progress">
                        <div id="progress-bar-fill" class="wizard-progress-bar"></div>
                    </div>
                    <div id="progress-text" class="wizard-progress-text">1/10</div>
                </div>

                <!-- Question Wrapper -->
                <div id="question-wrapper">
                    <div id="question-pill" class="question-pill">Question 1</div>
                    <h2 id="question-text" class="question-text">Loading question...</h2>

                    <div id="options-container" class="options-container">
                        <!-- Options injected by JS -->
                    </div>
                </div>

                <!-- Controls -->
                <div class="wizard-controls">
                    <button type="button" id="btn-prev" class="btn-pill">&larr; Sebelumnya</button>
                    <button type="button" id="btn-next" class="btn-pill">Berikutnya &rarr;</button>
                </div>

                <div class="text-center" style="margin-top: 2rem;">
                    <a href="/"
                        style="color: #a0aec0; text-decoration: none; font-size: 0.85rem; border-bottom: 1px solid #a0aec0;">Return
                        to homepage</a>
                </div>
            </section>

            <!-- Phase 2: Loading -->
            <section id="phase2-loading" class="card wizard-card hidden text-center" style="padding: 4rem 2rem;">
                <div class="loader"></div>
                <h2>Memproses...</h2>
                <p style="color: var(--text-muted);">Menghitung dan memproses data kuesioner Anda...</p>
            </section>
        </main>
    </div>

    <footer>
        <div class="container">
            <p>
                <strong style="color: var(--accent)">OrganCheck</strong> &mdash;
                Alat skrining kesehatan mandiri berbasis gejala. <strong>BUKAN PENGGANTI DIAGNOSIS MEDIS
                    PROFESIONAL.</strong>
            </p>
            <p class="mt-1">Hasil kuesioner ini tidak menggantikan pemeriksaan oleh tenaga medis profesional.
                Selalu konsultasikan kondisi kesehatan Anda dengan dokter yang berkompeten.</p>
        </div>
    </footer>

    <script src="/js/app.js"></script>
    <script src="/js/script.js"></script>
</body>

</html>