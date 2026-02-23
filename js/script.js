// Ano
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Reveal on scroll

const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });
revealEls.forEach((el) => revealObserver.observe(el));

// Smooth scroll com offset do header

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function smoothScrollTo(targetY, duration = 720) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  const start = performance.now();
  function step(now) {
    const t = Math.min((now - start) / duration, 1);
    window.scrollTo(0, startY + diff * easeInOutCubic(t));
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
function getHeaderOffset() {
  const header = document.querySelector(".header");
  return header ? header.offsetHeight + 10 : 80;
}

document.querySelectorAll("a[data-scroll]").forEach((a) => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    if (!href || !href.startsWith("#")) return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const y = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
    smoothScrollTo(y, 740);
    history.pushState(null, "", href);
  });
});

// Menu ativo conforme seção

const sections = Array.from(document.querySelectorAll("main section[id]"));
const menuLinks = Array.from(document.querySelectorAll(".menu a[data-scroll]"));
function setActive(id) {
  menuLinks.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === `#${id}`));
}
const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries.filter(e => e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
  if (visible?.target?.id) setActive(visible.target.id);
}, { threshold: [0.25, 0.35, 0.5, 0.65] });
sections.forEach((s) => sectionObserver.observe(s));

// PT / EN (FUNCIONANDO)

const i18n = {
  pt: {
    nav_about: "Sobre",
    nav_skills: "Competências",
    nav_career: "Carreira",
    nav_edu: "Formação",
    nav_courses: "Cursos",
    nav_portfolio: "Portfólio",
    nav_services: "Serviços",
    nav_quote: "Orçamento",

    hero_pill: "Disponível para projetos • Sites & Sistemas Web",
    hero_name: "Herbert Taylor",
    hero_role: "Programador Web",
    hero_desc: "Crio experiências modernas na web: sites rápidos, responsivos e sistemas sob medida. Do design ao deploy, com foco em performance e conversão.",
    hero_btn_portfolio: "Ver portfólio",
    hero_btn_contact: "Falar comigo",

    stat1_title: "Web",
    stat1_desc: "Sites e sistemas",
    stat2_title: "UI",
    stat2_desc: "Experiência e visual",
    stat3_title: "Deploy",
    stat3_desc: "GitHub + hospedagem",

    about_title: "Sobre mim",
    about_desc: "Profissional proativo, com experiência em manutenção de dispositivos eletrônicos e gestão. Fundador da Taylor Tech, com foco em soluções web. Tenho conhecimentos em programação, desenvolvimento web e banco de dados, com compromisso em evolução contínua e resultados.",

    skills_title: "Competências (TI & Programação)",
    skills_sql: "SQL e gestão de Banco de Dados",
    skills_logic: "Lógica de programação e resolução de problemas",
    skills_tech_title: "Stack / Técnicas",
    skills_practices_title: "Boas práticas",
    skills_soft_title: "Comportamentais",
    skills_resp: "Responsividade (mobile-first)",
    skills_patterns: "Organização de código e padrões",
    skills_cta: "Integração com WhatsApp / links e CTA",
    skills_seo: "SEO básico e performance",
    skills_deploy: "Deploy com GitHub Pages",
    soft1: "Executor, planejador e analista",
    soft2: "Paciente, organizado e bom ouvinte",
    soft3: "Trabalho em equipe",
    soft4: "Metódico, pensa antes de agir",
    soft5: "Comunicação clara e profissional",

    career_title: "Carreira",
    career_1_title: "2026 • Taylor Tech",
    career_1_desc: "Websites e sistemas web sob medida, identidade verde e preto, foco em experiência e conversão.",
    career_2_title: "Projetos pessoais",
    career_2_desc: "Portfólios, páginas de serviços, sistemas CRUD, integrações e deploy no GitHub.",

    edu_title: "Formação",
    edu_1_title: "UNIBRA",
    edu_1_badge: "Cursando",
    edu_1_desc: "Superior de Tecnologia em Análise e Desenvolvimento de Sistemas (ADS) — 2025/2027.",
    edu_2_title: "ETE Prof. Antônio Carlos Gomes da Costa",
    edu_2_badge: "Concluído",
    edu_2_desc: "Curso Técnico em Desenvolvimento de Sistemas — 2023/2024.",

    courses_title: "Cursos & Workshops",
    course_senai_1: "Tecnologia da Informação e Comunicação — 14h (2022) — Concluído",
    course_senai_2: "Lógica de Programação — 14h (2022) — Concluído",
    course_ws_title: "Workshops",
    course_ws_1: "Capacitação Profissional — Renees (2022)",
    course_ws_2: "Complementares: Mercado de Trabalho, Desenvolvimento Pessoal, Comportamentais, Elaboração de Currículo",
    course_iec_1: "Imersão em Reparo de Smartphones (Software/Hardware) — 40h (2024) — Concluído",

    portfolio_title: "Portfólio",
    p1_title: "Site Institucional",
    p1_desc: "Layout moderno, responsivo, com CTA e presença profissional.",
    p2_title: "Landing Page",
    p2_desc: "Página focada em conversão, rápida e com animações suaves.",
    p3_title: "Sistema Web (CRUD)",
    p3_desc: "Cadastro, listagem, edição, autenticação e organização de dados.",

    services_title: "Serviços",
    s1_title: "Criação de Websites",
    s1_desc: "Institucional, portfólio, landing page e páginas de serviços.",
    s2_title: "Sistemas Web",
    s2_desc: "Painel admin, CRUD, login, integrações e banco de dados.",
    s3_title: "Manutenção",
    s3_desc: "Ajustes, melhorias, performance, SEO e correções.",

    contact_title: "Contato",
    contact_btn: "Chamar no WhatsApp",
    contact_note: "WhatsApp: wa.me/+5581994582007 • GitHub: TaylorTech2024 • Insta: @taylorzzx_"
  },

  en: {
    nav_about: "About",
    nav_skills: "Skills",
    nav_career: "Career",
    nav_edu: "Education",
    nav_courses: "Courses",
    nav_portfolio: "Portfolio",
    nav_services: "Services",
    nav_quote: "Quote",

    hero_pill: "Available for projects • Websites & Web Systems",
    hero_name: "Herbert Taylor",
    hero_role: "Web Developer",
    hero_desc: "I build modern web experiences: fast, responsive websites and custom web systems. From design to deployment, focused on performance and conversion.",
    hero_btn_portfolio: "View portfolio",
    hero_btn_contact: "Contact me",

    stat1_title: "Web",
    stat1_desc: "Websites & systems",
    stat2_title: "UI",
    stat2_desc: "Experience & visual",
    stat3_title: "Deploy",
    stat3_desc: "GitHub + hosting",

    about_title: "About me",
    about_desc: "Proactive professional with experience in electronics maintenance and management. Founder of Taylor Tech, focused on web solutions. Skilled in programming, web development and databases, committed to continuous improvement and results.",

    skills_title: "Skills (IT & Programming)",
    skills_sql: "SQL and Database Management",
    skills_logic: "Programming logic and problem-solving",
    skills_tech_title: "Tech Stack",
    skills_practices_title: "Best practices",
    skills_soft_title: "Soft skills",
    skills_resp: "Responsive (mobile-first)",
    skills_patterns: "Code organization and patterns",
    skills_cta: "WhatsApp integration / links and CTA",
    skills_seo: "Basic SEO and performance",
    skills_deploy: "Deployment with GitHub Pages",
    soft1: "Executor, planner and analyst",
    soft2: "Patient, organized and attentive",
    soft3: "Teamwork",
    soft4: "Methodical, thinks before acting",
    soft5: "Clear professional communication",

    career_title: "Career",
    career_1_title: "2026 • Taylor Tech",
    career_1_desc: "Custom websites and web systems, green/black identity, focused on user experience and conversion.",
    career_2_title: "Personal projects",
    career_2_desc: "Portfolios, service pages, CRUD systems, integrations, and GitHub deployments.",

    edu_title: "Education",
    edu_1_title: "UNIBRA",
    edu_1_badge: "In progress",
    edu_1_desc: "Associate Degree in Systems Analysis and Development — 2025/2027.",
    edu_2_title: "ETE Prof. Antônio Carlos Gomes da Costa",
    edu_2_badge: "Completed",
    edu_2_desc: "Technical Course in Systems Development — 2023/2024.",

    courses_title: "Courses & Workshops",
    course_senai_1: "Information and Communication Technology — 14h (2022) — Completed",
    course_senai_2: "Programming Logic — 14h (2022) — Completed",
    course_ws_title: "Workshops",
    course_ws_1: "Professional Training — Renees (2022)",
    course_ws_2: "Extras: Job Market, Personal Development, Soft Skills, Resume Building",
    course_iec_1: "Smartphone Repair Immersion (Software/Hardware) — 40h (2024) — Completed",

    portfolio_title: "Portfolio",
    p1_title: "Company Website",
    p1_desc: "Modern responsive layout, clear CTA and professional presence.",
    p2_title: "Landing Page",
    p2_desc: "Conversion-focused page, fast and with smooth animations.",
    p3_title: "Web System (CRUD)",
    p3_desc: "Create, list, edit, authentication and data organization.",

    services_title: "Services",
    s1_title: "Website Development",
    s1_desc: "Company pages, portfolios, landing pages and service pages.",
    s2_title: "Web Systems",
    s2_desc: "Admin panel, CRUD, login, integrations and databases.",
    s3_title: "Maintenance",
    s3_desc: "Fixes, improvements, performance, SEO and corrections.",

    contact_title: "Contact",
    contact_btn: "WhatsApp me",
    contact_note: "WhatsApp: wa.me/+5581994582007 • GitHub: TaylorTech2024 • Instagram: @taylorzzx_"
  }
};

const langToggle = document.getElementById("langToggle");
const langLabel = document.getElementById("langLabel");
let currentLang = localStorage.getItem("taylortech_lang") || "pt";

function applyLang(lang) {
  const dict = i18n[lang] || i18n.pt;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });
  document.documentElement.lang = lang === "en" ? "en" : "pt-br";
  if (langLabel) langLabel.textContent = lang === "en" ? "EN" : "PT";
  localStorage.setItem("taylortech_lang", lang);
}

applyLang(currentLang);

if (langToggle) {
  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "pt" ? "en" : "pt";
    applyLang(currentLang);
  });
}

// ROLE ANIMADO

const roles = {
  pt: [
    "Programador Web",
    "Desenvolvedor Front-end",
    "Criador de Sites",
    "Sistemas Web"
  ],
  en: [
    "Web Developer",
    "Front-end Developer",
    "Website Builder",
    "Web Systems"
  ]
};

let roleIndex = 0;
const roleText = document.getElementById("roleText");

function startRoleAnimation(lang = currentLang || "pt") {
  if (!roleText) return;

  setInterval(() => {
    roleIndex = (roleIndex + 1) % roles[lang].length;
    roleText.style.opacity = 0;

    setTimeout(() => {
      roleText.textContent = roles[lang][roleIndex];
      roleText.style.opacity = 1;
    }, 250);
  }, 2600);
}

// inicia após carregar
startRoleAnimation(currentLang || "pt");