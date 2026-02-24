// ===== CONFIG =====
const WPP_NUMBER = "5581994582007";

// ===== YEAR (se existir) =====
const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();

// ===== REVEAL =====
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("show");
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.16 });
revealEls.forEach((el) => revealObserver.observe(el));

// ===== SMOOTH SCROLL =====
function easeInOutCubic(t){ return t<.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2; }
function smoothScrollTo(targetY, duration=720){
  const startY = window.scrollY;
  const diff = targetY - startY;
  const start = performance.now();
  function step(now){
    const t = Math.min((now-start)/duration, 1);
    window.scrollTo(0, startY + diff*easeInOutCubic(t));
    if(t<1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
function getHeaderOffset(){
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

// ===== MENU ACTIVE =====
const sections = Array.from(document.querySelectorAll("section[id]"));
const menuLinks = Array.from(document.querySelectorAll(".menu a[data-scroll]"));
function setActive(id){
  menuLinks.forEach(l => l.classList.toggle("active", l.getAttribute("href") === `#${id}`));
}
if (sections.length && menuLinks.length){
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if (visible?.target?.id) setActive(visible.target.id);
  }, { threshold:[0.25,0.35,0.5,0.65] });
  sections.forEach(s => sectionObserver.observe(s));
}

// ===== ROLE ANIMADO =====
const roleText = document.getElementById("roleText");
const roles = {
  pt: ["Programador Web", "Front-end", "Sites Profissionais", "Sistemas Web"],
  en: ["Web Developer", "Front-end Developer", "Professional Websites", "Web Systems"]
};
let roleIndex = 0;

// ===== I18N =====
const i18n = {
  pt: {
    nav_about:"Sobre", nav_skills:"Competências", nav_edu:"Formação", nav_courses:"Cursos",
    nav_portfolio:"Portfólio", nav_shop:"Loja", nav_quote:"Orçamento",
    hero_pill:"Disponível para projetos • Sites & Sistemas Web",
    hero_name:"Herbert Taylor",
    hero_desc:"Crio experiências modernas na web: sites rápidos, responsivos e sistemas sob medida. Do design ao deploy, com foco em performance e conversão.",
    hero_btn_shop:"Ver planos", hero_btn_contact:"Falar comigo",
    stat1_title:"Web", stat1_desc:"Sites e sistemas",
    stat2_title:"UI", stat2_desc:"Experiência e visual",
    stat3_title:"Deploy", stat3_desc:"GitHub + hospedagem",
    btn_talk:"Tirar dúvidas"
  },
  en: {
    nav_about:"About", nav_skills:"Skills", nav_edu:"Education", nav_courses:"Courses",
    nav_portfolio:"Portfolio", nav_shop:"Shop", nav_quote:"Quote",
    hero_pill:"Available for projects • Websites & Web Systems",
    hero_name:"Herbert Taylor",
    hero_desc:"I build modern web experiences: fast, responsive websites and custom web systems — focused on performance and conversion.",
    hero_btn_shop:"View plans", hero_btn_contact:"Contact me",
    stat1_title:"Web", stat1_desc:"Websites & systems",
    stat2_title:"UI", stat2_desc:"Experience & visual",
    stat3_title:"Deploy", stat3_desc:"GitHub + hosting",
    btn_talk:"Ask questions"
  }
};

const langToggle = document.getElementById("langToggle");
const langLabel = document.getElementById("langLabel");
let currentLang = localStorage.getItem("taylortech_lang") || "pt";

function applyLang(lang){
  const dict = i18n[lang] || i18n.pt;
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    if(dict[key]) el.textContent = dict[key];
  });
  document.documentElement.lang = (lang==="en") ? "en" : "pt-br";
  if(langLabel) langLabel.textContent = (lang==="en") ? "EN" : "PT";
  localStorage.setItem("taylortech_lang", lang);

  // Atualiza role
  if(roleText){
    roleIndex = 0;
    roleText.textContent = roles[lang][0];
  }
}
applyLang(currentLang);

if(langToggle){
  langToggle.addEventListener("click", ()=>{
    currentLang = (currentLang==="pt") ? "en" : "pt";
    applyLang(currentLang);
  });
}

if(roleText){
  setInterval(()=>{
    roleIndex = (roleIndex+1) % roles[currentLang].length;
    roleText.style.opacity = 0;
    setTimeout(()=>{
      roleText.textContent = roles[currentLang][roleIndex];
      roleText.style.opacity = 1;
    }, 220);
  }, 2400);
}

// ===== BOTÕES WHATS (TIRAR DÚVIDAS) =====
const msg = {
  pt: {
    basic:"Olá! Tenho dúvidas sobre o Site Básico (R$ 350).",
    pro:"Olá! Tenho dúvidas sobre o Site Profissional (R$ 650).",
    premium:"Olá! Tenho dúvidas sobre o Site Premium (R$ 1200).",
    maintenance:"Olá! Tenho dúvidas sobre a Manutenção Mensal (R$ 150/mês).",
    system:"Olá! Quero orçamento para Sistema Web (com login)."
  },
  en: {
    basic:"Hi! I have questions about the Basic Website plan (R$ 350).",
    pro:"Hi! I have questions about the Professional plan (R$ 650).",
    premium:"Hi! I have questions about the Premium plan (R$ 1200).",
    maintenance:"Hi! I have questions about Monthly Maintenance (R$ 150/month).",
    system:"Hi! I'd like a quote for a Web System (with login)."
  }
};

function openWhats(plan){
  const text = encodeURIComponent((msg[currentLang] && msg[currentLang][plan]) ? msg[currentLang][plan] : "Olá!");
  window.open(`https://wa.me/${WPP_NUMBER}?text=${text}`, "_blank", "noreferrer");
}

document.querySelectorAll("[data-wpp]").forEach(btn=>{
  btn.addEventListener("click",(e)=>{
    e.preventDefault();
    openWhats(btn.getAttribute("data-plan") || "pro");
  });
});