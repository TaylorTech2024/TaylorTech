// Ano automático
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ======================
// 1) Reveal on scroll
// ======================
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

// ======================
// 2) Smooth scroll "Apple"
// com offset do header
// ======================
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothScrollTo(targetY, duration = 700) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  const start = performance.now();

  function step(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = easeInOutCubic(t);
    window.scrollTo(0, startY + diff * eased);
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function getHeaderOffset() {
  const header = document.querySelector(".header");
  return header ? header.offsetHeight + 10 : 80;
}

document.querySelectorAll('a[data-scroll]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    if (!href || !href.startsWith("#")) return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    const offset = getHeaderOffset();
    const y = target.getBoundingClientRect().top + window.scrollY - offset;

    smoothScrollTo(y, 720);
    history.pushState(null, "", href);
  });
});

// ======================
// 3) Menu ativo conforme seção
// ======================
const sections = Array.from(document.querySelectorAll("main section[id]"));
const menuLinks = Array.from(document.querySelectorAll(".menu a[data-scroll]"));

function setActive(id) {
  menuLinks.forEach((l) => {
    const match = l.getAttribute("href") === `#${id}`;
    l.classList.toggle("active", match);
  });
}

const sectionObserver = new IntersectionObserver((entries) => {
  // pega a seção mais "visível"
  const visible = entries
    .filter(e => e.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (visible?.target?.id) setActive(visible.target.id);
}, { threshold: [0.25, 0.35, 0.5, 0.65] });

sections.forEach((s) => sectionObserver.observe(s));

// Ativa a primeira seção visível ao carregar
window.addEventListener("load", () => {
  const hash = window.location.hash;
  if (hash) {
    const target = document.querySelector(hash);
    if (target) {
      const offset = getHeaderOffset();
      const y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo(0, y);
    }
  }
});