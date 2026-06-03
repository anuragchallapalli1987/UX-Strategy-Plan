/* ==========================================
   PRINCIPAL UX ARCHITECT PORTFOLIO INTERACTIVITY
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initCaseFilters();
  initAccordions();
  initScrollAnimations();
});

/**
 * 1. Mobile Menu Toggle
 */
function initMobileNav() {
  const toggle = document.querySelector('.mobile-nav-toggle');
  const menu = document.querySelector('.nav-menu');
  const items = document.querySelectorAll('.nav-item');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      toggle.classList.toggle('active');
    });

    items.forEach(item => {
      item.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.classList.remove('active');
      });
    });
  }
}

/**
 * 2. Dynamic Case Study Filtering (Supports Comma-Separated Multi-Categories)
 */
function initCaseFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle active button styling
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const categoryAttr = card.getAttribute('data-category') || '';
          const categories = categoryAttr.split(',').map(c => c.trim());
          
          if (filterValue === 'all' || categories.includes(filterValue)) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }
}

/**
 * 3. Smooth Collapsible Accordions for Case Studies ARCH Briefs
 */
function initAccordions() {
  const accordHeaders = document.querySelectorAll('.accordion-header');

  if (accordHeaders.length > 0) {
    accordHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const panel = header.parentElement;
        const body = panel.querySelector('.accordion-body');
        
        // If already open, close it
        if (panel.classList.contains('open')) {
          body.style.maxHeight = null;
          panel.classList.remove('open');
        } else {
          // Open accordion and set dynamic scrollHeight
          panel.classList.add('open');
          body.style.maxHeight = body.scrollHeight + "px";
          
          // Re-calculate heights if window is resized or internal elements shift
          setTimeout(() => {
            if(panel.classList.contains('open')) {
              body.style.maxHeight = 'none';
            }
          }, 400);
        }
      });
    });
  }
}

/**
 * 4. Premium Scroll Reveal Animations
 * BUG FIX: Excluded entire section containers from scroll opacity masks. 
 * Only targets individual content blocks to prevent mobile deadlocks on tall containers.
 */
function initScrollAnimations() {
  // Target individual cards, stats, and headers - NOT entire sections
  const revealElements = document.querySelectorAll('.project-card, .google-card, .fact-card, .comp-category, .section-header');
  
  const isMobile = window.innerWidth <= 768;
  
  if ('IntersectionObserver' in window && !isMobile) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05, // Lower threshold triggers animations early on mobile
      rootMargin: "0px 0px -20px 0px"
    });

    revealElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(el);
    });
  } else {
    revealElements.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }
}

// Add stylesheet rules for intersection reveals dynamically
const style = document.createElement('style');
style.textContent = `
  .revealed {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);
