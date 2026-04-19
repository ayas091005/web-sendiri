<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kuesioner Asesmen - Aplikasi Medis</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
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
                Alat skrining kesehatan mandiri. Bukan pengganti diagnosis medis profesional.
            </p>
            <p class="mt-1">Selalu konsultasikan kesehatan Anda dengan dokter yang berkompeten.</p>
        </div>
    </footer>

    <script src="/js/app.js"></script>
    <script src="/js/script.js"></script>
</body>

</html>