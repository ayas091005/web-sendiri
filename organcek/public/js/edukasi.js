/**
 * OrganCek — edukasi.js
 * Education content: Do's & Don'ts per organ, tabs.
 * CATATAN: ORGANS dan ORGAN_ORDER sudah didefinisikan di app.js — jangan redeclare.
 */

// ============================================================
// EDUCATION CONTENT
// ============================================================
const EDUKASI = {
  jantung: {
    intro: 'Jantung adalah organ muskular yang memompa darah ke seluruh sistem peredaran darah. Jantung yang sehat berdetak sekitar 60–100 kali per menit dan memastikan oksigen serta nutrisi sampai ke setiap sel tubuh.',
    do: [
      { icon: '🥦', text: 'Konsumsi makanan kaya serat: sayur, buah, biji-bijian utuh, dan kacang-kacangan setiap hari.' },
      { icon: '🏃', text: 'Lakukan olahraga aerobik sedang minimal 150 menit per minggu (jalan cepat, bersepeda, berenang).' },
      { icon: '⚖️', text: 'Jaga berat badan ideal — kelebihan berat badan membebani kerja jantung secara langsung.' },
      { icon: '😴', text: 'Tidur cukup 7–9 jam per malam; kurang tidur meningkatkan risiko hipertensi dan penyakit jantung.' },
      { icon: '🩺', text: 'Periksa tekanan darah dan kolesterol secara rutin minimal setahun sekali.' }
    ],
    dont: [
      { icon: '🚬', text: 'Jangan merokok — merokok adalah faktor risiko utama penyakit jantung dan pembuluh darah.' },
      { icon: '🍟', text: 'Hindari makanan tinggi lemak jenuh, lemak trans, dan gorengan berlebihan.' },
      { icon: '🧂', text: 'Batasi asupan garam — konsumsi berlebihan meningkatkan tekanan darah secara signifikan.' },
      { icon: '🍺', text: 'Hindari atau batasi konsumsi alkohol — alkohol dapat melemahkan otot jantung.' },
      { icon: '🛋️', text: 'Jangan terlalu lama duduk/berbaring tanpa aktivitas fisik (sedentary lifestyle).' }
    ],
  },

  hati: {
    intro: 'Hati adalah organ kelenjar terbesar dalam tubuh yang menyaring racun dari darah, memproduksi empedu untuk pencernaan, dan menyimpan energi. Menjaganya tetap sehat sangat penting untuk fungsi metabolisme tubuh secara keseluruhan.',
    do: [
      { icon: '🥗', text: 'Konsumsi diet seimbang: perbanyak sayuran hijau, buah, protein tanpa lemak, dan karbohidrat kompleks.' },
      { icon: '💧', text: 'Minum air putih yang cukup (minimal 8 gelas/hari) untuk membantu proses detoksifikasi hati.' },
      { icon: '☕', text: 'Kopi tanpa tambahan gula terbukti bermanfaat bagi kesehatan hati — konsumsi 1–2 cangkir/hari.' },
      { icon: '🏋️', text: 'Olahraga rutin membantu mengurangi lemak di hati dan mencegah perlemakan hati.' },
      { icon: '🌿', text: 'Konsumsi makanan kaya antioksidan: brokoli, wortel, kunyit, dan buah beri.' }
    ],
    dont: [
      { icon: '🍺', text: 'Hindari alkohol sepenuhnya atau batasi drastis — alkohol adalah racun utama bagi sel-sel hati.' },
      { icon: '💊', text: 'Jangan sembarangan mengonsumsi obat, suplemen, atau jamu herbal tanpa rekomendasi dokter.' },
      { icon: '🍔', text: 'Hindari makanan tinggi lemak dan gula berlebihan yang memicu perlemakan hati non-alkohol.' },
      { icon: '🧪', text: 'Hindari paparan bahan kimia berbahaya seperti pestisida, pelarut industri, dan cat tanpa alat pelindung.' },
      { icon: '💉', text: 'Jangan berbagi jarum suntik, alat tato, atau alat tindik — meningkatkan risiko penyakit hati.' }
    ],
  },

  paru: {
    intro: 'Paru-paru adalah sepasang organ pernapasan yang bertanggung jawab atas pertukaran gas: mengambil oksigen dari udara dan mengeluarkan karbondioksida. Setiap hari, paru-paru memproses sekitar 11.000 liter udara.',
    do: [
      { icon: '🫁', text: 'Lakukan latihan pernapasan dalam (deep breathing) setiap hari selama 10 menit.' },
      { icon: '🌿', text: 'Jaga kebersihan dan kualitas udara di rumah — gunakan air purifier jika tinggal di area berpolusi.' },
      { icon: '🏊', text: 'Olahraga aerobik (renang, lari, bersepeda) menguatkan otot pernapasan dan meningkatkan kapasitas paru.' },
      { icon: '🥦', text: 'Konsumsi makanan kaya antioksidan dan vitamin C untuk memperkuat sistem imun saluran napas.' },
      { icon: '💧', text: 'Minum cukup air membantu mengencerkan lendir di saluran napas sehingga lebih mudah dikeluarkan.' }
    ],
    dont: [
      { icon: '🚬', text: 'Jangan merokok dalam bentuk apapun — rokok konvensional, rokok elektrik, dan vape semuanya merusak paru.' },
      { icon: '🌫️', text: 'Hindari paparan asap kendaraan, debu konstruksi, dan asap pembakaran tanpa masker yang memadai.' },
      { icon: '🧹', text: 'Hindari penggunaan produk pembersih berbahan kimia keras di ruangan yang tidak memiliki ventilasi.' },
      { icon: '❄️', text: 'Hindari udara yang sangat dingin tanpa menggunakan masker penghangat udara.' },
      { icon: '🛋️', text: 'Jangan mengabaikan gejala seperti sesak napas terus-menerus atau batuk darah.' }
    ],
  },

  ginjal: {
    intro: 'Ginjal adalah sepasang organ berbentuk kacang yang bertugas menyaring limbah dan kelebihan cairan dari darah menjadi urine, serta mengatur keseimbangan elektrolit tubuh. Menjaga hidrasi adalah kunci kesehatannya.',
    do: [
      { icon: '💧', text: 'Minum air putih yang cukup: minimal 8–10 gelas (2–2,5 liter) per hari untuk membantu kerja ginjal.' },
      { icon: '🥗', text: 'Konsumsi diet rendah garam dan perbanyak sayuran untuk mengurangi beban kerja ginjal.' },
      { icon: '🩺', text: 'Periksa tekanan darah dan kadar gula darah secara rutin — keduanya adalah penyebab utama gagal ginjal.' },
      { icon: '🏃', text: 'Olahraga rutin membantu mengontrol tekanan darah, gula darah, dan berat badan.' },
      { icon: '🫐', text: 'Konsumsi buah beri, apel, dan makanan kaya antioksidan untuk melindungi sel-sel tubuh.' }
    ],
    dont: [
      { icon: '🧂', text: 'Batasi konsumsi garam berlebih — asupan tinggi natrium akan secara drastis meningkatkan tekanan darah.' },
      { icon: '💊', text: 'Jangan sering mengonsumsi obat penghilang nyeri secara bebas dalam jangka waktu lama.' },
      { icon: '🥩', text: 'Batasi konsumsi protein hewani berlebihan (terutama daging merah) yang membebani kinerja ginjal.' },
      { icon: '🧃', text: 'Hindari minuman energi berlebihan dan suplemen protein dosis sangat tinggi.' },
      { icon: '🚰', text: 'Jangan membiasakan diri menahan buang air kecil terlalu lama — dapat meningkatkan risiko batu dan infeksi ginjal.' }
    ],
  },
};

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // ORGANS & ORGAN_ORDER sudah tersedia dari app.js
  const scores = (typeof Session !== 'undefined' && Session.getScores) ? Session.getScores() : {};
  const organs = (typeof Session !== 'undefined' && Session.getOrgans && Session.getOrgans().length > 0)
    ? Session.getOrgans()
    : ORGAN_ORDER;

  renderTabs(organs, scores);
  renderAllPanels(organs, scores);

  // Aktifkan tab pertama
  const firstOrgan = organs.length > 0 ? organs[0] : ORGAN_ORDER[0];
  activateTab(firstOrgan);
});

// ============================================================
// TABS
// ============================================================
function renderTabs(checkedOrgans, scores) {
  const tabs = document.getElementById('edu-tabs');
  if (!tabs) return;
  tabs.innerHTML = '';

  ORGAN_ORDER.forEach(id => {
    const o = ORGANS[id];
    const btn = document.createElement('button');
    btn.className = 'organ-tab';
    btn.id = `tab-${id}`;
    btn.dataset.organ = id;

    btn.innerHTML = `${o.name}`;
    btn.addEventListener('click', () => activateTab(id));
    tabs.appendChild(btn);
  });
}

function activateTab(organId) {
  document.querySelectorAll('.organ-tab').forEach(btn => {
    btn.classList.remove('active');
  });

  const activeBtn = document.getElementById(`tab-${organId}`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }

  document.querySelectorAll('.edu-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById(`panel-${organId}`);
  if (panel) panel.classList.add('active');
}

// ============================================================
// PANELS
// ============================================================
function renderAllPanels(checkedOrgans, scores) {
  const container = document.getElementById('edu-panels');
  if (!container) return;
  container.innerHTML = '';

  ORGAN_ORDER.forEach(id => {
    const o = ORGANS[id];
    const edu = EDUKASI[id];

    // Gunakan color & glow dari app.js (format string hex / rgba, bukan var())
    const oc = o.color;
    const og = o.glow;

    const panel = document.createElement('div');
    panel.className = 'edu-panel';
    panel.id = `panel-${id}`;
    panel.style.setProperty('--oc', oc);
    panel.style.setProperty('--og', og);

    panel.innerHTML = `
      <div class="edu-organ-intro">
        <div class="edu-organ-icon-box">
          <img src="/img/${id}.png" alt="${o.name}">
        </div>
        <div class="edu-organ-text">
          <h2>${o.name}</h2>
          <p>${edu.intro}</p>
        </div>
      </div>

      <div class="do-dont-grid">
        <div class="do-card">
          <div class="card-header">
            <div class="do-header-icon"><i class="fa-solid fa-check"></i></div>Do
          </div>
          <ul class="do-dont-list do-list">
            ${edu.do.map(item => `
              <li>
                <span class="li-icon"><i class="fa-solid fa-circle-check"></i></span>
                <span><strong>${item.icon}</strong> ${item.text}</span>
              </li>`).join('')}
          </ul>
        </div>
        <div class="dont-card">
          <div class="card-header">
            <div class="dont-header-icon"><i class="fa-solid fa-xmark"></i></div>Don't
          </div>
          <ul class="do-dont-list dont-list">
            ${edu.dont.map(item => `
              <li>
                <span class="li-icon"><i class="fa-solid fa-circle-xmark"></i></span>
                <span><strong>${item.icon}</strong> ${item.text}</span>
              </li>`).join('')}
          </ul>
        </div>
      </div>
    `;

    container.appendChild(panel);
  });
}