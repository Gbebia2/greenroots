const ham = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const navItems = navLinks ? navLinks.querySelectorAll('li') : [];
const overlay = document.getElementById('nav-overlay');
const contactBtn = document.getElementById('contact-btn');
const contactInfo = document.getElementById('contact-info');

function closeMenu() {
  navLinks.classList.remove('show');
  ham.classList.remove('open');
  ham.setAttribute('aria-expanded', false);
  ham.textContent = '☰';
  navItems.forEach(item => item.style.transitionDelay = '0s');
  overlay.classList.remove('show');
}

ham && ham.addEventListener('click', () => {
  const opened = ham.classList.toggle('open');
  navLinks.classList.toggle('show', opened);
  overlay.classList.toggle('show', opened);
  ham.setAttribute('aria-expanded', opened);
  ham.textContent = opened ? '✕' : '☰';

  navItems.forEach((item, index) => {
    item.style.transitionDelay = opened ? `${index * 0.1 + 0.2}s` : '0s';
  });
});

// click outside (overlay) closes menu
overlay && overlay.addEventListener('click', closeMenu);

if (contactBtn) {
  contactBtn.addEventListener('click', () => {
    contactInfo.classList.toggle('show');
  });
}
