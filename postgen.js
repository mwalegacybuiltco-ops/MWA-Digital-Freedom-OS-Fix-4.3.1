
function safeParse(key, fallback){
  try{
    const raw = localStorage.getItem(key);
    if(!raw) return fallback;
    const val = JSON.parse(raw);
    return (val===null||typeof val==='undefined') ? fallback : val;
  }catch(e){ return fallback; }
}

function pickHook(tone){
  const sets={bold:["Stop scrolling. Start building.","The broke-to-built blueprint nobody told you about."],friendly:["If we were on a walk, I’d tell you this…","Can I give you a shortcut today?"],proof:["I went from $130 to five-figure months.","Systems > motivation. Here’s what I did."]};
  const list=sets[tone]||sets.bold; return list[Math.floor(Math.random()*list.length)];
}
function pickHashtags(){
  const h=safeParse('mwa_hashtag_history',[]); if(h.length){ return h[0].tags.slice(0,20).join(' '); }
  return "#digitalbusiness #contentcreator #onlineincome #legacybuilt #digitalfreedom";
}
function buildBody(offer){
  if(!offer) return "Here’s exactly how I’m building digital freedom step by step, without burnout or guesswork.";
  const b = (offer.benefits||[]).slice(0,3).map(x=>`• ${x}`).join('\n');
  return `Why it works:\n${b}`;
}
document.addEventListener('DOMContentLoaded',()=>{
  const offerSel=document.getElementById('pgOffer'); const toneSel=document.getElementById('pgTone'); const gen=document.getElementById('pgGenerate'); const out=document.getElementById('pgOutput'); const save=document.getElementById('pgSave'); const hist=document.getElementById('pgHistory');
  function loadOffers(){const offers=safeParse('mwa_offers',[]); if(offerSel) offerSel.innerHTML=offers.map((o,i)=>`<option value="${i}">${o.name} — $${o.price}</option>`).join('') || '<option value="">No offers yet</option>'; }
  function renderHistory(){const h=safeParse('mwa_post_history',[]); if(hist) hist.innerHTML='<h3>Saved Posts</h3>'+h.map(x=>`<div class="card"><strong>${x.date}</strong><p>${x.text.replace(/\n/g,'<br>')}</p></div>`).join('');}
  if(gen) gen.addEventListener('click',()=>{const offers=safeParse('mwa_offers',[]); const idx=parseInt(offerSel&&offerSel.value,10); const offer=Number.isInteger(idx)?offers[idx]:null; const tone=(toneSel&&toneSel.value)||'bold'; const hook=pickHook(tone); const body=buildBody(offer); const cta="DM 'RESET' for the link or comment 🖤 to see how I did it."; const tags=pickHashtags(); const title=offer?`\n\nOffer: ${offer.name} ($${offer.price})`:''; if(out) out.value = `${hook}\n\n${body}${title}\n\n${cta}\n\n${tags}`; });
  if(save) save.addEventListener('click',()=>{const text=(out&&out.value.trim())||''; if(!text){alert('Generate a post first'); return;} const h=safeParse('mwa_post_history',[]); h.unshift({date:new Date().toLocaleString(), text}); localStorage.setItem('mwa_post_history',JSON.stringify(h)); renderHistory(); if(window.updateGrowth)updateGrowth(); alert('Post saved ✅');});
  loadOffers(); renderHistory();
});
