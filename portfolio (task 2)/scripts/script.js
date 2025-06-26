// Elements
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

// Toggle mobile menu
menuToggle.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

// Close menu and smooth scroll on nav link click
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    // Auto-close mobile menu
    navbar.classList.remove('active');
  });
});

// Highlight active nav link on scroll
function updateActiveLink() {
  let scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}
window.addEventListener('scroll', updateActiveLink);
updateActiveLink(); // on load

// GSAP Animations
gsap.from(".logo", { opacity: 0, y: -20, duration: 1, delay: 0.2 });
// gsap.from(".nav-link", { opacity: 0, y: -20, duration: 1, delay: 0.4, stagger: 0.1 });
gsap.from(".home-content h1", { opacity: 0, x: -50, duration: 1, delay: 0.6 });
gsap.from(".home-content h3", { opacity: 0, x: -50, duration: 1, delay: 0.9 });
gsap.from(".home-content p", { opacity: 0, x: -50, duration: 1, delay: 1.2 });
gsap.from(".btn-box", { opacity: 0, y: 20, duration: 1, delay: 1.5 });
gsap.from(".home-image img", { opacity: 0, scale: 0.8, duration: 1.2, delay: 1.5 });

// Typing effect
const typedText = document.querySelector(".animated-role");
const roles = ["Web Developer", "Frontend Enthusiast", "UI/UX Learner"];
let roleIndex = 0, charIndex = 0, isDeleting = false;

function typeRole() {
  const currentRole = roles[roleIndex];
  typedText.textContent = currentRole.substring(0, charIndex);

  if (!isDeleting && charIndex < currentRole.length) {
    charIndex++;
    setTimeout(typeRole, 100);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeRole, 50);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, 1000);
  }
}
typeRole();

// Animate skill cards and progress bars
gsap.utils.toArray('.skill-card').forEach(card => {
  gsap.from(card, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    scrollTrigger: {
      trigger: card,
      start: 'top 85%',
    }
  });
});

gsap.utils.toArray('.skill-bar span').forEach(bar => {
  const finalWidth = bar.style.width;
  bar.style.width = 0;
  gsap.to(bar, {
    width: finalWidth,
    duration: 1.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: bar,
      start: 'top 90%',
    }
  });
});

gsap.from(".footer-container", {
  opacity: 0,
  y: 30,
  duration: 1,
  delay: 0.5,
  scrollTrigger: {
    trigger: ".footer",
    start: "top 90%",
  }
});
