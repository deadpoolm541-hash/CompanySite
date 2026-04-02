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
    hamburger.classList.add('active');
    document.documentElement.style.overflow = 'hidden';
  });

  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    document.documentElement.style.overflow = '';
  };

  if (mobileClose) mobileClose.addEventListener('click', closeMenu);

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      closeMenu();
      e.target.blur();
    });
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

/* ── Scroll Progress Bar ─────────────────────────────────────── */
const progressBar = document.getElementById('scroll-progress');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }, { passive: true });
}

/* ── Stack Explode (scroll-driven) ───────────────────────────── */
(function () {
  const section = document.getElementById('stack');
  if (!section) return;

  const layers = [
    document.getElementById('layer-1'),
    document.getElementById('layer-2'),
    document.getElementById('layer-3'),
    document.getElementById('layer-4'),
  ].filter(Boolean);

  const dots = [0, 1, 2, 3].map(i => document.getElementById('dot-' + i)).filter(Boolean);
  const hint = document.getElementById('explode-hint');
  const conns = [
    document.getElementById('conn-1'),
    document.getElementById('conn-2'),
    document.getElementById('conn-3'),
  ].filter(Boolean);

  // Vertical gap between layers when fully exploded (px)
  const GAP = 80;
  const N = layers.length;

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function lerp(a, b, t) { return a + (b - a) * clamp(t, 0, 1); }

  function onScroll() {
    const rect = section.getBoundingClientRect();
    // scrollable height inside the sticky section
    const scrollable = section.offsetHeight - window.innerHeight;
    // how far we've scrolled into this section (0 → scrollable)
    const scrolled = clamp(-rect.top, 0, scrollable);
    const progress = scrollable > 0 ? scrolled / scrollable : 0;

    // hide hint as soon as animation starts
    if (hint) hint.style.opacity = progress > 0.04 ? '0' : '0.4';

    // Spread layers symmetrically: centre = 0, others fan out
    const half = (N - 1) / 2;
    layers.forEach((layer, i) => {
      const targetY = (i - half) * GAP;
      const y = lerp(0, targetY, progress);

      layer.style.transform = `translateY(${y}px)`;
      layer.style.transition = 'none';

      // Fade non-active layers slightly when partially exploded
      const activeIdx = Math.round(progress * (N - 1));
      const isActive = i === activeIdx || progress < 0.08 || progress > 0.92;
      layer.style.opacity = isActive ? '1' : String(lerp(1, 0.5, progress));

      layer.classList.toggle('is-exploded', progress > 0.5);
    });

    // Connector lines between adjacent layers
    conns.forEach((conn, ci) => {
      if (!layers[ci] || !layers[ci + 1]) return;
      const matchA = layers[ci].style.transform.match(/translateY\(([^p]+)px\)/);
      const matchB = layers[ci + 1].style.transform.match(/translateY\(([^p]+)px\)/);
      const yA = matchA ? parseFloat(matchA[1]) : 0;
      const yB = matchB ? parseFloat(matchB[1]) : 0;
      const layerH = 68;
      const gap = yB - yA - layerH;
      if (gap > 4) {
        conn.style.opacity = String(clamp(progress * 3, 0, 1));
        conn.style.top = (yA + layerH) + 'px';
        conn.style.height = gap + 'px';
      } else {
        conn.style.opacity = '0';
        conn.style.height = '0';
      }
    });

    // Side progress dots
    const activeIdx = Math.min(N - 1, Math.round(progress * (N - 1)));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === activeIdx));
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  // Recalculate on resize
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();
})();
