import Alpine from 'alpinejs';
window.Alpine = Alpine;
Alpine.start();

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

window.addEventListener('scroll', () => {
  const hero        = document.querySelector('.hero-wrapper');
  const fadeOverlay = document.getElementById('hero-dark-fade');
  const titleGroup  = document.getElementById('hero-title-group');

  if (!hero || !fadeOverlay) return;

  const scrollY = window.scrollY;
  const vh = window.innerHeight;

  // How far we've scrolled relative to one viewport height
  let progress = scrollY / (vh * 0.85);           // 0.85 = effect ends ~85% down first screen
  progress = Math.max(0, Math.min(1, progress));

  // Push hero upward (creates "being pushed by content" illusion)
  const maxPush = vh * 0.45;                      // max ~45vh upward movement
  hero.style.transform = `translateY(-${progress * maxPush}px)`;

  // Fade to black
  fadeOverlay.style.opacity = Math.min(0.92, progress * 1.35);  // strong fade

  // Optional: fade out & lift title
  if (titleGroup) {
    titleGroup.style.opacity = 1 - progress * 1.7;
    titleGroup.style.transform = `translateY(-${progress * 120}px)`;
  }
});

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
