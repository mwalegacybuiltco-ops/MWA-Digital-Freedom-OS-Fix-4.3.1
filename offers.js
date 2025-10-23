
function safeParse(key, fallback){
  try{
    const raw = localStorage.getItem(key);
    if(!raw) return fallback;
    const val = JSON.parse(raw);
    return (val===null||typeof val==='undefined') ? fallback : val;
  }catch(e){ return fallback; }
}

function renderOffers(){
  const list=document.getElementById('offersList'); if(!list) return;
  const offers=safeParse('mwa_offers',[]);
  list.innerHTML='<h4>Saved Offers</h4>'+(offers.length?'':'<p>No offers yet.</p>');
  offers.forEach((o,idx)=>{
    const div=document.createElement('div'); div.className='card';
    div.innerHTML=`<strong>${o.name} — $${o.price}</strong><ul>${(o.benefits||[]).map(b=>`<li>${b}</li>`).join('')}</ul>`;
    const del=document.createElement('button'); del.textContent='Delete'; del.addEventListener('click',()=>{offers.splice(idx,1);localStorage.setItem('mwa_offers',JSON.stringify(offers));renderOffers(); if(window.updateGrowth)updateGrowth();});
    div.appendChild(del); list.appendChild(div);
  });
}
document.addEventListener('DOMContentLoaded',()=>{
  const saveOffer=document.getElementById('saveOffer');
  if(saveOffer) saveOffer.addEventListener('click',()=>{
    const name=document.getElementById('offerName').value.trim(); const price=document.getElementById('offerPrice').value.trim();
    const benefits=document.getElementById('offerBenefits').value.split('\n').map(s=>s.trim()).filter(Boolean);
    if(!name||!price){alert('Add name and price');return;}
    const offers=safeParse('mwa_offers',[]); offers.push({name,price,benefits}); localStorage.setItem('mwa_offers',JSON.stringify(offers));
    document.getElementById('offerName').value=''; document.getElementById('offerPrice').value=''; document.getElementById('offerBenefits').value='';
    renderOffers(); if(window.updateGrowth)updateGrowth(); alert('Offer saved ✅');
  });
  const gen=document.getElementById('generateUTM');
  if(gen) gen.addEventListener('click',()=>{
    const base=document.getElementById('utmBase').value.trim(); const source=document.getElementById('utmSource').value.trim();
    const medium=document.getElementById('utmMedium').value.trim(); const campaign=document.getElementById('utmCampaign').value.trim();
    if(!base){alert('Add a base URL'); return;}
    const url=new URL(base); if(source)url.searchParams.set('utm_source',source); if(medium)url.searchParams.set('utm_medium',medium); if(campaign)url.searchParams.set('utm_campaign',campaign);
    document.getElementById('utmOutput').textContent=url.toString();
    const logs=safeParse('mwa_utm_history',[]); logs.unshift({date:new Date().toISOString(),url:url.toString()}); localStorage.setItem('mwa_utm_history',JSON.stringify(logs));
    if(window.updateGrowth)updateGrowth();
  });
  renderOffers();
});
