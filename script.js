/* ==========================================================
   AJI WIRA NUGROHO — PORTFOLIO
   script.js — all site interactivity, organized by feature.

   EASY CUSTOMIZATION
   Edit the CONFIG object below to change core info without
   hunting through the rest of the file.
   ========================================================== */

const CONFIG = {
  name: "Aji Wira Nugroho",
  email: "ajiiwra@gmail.com",
  instagram: "https://www.instagram.com/wirak_/",
  linkedin: "https://id.linkedin.com/in/aji-wira-nugroho-730523330",
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isTouchDevice = window.matchMedia("(hover: none)").matches || window.innerWidth < 900;

document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initCursor();
  initNavbar();
  initMobileMenu();
  initScrollProgress();
  initActiveNav();
  initRevealAnimations();
  initParallax();
  initProcessLine();
  initSkillsFilter();
  initProjectsFilter();
  initProjectModal();
  initBackToTop();
  initContactForm();
  initSmoothAnchors();
});

/* ---------------- LOADING SCREEN ---------------- */
function initLoader() {
  const loader = document.getElementById("loader");
  if (!loader) return;
  const hide = () => loader.classList.add("hidden");
  // Keep it snappy: hide shortly after paint, never block the user.
  window.addEventListener("load", () => setTimeout(hide, 700));
  // Safety fallback in case 'load' is delayed.
  setTimeout(hide, 2200);
}

/* ---------------- CUSTOM CURSOR ---------------- */
function initCursor() {
  if (isTouchDevice) return;
  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  }, { passive: true });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  }
  requestAnimationFrame(animateRing);

  const hoverables = document.querySelectorAll("a, button, .skill-card, .project-card");
  hoverables.forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("hover"));
    el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
  });
}

/* ---------------- NAVBAR SCROLL STATE ---------------- */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;
  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------------- MOBILE NAVIGATION ---------------- */
function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("mobileMenu");
  if (!hamburger || !menu) return;

  const closeMenu = () => {
    hamburger.classList.remove("open");
    menu.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  hamburger.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  menu.querySelectorAll(".mobile-link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

/* ---------------- SCROLL PROGRESS BAR ---------------- */
function initScrollProgress() {
  const bar = document.getElementById("scrollProgress");
  if (!bar) return;
  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + "%";
  };
  window.addEventListener("scroll", update, { passive: true });
  update();
}

/* ---------------- ACTIVE NAVIGATION LINK ---------------- */
function initActiveNav() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );
  sections.forEach((section) => observer.observe(section));
}

/* ---------------- SCROLL REVEAL ---------------- */
function initRevealAnimations() {
  const items = document.querySelectorAll(".reveal-up");
  if (!items.length) return;

  if (prefersReducedMotion) {
    items.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );
  items.forEach((el) => observer.observe(el));
}

/* ---------------- PARALLAX (hero orbs) ---------------- */
function initParallax() {
  const layers = document.querySelectorAll("[data-parallax]");
  if (!layers.length || prefersReducedMotion) return;

  const intensity = isTouchDevice ? 0.4 : 1; // reduce on mobile
  let ticking = false;

  function update() {
    const scrollY = window.scrollY;
    layers.forEach((layer) => {
      const speed = parseFloat(layer.getAttribute("data-parallax")) * intensity;
      layer.style.transform = `translate3d(0, ${scrollY * speed * 0.3}px, 0)`;
    });
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
}

/* ---------------- PROCESS LINE FILL ---------------- */
function initProcessLine() {
  const track = document.getElementById("processTrack");
  const fill = document.getElementById("processLineFill");
  if (!track || !fill) return;

  const cards = track.querySelectorAll(".process-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fill.style.width = "100%";
        }
      });
    },
    { threshold: 0.4 }
  );
  observer.observe(track);

  // Stagger card reveal a touch extra for visual sequence.
  cards.forEach((card, i) => card.style.transitionDelay = `${i * 0.08}s`);
}

/* ---------------- SKILLS FILTER ---------------- */
function initSkillsFilter() {
  const filterBar = document.getElementById("skillsFilter");
  const cards = document.querySelectorAll("#skillsGrid .skill-card");
  if (!filterBar || !cards.length) return;

  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;

    filterBar.querySelectorAll(".filter-btn").forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");

    const filter = btn.getAttribute("data-filter");
    cards.forEach((card) => {
      const match = filter === "all" || card.getAttribute("data-category") === filter;
      card.classList.toggle("hidden", !match);
    });
  });
}

/* ---------------- PROJECTS FILTER ---------------- */
function initProjectsFilter() {
  const filterBar = document.getElementById("projectsFilter");
  const cards = document.querySelectorAll("#projectsGrid .project-card");
  if (!filterBar || !cards.length) return;

  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;

    filterBar.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");
    cards.forEach((card) => {
      const match = filter === "all" || card.getAttribute("data-category") === filter;
      card.classList.toggle("hidden", !match);
    });
  });
}

/* ---------------- PROJECT MODAL ---------------- */
function initProjectModal() {
  const modal = document.getElementById("projectModal");
  const backdrop = document.getElementById("modalBackdrop");
  const closeBtn = document.getElementById("modalClose");
  const cards = document.querySelectorAll(".project-card");
  if (!modal || !cards.length) return;

  const media = document.getElementById("modalMedia");
  const monogram = document.getElementById("modalMonogram");
  const title = document.getElementById("modalTitle");
  const desc = document.getElementById("modalDesc");
  const features = document.getElementById("modalFeatures");
  const tech = document.getElementById("modalTech");
  const link = document.getElementById("modalLink");

  let lastFocused = null;

  function openModal(card) {
    lastFocused = document.activeElement;
    title.textContent = card.getAttribute("data-title") || "";
    desc.textContent = card.getAttribute("data-desc") || "";
    tech.textContent = card.getAttribute("data-tech") || "";

    const featureList = (card.getAttribute("data-features") || "").split("|").filter(Boolean);
    features.innerHTML = "";
    featureList.forEach((f) => {
      const li = document.createElement("li");
      li.textContent = f;
      features.appendChild(li);
    });

    const projectLink = card.getAttribute("data-link") || "#";
    link.href = projectLink;
    if (projectLink === "#") {
      link.addEventListener("click", (e) => e.preventDefault(), { once: true });
    }

    const mediaClass = [...card.querySelector(".project-media").classList].find((c) => c.startsWith("proj-"));
    media.className = "modal-media " + (mediaClass || "");
    monogram.textContent = card.querySelector(".project-monogram")?.textContent || "";

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  cards.forEach((card) => {
    const openTrigger = card.querySelector("[data-project-open]");
    if (openTrigger) {
      openTrigger.addEventListener("click", (e) => {
        e.preventDefault();
        openModal(card);
      });
    }
  });

  backdrop.addEventListener("click", closeModal);
  closeBtn.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });
}

/* ---------------- BACK TO TOP ---------------- */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });
}

/* ---------------- CONTACT FORM (mailto fallback) ---------------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    const subject = encodeURIComponent(`Pesan dari ${name} — Portfolio`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
  });
}

/* ---------------- SMOOTH ANCHOR SCROLL ---------------- */
function initSmoothAnchors() {
  document.querySelectorAll('a[data-nav-link][href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    });
  });

  const scrollIndicator = document.getElementById("scrollIndicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      document.getElementById("about")?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  }
}
