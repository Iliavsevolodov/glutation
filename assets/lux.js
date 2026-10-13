/* Premium interactions: reduced-motion safe, zero dependencies */
(function(){
  'use strict';
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse=window.matchMedia('(pointer: coarse)').matches;
  const scene=document.getElementById('heroVisual');
  if(scene){
    const ambient=document.createElement('div');
    ambient.className='hero-ambient';
    ambient.setAttribute('aria-hidden','true');
    scene.prepend(ambient);
    ['p1','p2','p3'].forEach(className=>{
      const particle=document.createElement('span');
      particle.className='hero-particle '+className;
      particle.setAttribute('aria-hidden','true');
      scene.append(particle);
    });
    const chip=document.createElement('div');
    chip.className='hero-glass-chip';
    chip.setAttribute('aria-hidden','true');
    chip.innerHTML='<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 1v3m0 16v3M1 12h3m16 0h3"/></svg><span>Современная формула<small>Глутатион + витамин Е</small></span>';
    scene.append(chip);
    if(!reduce&&!coarse){
      let frame;
      function applyTilt(e){
        const rect=scene.getBoundingClientRect();
        const dx=(e.clientX-rect.left)/rect.width-.5;
        const dy=(e.clientY-rect.top)/rect.height-.5;
        cancelAnimationFrame(frame);
        frame=requestAnimationFrame(()=>{
          scene.dataset.interactive='1';
          scene.style.setProperty('--tilt-x',(dx*18).toFixed(1)+'px');
          scene.style.setProperty('--tilt-y',(dy*10).toFixed(1)+'px');
          scene.style.setProperty('--rotation-x',(-dy*7).toFixed(1)+'deg');
          scene.style.setProperty('--rotation-y',(dx*11).toFixed(1)+'deg');
          scene.style.setProperty('--glow-x',(dx*25).toFixed(1)+'px');
          scene.style.setProperty('--glow-y',(dy*18).toFixed(1)+'px');
        });
      }
      scene.addEventListener('pointermove',applyTilt,{passive:true});
      scene.addEventListener('pointerleave',()=>{
        scene.style.setProperty('--tilt-x','0px');
        scene.style.setProperty('--tilt-y','0px');
        scene.style.setProperty('--rotation-x','0deg');
        scene.style.setProperty('--rotation-y','0deg');
        scene.style.setProperty('--glow-x','0px');
        scene.style.setProperty('--glow-y','0px');
      });
    }
  }
  // Buttons, details and mini icons all use inline SVG, not emoji.
  document.querySelectorAll('.footer-links a').forEach(a=>{
    if(a.textContent.includes('↑')){
      a.textContent='Наверх ';
      a.insertAdjacentHTML('beforeend','<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 19V5m-6 6 6-6 6 6"/></svg>');
    }else if(a.textContent.includes('↗')){
      a.textContent='Официальный магазин ';
      a.insertAdjacentHTML('beforeend','<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 20 20 4M8 4h12v12"/></svg>');
    }
  });
  // Ticker dots and card arrows are built in CSS as masks.
  document.querySelectorAll('.benefit .corner').forEach(el=>{el.textContent='';});
  // Carefully avoid any white background or blending in product PNG/WebP.
  document.querySelectorAll('img[src*="glutathione-bottle"]').forEach(img=>{
    img.style.background='transparent';
    img.style.mixBlendMode='normal';
  });
})();