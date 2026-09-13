const links=[...document.querySelectorAll('.nav-links a')];
const sections=[...document.querySelectorAll('section[id]')];
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id));}),{threshold:.45});
sections.forEach(s=>observer.observe(s));
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});}}));
const menu=document.querySelector('.menu-btn'), nav=document.querySelector('.nav-links');
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('mobile-open');menu.setAttribute('aria-expanded',String(open));});
links.forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('mobile-open');menu?.setAttribute('aria-expanded','false');}));
const glow=document.querySelector('.cursor-glow');
window.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'});

// Reveal sections smoothly as they enter the viewport.
const revealTargets=[...document.querySelectorAll('.section-head,.project,.services-grid>div,.about-copy,.about-photo,.contact-grid')];
revealTargets.forEach((el,i)=>{el.classList.add('reveal');el.style.setProperty('--reveal-delay',`${Math.min(i*35,280)}ms`)});
const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');revealObserver.unobserve(e.target)}}),{threshold:.12});
revealTargets.forEach(el=>revealObserver.observe(el));

// Interactive service cards: reveal the matching service description on click.
document.querySelectorAll('.service-card').forEach(card=>{
  card.addEventListener('click',()=>{
    const wasOpen=card.getAttribute('aria-expanded')==='true';
    document.querySelectorAll('.service-card').forEach(c=>c.setAttribute('aria-expanded','false'));
    card.setAttribute('aria-expanded',String(!wasOpen));
  });
});


// Ambient music + UI click sounds. Browsers may block autoplay until the visitor interacts once.
(() => {
  const music=document.getElementById('bgMusic');
  const click=document.getElementById('uiClick');
  const soft=document.getElementById('uiSoftClick');
  const toggle=document.getElementById('soundToggle');
  if(!music||!click||!soft||!toggle)return;
  const key='ctrlZfxSoundEnabled';
  const saved=localStorage.getItem(key);
  let enabled=saved==='true';
  music.volume=0.075; click.volume=0.22; soft.volume=0.16;
  const update=()=>{toggle.classList.toggle('is-on',enabled);toggle.setAttribute('aria-pressed',String(enabled));toggle.setAttribute('aria-label',enabled?'Turn sound off':'Turn sound on');toggle.querySelector('.sound-text').textContent=enabled?'SOUND ON':'SOUND OFF';toggle.querySelector('.sound-icon').textContent=enabled?'♫':'♪'};
  const start=()=>{if(enabled)music.play().catch(()=>{})};
  update();
  if(enabled)start();
  const unlock=()=>{if(!enabled)return;start();window.removeEventListener('pointerdown',unlock);window.removeEventListener('keydown',unlock)};
  window.addEventListener('pointerdown',unlock,{once:true}); window.addEventListener('keydown',unlock,{once:true});
  toggle.addEventListener('click',()=>{enabled=!enabled;localStorage.setItem(key,String(enabled));update();if(enabled){music.play().catch(()=>{})}else{music.pause();music.currentTime=0}});
  const interactive='a,button,.project,.category-card,.service-card';
  document.querySelectorAll(interactive).forEach(el=>el.addEventListener('click',()=>{
    if(el===toggle)return;
    if(enabled){const isNav=el.matches('a');const snd=isNav?soft:click;snd.currentTime=0;snd.play().catch(()=>{})}
  }));
})();
