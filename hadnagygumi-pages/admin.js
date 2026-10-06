const PRODUCTS=[{"id": 1, "brand": "Michelin", "name": "Alpin 6", "size": "205/55 R16", "season": "Téli", "price": 399, "stock": 24, "supplierId": "SUP-ML-849321", "supplier": {"name": "GumiPartner SRL", "purchasePrice": 287.28, "articleNumber": "ART-849321"}, "supplierPurchasePrice": 312.0, "supplierSku": "TP-MIC-849321"}, {"id": 2, "brand": "Continental", "name": "WinterContact TS 870", "size": "205/55 R16", "season": "Téli", "price": 379, "stock": 18, "supplierId": "SUP-CT-293811", "supplier": {"name": "AutoTire Distribution SRL", "purchasePrice": 272.88, "articleNumber": "ART-293811"}, "supplierPurchasePrice": 294.0, "supplierSku": "ARD-CT-293811"}, {"id": 3, "brand": "Hankook", "name": "Ventus Prime 4", "size": "205/55 R16", "season": "Nyári", "price": 329, "stock": 31, "supplierId": "SUP-HK-118240", "supplier": {"name": "TireHub Romania SRL", "purchasePrice": 236.88, "articleNumber": "ART-118240"}, "supplierPurchasePrice": 247.0, "supplierSku": "TP-HK-118240"}, {"id": 4, "brand": "Goodyear", "name": "Vector 4Seasons Gen-3", "size": "195/65 R15", "season": "Négyévszakos", "price": 359, "stock": 15, "supplierId": "SUP-GY-555018", "supplier": {"name": "RoadGrip Import SRL", "purchasePrice": 258.48, "articleNumber": "ART-555018"}, "supplierPurchasePrice": 271.0, "supplierSku": "RTI-GY-555018"}, {"id": 5, "brand": "Bridgestone", "name": "Blizzak LM005", "size": "195/65 R15", "season": "Téli", "price": 349, "stock": 21, "supplierId": "SUP-BS-710032", "supplier": {"name": "Premium Wheels SRL", "purchasePrice": 251.28, "articleNumber": "ART-710032"}, "supplierPurchasePrice": 258.0, "supplierSku": "ARD-BS-710032"}, {"id": 6, "brand": "Michelin", "name": "Primacy 4+", "size": "225/45 R17", "season": "Nyári", "price": 449, "stock": 12, "supplierId": "SUP-ML-550291", "supplier": {"name": "GumiPartner SRL", "purchasePrice": 323.28, "articleNumber": "ART-550291"}, "supplierPurchasePrice": 337.0, "supplierSku": "TP-MIC-550291"}, {"id": 7, "brand": "Continental", "name": "PremiumContact 7", "size": "215/60 R17", "season": "Nyári", "price": 429, "stock": 9, "supplierId": "SUP-CT-391550", "supplier": {"name": "AutoTire Distribution SRL", "purchasePrice": 308.88, "articleNumber": "ART-391550"}, "supplierPurchasePrice": 318.0, "supplierSku": "RTI-CT-391550"}, {"id": 8, "brand": "Hankook", "name": "Kinergy 4S2", "size": "235/45 R18", "season": "Négyévszakos", "price": 469, "stock": 8, "supplierId": "SUP-HK-778100", "supplier": {"name": "TireHub Romania SRL", "purchasePrice": 337.68, "articleNumber": "ART-778100"}, "supplierPurchasePrice": 346.0, "supplierSku": "ARD-HK-778100"}];
const ORDERS=[{"id": "HG-10428", "date": "2026-10-06 16:42", "name": "Kovács Péter", "phone": "+40 745 123 456", "email": "peter@example.com", "county": "Harghita", "city": "Odorheiu Secuiesc", "address": "Str. Principală 24.", "status": "Új", "items": [{"product": 1, "qty": 4}, {"product": 2, "qty": 2}]}, {"id": "HG-10427", "date": "2026-10-06 15:18", "name": "Nagy Andrea", "phone": "+40 751 555 222", "email": "andrea@example.com", "county": "Mureș", "city": "Târgu Mureș", "address": "Str. Libertății 8.", "status": "Kapcsolatfelvétel", "items": [{"product": 6, "qty": 4}]}, {"id": "HG-10426", "date": "2026-10-05 11:04", "name": "Szabó Zoltán", "phone": "+40 733 991 120", "email": "zoltan@example.com", "county": "Covasna", "city": "Sfântu Gheorghe", "address": "Str. Gării 11.", "status": "Egyeztetés alatt", "items": [{"product": 5, "qty": 4}]}, {"id": "HG-10425", "date": "2026-10-05 09:32", "name": "Farkas Réka", "phone": "+40 722 888 311", "email": "reka@example.com", "county": "Harghita", "city": "Cristuru Secuiesc", "address": "Str. Kossuth Lajos 4.", "status": "Lezárt", "items": [{"product": 3, "qty": 4}, {"product": 8, "qty": 2}]}];
const $=id=>document.getElementById(id);
const statusFilter=$("statusFilter"),orderTable=$("orderTable"),drawer=$("drawer"),drawerContent=$("drawerContent");
const STORAGE_KEY="hg_orders";
let API_ORDERS=null;
async function refreshFromApi(){try{const r=await fetch("/api/orders",{cache:"no-store"});if(!r.ok)throw new Error("API");const d=await r.json();if(Array.isArray(d)){API_ORDERS=d;render();}}catch(e){/* file:// fallback uses localStorage */}}
function readStoredOrders(){try{const d=JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]");return Array.isArray(d)?d:[]}catch(e){return[]}}
function normalizeOrder(o){return {...o,status:(o.status==="Kapcsolatfelvétel"||o.status==="Egyeztetés alatt"?"Kapcsolatfelvétel megtörtént":(o.status||"Új")),date:o.date||new Date(o.createdAt||Date.now()).toLocaleString("hu-HU"),name:o.name||o.customer?.name||"",phone:o.phone||o.customer?.phone||"",email:o.email||o.customer?.email||"",county:o.county||o.customer?.county||"",city:o.city||o.customer?.city||"",zip:o.zip||o.customer?.zip||"",address:o.address||o.customer?.address||"",note:o.note||o.customer?.note||"",items:(o.items||[]).map(x=>({product:x.product??x.productId,qty:Number(x.qty??x.quantity??1)}))}}
function getOrders(){if(Array.isArray(API_ORDERS))return API_ORDERS.map(normalizeOrder);const stored=readStoredOrders().map(normalizeOrder),ids=new Set(stored.map(x=>x.id));return [...stored,...ORDERS.filter(x=>!ids.has(x.id)).map(normalizeOrder)]}
function render(){const all=getOrders(); const newCount=all.filter(x=>x.status==="Új").length; const cards=document.querySelectorAll(".cards>div"); if(cards[0]) cards[0].querySelector("strong").textContent=newCount; const f=statusFilter.value,list=getOrders().filter(x=>!f||x.status===f);renderStatistics(all);orderTable.innerHTML=list.map(o=>`<tr><td><strong>${o.id}</strong></td><td><strong>${o.name}</strong><div class="muted">${o.phone}</div></td><td>${o.city}<div class="muted">${o.county}${o.zip?` · ${o.zip}`:""}</div></td><td>${o.items.reduce((s,x)=>s+x.qty,0)} db</td><td>${o.date}</td><td><span class="status ${o.status==="Új"?"new":o.status==="Lezárt"?"done":"contact"}">${o.status}</span></td><td><button class="details" onclick="showOrder('${o.id}')">Részletek</button></td></tr>`).join("")}
async function updateOrderStatus(id,status){
  const current=getOrders().find(x=>x.id===id);
  if(!current)return;
  if(current.status==='Lezárt'){
    alert('A lezárt rendelés státusza már nem módosítható.');
    return;
  }
  if(status==='Lezárt'){
    const confirmed=window.confirm(`Biztosan lezárod a(z) ${id} számú rendelést?\n\nA lezárás után a rendelés státusza többé nem módosítható.`);
    if(!confirmed)return;
  }
  try{
    const r=await fetch(`/api/orders/${encodeURIComponent(id)}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({status})});
    const data=await r.json().catch(()=>({}));
    if(!r.ok)throw new Error(data.error||'A státusz mentése nem sikerült.');
    if(Array.isArray(API_ORDERS)) API_ORDERS=API_ORDERS.map(x=>x.id===id?data:x);
    render();
    showOrder(id);
  }catch(e){alert(e.message||'A státusz mentése nem sikerült.');}
}
function renderStatistics(all){
  const closed=all.filter(x=>x.status==='Lezárt');
  const total=closed.reduce((sum,o)=>sum+o.items.reduce((s,x)=>{const p=PRODUCTS.find(y=>y.id===Number(x.product));return s+(p?p.price*Number(x.qty||0):0)},0),0);
  const valueEl=document.getElementById('closedOrderValue');
  const countEl=document.getElementById('closedOrderCount');
  if(valueEl)valueEl.textContent=total.toLocaleString('hu-HU')+' LEI';
  if(countEl)countEl.textContent=closed.length;
  const region=document.getElementById('regionStats');
  if(region){
    const counts={}; closed.forEach(o=>{const c=o.county||'Egyéb';counts[c]=(counts[c]||0)+1});
    const entries=Object.entries(counts).sort((a,b)=>b[1]-a[1]);
    if(!entries.length){region.innerHTML='<div><span>Még nincs lezárt rendelés</span><b>0%</b></div>';}
    else{
      const top=entries.slice(0,5), rest=entries.slice(5).reduce((s,x)=>s+x[1],0);
      if(rest)top.push(['Egyéb',rest]);
      region.innerHTML=top.map(([name,count])=>`<div><span>${name}</span><b>${Math.round(count/closed.length*100)}%</b></div>`).join('');
    }
  }
  const bars=document.getElementById('productStats');
  if(bars){
    const counts={};closed.forEach(o=>o.items.forEach(x=>counts[x.product]=(counts[x.product]||0)+Number(x.qty||0)));
    const entries=Object.entries(counts).map(([id,count])=>({p:PRODUCTS.find(x=>x.id===Number(id)),count})).filter(x=>x.p).sort((a,b)=>b.count-a.count).slice(0,4);
    const max=entries[0]?.count||1;
    bars.innerHTML=entries.length?entries.map(x=>`<div><span>${x.p.brand} ${x.p.name}</span><b style="width:${Math.round(x.count/max*86)}%"></b><strong>${x.count}</strong></div>`).join(''):'<div class="muted">Még nincs lezárt rendelés.</div>';
  }
}

function showOrder(id){const o=getOrders().find(x=>x.id===id);if(!o)return;drawer.classList.add("open");drawerContent.innerHTML=`<div class="detail-title">${o.id}</div><div class="detail-row"><span>ÜGYFÉL</span><strong>${o.name}</strong><br>${o.phone}<br>${o.email||"—"}</div><div class="detail-row"><span>SZÁLLÍTÁSI / KAPCSOLATI CÍM</span>${o.county}, ${o.city}${o.zip?` (${o.zip})`:""}<br>${o.address}</div><div class="detail-row"><span>RENDELÉS STÁTUSZA</span><div class="status-actions"><button class="status-btn ${o.status==="Új"?"selected":""}" ${o.status==="Lezárt"?"disabled":""} onclick="updateOrderStatus('${o.id}','Új')">Új rendelés</button><button class="status-btn ${o.status==="Kapcsolatfelvétel megtörtént"?"selected":""}" ${o.status==="Lezárt"?"disabled":""} onclick="updateOrderStatus('${o.id}','Kapcsolatfelvétel megtörtént')">Kapcsolatfelvétel megtörtént</button><button class="status-btn ${o.status==="Lezárt"?"selected":""}" ${o.status==="Lezárt"?"disabled":""} onclick="updateOrderStatus('${o.id}','Lezárt')">Lezárt rendelés</button></div><div class="status-help">Ha még nem történt kapcsolatfelvétel és nincs lezárva, maradjon <strong>Új rendelés</strong>.</div></div><div class="supplier-box"><div class="supplier-box-title">BESZÁLLÍTÓI INFORMÁCIÓK — CSAK ADMIN</div>${o.items.map(x=>{const p=PRODUCTS.find(y=>y.id===Number(x.product));if(!p)return"";const s=p.supplier;return `<div class="detail-item"><div class="item-head"><strong>${p.brand} ${p.name}</strong><b>${x.qty} db</b></div><div class="detail-grid"><div><span>Beszállító</span><strong>${s.name}</strong></div><div><span>Cikkszám</span><strong>${s.articleNumber}</strong></div><div><span>Beszerzési ár / db</span><strong>${s.purchasePrice.toLocaleString("hu-HU")} LEI</strong></div><div><span>Webshop ár / db</span><strong>${p.price.toLocaleString("hu-HU")} LEI</strong></div><div><span>Beszállítói azonosító</span><strong>${p.supplierId}</strong></div><div><span>Árrés / db</span><strong>${(p.price-s.purchasePrice).toLocaleString("hu-HU")} LEI</strong></div></div></div>`}).join("")}</div><div class="detail-row"><span>MEGJEGYZÉS</span>${o.note||"—"}</div>`}
function closeDrawer(){drawer.classList.remove("open")}
statusFilter.addEventListener("change",render);window.addEventListener("storage",e=>{if(e.key===STORAGE_KEY)render()});document.addEventListener("visibilitychange",()=>{if(!document.hidden)render()});render();
refreshFromApi();
setInterval(refreshFromApi,3000);
