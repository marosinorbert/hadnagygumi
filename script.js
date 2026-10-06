const PRODUCTS=[{"id": 1, "brand": "Michelin", "name": "Alpin 6", "size": "205/55 R16", "season": "Téli", "price": 399, "stock": 24, "supplierId": "SUP-ML-849321", "supplier": "TirePartner SRL", "supplierPurchasePrice": 312.0, "supplierSku": "TP-MIC-849321"}, {"id": 2, "brand": "Continental", "name": "WinterContact TS 870", "size": "205/55 R16", "season": "Téli", "price": 379, "stock": 18, "supplierId": "SUP-CT-293811", "supplier": "AutoRubber Distribution SRL", "supplierPurchasePrice": 294.0, "supplierSku": "ARD-CT-293811"}, {"id": 3, "brand": "Hankook", "name": "Ventus Prime 4", "size": "205/55 R16", "season": "Nyári", "price": 329, "stock": 31, "supplierId": "SUP-HK-118240", "supplier": "TirePartner SRL", "supplierPurchasePrice": 247.0, "supplierSku": "TP-HK-118240"}, {"id": 4, "brand": "Goodyear", "name": "Vector 4Seasons Gen-3", "size": "195/65 R15", "season": "Négyévszakos", "price": 359, "stock": 15, "supplierId": "SUP-GY-555018", "supplier": "Romania Tyres Import SRL", "supplierPurchasePrice": 271.0, "supplierSku": "RTI-GY-555018"}, {"id": 5, "brand": "Bridgestone", "name": "Blizzak LM005", "size": "195/65 R15", "season": "Téli", "price": 349, "stock": 21, "supplierId": "SUP-BS-710032", "supplier": "AutoRubber Distribution SRL", "supplierPurchasePrice": 258.0, "supplierSku": "ARD-BS-710032"}, {"id": 6, "brand": "Michelin", "name": "Primacy 4+", "size": "225/45 R17", "season": "Nyári", "price": 449, "stock": 12, "supplierId": "SUP-ML-550291", "supplier": "TirePartner SRL", "supplierPurchasePrice": 337.0, "supplierSku": "TP-MIC-550291"}, {"id": 7, "brand": "Continental", "name": "PremiumContact 7", "size": "215/60 R17", "season": "Nyári", "price": 429, "stock": 9, "supplierId": "SUP-CT-391550", "supplier": "Romania Tyres Import SRL", "supplierPurchasePrice": 318.0, "supplierSku": "RTI-CT-391550"}, {"id": 8, "brand": "Hankook", "name": "Kinergy 4S2", "size": "235/45 R18", "season": "Négyévszakos", "price": 469, "stock": 8, "supplierId": "SUP-HK-778100", "supplier": "AutoRubber Distribution SRL", "supplierPurchasePrice": 346.0, "supplierSku": "ARD-HK-778100"}];
const COUNTIES=[{"code": "AB", "name": "Alba"}, {"code": "AR", "name": "Arad"}, {"code": "AG", "name": "Argeș"}, {"code": "BC", "name": "Bacău"}, {"code": "BH", "name": "Bihor"}, {"code": "BN", "name": "Bistrița-Năsăud"}, {"code": "BT", "name": "Botoșani"}, {"code": "BR", "name": "Brăila"}, {"code": "BV", "name": "Brașov"}, {"code": "B", "name": "București"}, {"code": "BZ", "name": "Buzău"}, {"code": "CL", "name": "Călărași"}, {"code": "CS", "name": "Caraș-Severin"}, {"code": "CJ", "name": "Cluj"}, {"code": "CT", "name": "Constanța"}, {"code": "CV", "name": "Covasna"}, {"code": "DB", "name": "Dâmbovița"}, {"code": "DJ", "name": "Dolj"}, {"code": "GL", "name": "Galați"}, {"code": "GR", "name": "Giurgiu"}, {"code": "GJ", "name": "Gorj"}, {"code": "HR", "name": "Harghita"}, {"code": "HD", "name": "Hunedoara"}, {"code": "IL", "name": "Ialomița"}, {"code": "IS", "name": "Iași"}, {"code": "IF", "name": "Ilfov"}, {"code": "MM", "name": "Maramureș"}, {"code": "MH", "name": "Mehedinți"}, {"code": "MS", "name": "Mureș"}, {"code": "NT", "name": "Neamț"}, {"code": "OT", "name": "Olt"}, {"code": "PH", "name": "Prahova"}, {"code": "SJ", "name": "Sălaj"}, {"code": "SM", "name": "Satu Mare"}, {"code": "SB", "name": "Sibiu"}, {"code": "SV", "name": "Suceava"}, {"code": "TR", "name": "Teleorman"}, {"code": "TM", "name": "Timiș"}, {"code": "TL", "name": "Tulcea"}, {"code": "VL", "name": "Vâlcea"}, {"code": "VS", "name": "Vaslui"}, {"code": "VN", "name": "Vrancea"}];
let cart=[];
try {
  const stored=JSON.parse(localStorage.getItem("hg_cart")||"[]");
  cart=Array.isArray(stored)?stored.filter(x=>x && Number.isFinite(Number(x.id)) && Number(x.qty)>0).map(x=>({id:Number(x.id),qty:Number(x.qty)})):[];
} catch(e) { cart=[]; localStorage.removeItem("hg_cart"); }

const $ = id => document.getElementById(id);
const sizeFilter=$("sizeFilter"), seasonFilter=$("seasonFilter"), brandFilter=$("brandFilter"), sortFilter=$("sortFilter");
const productsGrid=$("productsGrid"), resultCount=$("resultCount"), cartCount=document.querySelector(".cart-count"), cartItems=$("cartItems"), cartTotal=$("cartTotal");
const cartPanel=$("cart"), overlay=$("overlay"), orderModal=$("orderModal");
const county=$("county"), city=$("city"), zip=$("zip");

function renderProducts(){
 let a=[...PRODUCTS],s=sizeFilter.value,se=seasonFilter.value,b=brandFilter.value,sort=sortFilter.value;
 if(s)a=a.filter(x=>x.size===s);if(se)a=a.filter(x=>x.season===se);if(b)a=a.filter(x=>x.brand===b);
 if(sort==="priceAsc")a.sort((x,y)=>x.price-y.price);
 if(sort==="priceDesc")a.sort((x,y)=>y.price-x.price);
 if(sort==="name")a.sort((x,y)=>(x.brand+x.name).localeCompare(y.brand+y.name));
 resultCount.textContent=a.length+" termék";
 productsGrid.innerHTML=a.map(p=>`<article class="product">
   <div class="product-image"><div class="mini-tire"></div></div>
   <span class="badge">${p.season}</span>
   <h3>${p.brand} ${p.name}</h3>
   <div class="spec">${p.size} · személyautó</div>
   <div class="product-row">
     <div class="price"><strong>${p.price.toLocaleString("hu-HU")} LEI</strong><small>tájékoztató ár / db</small></div>
     <button type="button" class="add" data-product-id="${p.id}" aria-label="Kosárba: ${p.brand} ${p.name}">+</button>
   </div>
 </article>`).join("");
 productsGrid.querySelectorAll(".add").forEach(btn=>btn.addEventListener("click",()=>add(Number(btn.dataset.productId))));
}

[sizeFilter,seasonFilter,brandFilter,sortFilter].forEach(x=>x.addEventListener("change",renderProducts));

function save(){localStorage.setItem("hg_cart",JSON.stringify(cart))}
function add(id){
 const product=PRODUCTS.find(p=>p.id===id); if(!product)return;
 const x=cart.find(a=>a.id===id); x?x.qty++:cart.push({id,qty:1});
 save();renderCart();openCart();
}
function qty(id,d){
 let x=cart.find(a=>a.id===id);if(!x)return;
 x.qty+=d;if(x.qty<1)cart=cart.filter(a=>a.id!==id);
 save();renderCart();
}
function renderCart(){
 cartCount.textContent=cart.reduce((a,x)=>a+x.qty,0);
 if(!cart.length){cartItems.innerHTML='<div class="empty">A kosarad még üres.<br><br>Válassz néhány gumit.</div>';cartTotal.textContent="0 LEI";return}
 let total=0;
 cartItems.innerHTML=cart.map(x=>{
   const p=PRODUCTS.find(a=>a.id===x.id); if(!p)return "";
   total+=p.price*x.qty;
   return `<div class="cart-item">
     <div class="cart-thumb"><div class="mini-tire"></div></div>
     <div class="cart-info"><strong>${p.brand} ${p.name}</strong><small>${p.size} · ${p.price} LEI / db</small>
     <div class="qty"><button type="button" data-minus="${p.id}">−</button><span>${x.qty} db</span><button type="button" data-plus="${p.id}">+</button></div></div>
   </div>`;
 }).join("");
 cartItems.querySelectorAll("[data-minus]").forEach(b=>b.addEventListener("click",()=>qty(Number(b.dataset.minus),-1)));
 cartItems.querySelectorAll("[data-plus]").forEach(b=>b.addEventListener("click",()=>qty(Number(b.dataset.plus),1)));
 cartTotal.textContent=total.toLocaleString("hu-HU")+" LEI";
}
function openCart(){cartPanel.classList.add("open");overlay.classList.add("show")}
function closeCart(){cartPanel.classList.remove("open");overlay.classList.remove("show")}
function openOrder(){if(!cart.length)return alert("A kosár üres.");closeCart();orderModal.classList.add("open")}
function closeOrder(){orderModal.classList.remove("open")}
function resetFilters(){sizeFilter.value=seasonFilter.value=brandFilter.value="";sortFilter.value="featured";renderProducts()}
function toggleMenu(){const n=document.querySelector(".nav nav");n.style.display=n.style.display==="flex"?"none":"flex"}

COUNTIES.forEach(c=>county.insertAdjacentHTML("beforeend",`<option value="${c.name}" data-code="${c.code}">${c.name}</option>`));
// Romániai SIRUTA településlista.
// A projekt a teljes nyilvános adatforrásból tölti le a településeket,
// majd kliensoldalon megyére szűri őket. Így nincs függőség egy
// megszűnő/korlátozott API endpointtól.
const SIRUTA_SOURCE = "https://raw.githubusercontent.com/bandizsolt/romanian-counties-and-locations/master/data.sql";
const COUNTY_DB_CODE = {
  AB:1, AR:2, AG:3, BC:4, BH:5, BN:6, BT:7, BV:8, BR:9, BZ:10,
  CS:11, CL:51, CJ:12, CT:13, CV:14, DB:15, DJ:16, GL:17, GR:52,
  GJ:18, HR:19, HD:20, IL:21, IS:22, IF:23, MM:24, MH:25, MS:26,
  NT:27, OT:28, PH:29, SM:30, SJ:31, SB:32, SV:33, TR:34, TM:35,
  TL:36, VS:37, VL:38, VN:39, B:40
};

let sirutaPromise = null;

function loadSirutaLocations(){
  if(sirutaPromise) return sirutaPromise;

  sirutaPromise = fetch(SIRUTA_SOURCE, {cache:"force-cache"})
    .then(r=>{
      if(!r.ok) throw new Error("SIRUTA adatforrás nem érhető el.");
      return r.text();
    })
    .then(sql=>{
      const locations = [];
      // A data.sql location sorai:
      // (id, siruta, county_code, "location name"),
      const re = /\((\d+),\s*(\d+),\s*(\d+),\s*"((?:[^"\\]|\\.)*)"\)/g;
      let m;
      while((m=re.exec(sql))!==null){
        locations.push({
          id:Number(m[1]),
          siruta:m[2],
          countyCode:Number(m[3]),
          name:m[4].replace(/\\"/g,'"')
        });
      }
      if(!locations.length) throw new Error("A SIRUTA fájl nem tartalmazott településeket.");
      return locations;
    });

  return sirutaPromise;
}

county.addEventListener("change",async()=>{
  city.innerHTML='<option>Települések betöltése...</option>';
  city.disabled=true;

  const countyCode=county.options[county.selectedIndex].dataset.code;
  const dbCode=COUNTY_DB_CODE[countyCode];

  try{
    const all=await loadSirutaLocations();
    const list=all
      .filter(x=>x.countyCode===dbCode)
      .sort((a,b)=>a.name.localeCompare(b.name,"ro"));

    if(!list.length){
      throw new Error("Ehhez a megyéhez nem találtunk települést.");
    }

    city.innerHTML =
      '<option value="">Válassz települést...</option>' +
      list.map(x=>`<option value="${x.name}" data-siruta="${x.siruta}">${x.name}</option>`).join("");

  }catch(e){
    console.error(e);
    city.innerHTML='<option value="">Nem sikerült betölteni a településeket.</option>';
  }

  city.disabled=false;
});
const POSTAL_API="https://api.localitati.dev/v1/search";
let postalRequestId=0;

async function loadPostalCode(){
  const option=city.options[city.selectedIndex];
  if(!option || !option.value || !county.value){ zip.value=""; return; }
  const requestId=++postalRequestId;
  zip.value="Betöltés…";
  zip.readOnly=true;
  try{
    const params=new URLSearchParams({q:option.value, county:county.options[county.selectedIndex].dataset.code});
    const response=await fetch(`${POSTAL_API}?${params.toString()}`,{headers:{Accept:"application/json"}});
    if(!response.ok) throw new Error("Irányítószám API hiba");
    const payload=await response.json();
    const rows=Array.isArray(payload)?payload:(payload.data||payload.results||[]);
    const exact=rows.find(x=>{
      const name=x.name||x.city||x.locality||"";
      return name.localeCompare(option.value,"ro",{sensitivity:"base"})===0;
    }) || rows[0];
    const postal=exact?.postal_code || exact?.postcode || exact?.postalCode || exact?.zip || "";
    if(requestId===postalRequestId) zip.value=postal;
  }catch(error){
    console.warn("Az irányítószám automatikus lekérése nem sikerült:",error);
    if(requestId===postalRequestId) zip.value="";
  }finally{
    if(requestId===postalRequestId) zip.readOnly=false;
  }
}
city.addEventListener("change",loadPostalCode);

function readOrders(){
  try{ const stored=JSON.parse(localStorage.getItem("hg_orders")||"[]"); return Array.isArray(stored)?stored:[]; }
  catch(e){ return []; }
}
function saveOrders(orders){ localStorage.setItem("hg_orders",JSON.stringify(orders)); }

async function submitOrder(e){
 e.preventDefault();
 if(!cart.length) return alert("A kosár üres.");
 const now=new Date();
 const order={
   id:"HG-"+now.getTime().toString().slice(-8), createdAt:now.toISOString(), date:now.toLocaleString("hu-HU"), status:"Új",
   customer:{name:$("name").value.trim(),phone:$("phone").value.trim(),email:$("email").value.trim(),county:county.value,city:city.value,zip:zip.value.trim(),address:$("address").value.trim(),note:$("note").value.trim(),marketing:$("marketing").checked},
   items:cart.map(x=>({productId:x.id,quantity:x.qty}))
 };
 const savedLocally=()=>{ const orders=readOrders(); orders.unshift(order); saveOrders(orders); };
 try{
   const response=await fetch("/api/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(order)});
   if(!response.ok) throw new Error("API order mentés sikertelen");
 }catch(error){
   console.warn("A rendelési API nem érhető el, helyi mentést használunk:",error);
   savedLocally();
 }
 alert(`Köszönjük! A rendelési igényed rögzítve lett.\nAzonosító: ${order.id}`);
 cart=[]; save(); renderCart(); closeOrder();
 document.querySelector("#orderModal form")?.reset(); zip.value="";
}
renderProducts();renderCart();
