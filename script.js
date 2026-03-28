/* ============================================================
   CURATOR IT — Shared Interactivity
   Premium animations: cursor glow, typed text, scroll fx
   ============================================================ */

/* ── Cursor glow ─────────────────────────────────────────── */
const cursorGlow = document.getElementById('cursor-glow');
if (cursorGlow) {
  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
}

/* ── Typed text effect ───────────────────────────────────── */
const typedEl = document.getElementById('typed-headline');
if (typedEl) {
  const phrases = ['Digital Solutions', 'Web Experiences', 'Mobile Products', 'Cloud Systems'];
  let phraseIndex = 0;
  let charIndex = phrases[0].length; // start fully typed
  let deleting = false;
  let isPaused = false;

  // Add cursor span
  const cursor = document.createElement('span');
  cursor.className = 'typed-cursor';
  typedEl.parentNode.insertBefore(cursor, typedEl.nextSibling);

  function typeLoop() {
    const current = phrases[phraseIndex];

    if (isPaused) {
      isPaused = false;
      setTimeout(typeLoop, 80);
      return;
    }

    if (!deleting) {
      typedEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex >= current.length) {
        deleting = true;
        setTimeout(typeLoop, 2200);
        return;
      }
    } else {
      typedEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex <= 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        charIndex = 0;
        setTimeout(typeLoop, 350);
        return;
      }
    }

    setTimeout(typeLoop, deleting ? 42 : 70);
  }

  // Wait 2.5s before starting typing cycle
  setTimeout(typeLoop, 2500);
}

/* ── Navigation scroll effect ────────────────────────────── */
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ── Scroll-triggered fade-up ────────────────────────────── */
const fadeEls = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => observer.observe(el));

/* ── Active nav link ─────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href').includes(id)
        );
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ── Mobile menu ─────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileClose = document.getElementById('mobile-close');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (mobileClose) mobileClose.addEventListener('click', closeMenu);

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ── Smooth anchor scroll ────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── Card tilt effect ────────────────────────────────────── */
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -4;
    const rotateY = ((x - cx) / cx) * 4;
    card.style.transform = `translateY(-4px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.transformOrigin = 'center';
    card.style.transition = 'transform 0.1s linear, border-color 0.3s, box-shadow 0.3s';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s ease, border-color 0.3s, box-shadow 0.3s';
  });
});
