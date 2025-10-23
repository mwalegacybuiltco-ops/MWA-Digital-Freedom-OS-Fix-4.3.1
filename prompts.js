
function safeParse(key, fallback){
  try{
    const raw = localStorage.getItem(key);
    if(!raw) return fallback;
    const val = JSON.parse(raw);
    return (val===null||typeof val==='undefined') ? fallback : val;
  }catch(e){ return fallback; }
}

const basePrompts=["Identity before income: share the belief that drives your work today.","Proof: show a small win or result.","Story: a moment you almost quit, and what changed.","Education: teach one automation step.","CTA: invite to your Zoom or DM keyword."];
function smarterPrompt(){
  const tabs=safeParse('mwa_usage_tabs',{});
  const hist=safeParse('mwa_mindset_history',[]);
  const offers=safeParse('mwa_offers',[]);
  let prompt=basePrompts[Math.floor(Math.random()*basePrompts.length)];
  if((tabs.prompts||0)>5&&offers.length>0) prompt="Carousel: top offer’s 3 benefits + soft CTA.";
  if(hist.length>3) prompt="Turn a journal insight into a 3-line reel: hook, shift, CTA.";
  return prompt;
}
document.addEventListener('DOMContentLoaded',()=>{
  const btn=document.getElementById('newPrompt');
  const out=document.getElementById('promptText');
  const clear=document.getElementById('clearPromptHistory');
  const historyEl=document.getElementById('promptHistory');
  function renderHistory(){const h=safeParse('mwa_prompt_history',[]); if(historyEl) historyEl.innerHTML='<h3>Prompt History</h3>'+h.map(p=>`<div class="card"><strong>${p.date}</strong><p>${p.text}</p></div>`).join('');}
  if(btn) btn.addEventListener('click',()=>{const p=smarterPrompt(); if(out) out.textContent=p; const h=safeParse('mwa_prompt_history',[]); h.unshift({date:new Date().toLocaleString(),text:p}); localStorage.setItem('mwa_prompt_history',JSON.stringify(h)); renderHistory(); if(window.updateGrowth)updateGrowth();});
  if(clear) clear.addEventListener('click',()=>{localStorage.setItem('mwa_prompt_history',JSON.stringify([])); renderHistory(); alert('Prompt history cleared');});
  renderHistory();
});
