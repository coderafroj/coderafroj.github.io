// ---------- Typewriter Effect ----------
const roles = [
  "Cyber Security Aspirant", 
  "Bug Hunter", 
  "CS Teacher", 
  "Full Stack Developer"
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typewriter() {
  const textEl = document.getElementById("typewriter-text");
  if (!textEl) return;

  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    textEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 50; // Faster when deleting
  } else {
    textEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 100;
  }

  // If word is complete
  if (!isDeleting && charIndex === currentRole.length) {
    typeSpeed = 2000; // Pause at the end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeSpeed = 500; // Pause before typing next word
  }

  setTimeout(typewriter, typeSpeed);
}

// ---------- Scroll Reveal Animations ----------
function setupScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: Stop observing once revealed if you only want it to animate once
        // observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => observer.observe(el));
}

// ---------- Navbar & Mobile Menu ----------
function setupNavbar() {
  const navbar = document.getElementById('navbar');
  const menuBtn = document.getElementById('menu-btn');
  const navlinks = document.getElementById('navlinks');
  const links = document.querySelectorAll('.navlinks a');
  const sections = document.querySelectorAll('section, header');

  // Sticky Nav Background
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'var(--bg-surface-glass)';
      navbar.style.borderBottom = '1px solid var(--border-light)';
    } else {
      navbar.style.background = 'transparent';
      navbar.style.borderBottom = '1px solid transparent';
    }
  });

  // Mobile Menu Toggle
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      navlinks.classList.toggle('menu-open');
      const icon = menuBtn.querySelector('i');
      if (navlinks.classList.contains('menu-open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  }

  // Close mobile menu when a link is clicked
  links.forEach(link => {
    link.addEventListener('click', () => {
      navlinks.classList.remove('menu-open');
      if(menuBtn) {
        const icon = menuBtn.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  });

  // Active Link Highlight on Scroll
  function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();
}

// ---------- Initialize All ----------
document.addEventListener('DOMContentLoaded', () => {
  typewriter();
  setupScrollReveal();
  setupNavbar();
});
