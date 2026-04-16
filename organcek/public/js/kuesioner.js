/**
 * OrganCek — kuesioner.js
 * Handles organ selection, question rendering, answer tracking, and scoring.
 */

// ============================================================
// STATE
// ============================================================
let selectedOrgans = [];   // ['jantung', 'hati', ...]
let currentOrganIdx = 0;   // index into selectedOrgans
let currentQIdx = 0;       // 0–9 within current organ
let answers = {};          // { jantung: [0,1,3,...], hati: [...] }

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // Do NOT clear session here — user may have navigated from hasil.html
  // Session is cleared only when user explicitly starts a new quiz
  renderOrganSelection();
});

// ============================================================
// STEP 1 — ORGAN SELECTION
// ============================================================
function renderOrganSelection() {
  const grid = document.getElementById('organ-select-grid');
  grid.innerHTML = '';

  ORGAN_ORDER.forEach(id => {
    const o = ORGANS[id];
    const card = document.createElement('div');
    card.className = 'organ-select-card';
    card.dataset.organ = id;
    card.innerHTML = `
      <div class="check-icon"><i class="fa-solid fa-check"></i></div>
      <div class="organ-icon organ-icon-lg" data-organ="${id}">${o.emoji}</div>
      <h3>${o.name}</h3>
      <p>${o.desc}</p>
    `;
    card.addEventListener('click', () => toggleOrgan(id, card));
    grid.appendChild(card);
  });

  document.getElementById('btn-start-quiz').addEventListener('click', startQuiz);
  document.getElementById('input-weight').addEventListener('input', checkStartStatus);
  document.getElementById('input-height').addEventListener('input', checkStartStatus);
}

function toggleOrgan(id, card) {
  card.classList.toggle('selected');
  if (selectedOrgans.includes(id)) {
    selectedOrgans = selectedOrgans.filter(o => o !== id);
  } else {
    selectedOrgans.push(id);
  }

  // Keep order consistent with ORGAN_ORDER
  selectedOrgans.sort((a, b) => ORGAN_ORDER.indexOf(a) - ORGAN_ORDER.indexOf(b));

  checkStartStatus();
}

function checkStartStatus() {
  const btn = document.getElementById('btn-start-quiz');
  const hint = document.getElementById('select-hint');
  const w = parseFloat(document.getElementById('input-weight').value);
  const h = parseFloat(document.getElementById('input-height').value);

  const organsOk = selectedOrgans.length > 0;
  const bmiOk = !isNaN(w) && !isNaN(h) && w > 0 && h > 0;

  btn.disabled = !(organsOk && bmiOk);

  if (!organsOk) {
    hint.innerHTML = `<i class="fa-solid fa-circle-info"></i> Pilih minimal satu organ untuk melanjutkan`;
  } else if (!bmiOk) {
    hint.innerHTML = `<i class="fa-solid fa-circle-info"></i> Masukkan data berat dan tinggi badan dengan benar`;
  } else {
    hint.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--accent)"></i> Siap memulai kuesioner (${selectedOrgans.length} organ)`;
  }
}

function startQuiz() {
  const w = parseFloat(document.getElementById('input-weight').value);
  const h = parseFloat(document.getElementById('input-height').value);
  if (selectedOrgans.length === 0 || isNaN(w) || isNaN(h)) return;

  // Clear previous results before starting fresh quiz
  Session.clear();

  const bmiVal = calculateBMI(w, h);
  const bmiCat = getBMICategory(bmiVal);
  Session.setBMI({ bmi: bmiVal, category: bmiCat.label });

  // Initialise answers for all selected organs
  selectedOrgans.forEach(id => {
    answers[id] = new Array(QUESTIONS[id].length).fill(null);
  });

  currentOrganIdx = 0;
  currentQIdx = 0;

  document.getElementById('step-select').classList.add('hidden');
  document.getElementById('step-quiz').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  renderOrganDots();
  renderCurrentQuestion();
}

// ============================================================
// ORGAN PROGRESS DOTS
// ============================================================
function renderOrganDots() {
  const container = document.getElementById('organ-steps-dots');
  container.innerHTML = '';
  selectedOrgans.forEach((id, i) => {
    const dot = document.createElement('div');
    dot.className = 'organ-step-dot';
    dot.id = `dot-${id}`;
    if (i < currentOrganIdx) dot.classList.add('done');
    if (i === currentOrganIdx) dot.classList.add('active');
    dot.title = ORGANS[id].name;
    container.appendChild(dot);
  });
}

function updateOrganDots() {
  selectedOrgans.forEach((id, i) => {
    const dot = document.getElementById(`dot-${id}`);
    if (!dot) return;
    dot.className = 'organ-step-dot';
    if (i < currentOrganIdx) dot.classList.add('done');
    if (i === currentOrganIdx) dot.classList.add('active');
  });
}

// ============================================================
// QUESTION RENDERING
// ============================================================
function renderCurrentQuestion() {
  const organId = selectedOrgans[currentOrganIdx];
  const organ = ORGANS[organId];
  const questions = QUESTIONS[organId];
  const totalQ = questions.length;

  // Organ header
  document.getElementById('quiz-organ-icon').innerHTML = organ.emoji;
  document.getElementById('quiz-organ-icon').dataset.organ = organId;
  document.getElementById('quiz-organ-name').textContent = organ.name;

  // Set CSS variable for organ color on the icon
  const iconEl = document.getElementById('quiz-organ-icon');
  iconEl.style.setProperty('--oc', organ.color);
  iconEl.style.setProperty('--og', organ.glow);
  iconEl.style.background = organ.glow;
  iconEl.style.color = organ.color;
  iconEl.style.boxShadow = `0 0 25px ${organ.glow}`;

  // Organ name color
  document.getElementById('quiz-organ-name').style.color = organ.color;

  // Progress
  const progressPct = Math.round((currentQIdx / totalQ) * 100);
  document.getElementById('quiz-progress-text').textContent =
    `Organ ${currentOrganIdx + 1}/${selectedOrgans.length}: Pertanyaan ${currentQIdx + 1} dari ${totalQ}`;
  document.getElementById('quiz-progress-pct').textContent = `${progressPct}%`;
  document.getElementById('quiz-progress-bar').style.width = `${progressPct}%`;

  // Nav center
  document.getElementById('quiz-nav-center').innerHTML =
    `<i class="fa-solid fa-${organ.icon}" style="color:${organ.color}"></i> ${organ.name}`;

  // Render question
  const container = document.getElementById('questions-container');
  const q = questions[currentQIdx];
  const savedAnswer = answers[organId][currentQIdx];

  const qText = typeof q === 'object' ? q.text : q;
  const qOptions = typeof q === 'object' && q.options ? q.options : ANSWER_OPTIONS;

  container.innerHTML = `
    <div class="question-card anim-slide" data-organ="${organId}">
      <div class="question-num">Pertanyaan ${currentQIdx + 1} / ${totalQ}</div>
      <div class="question-text">${qText}</div>
      <div class="answer-options" id="answer-options">
        ${qOptions.map(opt => {
    const val = opt.score !== undefined ? opt.score : opt.value;
    const icon = opt.icon || (val === 2 ? '😊' : val === 1 ? '😐' : '😟');
    return `
          <button
            class="answer-btn ${savedAnswer === val ? 'selected' : ''}"
            data-value="${val}"
            onclick="selectAnswer(${val}, this)"
            style="${savedAnswer === val ? `border-color: ${organ.color}; background: ${organ.glow};` : ''}"
          >
            <div class="ans-icon" data-value="${val}">${icon}</div>
            <span>${opt.label}</span>
          </button>
        `}).join('')}
      </div>
    </div>
  `;

  // Nav buttons
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');

  // Show/hide prev
  btnPrev.style.visibility =
    (currentOrganIdx === 0 && currentQIdx === 0) ? 'hidden' : 'visible';

  // Next button label
  const isLastQ = currentQIdx === totalQ - 1;
  const isLastOrgan = currentOrganIdx === selectedOrgans.length - 1;

  if (isLastQ && isLastOrgan) {
    btnNext.innerHTML = '<i class="fa-solid fa-check"></i> Selesaikan';
  } else if (isLastQ) {
    btnNext.innerHTML = `Organ Berikutnya <i class="fa-solid fa-arrow-right"></i>`;
  } else {
    btnNext.innerHTML = `Selanjutnya <i class="fa-solid fa-arrow-right"></i>`;
  }

  // Bind navigation
  btnPrev.onclick = goPrev;
  btnNext.onclick = goNext;

  updateOrganDots();
}

// ============================================================
// ANSWER SELECTION
// ============================================================
function selectAnswer(value, btnEl) {
  const organId = selectedOrgans[currentOrganIdx];
  const organ = ORGANS[organId];

  answers[organId][currentQIdx] = value;

  // Update UI
  document.querySelectorAll('.answer-btn').forEach(btn => {
    btn.classList.remove('selected');
    btn.style.borderColor = '';
    btn.style.background = '';
  });

  btnEl.classList.add('selected');
  btnEl.style.borderColor = organ.color;
  btnEl.style.background = organ.glow;
}

// ============================================================
// NAVIGATION
// ============================================================
function goNext() {
  const organId = selectedOrgans[currentOrganIdx];
  const questions = QUESTIONS[organId];

  // Validate answer
  if (answers[organId][currentQIdx] === null) {
    showAnswerRequired();
    return;
  }

  const isLastQ = currentQIdx === questions.length - 1;
  const isLastOrgan = currentOrganIdx === selectedOrgans.length - 1;

  if (isLastQ && isLastOrgan) {
    // Done — save and go to hasil
    finishQuiz();
    return;
  }

  if (isLastQ) {
    // Move to next organ
    currentOrganIdx++;
    currentQIdx = 0;
  } else {
    currentQIdx++;
  }

  renderCurrentQuestion();
}

function goPrev() {
  if (currentQIdx > 0) {
    currentQIdx--;
  } else if (currentOrganIdx > 0) {
    currentOrganIdx--;
    currentQIdx = QUESTIONS[selectedOrgans[currentOrganIdx]].length - 1;
  }
  renderCurrentQuestion();
}

function showAnswerRequired() {
  const container = document.getElementById('questions-container');
  const existing = container.querySelector('.answer-required-msg');
  if (existing) return;

  const msg = document.createElement('div');
  msg.className = 'answer-required-msg';
  msg.style.cssText = `
    background: rgba(239,68,68,0.1);
    border: 1px solid rgba(239,68,68,0.25);
    border-radius: 8px;
    padding: 0.6rem 1rem;
    color: #F87171;
    font-size: 0.82rem;
    margin-top: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    animation: fadeIn 0.3s ease;
  `;
  msg.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Silakan pilih salah satu jawaban terlebih dahulu.';
  container.appendChild(msg);

  setTimeout(() => msg.remove(), 2500);
}

// ============================================================
// FINISH — Calculate scores and save
// ============================================================
async function finishQuiz() {
  const w = parseFloat(document.getElementById('input-weight').value);
  const h = parseFloat(document.getElementById('input-height').value);
  
  // Save organs and answers to session immediately so hasil page can show details
  Session.setOrgans(selectedOrgans);
  Session.setAnswers(answers);

  const doneStep = document.getElementById('step-done');
  document.getElementById('step-quiz').classList.add('hidden');
  doneStep.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  try {
    const response = await fetch('/kuesioner/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        weight: w,
        height: h,
        answers: answers
      })
    });

    const result = await response.json();
    
    if (result.status === 'success') {
      Session.setScores(result.data.scores);
      // BMI returned by server is set here
      Session.setBMI(result.data.bmi_data);
      
      // Auto-redirect to hasil
      setTimeout(() => { window.location.href = '/hasil'; }, 2000);
    } else {
      alert('Terjadi kesalahan pada server saat menghitung skor.');
      resetAndRestart();
    }
  } catch (err) {
    console.error(err);
    alert('Koneksi Gagal: ' + err.message);
  }
}

// ============================================================
// RESET
// ============================================================
function resetAndRestart() {
  Session.clear();
  selectedOrgans = [];
  currentOrganIdx = 0;
  currentQIdx = 0;
  answers = {};

  document.getElementById('step-done').classList.add('hidden');
  document.getElementById('step-quiz').classList.add('hidden');
  document.getElementById('step-select').classList.remove('hidden');

  // Deselect all cards
  document.querySelectorAll('.organ-select-card').forEach(c => c.classList.remove('selected'));
  document.getElementById('input-weight').value = '';
  document.getElementById('input-height').value = '';
  checkStartStatus();
}
