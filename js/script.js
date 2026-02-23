// Ano
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ======================
// Reveal on scroll
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
// Smooth scroll com offset do header
// ======================
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

// ======================
// Menu ativo conforme seção
// ======================
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

// ======================
// PT / EN toggle (sem recarregar)