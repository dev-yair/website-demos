const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

const tabs = document.querySelectorAll('.tab');
const grids = { starters: document.getElementById('starters'), mains: document.getElementById('mains'), pasta: document.getElementById('pasta'), desserts: document.getElementById('desserts') };
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.dataset.tab;
    Object.entries(grids).forEach(([key, el]) => el.classList.toggle('hidden', key !== target));
  });
});

function handleReserve(e) {
  e.preventDefault();
  document.getElementById('formSuccess').classList.remove('hidden');
  e.target.querySelector('button[type=submit]').disabled = true;
  e.target.querySelector('button[type=submit]').style.opacity = '0.5';
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.menu-item, .schedule-card, .about-card, .strip-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);
});
