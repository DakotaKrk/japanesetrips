// År i footer
document.getElementById('year').textContent = new Date().getFullYear();

// Tema-knapp
const root = document.documentElement;
const toggle = document.getElementById('themeToggle');
function setTheme(mode){
  root.classList.toggle('dark', mode === 'dark');
  toggle.setAttribute('aria-pressed', mode === 'dark');
  toggle.textContent = mode === 'dark' ? '☀︎' : '☾';
  localStorage.setItem('jp-theme', mode);
}
setTheme(localStorage.getItem('jp-theme') || 'light');
toggle.addEventListener('click', () => {
  setTheme(root.classList.contains('dark') ? 'light' : 'dark');
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCap = document.getElementById('lbCap');
const lbClose = document.getElementById('lbClose');

document.querySelectorAll('.tile').forEach(tile => {
  tile.addEventListener('click', e => {
    e.preventDefault();
    lbImg.src = tile.getAttribute('href');
    lbImg.alt = tile.querySelector('img').alt;
    lbCap.textContent = tile.querySelector('.cap').textContent;
    lightbox.showModal();
  });
});
lbClose.addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.close(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && lightbox.open) lightbox.close(); });

// Accordion
document.querySelectorAll('.acc-trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    const panel = document.getElementById(btn.getAttribute('aria-controls'));
    btn.setAttribute('aria-expanded', String(!expanded));
    panel.hidden = expanded;
  });
});

// Reveal on scroll
const revealEls = document.querySelectorAll('[data-reveal]');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      io.unobserve(e.target);
    }
  });
},{ threshold: 0.15 });
revealEls.forEach(el => io.observe(el));