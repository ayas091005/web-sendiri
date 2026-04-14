/**
 * OrganCek — edukasi.js
 * Education content: Do's & Don'ts per organ, tabs, risk-aware highlighting.
 */

// ============================================================
// EDUCATION CONTENT
// ============================================================
const EDUKASI = {
  jantung: {
    intro: 'Jantung adalah pompa vital tubuh Anda. Menjaga kesehatan jantung berarti menjaga kualitas hidup jangka panjang. Perubahan gaya hidup kecil bisa berdampak besar.',
    do: [
      { icon: '🥦', text: 'Konsumsi makanan kaya serat: sayur, buah, biji-bijian utuh, dan kacang-kacangan setiap hari.' },
      { icon: '🏃', text: 'Lakukan olahraga aerobik sedang minimal 150 menit per minggu (jalan cepat, bersepeda, berenang).' },
      { icon: '⚖️', text: 'Jaga berat badan ideal — kelebihan berat badan membebani kerja jantung secara langsung.' },
      { icon: '😴', text: 'Tidur cukup 7–9 jam per malam; kurang tidur meningkatkan risiko hipertensi dan penyakit jantung.' },
      { icon: '🩺', text: 'Periksa tekanan darah dan kolesterol secara rutin minimal setahun sekali.' },
      { icon: '💊', text: 'Kelola stres dengan meditasi, yoga, atau aktivitas yang Anda nikmati.' },
      { icon: '🫀', text: 'Kenali tanda darurat jantung: nyeri dada, napas pendek, keringat dingin — segera cari bantuan medis.' },
    ],
    dont: [
      { icon: '🚬', text: 'Jangan merokok — merokok adalah faktor risiko utama penyakit jantung dan pembuluh darah.' },
      { icon: '🍟', text: 'Hindari makanan tinggi lemak jenuh, lemak trans, dan gorengan berlebihan.' },
      { icon: '🧂', text: 'Batasi asupan garam — konsumsi berlebihan meningkatkan tekanan darah secara signifikan.' },
      { icon: '🍺', text: 'Hindari atau batasi konsumsi alkohol — alkohol dapat melemahkan otot jantung.' },
      { icon: '🛋️', text: 'Jangan terlalu lama duduk/berbaring tanpa aktivitas fisik (sedentary lifestyle).' },
      { icon: '😤', text: 'Hindari stres kronis yang tidak terkelola — stres meningkatkan tekanan darah dan inflamasi.' },
      { icon: '⚡', text: 'Jangan abaikan gejala seperti nyeri dada atau sesak napas — segera periksakan ke dokter.' },
    ],
  },

  hati: {
    intro: 'Hati adalah laboratorium kimia tubuh Anda yang bekerja 24 jam tanpa henti. Melindunginya dari racun dan memberikan nutrisi yang tepat adalah investasi kesehatan terpenting.',
    do: [
      { icon: '🥗', text: 'Konsumsi diet seimbang: perbanyak sayuran hijau, buah, protein tanpa lemak, dan karbohidrat kompleks.' },
      { icon: '💧', text: 'Minum air putih yang cukup (minimal 8 gelas/hari) untuk membantu proses detoksifikasi hati.' },
      { icon: '☕', text: 'Kopi tanpa tambahan gula terbukti bermanfaat bagi kesehatan hati — konsumsi 1–2 cangkir/hari.' },
      { icon: '🏋️', text: 'Olahraga rutin membantu mengurangi lemak di hati dan mencegah perlemakan hati (NASH).' },
      { icon: '💉', text: 'Lakukan vaksinasi Hepatitis A dan B jika belum pernah, dan periksa status vaksinasi Anda.' },
      { icon: '🩺', text: 'Rutin periksa enzim hati (SGOT/SGPT) minimal setahun sekali, terutama jika ada faktor risiko.' },
      { icon: '🌿', text: 'Konsumsi makanan kaya antioksidan: brokoli, wortel, kunyit, dan buah beri.' },
    ],
    dont: [
      { icon: '🍺', text: 'Hindari alkohol sepenuhnya atau batasi drastis — alkohol adalah racun utama bagi sel-sel hati.' },
      { icon: '💊', text: 'Jangan sembarangan mengonsumsi obat, suplemen, atau jamu herbal tanpa rekomendasi dokter.' },
      { icon: '🍔', text: 'Hindari makanan tinggi lemak dan gula berlebihan yang memicu perlemakan hati non-alkohol.' },
      { icon: '🧪', text: 'Hindari paparan bahan kimia berbahaya seperti pestisida, pelarut industri, dan cat tanpa alat pelindung.' },
      { icon: '💉', text: 'Jangan berbagi jarum suntik, alat tato, atau alat tindik — risiko Hepatitis B dan C.' },
      { icon: '🏋️', text: 'Hindari suplemen bodybuilding atau herbal dosis tinggi yang dapat merusak hati.' },
      { icon: '🚬', text: 'Jangan merokok — merokok memperburuk kerusakan hati dan mengganggu metabolisme obat.' },
    ],
  },

  paru: {
    intro: 'Paru-paru Anda menyerap oksigen yang memberi kehidupan pada setiap sel tubuh. Menjaga kualitas udara yang Anda hirup dan kebugaran fisik adalah kunci paru-paru yang sehat.',
    do: [
      { icon: '🫁', text: 'Lakukan latihan pernapasan dalam (deep breathing) atau pranayama setiap hari selama 10 menit.' },
      { icon: '🌿', text: 'Jaga kebersihan dan kualitas udara di rumah — gunakan air purifier jika tinggal di area berpolusi.' },
      { icon: '🏊', text: 'Olahraga aerobik (renang, lari, bersepeda) menguatkan otot pernapasan dan meningkatkan kapasitas paru.' },
      { icon: '🥦', text: 'Konsumsi makanan kaya antioksidan dan vitamin C untuk memperkuat sistem imun saluran napas.' },
      { icon: '💧', text: 'Minum cukup air membantu mengencer lendir di saluran napas sehingga lebih mudah dikeluarkan.' },
      { icon: '💉', text: 'Vaksinasi flu dan pneumonia setiap tahun, terutama untuk usia di atas 65 tahun atau penderita asma.' },
      { icon: '🩺', text: 'Jika batuk lebih dari 3 minggu, segera periksakan ke dokter untuk rontgen dada.' },
    ],
    dont: [
      { icon: '🚬', text: 'Jangan merokok dalam bentuk apapun — rokok konvensional, rokok elektrik, dan shisha semuanya merusak paru.' },
      { icon: '🌫️', text: 'Hindari paparan asap kendaraan, debu konstruksi, dan asap pembakaran tanpa masker yang memadai.' },
      { icon: '🧹', text: 'Hindari penggunaan produk pembersih berbahan kimia keras di ruangan yang tidak berventilasi.' },
      { icon: '🐱', text: 'Jika alergi terhadap bulu hewan, batasi kontak dan jaga kebersihan lingkungan dari alergen.' },
      { icon: '❄️', text: 'Hindari udara sangat dingin tanpa masker — dapat memicu bronkospasme pada penderita asma.' },
      { icon: '🍜', text: 'Hindari makanan yang memicu alergi atau asma pada Anda secara personal (makanan pemicu bervariasi).' },
      { icon: '🛋️', text: 'Jangan mengabaikan gejala seperti sesak napas saat istirahat atau batuk darah — segera ke dokter.' },
    ],
  },

  ginjal: {
    intro: 'Ginjal adalah sistem penyaringan tubuh yang bekerja tanpa henti. Kebiasaan minum yang cukup dan menghindari zat berbahaya sangat krusial untuk menjaga fungsi ginjal optimal.',
    do: [
      { icon: '💧', text: 'Minum air putih yang cukup: minimal 8–10 gelas (2–2,5 liter) per hari untuk membantu kerja ginjal.' },
      { icon: '🥗', text: 'Konsumsi diet rendah garam dan rendah protein hewani berlebihan untuk mengurangi beban kerja ginjal.' },
      { icon: '🩺', text: 'Periksa tekanan darah dan kadar gula darah secara rutin — keduanya adalah penyebab utama gagal ginjal.' },
      { icon: '🏃', text: 'Olahraga rutin membantu mengontrol tekanan darah, gula darah, dan berat badan — semua melindungi ginjal.' },
      { icon: '🫐', text: 'Konsumsi buah beri, apel, dan makanan kaya antioksidan untuk melindungi sel-sel ginjal.' },
      { icon: '⚖️', text: 'Jaga berat badan ideal — obesitas meningkatkan risiko diabetes dan hipertensi yang merusak ginjal.' },
      { icon: '💊', text: 'Selalu patuh pada pengobatan jika memiliki diabetes atau hipertensi — kedua penyakit ini wajib dikontrol.' },
    ],
    dont: [
      { icon: '🧂', text: 'Batasi garam (natrium) — asupan berlebihan meningkatkan tekanan darah dan membebani ginjal.' },
      { icon: '💊', text: 'Jangan sering mengonsumsi obat penghilang nyeri (NSAID seperti ibuprofen, aspirin) — berbahaya bagi ginjal.' },
      { icon: '🥩', text: 'Batasi protein hewani berlebihan (terutama daging merah) — metabolismenya menghasilkan ureum yang membebani ginjal.' },
      { icon: '🍺', text: 'Hindari alkohol berlebihan — alkohol bersifat diuretik dan dapat menyebabkan dehidrasi serta merusak ginjal.' },
      { icon: '🚬', text: 'Jangan merokok — merokok merusak pembuluh darah ginjal dan mempercepat penurunan fungsi ginjal.' },
      { icon: '🧃', text: 'Hindari minuman energi berlebihan dan suplemen kreatinin/protein dosis tinggi — membebani kerja ginjal.' },
      { icon: '🚰', text: 'Jangan menahan buang air kecil terlalu lama secara sering — meningkatkan risiko infeksi saluran kemih.' },
    ],
  },
};

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const scores = Session.getScores();
  const organs = Session.getOrgans();

  renderTabs(organs, scores);
  renderAllPanels(organs, scores);

  // Activate first tab
  const firstOrgan = organs.length > 0 ? organs[0] : ORGAN_ORDER[0];
  activateTab(firstOrgan);
});

// ============================================================
// TABS
// ============================================================
function renderTabs(checkedOrgans, scores) {
  const tabs = document.getElementById('edu-tabs');
  tabs.innerHTML = '';

  ORGAN_ORDER.forEach(id => {
    const o = ORGANS[id];
    const wasChecked = checkedOrgans.includes(id);
    const score = scores[id];
    const level = wasChecked ? getRiskLevel(score) : null;

    const btn = document.createElement('button');
    btn.className = 'organ-tab';
    btn.id = `tab-${id}`;
    btn.dataset.organ = id;
    btn.dataset.og = o.glow;
    btn.dataset.oc = o.color;

    let indicator = '';
    if (wasChecked && level === 'high') {
      indicator = `<span class="risk-dot" title="Risiko Tinggi"></span>`;
    } else if (wasChecked) {
      indicator = `<span class="tab-dot" data-organ="${id}" style="background: ${o.color};"></span>`;
    }

    btn.innerHTML = `${o.emoji} ${o.name} ${indicator}`;
    btn.addEventListener('click', () => activateTab(id));
    tabs.appendChild(btn);
  });
}

function activateTab(organId) {
  // Update tab styles
  document.querySelectorAll('.organ-tab').forEach(btn => {
    const id = btn.dataset.organ;
    const o = ORGANS[id];
    btn.classList.remove('active');
    btn.style.background = '';
    btn.style.color = '';
    btn.style.border = '';
    btn.style.boxShadow = '';
  });

  const activeBtn = document.getElementById(`tab-${organId}`);
  if (activeBtn) {
    const o = ORGANS[organId];
    activeBtn.classList.add('active');
    activeBtn.style.background = o.glow;
    activeBtn.style.color = o.color;
    activeBtn.style.border = `1px solid ${o.color}`;
    activeBtn.style.boxShadow = `0 0 15px ${o.glow}`;
  }

  // Show panel
  document.querySelectorAll('.edu-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById(`panel-${organId}`);
  if (panel) panel.classList.add('active');
}

// ============================================================
// PANELS
// ============================================================
function renderAllPanels(checkedOrgans, scores) {
  const container = document.getElementById('edu-panels');
  container.innerHTML = '';

  ORGAN_ORDER.forEach(id => {
    const o = ORGANS[id];
    const edu = EDUKASI[id];
    const wasChecked = checkedOrgans.includes(id);
    const score = wasChecked ? scores[id] : null;
    const level = wasChecked ? getRiskLevel(score) : null;

    const panel = document.createElement('div');
    panel.className = 'edu-panel';
    panel.id = `panel-${id}`;

    // Risk box
    let riskBoxHtml = '';
    if (wasChecked && level) {
      const emoji = getRiskEmoji(level);
      const labelMap = {
        low: `${emoji} Organ ini menunjukkan <strong>risiko rendah</strong> berdasarkan jawaban kuesioner Anda (skor: ${score}%). Tetap pertahankan kebiasaan sehat berikut!`,
        medium: `${emoji} Organ ini menunjukkan <strong>risiko sedang</strong> (skor: ${score}%). Perhatikan panduan berikut dan pertimbangkan untuk berkonsultasi dengan dokter.`,
        high: `${emoji} Organ ini menunjukkan <strong>risiko tinggi</strong> (skor: ${score}%). Segera terapkan panduan berikut dan konsultasikan dengan dokter sesegera mungkin!`,
      };
      riskBoxHtml = `
        <div class="edu-risk-box ${level}">
          <i class="fa-solid fa-${level === 'high' ? 'circle-xmark' : level === 'medium' ? 'circle-exclamation' : 'circle-check'}"></i>
          <span>${labelMap[level]}</span>
        </div>
      `;
    } else {
      riskBoxHtml = `
        <div class="edu-risk-box none">
          <i class="fa-solid fa-circle-info"></i>
          <span>Organ ini tidak diikutsertakan dalam kuesioner Anda. Panduan di bawah tetap berlaku sebagai referensi kesehatan umum.</span>
        </div>
      `;
    }

    panel.innerHTML = `
      <!-- Organ intro -->
      <div class="edu-organ-intro">
        <div class="organ-icon organ-icon-lg" style="background: ${o.glow}; color: ${o.color}; box-shadow: 0 0 30px ${o.glow};">
          ${o.emoji}
        </div>
        <div>
          <h2 style="color: ${o.color};">${o.name}</h2>
          <p>${o.descLong}</p>
        </div>
      </div>

      ${riskBoxHtml}

      <!-- Do & Don't -->
      <div class="do-dont-grid">

        <!-- DO -->
        <div class="do-card">
          <div class="card-header">
            <div class="do-header-icon"><i class="fa-solid fa-check"></i></div>
            Yang HARUS Dilakukan
          </div>
          <ul class="do-dont-list do-list">
            ${edu.do.map(item => `
              <li>
                <span class="li-icon"><i class="fa-solid fa-circle-check"></i></span>
                <span><strong class="mr-1">${item.icon}</strong> ${item.text}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- DON'T -->
        <div class="dont-card">
          <div class="card-header">
            <div class="dont-header-icon"><i class="fa-solid fa-xmark"></i></div>
            Yang HARUS Dihindari
          </div>
          <ul class="do-dont-list dont-list">
            ${edu.dont.map(item => `
              <li>
                <span class="li-icon"><i class="fa-solid fa-circle-xmark"></i></span>
                <span><strong>${item.icon}</strong> ${item.text}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>

      <!-- Link to hasil -->
      ${wasChecked ? `
        <div style="text-align: center; margin-top: 1rem;">
          <a href="hasil.html" class="btn btn-secondary btn-sm">
            <i class="fa-solid fa-arrow-left"></i> Kembali ke Hasil Kuesioner
          </a>
        </div>
      ` : ''}
    `;

    container.appendChild(panel);
  });
}
