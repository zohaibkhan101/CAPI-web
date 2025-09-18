document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector('.bx-menu-alt-right');
  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      const navList = document.querySelector('nav ul');
      if (navList) {
        navList.classList.toggle('showMenu');
      }
    });
  }

  const counters = document.querySelectorAll(".quick-stats .stat h3[data-target]");

  const animateCounter = (counterEl) => {
    const target = Number(counterEl.getAttribute("data-target")) || 0;
    const durationMs = 1200;
    const startTime = performance.now();
    const startValue = 0;
    const endValue = target;

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const value = Math.round(startValue + (endValue - startValue) * eased);
      counterEl.innerText = String(value);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const typingElement = document.querySelector(".typing-animation");
  const text = "Preserving Saudi Heritage\nBuilding the Future."; // Text to animate
  if (typingElement) {
    typingElement.innerHTML = text; // Set the text for the animation
  }

  // Scroll reveal animations
  const revealElements = [
    // hero
    ...document.querySelectorAll('.hero .hero-content > *'),
    // quick stats
    ...document.querySelectorAll('.quick-stats .stat'),
    // services
    ...document.querySelectorAll('.service .service-header > *, .service .service-cards .card'),
    // projects
    ...document.querySelectorAll('.projects .projects-header > *, .projects .project-cards .card'),
    // about
    ...document.querySelectorAll('.about .about-header > *, .about .about-content img'),
    // footer columns
    ...document.querySelectorAll('footer .container > div')
  ];

  const addBaseRevealClasses = (el, index) => {
    el.classList.add('reveal');
    // choose a style based on context
    if (el.matches('.service .service-cards .card, .project-cards .card, .quick-stats .stat, footer .container > div')) {
      el.classList.add('fade-up');
    } else if (el.matches('.about .about-content img')) {
      el.classList.add('zoom-in');
    } else if (el.matches('.about .about-header *')) {
      el.classList.add('slide-left');
    } else {
      el.classList.add('fade-in');
    }
    el.style.transitionDelay = `${(index % 6) * 80}ms`;
  };

  revealElements.forEach(addBaseRevealClasses);

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
      } else {
        entry.target.classList.remove('reveal-visible');
      }
    });
  }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));

  // Re-animate counters whenever in view
  const countersObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      if (entry.isIntersecting) {
        // reset before animating to ensure consistent replays
        el.innerText = '0';
        animateCounter(el);
      } else {
        // reset when leaving so it can animate again next time
        el.innerText = '0';
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(el => countersObserver.observe(el));
});

let slides = document.querySelectorAll(".slideshow img");
let current = 0;

function changeSlide() {
  slides[current].classList.remove("active");
  current = (current + 1) % slides.length;
  slides[current].classList.add("active");
}

setInterval(changeSlide, 4000); // change every 4 sec


