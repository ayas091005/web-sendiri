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

  const btn = document.getElementById('btn-start-quiz');
  const hint = document.getElementById('select-hint');
  btn.disabled = selectedOrgans.length === 0;

  if (selectedOrgans.length > 0) {
    hint.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--accent)"></i> ${selectedOrgans.length} organ dipilih`;
  } else {
    hint.innerHTML = `<i class="fa-solid fa-circle-info"></i> Pilih minimal satu organ untuk melanjutkan`;
  }
}

function startQuiz() {
  if (selectedOrgans.length === 0) return;

  // Clear previous results before starting fresh quiz
  Session.clear();

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

  container.innerHTML = `
    <div class="question-card anim-slide" data-organ="${organId}">
      <div class="question-num">Pertanyaan ${currentQIdx + 1} / ${totalQ}</div>
      <div class="question-text">${q}</div>
      <div class="answer-options" id="answer-options">
        ${ANSWER_OPTIONS.map(opt => `
          <button
            class="answer-btn ${savedAnswer === opt.value ? 'selected' : ''}"
            data-value="${opt.value}"
            onclick="selectAnswer(${opt.value}, this)"
            style="${savedAnswer === opt.value ? `border-color: ${organ.color}; background: ${organ.glow};` : ''}"
          >
            <div class="ans-icon" data-value="${opt.value}">${opt.icon}</div>
            <span>${opt.label}</span>
          </button>
        `).join('')}
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
function finishQuiz() {
  // Calculate scores
  const scores = {};
  selectedOrgans.forEach(id => {
    const ans = answers[id];
    scores[id] = calculateScore(ans);
  });

  // Save to session
  Session.setOrgans(selectedOrgans);
  Session.setAnswers(answers);
  Session.setScores(scores);

  // Show done step (hide quiz first, scroll to top)
  document.getElementById('step-quiz').classList.add('hidden');
  const doneStep = document.getElementById('step-done');
  doneStep.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Auto-redirect to hasil.html after 2.5 seconds
  setTimeout(() => { window.location.href = 'hasil.html'; }, 2500);
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
  document.getElementById('btn-start-quiz').disabled = true;
  document.getElementById('select-hint').innerHTML =
    `<i class="fa-solid fa-circle-info"></i> Pilih minimal satu organ untuk melanjutkan`;
}
