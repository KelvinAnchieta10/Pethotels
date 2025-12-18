// ===== CONFIG (troque aqui) =====
const CONFIG = {
  whatsappNumber: "5500000000000", // DDI+DDD+numero, sem +, sem espaços
  instagramUrl: "https://www.instagram.com/pethostelsl",
  defaultMessage: "Olá! Vim pelo site do Pet Hostel SL e gostaria de informações 😊"
};

function waLink(text) {
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

function setLinks() {
  const ids = ["ctaTop","ctaHero","ctaSobre","ctaMid","ctaBottom","wfloat","ctaHosp","ctaCre","ctaAde","ctaTra"];
  const link = waLink(CONFIG.defaultMessage);

  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = link;
  });

  const insta = document.getElementById("ctaInsta");
  if (insta) insta.href = CONFIG.instagramUrl;

  const phone = document.getElementById("showPhone");
  if (phone) phone.textContent = `+${CONFIG.whatsappNumber}`;
}

function setYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

// menu mobile
function mobileMenu() {
  const btn = document.getElementById("btnMenu");
  const menu = document.getElementById("mobileMenu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
  });

  menu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => menu.style.display = "none");
  });
}

// reveal on scroll
function reveal() {
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("show");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.14 });

  els.forEach(el => io.observe(el));
}

// counters
function animateCount(el, to) {
  const start = performance.now();
  const duration = 900;

  function frame(now) {
    const p = Math.min((now - start) / duration, 1);
    const val = Math.floor(to * p);
    el.textContent = val;

    if (p < 1) requestAnimationFrame(frame);
    else el.textContent = to;
  }

  requestAnimationFrame(frame);
}

function counters() {
  const els = document.querySelectorAll("[data-count]");
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        animateCount(el, Number(el.dataset.count || 0));
        io.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  els.forEach(el => io.observe(el));
}

// faq accordion
function faq() {
  const qs = document.querySelectorAll(".faqQ");
  qs.forEach(btn => {
    btn.addEventListener("click", () => {
      const panel = btn.nextElementSibling;
      const isOpen = panel.style.maxHeight && panel.style.maxHeight !== "0px";

      document.querySelectorAll(".faqA").forEach(p => p.style.maxHeight = "0px");
      document.querySelectorAll(".faqQ i").forEach(i => i.textContent = "+");

      if (!isOpen) {
        panel.style.maxHeight = panel.scrollHeight + "px";
        btn.querySelector("i").textContent = "−";
      }
    });
  });
}

// gallery lightbox
function lightbox() {
  const box = document.getElementById("lightbox");
  const img = document.getElementById("lightboxImg");
  const close = document.getElementById("lightboxClose");
  if (!box || !img || !close) return;

  const open = (src) => {
    img.src = src;
    box.style.display = "flex";
    box.setAttribute("aria-hidden", "false");
  };

  const hide = () => {
    box.style.display = "none";
    box.setAttribute("aria-hidden", "true");
    img.src = "";
  };

  document.querySelectorAll(".gItem").forEach(btn => {
    btn.addEventListener("click", () => open(btn.dataset.img));
  });

  close.addEventListener("click", hide);
  box.addEventListener("click", (e) => { if (e.target === box) hide(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") hide(); });
}

// modals
function modals() {
  const cards = document.querySelectorAll("[data-modal]");
  const modals = document.querySelectorAll(".modal");

  const open = (id) => {
    const m = document.getElementById(id);
    if (!m) return;
    m.style.display = "flex";
    m.setAttribute("aria-hidden", "false");
  };

  const close = (m) => {
    m.style.display = "none";
    m.setAttribute("aria-hidden", "true");
  };

  cards.forEach(c => c.addEventListener("click", () => open(c.dataset.modal)));

  modals.forEach(m => {
    m.addEventListener("click", (e) => { if (e.target === m) close(m); });
    m.querySelectorAll("[data-close]").forEach(b => b.addEventListener("click", () => close(m)));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modals.forEach(m => close(m));
  });
}

// form -> whatsapp
function leadForm() {
  const form = document.getElementById("leadForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const pet = document.getElementById("pet").value.trim();
    const servico = document.getElementById("servico").value;
    const msg = document.getElementById("msg").value.trim();

    const text =
      `Olá! Meu nome é ${nome}.\n` +
      `Pet: ${pet}\n` +
      `Serviço: ${servico}\n\n` +
      (msg ? msg : "Gostaria de informações sobre valores e disponibilidade.");

    window.open(waLink(text), "_blank");
  });
}

// theme
function theme() {
  const btn = document.getElementById("btnTheme");
  if (!btn) return;

  const saved = localStorage.getItem("theme");
  if (saved === "light") document.documentElement.setAttribute("data-theme", "light");

  const icon = () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    btn.textContent = isLight ? "☀️" : "🌙";
  };

  icon();

  btn.addEventListener("click", () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";

    if (isLight) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }

    icon();
  });
}

// init
setLinks();
setYear();
mobileMenu();
reveal();
counters();
faq();
lightbox();
modals();
leadForm();
theme();
