const revealNodes = document.querySelectorAll("[data-reveal]");
const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
const sections = [...document.querySelectorAll("main section[id]")];

function setupReveal() {
  if (!revealNodes.length) {
    return;
  }

  revealNodes.forEach((node) => node.classList.add("is-reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealNodes.forEach((node) => observer.observe(node));
}

function setupScrollspy() {
  if (!navLinks.length || !sections.length) {
    return;
  }

  const setCurrent = () => {
    const offset = window.scrollY + 140;
    let currentId = sections[0]?.id ?? "";

    sections.forEach((section) => {
      if (section.offsetTop <= offset) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      const isCurrent = href === `#${currentId}`;
      link.classList.toggle("is-current", isCurrent);
    });
  };

  window.addEventListener("scroll", setCurrent, { passive: true });
  setCurrent();
}

setupReveal();
setupScrollspy();
