console.log('Alpine loaded?', !!window.Alpine);

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

// Hero push-up + fade + title handover logic
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero-wrapper');
  const fadeOverlay = document.getElementById('hero-dark-fade');
  const heroTitle = document.getElementById('hero-title-group');

  if (!hero || !fadeOverlay) {
    console.log('Hero or fade overlay missing — skipping');
    return;
  }

  const scrollY = window.scrollY;
  const vh = window.innerHeight;

  // Simple progress: 0 at top → 1 after scrolling ~80% of viewport height
  let progress = scrollY / (vh * 0.8);
  progress = Math.max(0, Math.min(1, progress));

  // Debug to confirm it's running (you'll see this in console when scrolling)
  console.log('Hero push running! Progress:', progress.toFixed(2), 'ScrollY:', scrollY);

  // 1. Push entire hero wrapper up
  const maxPush = vh * 0.45;  // adjust 0.45 to control movement distance
  hero.style.transform = `translateY(-${progress * maxPush}px)`;

  // 2. Dark fade
  fadeOverlay.style.opacity = progress * 0.85;  // adjust 0.85 for fade strength

  // 3. Hero title fade + lift
  if (heroTitle) {
    heroTitle.style.opacity = 1 - progress * 1.6;
    heroTitle.style.transform = `translateY(-${progress * 120}px)`;
  }
});
