window.updateGrowth=function(){
  const tabs=safeParse('mwa_usage_tabs',{});
  const journalCount=(safeParse('mwa_mindset_history',[])).length;
  const tasks=safeParse('mwa_tasks',[]);
  const offers=safeParse('mwa_offers',[]);
  const captions=(safeParse('mwa_caption_history',[])).length;
  const posts=(safeParse('mwa_post_history',[])).length;
  const goals=safeParse('mwa_goals',{});
  const postsGoal=parseInt(goals.posts||'0',10)||0;
  const monthlyGoal=parseInt(goals.monthly||'0',10)||0;

  const score=(tabs.mindset||0)*2 + tasks.length + offers.length*2 + journalCount*3 + captions + posts*2;
  const level=score<10?"Getting Started":score<25?"Finding Flow":score<50?"Consistent Builder":"Momentum Master";
  const next=postsGoal?`Aim for ${postsGoal} posts today`:"Set a daily posts goal in Your Goals";
  const target=monthlyGoal?` and pace for $${monthlyGoal}/mo`:"";
  const msg=`Usage score: ${score} • Level: ${level}. ${next}{target}. Journals: ${journalCount}, Tasks: ${tasks.length}, Offers: ${offers.length}, Captions: ${captions}, Posts: ${posts}.`;
  const el=document.getElementById('progressSummary'); if(el) el.textContent=msg;
};
document.addEventListener('DOMContentLoaded',()=>{
  const gM=document.getElementById('goalMonthly'); const gP=document.getElementById('goalPosts');
  const saved=safeParse('mwa_goals',{}); if(gM) gM.value=saved.monthly||''; if(gP) gP.value=saved.posts||'';
  const saveBtn=document.getElementById('saveGoals'); if(saveBtn) saveBtn.addEventListener('click',()=>{localStorage.setItem('mwa_goals',JSON.stringify({monthly:gM.value,posts:gP.value}));updateGrowth();alert('Goals saved ✅');});
  const resetBtn=document.getElementById('resetApp'); if(resetBtn) resetBtn.addEventListener('click',()=>{if(confirm('Clear all local data?')){localStorage.clear();updateGrowth();alert('Cleared.');location.reload();}});
  const recalc=document.getElementById('recalcGrowth'); if(recalc) recalc.addEventListener('click',updateGrowth);
  updateGrowth();
});
// helper

function safeParse(key, fallback){
  try{
    const raw = localStorage.getItem(key);
    if(!raw) return fallback;
    const val = JSON.parse(raw);
    return (val===null||typeof val==='undefined') ? fallback : val;
  }catch(e){ return fallback; }
}

