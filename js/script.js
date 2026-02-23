// Menu mobile
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Fecha menu ao clicar
  navLinks.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Reveal on scroll (suave)
const reveals = [...document.querySelectorAll(".reveal")];
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) e.target.classList.add("show");
    }
  },
  { threshold: 0.15 }
);
reveals.forEach((el) => io.observe(el));

// Contadores animados
function animateCount(el, end, duration = 900) {
  const start = 0;
  const startTime = performance.now();

  function tick(now) {
    const t = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    const value = Math.round(start + (end - start) * eased);
    el.textContent = value;
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const statNums = [...document.querySelectorAll(".stat-num")];
const statsObserver = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        const el = e.target;
        const end = Number(el.getAttribute("data-count") || "0");
        animateCount(el, end);
        statsObserver.unobserve(el);
      }
    }
  },
  { threshold: 0.4 }
);
statNums.forEach((el) => statsObserver.observe(el));

// Ano automático
document.getElementById("year").textContent = new Date().getFullYear();

// Botão do briefing -> abre WhatsApp com mensagem pronta
const btnEnviar = document.getElementById("btnEnviar");
if (btnEnviar) {
  btnEnviar.addEventListener("click", () => {
    const nome = (document.getElementById("fNome").value || "").trim();
    const tipo = (document.getElementById("fTipo").value || "").trim();
    const detalhes = (document.getElementById("fDetalhes").value || "").trim();
    const prazo = (document.getElementById("fPrazo").value || "").trim();

    const msg =
      `Oi Herbert! Meu nome é ${nome || "___"}. ` +
      `Quero um(a) ${tipo || "___"}. ` +
      `Detalhes: ${detalhes || "___"}. ` +
      `Prazo: ${prazo || "___"}.`;

    const url = `https://wa.me/5581994582007?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  });
}