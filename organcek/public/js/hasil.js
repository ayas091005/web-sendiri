/**
 * OrganCek — hasil.js
 * Renders results: per-organ score cards, PDF download.
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

  // PDF download
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
    // level: 'low' | 'medium' | 'high'
    // but the labels according to the friend's HTML: RISIKO RENDAH, RISIKO SEDANG, RISIKO TINGGI.
    // colors: low=success, medium=warning, high=danger.
    const riskLabel = level === 'low' ? 'RISIKO RENDAH' : level === 'medium' ? 'RISIKO SEDANG' : 'RISIKO TINGGI';
    
    // class map
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
// PDF DOWNLOAD
// ============================================================
function downloadPDF() {
  const btn = document.getElementById('btn-download-pdf');
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Memproses...';
  btn.disabled = true;

  const element = document.getElementById('printable-area');

  const originalScrollPos = window.scrollY;
  window.scrollTo(0, 0);

  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10);

    const opt = {
    margin: [15, 10, 15, 10], // Comfortable breathing room
    filename: `OrganCek_Hasil_${dateStr}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      logging: false,
      useCORS: true,
      windowWidth: 1300, // Make viewport wide enough so .container doesn't overflow and chop the left side!
      scrollY: 0,
      onclone: function(clonedDoc) {
        // Stop animations
        const animatedElements = clonedDoc.querySelectorAll('.anim-fadeup, .laporan-card');
        animatedElements.forEach(el => {
          el.style.animation = 'none';
          el.style.opacity = '1';
          el.style.transform = 'none';
        });

        // Hide answer details
        const detailsBlocks = clonedDoc.querySelectorAll('details');
        detailsBlocks.forEach(el => el.style.display = 'none');
        
        // Hide action buttons
        const actionArea = clonedDoc.querySelector('.action-area');
        if(actionArea) actionArea.style.display = 'none';

        // Hide warning banner
        const warnings = clonedDoc.querySelectorAll('.disclaimer-banner');
        warnings.forEach(w => w.style.display = 'none');

        // Color and background fixes for clean white PDF layout
        clonedDoc.body.style.background = '#FFFFFF';
        const printableArea = clonedDoc.getElementById('printable-area');
        if(printableArea) printableArea.style.background = '#FFFFFF';

        // Title to dark blue and nuke the gradient box that might linger
        const mainTitle = clonedDoc.querySelector('h1');
        if(mainTitle) {
            mainTitle.style.color = '#0F172A'; 
            mainTitle.innerHTML = 'Laporan Kesehatan Organmu';
        }
        
        // Failsafe: if there are any lingering gradient-text spans, obliterate their styles
        const gradTexts = clonedDoc.querySelectorAll('.gradient-text');
        gradTexts.forEach(el => {
            el.classList.remove('gradient-text');
            el.style.background = 'transparent';
            el.style.color = '#0F172A';
            el.style.webkitTextFillColor = 'initial';
        });


        const subtitle = clonedDoc.querySelector('h1 + p');
        if (subtitle) subtitle.style.color = '#475569';

        clonedDoc.body.style.color = '#1E293B';

        const cards = clonedDoc.querySelectorAll('.laporan-card');
        cards.forEach(card => {
            // Elegant Light Mode Card Styling
            card.style.background = '#FFFFFF';
            card.style.border = '2px solid #E2E8F0';
            card.style.borderRadius = '16px';
            card.style.padding = '1.5rem';
            
            // Text color corrections
            const h3 = card.querySelector('h3');
            if(h3) {
                h3.style.color = '#0F172A';
                h3.style.fontWeight = '800';
            }
            
            const strongs = card.querySelectorAll('strong');
            strongs.forEach(s => s.style.color = '#0F172A');
            
            const paragraphs = card.querySelectorAll('p');
            paragraphs.forEach(p => p.style.color = '#334155');
            
            const legend = card.querySelector('.score-legend');
            if(legend) legend.style.color = '#64748B';

            // Organ Graphic Box Styling
            const imgBox = card.querySelector('.laporan-organ-img');
            if(imgBox) {
                imgBox.style.background = '#F8FAFC';
                imgBox.style.border = '1px solid #E2E8F0';
                imgBox.style.borderRadius = '12px';
                imgBox.style.padding = '0.5rem';
            }

            // Recommendations Panel Styling
            const recBox = card.querySelector('.rekomendasi-box');
            if(recBox) {
                recBox.style.background = '#F1F5F9';
                recBox.style.border = '1px solid #E2E8F0';
                recBox.style.borderRadius = '12px';
                recBox.style.padding = '1rem';
                recBox.style.marginTop = '1.5rem';
            }
        });

        // Fix backdrop-filter bug that often entirely blanks html2canvas
        const allElements = clonedDoc.querySelectorAll('*');
        allElements.forEach(el => {
            el.style.backdropFilter = 'none';
            el.style.webkitBackdropFilter = 'none';
        });

        // Safe 2x2 Pagination Layout without buggy CSS Grid
        const grid = clonedDoc.querySelector('.laporan-grid');
        if (grid) {
             grid.style.display = 'grid';
             grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
             grid.style.gap = '1.5rem';
             
             // Scale down the whole grid slightly so all 4 cards comfortably fit on 1 Landscape page
             // This completely bypasses any PDF slicing bugs!
             grid.style.transform = 'scale(0.85)';
             grid.style.transformOrigin = 'top center';
             grid.style.marginBottom = '-10%';
        }
      }
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'landscape' 
    },
    pagebreak: { mode: ['css', 'legacy'] } 
  };

  html2pdf().set(opt).from(element).save().then(() => {
    window.scrollTo(0, originalScrollPos);
    btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Berhasil Diunduh!';
    btn.style.background = 'linear-gradient(135deg, #16A34A, #22C55E)';
    setTimeout(() => {
      btn.innerHTML = '<i class="fa-solid fa-file-pdf"></i> Download Hasil (PDF)';
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  }).catch((err) => {
    console.error("PDF Export Error:", err);
    window.scrollTo(0, originalScrollPos);
    btn.innerHTML = '<i class="fa-solid fa-file-pdf"></i> Download Hasil (PDF)';
    btn.disabled = false;
    alert("Gagal mengunduh PDF. Silakan coba lagi.");
  });
}