
function safeParse(key, fallback){
  try{
    const raw = localStorage.getItem(key);
    if(!raw) return fallback;
    const val = JSON.parse(raw);
    return (val===null||typeof val==='undefined') ? fallback : val;
  }catch(e){ return fallback; }
}

function buildCaption(notes){
  const cta="DM 'RESET' for access or drop a 🖤 for the link.";
  const structure=[ "HOOK → Punchy and specific.", notes||"BODY → Speak to pain/shift/result in real language.", "PROOF → Share 1 tiny win or lesson.", "CTA → "+cta ];
  return structure.join("\n\n");
}
document.addEventListener('DOMContentLoaded',()=>{
  const notes=document.getElementById('captionNotes'); const out=document.getElementById('captionOutput'); const btn=document.getElementById('buildCaption'); const save=document.getElementById('saveCaption'); const hist=document.getElementById('captionHistory');
  function render(){const h=safeParse('mwa_caption_history',[]); if(hist) hist.innerHTML='<h3>Caption History</h3>'+h.map(x=>`<div class="card"><strong>${x.date}</strong><p>${x.text.replace(/\n/g,'<br>')}</p></div>`).join('');}
  if(btn) btn.addEventListener('click',()=>{if(out) out.value=buildCaption((notes&&notes.value.trim())||'');});
  if(save) save.addEventListener('click',()=>{const text=(out&&out.value.trim())||''; if(!text){alert('Build a caption first'); return;} const h=safeParse('mwa_caption_history',[]); h.unshift({date:new Date().toLocaleString(),text}); localStorage.setItem('mwa_caption_history',JSON.stringify(h)); render(); if(window.updateGrowth)updateGrowth(); alert('Caption saved ✅');});
  render();
});
