
function safeParse(key, fallback){
  try{
    const raw = localStorage.getItem(key);
    if(!raw) return fallback;
    const val = JSON.parse(raw);
    return (val===null||typeof val==='undefined') ? fallback : val;
  }catch(e){ return fallback; }
}

document.addEventListener('DOMContentLoaded',()=>{
  const journal=document.getElementById('mindsetJournal'); const saveBtn=document.getElementById('saveMindset'); const historyEl=document.getElementById('mindsetHistory');
  function renderHistory(){const hist=safeParse('mwa_mindset_history',[]); if(historyEl) historyEl.innerHTML='<h3>History</h3>'+hist.map(h=>`<div class="card"><strong>${h.date}</strong><p>${h.text}</p></div>`).join('');}
  if(saveBtn) saveBtn.addEventListener('click',()=>{const text=journal.value.trim(); if(!text){alert('Write something first'); return;} const hist=safeParse('mwa_mindset_history',[]); hist.unshift({date:new Date().toLocaleString(),text}); localStorage.setItem('mwa_mindset_history',JSON.stringify(hist)); journal.value=''; renderHistory(); if(window.updateGrowth)updateGrowth(); alert('Saved locally ✅');});
  renderHistory();
});
