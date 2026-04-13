const preloader = document.getElementById('preloader');
const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primary-nav');
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const testimonials = Array.from(document.querySelectorAll('.testimonial'));
const prevBtn = document.getElementById('prevTestimonial');
const nextBtn = document.getElementById('nextTestimonial');

window.addEventListener('load', () => {
  preloader.classList.add('hidden');
});

if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    primaryNav.classList.toggle('open');
  });

  primaryNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      primaryNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

let currentTestimonial = 0;
function renderTestimonial(index) {
  testimonials.forEach((item, idx) => {
    item.classList.toggle('active', idx === index);
  });
}

if (testimonials.length > 0) {
  renderTestimonial(currentTestimonial);

  nextBtn?.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    renderTestimonial(currentTestimonial);
  });

  prevBtn?.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    renderTestimonial(currentTestimonial);
  });

  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    renderTestimonial(currentTestimonial);
  }, 5500);
}

if (form) {
  form.addEventListener('submit', (event) => {
    const name = document.getElementById('name');
    const phone = document.getElementById('phone');
    const grade = document.getElementById('grade');
    const message = document.getElementById('message');

    const phoneOk = /^[0-9]{10}$/.test(phone.value.trim());
    const allFilled =
      name.value.trim() && phone.value.trim() && grade.value.trim() && message.value.trim();

    if (!allFilled || !phoneOk) {
      event.preventDefault();
      formMessage.textContent = 'Please enter all fields correctly. Phone should be 10 digits.';
      formMessage.style.color = '#a10f1c';
      return;
    }

    formMessage.textContent =
      'Submitting your enquiry... (Replace Formspree endpoint in index.html to activate.)';
    formMessage.style.color = '#0f6b37';
  });
}

document.getElementById('year').textContent = new Date().getFullYear();
