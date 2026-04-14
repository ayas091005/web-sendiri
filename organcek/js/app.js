/**
 * OrganCek — app.js
 * Shared data, SessionStorage utilities, and common helpers.
 */

// ============================================================
// SESSION STORAGE KEYS
// ============================================================
const KEY_ORGANS    = 'organcek_selected_organs';
const KEY_ANSWERS   = 'organcek_answers';
const KEY_SCORES    = 'organcek_scores';

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
// QUESTIONS DATA (10 per organ, scale 0-3)
// ============================================================
const QUESTIONS = {
  jantung: [
    'Apakah Anda sering merasakan nyeri, tekanan, atau rasa berat di dada?',
    'Apakah Anda mengalami sesak napas saat melakukan aktivitas ringan (seperti berjalan atau naik tangga)?',
    'Apakah jantung Anda kadang berdebar-debar atau detak terasa tidak teratur?',
    'Apakah Anda sering merasa pusing atau pernah hampir pingsan tanpa sebab jelas?',
    'Apakah Anda mudah merasa sangat lelah meskipun tidak banyak beraktivitas?',
    'Apakah kaki, pergelangan kaki, atau betis Anda sering bengkak?',
    'Apakah Anda sering berkeringat dingin tanpa sebab yang jelas?',
    'Apakah detak jantung Anda tiba-tiba terasa sangat cepat (berdebar kencang)?',
    'Apakah Anda kesulitan bernapas saat tidur terlentang sehingga butuh bantal lebih tinggi?',
    'Apakah Anda memiliki riwayat tekanan darah tinggi atau kolesterol tinggi?',
  ],
  hati: [
    'Apakah Anda sering merasakan nyeri atau rasa tidak nyaman di perut bagian kanan atas?',
    'Apakah kulit atau bagian putih mata Anda pernah tampak kekuningan (jaundice)?',
    'Apakah urin Anda berwarna sangat gelap (seperti warna teh pekat) tanpa sebab yang jelas?',
    'Apakah tinja Anda berwarna pucat, abu-abu, atau seperti tanah liat?',
    'Apakah Anda sering mengalami mual atau muntah tanpa penyebab yang jelas?',
    'Apakah perut Anda terasa kembung secara berlebihan atau tampak membesar?',
    'Apakah Anda mudah memar atau mengalami pendarahan yang sulit berhenti?',
    'Apakah nafsu makan Anda menurun drastis dalam beberapa waktu terakhir?',
    'Apakah kulit Anda sering terasa gatal-gatal tanpa adanya ruam yang jelas?',
    'Apakah Anda merasa lelah yang sangat ekstrem meskipun sudah cukup tidur dan istirahat?',
  ],
  paru: [
    'Apakah Anda memiliki batuk yang sudah berlangsung lebih dari 3 minggu?',
    'Apakah Anda mengalami sesak napas bahkan saat melakukan aktivitas ringan sehari-hari?',
    'Apakah Anda merasakan nyeri atau rasa tidak nyaman di dada saat menarik napas dalam?',
    'Apakah Anda menghasilkan dahak atau lendir berlebihan secara rutin setiap hari?',
    'Apakah Anda pernah batuk disertai darah atau lendir bercampur darah?',
    'Apakah napas Anda berbunyi mengi (seperti siulan) saat bernapas?',
    'Apakah Anda sering mengalami infeksi saluran pernapasan (flu, bronkitis, pneumonia)?',
    'Apakah berat badan Anda turun drastis tanpa adanya perubahan pola makan atau olahraga?',
    'Apakah Anda sering berkeringat banyak di malam hari hingga membasahi pakaian?',
    'Apakah ujung jari tangan Anda tampak membulat atau membesar (clubbing fingers)?',
  ],
  ginjal: [
    'Apakah Anda sering terbangun untuk buang air kecil di tengah malam (lebih dari 2 kali)?',
    'Apakah urin Anda tampak berbusa berlebihan atau pernah berwarna kemerahan/gelap?',
    'Apakah wajah, kelopak mata, tangan, atau kaki Anda sering bengkak tanpa sebab?',
    'Apakah Anda sering merasakan nyeri tumpul di area pinggang atau punggung bawah?',
    'Apakah Anda merasa sangat lelah dan lesu tanpa alasan yang jelas?',
    'Apakah napas Anda pernah berbau seperti amonia atau urin?',
    'Apakah kulit Anda sering terasa sangat gatal dan kering, terutama di malam hari?',
    'Apakah Anda sering merasa mual atau tidak enak badan tanpa penyebab yang jelas?',
    'Apakah Anda memiliki riwayat tekanan darah tinggi atau diabetes?',
    'Apakah nafsu makan Anda berkurang secara signifikan belakangan ini?',
  ],
};

// ============================================================
// ANSWER OPTIONS
// ============================================================
const ANSWER_OPTIONS = [
  { value: 0, label: 'Tidak Pernah', icon: '😊', iconClass: 'fa-face-smile' },
  { value: 1, label: 'Kadang-Kadang', icon: '😐', iconClass: 'fa-face-meh' },
  { value: 2, label: 'Sering', icon: '😟', iconClass: 'fa-face-worried' },
  { value: 3, label: 'Selalu / Hampir Selalu', icon: '😰', iconClass: 'fa-face-dizzy' },
];

// ============================================================
// RECOMMENDATIONS
// ============================================================
const RECOMMENDATIONS = {
  jantung: {
    low: 'Risiko jantung Anda saat ini rendah. Pertahankan gaya hidup aktif, konsumsi makanan bergizi, dan rutin periksa tekanan darah Anda.',
    medium: 'Ada beberapa gejala yang perlu diperhatikan. Kurangi konsumsi garam dan lemak jenuh, tingkatkan aktivitas fisik sedang, dan konsultasikan dengan dokter dalam waktu dekat.',
    high: 'Gejala yang Anda laporkan cukup signifikan. Segera konsultasikan dengan dokter atau spesialis jantung (kardiolog) untuk evaluasi lebih lanjut. Jangan tunda!',
  },
  hati: {
    low: 'Fungsi hati kemungkinan baik. Hindari alkohol, konsumsi makanan bergizi, dan jaga berat badan ideal untuk menjaga kesehatan hati Anda.',
    medium: 'Beberapa gejala perlu dievaluasi. Hindari konsumsi obat-obatan tanpa resep, kurangi alkohol, dan lakukan pemeriksaan fungsi hati (SGOT/SGPT) ke dokter.',
    high: 'Gejala yang dilaporkan menunjukkan kemungkinan gangguan fungsi hati yang serius. Segera periksakan diri ke dokter untuk pemeriksaan darah dan USG hati.',
  },
  paru: {
    low: 'Kesehatan paru-paru Anda tampak baik. Jaga kualitas udara di lingkungan Anda, hindari asap rokok, dan pertahankan aktivitas fisik secara rutin.',
    medium: 'Ada gejala yang perlu diperhatikan. Hentikan merokok jika Anda merokok, hindari paparan debu dan polutan, serta konsultasikan ke dokter jika batuk berlanjut.',
    high: 'Gejala yang dilaporkan sangat perlu dievaluasi. Segera kunjungi dokter atau spesialis paru (pulmonolog) untuk pemeriksaan lebih lanjut termasuk rontgen dada.',
  },
  ginjal: {
    low: 'Ginjal Anda kemungkinan berfungsi baik. Minum air putih yang cukup (2–3 liter/hari), kurangi garam, dan hindari konsumsi obat pereda nyeri berlebihan.',
    medium: 'Beberapa gejala perlu dipantau. Periksa tekanan darah dan kadar gula darah secara rutin, kurangi asupan protein berlebihan, dan konsultasikan ke dokter.',
    high: 'Gejala yang dilaporkan mengindikasikan kemungkinan gangguan fungsi ginjal. Segera periksakan ke dokter atau spesialis ginjal (nefrolog) untuk tes urin dan kreatinin darah.',
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
  clear() {
    sessionStorage.removeItem(KEY_ORGANS);
    sessionStorage.removeItem(KEY_ANSWERS);
    sessionStorage.removeItem(KEY_SCORES);
  },
  hasResults() {
    const scores = this.getScores();
    return Object.keys(scores).length > 0;
  }
};

// ============================================================
// SCORE UTILITIES
// ============================================================
function calculateScore(answers, organId) {
  // answers: array of numbers 0-3
  const total = answers.reduce((a, b) => a + (b || 0), 0);
  const maxPossible = QUESTIONS[organId].length * 3;
  return Math.round((total / maxPossible) * 100);
}

function getRiskLevel(score) {
  if (score <= 30) return 'low';
  if (score <= 60) return 'medium';
  return 'high';
}

function getRiskLabel(score) {
  const level = getRiskLevel(score);
  if (level === 'low')    return 'Risiko Rendah';
  if (level === 'medium') return 'Risiko Sedang';
  return 'Risiko Tinggi';
}

function getRiskEmoji(level) {
  if (level === 'low')    return '🟢';
  if (level === 'medium') return '🟡';
  return '🔴';
}

function getRiskColor(level) {
  if (level === 'low')    return '#22C55E';
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
