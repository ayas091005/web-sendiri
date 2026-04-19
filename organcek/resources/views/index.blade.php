<!DOCTYPE html>
<html lang="id">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>OrganCheck — Cek Kesehatan Organmu Sekarang</title>
  <meta name="description"
    content="OrganCheck adalah alat skrining kesehatan interaktif untuk memantau kondisi organ tubuh Anda." />
  <link rel="icon" type="image/svg+xml"
    href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'><path fill='%2306b6d4' d='M142.4 21.9c5.6 16.8-3.5 34.9-20.2 40.5L96 71.1 96 192c0 53 43 96 96 96s96-43 96-96l0-120.9-26.1-8.7c-16.8-5.6-25.8-23.7-20.2-40.5s23.7-25.8 40.5-20.2l26.1 8.7C334.4 19.1 352 43.5 352 71.1L352 192c0 77.2-54.6 141.6-127.3 156.7C231 404.6 278.4 448 336 448c61.9 0 112-50.1 112-112l0-70.7c-28.3-12.3-48-40.5-48-73.3c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3l0 70.7c0 97.2-78.8 176-176 176c-92.9 0-168.9-71.9-175.5-163.1C87.2 334.2 32 269.6 32 192L32 71.1c0-27.5 17.6-52 43.8-60.7l26.1-8.7c16.8-5.6 34.9 3.5 40.5 20.2zM480 224a32 32 0 1 0 0-64 32 32 0 1 0 0 64z'/></svg>" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@800;900&family=Inter:wght@400;500;600&display=swap"
    rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

  <style>
    /* Penyesuaian Padding Global agar lebih pas (tidak terlalu lebar) */
    .section {
      padding: 3.5rem 0 !important;
    }

    /* Extra landing styles */
    .hero-content {
      position: relative;
      z-index: 2;
    }

    .hero-title {
      font-family: 'Poppins', sans-serif !important;
      font-weight: 900 !important;
      font-size: clamp(2.5rem, 5vw, 4.5rem);
      margin-bottom: 1.8rem !important;
      /* Ruang antara judul dan deskripsi */
    }


    .cta-section {
      background: linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%);
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      padding: 4rem 2rem;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .cta-section::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at center, rgba(6, 182, 212, 0.05) 0%, transparent 70%);
      pointer-events: none;
    }

    .cta-section h2 {
      font-family: 'Poppins', sans-serif;
      font-size: clamp(1.8rem, 4vw, 2.5rem);
      font-weight: 800;
      margin-bottom: 1rem;
      position: relative;
    }

    .cta-section p {
      color: var(--text-secondary);
      max-width: 480px;
      margin: 0 auto 2rem;
      position: relative;
    }

    /* Penyesuaian layout tombol hero agar vertikal dan di tengah */
    .hero-actions {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.85rem;
      justify-content: center;
    }

    /* Style untuk link Cara Pakai (Bukan Button) */
    .link-text {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.85rem;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .link-text:hover {
      color: var(--text-primary);
    }

    .link-text i {
      margin-right: 0.3rem;
    }

    .hero-bubbles {
      position: absolute;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
      z-index: 1;
    }

    .bubble {
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle at 30% 30%, rgba(168, 85, 247, 0.25), transparent 70%);
      filter: blur(4px);
      animation: float 6s ease-in-out infinite;
    }

    .bubble-1 {
      width: 120px;
      height: 120px;
      top: 30%;
      left: 15%;
      animation-delay: 0s;
    }

    .bubble-2 {
      width: 250px;
      height: 250px;
      bottom: 5%;
      right: 10%;
      animation-delay: 0s;
      background: radial-gradient(circle at 30% 30%, rgba(168, 85, 247, 0.15), transparent 70%);
    }

    .bubble-3 {
      width: 80px;
      height: 80px;
      top: 15%;
      right: 15%;
      animation-delay: 0s;
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
      <li><a href="/" class="nav-link active" data-page="home">Beranda</a></li>
      <li><a href="/asesmen" class="nav-link" data-page="kuis">Asesmen</a></li>
      <li><a href="/hasil" class="nav-link" data-page="hasil">Hasil</a></li>
      <li><a href="/edukasi" class="nav-link" data-page="edukasi">Edukasi</a></li>
    </ul>
  </nav>

  <div class="page-wrapper" style="padding-top: var(--nav-height);">
    <div class="disclaimer-ribbon">
      <i class="fa-solid fa-triangle-exclamation"></i> <strong>Disclaimer:</strong> Tes ini hanya untuk prediksi
      awal dan tidak menggantikan diagnosis medis profesional.
    </div>

    <section class="hero" style="min-height: calc(100vh - var(--nav-height) - 30px); justify-content: center;">

      <div class="hero-bubbles">
        <div class="bubble bubble-1"></div>
        <div class="bubble bubble-2"></div>
        <div class="bubble bubble-3"></div>
      </div>

      <div class="hero-content">
        <div class="hero-badge anim-fadeup delay-1" style="opacity:0">
          <i class="fa-solid fa-circle-check"></i>
          Gratis · Tanpa Login · Privasi Terjaga
        </div>

        <h1 class="hero-title anim-fadeup delay-1" style="opacity:0">
          Kenali Kondisi<br />
          <span class="brand">Organmu</span>
        </h1>

        <p class="hero-desc anim-fadeup delay-2" style="opacity:0">
          Skrining kesehatan cerdas untuk <strong>Jantung, Hati, Paru-Paru & Ginjal</strong> —
          jawab kuesioner singkat dan dapatkan hasil instan beserta panduan kesehatan personal.
        </p>

        <div class="hero-actions anim-fadeup delay-3" style="opacity:0">
          <a href="/asesmen" class="btn btn-primary btn-lg anim-pulse" id="hero-cta-btn">
            <i class="fa-solid fa-play"></i> Mulai Kuesioner Sekarang
          </a>
          <a href="#cara-pakai" class="link-text">
            <i class="fa-solid fa-circle-info"></i> Cara Pakai
          </a>
        </div>
      </div>
    </section>

    <section class="section" id="cara-pakai">
      <div class="container">
        <div class="text-center mb-4">
          <div class="section-label"><i class="fa-solid fa-list-ol"></i> Cara Pakai</div>
          <h2 class="section-title">Mudah, Cepat, <span class="gradient-text">& Akurat</span></h2>
          <p class="section-desc">Hanya 3 langkah mudah untuk mengetahui kondisi organmu saat ini.</p>
        </div>

        <div class="steps-grid">
          <div class="step-card anim-fadeup delay-1" style="opacity:0">
            <div class="step-num">1</div>
            <h4>Isi Kuesioner</h4>
            <p>Jawab pertanyaan tentang gejala yang kamu rasakan dengan jujur.</p>
          </div>
          <div class="step-card anim-fadeup delay-2" style="opacity:0">
            <div class="step-num">2</div>
            <h4>Lihat Hasil & Unduh</h4>
            <p>Dapatkan skor risiko dan unduh hasilmu.</p>
          </div>
          <div class="step-card anim-fadeup delay-3" style="opacity:0">
            <div class="step-num">3</div>
            <h4>Pelajari Lebih Lanjut</h4>
            <p>Tahu lebih banyak tentang organmu.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="text-center mb-4">
          <div class="section-label"><i class="fa-solid fa-lightbulb"></i> Tahukah Kamu?</div>
          <h2 class="section-title">Fakta Menarik <span class="gradient-text">Organ Tubuhmu</span></h2>
        </div>

        <div class="carousel-wrapper">
          <button class="carousel-btn prev-btn" id="facts-prev" aria-label="Previous"><i
              class="fa-solid fa-chevron-left"></i></button>
          <div class="facts-grid" id="facts-carousel">
            <div class="fact-card">
              <div class="fact-icon"><i class="fa-solid fa-heart-pulse"></i></div>
              <div>
                <h4>Jantung berdetak 100.000× sehari</h4>
                <p>Seumur hidup, jantung manusia berdetak lebih dari 3 miliar kali tanpa berhenti —
                  sebuah
                  mesin yang luar biasa.</p>
              </div>
            </div>
            <div class="fact-card">
              <div class="fact-icon"><i class="fa-solid fa-recycle"></i></div>
              <div>
                <h4>Hati bisa regenerasi sendiri</h4>
                <p>Hati adalah satu-satunya organ visceral yang mampu meregenerasi dirinya sendiri —
                  bahkan
                  dari 25% jaringan yang tersisa.</p>
              </div>
            </div>
            <div class="fact-card">
              <div class="fact-icon" style="background: rgba(239,68,68,0.1); color: var(--jantung)"><i
                  class="fa-solid fa-triangle-exclamation"></i></div>
              <div>
                <h4>1 dari 3 kematian akibat jantung</h4>
                <p>Penyakit kardiovaskular adalah penyebab kematian nomor 1 di dunia, merenggut lebih
                  dari
                  17 juta jiwa per tahun.</p>
              </div>
            </div>
            <div class="fact-card">
              <div class="fact-icon"><i class="fa-solid fa-wind"></i></div>
              <div>
                <h4>Paru-paru memproses 11.000 L udara/hari</h4>
                <p>Paru-paru kita menghirup dan menghembuskan udara setara dengan volume sebuah kolam
                  renang
                  kecil setiap harinya.</p>
              </div>
            </div>
            <div class="fact-card">
              <div class="fact-icon"><i class="fa-solid fa-filter"></i></div>
              <div>
                <h4>Ginjal menyaring 200 liter darah sehari</h4>
                <p>Sepasang ginjal kecil ini menyaring seluruh volume darah tubuh lebih dari 40 kali per
                  hari untuk membuang zat sisa.</p>
              </div>
            </div>
            <div class="fact-card">
              <div class="fact-icon" style="background: rgba(168,85,247,0.1); color: var(--ginjal)"><i
                  class="fa-solid fa-clock"></i></div>
              <div>
                <h4>Gagal ginjal sering tanpa gejala awal</h4>
                <p>Ginjal bisa kehilangan hingga 90% fungsinya sebelum gejala serius muncul — deteksi
                  dini
                  sangat penting.</p>
              </div>
            </div>
          </div>
          <button class="carousel-btn next-btn" id="facts-next" aria-label="Next"><i
              class="fa-solid fa-chevron-right"></i></button>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="cta-section">
          <h2 class="anim-fadeup">Siap Cek Kesehatanmu?</h2>
          <p class="anim-fadeup delay-1">Hanya perlu 5 menit. Tanpa registrasi. Tanpa biaya. Mulai sekarang
            dan kenali kondisi organmu.</p>
          <div class="anim-fadeup delay-2" style="position: relative; z-index: 2;">
            <a href="/asesmen" class="btn btn-primary btn-lg anim-pulse"
              style="display: inline-flex; align-items: center; gap: 0.75rem; text-decoration: none; position: relative; z-index: 2;">
              <i class="fa-solid fa-stethoscope"></i> Mulai Kuesioner Gratis
            </a>
          </div>
        </div>
      </div>
    </section>

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

  <script>
    // Animate elements on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.animation = 'fadeInUp 0.6s ease forwards';
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.anim-fadeup').forEach(el => {
      // Already visible ones (hero) animate immediately
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        setTimeout(() => { el.style.opacity = '1'; }, 50);
      } else {
        observer.observe(el);
      }
    });

    // Activate hero animations immediately
    document.querySelectorAll('.hero .anim-fadeup').forEach((el, i) => {
      el.style.animationFillMode = 'both';
    });

    // Facts Carousel Logic (Unlimited Infinite Scroll)
    const carousel = document.getElementById("facts-carousel");
    const btnPrev = document.getElementById("facts-prev");
    const btnNext = document.getElementById("facts-next");

    if (carousel && btnPrev && btnNext) {
      let isAnimating = false;

      const getScrollAmount = () => {
        const card = carousel.querySelector(".fact-card");
        const gap = parseFloat(window.getComputedStyle(carousel).gap) || 20;
        return card.offsetWidth + gap;
      };

      const processNext = () => {
        if (isAnimating) return;
        isAnimating = true;

        const scrollAmount = getScrollAmount();
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;

        // Adjust DOM instantly if we're hitting the boundary before scrolling
        if (carousel.scrollLeft >= maxScroll - 5) {
          carousel.style.scrollBehavior = "auto";
          carousel.appendChild(carousel.firstElementChild);
          carousel.scrollLeft -= scrollAmount;
          carousel.offsetHeight; // trigger repaint
        }

        carousel.style.scrollBehavior = "smooth";
        carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });

        // Check boundary again after smooth animation
        setTimeout(() => {
          const newMax = carousel.scrollWidth - carousel.clientWidth;
          if (carousel.scrollLeft >= newMax - 5) {
            carousel.style.scrollBehavior = "auto";
            carousel.appendChild(carousel.firstElementChild);
            carousel.scrollLeft -= scrollAmount;
            carousel.offsetHeight;
          }
          isAnimating = false;
        }, 500);
      };

      const processPrev = () => {
        if (isAnimating) return;
        isAnimating = true;

        const scrollAmount = getScrollAmount();

        // If at the beginning, silently pull the last visual card to the front
        if (carousel.scrollLeft <= 5) {
          carousel.style.scrollBehavior = "auto";
          carousel.prepend(carousel.lastElementChild);
          carousel.scrollLeft += scrollAmount;
          carousel.offsetHeight;
        }

        carousel.style.scrollBehavior = "smooth";
        carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });

        setTimeout(() => {
          isAnimating = false;
        }, 500);
      };

      btnNext.addEventListener("click", processNext);
      btnPrev.addEventListener("click", processPrev);

      let autoScroll = setInterval(processNext, 5000);

      // Pause auto-scroll on hover or touch
      carousel.addEventListener("mouseenter", () => clearInterval(autoScroll));
      carousel.addEventListener("mouseleave", () => {
        clearInterval(autoScroll);
        autoScroll = setInterval(processNext, 5000);
      });
      carousel.addEventListener("touchstart", () => clearInterval(autoScroll), { passive: true });
      carousel.addEventListener("touchend", () => {
        clearInterval(autoScroll);
        autoScroll = setInterval(processNext, 5000);
      }, { passive: true });
    }
  </script>
</body>

</html>