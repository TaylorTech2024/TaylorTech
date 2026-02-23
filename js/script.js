// Ano automático no footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Animação simples ao rolar
const elements = document.querySelectorAll(".card, section h2, .pill, .actions");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

elements.forEach((el) => {
  el.style.opacity = 0;
  el.style.transform = "translateY(16px)";
  el.style.transition = "0.7s ease";
  observer.observe(el);
});