const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
menuBtn?.addEventListener('click', () => navLinks.classList.toggle('open'));

document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

const modal = document.getElementById('reelModal');
document.getElementById('playReel')?.addEventListener('click', () => modal.classList.add('show'));
document.getElementById('closeModal')?.addEventListener('click', () => modal.classList.remove('show'));
modal?.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('show'); });

// Subtle animated gold particles — lightweight and dependency-free.
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
function resize() {
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
}
function seed() {
  const count = Math.min(75, Math.floor(innerWidth / 18));
  particles = Array.from({length: count}, () => ({
    x: Math.random()*innerWidth, y: Math.random()*innerHeight,
    r: Math.random()*1.4+.25, vx:(Math.random()-.5)*.18, vy:-(Math.random()*.25+.03),
    a: Math.random()*.35+.08
  }));
}
function draw() {
  ctx.clearRect(0,0,innerWidth,innerHeight);
  for (const p of particles) {
    p.x += p.vx; p.y += p.vy;
    if (p.y < -5) p.y = innerHeight + 5;
    if (p.x < -5) p.x = innerWidth + 5;
    if (p.x > innerWidth + 5) p.x = -5;
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle = `rgba(215,168,70,${p.a})`; ctx.fill();
  }
  requestAnimationFrame(draw);
}
addEventListener('resize', () => { resize(); seed(); });
resize(); seed(); draw();

// Reveal sections gently on scroll.
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
},{threshold:.12});
document.querySelectorAll('.work,.services,.showreel,.about,.contact').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'opacity .8s ease, transform .8s ease';
  observer.observe(el);
});
const revealStyle = document.createElement('style');
revealStyle.textContent = '.work.visible,.services.visible,.showreel.visible,.about.visible,.contact.visible{opacity:1!important;transform:none!important}';
document.head.appendChild(revealStyle);
