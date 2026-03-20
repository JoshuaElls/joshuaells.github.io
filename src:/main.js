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
  const hero = document.querySelector('.hero-wrapper');
  const fadeOverlay = document.getElementById('hero-dark-fade');
  const heroTitle = document.getElementById('hero-title-group');

  if (!hero || !fadeOverlay) return;

  const scrollPos = window.scrollY;
  const vh = window.innerHeight;
  const offersStart = document.querySelector('#offers')?.getBoundingClientRect().top || vh; // fallback

  // Progress: 0 at top → 1 when offers section reaches ~top of viewport
  let progress = Math.max(0, Math.min(1, (scrollPos) / (vh * 0.8))); // tune 0.8 for timing

  // 1. Push hero up (simulates being "pushed" by content below)
  const maxPush = vh * 0.4; // max ~40% of screen
  const pushAmount = progress * maxPush;
  hero.style.transform = `translateY(-${pushAmount}px)`;

  // 2. Stronger black fade as it pushes up
  const fadeOpacity = Math.min(0.92, progress * 1.4); // goes almost fully black
  fadeOverlay.style.opacity = fadeOpacity;

  // 3. Optional: fade out title faster for dramatic reveal
  if (heroTitle) {
    heroTitle.style.opacity = Math.max(0, 1 - progress * 1.8);
    heroTitle.style.transform = `translateY(-${progress * 120}px)`; // extra title lift
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
