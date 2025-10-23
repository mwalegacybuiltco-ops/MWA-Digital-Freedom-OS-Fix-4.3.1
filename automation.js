function generateCopy(tone,notes){
  const base={bold:["Stop starting over.","Build a system that sells while you live.","This is your sign to reset, rewire, and rise."],friendly:["Hey friend—if you’re rebuilding, you’re not alone.","Let’s make your next chapter easier, lighter, and profitable.","Small steps add up fast."],proof:["From $130 to multiple five-figure months.","Not theory. Systems + daily action.","Built. Never Given."]};
  const lines=base[tone]||base.bold;
  return `HOOK: ${lines[0]}
CONTEXT: ${lines[1]}
OFFER: ${notes||"Use the Offers tab to define benefits and price."}
CTA: ${lines[2]} → DM 'RESET' for access.`;
}

function safeParse(key, fallback){
  try{
    const raw = localStorage.getItem(key);
    if(!raw) return fallback;
    const val = JSON.parse(raw);
    return (val===null||typeof val==='undefined') ? fallback : val;
  }catch(e){ return fallback; }
}

document.addEventListener('DOMContentLoaded',()=>{
  const savePlan=document.getElementById('saveAutomationPlan');
  if(savePlan) savePlan.addEventListener('click',()=>{
    const plan=document.getElementById('automationPlan').value.trim();
    if(!plan){alert('Write your plan');return;}
    localStorage.setItem('mwa_automation_plan',plan); if(window.updateGrowth)updateGrowth(); alert('Automation plan saved ✅');
  });
  const gen=document.getElementById('generateCopy');
  if(gen) gen.addEventListener('click',()=>{
    const tone=document.getElementById('copyTone').value; const notes=document.getElementById('copyNotes').value.trim();
    const copy=generateCopy(tone,notes); document.getElementById('salesCopy').value=copy;
  });
  const saveCopy=document.getElementById('saveCopy');
  if(saveCopy) saveCopy.addEventListener('click',()=>{
    const copy=document.getElementById('salesCopy').value.trim();
    if(!copy){alert('Generate or paste copy first');return;}
    const history=safeParse('mwa_copy_history',[]); history.unshift({date:new Date().toLocaleString(),copy});
    localStorage.setItem('mwa_copy_history',JSON.stringify(history)); if(window.updateGrowth)updateGrowth(); alert('Sales copy saved ✅');
  });
});
