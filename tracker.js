
function safeParse(key, fallback){
  try{
    const raw = localStorage.getItem(key);
    if(!raw) return fallback;
    const val = JSON.parse(raw);
    return (val===null||typeof val==='undefined') ? fallback : val;
  }catch(e){ return fallback; }
}

// Setup Tracker — robust, offline, defensive
document.addEventListener('DOMContentLoaded',()=>{
  const DEFAULT_STEPS=[
    "Set goals in Creator Studio",
    "Add 3 tasks with dates in Planner",
    "Write 1 reflection in Mindset",
    "Create 1 Offer and generate a UTM",
    "Draft an Automation Plan and generate Sales Copy",
    "Create 1 Workflow with 2 tasks",
    "Build 1 Caption and 1 Hook",
    "Generate a Hashtag set and save it",
    "Create a Checklist and save it",
    "Generate and save 1 Post in Post Generator"
  ];
  const list=document.getElementById('setupList');
  const resetBtn=document.getElementById('resetTracker');
  if(!list) return;

  function render(){
    list.innerHTML='';
    const done=safeParse('mwa_setup_done',{});
    DEFAULT_STEPS.forEach((txt,idx)=>{
      const li=document.createElement('li');
      const left=document.createElement('div'); left.textContent=txt;
      const right=document.createElement('div'); const btn=document.createElement('button'); btn.textContent=done[idx]?'Undo':'Mark Done';
      btn.addEventListener('click',()=>{done[idx]=!done[idx]; localStorage.setItem('mwa_setup_done',JSON.stringify(done)); render(); if(window.updateGrowth)updateGrowth();});
      right.appendChild(btn); li.appendChild(left); li.appendChild(right); list.appendChild(li);
    });
  }

  if(resetBtn) resetBtn.addEventListener('click',()=>{localStorage.removeItem('mwa_setup_done'); render(); alert('Tracker reset');});
  render();
});
