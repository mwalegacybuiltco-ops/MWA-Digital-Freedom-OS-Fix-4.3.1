
function safeParse(key, fallback){
  try{
    const raw = localStorage.getItem(key);
    if(!raw) return fallback;
    const val = JSON.parse(raw);
    return (val===null||typeof val==='undefined') ? fallback : val;
  }catch(e){ return fallback; }
}

let customTags=[];
function generateHashtags(niche,audience,goal){
  const baseSmall=[niche, audience, "mwa", "legacybuilt", "digitalfreedom", "builtnevergiven"].filter(Boolean).map(s=>"#"+s.replace(/\s+/g,''));
  const med=["#digitalbusiness","#contentcreator","#sidehustle","#onlineincome","#womeninbusiness","#genxentrepreneur","#grandmapreneur"];
  const large=["#entrepreneur","#smallbusiness","#motivation","#success"];
  let mix=[];
  if(goal==='reach'){ mix=[...large.slice(0,3), ...med.slice(0,7), ...baseSmall.slice(0,10)]; }
  if(goal==='engagement'){ mix=[...med.slice(0,7), ...baseSmall.slice(0,12), ...large.slice(0,2)]; }
  if(goal==='authority'){ mix=[...baseSmall.slice(0,12), ...med.slice(0,6), ...large.slice(0,2)]; }
  const set = Array.from(new Set([...mix, ...customTags.map(t=>t.startsWith('#')?t:'#'+t.replace(/\s+/g,''))])).slice(0,30);
  return set;
}
function renderCustom(){
  const box=document.getElementById('htCustomList'); if(!box) return;
  box.innerHTML = customTags.map((t,i)=>`<span class="badge">#${t} <button data-i="${i}" class="mini">x</button></span>`).join(' ');
  box.querySelectorAll('.mini').forEach(b=>b.addEventListener('click',e=>{customTags.splice(parseInt(e.target.dataset.i),1); renderCustom();}));
}
document.addEventListener('DOMContentLoaded',()=>{
  const niche=document.getElementById('htNiche'); const aud=document.getElementById('htAudience'); const goal=document.getElementById('htGoal'); const out=document.getElementById('htOutput'); const gen=document.getElementById('genHashtags'); const save=document.getElementById('saveHashtags');
  const add=document.getElementById('addCustomTag'); const custom=document.getElementById('htCustom'); const hist=document.getElementById('htHistory');
  function renderHistory(){const h=safeParse('mwa_hashtag_history',[]); if(hist) hist.innerHTML='<h3>Saved Sets</h3>'+h.map(x=>`<div class="card"><strong>${x.date}</strong><p>${x.tags.join(' ')}</p></div>`).join('');}
  if(add) add.addEventListener('click',()=>{const v=(custom&&custom.value.trim().replace(/^#/,'')||''); if(!v){alert('Type a tag'); return;} customTags.push(v); if(custom) custom.value=''; renderCustom();});
  if(gen) gen.addEventListener('click',()=>{const tags=generateHashtags((niche&&niche.value.trim())||'', (aud&&aud.value.trim())||'', (goal&&goal.value)||'reach'); if(out) out.textContent=tags.join(' '); const usage=safeParse('mwa_usage_tabs',{}); usage.hashtags=(usage.hashtags||0)+1; localStorage.setItem('mwa_usage_tabs',JSON.stringify(usage)); if(window.updateGrowth)updateGrowth();});
  if(save) save.addEventListener('click',()=>{const tags=(out&&out.textContent.trim().split(/\s+/).filter(Boolean))||[]; if(!tags.length){alert('Generate first'); return;} const h=safeParse('mwa_hashtag_history',[]); h.unshift({date:new Date().toLocaleString(), tags}); localStorage.setItem('mwa_hashtag_history',JSON.stringify(h)); renderHistory(); alert('Hashtags saved ✅');});
  renderCustom(); renderHistory();
});
