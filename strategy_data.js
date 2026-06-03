/**
 * strategy_data.js
 * Core database containing the 10 strategy sections, skills framework, 
 * interview simulator, mentors database, and learning catalog.
 */

window.STRATEGY_DATA = {
  // 1. Job Description Details
  jobDescription: {
    title: "Principal UX Architect & Full-Stack Product Leader",
    reportingLine: "Reports directly to the CPO or VP of Product Experience",
    compensationUS: "$250,000 – $450,000+ Total Compensation",
    compensationIndia: "₹80L – ₹1.5Cr+ Total Compensation",
    responsibilities: [
      {
        area: "Product & UX Strategy (30%)",
        items: [
          "Define and own the UX vision and multi-year experience roadmap aligned to business OKRs.",
          "Partner with CPO/VP Product on product strategy, market opportunity assessment, and competitive differentiation.",
          "Lead discovery sprints: customer interviews, JTBD analysis, competitive UX audits, and opportunity mapping.",
          "Translate business requirements into user-centered product specifications with measurable success criteria."
        ]
      },
      {
        area: "Experience Architecture & Design (30%)",
        items: [
          "Architect information systems, navigation patterns, and interaction models for complex enterprise platforms.",
          "Lead design from concept sketches through high-fidelity prototypes to production-ready specifications.",
          "Own the design system: component architecture, design tokens, documentation, governance, and evolution.",
          "Ensure WCAG 2.2 AAA compliance across all product surfaces with accessibility-first design practices."
        ]
      },
      {
        area: "Front-End Technical Leadership (20%)",
        items: [
          "Architect component libraries in React/Next.js with TypeScript, ensuring design-system-to-code fidelity.",
          "Define front-end architecture patterns: state management, routing, API integration, and performance budgets.",
          "Code review front-end PRs for accessibility (ARIA), performance (Core Web Vitals), and design accuracy.",
          "Leverage AI tools (Claude Code, GitHub Copilot) to accelerate the design-to-production pipeline."
        ]
      },
      {
        area: "Team Leadership & Design Operations (20%)",
        items: [
          "Lead and mentor a team of 4–8 designers, researchers, and front-end developers.",
          "Define hiring standards, interview processes, and career growth frameworks for the design org.",
          "Establish DesignOps: tooling standards, file organization, component governance, and sprint rituals.",
          "Drive cross-functional collaboration with PM, Engineering, QA, Research, and Data Science."
        ]
      }
    ]
  },

  // 2. Skill Matrix (6 Pillars & Subskills for Skill Assessment Engine)
  skillsMatrix: [
    {
      id: "product",
      name: "Product Strategy & Growth",
      description: "Defining product vision, discovery, roadmapping, metrics, and optimization funnels.",
      subskills: [
        { id: "prod_strategy", name: "Product Strategy & Vision", desc: "Aligning user needs with long-term business goals and market opportunities." },
        { id: "prod_discovery", name: "Product Discovery & Ideation", desc: "Running customer validation, opportunity mapping, and hypothesis testing." },
        { id: "prod_roadmap", name: "Roadmapping & Prioritization", desc: "Using RICE, Kano, or WSJF models to establish high-impact release plans." },
        { id: "prod_analytics", name: "Product Growth & Analytics", desc: "Analyzing conversion funnels, onboarding, activation, retention, and LTV." }
      ]
    },
    {
      id: "ux",
      name: "UX Architecture & Research",
      description: "Information architecture, service design, user research methodologies, and interaction logic.",
      subskills: [
        { id: "ux_research", name: "UX Research & Synthesis", desc: "Conducting qualitative interviews, usability tests, and quantitative survey analysis." },
        { id: "ux_ia", name: "Information Architecture", desc: "Structuring taxonomies, site maps, layouts, and complex data relationships." },
        { id: "ux_interaction", name: "Interaction & Service Design", desc: "Designing responsive user journeys, task flows, and blueprinting service touchpoints." },
        { id: "ux_accessibility", name: "Accessibility (WCAG 2.2 AAA)", desc: "Designing for screen readers, keyboard-only access, focus rings, and ARIA roles." }
      ]
    },
    {
      id: "technical",
      name: "Front-End Engineering & Systems",
      description: "Writing and reviewing production-ready React/TypeScript, CSS layouts, and system architectures.",
      subskills: [
        { id: "tech_react", name: "React, Next.js & TS", desc: "Architecting component lifecycles, state systems (Zustand, Context), and strong typing." },
        { id: "tech_styling", name: "Semantic HTML & Vanilla CSS/Grid", desc: "Structuring lightweight layouts, media queries, flexbox, grid, and animations." },
        { id: "tech_ds_code", name: "Design System Implementation", desc: "Building component libraries, mapping tokens to CSS variables, and Storybook documentation." },
        { id: "tech_performance", name: "Performance & Code Quality", desc: "Optimizing Core Web Vitals (LCP, CLS, INP) and review practices." }
      ]
    },
    {
      id: "ai",
      name: "AI Strategy & Product Design",
      description: "Generative AI applications, agentic system flows, prompt engineering, and human-AI design paradigms.",
      subskills: [
        { id: "ai_product", name: "AI Product Strategy", desc: "Identifying viable ML/LLM integrations, custom models vs API, and ROI modeling." },
        { id: "ai_design", name: "Human-AI Interaction Design", desc: "Creating interfaces for prompt inputs, streaming outputs, recovery, and agent states." },
        { id: "ai_engineering", name: "Prompt Engineering & Workflows", desc: "Developing system instructions, prompt orchestration, and leveraging agentic networks." },
        { id: "ai_governance", name: "AI Ethics & Governance", desc: "Managing model hallucinations, user privacy, compliance, bias, and output safety." }
      ]
    },
    {
      id: "business",
      name: "Business Strategy & Finance",
      description: "P&L understanding, unit economics, market expansion, and digital transformation strategy.",
      subskills: [
        { id: "biz_finance", name: "P&L & Unit Economics", desc: "Understanding margins, budgets, CAC-to-LTV ratios, and experience ROI." },
        { id: "biz_analysis", name: "Market & Competitive Analysis", desc: "TAM/SAM sizing, pricing strategies, and tracking competitor UX updates." },
        { id: "biz_dx", name: "Digital Transformation", desc: "Advising legacy enterprises on modern tooling, Agile, and product-led structures." }
      ]
    },
    {
      id: "leadership",
      name: "Leadership & Communication",
      description: "Mentoring, team building, executive stakeholder negotiation, and leading organizational change.",
      subskills: [
        { id: "lead_stakeholder", name: "Executive Stakeholder Management", desc: "Aligning C-suite expectations, defending design budgets, and board presenting." },
        { id: "lead_mentorship", name: "Mentorship & Growth", desc: "Developing junior and senior staff, establishing career ladders and reviews." },
        { id: "lead_change", name: "Change & Conflict Resolution", desc: "Navigating design-engineering friction and restructuring design operations." }
      ]
    }
  ],

  // 3. Interview Simulator Database (8 Rounds, Multiple choice questions with details)
  interviewQuestions: [
    {
      roundId: "recruiter",
      roundName: "1. Recruiter Screen",
      goal: "Validate baseline requirements, high-level compensation expectations, and role alignment.",
      question: "The recruiter asks: 'This is a hybrid role requiring design strategy AND front-end coding in React/TypeScript. Many designers only draw screens. Why do you fit this dual profile?'",
      options: [
        {
          text: "I am a full-stack experience leader. I don't just sketch layouts; I architect design tokens, review React pull requests for accessibility, and make sure designs scale. I eliminate the translation gap between design and dev, accelerating cycle times by 40%.",
          score: 10,
          feedback: "EXCELLENT. Grounded in business impact (cycle times) and specific outputs (tokens, pull requests).",
          isGreenFlag: true
        },
        {
          text: "I've done HTML/CSS coding in bootcamps, and I'm very passionate about learning React. I believe a good designer should understand the developers' struggles, though I prefer to focus mostly on visual craft in Figma.",
          score: 5,
          feedback: "AVERAGE. Shows interest, but lacks senior engineering credibility. The CEO panel seeks immediate production capability.",
          isRedFlag: false
        },
        {
          text: "I am primarily a designer. I think coding is a distraction from strategic thinking. However, I can write basic React code if absolutely required by the engineering team.",
          score: 2,
          feedback: "RED FLAG. Defensive stance on code. Demonstrates handoff-only thinking which is an instant no-hire for this unicorn role.",
          isRedFlag: true
        }
      ]
    },
    {
      roundId: "leadership",
      roundName: "2. Leadership Screening",
      goal: "Assess team building, mentorship methods, and cross-functional operations.",
      question: "The UX Director asks: 'An Engineering Lead wants to bypass a research sprint to ship a feature faster, claiming user feedback can be gathered post-launch. How do you resolve this?'",
      options: [
        {
          text: "I advocate for a hybrid 'continuous discovery' sprint. We will run 3 rapid user interviews in parallel with their initial database setup. I show them that fixing a flawed user journey post-launch is 10x more expensive than validating it now.",
          score: 10,
          feedback: "EXCELLENT. Demonstrates collaborative negotiation, speed awareness, and speaks in engineering/business metrics (10x cost ratio).",
          isGreenFlag: true
        },
        {
          text: "I tell them I will not sign off on the design if we bypass research. Design quality must be protected at all costs, and shipping without research goes against our core company values.",
          score: 4,
          feedback: "RED FLAG. Creating silos and escalating tension. This role demands leadership maturity, not rigid procedural gatekeeping.",
          isRedFlag: true
        },
        {
          text: "I agree to bypass the research to maintain team harmony, and make a plan to track Amplitude analytics and heatmaps immediately after launch to catch issues.",
          score: 6,
          feedback: "WEAK. Avoids conflict but sacrifices user validation, which could lead to massive rework costs.",
          isRedFlag: false
        }
      ]
    },
    {
      roundId: "product",
      roundName: "3. Product Thinking",
      goal: "Evaluate product discovery, growth prioritizations, and metric tracking.",
      question: "The VP of Product asks: 'We want to improve our enterprise onboarding conversion rate. What framework do you use to prioritize features?'",
      options: [
        {
          text: "I map the onboarding journey via JTBD (Jobs-to-be-Done) to locate where users fail to reach their 'Aha!' moment. Then I prioritize solutions using the RICE framework, weighting heavily on metric impact (activation rate) and ease of implementation.",
          score: 10,
          feedback: "EXCELLENT. Combines customer-centric models (JTBD/Aha) with rigorous, objective prioritization (RICE) and business focus.",
          isGreenFlag: true
        },
        {
          text: "I would hold a massive brainstorming session with designers and developers, create visual mockups of 10 onboarding ideas, and let the stakeholders vote on their favorites in a workshop.",
          score: 3,
          feedback: "RED FLAG. Relies on subjective opinion (stakeholder voting) rather than metrics and data-driven prioritization frameworks.",
          isRedFlag: true
        },
        {
          text: "I prioritize building a dashboard with analytics tools (Amplitude/FullStory) to observe user drops. Once we collect 2 months of data, I will design a single onboarding tutorial flow.",
          score: 7,
          feedback: "GOOD. Strong focus on data, but lacks proactive discovery sprints and a clear prioritisation strategy.",
          isRedFlag: false
        }
      ]
    },
    {
      roundId: "ux_architecture",
      roundName: "4. UX Architecture & Systems",
      goal: "Review information architecture, design system tokens, and accessibility scaling.",
      question: "The Design Systems Lead asks: 'How would you architect a design system token structure to support both dark mode and high-contrast accessibility?'",
      options: [
        {
          text: "I set up a 3-tier token hierarchy: Tier 1 Global Reference tokens (base palettes), Tier 2 Semantic tokens (e.g. text-primary, bg-interactive) that change value based on theme, and Tier 3 Component-specific tokens for rare overrides.",
          score: 10,
          feedback: "EXCELLENT. Demonstrates advanced systems design principles using clear reference/semantic layers, allowing scaling and easy accessibility updates.",
          isGreenFlag: true
        },
        {
          text: "I would write different CSS files for each theme with hardcoded hexadecimal colors. This keeps the design and style code separated and makes it easy for developers to copy-paste style rules.",
          score: 3,
          feedback: "RED FLAG. Flat, hardcoded CSS styles are unscalable and cause theme fragmentation in modern web apps.",
          isRedFlag: true
        },
        {
          text: "I define a list of 20 colors in a global Figma file, map them directly to components, and ask developers to manually swap colors in React depending on the user's settings.",
          score: 6,
          feedback: "AVERAGE. Basic understanding of color mappings, but lacks structured token logic and developer automation.",
          isRedFlag: false
        }
      ]
    },
    {
      roundId: "ai_strategy",
      roundName: "5. AI Strategy & Design",
      goal: "Assess AI product patterns, agent state designs, and ethical governance.",
      question: "The CTO asks: 'We are building an AI agent that runs complex background workflows. How do you design the interface to maintain user trust and control?'",
      options: [
        {
          text: "I design for 'controlled transparency': 1. Clear agent states (idle, reasoning, working), 2. Live progress logs showing source documents accessed, 3. Multi-level confirmation gates for high-stakes actions, and 4. Inline feedback mechanisms.",
          score: 10,
          feedback: "EXCELLENT. Captures critical AI design heuristics: state visibility, grounding, user consent gates, and feedback loops.",
          isGreenFlag: true
        },
        {
          text: "I hide the agent complexity behind a simple loading spinner and run the entire background flow in one go. Explaining the reasoning states or source documents would only overwhelm the user.",
          score: 4,
          feedback: "RED FLAG. Complete lack of transparency. Fosters distrust, especially when background agent errors occur.",
          isRedFlag: true
        },
        {
          text: "I build a conversational chatbot where the AI reports everything it does in real-time chat messages, allowing the user to reply and guide it at every single minor step.",
          score: 7,
          feedback: "GOOD. High user control, but causes severe conversation fatigue for automated, high-volume tasks.",
          isRedFlag: false
        }
      ]
    },
    {
      roundId: "tech_evaluation",
      roundName: "6. Technical Evaluation",
      goal: "Test code proficiency, component optimization, and accessibility compliance.",
      question: "The Principal Engineer asks: 'You notice a custom React dropdown component is slow to render and does not support screen readers. How do you remediate it?'",
      options: [
        {
          text: "I refactor it to use a semantic list structure, add ARIA attributes (role='listbox', aria-expanded, aria-activedescendant), wire up keydown handlers (ArrowUp/Down, Enter, Escape) for focus management, and wrap children in React.memo() to prevent unnecessary re-renders.",
          score: 10,
          feedback: "EXCELLENT. Complete solution addressing semantic HTML, ARIA compliance, keyboard focus loops, and rendering performance.",
          isGreenFlag: true
        },
        {
          text: "I replace the custom component with a standard browser `<select>` tag. It automatically handles accessibility and renders fast, even if we lose all visual design customizations.",
          score: 6,
          feedback: "PRAGMATIC. Solve a11y instantly, but ignores the design system requirements for premium custom interfaces.",
          isRedFlag: false
        },
        {
          text: "I write a CSS focus outline overlay to show screen focus and use a setTimeout defer logic to delay option rendering until the user clicks, resolving rendering lag.",
          score: 3,
          feedback: "RED FLAG. Deferring layout doesn't fix accessibility and overlays fail screen readers entirely.",
          isRedFlag: true
        }
      ]
    },
    {
      roundId: "executive_presentation",
      roundName: "7. Executive Presentation",
      goal: "Validate P&L understanding, digital transformation influence, and strategic communication.",
      question: "The CFO asks: 'The redesign proposal for our client dashboard costs $150K in development hours. How do you justify this investment in terms of business metrics?'",
      options: [
        {
          text: "I justify it through cost reduction and revenue retention: The redesign targets our top scheduling drop-off point. Reducing drop-offs by 15% will yield an estimated $320K in annual retained ARR. Additionally, resolving navigation issues will cut customer service tickets by 25%, saving $45K in support costs.",
          score: 10,
          feedback: "EXCELLENT. Directly links UX changes to concrete financial outcomes: ARR, retention, support cost savings, demonstrating clear ROI.",
          isGreenFlag: true
        },
        {
          text: "I show that the current dashboard has a low usability score of 62/100. Investing in this redesign will elevate our brand aesthetic, make the interface look modern, and increase our Net Promoter Score (NPS) significantly.",
          score: 5,
          feedback: "AVERAGE. Visual look and NPS are valuable, but CFOs prioritize concrete financial metrics over soft experience scores.",
          isRedFlag: false
        },
        {
          text: "I explain that our design system is outdated, and engineers are wasting hours writing custom styles. We must rebuild it to clean up technical debt, regardless of short-term revenue impact.",
          score: 4,
          feedback: "RED FLAG. Fails to frame the project around customer value or business returns, appearing purely internal-facing.",
          isRedFlag: true
        }
      ]
    },
    {
      roundId: "ceo_round",
      roundName: "8. CEO Bar-Raiser",
      goal: "Assess vision, cultural integrity, future-proofing mindset, and bar-raising capabilities.",
      question: "The CEO asks: 'Where is the field of UX and Product leadership heading by 2030, and how do you intend to stay in the top 1% of leaders?'",
      options: [
        {
          text: "By 2030, screen-level assembly will be mostly automated by AI. The elite leader must evolve from a 'pixel-pusher' into a 'systems orchestrator' — blending AI prompt architectures, service blueprinting, and ethical AI governance. I stay in the top 1% by continuously shipping code, writing thought leadership, and centering every AI advancement on human outcomes.",
          score: 10,
          feedback: "EXCELLENT. Inspiring, strategically accurate, future-proofed, and emphasizes a commitment to ongoing hands-on craft and leadership.",
          isGreenFlag: true
        },
        {
          text: "I believe the fundamentals will never change. Visual design and screen-level layouts will always be the core of UX. I will stay ahead by mastering the latest features of Figma and leading team brainstorms.",
          score: 4,
          feedback: "RED FLAG. Obsolete mindset. Ignores AI disruption and the convergence of design, code, and product systems.",
          isRedFlag: true
        },
        {
          text: "AI will replace most product management and coding tasks, so I will focus on becoming an expert prompt engineer. I will write instructions for AI models to design and code products automatically.",
          score: 6,
          feedback: "AVERAGE. Understands AI automation, but overestimates model independence and abdicates human judgment and taste.",
          isRedFlag: false
        }
      ]
    }
  ],

  // 4. Mock Mentors Database
  mentors: [
    {
      id: "ment_1",
      name: "Siddharth Sen",
      title: "VP of Product Experience @ FinTech Scaleup",
      location: "Bangalore, India",
      domain: "Product Strategy & Business",
      bio: "Former Lead PM at Google. Specializes in mapping UX metrics directly to business P&L and navigating enterprise product organizations.",
      avatar: "SS",
      availability: "Tuesdays, 6 PM - 8 PM IST"
    },
    {
      id: "ment_2",
      name: "Elena Rostova",
      title: "Principal Design Systems Architect @ Spotify",
      location: "Stockholm, Sweden",
      domain: "Front-End Engineering & Systems",
      bio: "Creator of multiple open-source token libraries. Expert in React components, WCAG 2.2 AAA accessibility compliance, and design-dev operations.",
      avatar: "ER",
      availability: "Thursdays, 2 PM - 5 PM CET"
    },
    {
      id: "ment_3",
      name: "Marcus Vance",
      title: "Chief Experience Officer @ HealthTech Corp",
      location: "San Francisco, USA",
      domain: "UX Architecture & Research",
      bio: "20+ years leading HIPAA-compliant health applications. Master of complex service blueprints, contextual research, and information architecture.",
      avatar: "MV",
      availability: "Mondays, 9 AM - 11 AM PST"
    },
    {
      id: "ment_4",
      name: "Aisha Al-Mansoori",
      title: "Head of AI Product Strategy @ Hub71 Startup",
      location: "Abu Dhabi, UAE",
      domain: "AI Strategy & Product Design",
      bio: "Focuses on building trust in agentic workflows. Expert in ML interface parameters, streaming outputs, and ethical AI governance models.",
      avatar: "AM",
      availability: "Wednesdays, 4 PM - 6 PM GST"
    }
  ],

  // 5. Readings, Courses & Certifications Catalog
  learningCatalog: {
    books: [
      { title: "Continuous Discovery Habits", author: "Teresa Torres", category: "Product", duration: "10-12 hours", impact: "High - Essential for modern validation strategies" },
      { title: "Design Systems", author: "Alla Kholmatova", category: "UX/Systems", duration: "8 hours", impact: "High - Key for understanding component governance" },
      { title: "Refactoring UI", author: "Steve Schoger & Adam Wathan", category: "Visual Design", duration: "4 hours", impact: "Medium - Practical visual rules for programmers" },
      { title: "Designing with Data", author: "Rochelle King et al.", category: "Business/Research", duration: "8-10 hours", impact: "High - Aligning design with conversion rates" }
    ],
    courses: [
      { title: "Interaction Design Specialization", provider: "UC San Diego / Coursera", category: "UX Design", duration: "6 months", rating: "4.8/5" },
      { title: "Advanced React & Next.js", provider: "Frontend Masters", category: "Engineering", duration: "30 hours", rating: "4.9/5" },
      { title: "AI Product Management", provider: "Udacity", category: "AI Strategy", duration: "2 months", rating: "4.7/5" }
    ],
    certifications: [
      { title: "Certified Usability Analyst (CUA)", provider: "Human Factors International (HFI)", cost: "Premium", focus: "Cognitive psychology, user testing, design science" },
      { title: "Interaction Design Certifications (Portfolio)", provider: "Interaction Design Foundation (IxDF)", cost: "Affordable", focus: "Comprehensive UX patterns and HCI guidelines" },
      { title: "Certified Scrum Product Owner (CSPO)", provider: "Scrum Alliance", cost: "Moderate", focus: "Agile rituals, product backlogs, prioritization" }
    ]
  },

  // 6. Resume & Portfolio Calibration Guides (Used for side-by-side tabs)
  calibrationGuides: {
    resume: [
      {
        level: "Average Resume",
        style: "border-left: 3px solid var(--muted);",
        description: "Focuses on activities, responsibilities, and generic design tool names.",
        example: "• Designed user interfaces for the patient portal using Figma.\n• Collaborated with product managers and engineers on scheduling features.\n• Conducted user interviews and gathered research feedback.\n• Maintained the company UI library and added new button styles."
      },
      {
        level: "Strong Resume",
        style: "border-left: 3px solid var(--teal);",
        description: "Adds basic metrics and references to collaboration methods.",
        example: "• Redesigned scheduling flows, improving registration conversion by 12% over 3 months.\n• Partnered with engineers to adopt React design patterns, reducing UI bugs by 20%.\n• Ran usability studies with 15 users to validate portal features and empty states.\n• Evolved the design system styles, documenting component rules in ZeroHeight."
      },
      {
        level: "Top 0.1% Resume (Unicorn Standard)",
        style: "border-left: 3px solid var(--gold);",
        description: "Uses ARCH framework (Action-Result-Context-How). Rich density of proof.",
        example: "• Architected Patient Scheduling portal (Redesign) using advanced React/TS component APIs, reducing task drop-off by 47% and support tickets by 32% (measured via Amplitude over 6 months).\n• Built and governed 3-tier token-based design system adopted by 6 product lines, reducing design-to-development handoff overhead by 60% and UI layout deviation to 0%.\n• Spearheaded WCAG 2.2 AAA accessibility compliance audits across all clinical surfaces, training 20 engineers and achieving zero accessibility exceptions in third-party audits.\n• Designed background patient intake AI agent flows with reasoning state logs, increasing onboarding form completions by 35% and improving customer NPS from 40 to 65."
      }
    ],
    portfolio: [
      {
        level: "Average Portfolio Case Study",
        description: "Standard step-by-step documentation. Too linear and predictable.",
        checklist: [
          "❌ Messy wireframe photos are skipped; only showing perfect final mockups.",
          "❌ Standard personas with fake user names and stock photos.",
          "❌ No mention of business metrics, development trade-offs, or engineering scope."
        ]
      },
      {
        level: "Top 0.1% Case Study (IMPACT Framework)",
        description: "Structured around Intent, Method, Process, Architecture, Craft, and Transformation.",
        checklist: [
          "✅ Shows initial whiteboard sketches, failed directions, and pivot reasons.",
          "✅ Includes React code block examples for components or token mapping logic.",
          "✅ Outlines accessibility checklist items (keyboard states, focus outlines, ARIA roles).",
          "✅ Quantified business results verified by data tools (Amplitude/Funnel charts)."
        ]
      }
    ]
  },

  // 7. Executive Strategy Hub Playbook Text (The core consulting report text formatted)
  playbookText: [
    {
      id: "ch_1",
      title: "The CEO Hiring Panel Mandate",
      content: `
        <p>This playbook is written from the collective perspective of technology leaders who convene to hire once-in-a-generation product experience architects. They look beyond standard visuals to evaluate candidates across three intersections: <strong>Product Judgment</strong> (business outcome focus), <strong>UX Architecture</strong> (managing complexity), and <strong>Frontend Credibility</strong> (ability to build).</p>
        
        <div class="callout border-gold">
          <strong>The CEO Panel Mandate:</strong> "We do not hire designers who code, or PMs who sketch. We hire leaders who think in systems, ship with extreme craft, and make choices based on empirical evidence. This person acts as the direct bridge between the executive boardroom and the technical build."
        </div>

        <h4 class="text-gold uppercase tracking">Hiring Mindsets represented in the Panel:</h4>
        <div class="grid grid-3">
          <div class="card font-sm">
            <strong>🔵 The Product Visionary (Google)</strong>
            <p class="text-muted">Data-driven strategy, scale-first thinking, LLM integration, and OKRs. Expects you to design for billions of concurrent actions.</p>
          </div>
          <div class="card font-sm">
            <strong>⚪ The Craft Perfectionist (Apple)</strong>
            <p class="text-muted">Obsessed with pixel-level detail, emotional interaction design, micro-animations, and hardware-software harmony.</p>
          </div>
          <div class="card font-sm">
            <strong>🟢 The Platform Architect (Microsoft)</strong>
            <p class="text-muted">Enterprise scale engineering, developer experience (DX), component systems, and secure cloud architectures.</p>
          </div>
        </div>
      `
    },
    {
      id: "ch_2",
      title: "Why This Hybrid Role Exists",
      content: `
        <p>Traditional organization models segregate Product Management, UX Design, and Engineering into distinct silos. This separation introduces handoff friction, mismatched incentives, and slowed release velocity. Studies indicate product teams lose 40% of their operational cycle time translating designs into developer code.</p>
        
        <h4 class="text-gold uppercase tracking">Market Drivers in 2026:</h4>
        <ul>
          <li><strong>The Handoff Bottleneck:</strong> Companies cannot afford the latency of standard Figma-to-code translations. A leader who bridges this natively solves the issue.</li>
          <li><strong>The AI Acceleration:</strong> Generative AI enables rapid screen assembly, allowing a single strategic leader to design, prototype, and refine code in minutes instead of weeks.</li>
          <li><strong>Talent Scarcity:</strong> Less than 0.1% of tech leaders are fluent across business modeling, user research, accessibility, visual design, and React scripting, making this hybrid profile exceptionally rare.</li>
        </ul>
      `
    },
    {
      id: "ch_3",
      title: "Competency Scoring Rubric",
      content: `
        <p>The panel grades candidates on a 1-5 scale across six competencies. The target threshold for this Principal hire is an average score of 4+ across all columns. Scoring less than 4 in any individual column signals a default 'no-hire' decision.</p>
        
        <table class="strategy-table">
          <thead>
            <tr>
              <th>Score</th>
              <th>Band</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>5</strong></td>
              <td><span class="badge badge-gold">World-Class</span></td>
              <td>Recognized industry authority. Contributes to open source systems, speaks at global conferences, or files design patents.</td>
            </tr>
            <tr>
              <td><strong>4</strong></td>
              <td><span class="badge badge-teal">Expert</span></td>
              <td>Operates fully independently, mentors senior staff, and has shipped large-scale features with verified metrics.</td>
            </tr>
            <tr>
              <td><strong>3</strong></td>
              <td><span class="badge badge-blue">Proficient</span></td>
              <td>Solid practitioner. Delivers robust layouts, conducts standard tests, writes basic code with team guidance.</td>
            </tr>
            <tr>
              <td><strong>2 / 1</strong></td>
              <td><span class="badge badge-coral">Developing</span></td>
              <td>Lacks hands-on depth, requires active monitoring, or displays handoff-only patterns.</td>
            </tr>
          </tbody>
        </table>
      `
    },
    {
      id: "ch_4",
      title: "Resume & Portfolio Architecture",
      content: `
        <p>World-class resumes reject vague descriptions in favor of clear outcome evidence. The resume must be structured around the <strong>ARCH</strong> model: <em>Action, Result, Context, and How</em>.</p>
        
        <h4 class="text-gold uppercase tracking">The ARCH Framework Example:</h4>
        <div class="card">
          <p class="font-mono font-sm">"Architected patient portals (Redesign) using CSS Variables and React Storybook [How], compressing user task drop-off by 47% [Result] within clinical scheduling contexts [Context] by replacing hardcoded styles [Action]."</p>
        </div>

        <h4 class="text-gold uppercase tracking">The IMPACT Case Study Strategy:</h4>
        <p>Portfolios should include 5 to 7 high-density case studies organized via the <strong>IMPACT</strong> model:</p>
        <ol>
          <li><strong>Intent:</strong> Define the core user pain point and the business metrics at stake.</li>
          <li><strong>Method:</strong> Detail the discovery sprints, metrics tracking, and research samples.</li>
          <li><strong>Process:</strong> Highlight iterations, whiteboard drafts, user tests, and failed hypotheses.</li>
          <li><strong>Architecture:</strong> Map out user journeys, navigation matrices, accessibility tags, and system logic.</li>
          <li><strong>Craft:</strong> Display high-fidelity layouts, motion ease curves, states (hover, focus, errors), and tokens.</li>
          <li><strong>Transformation:</strong> Present concrete metrics (Amplitude funnels, ARR, NPS) post-implementation.</li>
        </ol>
      `
    },
    {
      id: "ch_5",
      title: "Interview Cracking Roadmap",
      content: `
        <p>Mastering the 8-round interview loop requires structured preparation. We advocate for a 12-week preparation cycle:</p>
        
        <h4 class="text-gold uppercase tracking">Preparation Cycle Phases:</h4>
        <ul>
          <li><strong>Weeks 1–4: Foundation</strong> — Select and write 3 flagship case studies using the IMPACT model. Diagram your design tokens and structure a clean Figma library.</li>
          <li><strong>Weeks 5–8: Execution</strong> — Practice live whiteboarding and SPADE strategy cases. Refactor React components to pass WCAG 2.2 AA audits.</li>
          <li><strong>Weeks 9–12: Calibration</strong> — Record yourself delivering 90-second narratives. Run mock interviews covering leadership, engineering conflicts, and CEO bar-raising questions.</li>
        </ul>
      `
    },
    {
      id: "ch_6",
      title: "Future-Proofing for 2030",
      content: `
        <p>The tech landscape by 2030 will reward leaders who operate at the interface of human intent, AI agency, and scalable engineering system architectures.</p>
        
        <div class="grid grid-3">
          <div class="card border-teal font-sm">
            <strong>📈 Compounding Skills</strong>
            <p class="text-muted">AI strategy, agentic systems design, data literacy, service mapping, and executive stakeholder alignment.</p>
          </div>
          <div class="card border-coral font-sm">
            <strong>📉 Declining Skills</strong>
            <p class="text-muted">Static screen assembly, Figma tool-only specialization, unvalidated personas, and handoff-only processes.</p>
          </div>
          <div class="card border-gold font-sm">
            <strong>👑 Human Differentiators</strong>
            <p class="text-muted">Design taste, product intuition, user empathy, team conflict navigation, and strategic business risk management.</p>
          </div>
        </div>
      `
    }
  ]
};
