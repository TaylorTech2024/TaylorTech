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


// I18N PT/EN

const i18n = {
  pt: {
    nav_about: "Sobre",
    nav_skills: "Competências",
    nav_edu: "Formação",
    nav_courses: "Cursos",
    nav_portfolio: "Portfólio",
    nav_shop: "Loja",
    nav_quote: "Orçamento",

    hero_pill: "Disponível para projetos • Sites & Sistemas Web",
    hero_name: "Herbert Taylor",
    hero_desc: "Crio experiências modernas na web: sites rápidos, responsivos e sistemas sob medida. Do design ao deploy, com foco em performance e conversão.",
    hero_btn_shop: "Ver planos",
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
    skills_deploy: "Deploy com GitHub Pages / Vercel",
    soft1: "Executor, planejador e analista",
    soft2: "Paciente, organizado e bom ouvinte",
    soft3: "Trabalho em equipe",
    soft4: "Metódico, pensa antes de agir",
    soft5: "Comunicação clara e profissional",

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

    shop_title: "Loja de Serviços",
    shop_subtitle: "Escolha o plano ideal para seu negócio. Após a compra, você recebe o link do briefing e começamos o projeto.",
    hosting_note: "Domínio e hospedagem são contratados pelo cliente. Eu ajudo na configuração.",
    hosting_client: "Domínio e hospedagem por conta do cliente",

    featured_badge: "Mais vendido",
    plan_basic_tag: "Entrada",
    plan_basic_title: "Site Básico",
    plan_basic_desc: "Ideal para começar com presença profissional no Instagram/Google.",
    plan_pro_tag: "Recomendado",
    plan_pro_title: "Site Profissional",
    plan_pro_desc: "Perfeito para empresas: páginas + formulário + SEO básico.",
    plan_premium_tag: "Autoridade",
    plan_premium_title: "Site Premium",
    plan_premium_desc: "Design mais personalizado, mais páginas e presença forte.",

    btn_buy: "Comprar",
    btn_talk: "Tirar dúvidas",
    btn_subscribe: "Assinar",
    btn_quote: "Solicitar orçamento",

    basic_1: "1 página (Home) com seções essenciais",
    basic_2: "Responsivo (celular/PC)",
    basic_3: "Botão WhatsApp + CTA",
    basic_4: "Deploy (Vercel ou GitHub)",
    basic_5: "Prazo: 5 dias úteis",

    pro_1: "Até 4 páginas (Home, Sobre, Serviços, Contato)",
    pro_2: "Animações suaves + rolagem premium",
    pro_3: "Formulário de contato + WhatsApp",
    pro_4: "SEO básico (títulos, descrição, performance)",
    pro_5: "Prazo: 7–10 dias úteis",

    premium_1: "Até 7 páginas + estrutura completa",
    premium_2: "Design mais personalizado",
    premium_3: "SEO intermediário + performance",
    premium_4: "Integrações sob demanda",
    premium_5: "Prazo: ~15 dias úteis",

    addons_title: "Extras (opcionais)",
    addon_1: "Página extra: +R$ 120",
    addon_2: "Google Analytics + Pixel: +R$ 150",
    addon_3: "Copy/Texto (básico): +R$ 150",
    addon_4: "Logo simples: +R$ 120",

    maintenance_title: "Manutenção mensal",
    maintenance_desc: "Ideal para manter o site atualizado e com suporte.",
    per_month: "/mês",

    system_title: "Sistema Web (com login)",
    system_desc: "Painel admin, CRUD, autenticação e banco. Varia por projeto.",
    system_note: "A partir de R$ 1.800 (sob orçamento).",

    faq_title: "Perguntas rápidas",
    faq1_q: "Como funciona depois do pagamento?",
    faq1_a: "Você recebe um link para preencher o briefing (informações do site). Eu confirmo o prazo e inicio o projeto.",
    faq2_q: "Posso parcelar?",
    faq2_a: "Sim. O parcelamento depende das opções disponíveis no checkout (Kiwify/Mercado Pago).",
    faq3_q: "Domínio e hospedagem estão inclusos?",
    faq3_a: "Não. Domínio e hospedagem ficam por conta do cliente. Eu ajudo a configurar e oriento as melhores opções.",
    faq4_q: "O que eu preciso te enviar?",
    faq4_a: "Logo (se tiver), cores de preferência, textos (ou eu te ajudo), fotos e referência de sites que você gosta.",

    contact_title: "Contato",
    contact_btn: "Chamar no WhatsApp",
    contact_note: "WhatsApp: wa.me/+5581994582007 • GitHub: TaylorTech2024 • Insta: @taylorzzx_"
  },

  en: {
    nav_about: "About",
    nav_skills: "Skills",
    nav_edu: "Education",
    nav_courses: "Courses",
    nav_portfolio: "Portfolio",
    nav_shop: "Shop",
    nav_quote: "Quote",

    hero_pill: "Available for projects • Websites & Web Systems",
    hero_name: "Herbert Taylor",
    hero_desc: "I build modern web experiences: fast, responsive websites and custom web systems. From design to deployment, focused on performance and conversion.",
    hero_btn_shop: "View plans",
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
    skills_deploy: "Deploy with GitHub Pages / Vercel",
    soft1: "Executor, planner and analyst",
    soft2: "Patient, organized and attentive",
    soft3: "Teamwork",
    soft4: "Methodical, thinks before acting",
    soft5: "Clear professional communication",

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

    shop_title: "Service Shop",
    shop_subtitle: "Pick the best plan for your business. After payment, you’ll receive the briefing link and we start.",
    hosting_note: "Domain and hosting are purchased by the client. I can help with setup.",
    hosting_client: "Domain and hosting are the client’s responsibility",

    featured_badge: "Best seller",
    plan_basic_tag: "Starter",
    plan_basic_title: "Basic Website",
    plan_basic_desc: "Great to start with a professional presence.",
    plan_pro_tag: "Recommended",
    plan_pro_title: "Professional Website",
    plan_pro_desc: "Perfect for businesses: pages + form + basic SEO.",
    plan_premium_tag: "Authority",
    plan_premium_title: "Premium Website",
    plan_premium_desc: "More custom design, more pages and strong presence.",

    btn_buy: "Buy now",
    btn_talk: "Ask questions",
    btn_subscribe: "Subscribe",
    btn_quote: "Request a quote",

    basic_1: "1 page (Home) with essential sections",
    basic_2: "Responsive (mobile/desktop)",
    basic_3: "WhatsApp button + CTA",
    basic_4: "Deploy (Vercel or GitHub)",
    basic_5: "ETA: 5 business days",

    pro_1: "Up to 4 pages (Home, About, Services, Contact)",
    pro_2: "Smooth animations + premium scrolling",
    pro_3: "Contact form + WhatsApp",
    pro_4: "Basic SEO (title, description, performance)",
    pro_5: "ETA: 7–10 business days",

    premium_1: "Up to 7 pages + complete structure",
    premium_2: "More custom design",
    premium_3: "Intermediate SEO + performance",
    premium_4: "Integrations on demand",
    premium_5: "ETA: ~15 business days",

    addons_title: "Add-ons (optional)",
    addon_1: "Extra page: +R$ 120",
    addon_2: "Google Analytics + Pixel: +R$ 150",
    addon_3: "Copy/Text (basic): +R$ 150",
    addon_4: "Simple logo: +R$ 120",

    maintenance_title: "Monthly maintenance",
    maintenance_desc: "Great to keep your website updated with support.",
    per_month: "/month",

    system_title: "Web System (with login)",
    system_desc: "Admin panel, CRUD, auth and database. Depends on the project.",
    system_note: "Starting at R$ 1,800 (custom quote).",

    faq_title: "Quick FAQ",
    faq1_q: "What happens after payment?",
    faq1_a: "You’ll receive a briefing link (project details). I confirm the timeline and start the project.",
    faq2_q: "Can I pay in installments?",
    faq2_a: "Yes. Installments depend on checkout options (Kiwify/Mercado Pago).",
    faq3_q: "Is domain and hosting included?",
    faq3_a: "No. Domain and hosting are purchased by the client. I can help set it up and suggest the best options.",
    faq4_q: "What do you need from me?",
    faq4_a: "Logo (if you have one), color preferences, texts (or I can help), images and references you like.",

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
    roleIndex = 0;
    if (roleText) roleText.textContent = roles[currentLang][0];
  });
}

// ROLE ANIMADO (respeita idioma)

const roles = {
  pt: ["Programador Web", "Desenvolvedor Front-end", "Criador de Sites", "Sistemas Web"],
  en: ["Web Developer", "Front-end Developer", "Website Builder", "Web Systems"]
};
let roleIndex = 0;
const roleText = document.getElementById("roleText");

if (roleText) {
  setInterval(() => {
    roleIndex = (roleIndex + 1) % roles[currentLang].length;
    roleText.style.opacity = 0;
    setTimeout(() => {
      roleText.textContent = roles[currentLang][roleIndex];
      roleText.style.opacity = 1;
    }, 220);
  }, 2400);
}

// LOJA: por enquanto Compra -> WhatsApp
// Depois você troca pelos links Kiwify

const WPP_NUMBER = "5581994582007";
const WPP_MSG = {
  pt: {
    basic: "Olá! Quero contratar o plano Site Básico (R$ 350).",
    pro: "Olá! Quero contratar o plano Site Profissional (R$ 650).",
    premium: "Olá! Quero contratar o plano Site Premium (R$ 1200).",
    maintenance: "Olá! Quero assinar a Manutenção Mensal (R$ 150/mês).",
    system: "Olá! Quero um orçamento para Sistema Web (com login). Posso te explicar minha ideia?"
  },
  en: {
    basic: "Hi! I'd like to buy the Basic Website plan (R$ 350).",
    pro: "Hi! I'd like to buy the Professional Website plan (R$ 650).",
    premium: "Hi! I'd like to buy the Premium Website plan (R$ 1200).",
    maintenance: "Hi! I'd like to subscribe to the Monthly Maintenance (R$ 150/month).",
    system: "Hi! I’d like a quote for a Web System (with login). Can I explain my idea?"
  }
};

function openWhatsApp(plan) {
  const txt = encodeURIComponent((WPP_MSG[currentLang] && WPP_MSG[currentLang][plan]) ? WPP_MSG[currentLang][plan] : "Olá!");
  const url = `https://wa.me/${WPP_NUMBER}?text=${txt}`;
  window.open(url, "_blank", "noreferrer");
}

document.querySelectorAll(".buy-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const plan = btn.getAttribute("data-plan") || "pro";
    openWhatsApp(plan);
  });
});

document.querySelectorAll("[data-wpp]").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const plan = btn.getAttribute("data-plan") || "pro";
    openWhatsApp(plan);
  });
});