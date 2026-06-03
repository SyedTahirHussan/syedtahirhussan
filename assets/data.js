/* ============================================================
   DATA — Syed Tahir Hussan
   ============================================================ */
window.STH = {
  experience: [
    { role:"Project Manager", co:"STH Research Center for Advanced Technologies", loc:"Remote", date:"Jan 2021 — Present", span:"5+ yrs", pts:[
      "Initiated and led the development of innovative AI-powered software products from concept to launch.",
      "Designed technical architecture, selected technology stacks, and supervised codebase integrity across all phases.",
      "Managed cross-functional teams — defining scope, schedules, and technical milestones for successful delivery.",
      "Established best practices across software, web, Android, iOS, macOS, and e-commerce development.",
      "Conducted technical research, performance audits, and competitive benchmarking to steer strategic direction."
    ]},
    { role:"Senior Software Engineering Manager", co:"Hampson", loc:"China", date:"2019 — 2021", span:"3 yrs", pts:[
      "Oversaw engineering teams designing and delivering complex software aligned with business objectives.",
      "Defined and implemented best practices for software architecture, quality assurance, and process improvement.",
      "Mentored engineering leads and senior developers; led hiring, onboarding, and career development.",
      "Managed agile sprint planning, tracked KPIs, and reported regularly on service quality.",
      "Drove innovation by evaluating emerging technologies and fostering continuous improvement."
    ]},
    { role:"Senior Full Stack Software Engineer", co:"GPC", loc:"China", date:"2017 — 2018", span:"1 yr", pts:[
      "Led the design, development, and deployment of scalable web applications using modern frameworks.",
      "Architected solutions, defined technical standards, and ensured code quality through reviews.",
      "Planned and executed software releases; managed CI/CD pipelines and comprehensive documentation.",
      "Integrated third-party APIs and services with robust interoperability and security compliance.",
      "Mentored junior engineers on architecture, coding standards, and professional growth."
    ]},
    { role:"Network Engineer", co:"Southwestern University", loc:"Philippines", date:"2015 — 2016", span:"1 yr", pts:[
      "Maintained computer networks including mainframes, VPNs, routers, and hardware.",
      "Implemented firewalls, virus protection, and data security systems; optimized network performance.",
      "Developed disaster-recovery procedures and resolved networking issues across the organization."
    ]},
    { role:"Researcher / UI·UX Designer", co:"Payvenue", loc:"Remote", date:"2014 — 2015", span:"1 yr", pts:[
      "Conducted user research and designed customized experiences for digital platforms.",
      "Delivered flow diagrams, storyboards, and site maps; ran UX testing on CTAs and landing pages.",
      "Predicted user behavior to ensure designs met both product specifications and user psychology."
    ]},
    { role:"Full Stack Engineer", co:"Freelance", loc:"Remote", date:"2010 — 2016", span:"6 yrs", pts:[
      "Designed, built, and deployed end-to-end web apps — React/Next/Angular front-ends, Node/Express back-ends.",
      "Integrated SQL and NoSQL databases; managed data modeling and migrations.",
      "Implemented authentication, authorization, and security best practices across the stack.",
      "Automated deployment workflows and wrote unit, integration, and end-to-end tests."
    ]}
  ],

  projects: [
    { name:"STHASI", kind:"AI Operating System · Autonomous Agent Ecosystem", status:"active", statusLabel:"In development",
      desc:"A next-generation AI operating system built around an <b>intelligent model-routing engine</b> as its core IP — orchestrating models by capability, cost, and token economics. Cross-platform execution from a single shared core: Tauri + React for desktop and web, Flutter for mobile, all powered by a unified Rust runtime.",
      tags:["Rust Core","Tauri + React","Flutter","Model Routing","Token Economics","Multi-Agent","Compound AI"] },
    { name:"AI4SE Atlas", kind:"Research Platform", status:"", statusLabel:"Research",
      desc:"A systematic mapping of AI across the software engineering lifecycle, built on dissertation research spanning <b>1,000+ primary studies</b> (2019–2024). A PRISMA-compliant pipeline producing publication-quality figures and an interactive evidence atlas.",
      tags:["AI4SE","SMS / PRISMA","Data Visualization","Python"] },
    { name:"ATOE", kind:"Adaptive Transit Operations Engine", status:"review", statusLabel:"In review",
      desc:"AI-driven transit rescheduling combining MILP optimization, spatio-temporal graph attention (ST-GAT), and PPO reinforcement learning. A 35-file Python package with full paper-to-code mapping, targeting <b>Transportation Research Part B</b>.",
      tags:["Optimization (MILP)","Graph Neural Nets","Reinforcement Learning","Python"] },
    { name:"ALDEE", kind:"Autonomous Literature-to-Discovery-to-Experiment Engine", status:"active", statusLabel:"In development",
      desc:"An autonomous multi-agent research system that moves from literature to discovery to experiment with minimal human steering — backed by a knowledge stack of <b>ChromaDB, Neo4j, and HelixDB</b> for vector, graph, and hybrid retrieval.",
      tags:["Multi-Agent","RAG","Knowledge Graphs","ChromaDB · Neo4j","Autonomy"] },
    { name:"ICCBS AI-Powered LMS", kind:"Enterprise EdTech Platform", status:"", statusLabel:"Design",
      desc:"An AI-powered learning management system architected on Google Cloud microservices, integrating <b>18 Google services</b>. Delivered with a comprehensive 48-page PRD/SRS targeting institutional and international funders.",
      tags:["GCP Microservices","18 Google Services","LMS / EdTech","PRD / SRS"] }
  ],

  research: [
    { t:"AI4SE systematic mapping", d:"Charting AI advancements across every phase of the software engineering lifecycle." },
    { t:"AI-augmented development", d:"Methods and tooling that lift developer productivity, quality, and scalability." },
    { t:"Autonomous AI-research systems", d:"Multi-agent architectures that conduct literature review, discovery, and experimentation." },
    { t:"LLM reliability", d:"Hallucination mitigation and evaluation for LLM-augmented engineering workflows." }
  ],

  // certifications — palette by provider
  providers:{ Google:"#4285F4", AWS:"#FF9900", IBM:"#7c5cff", Atlassian:"#2684FF", "SkillUp Online":"#d8a43f", Goodwill:"#5fcf80" },
  mainProviders:["Google","AWS","IBM","Atlassian"],
  certs:[
    {n:"Advanced Machine Learning on Google Cloud", p:"Google", s:1},
    {n:"Responsible AI for Developers", p:"Google", s:1},
    {n:"Business Intelligence", p:"Google", s:1},
    {n:"Google Project Management", p:"Google", s:1},
    {n:"Google Business Intelligence Certificate", p:"Google"},
    {n:"Project Initiation: Starting a Successful Project", p:"Google"},
    {n:"Project Planning: Putting It All Together", p:"Google"},
    {n:"Project Execution: Running the Project", p:"Google"},
    {n:"Agile Project Management", p:"Google"},
    {n:"The Path to Insights: Data Models & Pipelines", p:"Google"},
    {n:"Decisions, Decisions: Dashboards & Reports", p:"Google"},
    {n:"Foundations of Business Intelligence", p:"Google"},
    {n:"Technical Support Fundamentals", p:"Google"},
    {n:"Building a High-throughput VPN", p:"Google"},
    {n:"AWS Cloud Solutions Architect", p:"AWS", s:1},
    {n:"AWS Cloud Technical Essentials", p:"AWS"},
    {n:"Architecting Solutions on AWS", p:"AWS"},
    {n:"Introduction to Designing Data Lakes on AWS", p:"AWS"},
    {n:"Generative AI for Software Developers", p:"IBM", s:1},
    {n:"DevOps, Cloud, and Agile Foundations", p:"IBM", s:1},
    {n:"IBM IT Project Manager", p:"IBM", s:1},
    {n:"IBM IT Scrum Master", p:"IBM", s:1},
    {n:"IBM z/OS Mainframe Practitioner", p:"IBM", s:1},
    {n:"Introduction to Enterprise Computing", p:"IBM"},
    {n:"Getting Started on Mainframe with z/OS", p:"IBM"},
    {n:"Introduction to Software Engineering", p:"IBM"},
    {n:"Introduction to Cybersecurity Tools & Cyber Attacks", p:"IBM"},
    {n:"Basic System Programming on IBM Z", p:"IBM"},
    {n:"Project Lifecycle, Information Sharing & Risk Management", p:"IBM"},
    {n:"Project Management Foundations, Initiation & Planning", p:"IBM"},
    {n:"Introduction to Project Management", p:"IBM"},
    {n:"Agile with Atlassian Jira", p:"Atlassian"},
    {n:"Introduction to Scrum Master Profession", p:"SkillUp Online"},
    {n:"Foundations of Career Navigating & Coaching", p:"Goodwill"}
  ],

  // constellation nodes for the signature canvas
  // x,y in 0..1 normalized space; r = radius weight; kind groups
  constellation:{
    groups:{
      core:{ label:"Core thesis", color:"#d8a43f" },
      domain:{ label:"Domains", color:"#9bbcdc" },
      project:{ label:"Systems", color:"#e9c074" },
      craft:{ label:"Craft", color:"#8fa9c9" }
    },
    nodes:[
      { id:"ai4se", g:"core", x:.5, y:.46, r:9, name:"AI4SE", kind:"Core thesis",
        desc:"Augmenting the software engineering lifecycle with AI — the gravitational center of the work." },
      { id:"llm", g:"domain", x:.31, y:.27, r:6, name:"Large Language Models", kind:"Domain",
        desc:"LLMs, generative AI, prompt & context engineering." },
      { id:"llmops", g:"domain", x:.7, y:.24, r:6, name:"LLMOps", kind:"Domain",
        desc:"Operationalizing models — evaluation, routing, reliability. Specialization, Duke University." },
      { id:"agents", g:"domain", x:.78, y:.5, r:6, name:"Autonomous Agents", kind:"Domain",
        desc:"Multi-agent systems for research and engineering autonomy." },
      { id:"cloud", g:"domain", x:.24, y:.6, r:6, name:"Cloud Architecture", kind:"Domain",
        desc:"AWS & GCP microservices, CI/CD, data lakes at scale." },
      { id:"sms", g:"domain", x:.5, y:.74, r:6, name:"Systematic Mapping", kind:"Domain",
        desc:"SLR / SMS / PRISMA — rigorous evidence synthesis." },
      { id:"sthasi", g:"project", x:.84, y:.34, r:7, name:"STHASI", kind:"System",
        desc:"AI operating system with a model-routing engine at its core." },
      { id:"aldee", g:"project", x:.9, y:.62, r:6, name:"ALDEE", kind:"System",
        desc:"Autonomous literature-to-discovery-to-experiment engine." },
      { id:"atlas", g:"project", x:.62, y:.86, r:6, name:"AI4SE Atlas", kind:"System",
        desc:"Evidence atlas over 1,000+ primary studies." },
      { id:"atoe", g:"project", x:.34, y:.82, r:6, name:"ATOE", kind:"System",
        desc:"Adaptive transit engine — MILP + ST-GAT + PPO." },
      { id:"fullstack", g:"craft", x:.16, y:.4, r:6, name:"Full-Stack", kind:"Craft",
        desc:"React/Next, Node, Flutter, Rust, Python — 15+ years shipping." },
      { id:"lead", g:"craft", x:.16, y:.18, r:6, name:"Engineering Leadership", kind:"Craft",
        desc:"Leading cross-functional teams across 3 countries." }
    ],
    edges:[
      ["ai4se","llm"],["ai4se","llmops"],["ai4se","agents"],["ai4se","cloud"],["ai4se","sms"],
      ["llm","llmops"],["llmops","sthasi"],["agents","sthasi"],["agents","aldee"],
      ["sms","atlas"],["sms","atoe"],["llm","fullstack"],["cloud","fullstack"],
      ["fullstack","lead"],["sthasi","aldee"],["atlas","ai4se"],["atoe","cloud"],
      ["agents","aldee"],["llmops","agents"]
    ]
  }
};
