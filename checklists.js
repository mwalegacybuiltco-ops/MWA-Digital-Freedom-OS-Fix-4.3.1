
function safeParse(key, fallback){
  try{
    const raw = localStorage.getItem(key);
    if(!raw) return fallback;
    const val = JSON.parse(raw);
    return (val===null||typeof val==='undefined') ? fallback : val;
  }catch(e){ return fallback; }
}

let clDraft=[];
function renderDraft(){const el=document.getElementById('clItems'); if(!el) return; el.innerHTML=clDraft.map((t,i)=>`<div class="card">${i+1}. ${t} <button data-i="${i}" class="clDel">Delete</button></div>`).join(''); document.querySelectorAll('.clDel').forEach(b=>b.addEventListener('click',e=>{clDraft.splice(parseInt(e.target.dataset.i),1); renderDraft();}));}
function renderSaved(){const wrap=document.getElementById('clList'); if(!wrap) return; const sets=safeParse('mwa_checklists',[]); wrap.innerHTML=sets.map((s,idx)=>`<div class="card"><strong>${s.name}</strong><ul>${s.items.map((x,i)=>`<li>${x}</li>`).join('')}</ul><button data-idx="${idx}" class="useCl">Use</button></div>`).join(''); wrap.querySelectorAll('.useCl').forEach(b=>b.addEventListener('click',e=>{const sets=safeParse('mwa_checklists',[]); const set=sets[parseInt(e.target.dataset.idx)]; const done=safeParse('mwa_check_progress',{}); done[set.name]=done[set.name]||Array(set.items.length).fill(false); localStorage.setItem('mwa_check_progress',JSON.stringify(done)); alert('Checklist loaded.');}));}
document.addEventListener('DOMContentLoaded',()=>{document.getElementById('clAddItem')?.addEventListener('click',()=>{const v=(document.getElementById('clItem')?.value.trim())||''; if(!v){alert('Add an item'); return;} clDraft.push(v); document.getElementById('clItem').value=''; renderDraft();}); document.getElementById('clSave')?.addEventListener('click',()=>{const name=(document.getElementById('clName')?.value.trim())||''; if(!name){alert('Name your checklist'); return;} const sets=safeParse('mwa_checklists',[]); sets.unshift({name, items:clDraft.slice()}); localStorage.setItem('mwa_checklists',JSON.stringify(sets)); clDraft=[]; document.getElementById('clName').value=''; renderDraft(); renderSaved(); if(window.updateGrowth)updateGrowth(); alert('Checklist saved ✅');}); renderDraft(); renderSaved();});
