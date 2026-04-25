// ===== Auth Check =====
const currentUser = JSON.parse(localStorage.getItem('jcaCurrentUser'));
if (!currentUser) { window.location.href = 'login.html'; }

// ===== Populate user info in sidebar =====
(function initUser() {
  const avatar = document.getElementById('sidebarAvatar');
  const name = document.getElementById('sidebarName');
  const meta = document.getElementById('sidebarMeta');
  if (currentUser && avatar) {
    avatar.textContent = currentUser.avatar || '🎨';
    name.textContent = currentUser.name || 'Guest';
    meta.textContent = '@' + (currentUser.username || 'guest') + ' · ' + (currentUser.city || 'Kenya');
  }
})();

function handleLogout() {
  localStorage.removeItem('jcaCurrentUser');
  window.location.href = 'login.html';
}

// ===== Theme Switcher =====
const themeBtns = document.querySelectorAll('.theme-btn');
function setTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('theme', t);
  themeBtns.forEach(b => b.classList.toggle('active', b.dataset.theme === t));
}
themeBtns.forEach(b => b.addEventListener('click', () => setTheme(b.dataset.theme)));
const savedTheme = localStorage.getItem('theme');
if (savedTheme) setTheme(savedTheme);

// ===== Sidebar Toggle (mobile) =====
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarOverlay = document.getElementById('sidebarOverlay');

if (sidebarToggle) {
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    sidebarOverlay.classList.toggle('open');
  });
}
if (sidebarOverlay) {
  sidebarOverlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('open');
  });
}

// ===== Sidebar user menu =====
const sidebarUser = document.getElementById('sidebarUser');
const sidebarUserMenu = document.getElementById('sidebarUserMenu');
if (sidebarUser) {
  sidebarUser.addEventListener('click', (e) => {
    e.stopPropagation();
    sidebarUserMenu.classList.toggle('open');
  });
  document.addEventListener('click', () => sidebarUserMenu.classList.remove('open'));
}

// ===== Scroll Reveal =====
const obs = new IntersectionObserver(es => {
  es.forEach(e => {
    if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }
  });
}, { threshold: .1 });
document.querySelectorAll('.gallery-card,.creator-card,.about-grid,.journal-card,.comment-bubble,.challenge-card,.poll-option').forEach(el => {
  el.style.opacity = '0'; el.style.transform = 'translateY(30px)'; el.style.transition = 'opacity .6s ease,transform .6s ease'; obs.observe(el);
});

// ===== Active nav link highlight =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.sidebar-nav a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});
