
function safeParse(key, fallback){
  try{
    const raw = localStorage.getItem(key);
    if(!raw) return fallback;
    const val = JSON.parse(raw);
    return (val===null||typeof val==='undefined') ? fallback : val;
  }catch(e){ return fallback; }
}

let wfSelectedStageIndex=null;
function renderStages(){
  const stages=safeParse('mwa_workflow_stages',[]);
  const container=document.getElementById('wfStages'); if(!container) return;
  container.innerHTML=stages.map((s,idx)=>`<div class="card"><strong>${idx+1}. ${s.name}</strong> <button data-idx="${idx}" class="wfSel">Select</button> <button data-idx="${idx}" class="wfDel">Delete</button></div>`).join('');
  container.querySelectorAll('.wfSel').forEach(b=>b.addEventListener('click',e=>{wfSelectedStageIndex=parseInt(e.target.dataset.idx); renderTasks();}));
  container.querySelectorAll('.wfDel').forEach(b=>b.addEventListener('click',e=>{const i=parseInt(e.target.dataset.idx); stages.splice(i,1); localStorage.setItem('mwa_workflow_stages',JSON.stringify(stages)); wfSelectedStageIndex=null; renderStages(); renderTasks();}));
}
function renderTasks(){
  const ul=document.getElementById('wfTasks'); if(!ul) return; ul.innerHTML='';
  const stages=safeParse('mwa_workflow_stages',[]);
  if(wfSelectedStageIndex==null || !stages[wfSelectedStageIndex]){ ul.innerHTML='<p>Select a stage to manage tasks.</p>'; return; }
  const tasks=stages[wfSelectedStageIndex].tasks||[];
  tasks.forEach((t,idx)=>{
    const li=document.createElement('li');
    li.innerHTML=`<span>${t.text}</span>`;
    const btn=document.createElement('button'); btn.textContent=t.done?'Undo':'Done';
    btn.addEventListener('click',()=>{t.done=!t.done; stages[wfSelectedStageIndex].tasks=tasks; localStorage.setItem('mwa_workflow_stages',JSON.stringify(stages)); renderTasks(); if(window.updateGrowth)updateGrowth();});
    li.appendChild(btn); ul.appendChild(li);
  });
}
document.addEventListener('DOMContentLoaded',()=>{
  const addStage=document.getElementById('wfAddStage'); const addTask=document.getElementById('wfAddTask');
  if(addStage) addStage.addEventListener('click',()=>{const name=document.getElementById('wfStageName').value.trim(); if(!name){alert('Enter a stage name'); return;} const stages=safeParse('mwa_workflow_stages',[]); stages.push({name, tasks:[]}); localStorage.setItem('mwa_workflow_stages',JSON.stringify(stages)); document.getElementById('wfStageName').value=''; renderStages(); if(window.updateGrowth)updateGrowth();});
  if(addTask) addTask.addEventListener('click',()=>{if(wfSelectedStageIndex==null){alert('Select a stage first'); return;} const text=document.getElementById('wfTaskText').value.trim(); if(!text){alert('Enter a task'); return;} const stages=safeParse('mwa_workflow_stages',[]); const tasks=stages[wfSelectedStageIndex].tasks||[]; tasks.push({text,done:false}); stages[wfSelectedStageIndex].tasks=tasks; localStorage.setItem('mwa_workflow_stages',JSON.stringify(stages)); document.getElementById('wfTaskText').value=''; renderTasks(); if(window.updateGrowth)updateGrowth();});
  renderStages(); renderTasks();
});
