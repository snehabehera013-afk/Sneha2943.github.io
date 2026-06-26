// ============================================================
// SNEHA BEHERA — PORTFOLIO SCRIPTS
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── NAVBAR SCROLL ───────────────────────────────────────
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  // ── HAMBURGER MENU ──────────────────────────────────────
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
  hamburger?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
  // Close on link click (mobile)
  navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }));

  // ── SCROLL REVEAL ───────────────────────────────────────
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));

  // ── ACTIVE NAV LINK ─────────────────────────────────────
  const sections    = document.querySelectorAll('section[id]');
  const navAnchors  = document.querySelectorAll('.nav-links a[href^="#"]');
  const activateNav = () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navAnchors.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${current}`
        ? 'var(--text-primary)'
        : '';
    });
  };
  window.addEventListener('scroll', activateNav);

  // ── CONTACT FORM (mailto fallback) ──────────────────────
  const form = document.getElementById('contactForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = form.querySelector('#name').value.trim();
    const email   = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();
    if (!name || !email || !message) return;

    const subject  = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body     = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:Snehabehera013@gmail.com?subject=${subject}&body=${body}`;

    const status = document.getElementById('formStatus');
    status.classList.add('success');
    status.textContent = '✓ Opening your email client…';
    form.reset();
    setTimeout(() => status.classList.remove('success'), 4000);
  });

  // ── TYPING ANIMATION (hero subtitle) ────────────────────
  const typingEl = document.getElementById('typingText');
  if (typingEl) {
    const phrases = [
      'ML Researcher',
      'Deep Learning Engineer',
      'NLP Practitioner',
      'AI for Science Builder',
    ];
    let pi = 0, ci = 0, deleting = false;
    const tick = () => {
      const phrase = phrases[pi];
      typingEl.textContent = deleting
        ? phrase.slice(0, ci--)
        : phrase.slice(0, ci++);
      if (!deleting && ci > phrase.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
      if (deleting && ci < 0) {
        deleting = false;
        ci = 0;
        pi = (pi + 1) % phrases.length;
      }
      setTimeout(tick, deleting ? 50 : 95);
    };
    tick();
  }

  // ── SMOOTH SCROLL for all in-page anchors ───────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
