// nav hide-unhide
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');

menuBtn.addEventListener('click', () => {
  nav.classList.toggle('show');
});

// image swiching
const thumbnails = document.querySelectorAll('.image-thumbs img');
const mainImage  = document.getElementById('main-image');

thumbnails.forEach(img => {
  img.addEventListener('click', () => (mainImage.src = img.src));
});

// menu unhide
const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0.2 }
);

document.querySelectorAll('.hidden').forEach(el => observer.observe(el));


// task 3 below
// form checking
const form = document.querySelector('form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const name    = form.querySelector('input[type="text"]').value.trim();
  const email   = form.querySelector('input[type="email"]').value.trim();
  const message = form.querySelector('textarea').value.trim();

  const namePattern  = /^[a-zA-Z ]+$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name.length < 2 || !namePattern.test(name)) {
    alert('Please enter a valid name (letters only, min 2 chars).');
    return;
  }

  if (!emailPattern.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  if (message.length < 10) {
    alert('Message should be at least 10 characters long.');
    return;
  }

  alert('Thank you! Your message has been sent.');
  form.reset();
});
// task 3 ended
