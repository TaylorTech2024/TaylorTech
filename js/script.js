// Helpers
const $ = (q, el=document) => el.querySelector(q);
const $$ = (q, el=document) => [...el.querySelectorAll(q)];

function setYear(){
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();
}

// Smooth scroll for anchors
function enableSmoothScroll(){
  $$("[data-scroll]").forEach(a => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href") || "";
      if (!href.startsWith("#")) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({behavior:"smooth", block:"start"});
      closeMobile();
    });
  });
}

// Reveal on scroll
function enableReveal(){
  const els = $$(".reveal");
  if (!("IntersectionObserver" in window) || els.length === 0) {
    els.forEach(el => el.classList.add("show"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) en.target.classList.add("show");
    });
  }, {threshold: 0.12});
  els.forEach(el => io.observe(el));
}

// Role typing
function enableRole(){
  const el = $("#roleText");
  if (!el) return;

  const rolesPT = ["Programador Web", "Web Developer", "Front-end", "Sites & Sistemas"];
  const rolesEN = ["Web Developer", "Front-end Developer", "Web Systems", "Landing Pages"];

  let idx = 0, pos = 0, deleting = false;

  function tick(){
    const lang = document.documentElement.getAttribute("data-lang") || "pt";
    const roles = lang === "en" ? rolesEN : rolesPT;
    const text = roles[idx % roles.length];

    if (!deleting) {
      pos++;
      el.textContent = text.slice(0, pos);
      if (pos >= text.length) {
        deleting = true;
        setTimeout(tick, 900);
        return;
      }
    } else {
      pos--;
      el.textContent = text.slice(0, pos);
      if (pos <= 0) {
        deleting = false;
        idx++;
      }
    }
    setTimeout(tick, deleting ? 40 : 60);
  }
  tick();
}

// WhatsApp CTA (buttons with data-wpp)
function enableWhats(){
  const phone = "5581994582007";
  $$("[data-wpp]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const plan = btn.getAttribute("data-plan") || "Serviço";
      const msg = encodeURIComponent(`Olá! Tenho interesse no plano: ${plan}. Podemos conversar?`);
      window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
    });
  });
}

// Mobile menu
function closeMobile(){
  const mobile = $("#mobileMenu");
  const hamb = $("#hamb");
  if (mobile) mobile.style.display = "none";
  if (hamb) hamb.classList.remove("on");
}
function enableMobileMenu(){
  const hamb = $("#hamb");
  const mobile = $("#mobileMenu");
  if (!hamb || !mobile) return;

  hamb.addEventListener("click", () => {
    const open = mobile.style.display === "block";
    mobile.style.display = open ? "none" : "block";
    hamb.classList.toggle("on", !open);
  });

  document.addEventListener("click", (e) => {
    if (!mobile.contains(e.target) && !hamb.contains(e.target)) closeMobile();
  });
}

// i18n (PT/EN)
const i18n = {
  pt: {
    nav_about:"Sobre", nav_skills:"Competências", nav_edu:"Formação", nav_courses:"Cursos", nav_portfolio:"Portfólio", nav_shop:"Loja", nav_quote:"Orçamento",
    hero_pill:"Disponível para projetos • Sites & Sistemas Web",
    hero_name:"Herbert Taylor",
    hero_desc:"Crio experiências modernas na web: sites rápidos, responsivos e sistemas sob medida. Do design ao deploy, com foco em performance e conversão.",
    hero_btn_shop:"Ver planos", hero_btn_contact:"Falar comigo",
    stat1_desc:"Sites e sistemas", stat2_desc:"Experiência e visual", stat3_desc:"GitHub + hospedagem",
    about_title:"Sobre mim",
    about_desc:"Profissional de TI e programação, focado em desenvolvimento web. Fundador da TaylorTech, atuo criando sites e sistemas com organização, performance e visual profissional.",
    skills_title:"Competências (TI & Programação)", skills_tech_title:"Stack / Técnicas", skills_practices_title:"Boas práticas", skills_soft_title:"Comportamentais",
    skills_resp:"Responsividade (mobile-first)", skills_patterns:"Organização de código", skills_seo:"SEO básico + performance", skills_deploy:"Deploy GitHub Pages / Vercel",
    edu_title:"Formação", edu_now:"Cursando",
    edu_1_desc:"Análise e Desenvolvimento de Sistemas (ADS) — 2025/2027.",
    edu_2_desc:"Técnico em Desenvolvimento de Sistemas — 2023/2024.",
    courses_title:"Cursos & Workshops",
    course_senai_1:"Tecnologia da Informação e Comunicação — 14h (2022) — Concluído",
    course_senai_2:"Lógica de Programação — 14h (2022) — Concluído",
    course_iec_1:"Imersão em Reparo de Smartphones (Software/Hardware) — 40h (2024) — Concluído",
    course_ws_title:"Workshops",
    course_ws_1:"Capacitação Profissional — Renees (2022)",
    course_ws_2:"Complementares: Mercado de Trabalho, Desenvolvimento Pessoal, Comportamentais, Currículo",
    portfolio_title:"Portfólio",
    portfolio_sub:"Alguns exemplos do que eu faço. Em breve vou adicionar links reais dos projetos.",
    p1_title:"Site Institucional", p1_desc:"Layout moderno, responsivo, com CTA e presença profissional.",
    p2_title:"Landing Page", p2_desc:"Página focada em conversão, rápida e com animações suaves.",
    p3_title:"Sistema Web (CRUD)", p3_desc:"Cadastro, listagem, edição, autenticação e organização de dados.",
    cta_title:"Quer um site assim?", cta_desc:"Veja os planos e comece hoje. Domínio e hospedagem ficam por conta do cliente.", cta_btn:"Ir para a loja",
    contact_title:"Contato", contact_btn:"Chamar no WhatsApp", contact_briefing:"Já comprei • Preencher briefing",
    contact_note:"GitHub: TaylorTech2024 • Insta: @taylorzzx_",

    // Loja
    shop_title:"Loja de Serviços",
    shop_subtitle:"Escolha o plano ideal. Após a compra, preencha o briefing para iniciar seu projeto.",
    hosting_note:"Domínio e hospedagem são contratados pelo cliente. Eu ajudo na configuração.",
    featured_badge:"Mais vendido",
    plan_basic_title:"Site Básico Profissional",
    plan_basic_desc:"Presença online rápida e acessível para começar.",
    plan_pro_title:"Site Profissional Completo",
    plan_pro_desc:"Estrutura completa para empresas e marcas.",
    plan_premium_title:"Site Premium Personalizado",
    plan_premium_desc:"Mais páginas e visual mais completo.",
    btn_buy_now:"Comprar agora",
    btn_talk:"Tirar dúvidas",
    btn_subscribe_now:"Assinar agora",
    per_month:"/mês",
    hosting_client:"Hospedagem por conta do cliente",
    basic_1:"1 página (Home) com seções essenciais",
    basic_2:"Responsivo (celular/PC)",
    basic_3:"Botão WhatsApp + CTA",
    basic_4:"Publicação do site",
    basic_5:"Prazo: 5 dias úteis",
    pro_1:"Até 4 páginas (Home, Sobre, Serviços, Contato)",
    pro_2:"Animações suaves + rolagem premium",
    pro_3:"Formulário de contato + WhatsApp",
    pro_4:"SEO básico (títulos e descrição)",
    pro_5:"Prazo: 7–10 dias úteis",
    premium_1:"Até 7 páginas + estrutura completa",
    premium_2:"Design mais personalizado",
    premium_3:"SEO intermediário + performance",
    premium_4:"Integrações sob demanda",
    premium_5:"Prazo: ~15 dias úteis",
    addons_title:"Extras (opcionais)",
    addon_1:"Página extra: +R$ 120",
    addon_2:"Google Analytics + Pixel: +R$ 150",
    addon_3:"Copy/Texto (básico): +R$ 150",
    addon_4:"Logo simples: +R$ 120",
    maintenance_title:"Manutenção mensal",
    maintenance_desc:"Ideal para manter o site atualizado e com suporte.",
    faq_title:"Perguntas rápidas",
    faq1_q:"Como funciona depois do pagamento?",
    faq1_a:"Você compra e depois preenche o briefing. Eu confirmo o prazo e inicio o projeto.",
    faq2_q:"Posso parcelar?",
    faq2_a:"Sim. O parcelamento depende do checkout da Kiwify.",
    faq3_q:"Hospedagem está inclusa?",
    faq3_a:"Não. Hospedagem e domínio ficam por conta do cliente. Eu ajudo na configuração."
  },
  en: {
    nav_about:"About", nav_skills:"Skills", nav_edu:"Education", nav_courses:"Courses", nav_portfolio:"Portfolio", nav_shop:"Shop", nav_quote:"Quote",
    hero_pill:"Available for projects • Websites & Web Systems",
    hero_name:"Herbert Taylor",
    hero_desc:"I build modern web experiences: fast, responsive websites and custom systems. From design to deploy, focused on performance and conversion.",
    hero_btn_shop:"View plans", hero_btn_contact:"Talk to me",
    stat1_desc:"Websites & systems", stat2_desc:"Experience & visuals", stat3_desc:"GitHub + hosting",
    about_title:"About me",
    about_desc:"IT professional focused on web development. Founder of TaylorTech, building websites and systems with organization, performance and a professional look.",
    skills_title:"Skills (IT & Programming)", skills_tech_title:"Tech stack", skills_practices_title:"Best practices", skills_soft_title:"Soft skills",
    skills_resp:"Responsive (mobile-first)", skills_patterns:"Clean code organization", skills_seo:"Basic SEO + performance", skills_deploy:"Deploy GitHub Pages / Vercel",
    edu_title:"Education", edu_now:"Studying",
    edu_1_desc:"Systems Analysis and Development — 2025/2027.",
    edu_2_desc:"Systems Development Technician — 2023/2024.",
    courses_title:"Courses & Workshops",
    course_senai_1:"Information and Communication Technology — 14h (2022) — Completed",
    course_senai_2:"Programming Logic — 14h (2022) — Completed",
    course_iec_1:"Smartphone Repair Immersion (Software/Hardware) — 40h (2024) — Completed",
    course_ws_title:"Workshops",
    course_ws_1:"Professional Training — Renees (2022)",
    course_ws_2:"Extras: Job market, personal development, soft skills, resume",
    portfolio_title:"Portfolio",
    portfolio_sub:"Examples of what I build. Soon I’ll add real project links.",
    p1_title:"Business Website", p1_desc:"Modern layout, responsive, with CTA and professional presence.",
    p2_title:"Landing Page", p2_desc:"Conversion-focused page, fast and smooth animations.",
    p3_title:"Web System (CRUD)", p3_desc:"Create/list/edit, authentication and data organization.",
    cta_title:"Want a website like this?", cta_desc:"Check the plans and get started. Hosting is paid by the client.", cta_btn:"Go to shop",
    contact_title:"Contact", contact_btn:"WhatsApp", contact_briefing:"Already bought • Fill briefing",
    contact_note:"GitHub: TaylorTech2024 • IG: @taylorzzx_",

    shop_title:"Services Shop",
    shop_subtitle:"Choose the best plan. After purchase, fill the briefing to start.",
    hosting_note:"Domain and hosting are paid by the client. I help set it up.",
    featured_badge:"Best seller",
    plan_basic_title:"Basic Professional Website",
    plan_basic_desc:"Fast and affordable online presence.",
    plan_pro_title:"Complete Professional Website",
    plan_pro_desc:"Full structure for brands and businesses.",
    plan_premium_title:"Premium Custom Website",
    plan_premium_desc:"More pages and a more tailored look.",
    btn_buy_now:"Buy now",
    btn_talk:"Ask questions",
    btn_subscribe_now:"Subscribe now",
    per_month:"/month",
    hosting_client:"Hosting paid by client",
    basic_1:"1 page (Home) with essential sections",
    basic_2:"Responsive (mobile/desktop)",
    basic_3:"WhatsApp button + CTA",
    basic_4:"Publish the website",
    basic_5:"Delivery: 5 business days",
    pro_1:"Up to 4 pages (Home, About, Services, Contact)",
    pro_2:"Smooth animations + premium scroll",
    pro_3:"Contact form + WhatsApp",
    pro_4:"Basic SEO (title & description)",
    pro_5:"Delivery: 7–10 business days",
    premium_1:"Up to 7 pages + full structure",
    premium_2:"More personalized design",
    premium_3:"Intermediate SEO + performance",
    premium_4:"Integrations on demand",
    premium_5:"Delivery: ~15 business days",
    addons_title:"Extras (optional)",
    addon_1:"Extra page: +R$ 120",
    addon_2:"Google Analytics + Pixel: +R$ 150",
    addon_3:"Copy/text (basic): +R$ 150",
    addon_4:"Simple logo: +R$ 120",
    maintenance_title:"Monthly maintenance",
    maintenance_desc:"Keep your website updated with support.",
    faq_title:"Quick questions",
    faq1_q:"What happens after payment?",
    faq1_a:"You purchase and then fill the briefing. I confirm the deadline and start.",
    faq2_q:"Can I pay in installments?",
    faq2_a:"Yes. Installments depend on Kiwify checkout options.",
    faq3_q:"Is hosting included?",
    faq3_a:"No. Hosting and domain are paid by the client. I help set it up."
  }
};

function applyLang(lang){
  document.documentElement.setAttribute("data-lang", lang);
  const label = document.getElementById("langLabel");
  if (label) label.textContent = lang.toUpperCase();

  $$("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const value = i18n[lang]?.[key];
    if (value) el.textContent = value;
  });

  try { localStorage.setItem("taylortech_lang", lang); } catch {}
}

function enableLangToggle(){
  const btn = document.getElementById("langToggle");
  if (!btn) return;

  let saved = "pt";
  try { saved = localStorage.getItem("taylortech_lang") || "pt"; } catch {}
  applyLang(saved);

  btn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-lang") || "pt";
    applyLang(current === "pt" ? "en" : "pt");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  enableSmoothScroll();
  enableReveal();
  enableRole();
  enableWhats();
  enableMobileMenu();
  enableLangToggle();
});