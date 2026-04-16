/**
 * OrganCek — app.js
 * Shared data, SessionStorage utilities, and common helpers.
 */

// ============================================================
// SESSION STORAGE KEYS
// ============================================================
const KEY_ORGANS = 'organcek_selected_organs';
const KEY_ANSWERS = 'organcek_answers';
const KEY_SCORES = 'organcek_scores';
const KEY_BMI = 'organcek_bmi';

// ============================================================
// ORGAN META
// ============================================================
const ORGANS = {
  jantung: {
    id: 'jantung',
    name: 'Jantung',
    emoji: '❤️',
    icon: 'fa-heart',
    color: '#EF4444',
    glow: 'rgba(239,68,68,0.2)',
    desc: 'Memompa darah ke seluruh tubuh setiap saat.',
    descLong: 'Jantung adalah organ muskular yang memompa darah ke seluruh sistem peredaran darah. Jantung yang sehat berdetak sekitar 60–100 kali per menit dan memastikan oksigen serta nutrisi sampai ke setiap sel tubuh.',
  },
  hati: {
    id: 'hati',
    name: 'Hati',
    emoji: '🫀',
    icon: 'fa-shield-halved',
    color: '#F97316',
    glow: 'rgba(249,115,22,0.2)',
    desc: 'Menyaring racun dan metabolisme nutrisi penting.',
    descLong: 'Hati (liver) adalah organ terbesar dalam tubuh dan memiliki lebih dari 500 fungsi vital, termasuk menyaring racun dari darah, memproduksi empedu untuk pencernaan, menyimpan glukosa, serta membantu pembekuan darah.',
  },
  paru: {
    id: 'paru',
    name: 'Paru-Paru',
    emoji: '🫁',
    icon: 'fa-lungs',
    color: '#3B82F6',
    glow: 'rgba(59,130,246,0.2)',
    desc: 'Pertukaran oksigen dan karbondioksida setiap napas.',
    descLong: 'Paru-paru adalah sepasang organ pernapasan yang bertanggung jawab atas pertukaran gas: mengambil oksigen dari udara dan mengeluarkan karbondioksida. Setiap hari, paru-paru memproses sekitar 11.000 liter udara.',
  },
  ginjal: {
    id: 'ginjal',
    name: 'Ginjal',
    emoji: '🫘',
    icon: 'fa-circle-half-stroke',
    color: '#A855F7',
    glow: 'rgba(168,85,247,0.2)',
    desc: 'Menyaring darah dan mengatur keseimbangan cairan.',
    descLong: 'Ginjal adalah sepasang organ berbentuk kacang yang menyaring sekitar 200 liter darah per hari, membuang limbah dan kelebihan cairan sebagai urin. Ginjal juga mengatur tekanan darah dan produksi sel darah merah.',
  }
};

const ORGAN_ORDER = ['jantung', 'hati', 'paru', 'ginjal'];

// ============================================================
// QUESTIONS DATA — sesuai PDF
// Skor per item: a = 2 (protektif), b = 1 (antara), c = 0 (berisiko)
// ============================================================
const QUESTIONS = {
  jantung: [
    {
      text: 'Seberapa sering Anda melakukan aktivitas fisik (jalan cepat, olahraga, bersepeda) minimal 30 menit?',
      options: [
        { label: 'Hampir setiap hari (≥5 hari/minggu)', score: 2 },
        { label: 'Kadang-kadang (1–4 hari/minggu)', score: 1 },
        { label: 'Jarang atau tidak pernah', score: 0 },
      ],
    },
    {
      text: 'Apakah Anda merasakan nyeri, rasa berat, atau tekanan di dada saat beraktivitas?',
      options: [
        { label: 'Tidak pernah', score: 2 },
        { label: 'Jarang (1–2 kali dalam 3 bulan)', score: 1 },
        { label: 'Sering atau hampir setiap beraktivitas', score: 0 },
      ],
    },
    {
      text: 'Apakah Anda mudah sesak napas saat naik tangga atau jalan cepat?',
      options: [
        { label: 'Tidak mudah sesak, masih mampu berbicara sambil berjalan cepat', score: 2 },
        { label: 'Agak sesak tapi bisa melanjutkan aktivitas', score: 1 },
        { label: 'Sangat mudah sesak bahkan saat aktivitas ringan', score: 0 },
      ],
    },
    {
      text: 'Apakah kaki atau pergelangan kaki Anda sering bengkak tanpa sebab yang jelas?',
      options: [
        { label: 'Tidak pernah', score: 2 },
        { label: 'Pernah, tapi jarang', score: 1 },
        { label: 'Sering atau hampir setiap hari', score: 0 },
      ],
    },
    {
      text: 'Apakah Anda pernah merasakan jantung berdebar-debar kencang atau tidak beraturan tanpa sebab?',
      options: [
        { label: 'Tidak pernah', score: 2 },
        { label: 'Pernah 1–2 kali, berlangsung sebentar', score: 1 },
        { label: 'Sering terjadi dan berlangsung lama', score: 0 },
      ],
    },
    {
      text: 'Bagaimana pola makan Anda sehari-hari?',
      options: [
        { label: 'Rendah garam, rendah lemak jenuh, banyak sayur & buah', score: 2 },
        { label: 'Cukup terjaga tapi masih sering makan gorengan atau makanan asin', score: 1 },
        { label: 'Sering makan makanan berlemak, asin, atau cepat saji', score: 0 },
      ],
    },
    {
      text: 'Apakah Anda merokok atau sering terpapar asap rokok setiap hari?',
      options: [
        { label: 'Tidak merokok dan jarang terpapar asap rokok', score: 2 },
        { label: 'Tidak merokok tapi sering terpapar, atau sudah berhenti >1 tahun', score: 1 },
        { label: 'Merokok aktif atau baru berhenti <1 tahun', score: 0 },
      ],
    },
  ],

  paru: [
    {
      text: 'Apakah Anda mengalami batuk yang berlangsung lebih dari 2 minggu tanpa sebab jelas (bukan flu)?',
      options: [
        { label: 'Tidak pernah', score: 2 },
        { label: 'Pernah 1–2 kali tapi cepat sembuh', score: 1 },
        { label: 'Sering atau sedang mengalaminya sekarang', score: 0 },
      ],
    },
    {
      text: 'Apakah Anda terpapar asap rokok, debu, asap kendaraan, atau polusi udara setiap hari?',
      options: [
        { label: 'Hampir tidak pernah (lingkungan bersih dan tidak merokok)', score: 2 },
        { label: 'Kadang-kadang terpapar', score: 1 },
        { label: 'Setiap hari terpapar (merokok / lingkungan kerja berpolusi)', score: 0 },
      ],
    },
    {
      text: 'Seberapa sering Anda melakukan aktivitas fisik aerobik (jalan, renang, bersepeda) yang membuat napas sedikit berat?',
      options: [
        { label: 'Sering, ≥3 kali seminggu, minimal 20 menit', score: 2 },
        { label: 'Jarang, 1–2 kali seminggu', score: 1 },
        { label: 'Hampir tidak pernah berolahraga', score: 0 },
      ],
    },
    {
      text: 'Apakah Anda pernah merasakan napas berbunyi (mengi/bengek) atau dada terasa sesak tanpa olahraga?',
      options: [
        { label: 'Tidak pernah', score: 2 },
        { label: 'Pernah beberapa kali, biasanya saat cuaca dingin atau berdebu', score: 1 },
        { label: 'Sering terjadi, hampir setiap minggu', score: 0 },
      ],
    },
    {
      text: 'Apakah Anda mudah kehabisan napas saat melakukan aktivitas ringan (berjalan 100 meter, naik tangga 1 lantai)?',
      options: [
        { label: 'Tidak, masih kuat dan napas normal', score: 2 },
        { label: 'Sedikit ngos-ngosan tapi bisa dilanjutkan', score: 1 },
        { label: 'Sangat mudah sesak bahkan untuk aktivitas ringan', score: 0 },
      ],
    },
    {
      text: 'Apakah Anda sering bekerja atau tidur di ruangan dengan ventilasi buruk, lembab, atau banyak debu?',
      options: [
        { label: 'Tidak, ruangan saya berventilasi baik', score: 2 },
        { label: 'Kadang-kadang', score: 1 },
        { label: 'Ya, hampir setiap hari', score: 0 },
      ],
    },
  ],

  ginjal: [
    {
      text: 'Berapa banyak air putih yang Anda minum setiap hari?',
      options: [
        { label: '≥8 gelas (±2 liter) per hari', score: 2 },
        { label: '4–7 gelas per hari', score: 1 },
        { label: 'Kurang dari 4 gelas per hari', score: 0 },
      ],
    },
    {
      text: 'Apakah warna urin Anda biasanya jernih atau kuning muda?',
      options: [
        { label: 'Ya, jernih atau kuning muda', score: 2 },
        { label: 'Kadang kuning pekat tapi tidak selalu', score: 1 },
        { label: 'Sering pekat, kemerahan, atau berbusa', score: 0 },
      ],
    },
    {
      text: 'Apakah Anda sering mengonsumsi obat penghilang nyeri (ibuprofen, paracetamol, asam mefenamat) tanpa resep dokter?',
      options: [
        { label: 'Tidak pernah atau sangat jarang', score: 2 },
        { label: 'Kadang-kadang (1–2 kali sebulan)', score: 1 },
        { label: 'Sering, hampir setiap minggu', score: 0 },
      ],
    },
    {
      text: 'Apakah Anda pernah merasakan nyeri atau tidak nyaman di pinggang bawah (bukan karena kelelahan otot)?',
      options: [
        { label: 'Tidak pernah', score: 2 },
        { label: 'Pernah beberapa kali tapi tidak berlangsung lama', score: 1 },
        { label: 'Sering, cukup mengganggu aktivitas', score: 0 },
      ],
    },
    {
      text: 'Apakah Anda memiliki riwayat tekanan darah tinggi atau gula darah tinggi (diabetes)?',
      options: [
        { label: 'Tidak memiliki keduanya', score: 2 },
        { label: 'Salah satu tapi terkontrol dengan baik', score: 1 },
        { label: 'Memiliki salah satu atau keduanya dan tidak terkontrol', score: 0 },
      ],
    },
    {
      text: 'Apakah Anda aktif bergerak atau berolahraga secara teratur?',
      options: [
        { label: 'Ya, olahraga teratur ≥3 kali seminggu', score: 2 },
        { label: 'Kadang-kadang, tidak rutin', score: 1 },
        { label: 'Sangat jarang atau tidak pernah berolahraga', score: 0 },
      ],
    },
    {
      text: 'Apakah Anda pernah mengalami pembengkakan di wajah (kelopak mata) atau kaki tanpa sebab jelas?',
      options: [
        { label: 'Tidak pernah', score: 2 },
        { label: 'Pernah 1–2 kali, cepat hilang', score: 1 },
        { label: 'Sering dan berlangsung lama', score: 0 },
      ],
    },
  ],

  hati: [
    {
      text: 'Apakah Anda mengonsumsi makanan berlemak tinggi (gorengan, fast food, jeroan) setiap hari?',
      options: [
        { label: 'Jarang sekali atau tidak pernah', score: 2 },
        { label: 'Kadang-kadang, 2–3 kali seminggu', score: 1 },
        { label: 'Hampir setiap hari', score: 0 },
      ],
    },
    {
      text: 'Apakah Anda pernah mengalami mual, perut kembung, atau kehilangan nafsu makan yang berkepanjangan?',
      options: [
        { label: 'Tidak pernah', score: 2 },
        { label: 'Pernah beberapa kali, biasanya saat stres atau makan sembarangan', score: 1 },
        { label: 'Sering, hampir setiap minggu', score: 0 },
      ],
    },
    {
      text: 'Apakah kulit atau bagian putih mata Anda pernah tampak kekuningan?',
      options: [
        { label: 'Tidak pernah', score: 2 },
        { label: 'Pernah 1 kali, sudah lama dan sudah diperiksa dokter', score: 1 },
        { label: 'Pernah atau sedang mengalami sekarang', score: 0 },
      ],
    },
    {
      text: 'Apakah Anda rutin berolahraga atau aktif bergerak setiap hari?',
      options: [
        { label: 'Ya, aktif bergerak atau olahraga minimal 15–30 menit per hari', score: 2 },
        { label: 'Kadang-kadang, tidak rutin', score: 1 },
        { label: 'Sangat jarang, gaya hidup sedentari', score: 0 },
      ],
    },
    {
      text: 'Apakah Anda sering mengonsumsi obat-obatan, suplemen herbal, atau jamu tanpa pengawasan dokter dalam jangka panjang?',
      options: [
        { label: 'Tidak, saya hati-hati dalam mengonsumsi obat', score: 2 },
        { label: 'Kadang-kadang mengonsumsi suplemen atau jamu', score: 1 },
        { label: 'Sering, hampir setiap hari tanpa resep dokter', score: 0 },
      ],
    },
    {
      text: 'Apakah Anda sering merasa lelah berlebihan bahkan setelah istirahat cukup?',
      options: [
        { label: 'Tidak, energi saya cukup baik sehari-hari', score: 2 },
        { label: 'Kadang lelah berlebih, biasanya saat kurang tidur atau stres', score: 1 },
        { label: 'Ya, sering lelah meski sudah istirahat cukup', score: 0 },
      ],
    },
  ],
};

// ============================================================
// ANSWER OPTIONS — label generik untuk render UI (3 pilihan)
// ============================================================
const ANSWER_OPTIONS = [
  { value: 2, label: 'Pilihan A', icon: '😊', iconClass: 'fa-face-smile' },
  { value: 1, label: 'Pilihan B', icon: '😐', iconClass: 'fa-face-meh' },
  { value: 0, label: 'Pilihan C', icon: '😟', iconClass: 'fa-face-worried' },
];

// ============================================================
// BMI — Standar WHO Asia Pasifik
// Modifier: pengurangan skor pada hasil akhir (dalam poin persentase)
// ============================================================
const BMI_CATEGORIES = [
  { label: 'Kurang', min: 0, max: 18.49, modifier: -1, affects: ['jantung', 'paru', 'hati'] },
  { label: 'Normal', min: 18.5, max: 22.9, modifier: 0, affects: ['jantung', 'hati', 'paru', 'ginjal'] },
  { label: 'Lebih', min: 23, max: 27.49, modifier: -1, affects: ['jantung', 'hati', 'paru', 'ginjal'] },
  { label: 'Obesitas', min: 27.5, max: Infinity, modifier: -2, affects: ['jantung', 'hati', 'paru', 'ginjal'] },
];

function getBMICategory(bmi) {
  return BMI_CATEGORIES.find(c => bmi >= c.min && bmi <= c.max) || BMI_CATEGORIES[1];
}

function calculateBMI(weightKg, heightCm) {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

// ============================================================
// RECOMMENDATIONS — sesuai 3 kategori: sehat / waspada / risiko
// ============================================================
const RECOMMENDATIONS = {
  jantung: {
    low: 'Jantung Anda dalam kondisi sehat. Pertahankan gaya hidup aktif, konsumsi makanan bergizi rendah garam dan lemak jenuh, serta rutin periksa tekanan darah.',
    medium: 'Kondisi jantung Anda perlu diwaspadai. Kurangi konsumsi garam dan lemak jenuh, tingkatkan aktivitas fisik, dan segera konsultasikan ke dokter untuk evaluasi lebih lanjut.',
    high: 'Hasil menunjukkan risiko gangguan jantung. Segera konsultasikan dengan dokter atau spesialis jantung (kardiolog) untuk pemeriksaan menyeluruh. Jangan ditunda!',
  },
  hati: {
    low: 'Hati Anda kemungkinan dalam kondisi baik. Hindari makanan berlemak berlebihan, batasi konsumsi obat tanpa resep, dan pertahankan gaya hidup aktif.',
    medium: 'Ada beberapa faktor risiko pada hati Anda. Kurangi konsumsi makanan berlemak dan obat tanpa resep, lakukan pemeriksaan fungsi hati (SGOT/SGPT) ke dokter.',
    high: 'Hasil menunjukkan kemungkinan gangguan fungsi hati yang serius. Segera periksakan diri ke dokter untuk pemeriksaan darah dan USG hati.',
  },
  paru: {
    low: 'Paru-paru Anda tampak sehat. Jaga kualitas udara lingkungan, hindari paparan asap rokok dan polusi, serta pertahankan aktivitas fisik aerobik secara rutin.',
    medium: 'Kondisi paru-paru Anda perlu diperhatikan. Hindari paparan debu dan asap, hentikan rokok jika merokok, dan konsultasikan ke dokter jika keluhan berlanjut.',
    high: 'Hasil menunjukkan risiko gangguan paru yang signifikan. Segera kunjungi dokter atau spesialis paru (pulmonolog) untuk pemeriksaan lebih lanjut termasuk rontgen dada.',
  },
  ginjal: {
    low: 'Ginjal Anda kemungkinan berfungsi baik. Pertahankan konsumsi air putih yang cukup (≥2 liter/hari), kurangi garam, dan hindari pemakaian obat pereda nyeri berlebihan.',
    medium: 'Ada beberapa faktor risiko pada ginjal Anda. Pantau tekanan darah dan kadar gula secara rutin, perbanyak minum air putih, dan konsultasikan ke dokter.',
    high: 'Hasil menunjukkan kemungkinan gangguan fungsi ginjal. Segera periksakan ke dokter atau spesialis ginjal (nefrolog) untuk tes urin dan kreatinin darah.',
  },
};

// ============================================================
// SESSION STORAGE UTILITIES
// ============================================================
const Session = {
  setOrgans(organs) {
    sessionStorage.setItem(KEY_ORGANS, JSON.stringify(organs));
  },
  getOrgans() {
    try { return JSON.parse(sessionStorage.getItem(KEY_ORGANS)) || []; }
    catch { return []; }
  },
  setAnswers(answers) {
    sessionStorage.setItem(KEY_ANSWERS, JSON.stringify(answers));
  },
  getAnswers() {
    try { return JSON.parse(sessionStorage.getItem(KEY_ANSWERS)) || {}; }
    catch { return {}; }
  },
  setScores(scores) {
    sessionStorage.setItem(KEY_SCORES, JSON.stringify(scores));
  },
  getScores() {
    try { return JSON.parse(sessionStorage.getItem(KEY_SCORES)) || {}; }
    catch { return {}; }
  },
  setBMI(data) {
    sessionStorage.setItem(KEY_BMI, JSON.stringify(data));
  },
  getBMI() {
    try { return JSON.parse(sessionStorage.getItem(KEY_BMI)) || null; }
    catch { return null; }
  },
  clear() {
    sessionStorage.removeItem(KEY_ORGANS);
    sessionStorage.removeItem(KEY_ANSWERS);
    sessionStorage.removeItem(KEY_SCORES);
    sessionStorage.removeItem(KEY_BMI);
  },
  hasResults() {
    const scores = this.getScores();
    return Object.keys(scores).length > 0;
  }
};

// ============================================================
// SCORE UTILITIES
// ============================================================

/**
 * Hitung skor organ.
 * answers: array of numbers (skor per soal: 0, 1, atau 2)
 * organId: string kunci organ
 * bmiData: { bmi, category } — opsional, untuk modifier BMI
 * Return: persentase 0–100 (sudah terapkan modifier BMI)
 */
function calculateScore(answers, organId, bmiData) {
  const questions = QUESTIONS[organId];
  const total = answers.reduce((a, b) => a + (b || 0), 0);
  const maxPossible = questions.length * 2; // tiap soal maks 2
  let pct = Math.round((total / maxPossible) * 100);

  // Terapkan modifier BMI jika ada
  if (bmiData && bmiData.category) {
    const cat = getBMICategory(bmiData.bmi);
    if (cat && cat.affects.includes(organId)) {
      pct = Math.max(0, pct + cat.modifier);
    }
  }

  return Math.min(100, Math.max(0, pct));
}

/**
 * Cutoff klasifikasi sesuai PDF:
 * ≥70%  → sehat  (low)
 * 40–69% → waspada (medium)
 * <40%  → risiko  (high)
 */
function getRiskLevel(score) {
  if (score >= 70) return 'low';
  if (score >= 40) return 'medium';
  return 'high';
}

function getRiskLabel(score) {
  const level = getRiskLevel(score);
  if (level === 'low') return 'Sehat';
  if (level === 'medium') return 'Waspada';
  return 'Risiko';
}

function getRiskEmoji(level) {
  if (level === 'low') return '🟢';
  if (level === 'medium') return '🟡';
  return '🔴';
}

function getRiskColor(level) {
  if (level === 'low') return '#22C55E';
  if (level === 'medium') return '#EAB308';
  return '#EF4444';
}

// ============================================================
// DOM HELPERS
// ============================================================
function $(sel, ctx = document) { return ctx.querySelector(sel); }
function $$(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; }

function setActivePage(pageId) {
  $$('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.page === pageId);
  });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (nav) {
    nav.style.background = window.scrollY > 20
      ? 'rgba(5, 11, 24, 0.95)'
      : 'rgba(5, 11, 24, 0.85)';
  }
});