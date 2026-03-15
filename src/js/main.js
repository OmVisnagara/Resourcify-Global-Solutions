/**
 * main.js — Global JavaScript
 * Mobile nav toggle and shared interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation toggle
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.querySelector('.material-symbols-outlined').textContent = isOpen ? 'close' : 'menu';
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.querySelector('.material-symbols-outlined').textContent = 'menu';
        document.body.style.overflow = '';
      });
    });
  }

  // Init scroll animations
  initScrollAnimations();

  // Init FAQ accordion
  initFaqAccordion();
});

/**
 * Scroll-triggered animations using IntersectionObserver
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if (!animatedElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger animations for grid children
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  animatedElements.forEach((el, index) => {
    // Auto-stagger items within grids
    if (!el.dataset.delay && el.parentElement) {
      const siblings = Array.from(el.parentElement.children).filter(child =>
        child.classList.contains('animate-on-scroll')
      );
      const siblingIndex = siblings.indexOf(el);
      if (siblingIndex > 0) {
        el.dataset.delay = siblingIndex * 100;
      }
    }
    observer.observe(el);
  });
}

/**
 * Show toast notification
 */
function showToast(message, type = 'success', duration = 4000) {
  // Remove existing toasts
  document.querySelectorAll('.toast').forEach(t => t.remove());

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Export for use in other modules
window.showToast = showToast;

/**
 * FAQ Accordion toggle
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(other => {
        other.classList.remove('active');
        const btn = other.querySelector('.faq-question');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      // Toggle the clicked item
      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
