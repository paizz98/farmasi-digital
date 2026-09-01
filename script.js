/* ===== Navbar Scroll Effect ===== */
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
    scrollTopBtn.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== Smooth Active Nav Link ===== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active-nav');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active-nav');
        }
      });
    }
  });
});

/* ===== Intersection Observer for Animations ===== */
const animateEls = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
    }
  });
}, { threshold: 0.12 });

animateEls.forEach(el => observer.observe(el));

/* ===== Counter Animation ===== */
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const duration = 2000;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString('id') + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('[data-count]');
      counters.forEach(counter => {
        const target = parseInt(counter.dataset.count);
        const suffix = counter.dataset.suffix || '';
        animateCounter(counter, target, suffix);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.hero-stats');
if (statsSection) statsObserver.observe(statsSection);

/* ===== Product Tabs ===== */
const tabBtns = document.querySelectorAll('.tab-btn');
const productCards = document.querySelectorAll('.product-card');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const category = btn.dataset.tab;

    productCards.forEach(card => {
      if (category === 'semua' || card.dataset.category === category) {
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => { card.style.display = 'none'; }, 300);
      }
    });
  });
});

/* ===== Add to Cart / Wish ===== */
const cartBtns = document.querySelectorAll('.btn-add-cart');

cartBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    showToast('✅ Produk ditambahkan ke keranjang!');
    btn.innerHTML = '✓';
    btn.style.background = 'var(--accent-2)';
    setTimeout(() => {
      btn.innerHTML = '+';
      btn.style.background = '';
    }, 2000);
  });
});

/* ===== Contact Form ===== */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('.form-submit');
    submitBtn.innerHTML = '⏳ Mengirim...';
    submitBtn.disabled = true;
    setTimeout(() => {
      submitBtn.innerHTML = '✅ Pesan Terkirim!';
      submitBtn.style.background = 'var(--accent-2)';
      showToast('🎉 Pesan Anda berhasil dikirim! Kami akan segera merespons.');
      contactForm.reset();
      setTimeout(() => {
        submitBtn.innerHTML = '📨 Kirim Pesan';
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 3000);
    }, 1800);
  });
}

/* ===== Toast Notification ===== */
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
}

/* ===== Newsletter Form ===== */
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('📧 Terima kasih! Anda telah berlangganan newsletter kami.');
    newsletterForm.reset();
  });
}

/* ===== Hamburger Menu ===== */
const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {
  const nav = document.querySelector('.nav-links');
  const cta = document.querySelector('.nav-cta');
  const isOpen = nav.style.display === 'flex';

  const style = `
    position: fixed; top: 70px; left: 0; right: 0;
    background: rgba(15,23,42,0.97); backdrop-filter: blur(20px);
    flex-direction: column; padding: 24px; gap: 16px; z-index: 999;
    border-top: 1px solid rgba(255,255,255,0.08);
  `;

  if (isOpen) {
    nav.style.display = 'none';
    if (cta) cta.style.display = 'none';
  } else {
    nav.style.cssText = style;
    if (cta) {
      cta.style.cssText = `
        position: fixed; top: calc(70px + ${nav.querySelectorAll('li').length * 52 + 48}px);
        left: 0; right: 0; background: rgba(15,23,42,0.97);
        padding: 0 24px 24px; z-index: 999; backdrop-filter: blur(20px);
        border-radius: 0 0 16px 16px;
      `;
    }
  }
});

/* ===== Active nav style ===== */
const style = document.createElement('style');
style.textContent = `.active-nav { color: var(--primary) !important; }`;
document.head.appendChild(style);
