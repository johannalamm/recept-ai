(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();const M="recept-ai:shopping",P=20;function T(){return Math.random().toString(36).slice(2)+Date.now().toString(36)}function m(){try{const t=localStorage.getItem(M);return t?JSON.parse(t):[]}catch{return[]}}function p(t){localStorage.setItem(M,JSON.stringify(t))}function A(t,e){const n=m();for(const a of e){const s=a.name.toLowerCase(),i=n.find(r=>r.name.toLowerCase()===s&&r.unit===a.unit);i?(i.amount=S(i.amount+a.amount),i.recipeIds.includes(t.id)||i.recipeIds.push(t.id)):n.push({id:T(),name:a.name,amount:a.amount,unit:a.unit,category:a.category,checked:!1,recipeIds:[t.id]})}p(n)}function O(t){const e=m(),n=e.find(a=>a.id===t);return n?(n.checked=!0,p(e),{...n}):null}function C(t){const e=m(),n=e.find(a=>a.id===t);n&&(n.checked=!1,p(e))}function V(t){const e=m(),n=e.findIndex(s=>s.id===t);if(n===-1)return null;const[a]=e.splice(n,1);return p(e),{item:a,index:n}}function q(t,e){const n=m();n.splice(Math.min(e,n.length),0,t),p(n)}function K(t,e){const n=m(),a=n.find(s=>s.id===t);a&&(a.amount=S(e),p(n))}function F(t,e){const n=m(),a=n.find(s=>s.id===t);a&&(a.unit=e,p(n))}function U(t,e,n,a){const s=m(),i=t.toLowerCase(),r=s.find(u=>u.name.toLowerCase()===i&&u.unit===n);r?r.amount=S(r.amount+e):s.push({id:T(),name:t,amount:e,unit:n,category:a,checked:!1,recipeIds:[]}),p(s)}function D(){const t=m().filter(e=>!e.checked);p(t)}let $=[];function w(t){$.push(t),$.length>P&&$.shift()}function J(){return $.pop()}function _(){return $.length}function S(t){return Math.round(t*100)/100}function f(){const t=document.getElementById("nav"),e=window.location.hash||"#/",a=m().filter(s=>!s.checked).length;t.innerHTML=`
    <div class="nav-inner">
      <div class="nav-logo" data-href="#/">
        <span>🍳</span> Receptboken
      </div>
      <div class="nav-links">
        <button class="nav-link ${e==="#/"||e===""?"active":""}" data-href="#/">
          <span class="nav-icon">🏠</span><span class="nav-label"> Recept</span>
        </button>
        <button class="nav-link ${e.startsWith("#/shopping")?"active":""}" data-href="#/shopping">
          <span class="nav-icon">🛒</span><span class="nav-label"> Inköpslista</span>
          ${a>0?`<span class="nav-badge">${a}</span>`:""}
        </button>
      </div>
    </div>
  `,t.querySelectorAll("[data-href]").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.href;window.location.hash=i})})}function W(t,e){const n=e.trim().toLowerCase();return n?t.filter(a=>!!(a.name.toLowerCase().includes(n)||a.tags.some(s=>s.toLowerCase().includes(n))||a.ingredients.some(s=>s.name.toLowerCase().includes(n)))):t}function Y(t,e){return e.length===0?t:t.filter(n=>e.every(a=>n.tags.includes(a)))}function H(t){const e=new Set;return t.forEach(n=>n.tags.forEach(a=>e.add(a))),Array.from(e).sort()}const R=[{id:"tikka-masala-pa-bonor",name:"Tikka masala på bönor",intro:"Serveras med ris eller liknande. Tillbehör: creme fraiche, cashewnötter, lime.",tags:["middag","indiskt","vegetariskt","vardagsmat"],servings:2,ingredients:[{name:"Gul lök",amount:1,unit:"st",category:"frukt & grönt"},{name:"Vitlök",amount:2,unit:"klyftor",category:"frukt & grönt"},{name:"Morot",amount:1,unit:"st",category:"frukt & grönt"},{name:"Ingefära",amount:.5,unit:"cm",category:"frukt & grönt"},{name:"Krossade tomater",amount:1,unit:"burk",category:"skafferi"},{name:"Kokosmjölk",amount:2.5,unit:"dl",category:"skafferi"},{name:"Grönsaksbuljong",amount:1,unit:"tärning",category:"kryddor & smaksättare"},{name:"Garam Masala",amount:3,unit:"tsk",category:"kryddor & smaksättare"},{name:"Svarta bönor",amount:400,unit:"g",category:"skafferi"}],steps:["Riv morot.","Hacka gul lök.","Pressa vitlök.","Fräs allting i lite olja på låg värme.","Riv ingefära och lägg i pannan.","Häll i krossade tomater, koksmjölk, lite vatten och grönsaksbuljong.","Låt såsen puttra på låg värme i 10 minuter.","Mixa med stavmixer.","Häll i svarta bönor och garam masala."]},{id:"pajdeg",name:"Pajdeg - grundrecept",intro:"Grundrecept till t.ex. spenatpaj & västerbottenpaj.",tags:["paj"],servings:4,ingredients:[{name:"Vetemjöl",amount:3,unit:"dl",category:"skafferi"},{name:"Smör",amount:125,unit:"g",category:"kött & mejeri"}],steps:["Skär smör i små bitar.","Nyp ihop mjöl och smör.","Tillsätt en matsked kallt vatten.","Tryck ut degen i en pajform. Nagga med gaffel. Låt vila i kylen i 30 minuter.","Sätt ugnen på 225°C","Förgrädda pajskalet mitt i ugnen i ca 10 minuter."]},{id:"spenatpaj",name:"Spenatpaj med ädelost",intro:"Går att göra vegetarisk (bara att skippa skinkan).",tags:["middag","paj","vardagsmat"],servings:4,ingredients:[{name:"Fryst bladspenat",amount:250,unit:"g",category:"frys"},{name:"Purjolök",amount:1,unit:"st",category:"frukt & grönt"},{name:"Vitlök",amount:1,unit:"klyftor",category:"frukt & grönt"},{name:"Ädelost",amount:150,unit:"g",category:"kött & mejeri"},{name:"Basturökt skinka",amount:120,unit:"g",category:"kött & mejeri"},{name:"Ägg",amount:3,unit:"st",category:"kött & mejeri"},{name:"Mjölk",amount:3,unit:"dl",category:"kött & mejeri"},{name:"Cayennepeppar",amount:.5,unit:"tsk",category:"kryddor & smaksättare"}],steps:["Gör en pajdeg (följ pajdeg - grundrecept).","Sätt ugnen på 175°C","Stek spenaten på låg värme.","Pressa vitlök och rör i.","Hacka purjolök och ha i.","Hacka skinka och bryt ädelosten.","Blanda ner allting över pajdegen.","Vispa ägg, mjölk, salt och canyennepeppar. Häll över pajdegen.","Grädda mitt i ugnen i 35 minuter."]},{id:"vasterbottenpaj",name:"Västerbottenpaj",intro:"Servera med tångkaviar, finhackad rödlök och gräddfil.",tags:["paj","högtid","vegetariskt"],servings:4,ingredients:[{name:"Purjolök",amount:1,unit:"st",category:"frukt & grönt"},{name:"Västerbottenost",amount:400,unit:"g",category:"kött & mejeri"},{name:"Ägg",amount:3,unit:"st",category:"kött & mejeri"},{name:"Matgrädde",amount:3,unit:"dl",category:"kött & mejeri"}],steps:["Gör en pajdeg (följ pajdeg - grundrecept).","Sätt ugnen på 200°C","Hacka purjolök och lägg över pajdegen.","Riv västerbottenosten och lägg ovanpå pajdegen.","Vispa ägg och matlagningsgrädde. Häll över pajdegen.","Grädda lågt i ugnen i 35 minuter."]},{id:"sockerkaka",name:"Sockerkaka",intro:"Går att byta ut smör mot margarin eller rapsolja samt mjölk mot veganska alternativ.",tags:["bakverk"],servings:4,ingredients:[{name:"Ägg",amount:2,unit:"st",category:"kött & mejeri"},{name:"Socker",amount:2,unit:"dl",category:"skafferi"},{name:"Smör",amount:75,unit:"g",category:"kött & mejeri"},{name:"Mjölk",amount:1,unit:"dl",category:"kött & mejeri"},{name:"Vetemjöl",amount:2,unit:"dl",category:"skafferi"},{name:"Vaniljsocker",amount:2,unit:"tsk",category:"skafferi"},{name:"Bakpulver",amount:1,unit:"tsk",category:"skafferi"}],steps:["Sätt ugnen på 175°C","Vispa ägg och socker poröst.","Smält smör och värm upp tillsammans med mjölk.","Blanda mjöl, vaniljsocker och bakpulver.","Rör ihop allting","Grädda lågt i ugnen i 25 minuter.","Häll ett tunnt lager socker på toppen."]},{id:"cias-kladdkaka",name:"Cias kladdkaka",intro:"Mörk kladdkaka. Blir godast efter ett dygn i kylen.",tags:["bakverk"],servings:4,ingredients:[{name:"Ägg",amount:2,unit:"st",category:"kött & mejeri"},{name:"Socker",amount:1,unit:"dl",category:"skafferi"},{name:"Smör",amount:100,unit:"g",category:"kött & mejeri"},{name:"Vetemjöl",amount:1.5,unit:"dl",category:"skafferi"},{name:"Kakao",amount:4,unit:"msk",category:"skafferi"},{name:"Vaniljsocker",amount:2,unit:"tsk",category:"skafferi"}],steps:["Sätt ugnen på 150°C","Smält smör.","Blanda alla ingredienser + lite salt och häll i en bakform.","Grädda lågt i ugnen i 25 minuter."]},{id:"ellicas-kladdkaka",name:"Ellicas kladdkaka",intro:"Mer som en chokladtryffel. Fick receptet från kapsylens julmarknad. Servera med grädde.",tags:["bakverk"],servings:8,ingredients:[{name:"Margarin",amount:250,unit:"g",category:"kött & mejeri"},{name:"Blockchoklad",amount:300,unit:"g",category:"skafferi"},{name:"Socker",amount:2,unit:"dl",category:"skafferi"},{name:"Vaniljsocker",amount:1,unit:"msk",category:"skafferi"},{name:"Ägg",amount:4,unit:"st",category:"kött & mejeri"},{name:"Bryggkaffe",amount:4,unit:"msk",category:"skafferi"}],steps:["Sätt ugnen på 175°C","Smält margarin och blanda ner blockchokladen. Rör om så att smeten blir slät.","Blanda i övriga ingredienser.","Häll smeten i en form och grädda mitt i ugnen i 25 minuter.","Låt stå i kyl i 24h alternativt frys i 4h innan servering."]},{id:"raw-jordnotscurry",name:"Raw jordnötscurry med kokosris",intro:"Matig trots att den är raw.",tags:["middag","bjudmat","veganskt","raw"],servings:4,ingredients:[{name:"Palsternacka",amount:2,unit:"st",category:"frukt & grönt"},{name:"Kokosflingor",amount:1.5,unit:"dl",category:"kryddor & smaksättare"},{name:"Agavesirap",amount:1,unit:"tsk",category:"skafferi"},{name:"Gurka",amount:.5,unit:"st",category:"frukt & grönt"},{name:"Paprika",amount:1,unit:"st",category:"frukt & grönt"},{name:"Morot",amount:1,unit:"st",category:"frukt & grönt"},{name:"Koriander",amount:.5,unit:"dl",category:"frukt & grönt"},{name:"Soltorkade tomater",amount:3,unit:"st",category:"skafferi"},{name:"Ingefära",amount:3,unit:"cm",category:"frukt & grönt"},{name:"Vitlök",amount:1,unit:"klyftor",category:"frukt & grönt"},{name:"Tamarisås",amount:2,unit:"msk",category:"kryddor & smaksättare"},{name:"Röd chili",amount:.5,unit:"st",category:"frukt & grönt"},{name:"Jordnötssmör",amount:1,unit:"dl",category:"skafferi"},{name:"Gurkmeja",amount:.5,unit:"tsk",category:"kryddor & smaksättare"},{name:"Lime",amount:2,unit:"st",category:"frukt & grönt"}],steps:["Ris: Kör palsternacka, kokosflingor, agavesirap och lite salt i en matberedare tills det ser ut som ris.","Sås: Mixa koriander, soltorkade tomater, ingefära, vitlök, tamarisås, chili, jordnötssmör, gurkmeja, limesaft och lite vatten till en slät sås.","Hacka gurka, paprika, morot och sockerärtor och blanda med såsen."]},{id:"jojos-granola",name:"Jojos granola",intro:"Min granola.",tags:["brunch"],servings:4,ingredients:[{name:"Hasselnötter",amount:60,unit:"g",category:"skafferi"},{name:"Fiberhavregryn",amount:4,unit:"dl",category:"skafferi"},{name:"Riven kokos",amount:1,unit:"dl",category:"skafferi"},{name:"Pumpafrön",amount:.5,unit:"dl",category:"skafferi"},{name:"Hela linfrön",amount:.5,unit:"dl",category:"skafferi"},{name:"Solroskärnor",amount:.5,unit:"dl",category:"skafferi"},{name:"Honung",amount:.5,unit:"dl",category:"skafferi"},{name:"Rapsolja",amount:.5,unit:"dl",category:"skafferi"},{name:"Kanel",amount:1,unit:"msk",category:"kryddor & smaksättare"}],steps:["Sätt ugnen på 175°C","Hacka hasselnötterna och lägg dem på en plåt.","Häll över resten av alla ingredienser och blanda.","Lägg i ugnen i 10 minuter, ta ut och rör om och lägg in i ugnen i 13 minuter till."]}],I=R;let h="",g=[],L=null;function z(){const t=document.getElementById("main"),e=H(I);t.innerHTML=`
    <div class="page-header">
      <h1 class="page-title">Hitta ett recept</h1>
      <p class="page-subtitle">Sök på ingrediens, rätt eller tagg</p>
    </div>

    <div class="search-container">
      <div class="search-input-wrapper">
        <span class="search-icon">🔍</span>
        <input
          type="text"
          class="search-input"
          id="search-input"
          placeholder="Sök t.ex. mjölk, pasta, veganskt, middag…"
          value="${l(h)}"
          autocomplete="off"
        />
        <button class="search-clear ${h?"visible":""}" id="search-clear" title="Rensa sökning">✕</button>
      </div>
    </div>

    <div class="tags-container" id="tags-container">
      ${e.map(n=>`
        <button class="tag-chip ${g.includes(n)?"active":""}" data-tag="${l(n)}">
          ${l(n)}${g.includes(n)?' <span class="tag-x">✕</span>':""}
        </button>
      `).join("")}
    </div>

    <div id="results-area"></div>
  `,E(),X()}function E(){const t=document.getElementById("results-area");let e=W(I,h);if(e=Y(e,g),e.length===0){t.innerHTML=`
      <div class="empty-state">
        <span class="empty-state-icon">🔍</span>
        <div class="empty-state-title">Inga recept hittades</div>
        <p class="empty-state-text">Prova en annan sökning eller rensa filtren</p>
      </div>
    `;return}const n=h||g.length>0?`<div class="results-info">${e.length} recept${e.length===1,""} hittades</div>`:"";t.innerHTML=`
    ${n}
    <div class="recipes-grid">
      ${e.map(Q).join("")}
    </div>
  `,t.querySelectorAll(".recipe-card").forEach(a=>{a.addEventListener("click",()=>{const s=a.dataset.id;window.location.hash=`#/recipe/${s}`})})}function Q(t){const e=t.tags.slice(0,3).map(a=>`<span class="tag-pill">${l(a)}</span>`).join(""),n=t.image?`<img class="recipe-card-image" src="${l(t.image)}" alt="${l(t.name)}" loading="lazy" />`:`<div class="recipe-card-image-placeholder">${tt(t)}</div>`;return`
    <article class="recipe-card" data-id="${l(t.id)}" role="button" tabindex="0">
      ${n}
      <div class="recipe-card-body">
        <div class="recipe-card-name">${l(t.name)}</div>
        <p class="recipe-card-intro">${l(t.intro)}</p>
        <div class="recipe-card-footer">
          <span class="recipe-card-servings">🍽️ ${t.servings} port.</span>
          <div class="recipe-card-tags">${e}</div>
        </div>
      </div>
    </article>
  `}function X(){const t=document.getElementById("search-input"),e=document.getElementById("search-clear");t.addEventListener("input",()=>{h=t.value,e.classList.toggle("visible",h.length>0),L&&clearTimeout(L),L=setTimeout(()=>{E()},200)}),e.addEventListener("click",()=>{h="",t.value="",e.classList.remove("visible"),t.focus(),E()}),document.getElementById("tags-container").addEventListener("click",n=>{const a=n.target.closest(".tag-chip");if(!a)return;const s=a.dataset.tag,i=g.indexOf(s);i===-1?g.push(s):g.splice(i,1),Z(),E()}),document.addEventListener("keydown",n=>{if(n.key==="Enter"){const a=document.activeElement;a.classList.contains("recipe-card")&&a.click()}})}function Z(){const t=H(I),e=document.getElementById("tags-container");e.innerHTML=t.map(n=>`
      <button class="tag-chip ${g.includes(n)?"active":""}" data-tag="${l(n)}">
        ${l(n)}${g.includes(n)?' <span class="tag-x">✕</span>':""}
      </button>
    `).join("")}function tt(t){const e={pasta:"🍝",fisk:"🐟",frukost:"🌅",veganskt:"🌱",vegetariskt:"🥦",gryta:"🍲",middag:"🍽️",fika:"☕",barn:"👶"};for(const n of t.tags)if(e[n])return e[n];return"🍳"}function l(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const et=R;function nt(t){const e=document.getElementById("main"),n=et.find(u=>u.id===t);if(!n){e.innerHTML=`
      <button class="back-btn" id="back-btn">← Tillbaka</button>
      <div class="empty-state">
        <span class="empty-state-icon">😕</span>
        <div class="empty-state-title">Receptet hittades inte</div>
        <p class="empty-state-text">Det verkar som att detta recept inte finns.</p>
      </div>
    `,document.getElementById("back-btn").addEventListener("click",()=>{window.history.back()});return}let a=n.servings;const s=new Set;function i(){const u=n.image?`<img class="recipe-detail-image" src="${k(n.image)}" alt="${k(n.name)}" />`:`<div class="recipe-detail-image-placeholder">${rt(n)}</div>`,y=n.tags.map(o=>`<span class="tag-pill">${k(o)}</span>`).join(""),c=n.ingredients.map(o=>({...o,amount:st(o.amount,n.servings,a)}));e.innerHTML=`
      <button class="back-btn" id="back-btn">← Alla recept</button>

      <div class="recipe-detail-header">
        <h1 class="recipe-detail-title">${k(n.name)}</h1>
        <div class="recipe-detail-meta">
          <span class="recipe-meta-item">🍽️ ${n.servings} port. (standard)</span>
          <span class="recipe-meta-item">📋 ${n.steps.length} steg</span>
          <span class="recipe-meta-item">🥕 ${n.ingredients.length} ingredienser</span>
        </div>
        <div class="recipe-detail-tags">${y}</div>
      </div>

      ${u}

      <p class="recipe-detail-intro">${k(n.intro)}</p>

      <div class="recipe-layout">
        <aside>
          <div class="servings-card">
            <div class="servings-label">Portioner</div>
            <div class="servings-control">
              <button class="servings-btn" id="servings-minus" ${a<=1?"disabled":""}>−</button>
              <span class="servings-count" id="servings-count">${a}</span>
              <button class="servings-btn" id="servings-plus">+</button>
            </div>
            <div class="ingredients-list">
              ${c.map(at).join("")}
            </div>
            <button class="btn btn-primary add-to-shopping-btn" id="add-to-shopping">
              🛒 Lägg till i inköpslistan
            </button>
          </div>
        </aside>

        <section>
          <h2 class="section-title">Gör så här</h2>
          <ol class="steps-list">
            ${n.steps.map((o,b)=>`
              <li class="step-item ${s.has(b)?"step-done":""}" data-step="${b}">
                <span class="step-number">${s.has(b)?"✓":b+1}</span>
                <span class="step-text">${k(o)}</span>
              </li>
            `).join("")}
          </ol>
        </section>
      </div>
    `,r(c)}function r(u){document.getElementById("back-btn").addEventListener("click",()=>{window.location.hash="#/"}),document.getElementById("servings-minus").addEventListener("click",()=>{a>1&&(a--,i())}),document.getElementById("servings-plus").addEventListener("click",()=>{a++,i()}),document.getElementById("add-to-shopping").addEventListener("click",()=>{A(n,u),ot(`"${n.name}" lades till i inköpslistan!`),f()}),document.querySelector(".steps-list").addEventListener("click",y=>{const c=y.target.closest(".step-item");if(!c)return;const o=Number(c.dataset.step);s.has(o)?(s.delete(o),c.classList.remove("step-done"),c.querySelector(".step-number").textContent=String(o+1)):(s.add(o),c.classList.add("step-done"),c.querySelector(".step-number").textContent="✓")})}i()}function at(t){const e=it(t.amount);return`
    <div class="ingredient-item">
      <span class="ingredient-name">${k(t.name)}</span>
      <span class="ingredient-amount">${e} ${k(t.unit)}</span>
    </div>
  `}function st(t,e,n){const a=t/e*n,s=Math.pow(10,Math.floor(Math.log10(a||1)));return Math.round(a/s*20)/20*s}function it(t){if(Number.isInteger(t))return String(t);const e=[[.25,"¼"],[.5,"½"],[.75,"¾"],[.333,"⅓"],[.667,"⅔"]],n=t%1,a=Math.floor(t);for(const[s,i]of e)if(Math.abs(n-s)<.04)return a>0?`${a} ${i}`:i;return t.toFixed(1).replace(/\.0$/,"")}function rt(t){const e={pasta:"🍝",fisk:"🐟",frukost:"🌅",veganskt:"🌱",vegetariskt:"🥦",gryta:"🍲",middag:"🍽️",fika:"☕",barn:"👶"};for(const n of t.tags)if(e[n])return e[n];return"🍳"}function ot(t){let e=document.querySelector(".toast");e||(e=document.createElement("div"),e.className="toast",document.body.appendChild(e)),e.textContent=t,e.classList.add("show"),setTimeout(()=>e.classList.remove("show"),3e3)}function k(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const B=["frukt & grönt","bröd","kött & mejeri","frys","skafferi","kryddor & smaksättare","barn","hygien"],G={"frukt & grönt":"🥦",bröd:"🍞","kött & mejeri":"🥩",frys:"❄️",skafferi:"🥫","kryddor & smaksättare":"🧂",barn:"👶",hygien:"🧼"};function v(){const t=document.getElementById("main"),e=m(),n=e.filter(r=>!r.checked),a=e.filter(r=>r.checked),s=ut(n),i=e.length===0?`<div class="shopping-empty empty-state">
        <span class="empty-state-icon">🛒</span>
        <div class="empty-state-title">Din inköpslista är tom</div>
        <p class="empty-state-text">Lägg till ingredienser från ett recept eller via formuläret ovan.</p>
      </div>`:`<div class="shopping-toolbar">
        <span style="color: var(--color-text-muted); font-size: 0.875rem;">
          ${a.length>0?`${a.length} avkryssade`:"Inga avkryssade ännu"}
        </span>
        <div class="shopping-toolbar-actions">
          ${a.length>0?'<button class="btn btn-secondary" id="clear-checked">🗑️ Rensa avkryssade</button>':""}
        </div>
      </div>
      <div id="shopping-list">
        ${B.filter(r=>s[r]&&s[r].length>0).map(r=>ct(r,s[r])).join("")}
      </div>`;t.innerHTML=`
    <div class="page-header">
      <h1 class="page-title">Inköpslista</h1>
      ${e.length>0?`<p class="page-subtitle">${n.length} av ${e.length} kvar att handla</p>`:""}
    </div>

    <div class="add-item-card">
      <div class="add-item-title">+ Lägg till vara</div>
      <form class="add-item-form" id="add-item-form" autocomplete="off">
        <input
          type="text"
          class="add-item-input add-item-name"
          id="add-item-name"
          placeholder="Vad behöver du? (t.ex. hushållspapper)"
          required
        />
        <div class="add-item-row">
          <input
            type="number"
            class="add-item-input add-item-amount"
            id="add-item-amount"
            placeholder="Mängd"
            min="0"
            step="0.5"
          />
          <input
            type="text"
            class="add-item-input add-item-unit"
            id="add-item-unit"
            placeholder="Enhet (st, kg…)"
          />
          <select class="add-item-input add-item-category" id="add-item-category">
            ${B.map(r=>`<option value="${d(r)}">${G[r]} ${d(r)}</option>`).join("")}
          </select>
          <button type="submit" class="btn btn-primary add-item-submit">Lägg till</button>
        </div>
      </form>
    </div>

    ${i}
  `,mt(),lt()}function ct(t,e){return`
    <div class="shopping-category" data-category="${d(t)}">
      <div class="shopping-category-header">
        <span class="shopping-category-icon">${G[t]}</span>
        <span class="shopping-category-name">${d(t)}</span>
        <span class="shopping-category-count">${e.length} st</span>
      </div>
      ${e.map(dt).join("")}
    </div>
  `}function dt(t){return`
    <div class="shopping-item" data-item-id="${d(t.id)}">
      <input
        type="checkbox"
        class="shopping-item-checkbox"
        data-id="${d(t.id)}"
        ${t.checked?"checked":""}
        title="Kryssa av"
      />
      <span class="shopping-item-name">${d(t.name)}</span>
      <div class="shopping-item-amount">
        <input
          type="number"
          class="shopping-amount-input"
          data-id="${d(t.id)}"
          value="${t.amount}"
          min="0"
          step="0.5"
          title="Ändra mängd"
        />
        <input
          type="text"
          class="shopping-unit-input"
          data-id="${d(t.id)}"
          value="${d(t.unit)}"
          title="Ändra enhet"
        />
      </div>
      <button class="shopping-item-remove" data-id="${d(t.id)}" title="Ta bort">✕</button>
    </div>
  `}let j=null;function x(){const t=document.getElementById("undo-bar");if(t&&t.remove(),j&&clearTimeout(j),_()===0)return;const e=document.createElement("div");e.id="undo-bar",e.className="undo-bar",e.innerHTML=`
    <span>Ångra senaste åtgärd</span>
    <button class="undo-bar-btn" id="undo-btn">↩ Ångra</button>
  `,document.body.appendChild(e),document.getElementById("undo-btn").addEventListener("click",()=>{const n=J();j&&clearTimeout(j),e.remove(),n&&(n.type==="check"?C(n.item.id):n.type==="remove"&&q(n.item,n.index),f(),v())}),j=setTimeout(()=>e.remove(),5e3)}function lt(){const t=document.getElementById("undo-bar");t&&t.remove()}function mt(){document.getElementById("add-item-form").addEventListener("submit",a=>{a.preventDefault();const s=document.getElementById("add-item-name"),i=document.getElementById("add-item-amount"),r=document.getElementById("add-item-unit"),u=document.getElementById("add-item-category"),y=s.value.trim();if(!y)return;const c=parseFloat(i.value)||0,o=r.value.trim(),b=u.value;U(y,c,o,b),f(),v()});const e=document.getElementById("shopping-list");e.addEventListener("change",a=>{const s=a.target.closest(".shopping-item-checkbox");if(!s)return;const i=s.dataset.id;if(s.checked){const r=O(i);r&&w({type:"check",item:r}),f(),v(),x()}else C(i),f(),v()}),e.addEventListener("click",a=>{const s=a.target.closest(".shopping-item-remove");if(!s)return;const i=s.dataset.id,r=V(i);r&&w({type:"remove",item:r.item,index:r.index}),f(),v(),x()}),e.addEventListener("change",a=>{const s=a.target.closest(".shopping-amount-input");if(!s)return;const i=s.dataset.id,r=parseFloat(s.value);!isNaN(r)&&r>=0&&K(i,r)}),e.addEventListener("change",a=>{const s=a.target.closest(".shopping-unit-input");if(!s)return;const i=s.dataset.id;F(i,s.value.trim())});const n=document.getElementById("clear-checked");n&&n.addEventListener("click",()=>{D(),f(),v()})}function ut(t){const e={};for(const n of t)e[n.category]||(e[n.category]=[]),e[n.category].push(n);return e}function d(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function N(){const t=window.location.hash||"#/";f();const e=t.match(/^#\/recipe\/(.+)$/);if(e){nt(decodeURIComponent(e[1]));return}if(t==="#/shopping"){v();return}z()}window.addEventListener("hashchange",N);N();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js")});
