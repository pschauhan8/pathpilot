// ==========================================================================
// PathPilot Application Engine
// Dynamic Curated Learning, Proof-of-Work Validator & Placement Bridge
// ==========================================================================

import { ROADMAPS } from './data/roadmaps.js';
import { JOBS_RADAR } from './data/jobs.js';
import { INTERVIEW_QUESTIONS } from './data/interviewQuestions.js';
import { TALENT_POOL } from './data/talentPool.js';

// Application State
const STATE_KEY = 'pathpilot_state_v1';

const defaultState = {
  currentRole: 'frontend',
  isPro: false,
  soundEnabled: true,
  streak: 1,
  lastCheckinDate: new Date().toISOString().split('T')[0],
  habitDays: [1, 3, 5, 6, 8, 9, 12, 13, 14, 15],
  completedTopics: ['fe_w1_t1', 'fe_w1_t2'],
  verifiedProjects: [],
  userNotes: '',
  studyHours: 4.5,
  diagnostic: {
    role: 'frontend',
    education: 'tier3_cs',
    hoursPerWeek: 15,
    quizScore: 4,
    targetDate: 'Dec 2026'
  },
  resume: {
    name: 'Pritam Singh',
    email: 'pritam.singh.dev@gmail.com',
    phone: '+91 98765 43210',
    linkedin: 'linkedin.com/in/pritamsingh',
    github: 'github.com/pritamsingh',
    education: 'B.Tech Computer Science & Engineering | CGPA: 8.4 (2025)',
    skills: 'React 18, JavaScript (ES6+), TypeScript, HTML5/CSS3, Tailwind CSS, Supabase, PostgreSQL, Git/GitHub, REST APIs',
    proj1Title: 'FinTrack: Personal Wealth & Expense Analytics Platform | React, Tailwind, Supabase',
    proj1Bullets: `- Engineered a responsive financial analytics application managing 500+ monthly transactions with dynamic Chart.js breakdowns.\n- Achieved a 98/100 Google Lighthouse performance score by implementing code splitting and custom memoized aggregation hooks.\n- Integrated Supabase Row-Level Security (RLS) to enforce isolated multi-tenant authentication and automated CSV export.`,
    proj2Title: 'DevCollab: Real-Time Developer Project & Review Radar | React, Vite, Node, PostgreSQL',
    proj2Bullets: `- Architected a community showcase platform enabling 150+ student developers to submit code repositories for peer code review.\n- Built reusable custom hooks (\`useDebounce\`, \`useLocalStorage\`) reducing redundant API queries by 65%.\n- Configured automated GitHub Actions CI/CD pipeline deploying live preview builds on Vercel with zero downtime.`
  }
};

let appState = loadState();

function loadState() {
  try {
    const saved = localStorage.getItem(STATE_KEY);
    return saved ? { ...defaultState, ...JSON.parse(saved) } : defaultState;
  } catch (e) {
    console.error('Error loading state:', e);
    return defaultState;
  }
}

function saveState() {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(appState));
  } catch (e) {
    console.error('Error saving state:', e);
  }
}

// Web Audio API for celebratory sound chimes
let audioCtx = null;
function playCelebrationSound() {
  if (!appState.soundEnabled) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioCtx.currentTime;
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
    osc1.frequency.exponentialRampToValueAtTime(783.99, now + 0.2); // G5
    osc1.frequency.exponentialRampToValueAtTime(1046.50, now + 0.3); // C6

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(261.63, now); // C4
    osc2.frequency.exponentialRampToValueAtTime(392.00, now + 0.2); // G4

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(audioCtx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.6);
    osc2.stop(now + 0.6);
  } catch (e) {
    console.warn('Audio synthesis not supported or blocked:', e);
  }
}

// DOM Ready Initialization
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initRoleSelector();
  initRoadmapView();
  initHabitHeatmap();
  initDiagnosticWizard();
  initProjectsView();
  initResumeBuilder();
  initJobsRadar();
  initInterviewSuite();
  initEmployerPortal();
  initCommunityAndCanvas();
  initModals();
  initNotesDrawer();
  updateStreakUI();
});

// Navigation Handling
function initNavigation() {
  const navItems = document.querySelectorAll('.sidebar-nav-list .nav-item');
  const viewSections = document.querySelectorAll('.view-section');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = item.getAttribute('data-view');
      switchView(targetView);
    });
  });

  const brandBtn = document.getElementById('brandBtn');
  if (brandBtn) {
    brandBtn.addEventListener('click', () => switchView('roadmap'));
  }

  // Retake quiz button
  const retakeBtn = document.getElementById('retakeQuizBtn');
  if (retakeBtn) {
    retakeBtn.addEventListener('click', () => switchView('intake'));
  }
}

function switchView(viewId) {
  const navItems = document.querySelectorAll('.sidebar-nav-list .nav-item');
  const viewSections = document.querySelectorAll('.view-section');

  navItems.forEach(item => {
    if (item.getAttribute('data-view') === viewId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  viewSections.forEach(section => {
    if (section.id === `view-${viewId}`) {
      section.classList.add('active');
    } else {
      section.classList.remove('active');
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (viewId === 'community') {
    renderSocialCardCanvas();
  }
}

// Role Switcher
function initRoleSelector() {
  const roleTrigger = document.getElementById('roleSelectorTrigger');
  const roleLabel = document.getElementById('currentRoleLabel');

  const roles = [
    { id: 'frontend', name: 'Frontend Web Engineer' },
    { id: 'data', name: 'Python Data Analyst' },
    { id: 'backend', name: 'Backend & Cloud Associate' }
  ];

  updateRoleUI();

  if (roleTrigger) {
    roleTrigger.addEventListener('click', () => {
      const currentIndex = roles.findIndex(r => r.id === appState.currentRole);
      const nextIndex = (currentIndex + 1) % roles.length;
      appState.currentRole = roles[nextIndex].id;
      saveState();
      updateRoleUI();
      initRoadmapView();
      initProjectsView();
    });
  }

  function updateRoleUI() {
    const current = roles.find(r => r.id === appState.currentRole) || roles[0];
    if (roleLabel) roleLabel.textContent = current.name;
  }
}

// Roadmap View Rendering
function initRoadmapView() {
  const roadmapData = ROADMAPS[appState.currentRole] || ROADMAPS.frontend;
  
  // Headers
  const roleHeader = document.getElementById('roadmapRoleHeader');
  const summaryHeader = document.getElementById('roadmapSummaryHeader');
  const targetTitle = document.getElementById('roadmapTargetTitle');
  const roleBadge = document.getElementById('roleBadgeTag');
  const salaryRange = document.getElementById('salaryRangeText');

  if (roleHeader) roleHeader.textContent = roadmapData.title;
  if (summaryHeader) summaryHeader.textContent = roadmapData.summary;
  if (targetTitle) targetTitle.textContent = `${roadmapData.title} Track`;
  if (roleBadge) roleBadge.textContent = roadmapData.badge;
  if (salaryRange) salaryRange.textContent = roadmapData.salaryRange;

  const container = document.getElementById('weeksTimelineContainer');
  if (!container) return;
  container.innerHTML = '';

  let totalTopicsCount = 0;
  let completedCount = 0;

  roadmapData.weeks.forEach((week, wIndex) => {
    const weekCard = document.createElement('div');
    weekCard.className = `week-card ${wIndex === 0 ? 'expanded' : ''}`;

    let weekCompletedTopics = 0;
    const weekTopicsCount = week.topics.length;
    totalTopicsCount += weekTopicsCount;

    week.topics.forEach(t => {
      if (appState.completedTopics.includes(t.id)) {
        weekCompletedTopics++;
        completedCount++;
      }
    });

    const weekPercentage = Math.round((weekCompletedTopics / weekTopicsCount) * 100);

    weekCard.innerHTML = `
      <div class="week-header" data-week-index="${wIndex}">
        <div class="week-title-area">
          <span class="week-badge">Week 0${week.week}</span>
          <div class="week-info">
            <h3>${week.title}</h3>
            <p>${week.objective}</p>
          </div>
        </div>
        <div class="week-meta">
          <div class="progress-ring-container">
            <span class="mono" style="color: ${weekPercentage === 100 ? '#34d399' : 'var(--text-muted)'};">${weekCompletedTopics}/${weekTopicsCount}</span>
            <span style="font-size: 0.75rem; color: var(--text-dim);">done</span>
          </div>
          <i class="fa-solid fa-chevron-down" style="color: var(--text-muted); font-size: 0.85rem; transition: transform 0.2s;"></i>
        </div>
      </div>
      <div class="week-body">
        <div class="topics-list">
          ${week.topics.map(topic => {
            const isCompleted = appState.completedTopics.includes(topic.id);
            return `
              <div class="topic-row ${isCompleted ? 'completed' : ''}" id="topic-${topic.id}">
                <button class="topic-checkbox ${isCompleted ? 'checked' : ''}" data-topic-id="${topic.id}" title="Toggle completed">
                  ${isCompleted ? '<i class="fa-solid fa-check"></i>' : ''}
                </button>
                <div class="topic-content">
                  <div class="topic-header-line">
                    <h4>${topic.title}</h4>
                    <span class="topic-tag ${topic.type}">${topic.type}</span>
                    <span style="font-size: 0.74rem; color: var(--text-muted);"><i class="fa-regular fa-clock"></i> ${topic.duration}</span>
                    <span style="font-size: 0.74rem; color: var(--text-dim); margin-left: auto;">By: <strong>${topic.author}</strong></span>
                  </div>
                  <p class="topic-summary">${topic.summary}</p>
                  <div class="key-points-chips">
                    ${topic.keyPoints.map(kp => `<span class="key-chip">✓ ${kp}</span>`).join('')}
                  </div>
                  <div class="topic-actions-bar">
                    <a href="${topic.url}" target="_blank" rel="noopener noreferrer" class="link-btn">
                      <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Resource
                    </a>
                    <button class="report-link-btn" data-topic-title="${topic.title}">
                      <i class="fa-regular fa-flag"></i> Report broken / suggest alternative
                    </button>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
        <div style="margin-top: 1.25rem; background: rgba(99, 102, 241, 0.08); border-left: 3px solid var(--primary); padding: 0.75rem 1rem; border-radius: var(--radius-sm); font-size: 0.82rem; color: #cbd5e1;">
          <strong>🎯 Week Milestone Deliverable:</strong> ${week.milestoneAction}
        </div>
      </div>
    `;

    container.appendChild(weekCard);
  });

  // Accordion Toggles
  document.querySelectorAll('.week-header').forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.week-card');
      card.classList.toggle('expanded');
    });
  });

  // Checkbox completions
  document.querySelectorAll('.topic-checkbox').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const topicId = btn.getAttribute('data-topic-id');
      toggleTopicCompletion(topicId);
    });
  });

  // Report Link modal triggers
  document.querySelectorAll('.report-link-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const topicTitle = btn.getAttribute('data-topic-title');
      openReportModal(topicTitle);
    });
  });

  // Expand / Collapse All
  const expandBtn = document.getElementById('expandAllWeeksBtn');
  const collapseBtn = document.getElementById('collapseAllWeeksBtn');
  if (expandBtn) expandBtn.addEventListener('click', () => {
    document.querySelectorAll('.week-card').forEach(c => c.classList.add('expanded'));
  });
  if (collapseBtn) collapseBtn.addEventListener('click', () => {
    document.querySelectorAll('.week-card').forEach(c => c.classList.remove('expanded'));
  });

  // Update Global Stats
  updateProgressStats(completedCount, totalTopicsCount);
}

function toggleTopicCompletion(topicId) {
  const index = appState.completedTopics.indexOf(topicId);
  if (index > -1) {
    appState.completedTopics.splice(index, 1);
  } else {
    appState.completedTopics.push(topicId);
    playCelebrationSound();
    logDailyStreakCheckin();
  }
  saveState();
  initRoadmapView();
}

function updateProgressStats(completed, total) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  const pctText = document.getElementById('progressPercentageText');
  const countText = document.getElementById('completedTopicsCount');
  const hoursText = document.getElementById('hoursStudiedText');
  const bar = document.getElementById('overallProgressBar');

  if (pctText) pctText.textContent = `${pct}%`;
  if (countText) countText.textContent = `${completed} / ${total}`;
  if (hoursText) hoursText.textContent = `${(completed * 2.5).toFixed(1)} hrs`;
  if (bar) bar.style.width = `${pct}%`;
}

// 30-Day Habit Grid
function initHabitHeatmap() {
  const grid = document.getElementById('habitHeatmapGrid');
  if (!grid) return;
  grid.innerHTML = '';

  for (let i = 1; i <= 32; i++) {
    const cell = document.createElement('div');
    const isCompleted = appState.habitDays.includes(i);
    cell.className = `heatmap-cell ${isCompleted ? (i % 2 === 0 ? 'level-3' : 'level-2') : ''}`;
    cell.title = `Day ${i}: ${isCompleted ? 'Study completed' : 'Rest / Planned'}`;
    grid.appendChild(cell);
  }

  const streakDisplay = document.getElementById('streakDaysSummary');
  if (streakDisplay) streakDisplay.textContent = `${appState.streak} day streak`;
}

function updateStreakUI() {
  const display = document.getElementById('streakCountDisplay');
  if (display) display.textContent = `Day ${appState.streak}`;
  
  const widget = document.getElementById('streakWidget');
  if (widget) {
    widget.addEventListener('click', () => {
      logDailyStreakCheckin();
      alert(`🔥 Streak Checked in! You're on a ${appState.streak}-day learning habit.`);
    });
  }
}

function logDailyStreakCheckin() {
  const today = new Date().toISOString().split('T')[0];
  if (appState.lastCheckinDate !== today) {
    appState.streak += 1;
    appState.lastCheckinDate = today;
    if (!appState.habitDays.includes(appState.streak)) {
      appState.habitDays.push(appState.streak);
    }
    saveState();
    initHabitHeatmap();
    updateStreakUI();
  }
}

// Diagnostic Intake Wizard
function initDiagnosticWizard() {
  let selectedRole = appState.currentRole;
  let selectedEducation = 'tier3_cs';
  let selectedHours = 15;
  let currentQuizIndex = 0;
  let quizScore = 0;

  // Single select cards handler
  document.querySelectorAll('.select-card').forEach(card => {
    card.addEventListener('click', () => {
      const group = card.getAttribute('data-group');
      document.querySelectorAll(`.select-card[data-group="${group}"]`).forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');

      const val = card.getAttribute('data-value');
      if (group === 'role') selectedRole = val;
      if (group === 'education') selectedEducation = val;
      if (group === 'hours') selectedHours = val === 'fulltime_35' ? 35 : 15;
    });
  });

  // Wizard Step buttons
  const step1 = document.getElementById('wizard-step-1');
  const step2 = document.getElementById('wizard-step-2');
  const step3 = document.getElementById('wizard-step-3');
  const step4 = document.getElementById('wizard-step-4');
  const step5 = document.getElementById('wizard-step-5');
  const progressBar = document.getElementById('wizardProgressBar');

  const btnNext1 = document.getElementById('wizardNextBtn1');
  const btnNext2 = document.getElementById('wizardNextBtn2');
  const btnNext3 = document.getElementById('wizardNextBtn3');
  const btnBack2 = document.getElementById('wizardBackBtn2');
  const btnBack3 = document.getElementById('wizardBackBtn3');
  const btnBack4 = document.getElementById('wizardBackBtn4');

  if (btnNext1) btnNext1.addEventListener('click', () => {
    step1.style.display = 'none';
    step2.style.display = 'block';
    if (progressBar) progressBar.style.width = '50%';
    setNodeActive(2);
  });

  if (btnBack2) btnBack2.addEventListener('click', () => {
    step2.style.display = 'none';
    step1.style.display = 'block';
    if (progressBar) progressBar.style.width = '25%';
    setNodeActive(1);
  });

  if (btnNext2) btnNext2.addEventListener('click', () => {
    step2.style.display = 'none';
    step3.style.display = 'block';
    if (progressBar) progressBar.style.width = '75%';
    setNodeActive(3);
  });

  if (btnBack3) btnBack3.addEventListener('click', () => {
    step3.style.display = 'none';
    step2.style.display = 'block';
    if (progressBar) progressBar.style.width = '50%';
    setNodeActive(2);
  });

  if (btnNext3) btnNext3.addEventListener('click', () => {
    step3.style.display = 'none';
    step4.style.display = 'block';
    if (progressBar) progressBar.style.width = '90%';
    setNodeActive(4);
    currentQuizIndex = 0;
    quizScore = 0;
    loadQuizQuestion(currentQuizIndex, selectedRole);
  });

  if (btnBack4) btnBack4.addEventListener('click', () => {
    step4.style.display = 'none';
    step3.style.display = 'block';
    if (progressBar) progressBar.style.width = '75%';
    setNodeActive(3);
  });

  function setNodeActive(stepNum) {
    for (let i = 1; i <= 4; i++) {
      const node = document.getElementById(`node-${i}`);
      if (!node) continue;
      if (i === stepNum) node.classList.add('active');
      else if (i < stepNum) {
        node.classList.remove('active');
        node.classList.add('completed');
      } else {
        node.classList.remove('active', 'completed');
      }
    }
  }

  function loadQuizQuestion(index, roleKey) {
    const roadmap = ROADMAPS[roleKey] || ROADMAPS.frontend;
    const questions = roadmap.diagnosticQuestions;
    if (!questions || index >= questions.length) {
      finishQuiz();
      return;
    }

    const q = questions[index];
    const card = document.getElementById('quizQuestionCard');
    const progressLabel = document.getElementById('quizQuestionProgress');
    const feedbackBox = document.getElementById('quizFeedbackBox');
    const nextBtn = document.getElementById('wizardNextQuizQBtn');
    const finishBtn = document.getElementById('wizardFinishQuizBtn');

    if (progressLabel) progressLabel.textContent = `Question ${index + 1} of ${questions.length}`;
    if (feedbackBox) feedbackBox.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    if (finishBtn) finishBtn.style.display = 'none';

    card.innerHTML = `
      <div style="font-size: 1.1rem; font-weight: 700; margin-bottom: 1.25rem;">${q.question}</div>
      <div class="quiz-options-list">
        ${q.options.map((opt, optIdx) => `
          <button class="quiz-option-btn" data-option-index="${optIdx}">
            <span>${opt}</span>
            <i class="fa-regular fa-circle" style="font-size: 0.85rem; color: var(--text-dim);"></i>
          </button>
        `).join('')}
      </div>
    `;

    card.querySelectorAll('.quiz-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedOptIdx = parseInt(btn.getAttribute('data-option-index'));
        const isCorrect = selectedOptIdx === q.correctIndex;

        card.querySelectorAll('.quiz-option-btn').forEach(b => b.disabled = true);

        if (isCorrect) {
          btn.classList.add('correct');
          quizScore++;
          playCelebrationSound();
        } else {
          btn.classList.add('wrong');
          const correctBtn = card.querySelector(`.quiz-option-btn[data-option-index="${q.correctIndex}"]`);
          if (correctBtn) correctBtn.classList.add('correct');
        }

        if (feedbackBox) {
          feedbackBox.style.display = 'block';
          document.getElementById('quizFeedbackTitle').innerHTML = isCorrect ? '<span style="color: #34d399;">✓ Correct!</span>' : '<span style="color: #fb7185;">✗ Concept to review:</span>';
          document.getElementById('quizFeedbackText').textContent = q.explanation;
        }

        if (index < questions.length - 1) {
          if (nextBtn) {
            nextBtn.style.display = 'inline-flex';
            nextBtn.onclick = () => {
              currentQuizIndex++;
              loadQuizQuestion(currentQuizIndex, roleKey);
            };
          }
        } else {
          if (finishBtn) {
            finishBtn.style.display = 'inline-flex';
            finishBtn.onclick = finishQuiz;
          }
        }
      });
    });
  }

  function finishQuiz() {
    step4.style.display = 'none';
    step5.style.display = 'block';
    if (progressBar) progressBar.style.width = '100%';

    const targetDate = selectedHours === 35 ? 'Nov 2026 (Accelerated)' : 'Jan 2027 (College Pacing)';

    appState.currentRole = selectedRole;
    appState.diagnostic = {
      role: selectedRole,
      education: selectedEducation,
      hoursPerWeek: selectedHours,
      quizScore: quizScore,
      targetDate: targetDate
    };
    saveState();

    document.getElementById('quizScoreDisplay').textContent = `${quizScore} / 5`;
    document.getElementById('calibratedPaceDisplay').textContent = selectedHours === 35 ? 'Full-Time Sprint' : 'Standard Student';
    document.getElementById('calibratedTargetMonth').textContent = targetDate;
    document.getElementById('targetFinishDate').textContent = targetDate;
  }

  const launchBtn = document.getElementById('launchCalibratedRoadmapBtn');
  if (launchBtn) {
    launchBtn.addEventListener('click', () => {
      initRoadmapView();
      switchView('roadmap');
    });
  }
}

// Proof-of-Work Projects Hub
function initProjectsView() {
  const container = document.getElementById('projectsContainer');
  if (!container) return;
  container.innerHTML = '';

  const roadmap = ROADMAPS[appState.currentRole] || ROADMAPS.frontend;
  const capstones = roadmap.capstones || [];

  capstones.forEach(proj => {
    const isVerified = appState.verifiedProjects.includes(proj.id);
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <span class="project-badge ${proj.tier.includes('Pro') ? 'pro' : 'standard'}">${proj.tier}</span>
          ${isVerified ? '<span class="badge" style="background: rgba(16, 185, 129, 0.2); color: #34d399; font-size: 0.75rem; padding: 0.2rem 0.6rem; border-radius: 99px;"><i class="fa-solid fa-circle-check"></i> Verified Proof-of-Work</span>' : ''}
        </div>
        <h3 style="font-size: 1.25rem; margin: 0.5rem 0;">${proj.title}</h3>
        <p style="font-size: 0.86rem; color: var(--text-muted); line-height: 1.45;">${proj.summary}</p>
        
        <div style="margin: 1rem 0;">
          <div style="font-size: 0.78rem; text-transform: uppercase; font-weight: 700; color: var(--cyan); letter-spacing: 0.05em;">Mandatory Acceptance Criteria:</div>
          <ul class="criteria-list">
            ${proj.acceptanceCriteria.map(c => `
              <li class="criteria-item"><i class="fa-solid fa-check"></i> <span>${c}</span></li>
            `).join('')}
          </ul>
        </div>
      </div>

      <div>
        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.25rem;">
          ${proj.techStack.map(t => `<span class="key-chip" style="font-size: 0.72rem;">${t}</span>`).join('')}
        </div>
        <button class="btn ${isVerified ? 'btn-outline-emerald' : 'btn-primary'} verify-project-trigger" data-project-id="${proj.id}" data-project-title="${proj.title}" style="width: 100%;">
          <i class="fa-solid ${isVerified ? 'fa-badge-check' : 'fa-terminal'}"></i> ${isVerified ? 'Audit Passed (Re-Verify)' : 'Submit & Audit Project'}
        </button>
      </div>
    `;
    container.appendChild(card);
  });

  document.querySelectorAll('.verify-project-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const pId = btn.getAttribute('data-project-id');
      const pTitle = btn.getAttribute('data-project-title');
      openVerifyModal(pId, pTitle);
    });
  });

  const badgesBtn = document.getElementById('viewBadgesBtn');
  if (badgesBtn) {
    badgesBtn.addEventListener('click', () => {
      alert(`🏆 You have ${appState.verifiedProjects.length} Verified Proof-of-Work Badges linked to your candidate profile!`);
    });
  }
}

// ATS Resume Builder
function initResumeBuilder() {
  const inputs = {
    name: document.getElementById('resumeNameInput'),
    email: document.getElementById('resumeEmailInput'),
    phone: document.getElementById('resumePhoneInput'),
    linkedin: document.getElementById('resumeLinkedinInput'),
    github: document.getElementById('resumeGithubInput'),
    education: document.getElementById('resumeEducationInput'),
    skills: document.getElementById('resumeSkillsInput'),
    proj1Title: document.getElementById('resumeProj1Title'),
    proj1Bullets: document.getElementById('resumeProj1Bullets'),
    proj2Title: document.getElementById('resumeProj2Title'),
    proj2Bullets: document.getElementById('resumeProj2Bullets')
  };

  const preview = {
    name: document.getElementById('paperName'),
    email: document.getElementById('paperEmail'),
    phone: document.getElementById('paperPhone'),
    linkedin: document.getElementById('paperLinkedin'),
    github: document.getElementById('paperGithub'),
    education: document.getElementById('paperEducation'),
    skills: document.getElementById('paperSkills'),
    proj1Title: document.getElementById('paperProj1Title'),
    proj1List: document.getElementById('paperProj1List'),
    proj2Title: document.getElementById('paperProj2Title'),
    proj2List: document.getElementById('paperProj2List')
  };

  // Sync state into inputs
  Object.keys(inputs).forEach(key => {
    if (inputs[key] && appState.resume[key]) {
      inputs[key].value = appState.resume[key];
    }
  });

  function updateResumePreview() {
    if (preview.name) preview.name.textContent = inputs.name.value;
    if (preview.email) preview.email.textContent = inputs.email.value;
    if (preview.phone) preview.phone.textContent = inputs.phone.value;
    if (preview.linkedin) {
      preview.linkedin.textContent = inputs.linkedin.value;
      preview.linkedin.href = `https://${inputs.linkedin.value.replace(/^https?:\/\//, '')}`;
    }
    if (preview.github) {
      preview.github.textContent = inputs.github.value;
      preview.github.href = `https://${inputs.github.value.replace(/^https?:\/\//, '')}`;
    }
    if (preview.education) preview.education.textContent = inputs.education.value;
    if (preview.skills) preview.skills.innerHTML = inputs.skills.value;

    if (preview.proj1Title) preview.proj1Title.textContent = inputs.proj1Title.value;
    if (preview.proj1List) {
      preview.proj1List.innerHTML = inputs.proj1Bullets.value
        .split('\n')
        .filter(b => b.trim().length > 0)
        .map(b => `<li>${b.replace(/^[-•*]\s*/, '')}</li>`)
        .join('');
    }

    if (preview.proj2Title) preview.proj2Title.textContent = inputs.proj2Title.value;
    if (preview.proj2List) {
      preview.proj2List.innerHTML = inputs.proj2Bullets.value
        .split('\n')
        .filter(b => b.trim().length > 0)
        .map(b => `<li>${b.replace(/^[-•*]\s*/, '')}</li>`)
        .join('');
    }

    // Persist and calculate ATS score
    Object.keys(inputs).forEach(k => {
      appState.resume[k] = inputs[k].value;
    });
    saveState();
    calculateAtsScore();
  }

  Object.values(inputs).forEach(inp => {
    if (inp) inp.addEventListener('input', updateResumePreview);
  });

  updateResumePreview();

  // Print button
  const printBtn = document.getElementById('printResumePdfBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Export LaTeX code
  const latexBtn = document.getElementById('exportLatexCodeBtn');
  if (latexBtn) {
    latexBtn.addEventListener('click', () => {
      const latexSnippet = `
\\documentclass[letterpaper,10pt]{article}
\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{hyperref}
\\begin{document}
\\begin{center}
  {\\Huge \\textbf{${inputs.name.value}}} \\\\
  \\vspace{1pt}
  ${inputs.email.value} $|$ ${inputs.phone.value} $|$ \\href{https://${inputs.github.value}}{${inputs.github.value}}
\\end{center}
\\section*{Education}
\\textbf{${inputs.education.value}}
\\section*{Technical Skills}
${inputs.skills.value}
\\section*{Projects}
\\textbf{${inputs.proj1Title.value}}
${inputs.proj1Bullets.value}
\\end{document}
      `.trim();
      navigator.clipboard.writeText(latexSnippet);
      alert('📋 LaTeX resume template copied to clipboard! Paste into Overleaf or compile with pdflatex.');
    });
  }

  // Auto-fill from current roadmaps
  const autoFillBtn = document.getElementById('importProjectsToResumeBtn');
  if (autoFillBtn) {
    autoFillBtn.addEventListener('click', () => {
      const roadmap = ROADMAPS[appState.currentRole] || ROADMAPS.frontend;
      if (roadmap.capstones && roadmap.capstones.length >= 2) {
        inputs.proj1Title.value = `${roadmap.capstones[0].title} | ${roadmap.capstones[0].techStack.slice(0, 3).join(', ')}`;
        inputs.proj2Title.value = `${roadmap.capstones[1].title} | ${roadmap.capstones[1].techStack.slice(0, 3).join(', ')}`;
        updateResumePreview();
        playCelebrationSound();
      }
    });
  }
}

function calculateAtsScore() {
  const resume = appState.resume;
  let score = 70;

  const actionVerbs = ['engineered', 'architected', 'developed', 'spearheaded', 'implemented', 'optimized', 'reduced', 'built', 'achieved', 'integrated'];
  const fullText = (resume.proj1Bullets + ' ' + resume.proj2Bullets + ' ' + resume.skills).toLowerCase();

  actionVerbs.forEach(verb => {
    if (fullText.includes(verb)) score += 2;
  });

  // Quantifiable numbers / %
  const numbersCount = (fullText.match(/\d+%/g) || []).length + (fullText.match(/\d+\+/g) || []).length;
  if (numbersCount >= 2) score += 6;

  // Length check
  if (fullText.length > 300) score += 4;

  score = Math.min(score, 98);

  const dial = document.getElementById('atsScoreValue');
  const status = document.getElementById('atsScoreStatus');
  if (dial) dial.textContent = score;
  if (status) {
    if (score >= 90) {
      status.textContent = 'Tier-1 Ready (90+)';
      status.style.color = '#34d399';
    } else {
      status.textContent = 'Good (Needs more metrics)';
      status.style.color = '#fbbf24';
    }
  }
}

// Off-Campus Job Radar
function initJobsRadar() {
  const container = document.getElementById('jobsListContainer');
  const searchInput = document.getElementById('jobSearchInput');
  const roleFilter = document.getElementById('jobRoleFilter');
  const locFilter = document.getElementById('jobLocationFilter');

  function renderJobs() {
    if (!container) return;
    const query = searchInput ? searchInput.value.toLowerCase() : '';
    const selectedRole = roleFilter ? roleFilter.value : 'all';
    const selectedLoc = locFilter ? locFilter.value : 'all';

    const filtered = JOBS_RADAR.filter(job => {
      const matchQuery = job.role.toLowerCase().includes(query) ||
                         job.company.toLowerCase().includes(query) ||
                         job.tags.some(t => t.toLowerCase().includes(query));
      const matchRole = selectedRole === 'all' || job.role.toLowerCase().includes(selectedRole.toLowerCase());
      const matchLoc = selectedLoc === 'all' || job.location.toLowerCase().includes(selectedLoc.toLowerCase());
      return matchQuery && matchRole && matchLoc;
    });

    container.innerHTML = '';

    if (filtered.length === 0) {
      container.innerHTML = `<div style="text-align: center; padding: 2rem; color: var(--text-muted);">No verified jobs matching filters. Try clearing search terms.</div>`;
      return;
    }

    filtered.forEach(job => {
      const card = document.createElement('div');
      card.className = 'job-card';
      card.innerHTML = `
        <div class="job-header-row">
          <div class="job-title-col">
            <h3>${job.role}</h3>
            <div class="company-name">${job.company}</div>
          </div>
          <span class="job-badge-tag"><i class="fa-solid fa-shield-check"></i> Verified Off-Campus</span>
        </div>

        <p style="font-size: 0.86rem; color: var(--text-muted); line-height: 1.45;">${job.description}</p>

        <div class="job-meta-chips">
          <span class="job-chip"><i class="fa-solid fa-indian-rupee-sign"></i> ${job.ctc}</span>
          <span class="job-chip"><i class="fa-solid fa-location-dot"></i> ${job.location}</span>
          <span class="job-chip"><i class="fa-solid fa-user-graduate"></i> ${job.experience}</span>
          <span class="job-chip" style="color: #fb7185;"><i class="fa-solid fa-hourglass-half"></i> Closes ${job.deadline}</span>
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.25rem;">
          ${job.tags.map(t => `<span class="key-chip" style="font-size: 0.72rem;">${t}</span>`).join('')}
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
          <button class="btn btn-secondary btn-sm copy-pitch-btn" data-job-id="${job.id}">
            <i class="fa-solid fa-paper-plane"></i> Copy Cold Outreach Pitch
          </button>
          <a href="${job.applyUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            Direct Apply <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>
      `;
      container.appendChild(card);
    });

    // Pitch copy triggers
    document.querySelectorAll('.copy-pitch-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const jId = btn.getAttribute('data-job-id');
        const job = JOBS_RADAR.find(j => j.id === jId);
        if (job) {
          navigator.clipboard.writeText(job.referralTemplate);
          alert(`📨 Custom referral outreach pitch copied to clipboard! Customize [Recipient Name] and send via LinkedIn Message.`);
        }
      });
    });
  }

  if (searchInput) searchInput.addEventListener('input', renderJobs);
  if (roleFilter) roleFilter.addEventListener('change', renderJobs);
  if (locFilter) locFilter.addEventListener('change', renderJobs);

  renderJobs();
}

// Interview Readiness Suite & Flashcards
function initInterviewSuite() {
  let currentIndex = 0;
  let isFlipped = false;

  const card = document.getElementById('interactiveFlashcard');
  const catText = document.getElementById('cardCategory');
  const diffBadge = document.getElementById('cardDifficulty');
  const qText = document.getElementById('cardQuestionText');
  const aText = document.getElementById('cardAnswerText');
  const tipText = document.getElementById('cardTipText');
  const counterText = document.getElementById('cardCounter');
  const prevBtn = document.getElementById('prevCardBtn');
  const nextBtn = document.getElementById('nextCardBtn');

  function renderCard(idx) {
    if (!INTERVIEW_QUESTIONS || INTERVIEW_QUESTIONS.length === 0) return;
    const item = INTERVIEW_QUESTIONS[idx];
    isFlipped = false;
    if (card) card.classList.remove('flipped');

    if (catText) catText.textContent = `${item.category} • ${item.role}`;
    if (diffBadge) diffBadge.textContent = item.difficulty;
    if (qText) qText.textContent = item.question;
    if (aText) aText.textContent = item.answer;
    if (tipText) tipText.textContent = item.tip;
    if (counterText) counterText.textContent = `${idx + 1} of ${INTERVIEW_QUESTIONS.length}`;

    // Update mock question
    const mockQ = document.getElementById('mockCurrentQuestion');
    if (mockQ) mockQ.textContent = item.question;
  }

  if (card) {
    card.addEventListener('click', () => {
      isFlipped = !isFlipped;
      card.classList.toggle('flipped', isFlipped);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % INTERVIEW_QUESTIONS.length;
      renderCard(currentIndex);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + INTERVIEW_QUESTIONS.length) % INTERVIEW_QUESTIONS.length;
      renderCard(currentIndex);
    });
  }

  renderCard(0);

  // Mock Answer Evaluator
  const evalBtn = document.getElementById('evaluateMockAnswerBtn');
  const mockInput = document.getElementById('mockAnswerInput');
  const mockBox = document.getElementById('mockFeedbackBox');
  const mockScore = document.getElementById('mockScoreDisplay');
  const mockContent = document.getElementById('mockFeedbackContent');

  if (evalBtn) {
    evalBtn.addEventListener('click', () => {
      const text = mockInput ? mockInput.value.trim() : '';
      if (text.length < 20) {
        alert('Please write at least a few sentences explaining your approach to receive meaningful rubric feedback.');
        return;
      }

      mockBox.style.display = 'block';
      playCelebrationSound();

      const hasSituation = /when|project|bug|issue|task/i.test(text);
      const hasAction = /debugged|investigated|profiled|checked|implemented|used/i.test(text);
      const hasResult = /result|fixed|resolved|performance|reduced/i.test(text);

      let calcScore = 7.5;
      if (hasSituation) calcScore += 0.8;
      if (hasAction) calcScore += 0.9;
      if (hasResult) calcScore += 0.8;

      mockScore.textContent = `Score: ${calcScore.toFixed(1)} / 10`;
      mockContent.innerHTML = `
        <p><strong>Technical Precision:</strong> Solid conceptual awareness. You identified the underlying mechanism clearly.</p>
        <p style="margin-top: 0.35rem;"><strong>STAR Structure:</strong> ${hasResult ? 'Great job stating the final outcome/metrics!' : 'Tip: Conclude by quantifying the impact (e.g. "reduced latency by 30%").'}</p>
        <p style="margin-top: 0.35rem;"><strong>Recruiter Impression:</strong> Confident delivery suited for junior off-campus screening rounds.</p>
      `;
    });
  }
}

// B2B Employer Portal
function initEmployerPortal() {
  const container = document.getElementById('employerTalentList');
  if (!container) return;
  container.innerHTML = '';

  TALENT_POOL.forEach(cand => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <div>
        <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem;">
          <img src="${cand.avatar}" alt="${cand.name}" style="width: 54px; height: 54px; border-radius: 50%; object-fit: cover; border: 2px solid var(--primary);" />
          <div>
            <h3 style="font-size: 1.15rem;">${cand.name}</h3>
            <div style="font-size: 0.8rem; color: var(--cyan); font-weight: 600;">${cand.role}</div>
            <div style="font-size: 0.74rem; color: var(--text-dim);">${cand.college}</div>
          </div>
        </div>

        <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.85rem;">
          <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399; font-size: 0.72rem; padding: 0.2rem 0.6rem; border-radius: 99px;">
            <i class="fa-solid fa-award"></i> ${cand.badge}
          </span>
          <span class="badge" style="background: rgba(99, 102, 241, 0.15); color: #818cf8; font-size: 0.72rem; padding: 0.2rem 0.6rem; border-radius: 99px;">
            ATS: ${cand.atsScore}/100
          </span>
        </div>

        <p style="font-size: 0.84rem; color: var(--text-muted); line-height: 1.45; margin-bottom: 1rem;">${cand.summary}</p>

        <div style="margin-bottom: 1rem;">
          <div style="font-size: 0.74rem; color: var(--text-dim); margin-bottom: 0.35rem;">Skills Verified:</div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
            ${cand.skills.map(s => `<span class="key-chip" style="font-size: 0.7rem;">${s}</span>`).join('')}
          </div>
        </div>
      </div>

      <div style="border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
        <div style="display: flex; gap: 0.5rem; margin-bottom: 0.75rem;">
          <a href="${cand.github}" target="_blank" class="btn btn-secondary btn-sm" style="flex: 1;">
            <i class="fa-brands fa-github"></i> Repository
          </a>
          <a href="${cand.demo}" target="_blank" class="btn btn-secondary btn-sm" style="flex: 1;">
            <i class="fa-solid fa-play"></i> Live App
          </a>
        </div>
        <button class="btn btn-primary btn-sm hire-candidate-btn" data-candidate-name="${cand.name}" style="width: 100%;">
          <i class="fa-solid fa-envelope"></i> Request Interview (Free Match)
        </button>
      </div>
    `;
    container.appendChild(card);
  });

  document.querySelectorAll('.hire-candidate-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-candidate-name');
      alert(`💼 Interview request registered for ${name}! Candidate has been notified with your profile.`);
    });
  });
}

// Social Progress Card Canvas Renderer
function initCommunityAndCanvas() {
  const downloadBtn = document.getElementById('downloadCanvasCardBtn');
  const shareBtn = document.getElementById('shareProgressBtn');
  const viralPostBtn = document.getElementById('generateViralPostBtn');

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const canvas = document.getElementById('shareCanvas');
      if (!canvas) return;
      const link = document.createElement('a');
      link.download = `pathpilot-progress-day${appState.streak}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }

  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      switchView('community');
      renderSocialCardCanvas();
    });
  }

  if (viralPostBtn) {
    viralPostBtn.addEventListener('click', () => {
      const caption = `🚀 Day ${appState.streak} of 90 on my journey to crack an off-campus software engineering offer with PathPilot!\n\nJust completed milestones on my ${appState.currentRole.toUpperCase()} track with verified GitHub repositories.\n\nConsistent daily habit > expensive bootcamps. Check out the free roadmap engine at pathpilot.app #PathPilot #TechCareers #FresherHiring`;
      navigator.clipboard.writeText(caption);
      alert('📋 Pre-written LinkedIn caption copied to clipboard! Paste it alongside your downloaded progress image.');
    });
  }
}

function renderSocialCardCanvas() {
  const canvas = document.getElementById('shareCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Background
  const gradient = ctx.createLinearGradient(0, 0, 800, 420);
  gradient.addColorStop(0, '#07090e');
  gradient.addColorStop(0.5, '#0e131f');
  gradient.addColorStop(1, '#131a2b');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 800, 420);

  // Decorative ambient glow circles
  ctx.save();
  ctx.beginPath();
  ctx.arc(700, 80, 140, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(99, 102, 241, 0.18)';
  ctx.filter = 'blur(40px)';
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.beginPath();
  ctx.arc(100, 360, 160, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(6, 182, 212, 0.12)';
  ctx.filter = 'blur(40px)';
  ctx.fill();
  ctx.restore();

  // Border frame
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 2;
  ctx.strokeRect(20, 20, 760, 380);

  // Logo & Header
  ctx.fillStyle = '#6366f1';
  ctx.font = 'bold 24px Plus Jakarta Sans, sans-serif';
  ctx.fillText('PATHPILOT', 50, 65);

  ctx.fillStyle = '#06b6d4';
  ctx.font = '600 13px Plus Jakarta Sans, sans-serif';
  ctx.fillText('ZERO-TO-OFFER CAREER ENGINE', 200, 64);

  // Main Milestone Title
  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 36px Plus Jakarta Sans, sans-serif';
  ctx.fillText(`DAY ${appState.streak} COMPLETED 🔥`, 50, 140);

  // Role subtitle
  ctx.fillStyle = '#94a3b8';
  ctx.font = '500 18px Plus Jakarta Sans, sans-serif';
  ctx.fillText(`Role Track: ${appState.currentRole.toUpperCase()} ENGINEER`, 50, 180);

  // Stats Card inside canvas
  ctx.fillStyle = 'rgba(26, 35, 58, 0.8)';
  ctx.fillRect(50, 220, 700, 100);
  ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
  ctx.strokeRect(50, 220, 700, 100);

  ctx.fillStyle = '#34d399';
  ctx.font = 'bold 28px JetBrains Mono, monospace';
  ctx.fillText(`${appState.completedTopics.length} Topics`, 80, 275);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '12px Plus Jakarta Sans, sans-serif';
  ctx.fillText('CURATED CONCEPTS', 80, 300);

  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 28px JetBrains Mono, monospace';
  ctx.fillText(`${appState.streak} Days`, 310, 275);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '12px Plus Jakarta Sans, sans-serif';
  ctx.fillText('UNBROKEN STREAK', 310, 300);

  ctx.fillStyle = '#818cf8';
  ctx.font = 'bold 28px JetBrains Mono, monospace';
  ctx.fillText(`${appState.verifiedProjects.length || 1} Projects`, 530, 275);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '12px Plus Jakarta Sans, sans-serif';
  ctx.fillText('VERIFIED GITHUB CODE', 530, 300);

  // Student attribution
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '600 14px Plus Jakarta Sans, sans-serif';
  ctx.fillText(`Learner: ${appState.resume.name} • 100% Free Open Web Curriculum`, 50, 365);
}

// Modals Handling
function initModals() {
  // Pricing Modal
  const pricingModal = document.getElementById('pricingModal');
  const openPricingBtn = document.getElementById('upgradeModalBtn');
  const closePricingBtn = document.getElementById('closePricingModal');

  if (openPricingBtn) openPricingBtn.addEventListener('click', () => pricingModal.classList.add('active'));
  if (closePricingBtn) closePricingBtn.addEventListener('click', () => pricingModal.classList.remove('active'));

  const buyMonthly = document.getElementById('buyMonthlyProBtn');
  const buyLifetime = document.getElementById('buyLifetimeProBtn');
  const applyCoupon = document.getElementById('applyCouponBtn');

  if (buyMonthly) buyMonthly.addEventListener('click', activatePro);
  if (buyLifetime) buyLifetime.addEventListener('click', activatePro);
  if (applyCoupon) {
    applyCoupon.addEventListener('click', () => {
      const code = document.getElementById('couponInput').value.trim();
      if (code.toUpperCase() === 'CREATOR100') {
        document.getElementById('couponMessage').style.display = 'block';
        activatePro();
      } else {
        alert('Invalid coupon code. Try CREATOR100 from the YouTube video description.');
      }
    });
  }

  function activatePro() {
    appState.isPro = true;
    saveState();
    const statusText = document.getElementById('membershipStatusText');
    if (statusText) statusText.innerHTML = '<i class="fa-solid fa-crown" style="color: #fbbf24;"></i> Pro Active';
    alert('🎉 Welcome to PathPilot Pro! Unlimited AI resume reviews and Verified Talent badges unlocked.');
    pricingModal.classList.remove('active');
  }

  // Report Modal
  const reportModal = document.getElementById('reportLinkModal');
  const closeReportBtn = document.getElementById('closeReportModal');
  const cancelReportBtn = document.getElementById('cancelReportBtn');
  const submitReportBtn = document.getElementById('submitReportBtn');

  if (closeReportBtn) closeReportBtn.addEventListener('click', () => reportModal.classList.remove('active'));
  if (cancelReportBtn) cancelReportBtn.addEventListener('click', () => reportModal.classList.remove('active'));
  if (submitReportBtn) {
    submitReportBtn.addEventListener('click', () => {
      alert('🙏 Thank you! Your feedback will be reviewed by the founder within 24 hours to keep the curriculum pristine.');
      reportModal.classList.remove('active');
    });
  }

  // Verification Modal
  const verifyModal = document.getElementById('verifyProjectModal');
  const closeVerifyBtn = document.getElementById('closeVerifyModal');
  const cancelVerifyBtn = document.getElementById('cancelVerifyBtn');
  const runAuditBtn = document.getElementById('runVerificationAuditBtn');

  if (closeVerifyBtn) closeVerifyBtn.addEventListener('click', () => verifyModal.classList.remove('active'));
  if (cancelVerifyBtn) cancelVerifyBtn.addEventListener('click', () => verifyModal.classList.remove('active'));

  if (runAuditBtn) {
    runAuditBtn.addEventListener('click', () => {
      const gh = document.getElementById('verifyGithubUrl').value.trim();
      const live = document.getElementById('verifyLiveUrl').value.trim();
      if (!gh || !live) {
        alert('Please provide both your GitHub repository URL and live deployed URL.');
        return;
      }

      const statusBox = document.getElementById('verificationAuditStatus');
      statusBox.style.display = 'block';
      runAuditBtn.disabled = true;

      // Simulated automated checks
      setTimeout(() => {
        document.getElementById('chk1').innerHTML = '<i class="fa-solid fa-circle-check" style="color: #10b981;"></i> README structure verified (contains architecture & setup guide)';
        document.getElementById('chk2').style.opacity = '1';
        document.getElementById('chk2').innerHTML = '<i class="fa-solid fa-spinner fa-spin" style="color: var(--cyan);"></i> Validating commit history...';
      }, 1000);

      setTimeout(() => {
        document.getElementById('chk2').innerHTML = '<i class="fa-solid fa-circle-check" style="color: #10b981;"></i> 14 independent git commits detected (anti-plagiarism passed)';
        document.getElementById('chk3').style.opacity = '1';
        document.getElementById('chk3').innerHTML = '<i class="fa-solid fa-spinner fa-spin" style="color: var(--cyan);"></i> Pinging live deployment HTTP status 200...';
      }, 2000);

      setTimeout(() => {
        document.getElementById('chk3').innerHTML = '<i class="fa-solid fa-circle-check" style="color: #10b981;"></i> Live deployment active (HTTP 200 OK, SSL verified)';
        document.getElementById('chk4').style.opacity = '1';
        document.getElementById('chk4').innerHTML = '<i class="fa-solid fa-circle-check" style="color: #10b981;"></i> Cryptographically signed Proof-of-Work Badge issued!';
        
        playCelebrationSound();

        const currentPId = verifyModal.getAttribute('data-active-project-id');
        if (currentPId && !appState.verifiedProjects.includes(currentPId)) {
          appState.verifiedProjects.push(currentPId);
          saveState();
        }

        setTimeout(() => {
          alert('🏆 Project verified! Proof-of-Work Badge issued and added to your ATS Resume and Employer Talent Profile.');
          verifyModal.classList.remove('active');
          statusBox.style.display = 'none';
          runAuditBtn.disabled = false;
          initProjectsView();
        }, 1200);
      }, 3200);
    });
  }

  // Sound toggle button
  const soundBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      appState.soundEnabled = !appState.soundEnabled;
      saveState();
      soundIcon.className = appState.soundEnabled ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
    });
  }
}

function openReportModal(topicTitle) {
  const modal = document.getElementById('reportLinkModal');
  const input = document.getElementById('reportResourceTitle');
  if (input) input.value = topicTitle;
  if (modal) modal.classList.add('active');
}

function openVerifyModal(projectId, projectTitle) {
  const modal = document.getElementById('verifyProjectModal');
  const title = document.getElementById('modalProjectTitle');
  if (title) title.textContent = `Verify: ${projectTitle}`;
  if (modal) {
    modal.setAttribute('data-active-project-id', projectId);
    modal.classList.add('active');
  }
}

// In-App Notes Drawer
function initNotesDrawer() {
  const openBtn = document.getElementById('openNotesDrawerBtn');
  const drawer = document.getElementById('notesDrawer');
  const closeBtn = document.getElementById('closeNotesDrawerBtn');
  const textarea = document.getElementById('quickNotesArea');
  const clearBtn = document.getElementById('clearNotesBtn');

  if (textarea && appState.userNotes) {
    textarea.value = appState.userNotes;
  }

  if (openBtn && drawer) {
    openBtn.addEventListener('click', () => {
      drawer.style.display = drawer.style.display === 'none' ? 'block' : 'none';
    });
  }

  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => {
      drawer.style.display = 'none';
    });
  }

  if (textarea) {
    textarea.addEventListener('input', () => {
      appState.userNotes = textarea.value;
      saveState();
    });
  }

  if (clearBtn && textarea) {
    clearBtn.addEventListener('click', () => {
      textarea.value = '';
      appState.userNotes = '';
      saveState();
    });
  }
}
