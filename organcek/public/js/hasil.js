/**
 * OrganCek — hasil.js
 * Renders results: per-organ score cards, Image download.
 */

document.addEventListener('DOMContentLoaded', () => {
  const scores = Session.getScores();
  const organs = Session.getOrgans();

  if (!organs.length || !Object.keys(scores).length) {
    document.getElementById('empty-state').classList.remove('hidden');
    return;
  }

  document.getElementById('results-area').classList.remove('hidden');

  renderOrganCards(organs, scores);

  // Image download
  document.getElementById('btn-download-pdf').addEventListener('click', downloadPDF);
});

// ============================================================
// PER-ORGAN RESULT CARDS
// ============================================================
function renderOrganCards(organs, scores) {
  const container = document.getElementById('laporan-grid');
  container.innerHTML = '';

  organs.forEach((id, i) => {
    const o = ORGANS[id];
    const score = scores[id];
    const level = getRiskLevel(score);
    const riskLabel = level === 'low' ? 'RISIKO RENDAH' : level === 'medium' ? 'RISIKO SEDANG' : 'RISIKO TINGGI';

    const barClass = `fill-${level}`;
    const scoreColorVar = `var(--${level === 'low' ? 'success' : level === 'medium' ? 'warning' : 'danger'})`;

    const rec = RECOMMENDATIONS[id][level];

    const card = document.createElement('div');
    card.className = 'laporan-card anim-fadeup';
    card.dataset.organ = id;
    card.style.animationDelay = `${i * 0.1}s`;

    card.innerHTML = `
      <div class="laporan-card-top">
        <div class="laporan-organ-img">
          <img src="/img/${id}.png" alt="${o.name}">
        </div>
        <div class="laporan-organ-info">
          <h3>${o.name}</h3>
          <div class="badge-risk ${level}">
            <div class="risk-dot ${level}"></div> ${riskLabel}
          </div>
        </div>
        <div class="laporan-score">
          <div class="score-num" style="color: ${scoreColorVar};">${score}</div>
          <div class="score-unit">/ 100</div>
        </div>
      </div>

      <div class="score-bar-track">
        <div class="score-bar-fill ${barClass}" id="bar-${id}" style="width: 0%"></div>
      </div>

      <div class="score-legend">
        <span><i class="legend-dot" style="background: var(--success);"></i> Rendah (0-30%)</span>
        <span><i class="legend-dot" style="background: var(--warning);"></i> Sedang (31-60%)</span>
        <span><i class="legend-dot" style="background: var(--danger);"></i> Tinggi (61-100%)</span>
      </div>

      <div class="rekomendasi-box">
        <i class="fa-solid fa-circle-info"></i>
        <div>
          <strong>Rekomendasi</strong>
          <p>${rec}</p>
        </div>
      </div>
      
      <!-- Answer summary toggle -->
      <details style="margin-top: 1rem; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 1rem; transition: all 0.3s;">
        <summary style="cursor: pointer; color: var(--text-muted); font-size: 0.85rem; user-select: none;">
          <i class="fa-solid fa-list-ul"></i> Lihat detail jawaban (${QUESTIONS[id].length} pertanyaan)
        </summary>
        <div style="margin-top: 0.75rem; display: flex; flex-direction: column; gap: 0.5rem;" id="answers-detail-${id}"></div>
      </details>
    `;

    container.appendChild(card);

    // Animate bar after render
    setTimeout(() => {
      const bar = document.getElementById(`bar-${id}`);
      if (bar) bar.style.width = `${score}%`;
    }, 300 + i * 100);

    // Fill answer detail natively logic reused
    fillAnswerDetail(id, card);
  });
}

function fillAnswerDetail(organId, cardEl) {
  const answers = Session.getAnswers();
  const organAnswers = answers[organId] || [];
  const questions = QUESTIONS[organId];
  const container = cardEl.querySelector(`#answers-detail-${organId}`);

  const dotColors = {
    0: '#EF4444', // Red
    1: '#EAB308', // Yellow
    2: '#22C55E'  // Green
  };

  questions.forEach((qObj, i) => {
    const val = organAnswers[i];
    if (val === null || val === undefined) return;

    const optObj = qObj.options.find(o => o.score === val);
    const label = optObj ? optObj.label : `Skor ${val}`;
    const qText = qObj.text;

    let dotColor = dotColors[val] || '#94A3B8';

    const row = document.createElement('div');
    row.style.cssText = `
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.05);
      border-radius: 8px;
      padding: 0.6rem 0.85rem;
      font-size: 0.8rem;
      color: var(--text-secondary);
      display: flex;
      gap: 0.75rem;
      align-items: flex-start;
      margin-bottom: 0.4rem;
    `;
    row.innerHTML = `
      <span style="color: var(--text-muted); flex-shrink:0;">${i + 1}.</span>
      <span style="flex:1">${qText}</span>
      <span style="
        flex-shrink:0;
        color: ${dotColor};
        font-weight: 600;
        font-size: 0.72rem;
        border: 1px solid ${dotColor}40;
        background: ${dotColor}12;
        padding: 0.2rem 0.6rem;
        border-radius: 999px;
        white-space: nowrap;
      ">${label}</span>
    `;
    container.appendChild(row);
  });
}

// ============================================================
// IMAGE DOWNLOAD (PNG) — via html2canvas
// ============================================================
function downloadPDF() {
  const btn = document.getElementById('btn-download-pdf');
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Memproses...';
  btn.disabled = true;

  const originalScrollPos = window.scrollY;
  window.scrollTo(0, 0);

  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10);
  const timeStr = now.toLocaleString('id-ID', {
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });

  // ── Build a dedicated off-screen container for rendering ────
  const wrapper = document.createElement('div');
  wrapper.style.cssText = `
    position:fixed; left:-9999px; top:0;
    width:1100px;
    background:#F0F4F8;
    font-family:'Inter','Poppins','Segoe UI',sans-serif;
    color:#1E293B;
    -webkit-font-smoothing:antialiased;
    padding:0; margin:0;
  `;

  // ── Premium Header ──────────────────────────────────────────
  const header = document.createElement('div');
  header.style.cssText = `
    background:linear-gradient(135deg,#0F172A 0%,#1E3A5F 50%,#0C4A6E 100%);
    padding:32px 48px 28px; text-align:center;
    position:relative; overflow:hidden;
  `;
  header.innerHTML = `
    <div style="position:absolute;top:-30px;right:-30px;width:120px;height:120px;border-radius:50%;background:rgba(14,165,233,0.12);"></div>
    <div style="position:absolute;bottom:-20px;left:-20px;width:80px;height:80px;border-radius:50%;background:rgba(34,197,94,0.08);"></div>
    <div style="display:flex;align-items:center;justify-content:center;gap:14px;margin-bottom:12px;">
      <div style="width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,#0EA5E9,#38BDF8);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(14,165,233,0.3);">
        <span style="color:#fff;font-size:20px;">🩺</span>
      </div>
      <div style="text-align:left;">
        <div style="font-family:'Poppins',sans-serif;font-size:1.1rem;font-weight:800;color:#FFF;letter-spacing:0.5px;">Organ<span style="color:#38BDF8;">Cek</span></div>
        <div style="font-size:0.65rem;color:#94A3B8;letter-spacing:1px;text-transform:uppercase;">Skrining Kesehatan Mandiri</div>
      </div>
    </div>
    <h1 style="font-family:'Poppins',sans-serif;font-weight:900;font-size:2.4rem;color:#FFF;margin:8px 0 6px;letter-spacing:-0.5px;line-height:1.15;">
      Laporan <span style="color:#38BDF8;">Kesehatan Organmu</span>
    </h1>
    <p style="color:#CBD5E1;font-size:0.85rem;margin:0;line-height:1.5;">
      Berdasarkan jawaban kuesioner Anda, berikut adalah analisis risiko organ yang diperiksa.
    </p>
    <div style="margin-top:14px;display:inline-block;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:999px;padding:4px 16px;font-size:0.7rem;color:#94A3B8;">
      📅 ${timeStr}
    </div>
  `;
  wrapper.appendChild(header);

  // ── Risk colors ─────────────────────────────────────────────
  const riskColors = {
    low:    { accent:'#22C55E', light:'#DCFCE7', badgeBg:'#DCFCE7', badgeText:'#15803D', badgeBorder:'#86EFAC' },
    medium: { accent:'#EAB308', light:'#FEF9C3', badgeBg:'#FEF9C3', badgeText:'#854D0E', badgeBorder:'#FDE047' },
    high:   { accent:'#EF4444', light:'#FFE4E6', badgeBg:'#FFE4E6', badgeText:'#9F1239', badgeBorder:'#FDA4AF' },
  };

  // ── Get data ────────────────────────────────────────────────
  const scores = Session.getScores();
  const organs = Session.getOrgans();

  // ── Build card grid ─────────────────────────────────────────
  const grid = document.createElement('div');
  grid.style.cssText = `
    display:grid; grid-template-columns:repeat(2,1fr);
    gap:20px; padding:28px 40px 20px; max-width:1100px; margin:0 auto;
  `;

  organs.forEach(id => {
    const o = ORGANS[id];
    const score = scores[id];
    const level = getRiskLevel(score);
    const rc = riskColors[level];
    const riskLabel = level === 'low' ? 'RISIKO RENDAH' : level === 'medium' ? 'RISIKO SEDANG' : 'RISIKO TINGGI';
    const rec = RECOMMENDATIONS[id][level];

    const card = document.createElement('div');
    card.style.cssText = `
      background:#FFF; border:1.5px solid #E2E8F0;
      border-left:6px solid ${rc.accent};
      border-radius:16px; padding:20px 22px 18px;
      box-shadow:0 2px 8px rgba(0,0,0,0.04);
    `;

    const imgSrc = `/img/${id}.png`;

    card.innerHTML = `
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:14px;">
        <div style="background:${rc.light};border:1.5px solid ${rc.accent}30;border-radius:14px;width:56px;height:56px;flex-shrink:0;display:flex;align-items:center;justify-content:center;">
          <img src="${imgSrc}" style="width:32px;height:32px;object-fit:contain;">
        </div>
        <div style="flex:1;">
          <div style="font-family:'Poppins',sans-serif;font-weight:800;font-size:1.2rem;color:#0F172A;margin:0 0 5px;">${o.name}</div>
          <div style="display:inline-flex;align-items:center;gap:5px;background:${rc.badgeBg};border:1.5px solid ${rc.badgeBorder};color:${rc.badgeText};border-radius:999px;padding:3px 10px;font-size:0.62rem;font-weight:700;letter-spacing:0.6px;">
            <span style="background:${rc.accent};width:7px;height:7px;border-radius:50%;display:inline-block;"></span>
            ${riskLabel}
          </div>
        </div>
        <div style="text-align:right;">
          <div style="font-family:'Poppins',sans-serif;font-weight:900;font-size:2.6rem;line-height:1;color:${rc.accent};">${score}</div>
          <div style="color:#94A3B8;font-size:0.75rem;margin-top:2px;">/ 100</div>
        </div>
      </div>

      <div style="background:#F1F5F9;border:1px solid #E2E8F0;border-radius:999px;height:8px;overflow:hidden;margin-bottom:6px;">
        <div style="background:linear-gradient(90deg,${rc.accent}CC,${rc.accent});height:8px;border-radius:999px;width:${score}%;"></div>
      </div>

      <div style="color:#64748B;font-size:0.65rem;display:flex;justify-content:space-between;margin-bottom:12px;padding:0 2px;">
        <span><span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#22C55E;margin-right:4px;vertical-align:middle;"></span>Rendah (0-30%)</span>
        <span><span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#EAB308;margin-right:4px;vertical-align:middle;"></span>Sedang (31-60%)</span>
        <span><span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#EF4444;margin-right:4px;vertical-align:middle;"></span>Tinggi (61-100%)</span>
      </div>

      <div style="background:linear-gradient(135deg,#EFF6FF,#F0F9FF);border:1.5px solid #BFDBFE;border-radius:12px;padding:12px 14px;display:flex;align-items:flex-start;gap:10px;">
        <span style="color:#2563EB;font-size:0.95rem;margin-top:1px;flex-shrink:0;">ℹ️</span>
        <div>
          <strong style="color:#1E40AF;font-size:0.78rem;font-weight:700;display:block;margin-bottom:3px;">Rekomendasi</strong>
          <p style="color:#334155;font-size:0.72rem;line-height:1.55;margin:0;">${rec}</p>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  wrapper.appendChild(grid);

  // ── Premium Footer ──────────────────────────────────────────
  const footer = document.createElement('div');
  footer.style.cssText = `
    max-width:1020px; margin:8px auto 0; padding:14px 40px 24px;
    border-top:2px solid #E2E8F0;
    display:flex; justify-content:space-between; align-items:flex-start; gap:20px;
  `;
  footer.innerHTML = `
    <div style="flex:1;font-size:0.68rem;color:#94A3B8;line-height:1.6;">
      <strong style="color:#64748B;">⚠️ Disclaimer:</strong>
      Hasil ini bersifat <strong>prediksi awal</strong> berdasarkan kuesioner mandiri dan
      <strong>BUKAN diagnosis medis profesional</strong>. Selalu konsultasikan kondisi
      kesehatan Anda dengan dokter yang berkompeten.
    </div>
    <div style="text-align:right;flex-shrink:0;font-size:0.6rem;color:#94A3B8;line-height:1.6;">
      <div style="font-weight:700;color:#64748B;font-size:0.7rem;margin-bottom:2px;">
        Organ<span style="color:#0EA5E9;">Cek</span>
      </div>
      <div>Dicetak: ${timeStr}</div>
    </div>
  `;
  wrapper.appendChild(footer);

  // ── Append to body, render, then remove ─────────────────────
  document.body.appendChild(wrapper);

  // Small delay to let images load
  setTimeout(() => {
    html2canvas(wrapper, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#F0F4F8',
      width: 1100,
      windowWidth: 1100
    }).then(canvas => {
      // Remove the off-screen element
      document.body.removeChild(wrapper);
      window.scrollTo(0, originalScrollPos);

      // Convert canvas to blob and download
      canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `OrganCek_Laporan_${dateStr}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Berhasil Diunduh!';
        btn.style.background = 'linear-gradient(135deg, #16A34A, #22C55E)';
        setTimeout(() => {
          btn.innerHTML = '<i class="fa-solid fa-image"></i> Download Hasil (Gambar)';
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }, 'image/png', 1.0);
    }).catch(err => {
      console.error('Image export error:', err);
      document.body.removeChild(wrapper);
      window.scrollTo(0, originalScrollPos);
      btn.innerHTML = '<i class="fa-solid fa-image"></i> Download Hasil (Gambar)';
      btn.disabled = false;
      alert('Gagal mengunduh gambar. Silakan coba lagi.');
    });
  }, 500);
}