/**
 * OrganCek — hasil.js
 * Renders results: per-organ score cards, radar chart, PDF download.
 */

document.addEventListener('DOMContentLoaded', () => {
  const scores = Session.getScores();
  const organs = Session.getOrgans();

  if (!organs.length || !Object.keys(scores).length) {
    document.getElementById('empty-state').classList.remove('hidden');
    return;
  }

  document.getElementById('results-area').classList.remove('hidden');

  // Date/time
  const now = new Date();
  document.getElementById('result-datetime').textContent =
    `📅 Diperiksa pada: ${now.toLocaleDateString('id-ID', { weekday:'long', year:'numeric', month:'long', day:'numeric' })} pukul ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute:'2-digit' })}`;

  renderSummaryMini(organs, scores);
  renderRadarChart(organs, scores);
  renderOrganCards(organs, scores);

  // PDF download
  document.getElementById('btn-download-pdf').addEventListener('click', downloadPDF);
});

// ============================================================
// SUMMARY MINI TILES
// ============================================================
function renderSummaryMini(organs, scores) {
  const grid = document.getElementById('summary-mini-grid');
  grid.innerHTML = '';

  organs.forEach(id => {
    const o = ORGANS[id];
    const score = scores[id];
    const level = getRiskLevel(score);
    const color = getRiskColor(level);

    const div = document.createElement('div');
    div.className = 'summary-mini';
    div.innerHTML = `
      <div class="mini-icon" style="background: ${o.glow}; color: ${o.color};">${o.emoji}</div>
      <div>
        <div class="mini-name">${o.name}</div>
        <div class="mini-score" style="color: ${color};">${score}%</div>
        <div class="mt-1"><span class="badge badge-${level}">${getRiskEmoji(level)} ${getRiskLabel(score)}</span></div>
      </div>
    `;
    grid.appendChild(div);
  });
}

// ============================================================
// RADAR CHART
// ============================================================
function renderRadarChart(organs, scores) {
  const canvas = document.getElementById('radarChart');
  const ctx = canvas.getContext('2d');

  const labels = organs.map(id => ORGANS[id].name);
  const data = organs.map(id => scores[id]);
  const colors = organs.map(id => ORGANS[id].color);

  new Chart(ctx, {
    type: 'radar',
    data: {
      labels,
      datasets: [{
        label: 'Skor (%)',
        data,
        backgroundColor: 'rgba(6, 182, 212, 0.1)',
        borderColor: '#06B6D4',
        borderWidth: 2,
        pointBackgroundColor: colors,
        pointBorderColor: colors,
        pointRadius: 5,
        pointHoverRadius: 7,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.raw}% — ${getRiskLabel(ctx.raw)}`
          }
        }
      },
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 25,
            color: '#475569',
            font: { size: 10 },
            backdropColor: 'transparent',
          },
          grid: { color: 'rgba(255,255,255,0.06)' },
          angleLines: { color: 'rgba(255,255,255,0.06)' },
          pointLabels: {
            color: '#94A3B8',
            font: { size: 12, family: 'Inter' },
          }
        }
      }
    }
  });
}

// ============================================================
// PER-ORGAN RESULT CARDS
// ============================================================
function renderOrganCards(organs, scores) {
  const container = document.getElementById('organ-results-list');
  container.innerHTML = '';

  organs.forEach((id, i) => {
    const o = ORGANS[id];
    const score = scores[id];
    const level = getRiskLevel(score);
    const color = getRiskColor(level);
    const rec = RECOMMENDATIONS[id][level];

    // Build bar class
    const barClass = level === 'low' ? 'fill-low' : level === 'medium' ? 'fill-medium' : 'fill-high';

    const card = document.createElement('div');
    card.className = 'result-card anim-fadeup';
    card.style.animationDelay = `${i * 0.1}s`;
    card.dataset.organ = id;
    card.style.setProperty('--oc', o.color);
    card.style.setProperty('--og', o.glow);

    card.innerHTML = `
      <div class="result-card-top">
        <div class="organ-icon" style="background: ${o.glow}; color: ${o.color}; box-shadow: 0 0 25px ${o.glow};">
          ${o.emoji}
        </div>
        <div class="result-organ-info">
          <h3>${o.name}</h3>
          <div class="risk-label" style="margin-bottom: 0.35rem;">
            <span class="badge badge-${level}">${getRiskEmoji(level)} ${getRiskLabel(score)}</span>
          </div>
        </div>
        <div class="result-score">
          <div class="score-num" style="color: ${color};">${score}</div>
          <div class="score-unit">/ 100</div>
        </div>
      </div>

      <!-- Score bar -->
      <div class="score-bar-track">
        <div class="score-bar-fill ${barClass}" id="bar-${id}" style="width: 0%"></div>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 0.72rem; color: var(--text-muted); margin-top: 0.35rem; margin-bottom: 1rem;">
        <span>🟢 Sehat (≥70%)</span>
        <span>🟡 Waspada (40–69%)</span>
        <span>🔴 Risiko (<40%)</span>
      </div>

      <!-- Recommendation -->
      <div class="rekomendasi-box">
        <i class="fa-solid fa-circle-info"></i>
        <div>
          <strong style="display:block; margin-bottom:0.25rem;">Rekomendasi</strong>
          ${rec}
        </div>
      </div>

      <!-- Answer summary -->
      <details style="margin-top: 1rem;">
        <summary style="cursor: pointer; color: var(--text-muted); font-size: 0.8rem; user-select: none; padding: 0.4rem 0;">
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

    // Fill answer detail
    fillAnswerDetail(id, card);
  });
}

function fillAnswerDetail(organId, cardEl) {
  const answers = Session.getAnswers();
  const organAnswers = answers[organId] || [];
  const questions = QUESTIONS[organId];
  const container = cardEl.querySelector(`#answers-detail-${organId}`);

  // Note: 2 (protektif) -> Green, 1 (antara) -> Yellow, 0 (berisiko) -> Red
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
        padding: 0.2rem 0.5rem;
        border-radius: 999px;
        white-space: nowrap;
      ">${label}</span>
    `;
    container.appendChild(row);
  });
}

// ============================================================
// PDF DOWNLOAD
// ============================================================
function downloadPDF() {
  const btn = document.getElementById('btn-download-pdf');
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Memproses...';
  btn.disabled = true;

  const element = document.getElementById('printable-area');

  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10);

  const opt = {
    margin: [10, 10, 10, 10],
    filename: `OrganCek_Hasil_${dateStr}.pdf`,
    image: { type: 'jpeg', quality: 0.96 },
    html2canvas: {
      scale: 2,
      backgroundColor: '#050B18',
      logging: false,
      useCORS: true,
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  html2pdf().set(opt).from(element).save().then(() => {
    btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Berhasil Diunduh!';
    btn.style.background = 'linear-gradient(135deg, #16A34A, #22C55E)';
    setTimeout(() => {
      btn.innerHTML = '<i class="fa-solid fa-file-pdf"></i> Unduh PDF';
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  }).catch(() => {
    btn.innerHTML = '<i class="fa-solid fa-file-pdf"></i> Unduh PDF';
    btn.disabled = false;
  });
}