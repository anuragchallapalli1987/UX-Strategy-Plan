/**
 * app.js
 * Application logic and interactive engines for the 
 * Principal UX Architect Master Blueprint Website.
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- Global Application State ---
  const state = {
    theme: localStorage.getItem("theme") || "dark",
    activeTab: "dashboard",
    // Skill ratings (default value 5 out of 10)
    ratings: {
      prod_strategy: 5, prod_discovery: 5, prod_roadmap: 5, prod_analytics: 5,
      ux_research: 5, ux_ia: 5, ux_interaction: 5, ux_accessibility: 5,
      tech_react: 5, tech_styling: 5, tech_ds_code: 5, tech_performance: 5,
      ai_product: 5, ai_design: 5, ai_engineering: 5, ai_governance: 5,
      biz_finance: 5, biz_analysis: 5, biz_dx: 5,
      lead_stakeholder: 5, lead_mentorship: 5, lead_change: 5
    },
    // Roadmap answers
    roadmapInputs: {
      currentLevel: "senior",
      targetMarket: "US",
      timeline: "90"
    },
    // Interactive trackers
    brandTracker: {
      linkedinFreq: "monthly",
      essaysCount: 0,
      speakingDone: false,
      ossContribute: false
    },
    learningProgress: {},
    // Simulator run state
    simulator: {
      active: false,
      currentRoundIndex: 0,
      scores: [],
      redFlags: 0,
      greenFlags: 0,
      completed: false
    },
    // Chat state
    chatHistory: [
      { sender: "assistant", text: "Welcome back! I am your AI Career Coach, grounded in the CEO Council Master Playbook. Ask me any career, resume, portfolio, or interview strategy questions." }
    ]
  };

  // --- Initial Configuration ---
  const db = window.STRATEGY_DATA;
  if (!db) {
    console.error("Strategy data is not loaded!");
    return;
  }

  // Load ratings from localStorage if present
  const savedRatings = localStorage.getItem("ratings");
  if (savedRatings) {
    try { state.ratings = JSON.parse(savedRatings); } catch (e) {}
  }
  
  // Load trackers
  const savedBrand = localStorage.getItem("brandTracker");
  if (savedBrand) {
    try { state.brandTracker = JSON.parse(savedBrand); } catch (e) {}
  }
  const savedLearning = localStorage.getItem("learningProgress");
  if (savedLearning) {
    try { state.learningProgress = JSON.parse(savedLearning); } catch (e) {}
  }

  // Apply visual theme
  if (state.theme === "light") {
    document.body.classList.add("light-theme");
  }

  // --- Theme Toggle Handler ---
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      document.body.classList.toggle("light-theme", state.theme === "light");
      localStorage.setItem("theme", state.theme);
      themeToggle.innerText = state.theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
    });
    // Set initial text
    themeToggle.innerText = state.theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
  }

  // --- Sidebar Mobile Navigation ---
  const menuBtn = document.querySelector(".menu-toggle");
  const sidebar = document.querySelector(".sidebar");
  if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", () => {
      sidebar.classList.toggle("active");
    });
  }

  // --- Tab Router Navigation ---
  const navItems = document.querySelectorAll(".nav-item");
  const tabViews = document.querySelectorAll(".tab-view");
  const headerTitle = document.getElementById("view-header-title");

  function switchTab(tabId) {
    state.activeTab = tabId;
    
    // Update active nav styling
    navItems.forEach(item => {
      item.classList.toggle("active", item.getAttribute("data-tab") === tabId);
    });

    // Toggle visible views
    tabViews.forEach(view => {
      view.classList.toggle("active", view.id === `${tabId}-view`);
    });

    // Update header title based on tab
    const titles = {
      dashboard: "Executive Readiness Dashboard",
      skills: "Competency Skill Assessment",
      roadmap: "Customized Career Roadmap",
      evaluators: "Resume & Portfolio Evaluators",
      simulator: "CEO Panel Interview Simulator",
      coach: "AI Career Coach Dialog",
      lead: "Executive Leadership & Playbook",
      market: "Salary & Personal Brand Hub"
    };
    if (headerTitle) {
      headerTitle.innerText = titles[tabId] || "Principal UX Architect Blueprint";
    }

    // Close sidebar on mobile
    if (sidebar) sidebar.classList.remove("active");

    // Perform specific view setups
    if (tabId === "dashboard") {
      updateDashboardSummary();
    } else if (tabId === "skills") {
      renderSkillsAssessment();
    } else if (tabId === "roadmap") {
      setupRoadmapView();
    } else if (tabId === "evaluators") {
      setupEvaluatorsView();
    } else if (tabId === "simulator") {
      setupSimulatorView();
    } else if (tabId === "coach") {
      renderChat();
    } else if (tabId === "lead") {
      setupPlaybookView();
    } else if (tabId === "market") {
      setupMarketView();
    }
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      const tabId = item.getAttribute("data-tab");
      if (tabId) switchTab(tabId);
    });
  });

  // --- Dashboard Calculation Logic ---
  function getPillarScores() {
    const scores = {};
    db.skillsMatrix.forEach(pillar => {
      let sum = 0;
      pillar.subskills.forEach(sub => {
        sum += state.ratings[sub.id] || 5;
      });
      scores[pillar.id] = Number((sum / pillar.subskills.length).toFixed(1));
    });
    return scores;
  }

  function getOverallReadiness() {
    const scores = getPillarScores();
    const sum = Object.values(scores).reduce((a, b) => a + b, 0);
    // Convert 1-10 average to 0-100 percentage
    return Math.round((sum / Object.keys(scores).length) * 10);
  }

  function updateDashboardSummary() {
    const score = getOverallReadiness();
    
    // Update Score Circle Fill
    const dashFill = document.getElementById("dash-circle-fill");
    const dashScoreNum = document.getElementById("dash-score-number");
    const dashBandLabel = document.getElementById("dash-band-label");
    
    if (dashScoreNum) dashScoreNum.innerText = `${score}%`;
    
    if (dashFill) {
      const radius = 70;
      const circumference = 2 * Math.PI * radius;
      dashFill.style.strokeDasharray = `${circumference} ${circumference}`;
      const offset = circumference - (score / 100) * circumference;
      dashFill.style.strokeDashoffset = offset;
    }

    if (dashBandLabel) {
      if (score >= 85) {
        dashBandLabel.innerHTML = '<span class="badge badge-gold">Top 0.1% - CEO Ready</span>';
      } else if (score >= 65) {
        dashBandLabel.innerHTML = '<span class="badge badge-teal">Top 1% - Strong Profile</span>';
      } else {
        dashBandLabel.innerHTML = '<span class="badge badge-coral">Needs Evidence Work</span>';
      }
    }

    // Update Pillar Bars in Dashboard
    const scores = getPillarScores();
    const barsContainer = document.getElementById("dash-pillar-bars");
    if (barsContainer) {
      barsContainer.innerHTML = db.skillsMatrix.map(pillar => {
        const val = scores[pillar.id];
        const percent = val * 10;
        let colorClass = "badge-coral";
        if (val >= 8) colorClass = "badge-gold";
        else if (val >= 6) colorClass = "badge-teal";
        
        return `
          <div style="margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 4px;">
              <span><strong>${pillar.name}</strong></span>
              <span class="badge ${colorClass}">${val}/10</span>
            </div>
            <div style="height: 6px; background-color: var(--border); border-radius: 4px; overflow:hidden;">
              <div style="width: ${percent}%; height: 100%; background: linear-gradient(to right, var(--gold), var(--copper)); transition: width 0.5s ease;"></div>
            </div>
          </div>
        `;
      }).join("");
    }

    // Next Actions in Dashboard (checklists)
    const actionList = document.getElementById("dash-actions-list");
    if (actionList) {
      const scores = getPillarScores();
      const weakestPillar = db.skillsMatrix.reduce((a, b) => scores[a.id] < scores[b.id] ? a : b);
      
      actionList.innerHTML = `
        <div class="card highlight-gold" style="margin-bottom: 12px; padding: 16px;">
          <strong>🎯 Primary Gaps Diagnostic:</strong>
          <p style="margin-top: 6px; font-size: 13px;">Your ratings indicate your weakest area is <strong>${weakestPillar.name}</strong> (Score: ${scores[weakestPillar.id]}/10). Focus on building tangible artifacts to prove this skill.</p>
        </div>
        <button class="btn btn-primary" onclick="document.querySelector('[data-tab=skills]').click()" style="width: 100%;">Re-assess Skills</button>
      `;
    }
  }

  // --- Skill Assessment Engine (Pillar Sliders & SVG Radar Chart) ---
  function renderSkillsAssessment() {
    const listEl = document.getElementById("assessment-sliders");
    if (!listEl) return;

    listEl.innerHTML = db.skillsMatrix.map(pillar => {
      const subskillsHTML = pillar.subskills.map(sub => {
        const currentVal = state.ratings[sub.id] || 5;
        return `
          <div class="slider-group">
            <div class="slider-label-row">
              <label for="slide_${sub.id}">${sub.name}</label>
              <span class="slider-val-badge" id="val_${sub.id}">${currentVal}/10</span>
            </div>
            <input type="range" class="slider-control" id="slide_${sub.id}" data-subid="${sub.id}" min="1" max="10" value="${currentVal}">
            <p style="font-size:11.5px; color: var(--text-muted); margin-top: 2px;">${sub.desc}</p>
          </div>
        `;
      }).join("");

      return `
        <div class="card" style="margin-bottom: 20px;">
          <h3 style="margin-bottom: 16px; display: flex; align-items:center; gap: 8px;">
            <span>🛡️</span> ${pillar.name}
          </h3>
          <div style="display:flex; flex-direction:column; gap:16px;">
            ${subskillsHTML}
          </div>
        </div>
      `;
    }).join("");

    // Add listeners to all generated range inputs
    const inputs = listEl.querySelectorAll(".slider-control");
    inputs.forEach(input => {
      input.addEventListener("input", (e) => {
        const subid = e.target.getAttribute("data-subid");
        const val = Number(e.target.value);
        state.ratings[subid] = val;
        
        // Update label text
        const badge = document.getElementById(`val_${subid}`);
        if (badge) badge.innerText = `${val}/10`;
        
        // Save
        localStorage.setItem("ratings", JSON.stringify(state.ratings));
        
        // Redraw SVG radar chart and update calculations
        updateRadarChart();
      });
    });

    updateRadarChart();
  }

  function updateRadarChart() {
    const scores = getPillarScores();
    const readiness = getOverallReadiness();
    
    // Update header values
    const scoreValText = document.getElementById("skills-score-val");
    const bandBadge = document.getElementById("skills-band-badge");
    if (scoreValText) scoreValText.innerText = `${readiness}%`;
    if (bandBadge) {
      if (readiness >= 85) {
        bandBadge.innerHTML = '<span class="badge badge-gold">Top 0.1% - CEO Ready</span>';
      } else if (readiness >= 65) {
        bandBadge.innerHTML = '<span class="badge badge-teal">Top 1% - Strong Profile</span>';
      } else {
        bandBadge.innerHTML = '<span class="badge badge-coral">Needs Gaps Remediated</span>';
      }
    }

    // Draw SVG Radar Chart
    const svg = document.getElementById("radar-svg");
    if (!svg) return;

    const width = 340;
    const height = 340;
    const cx = width / 2;
    const cy = height / 2;
    const maxVal = 10;
    const r = 120; // max radius

    const pillars = db.skillsMatrix;
    const numPoints = pillars.length;
    const angleStep = (2 * Math.PI) / numPoints;

    // Helper to calculate coordinates
    function getCoords(index, value) {
      const angle = index * angleStep - Math.PI / 2;
      const distance = (value / maxVal) * r;
      return {
        x: cx + distance * Math.cos(angle),
        y: cy + distance * Math.sin(angle)
      };
    }

    let html = "";

    // Draw background concentric hexes (circles / webs)
    for (let level = 2; level <= 10; level += 2) {
      const points = [];
      for (let i = 0; i < numPoints; i++) {
        const coords = getCoords(i, level);
        points.push(`${coords.x},${coords.y}`);
      }
      html += `<polygon points="${points.join(" ")}" fill="none" stroke="var(--border)" stroke-width="1"></polygon>`;
      // Score grids numbers
      const labelCoords = getCoords(0, level);
      html += `<text x="${labelCoords.x + 6}" y="${labelCoords.y + 4}" fill="var(--text-muted)" font-size="9" font-family="monospace">${level}</text>`;
    }

    // Draw axis lines and labels
    pillars.forEach((pillar, i) => {
      const axisEnd = getCoords(i, 10);
      html += `<line x1="${cx}" y1="${cy}" x2="${axisEnd.x}" y2="${axisEnd.y}" stroke="var(--border)" stroke-width="1.5"></line>`;
      
      // Label positioning
      const labelDist = 10;
      const angle = i * angleStep - Math.PI / 2;
      const lx = cx + (r + labelDist + 26) * Math.cos(angle);
      const ly = cy + (r + labelDist + 10) * Math.sin(angle);
      
      // Split label text for readability
      const labelName = pillar.name.split(" & ");
      html += `
        <text x="${lx}" y="${ly}" fill="var(--ink)" font-size="10.5" font-weight="700" text-anchor="middle">
          <tspan x="${lx}" dy="0">${labelName[0]}</tspan>
          ${labelName[1] ? `<tspan x="${lx}" dy="12">${labelName[1]}</tspan>` : ""}
        </text>
      `;
    });

    // Draw the active user skill fill path
    const userPoints = [];
    pillars.forEach((pillar, i) => {
      const score = scores[pillar.id];
      const coords = getCoords(i, score);
      userPoints.push(`${coords.x},${coords.y}`);
      
      // Draw point dots
      html += `<circle cx="${coords.x}" cy="${coords.y}" r="4" fill="var(--gold)"></circle>`;
    });

    html += `<polygon points="${userPoints.join(" ")}" fill="rgba(212, 175, 55, 0.2)" stroke="var(--gold)" stroke-width="2.5"></polygon>`;

    svg.innerHTML = html;
    
    // Dynamically update dashboard summaries as ratings slide
    updateDashboardSummary();
  }

  // --- Customized Career Roadmap Generator ---
  function setupRoadmapView() {
    const currentLvl = document.getElementById("roadmap-level");
    const targetMkt = document.getElementById("roadmap-market");
    const timeline = document.getElementById("roadmap-time");
    const generateBtn = document.getElementById("btn-generate-roadmap");

    if (currentLvl) currentLvl.value = state.roadmapInputs.currentLevel;
    if (targetMkt) targetMkt.value = state.roadmapInputs.targetMarket;
    if (timeline) timeline.value = state.roadmapInputs.timeline;

    if (generateBtn) {
      generateBtn.onclick = () => {
        state.roadmapInputs.currentLevel = currentLvl.value;
        state.roadmapInputs.targetMarket = targetMkt.value;
        state.roadmapInputs.timeline = timeline.value;
        
        renderRoadmapMilestones();
      };
    }

    renderRoadmapMilestones();
  }

  function renderRoadmapMilestones() {
    const timelineContainer = document.getElementById("roadmap-output-timeline");
    if (!timelineContainer) return;

    const levelMap = {
      senior: "Senior Architect",
      lead: "Lead Product Architect",
      principal: "Principal UX Leader / Associate Director"
    };

    const targetVal = levelMap[state.roadmapInputs.currentLevel];
    const days = state.roadmapInputs.timeline;
    const region = state.roadmapInputs.targetMarket;

    // Define mock customized roadmap checklists depending on input selections
    const milestones = [
      {
        title: "Phase 1: Executive Foundation & Narrative Formulation (Days 1–30)",
        tasks: [
          `Formulate your signature positioning statement customized for ${region} markets: "I combine UX systems with React fluency to compress product releases by 40%."`,
          "Identify 3 past key projects and rewrite their outcomes matching the ARCH (Action-Result-Context-How) template.",
          "Complete baseline UX/UI component audit to locate UI design system inconsistencies in your current company."
        ]
      },
      {
        title: `Phase 2: Proof Engineering & System Audits (Days 31–${Math.round(days / 2)})`,
        tasks: [
          "Code one dynamic React component library mockup showcasing advanced screen reader access details (ARIA inputs).",
          "Publish a long-form case study on design systems documenting tokens governance and team adoption ratios.",
          "Perform 3 mock recruiter screens focused on defending strategy compromises."
        ]
      },
      {
        title: `Phase 3: Executive Presentation & Board Calibration (Days ${Math.round(days / 2) + 1}–${days})`,
        tasks: [
          `Build a one-page Executive brief outlining your target compensation baseline ($250K+ / ₹80L+ based on ${region}).`,
          "Run a mock product design critique with an engineering lead addressing database and REST/GraphQL limits.",
          "Schedule 2 warm referrals or introductory calls at target scaleups."
        ]
      }
    ];

    timelineContainer.innerHTML = `
      <div class="card highlight-gold" style="margin-bottom: 24px;">
        <strong>📋 Customized Operating Plan:</strong>
        <p style="margin-top: 4px; font-size: 13.5px;">Calibrated for an aspiring <strong>${targetVal}</strong> targeting the <strong>${region}</strong> geography on a <strong>${days}-day prep timeline</strong>.</p>
      </div>
    ` + milestones.map((phase, phaseIdx) => {
      const taskList = phase.tasks.map((task, taskIdx) => {
        const key = `roadmap-task-${phaseIdx}-${taskIdx}`;
        const isDone = state.learningProgress[key] === "done";
        
        return `
          <button class="checklist-item ${isDone ? "done" : ""}" type="button" data-taskkey="${key}">
            <div class="checkbox-visual">✔</div>
            <p style="font-size: 13px;">${task}</p>
          </button>
        `;
      }).join("");

      return `
        <div style="margin-bottom: 24px;">
          <h4 style="font-family: var(--font-serif); font-size:19px; font-weight:400; margin-bottom: 12px; color: var(--gold);">${phase.title}</h4>
          <div class="checklist-container">
            ${taskList}
          </div>
        </div>
      `;
    }).join("") + `
      <div style="margin-top: 32px;">
        <h4 style="font-family: var(--font-serif); font-size:22px; font-weight:400; margin-bottom: 12px; color: var(--gold);">🏛️ 5-Year Executive Career Plan</h4>
        <div class="checklist-container">
          <div class="checklist-item" style="cursor:default;">
            <div class="checkbox-visual" style="background:var(--gold); border-color:var(--gold); color:black;">Y1</div>
            <p style="font-size: 13px;"><strong>Y1: Build Proof</strong> - Complete 3 flagship case studies, AI workflow validation, and establish a public technical perspective.</p>
          </div>
          <div class="checklist-item" style="cursor:default;">
            <div class="checkbox-visual" style="background:var(--teal); border-color:var(--teal); color:black;">Y2</div>
            <p style="font-size: 13px;"><strong>Y2: Lead Scale</strong> - Govern enterprise design systems, run cross-functional rituals, speak at conferences, and track outcomes.</p>
          </div>
          <div class="checklist-item" style="cursor:default;">
            <div class="checkbox-visual" style="background:var(--blue); border-color:var(--blue); color:black;">Y3</div>
            <p style="font-size: 13px;"><strong>Y3: Own Strategy</strong> - Scope multi-million budgets, direct product roadmap bets, orchestrate AI transformation programs.</p>
          </div>
          <div class="checklist-item" style="cursor:default;">
            <div class="checkbox-visual" style="background:var(--violet); border-color:var(--violet); color:black;">Y4</div>
            <p style="font-size: 13px;"><strong>Y4: Expand Influence</strong> - Advise tech startups, publish proprietary experience frameworks, contribute to open-source codebases.</p>
          </div>
          <div class="checklist-item" style="cursor:default;">
            <div class="checkbox-visual" style="background:var(--emerald); border-color:var(--emerald); color:black;">Y5</div>
            <p style="font-size: 13px;"><strong>Y5: Category Operator</strong> - Transition to VP of Product/Design, CPO track, or Fractional executive advisor seats.</p>
          </div>
        </div>
      </div>
    `;

    // Hook checklist item event listeners
    const items = timelineContainer.querySelectorAll(".checklist-item[data-taskkey]");
    items.forEach(btn => {
      btn.onclick = () => {
        const key = btn.getAttribute("data-taskkey");
        const done = btn.classList.toggle("done");
        
        state.learningProgress[key] = done ? "done" : "";
        localStorage.setItem("learningProgress", JSON.stringify(state.learningProgress));
      };
    });
  }

  // --- Resume & Portfolio Evaluators (ARCH & IMPACT keyword verification engines) ---
  function setupEvaluatorsView() {
    const resumeText = document.getElementById("eval-resume-input");
    const portfolioText = document.getElementById("eval-portfolio-input");
    
    const evalResumeBtn = document.getElementById("btn-eval-resume");
    const evalPortfolioBtn = document.getElementById("btn-eval-portfolio");

    const resumeOut = document.getElementById("eval-resume-output");
    const portfolioOut = document.getElementById("eval-portfolio-output");

    // Load Calibration Guides
    const resumeCalibration = document.getElementById("eval-resume-calibration");
    if (resumeCalibration) {
      resumeCalibration.innerHTML = db.calibrationGuides.resume.map(guide => `
        <div class="card" style="margin-bottom:12px; ${guide.style}">
          <div class="card-meta">${guide.level}</div>
          <p style="font-size:12.5px; color:var(--text-muted); margin-bottom:8px;">${guide.description}</p>
          <pre style="background:rgba(0,0,0,0.15); padding:10px; border-radius:4px; font-size:11.5px; font-family:monospace; white-space:pre-wrap; overflow-x:auto; color:var(--text-secondary);">${guide.example}</pre>
        </div>
      `).join("");
    }

    if (evalResumeBtn && resumeText && resumeOut) {
      evalResumeBtn.onclick = () => {
        const txt = resumeText.value.trim();
        if (!txt) {
          resumeOut.innerHTML = '<p class="text-coral">Please paste bullet points to evaluate.</p>';
          return;
        }
        
        // Analyze for ARCH keywords
        const analysis = evaluateResumeText(txt);
        
        let badgeClass = "badge-coral";
        if (analysis.rating === "World-Class") badgeClass = "badge-gold";
        else if (analysis.rating === "Strong") badgeClass = "badge-teal";

        resumeOut.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <strong>Analysis Results:</strong>
            <span class="badge ${badgeClass}">${analysis.rating} (${analysis.score}/10)</span>
          </div>
          <div style="font-size:13px; display:flex; flex-direction:column; gap:10px;">
            <p><strong>Verbs Detected:</strong> ${analysis.verbs.length ? analysis.verbs.join(", ") : "None. <span class='badge badge-coral'>Action Gaps</span>"}</p>
            <p><strong>Metrics/Numbers Checked:</strong> ${analysis.hasMetrics ? "Yes (Found: " + analysis.metricsFound.join(", ") + ")" : "No metrics found. <span class='badge badge-coral'>Result Gaps</span>"}</p>
            <p><strong>Context Markers:</strong> ${analysis.hasContext ? "Yes" : "No clinical or product environment parameters noted."}</p>
            <p><strong>React / System Tech:</strong> ${analysis.hasTech ? "Yes (Found design system or frontend markers)" : "No frontend component or design token references."}</p>
            <div class="card font-sm" style="margin-top:10px; background:rgba(0,0,0,0.15);">
              <strong>💡 Actionable Critique:</strong>
              <p style="margin-top:4px;">${analysis.critique}</p>
            </div>
          </div>
        `;
      };
    }

    if (evalPortfolioBtn && portfolioText && portfolioOut) {
      evalPortfolioBtn.onclick = () => {
        const txt = portfolioText.value.trim();
        if (!txt) {
          portfolioOut.innerHTML = '<p class="text-coral">Please paste a case study overview to evaluate.</p>';
          return;
        }
        
        const analysis = evaluatePortfolioText(txt);
        let badgeClass = "badge-coral";
        if (analysis.rating === "Top 0.1%") badgeClass = "badge-gold";
        else if (analysis.rating === "Strong") badgeClass = "badge-teal";

        portfolioOut.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <strong>IMPACT Framework Evaluation:</strong>
            <span class="badge ${badgeClass}">${analysis.rating} (${analysis.score}/100)</span>
          </div>
          <div style="font-size:13px; display:flex; flex-direction:column; gap:10px;">
            <p><strong>Phase Grounding Coverage:</strong></p>
            <ul style="margin:4px 0 10px 20px; font-size:12.5px;">
              <li><strong>Intent (Pain/Need):</strong> ${analysis.details.intent ? "✅ Checked" : "❌ Missing user pain or business needs"}</li>
              <li><strong>Method (Testing/Discovery):</strong> ${analysis.details.method ? "✅ Checked" : "❌ Missing discovery sprint details"}</li>
              <li><strong>Process (Failed loops/wireframe):</strong> ${analysis.details.process ? "✅ Checked" : "❌ Missing wireframe/iterations"}</li>
              <li><strong>Architecture (System mapping):</strong> ${analysis.details.architecture ? "✅ Checked" : "❌ Missing navigation layout or structure mapping"}</li>
              <li><strong>Craft (States/Tokens):</strong> ${analysis.details.craft ? "✅ Checked" : "❌ Missing token style or component state detail"}</li>
              <li><strong>Transformation (Impact metrics):</strong> ${analysis.details.transformation ? "✅ Checked" : "❌ Missing final before/after numbers"}</li>
            </ul>
            <div class="card font-sm" style="margin-top:10px; background:rgba(0,0,0,0.15);">
              <strong>💡 Artifact Improvement Notes:</strong>
              <p style="margin-top:4px;">${analysis.critique}</p>
            </div>
          </div>
        `;
      };
    }
  }

  function evaluateResumeText(text) {
    const txtLower = text.toLowerCase();
    
    // Check Verbs
    const actionVerbs = ["architected", "led", "redesigned", "built", "spearheaded", "designed", "optimized", "implemented", "governed", "crafted", "developed", "managed"];
    const verbsFound = actionVerbs.filter(v => txtLower.includes(v));

    // Check Metrics (digits/percentages)
    const metricsRegex = /\b\d+%\b|\b\d+x\b|\$\d+|\b\d+ million\b|\b\d+m\b/g;
    const metricsFound = txtLower.match(metricsRegex) || [];
    const hasMetrics = metricsFound.length > 0;

    // Check Context (clinical, platform, SaaS, mobile)
    const contextMarkers = ["patient", "portal", "enterprise", "healthcare", "platform", "saas", "dashboard", "b2b", "clinical"];
    const hasContext = contextMarkers.some(c => txtLower.includes(c));

    // Check Tech (React, Next.js, tokens, component, Storybook, accessibility)
    const techMarkers = ["react", "next.js", "typescript", "token", "storybook", "wcag", "aria", "component", "accessibility"];
    const hasTech = techMarkers.some(t => txtLower.includes(t));

    // Calculate score
    let score = 2; // base
    if (verbsFound.length > 0) score += 2;
    if (hasMetrics) score += 3;
    if (hasContext) score += 1;
    if (hasTech) score += 2;

    let rating = "Average";
    let critique = "Vague description focusing on standard tasks. Please inject measurable business metrics, specify the system tools used, and rewrite using active verbs (e.g. 'Architected' instead of 'Responsible for').";

    if (score >= 9) {
      rating = "World-Class";
      critique = "Outstanding execution. Meets the 0.1% unicorn standard: includes active ownership verbs, clear metrics, environment context, and front-end scaling parameters.";
    } else if (score >= 6) {
      rating = "Strong";
      critique = "Good structure. To push this to the 0.1% level, verify you connect design system changes to developer metrics (e.g., 'reduced handoff time by 60%') or accessibility pass rates.";
    }

    return {
      score,
      rating,
      verbs: verbsFound,
      hasMetrics,
      metricsFound,
      hasContext,
      hasTech,
      critique
    };
  }

  function evaluatePortfolioText(text) {
    const txtLower = text.toLowerCase();
    const details = {
      intent: txtLower.includes("intent") || txtLower.includes("problem") || txtLower.includes("need"),
      method: txtLower.includes("method") || txtLower.includes("research") || txtLower.includes("test") || txtLower.includes("discovery"),
      process: txtLower.includes("process") || txtLower.includes("sketch") || txtLower.includes("wireframe") || txtLower.includes("iteration"),
      architecture: txtLower.includes("architecture") || txtLower.includes("navigation") || txtLower.includes("map") || txtLower.includes("hierarchy") || txtLower.includes("system"),
      craft: txtLower.includes("craft") || txtLower.includes("token") || txtLower.includes("component") || txtLower.includes("state") || txtLower.includes("accessibility"),
      transformation: txtLower.includes("transformation") || txtLower.includes("metric") || txtLower.includes("nps") || txtLower.includes("impact") || txtLower.includes("%")
    };

    const hits = Object.values(details).filter(Boolean).length;
    const score = Math.min(100, hits * 16 + 4); // convert to percentage

    let rating = "Needs Work";
    let critique = "The case study layout seems linear or visual-only. Make sure to document failed iterations, outline accessibility considerations, show dynamic states (focus/hover), and attach quantitative data.";

    if (score >= 90) {
      rating = "Top 0.1%";
      critique = "Excellent case study grounding. Highlights complex layouts, systems scaling, design token workflows, and tangible developer outcomes.";
    } else if (score >= 60) {
      rating = "Strong";
      critique = "Solid coverage. Focus on showcasing interactive prototypes (e.g. using React/TS components in Storybook) and detailing WCAG AAA compliance checks.";
    }

    return {
      score,
      rating,
      details,
      critique
    };
  }

  // --- CEO Panel Interview Simulator (Interactive Game Loop) ---
  function setupSimulatorView() {
    const simBox = document.getElementById("sim-gameplay-area");
    if (!simBox) return;

    if (!state.simulator.active) {
      simBox.innerHTML = `
        <div style="text-align:center; padding:32px;">
          <h3 style="font-family:var(--font-serif); font-size:32px; font-weight:400; margin-bottom:12px; color:var(--gold);">Ready to face the C-Suite Panel?</h3>
          <p style="font-size:14px; max-width:540px; margin:0 auto 24px; color:var(--text-secondary);">You will be tested across 8 rounds: Recruiter screen, Leadership, Product thinking, UX architecture, AI systems, Frontend engineering, Executive ROI presentation, and the CEO bar-raiser. Red flags will result in an instant disqualification.</p>
          <button class="btn btn-primary" id="btn-start-sim">Begin Simulation</button>
        </div>
      `;
      const startBtn = document.getElementById("btn-start-sim");
      if (startBtn) {
        startBtn.onclick = () => {
          state.simulator.active = true;
          state.simulator.currentRoundIndex = 0;
          state.simulator.scores = [];
          state.simulator.redFlags = 0;
          state.simulator.greenFlags = 0;
          state.simulator.completed = false;
          
          renderSimulatorQuestion();
        };
      }
    } else {
      renderSimulatorQuestion();
    }
  }

  function renderSimulatorQuestion() {
    const simBox = document.getElementById("sim-gameplay-area");
    if (!simBox) return;

    const currentIdx = state.simulator.currentRoundIndex;
    const questions = db.interviewQuestions;

    if (currentIdx >= questions.length) {
      // Game completed, compile reports
      state.simulator.completed = true;
      state.simulator.active = false;
      
      const totalScore = state.simulator.scores.reduce((a, b) => a + b, 0);
      let verdict = "CEO READY";
      let verdictColor = "badge-gold";
      let verdictDescription = "Excellent. You answered with high strategic focus, respected code limits, and verified accessibility checks. The panel approves you for hire.";

      if (state.simulator.redFlags > 0) {
        verdict = "REJECTED (RED FLAGS)";
        verdictColor = "badge-coral";
        verdictDescription = "No-hire decision. You triggered visual-only siloing, defensive engineering arguments, or abdidated human control, which is an immediate red flag for technology executives.";
      } else if (totalScore < 60) {
        verdict = "PROOF GAPS";
        verdictColor = "badge-blue";
        verdictDescription = "Partial pass. Strong conceptual values, but you lack metrics tracking and token architecture design details. Strengthen your case studies before applying.";
      }

      simBox.innerHTML = `
        <div style="padding:20px;">
          <h3 style="font-family:var(--font-serif); font-size:32px; font-weight:400; margin-bottom:16px; text-align:center;">Board Verdict: <span class="badge ${verdictColor}" style="font-size:18px;">${verdict}</span></h3>
          <p style="font-size:14.5px; text-align:center; max-width:580px; margin:0 auto 24px; color:var(--text-secondary);">${verdictDescription}</p>
          
          <div class="grid grid-3" style="margin-bottom:24px;">
            <div class="card text-center" style="text-align:center;">
              <strong>Total Score:</strong>
              <div style="font-size:36px; color:var(--gold); font-family:var(--font-serif); margin-top:8px;">${totalScore} / 80</div>
            </div>
            <div class="card text-center" style="text-align:center;">
              <strong>Green Flags:</strong>
              <div style="font-size:36px; color:var(--emerald); font-family:var(--font-serif); margin-top:8px;">${state.simulator.greenFlags}</div>
            </div>
            <div class="card text-center" style="text-align:center;">
              <strong>Red Flags Triggered:</strong>
              <div style="font-size:36px; color:var(--coral); font-family:var(--font-serif); margin-top:8px;">${state.simulator.redFlags}</div>
            </div>
          </div>
          
          <button class="btn btn-primary" id="btn-restart-sim" style="display:block; margin:0 auto;">Restart Simulation</button>
        </div>
      `;

      const restartBtn = document.getElementById("btn-restart-sim");
      if (restartBtn) {
        restartBtn.onclick = () => {
          state.simulator.active = false;
          setupSimulatorView();
        };
      }
      return;
    }

    const q = questions[currentIdx];
    
    simBox.innerHTML = `
      <div class="sim-stage-indicator">Round ${currentIdx + 1} of 8: ${q.roundName}</div>
      <div class="sim-question-box">${q.question}</div>
      <div class="sim-options-list">
        ${q.options.map((opt, i) => `
          <button class="sim-option-btn" data-index="${i}">${opt.text}</button>
        `).join("")}
      </div>
      <div id="sim-feedback-panel"></div>
    `;

    const optBtns = simBox.querySelectorAll(".sim-option-btn");
    optBtns.forEach(btn => {
      btn.onclick = () => {
        // Disable other options to prevent multi-clicks
        optBtns.forEach(b => b.disabled = true);
        btn.classList.add("selected");

        const optIdx = Number(btn.getAttribute("data-index"));
        const selectedOpt = q.options[optIdx];

        // Update state
        state.simulator.scores.push(selectedOpt.score);
        if (selectedOpt.isRedFlag) state.simulator.redFlags++;
        if (selectedOpt.isGreenFlag) state.simulator.greenFlags++;

        // Render Feedback Panel
        const feedbackPanel = document.getElementById("sim-feedback-panel");
        if (feedbackPanel) {
          const feedbackClass = selectedOpt.isRedFlag ? "red-flag" : "green-flag";
          const flagLabel = selectedOpt.isRedFlag ? "🚨 RED FLAG DETECTED" : "✔ GREEN FLAG ANSWER";
          
          feedbackPanel.innerHTML = `
            <div class="sim-feedback-box ${feedbackClass}">
              <strong>${flagLabel}</strong>
              <p style="margin-top:6px; font-size:13px; color:var(--ink);">${selectedOpt.feedback}</p>
              <button class="btn btn-accent" id="btn-next-question" style="margin-top:14px; font-size:12px; padding:6px 12px;">Proceed to Next Round</button>
            </div>
          `;

          const nextBtn = document.getElementById("btn-next-question");
          if (nextBtn) {
            nextBtn.onclick = () => {
              state.simulator.currentRoundIndex++;
              renderSimulatorQuestion();
            };
          }
        }
      };
    });
  }

  // --- AI Career Coach Chat Interface (Simulation Router) ---
  const chatHistoryEl = document.getElementById("chat-history-box");
  const chatInputEl = document.getElementById("chat-message-input");
  const chatSendBtn = document.getElementById("btn-send-chat");
  const chatChipsEl = document.getElementById("chat-chips-container");

  function renderChat() {
    if (!chatHistoryEl) return;
    
    chatHistoryEl.innerHTML = state.chatHistory.map(msg => `
      <div class="chat-bubble ${msg.sender}">
        ${msg.text}
      </div>
    `).join("");

    chatHistoryEl.scrollTop = chatHistoryEl.scrollHeight;

    // Load chips
    if (chatChipsEl) {
      const suggestions = [
        "What is the ARCH resume format?",
        "Tell me about the 8-round interview loop",
        "How do I architect design tokens?",
        "What skills will be needed by 2030?",
        "Explain compensation in India vs US"
      ];
      chatChipsEl.innerHTML = suggestions.map(s => `
        <button class="chat-suggestion-chip" type="button">${s}</button>
      `).join("");

      // Chip click listeners
      const chips = chatChipsEl.querySelectorAll(".chat-suggestion-chip");
      chips.forEach(chip => {
        chip.onclick = () => {
          handleUserMessage(chip.innerText);
        };
      });
    }
  }

  function handleUserMessage(text) {
    if (!text.trim()) return;
    
    // Add user message
    state.chatHistory.push({ sender: "user", text });
    renderChat();

    if (chatInputEl) chatInputEl.value = "";

    // Generate simulated bot reply based on keywords in the query
    setTimeout(() => {
      const botResponse = generateCoachResponse(text);
      state.chatHistory.push({ sender: "assistant", text: botResponse });
      renderChat();
    }, 600);
  }

  if (chatSendBtn && chatInputEl) {
    chatSendBtn.onclick = () => handleUserMessage(chatInputEl.value);
    chatInputEl.onkeydown = (e) => {
      if (e.key === "Enter") handleUserMessage(chatInputEl.value);
    };
  }

  function generateCoachResponse(query) {
    const q = query.toLowerCase();
    
    if (q.includes("arch") || q.includes("resume")) {
      return "According to <strong>Section 3 (Resume Blueprint)</strong>, the best resumes use the <strong>ARCH Framework</strong>:<br><br>• <strong>Action:</strong> What active step did you take?<br>• <strong>Result:</strong> Quantified outcome (e.g. 47% speed improvement).<br>• <strong>Context:</strong> Product line or constraints (e.g. patient intake flows).<br>• <strong>How:</strong> Tools/technologies (e.g. React/TS tokens).<br><br>Avoid vague phrases like 'responsible for design' and replace them with proof density.";
    }
    
    if (q.includes("interview") || q.includes("rounds") || q.includes("stage")) {
      return "The hiring panel utilizes an <strong>8-Round Interview Framework</strong> to weed out shallow generalists:<br><br>1. Recruiter screen (baseline criteria)<br>2. Leadership screening (mentorship & operation models)<br>3. Product thinking (framework prioritizations)<br>4. UX systems design (component tokens architecture)<br>5. Technical code review (React rendering details & a11y focus)<br>6. Research & analytics (funnel drops diagnoses)<br>7. Executive presenter (financial ROI mapping)<br>8. CEO Bar-raiser (future systems vision).";
    }

    if (q.includes("token") || q.includes("design system") || q.includes("system")) {
      return "For a world-class system, architect a <strong>3-Tier Token Model</strong>:<br><br>• <strong>Tier 1: Global Reference tokens</strong> (raw colors, scales).<br>• <strong>Tier 2: Semantic tokens</strong> (e.g. bg-primary, border-focus). These toggle values based on light/dark/a11y themes.<br>• <strong>Tier 3: Component tokens</strong> (overrides for rare buttons).<br><br>Always document this system dynamically inside Storybook, and attach adoption rate metrics (e.g. 'adopted by 6 product lines, reducing dev handoff by 60%').";
    }

    if (q.includes("2030") || q.includes("future")) {
      return "By 2030, visual mockup creation will be highly automated by AI models. The <strong>essential skills that compound</strong> are:<br><br>1. AI systems orchestrations & agentic loops design.<br>2. Business P&L strategy and CAC/LTV finance.<br>3. Change leadership and diplomacy.<br>4. Deep WCAG AAA accessibility compliance.<br><br>Skills becoming obsolete include handoff-only design and static screen drawing.";
    }

    if (q.includes("salary") || q.includes("compensation") || q.includes("negotiate") || q.includes("pay")) {
      return "Salary benchmarks for this hybrid Principal role are highly competitive:<br><br>• <strong>United States:</strong> $250K – $450K+ total compensation (dominated by equity options at L7/L8 levels).<br>• <strong>India:</strong> ₹80L – ₹1.5Cr+ (driven by global centers and funded AI scaleups in Bangalore/Hyderabad).<br>• <strong>Europe:</strong> £180K – £280K+.<br><br><strong>Negotiation tip:</strong> Leverage your fullstack capability by illustrating how you replace the coordination overhead of 3 separate hires.";
    }

    if (q.includes("prep") || q.includes("roadmap") || q.includes("timeline")) {
      return "I recommend generating a roadmap in the <strong>Roadmap Tab</strong>! The playbook outlines a 90-day plan divided into:<br><br>• <strong>Days 1-30:</strong> Executive positioning narrative formulation.<br>• <strong>Days 31-60:</strong> Proof system engineering (React coding and case study polishing).<br>• <strong>Days 61-90:</strong> Mock interviewing and CEO panel calibrations.";
    }

    if (q.includes("mentor")) {
      return "Human mentorship is critical. Navigate to the <strong>Salary & Brand Tab</strong> to match with mock industry leaders (Siddharth, Elena, Marcus, Aisha) specializing in your focus areas.";
    }

    // Default reply
    return "Interesting question. Grounding this in the **UX Architect Competency Framework**, you must always address your choices through three dimensions: user empathy (evidence research), engineering constraints (frontend feasibility), and business strategy (metrics ROI). How can I help clarify this further?";
  }

  // --- Playbook Content Reader ---
  function setupPlaybookView() {
    const listPane = document.getElementById("playbook-topics-list");
    const contentPane = document.getElementById("playbook-content-body");

    if (!listPane || !contentPane) return;

    // Load chapters
    listPane.innerHTML = db.playbookText.map((ch, idx) => `
      <div class="toc-link ${idx === 0 ? "active" : ""}" data-chid="${ch.id}">${ch.title}</div>
    `).join("");

    // Load default
    contentPane.innerHTML = `
      <h3 style="font-family:var(--font-serif); font-size:28px; font-weight:400; color:var(--gold); border-bottom:1px solid var(--border); padding-bottom:8px;">${db.playbookText[0].title}</h3>
      <div class="playbook-body">${db.playbookText[0].content}</div>
    `;

    // Add click events to TOC links
    const links = listPane.querySelectorAll(".toc-link");
    links.forEach(link => {
      link.onclick = () => {
        links.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
        
        const chid = link.getAttribute("data-chid");
        const chapter = db.playbookText.find(c => c.id === chid);
        if (chapter) {
          contentPane.innerHTML = `
            <h3 style="font-family:var(--font-serif); font-size:28px; font-weight:400; color:var(--gold); border-bottom:1px solid var(--border); padding-bottom:8px;">${chapter.title}</h3>
            <div class="playbook-body">${chapter.content}</div>
          `;
        }
      };
    });
  }

  // --- Market & Personal Brand Tracker Views ---
  function setupMarketView() {
    // 1. Salary Calculator
    const slider = document.getElementById("calc-seniority");
    const market = document.getElementById("calc-market");
    
    const baseText = document.getElementById("calc-base-text");
    const totalText = document.getElementById("calc-total-text");
    
    function calcComp() {
      const step = Number(slider.value); // 1 to 4
      const loc = market.value; // US, India, Europe

      let base = 0;
      let total = 0;
      let symbol = "$";

      const salaries = {
        US: [
          { base: 140000, total: 200000 }, // L6 Staff
          { base: 190000, total: 320000 }, // L7 Principal
          { base: 240000, total: 450000 }, // L8 Director
          { base: 290000, total: 600000 }  // L9 VP/CXO
        ],
        India: [
          { base: 3500000, total: 4500000 },
          { base: 5500000, total: 8000000 },
          { base: 7500000, total: 12000000 },
          { base: 9500000, total: 16000000 }
        ],
        Europe: [
          { base: 850000, total: 120000 },
          { base: 110000, total: 180000 },
          { base: 140000, total: 280000 },
          { base: 180000, total: 380000 }
        ]
      };

      const scale = salaries[loc][step - 1];
      base = scale.base;
      total = scale.total;
      
      if (loc === "India") {
        symbol = "₹";
        baseText.innerText = `${symbol}${(base / 100000).toFixed(0)} Lakh`;
        totalText.innerText = `${symbol}${(total / 100000).toFixed(0)} Lakh - ${(total / 10000000).toFixed(1)} Cr+`;
      } else {
        if (loc === "Europe") symbol = "£";
        baseText.innerText = `${symbol}${base.toLocaleString()}`;
        totalText.innerText = `${symbol}${total.toLocaleString()}+`;
      }
    }

    if (slider && market) {
      slider.oninput = calcComp;
      market.onchange = calcComp;
      calcComp();
    }

    // 2. Personal Brand Checklist & Authority Score
    const checkLI = document.getElementById("brand-li-post");
    const checkEssay = document.getElementById("brand-essay");
    const checkSpeak = document.getElementById("brand-speak");
    const checkOSS = document.getElementById("brand-oss");
    const authScoreNum = document.getElementById("brand-authority-score");

    // Load initial values
    if (checkLI) checkLI.checked = state.brandTracker.linkedinFreq === "weekly";
    if (checkEssay) checkEssay.checked = state.brandTracker.essaysCount > 0;
    if (checkSpeak) checkSpeak.checked = state.brandTracker.speakingDone;
    if (checkOSS) checkOSS.checked = state.brandTracker.ossContribute;

    function calcAuthorityScore() {
      let score = 10; // base profile
      if (checkLI && checkLI.checked) score += 20;
      if (checkEssay && checkEssay.checked) score += 20;
      if (checkSpeak && checkSpeak.checked) score += 30;
      if (checkOSS && checkOSS.checked) score += 20;

      if (authScoreNum) {
        authScoreNum.innerText = `${score}/100`;
      }
      
      // Save state
      state.brandTracker.linkedinFreq = checkLI && checkLI.checked ? "weekly" : "monthly";
      state.brandTracker.essaysCount = checkEssay && checkEssay.checked ? 1 : 0;
      state.brandTracker.speakingDone = checkSpeak && checkSpeak.checked;
      state.brandTracker.ossContribute = checkOSS && checkOSS.checked;
      
      localStorage.setItem("brandTracker", JSON.stringify(state.brandTracker));
    }

    [checkLI, checkEssay, checkSpeak, checkOSS].forEach(el => {
      if (el) el.onchange = calcAuthorityScore;
    });
    calcAuthorityScore();

    // 3. Mentorship Matchmaking
    const mentorContainer = document.getElementById("brand-mentors-list");
    if (mentorContainer) {
      mentorContainer.innerHTML = db.mentors.map(m => `
        <div class="card" style="padding:16px; display:flex; flex-direction:column; justify-content:space-between; gap:12px;">
          <div>
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:10px;">
              <div style="width:40px; height:40px; border-radius:50%; background:var(--border-accent); display:grid; place-items:center; font-weight:800; font-size:14px; color:var(--gold);">${m.avatar}</div>
              <div>
                <strong style="font-size:14px; display:block;">${m.name}</strong>
                <span style="font-size:11px; color:var(--text-muted);">${m.title}</span>
              </div>
            </div>
            <p style="font-size:12px; line-height:1.5; color:var(--text-secondary); margin-bottom:6px;">${m.bio}</p>
            <p style="font-size:11px; color:var(--text-muted);"><strong>Availability:</strong> ${m.availability}</p>
          </div>
          <button class="btn btn-accent btn-match" data-mentor="${m.name}" style="padding:6px 12px; font-size:11px; width:100%;">Request Mentorship</button>
        </div>
      `).join("");

      // Event listener for request matchmaking
      const matchBtns = mentorContainer.querySelectorAll(".btn-match");
      matchBtns.forEach(btn => {
        btn.onclick = () => {
          const mentorName = btn.getAttribute("data-mentor");
          showMatchModal(mentorName);
        };
      });
    }

    // 4. Learning Checklist & Certifications Tracker
    const learningContainer = document.getElementById("brand-learning-list");
    if (learningContainer) {
      const booksHTML = db.learningCatalog.books.map((b, i) => {
        const key = `learning-book-${i}`;
        const done = state.learningProgress[key] === "done";
        return `
          <button class="checklist-item ${done ? "done" : ""}" data-learnkey="${key}" style="padding:8px 12px; margin-bottom:6px;">
            <div class="checkbox-visual">✔</div>
            <p style="font-size:12px;"><strong>${b.title}</strong> by ${b.author} (${b.duration})</p>
          </button>
        `;
      }).join("");

      const coursesHTML = db.learningCatalog.courses.map((c, i) => {
        const key = `learning-course-${i}`;
        const done = state.learningProgress[key] === "done";
        return `
          <button class="checklist-item ${done ? "done" : ""}" data-learnkey="${key}" style="padding:8px 12px; margin-bottom:6px;">
            <div class="checkbox-visual">✔</div>
            <p style="font-size:12px;"><strong>${c.title}</strong> - ${c.provider} (${c.duration})</p>
          </button>
        `;
      }).join("");

      learningContainer.innerHTML = `
        <div class="grid grid-2">
          <div>
            <h4 style="font-size:13px; font-weight:800; text-transform:uppercase; color:var(--text-muted); margin-bottom:10px;">Recommended Books</h4>
            ${booksHTML}
          </div>
          <div>
            <h4 style="font-size:13px; font-weight:800; text-transform:uppercase; color:var(--text-muted); margin-bottom:10px;">Courses & Certs</h4>
            ${coursesHTML}
          </div>
        </div>
      `;

      // Listeners
      const learnBtns = learningContainer.querySelectorAll(".checklist-item[data-learnkey]");
      learnBtns.forEach(btn => {
        btn.onclick = () => {
          const key = btn.getAttribute("data-learnkey");
          const done = btn.classList.toggle("done");
          state.learningProgress[key] = done ? "done" : "";
          localStorage.setItem("learningProgress", JSON.stringify(state.learningProgress));
        };
      });
    }
  }

  // --- Modal Helpers ---
  function showMatchModal(mentorName) {
    const modal = document.getElementById("match-modal");
    const body = document.getElementById("match-modal-body");
    
    if (modal && body) {
      body.innerHTML = `
        <p style="font-size:14px; margin-bottom:16px;">We are sending your executive resume portfolio score of <strong>${getOverallReadiness()}%</strong> to <strong>${mentorName}</strong> for approval. They will review your goals and verify availability.</p>
        <div class="card border-teal font-sm" style="background:rgba(36, 138, 88, 0.04); border-color:var(--emerald);">
          <strong>✔ Match Request Dispatched Successfully</strong>
          <p style="margin-top:4px;">A notification alert will show up on your dashboard once ${mentorName.split(" ")[0]} schedules your first Zoom strategy sync.</p>
        </div>
      `;
      modal.classList.add("active");
      
      const closeBtns = modal.querySelectorAll("[data-close-modal]");
      closeBtns.forEach(b => {
        b.onclick = () => modal.classList.remove("active");
      });
    }
  }

  // --- Application Initial Nav Render ---
  switchTab("dashboard");
});
