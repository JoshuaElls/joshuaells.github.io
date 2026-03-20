import 'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js';


// ... your DOMContentLoaded listener, scroll listeners, etc.

// Force video autoplay after load (helps with strict policies)
document.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('video');
  if (video) {
    video.play().catch(err => {
      console.log('Autoplay prevented:', err);
      document.body.addEventListener('click', () => video.play(), { once: true });
    });
  }
});

// Single scroll listener for parallax + debug (unchanged)
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY;
  
  // Toggle scrolled class
  const shouldBeScrolled = scrollPos > 20;
  document.body.classList.toggle('scrolled', shouldBeScrolled);
  
  // Debug: log when class changes
  console.log('Scrolled class:', document.body.classList.contains('scrolled'), 'ScrollY:', scrollPos);

  // Apply transform directly to hero-bg (video) – your commented code
  /*
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    const slideAmount = Math.min(scrollPos * 0.2, 180);  // max 180px up
    heroBg.style.transform = `translateY(-${slideAmount}px) scale(1.08)`;
    console.log('Applied transform:', heroBg.style.transform);
  }
  */
});

// Hero push-up + fade + title handover logic (improved timing & push feel)
window.addEventListener('scroll', () => {
  const hero          = document.querySelector('.hero-wrapper');
  const intro         = document.querySelector('#hero-reveal-intro');
  const heroTitle     = document.getElementById('hero-title-group');
  const introTitle    = document.getElementById('intro-title-reveal');
  const fadeOverlay   = document.getElementById('hero-dark-fade');

  if (!hero || !intro || !fadeOverlay) return;

  const introRect      = intro.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  // ─────────────────────────────────────────────────────────────
  // TUNING SECTION ─ adjust these numbers to control timing & feel
  // ─────────────────────────────────────────────────────────────

  const fadeStart       = viewportHeight * 0.45;   // dark fade begins fairly early
  const pushStart       = viewportHeight * 0.28;   // hero starts moving up earlier
  const handoverZone    = viewportHeight * 0.90;   // longer transition = more gradual

  const heroPushStrength   = 180;                  // max px the hero title moves up
  const introRiseDistance  = 220;                  // how far below it starts

  const distanceToTop = introRect.top;
  let progress = (pushStart - distanceToTop) / handoverZone;
  progress = Math.max(0, Math.min(1, progress));

  // 1. Push entire hero wrapper up (background + video + overlays)
  const pushAmount  = Math.max(0, pushStart - distanceToTop);
  const maxPush     = Math.min(introRect.height * 0.5, viewportHeight * 0.4);
  const clampedPush = Math.min(pushAmount, maxPush);
  hero.style.transform = `translateY(-${clampedPush}px)`;

  // 2. Dark fade
  let fadeProg = (fadeStart - distanceToTop) / (viewportHeight * 0.9);
  fadeProg = Math.max(0, Math.min(1, fadeProg));
  fadeOverlay.style.opacity = fadeProg * 0.80;      // 0.80 = nice moody end point

  // 3. Hero title: strong upward push + fade out
  if (heroTitle) {
    const moveUpPx    = -progress * heroPushStrength;
    const opacityOut  = 1 - progress * 1.5;         // fade out faster than movement
    heroTitle.style.transform = `translateY(${moveUpPx}px)`;
    heroTitle.style.opacity   = Math.max(0, opacityOut);
  }

  // 4. Intro title (This is a TEST + paragraph): rise earlier + normal fade-in
  if (introTitle) {
    // Starts much earlier → more natural reveal
    let introProg = (pushStart - distanceToTop + viewportHeight * 0.25) / handoverZone;
    introProg = Math.max(0, Math.min(1, introProg));

    const moveUpPx   = introRiseDistance * (1 - introProg);
    const opacityIn  = introProg;

    introTitle.style.transform = `translateY(${moveUpPx}px)`;
    introTitle.style.opacity   = opacityIn;
  }
});
