
function safeParse(key, fallback){
  try{
    const raw = localStorage.getItem(key);
    if(!raw) return fallback;
    const val = JSON.parse(raw);
    return (val===null||typeof val==='undefined') ? fallback : val;
  }catch(e){ return fallback; }
}

const hookSets={bold:["Stop scrolling. Start building.","The broke-to-built blueprint nobody told you about.","If you’re over 40, this will make you dangerous online."],friendly:["Hey friend—got 30 seconds?","If we were on a walk, I’d tell you this…","Can I give you a shortcut today?"],proof:["I went from $130 to five-figure months.","Systems > motivation. Here’s what I did.","These steps flipped my results fast."]};
document.addEventListener('DOMContentLoaded',()=>{
  const tone=document.getElementById('hookTone'); const out=document.getElementById('hookOutput'); const btn=document.getElementById('generateHook'); const histEl=document.getElementById('hookHistory');
  function render(){const h=safeParse('mwa_hook_history',[]); if(histEl) histEl.innerHTML='<h3>Hook History</h3>'+h.map(x=>`<div class="card"><strong>${x.date}</strong><p>${x.text}</p></div>`).join('');}
  if(btn) btn.addEventListener('click',()=>{const list=hookSets[tone.value]||hookSets.bold; const text=list[Math.floor(Math.random()*list.length)]; if(out) out.textContent=text; const h=safeParse('mwa_hook_history',[]); h.unshift({date:new Date().toLocaleString(),text}); localStorage.setItem('mwa_hook_history',JSON.stringify(h)); render(); if(window.updateGrowth)updateGrowth();});
  render();
});
