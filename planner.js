
function safeParse(key, fallback){
  try{
    const raw = localStorage.getItem(key);
    if(!raw) return fallback;
    const val = JSON.parse(raw);
    return (val===null||typeof val==='undefined') ? fallback : val;
  }catch(e){ return fallback; }
}

function renderTasks(){
  const list=document.getElementById('taskList'); if(!list) return;
  const tasks=safeParse('mwa_tasks',[]);
  list.innerHTML='';
  tasks.sort((a,b)=>(a.date||'').localeCompare(b.date||''));
  tasks.forEach((t,idx)=>{
    const li=document.createElement('li');
    const left=document.createElement('div');
    left.textContent=`${t.title}${t.date?(' — '+t.date):''}`;
    const pri=document.createElement('span'); pri.className='badge'; pri.textContent=t.priority; left.appendChild(pri);
    const right=document.createElement('div');
    const done=document.createElement('button'); done.textContent='Done';
    done.addEventListener('click',()=>{tasks.splice(idx,1);localStorage.setItem('mwa_tasks',JSON.stringify(tasks));renderTasks();if(window.updateGrowth)updateGrowth();});
    right.appendChild(done);
    li.appendChild(left); li.appendChild(right);
    list.appendChild(li);
  });
}
document.addEventListener('DOMContentLoaded',()=>{
  const add=document.getElementById('addTask');
  if(add) add.addEventListener('click',()=>{
    const title=document.getElementById('taskTitle').value.trim();
    const date=document.getElementById('taskDate').value;
    const priority=document.getElementById('taskPriority').value;
    if(!title){alert('Add a task title');return;}
    const tasks=safeParse('mwa_tasks',[]);
    tasks.push({title,date,priority}); localStorage.setItem('mwa_tasks',JSON.stringify(tasks));
    document.getElementById('taskTitle').value=''; renderTasks(); if(window.updateGrowth)updateGrowth();
  });
  renderTasks();
});
