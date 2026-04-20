document.addEventListener("DOMContentLoaded", () => {
    // Shared state
    let selectedOrgans = [];
    let currentOrganIdx = 0;
    let currentQIdx = 0;
    let answers = {};
    let savedWeight = 0;
    let savedHeight = 0;

    // Elements
    const formBiodata = document.getElementById("biodata-form");
    const phase0 = document.getElementById("phase0-biodata");
    const phase0Organ = document.getElementById("phase0-organ");
    const phase1 = document.getElementById("phase1-kuesioner");
    const phase2 = document.getElementById("phase2-loading");

    const organCards = document.querySelectorAll(".organ-select-card");
    const btnLanjut = document.getElementById("btn-lanjut");
    const btnKembaliOrgan = document.getElementById("btn-kembali-organ");
    const cbPilihSemua = document.getElementById("cb-pilih-semua");

    const progressBarFill = document.getElementById("progress-bar-fill");
    const progressText = document.getElementById("progress-text");
    const questionPill = document.getElementById("question-pill");
    const questionTextEl = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options-container");

    const btnPrev = document.getElementById("btn-prev");
    const btnNext = document.getElementById("btn-next");

    // Phase 0: Biodata Submit
    if (formBiodata) {
        formBiodata.addEventListener("submit", (e) => {
            e.preventDefault();
            savedHeight = parseFloat(document.getElementById("tinggi_badan").value);
            savedWeight = parseFloat(document.getElementById("berat_badan").value);

            phase0.classList.remove("active");
            phase0.classList.add("hidden");

            phase0Organ.classList.remove("hidden");
            phase0Organ.classList.add("active");
        });
    }

    // Phase 0: Organ Selection
    if (organCards && organCards.length > 0) {
        organCards.forEach(card => {
            card.addEventListener("click", () => {
                const organ = card.dataset.organ;

                if (selectedOrgans.includes(organ)) {
                    selectedOrgans = selectedOrgans.filter(o => o !== organ);
                    card.classList.remove("selected");
                } else {
                    selectedOrgans.push(organ);
                    card.classList.add("selected");
                }

                // Sort by standard order defined in app.js
                if (typeof ORGAN_ORDER !== 'undefined') {
                    selectedOrgans.sort((a, b) => ORGAN_ORDER.indexOf(a) - ORGAN_ORDER.indexOf(b));
                }

                updateOrganSelectionUI();
            });
        });
    }

    function updateOrganSelectionUI() {
        btnLanjut.disabled = selectedOrgans.length === 0;

        if (cbPilihSemua) {
            cbPilihSemua.checked = selectedOrgans.length === organCards.length;
        }

        const hint = document.getElementById("select-hint");
        if (selectedOrgans.length === 0) {
            hint.innerHTML = `<i class="fa-solid fa-circle-info"></i> Pilih minimal satu organ untuk melanjutkan`;
        } else {
            hint.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #06b6d4"></i> Siap memulai kuesioner (${selectedOrgans.length} organ)`;
        }
    }

    if (cbPilihSemua) {
        cbPilihSemua.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            selectedOrgans = [];

            organCards.forEach(card => {
                const organ = card.dataset.organ;
                if (isChecked) {
                    card.classList.add('selected');
                    selectedOrgans.push(organ);
                } else {
                    card.classList.remove('selected');
                }
            });

            if (typeof ORGAN_ORDER !== 'undefined') {
                selectedOrgans.sort((a, b) => ORGAN_ORDER.indexOf(a) - ORGAN_ORDER.indexOf(b));
            }
            updateOrganSelectionUI();
        });
    }

    if (btnKembaliOrgan) {
        btnKembaliOrgan.addEventListener("click", () => {
            phase0Organ.classList.remove("active");
            phase0Organ.classList.add("hidden");

            phase0.classList.remove("hidden");
            phase0.classList.add("active");
        });
    }

    if (btnLanjut) {
        btnLanjut.addEventListener("click", () => {
            if (selectedOrgans.length === 0) return;

            // Setup quiz session
            if (typeof Session !== 'undefined') {
                Session.clear();
                const bmiVal = calculateBMI(savedWeight, savedHeight);
                const bmiCat = getBMICategory(bmiVal);
                Session.setBMI({ bmi: bmiVal, category: bmiCat.label });
            }

            selectedOrgans.forEach(id => {
                answers[id] = new Array(QUESTIONS[id].length).fill(null);
            });

            currentOrganIdx = 0;
            currentQIdx = 0;

            phase0Organ.classList.remove("active");
            phase0Organ.classList.add("hidden");

            phase1.classList.remove("hidden");
            phase1.classList.add("active");

            renderCurrentQuestion();
        });
    }

    function renderCurrentQuestion() {
        if (!phase1) return;

        const organId = selectedOrgans[currentOrganIdx];
        const organ = ORGANS[organId];
        const organQuestions = QUESTIONS[organId];
        const q = organQuestions[currentQIdx];
        const totalQ = organQuestions.length;

        // Progress
        const globalProgress = (currentQIdx + 1) / totalQ;
        progressBarFill.style.width = `${Math.round(globalProgress * 100)}%`;
        progressText.innerText = `${currentQIdx + 1}/${totalQ}`;

        // Question Pill
        questionPill.innerHTML = `${organ.emoji} ${organ.name} &mdash; Pertanyaan ${currentQIdx + 1}`;
        questionPill.style.background = organ.glow;
        questionPill.style.color = organ.color;
        questionPill.style.borderColor = organ.color;

        // Question text
        questionTextEl.innerText = typeof q === 'object' ? q.text : q;

        // Render Options
        optionsContainer.innerHTML = '';
        const savedAnswer = answers[organId][currentQIdx];
        const qOptions = (typeof q === 'object' && q.options) ? q.options : ANSWER_OPTIONS;

        const letterMap = ['A', 'B', 'C', 'D'];

        qOptions.forEach((opt, idx) => {
            const val = opt.score !== undefined ? opt.score : opt.value;
            const isSelected = savedAnswer === val;
            const letter = letterMap[idx] || String.fromCharCode(65 + idx);

            const card = document.createElement("div");
            card.className = `option-card ${isSelected ? 'selected' : ''}`;
            if (isSelected) {
                card.style.borderColor = organ.color;
                card.style.background = organ.glow;
            }

            // UI setup for custom option appearance
            let customStyle = '';
            if (isSelected) {
                customStyle = `background: ${organ.color}; border-color: ${organ.color}`;
            }

            card.innerHTML = `
                <div class="option-radio-custom" style="${customStyle}"></div>
                <div class="option-letter">${letter}</div>
                <div class="option-text">${opt.label}</div>
            `;

            card.addEventListener("click", () => selectOption(organId, val, card, organ));
            optionsContainer.appendChild(card);
        });

        // Navigation
        btnPrev.disabled = (currentOrganIdx === 0 && currentQIdx === 0);

        const isLastQ = currentQIdx === totalQ - 1;
        const isLastOrgan = currentOrganIdx === selectedOrgans.length - 1;

        if (isLastQ && isLastOrgan) {
            btnNext.innerHTML = "Selesaikan Kirim \u2192";
        } else if (isLastQ) {
            btnNext.innerHTML = `Lanjut ke Organ Berikutnya \u2192`;
        } else {
            btnNext.innerHTML = "Berikutnya \u2192";
        }
    }

    function selectOption(organId, value, cardElement, organ) {
        answers[organId][currentQIdx] = value;

        const allCards = optionsContainer.querySelectorAll(".option-card");
        allCards.forEach(c => {
            c.classList.remove("selected");
            c.style.borderColor = '';
            c.style.background = '';
            c.querySelector('.option-radio-custom').style.background = '';
            c.querySelector('.option-radio-custom').style.borderColor = '';
        });

        cardElement.classList.add("selected");
        cardElement.style.borderColor = organ.color;
        cardElement.style.background = organ.glow;
        cardElement.querySelector('.option-radio-custom').style.background = organ.color;
        cardElement.querySelector('.option-radio-custom').style.borderColor = organ.color;

        // Auto Delay Next Question (Delay 400ms)
        setTimeout(() => {
            goNext();
        }, 400);
    }

    function goNext() {
        const organId = selectedOrgans[currentOrganIdx];
        const organQuestions = QUESTIONS[organId];

        // Guard if they didn't answer and clicked "Next"
        if (answers[organId][currentQIdx] === null) {
            const existing = optionsContainer.querySelector('.answer-required-msg');
            if (!existing) {
                const msg = document.createElement('div');
                msg.className = 'answer-required-msg';
                msg.style.color = '#F87171';
                msg.style.fontSize = '0.9rem';
                msg.style.marginTop = '1rem';
                msg.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Silakan pilih salah satu jawaban.';
                optionsContainer.appendChild(msg);
                setTimeout(() => msg.remove(), 2500);
            }
            return;
        }

        const isLastQ = currentQIdx === organQuestions.length - 1;
        const isLastOrgan = currentOrganIdx === selectedOrgans.length - 1;

        if (isLastQ && isLastOrgan) {
            finishSesi();
        } else if (isLastQ) {
            currentOrganIdx++;
            currentQIdx = 0;
            renderCurrentQuestion();
        } else {
            currentQIdx++;
            renderCurrentQuestion();
        }
    }

    function goPrev() {
        if (currentQIdx > 0) {
            currentQIdx--;
            renderCurrentQuestion();
        } else if (currentOrganIdx > 0) {
            currentOrganIdx--;
            currentQIdx = QUESTIONS[selectedOrgans[currentOrganIdx]].length - 1;
            renderCurrentQuestion();
        }
    }

    if (btnNext) btnNext.addEventListener("click", (e) => {
        e.preventDefault();
        goNext();
    });

    if (btnPrev) btnPrev.addEventListener("click", (e) => {
        e.preventDefault();
        goPrev();
    });

    // Merekam ke Backend
    async function finishSesi() {
        if (typeof Session !== 'undefined') {
            Session.setOrgans(selectedOrgans);
            Session.setAnswers(answers);
        }

        phase1.classList.remove("active");
        phase1.classList.add("hidden");

        phase2.classList.remove("hidden");
        phase2.classList.add("active");
        window.scrollTo({ top: 0, behavior: 'smooth' });

        try {
            const tokenEl = document.querySelector('meta[name="csrf-token"]');
            const token = tokenEl ? tokenEl.getAttribute('content') : '';

            const response = await fetch('/kuesioner/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token,
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    weight: savedWeight,
                    height: savedHeight,
                    answers: answers
                })
            });

            const result = await response.json();

            if (result.status === 'success') {
                if (typeof Session !== 'undefined') {
                    Session.setScores(result.data.scores);
                    Session.setBMI(result.data.bmi_data);
                }

                // Redirect to results immediately after processing
                setTimeout(() => {
                    window.location.href = "/hasil";
                }, 1000);
            } else {
                alert('Terjadi kesalahan pada server saat menghitung skor.');
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
            alert('Koneksi Gagal: ' + err.message);
            window.location.reload();
        }
    }
});
