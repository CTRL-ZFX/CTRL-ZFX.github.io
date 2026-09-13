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

(() => {const el=document.querySelector('.counter-number');if(!el)return;const start=95,weekly=2,key='ctrlZfxWorkCounterStart',now=Date.now();let first=Number(localStorage.getItem(key));if(!first||first>now){first=now;localStorage.setItem(key,String(first));}const target=start+Math.floor((now-first)/(7*24*60*60*1000))*weekly;const begin=performance.now();const run=t=>{const q=Math.min(1,(t-begin)/1300),e=1-Math.pow(1-q,3);el.textContent=Math.round(target*e)+'+';if(q<1)requestAnimationFrame(run)};new IntersectionObserver((x,o)=>{if(x.some(e=>e.isIntersecting)){requestAnimationFrame(run);o.disconnect()}},{threshold:.25}).observe(el)})();

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
