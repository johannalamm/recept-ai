(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();const B="recept-ai:shopping",N=20;function H(){return Math.random().toString(36).slice(2)+Date.now().toString(36)}function m(){try{const t=localStorage.getItem(B);return t?JSON.parse(t):[]}catch{return[]}}function p(t){localStorage.setItem(B,JSON.stringify(t))}function A(t,e){const n=m();for(const a of e){const s=a.name.toLowerCase(),i=n.find(r=>r.name.toLowerCase()===s&&r.unit===a.unit);i?(i.amount=I(i.amount+a.amount),i.recipeIds.includes(t.id)||i.recipeIds.push(t.id)):n.push({id:H(),name:a.name,amount:a.amount,unit:a.unit,category:a.category,checked:!1,recipeIds:[t.id]})}p(n)}function P(t){const e=m(),n=e.find(a=>a.id===t);return n?(n.checked=!0,p(e),{...n}):null}function C(t){const e=m(),n=e.find(a=>a.id===t);n&&(n.checked=!1,p(e))}function q(t){const e=m(),n=e.findIndex(s=>s.id===t);if(n===-1)return null;const[a]=e.splice(n,1);return p(e),{item:a,index:n}}function F(t,e){const n=m();n.splice(Math.min(e,n.length),0,t),p(n)}function U(t,e){const n=m(),a=n.find(s=>s.id===t);a&&(a.amount=I(e),p(n))}function V(t,e){const n=m(),a=n.find(s=>s.id===t);a&&(a.unit=e,p(n))}function D(t,e,n,a){const s=m(),i=t.toLowerCase(),r=s.find(u=>u.name.toLowerCase()===i&&u.unit===n);r?r.amount=I(r.amount+e):s.push({id:H(),name:t,amount:e,unit:n,category:a,checked:!1,recipeIds:[]}),p(s)}function G(){const t=m().filter(e=>!e.checked);p(t)}let E=[];function x(t){E.push(t),E.length>N&&E.shift()}function _(){return E.pop()}function J(){return E.length}function I(t){return Math.round(t*100)/100}function f(){const t=document.getElementById("nav"),e=window.location.hash||"#/",a=m().filter(s=>!s.checked).length;t.innerHTML=`
    <div class="nav-inner">
      <div class="nav-logo" data-href="#/">
        <span>🍳</span> Receptboken
      </div>
      <div class="nav-links">
        <button class="nav-link ${e==="#/"||e===""?"active":""}" data-href="#/">
          <span class="nav-icon">🏠</span> Recept
        </button>
        <button class="nav-link ${e.startsWith("#/shopping")?"active":""}" data-href="#/shopping">
          <span class="nav-icon">🛒</span> Inköpslista
          ${a>0?`<span class="nav-badge">${a}</span>`:""}
        </button>
      </div>
    </div>
  `,t.querySelectorAll("[data-href]").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.href;window.location.hash=i})})}function Y(t,e){const n=e.trim().toLowerCase();return n?t.filter(a=>!!(a.name.toLowerCase().includes(n)||a.tags.some(s=>s.toLowerCase().includes(n))||a.ingredients.some(s=>s.name.toLowerCase().includes(n)))):t}function z(t,e){return e.length===0?t:t.filter(n=>e.every(a=>n.tags.includes(a)))}function M(t){const e=new Set;return t.forEach(n=>n.tags.forEach(a=>e.add(a))),Array.from(e).sort()}const R=[{id:"kottfarsas",name:"Köttfärssås",intro:"En klassisk köttfärssås som passar hela familjen. Perfekt till pasta eller lasagne. Den här versionen är fyllig och smakrik med tomater, lök och örter som kokar ihop under lång tid.",tags:["middag","pasta","klassiker","familj"],servings:4,ingredients:[{name:"Nötfärs",amount:500,unit:"g",category:"kött & mejeri"},{name:"Gul lök",amount:1,unit:"st",category:"frukt & grönt"},{name:"Vitlök",amount:3,unit:"klyftor",category:"frukt & grönt"},{name:"Krossade tomater",amount:2,unit:"burkar",category:"skafferi"},{name:"Tomatpuré",amount:2,unit:"msk",category:"skafferi"},{name:"Olivolja",amount:2,unit:"msk",category:"skafferi"},{name:"Oregano",amount:1,unit:"tsk",category:"kryddor & smaksättare"},{name:"Basilika",amount:1,unit:"tsk",category:"kryddor & smaksättare"},{name:"Salt",amount:1,unit:"tsk",category:"kryddor & smaksättare"},{name:"Svartpeppar",amount:.5,unit:"tsk",category:"kryddor & smaksättare"},{name:"Pasta",amount:400,unit:"g",category:"skafferi"}],steps:["Finhacka lök och vitlök.","Hetta upp olivoljan i en stor stekpanna eller gryta på medelhög värme.","Fräs löken i 3–4 minuter tills den är mjuk och genomskinlig.","Tillsätt vitlöken och fräs ytterligare en minut.","Höj värmen och lägg i köttfärsen. Bryn under omrörning tills all köttfärs är genomstekt.","Rör ner tomatpurén och låt den fräsa med i 1 minut.","Häll i de krossade tomaterna. Tillsätt oregano, basilika, salt och peppar.","Låt såsen puttra på låg värme i minst 20 minuter, gärna 40 minuter för djupare smak.","Koka pastan enligt förpackningens anvisning.","Servera köttfärssåsen över pastan och toppa gärna med riven parmesan."]},{id:"vegetarisk-gryta",name:"Vegetarisk kikärtgryta",intro:"En värmande och proteinrik gryta med kikärtor, kokosmjölk och kryddor inspirerade av indisk matlagning. Perfekt för kyliga höstkvällar och enkel att förbereda i förväg.",tags:["veganskt","vegetariskt","middag","gryta","glutenfritt"],servings:4,ingredients:[{name:"Kikärtor",amount:2,unit:"burkar",category:"skafferi"},{name:"Kokosmjölk",amount:1,unit:"burk",category:"skafferi"},{name:"Krossade tomater",amount:1,unit:"burk",category:"skafferi"},{name:"Gul lök",amount:1,unit:"st",category:"frukt & grönt"},{name:"Vitlök",amount:4,unit:"klyftor",category:"frukt & grönt"},{name:"Färsk ingefära",amount:2,unit:"cm",category:"frukt & grönt"},{name:"Spenat",amount:100,unit:"g",category:"frys"},{name:"Kokosolja",amount:2,unit:"msk",category:"skafferi"},{name:"Gurkmeja",amount:1,unit:"tsk",category:"kryddor & smaksättare"},{name:"Spiskummin",amount:1,unit:"tsk",category:"kryddor & smaksättare"},{name:"Koriander (malen)",amount:1,unit:"tsk",category:"kryddor & smaksättare"},{name:"Garam masala",amount:.5,unit:"tsk",category:"kryddor & smaksättare"},{name:"Chiliflingor",amount:.5,unit:"tsk",category:"kryddor & smaksättare"},{name:"Salt",amount:1,unit:"tsk",category:"kryddor & smaksättare"},{name:"Ris",amount:300,unit:"g",category:"skafferi"}],steps:["Finhacka lök, vitlök och riv ingefäran.","Hetta upp kokosoljan i en stor gryta på medelhög värme.","Fräs löken i 4–5 minuter tills den är gyllene.","Tillsätt vitlök, ingefära och alla kryddor. Fräs under omrörning i 1–2 minuter tills det doftar fantastiskt.","Häll i krossade tomater och kokosmjölk. Rör om ordentligt.","Skölj och tillsätt kikärtorna. Rör om och koka upp.","Låt grytan puttra på låg värme i 15–20 minuter.","Rör ner spenaten mot slutet och låt den sjunka ihop, ca 2 minuter.","Smaka av med salt och mer kryddor efter behag.","Koka riset enligt förpackning och servera grytan ovanpå."]},{id:"pannkakor",name:"Klassiska pannkakor",intro:"Tunna, mjuka pannkakor som alltid faller alla i smaken. Det här är basreceptet som gått i arv – enkelt, snabbt och ostoppbart gott med sylt och grädde.",tags:["frukost","fika","klassiker","barn","vegetariskt"],servings:4,ingredients:[{name:"Vetemjöl",amount:3,unit:"dl",category:"skafferi"},{name:"Mjölk",amount:6,unit:"dl",category:"kött & mejeri"},{name:"Ägg",amount:3,unit:"st",category:"kött & mejeri"},{name:"Smör",amount:50,unit:"g",category:"kött & mejeri"},{name:"Salt",amount:.5,unit:"tsk",category:"kryddor & smaksättare"},{name:"Jordgubbssylt",amount:1,unit:"burk",category:"skafferi"},{name:"Vispgrädde",amount:2,unit:"dl",category:"kött & mejeri"}],steps:["Vispa ihop vetemjöl och hälften av mjölken till en slät smet utan klumpar.","Tillsätt resten av mjölken, äggen och saltet. Vispa ihop ordentligt.","Smält smöret och rör ner det i smeten.","Låt smeten vila i minst 15 minuter i kylen.","Hetta upp en stekpanna på medelhög värme och smöra den lätt.","Häll i en lagom mängd smet och vrid pannan så smeten täcker botten tunt.","Stek ca 1–2 minuter tills kanterna börjar lossna, vänd sedan pannkakan.","Stek ytterligare 30 sekunder på andra sidan.","Upprepa med resten av smeten. Håll pannkakorna varma i ugnen på 80°C om du vill.","Servera med jordgubbssylt och vispad grädde."]},{id:"lax-med-citron",name:"Ugnsbakad lax med citron och dill",intro:"Enkel och elegant lax som tillagas i ugnen med färsk citron, dill och smör. Redo på under 20 minuter och passar lika bra till vardag som till middag med gäster.",tags:["middag","fisk","snabbt","glutenfritt","nyttigt"],servings:2,ingredients:[{name:"Laxfilé",amount:400,unit:"g",category:"frys"},{name:"Citron",amount:1,unit:"st",category:"frukt & grönt"},{name:"Färsk dill",amount:1,unit:"knippe",category:"frukt & grönt"},{name:"Smör",amount:30,unit:"g",category:"kött & mejeri"},{name:"Vitlök",amount:2,unit:"klyftor",category:"frukt & grönt"},{name:"Salt",amount:.5,unit:"tsk",category:"kryddor & smaksättare"},{name:"Svartpeppar",amount:.5,unit:"tsk",category:"kryddor & smaksättare"},{name:"Potatis",amount:500,unit:"g",category:"frukt & grönt"},{name:"Mjölk",amount:1,unit:"dl",category:"kött & mejeri"}],steps:["Värm ugnen till 200°C.","Lägg laxfiléerna i en ugnsform. Salta och peppra.","Pressa citronens saft över laxen.","Skär smöret i skivor och lägg ovanpå laxen tillsammans med krossad vitlök och dill.","Baka i ugnen i 12–15 minuter tills laxen är genomstekt men fortfarande saftig.","Under tiden: skala och koka potatisen i saltat vatten ca 15 minuter.","Mosa potatisen med smör och mjölk, smaka av med salt.","Servera laxen direkt ur formen med potatismos och en citronklyfta."]},{id:"havregrot",name:"Krämig havregrynsgröt",intro:"En näringsrik och mättande frukost som värmer kroppen. Havregrynsgröt är snabb att laga och kan toppas med precis vad du vill – bär, nötter, honung eller kanel.",tags:["frukost","veganskt","snabbt","nyttigt","barn"],servings:2,ingredients:[{name:"Havregryn",amount:2,unit:"dl",category:"skafferi"},{name:"Vatten",amount:4,unit:"dl",category:"skafferi"},{name:"Mjölk",amount:1,unit:"dl",category:"kött & mejeri"},{name:"Salt",amount:1,unit:"krm",category:"kryddor & smaksättare"},{name:"Blåbär",amount:1,unit:"dl",category:"frys"},{name:"Honung",amount:2,unit:"msk",category:"skafferi"},{name:"Kanel",amount:.5,unit:"tsk",category:"kryddor & smaksättare"}],steps:["Koka upp vatten och mjölk i en kastrull.","Tillsätt havregryn och salt under omrörning.","Koka på medelvärme under omrörning i 3–5 minuter tills gröten tjocknar.","Häll upp i skålar.","Toppa med blåbär, ringla över honung och strö på kanel.","Servera genast medan den är varm och krämig."]}],j=R;let v="",g=[],S=null;function Q(){const t=document.getElementById("main"),e=M(j);t.innerHTML=`
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
          value="${d(v)}"
          autocomplete="off"
        />
        <button class="search-clear ${v?"visible":""}" id="search-clear" title="Rensa sökning">✕</button>
      </div>
    </div>

    <div class="tags-container" id="tags-container">
      ${e.map(n=>`
        <button class="tag-chip ${g.includes(n)?"active":""}" data-tag="${d(n)}">
          ${d(n)}${g.includes(n)?' <span class="tag-x">✕</span>':""}
        </button>
      `).join("")}
    </div>

    <div id="results-area"></div>
  `,L(),X()}function L(){const t=document.getElementById("results-area");let e=Y(j,v);if(e=z(e,g),e.length===0){t.innerHTML=`
      <div class="empty-state">
        <span class="empty-state-icon">🔍</span>
        <div class="empty-state-title">Inga recept hittades</div>
        <p class="empty-state-text">Prova en annan sökning eller rensa filtren</p>
      </div>
    `;return}const n=v||g.length>0?`<div class="results-info">${e.length} recept${e.length===1,""} hittades</div>`:"";t.innerHTML=`
    ${n}
    <div class="recipes-grid">
      ${e.map(W).join("")}
    </div>
  `,t.querySelectorAll(".recipe-card").forEach(a=>{a.addEventListener("click",()=>{const s=a.dataset.id;window.location.hash=`#/recipe/${s}`})})}function W(t){const e=t.tags.slice(0,3).map(a=>`<span class="tag-pill">${d(a)}</span>`).join(""),n=t.image?`<img class="recipe-card-image" src="${d(t.image)}" alt="${d(t.name)}" loading="lazy" />`:`<div class="recipe-card-image-placeholder">${tt(t)}</div>`;return`
    <article class="recipe-card" data-id="${d(t.id)}" role="button" tabindex="0">
      ${n}
      <div class="recipe-card-body">
        <div class="recipe-card-name">${d(t.name)}</div>
        <p class="recipe-card-intro">${d(t.intro)}</p>
        <div class="recipe-card-footer">
          <span class="recipe-card-servings">🍽️ ${t.servings} port.</span>
          <div class="recipe-card-tags">${e}</div>
        </div>
      </div>
    </article>
  `}function X(){const t=document.getElementById("search-input"),e=document.getElementById("search-clear");t.addEventListener("input",()=>{v=t.value,e.classList.toggle("visible",v.length>0),S&&clearTimeout(S),S=setTimeout(()=>{L()},200)}),e.addEventListener("click",()=>{v="",t.value="",e.classList.remove("visible"),t.focus(),L()}),document.getElementById("tags-container").addEventListener("click",n=>{const a=n.target.closest(".tag-chip");if(!a)return;const s=a.dataset.tag,i=g.indexOf(s);i===-1?g.push(s):g.splice(i,1),Z(),L()}),document.addEventListener("keydown",n=>{if(n.key==="Enter"){const a=document.activeElement;a.classList.contains("recipe-card")&&a.click()}})}function Z(){const t=M(j),e=document.getElementById("tags-container");e.innerHTML=t.map(n=>`
      <button class="tag-chip ${g.includes(n)?"active":""}" data-tag="${d(n)}">
        ${d(n)}${g.includes(n)?' <span class="tag-x">✕</span>':""}
      </button>
    `).join("")}function tt(t){const e={pasta:"🍝",fisk:"🐟",frukost:"🌅",veganskt:"🌱",vegetariskt:"🥦",gryta:"🍲",middag:"🍽️",fika:"☕",barn:"👶"};for(const n of t.tags)if(e[n])return e[n];return"🍳"}function d(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const et=R;function nt(t){const e=document.getElementById("main"),n=et.find(u=>u.id===t);if(!n){e.innerHTML=`
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
  `}function st(t,e,n){const a=t/e*n,s=Math.pow(10,Math.floor(Math.log10(a||1)));return Math.round(a/s*20)/20*s}function it(t){if(Number.isInteger(t))return String(t);const e=[[.25,"¼"],[.5,"½"],[.75,"¾"],[.333,"⅓"],[.667,"⅔"]],n=t%1,a=Math.floor(t);for(const[s,i]of e)if(Math.abs(n-s)<.04)return a>0?`${a} ${i}`:i;return t.toFixed(1).replace(/\.0$/,"")}function rt(t){const e={pasta:"🍝",fisk:"🐟",frukost:"🌅",veganskt:"🌱",vegetariskt:"🥦",gryta:"🍲",middag:"🍽️",fika:"☕",barn:"👶"};for(const n of t.tags)if(e[n])return e[n];return"🍳"}function ot(t){let e=document.querySelector(".toast");e||(e=document.createElement("div"),e.className="toast",document.body.appendChild(e)),e.textContent=t,e.classList.add("show"),setTimeout(()=>e.classList.remove("show"),3e3)}function k(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const T=["frukt & grönt","bröd","kött & mejeri","frys","skafferi","kryddor & smaksättare","barn","hygien"],K={"frukt & grönt":"🥦",bröd:"🍞","kött & mejeri":"🥩",frys:"❄️",skafferi:"🥫","kryddor & smaksättare":"🧂",barn:"👶",hygien:"🧼"};function h(){const t=document.getElementById("main"),e=m(),n=e.filter(r=>!r.checked),a=e.filter(r=>r.checked),s=ut(n),i=e.length===0?`<div class="shopping-empty empty-state">
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
        ${T.filter(r=>s[r]&&s[r].length>0).map(r=>ct(r,s[r])).join("")}
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
            ${T.map(r=>`<option value="${l(r)}">${K[r]} ${l(r)}</option>`).join("")}
          </select>
          <button type="submit" class="btn btn-primary add-item-submit">Lägg till</button>
        </div>
      </form>
    </div>

    ${i}
  `,mt(),dt()}function ct(t,e){return`
    <div class="shopping-category" data-category="${l(t)}">
      <div class="shopping-category-header">
        <span class="shopping-category-icon">${K[t]}</span>
        <span class="shopping-category-name">${l(t)}</span>
        <span class="shopping-category-count">${e.length} st</span>
      </div>
      ${e.map(lt).join("")}
    </div>
  `}function lt(t){return`
    <div class="shopping-item" data-item-id="${l(t.id)}">
      <input
        type="checkbox"
        class="shopping-item-checkbox"
        data-id="${l(t.id)}"
        ${t.checked?"checked":""}
        title="Kryssa av"
      />
      <span class="shopping-item-name">${l(t.name)}</span>
      <div class="shopping-item-amount">
        <input
          type="number"
          class="shopping-amount-input"
          data-id="${l(t.id)}"
          value="${t.amount}"
          min="0"
          step="0.5"
          title="Ändra mängd"
        />
        <input
          type="text"
          class="shopping-unit-input"
          data-id="${l(t.id)}"
          value="${l(t.unit)}"
          title="Ändra enhet"
        />
      </div>
      <button class="shopping-item-remove" data-id="${l(t.id)}" title="Ta bort">✕</button>
    </div>
  `}let $=null;function w(){const t=document.getElementById("undo-bar");if(t&&t.remove(),$&&clearTimeout($),J()===0)return;const e=document.createElement("div");e.id="undo-bar",e.className="undo-bar",e.innerHTML=`
    <span>Ångra senaste åtgärd</span>
    <button class="undo-bar-btn" id="undo-btn">↩ Ångra</button>
  `,document.body.appendChild(e),document.getElementById("undo-btn").addEventListener("click",()=>{const n=_();$&&clearTimeout($),e.remove(),n&&(n.type==="check"?C(n.item.id):n.type==="remove"&&F(n.item,n.index),f(),h())}),$=setTimeout(()=>e.remove(),5e3)}function dt(){const t=document.getElementById("undo-bar");t&&t.remove()}function mt(){document.getElementById("add-item-form").addEventListener("submit",a=>{a.preventDefault();const s=document.getElementById("add-item-name"),i=document.getElementById("add-item-amount"),r=document.getElementById("add-item-unit"),u=document.getElementById("add-item-category"),y=s.value.trim();if(!y)return;const c=parseFloat(i.value)||0,o=r.value.trim(),b=u.value;D(y,c,o,b),f(),h()});const e=document.getElementById("shopping-list");e.addEventListener("change",a=>{const s=a.target.closest(".shopping-item-checkbox");if(!s)return;const i=s.dataset.id;if(s.checked){const r=P(i);r&&x({type:"check",item:r}),f(),h(),w()}else C(i),f(),h()}),e.addEventListener("click",a=>{const s=a.target.closest(".shopping-item-remove");if(!s)return;const i=s.dataset.id,r=q(i);r&&x({type:"remove",item:r.item,index:r.index}),f(),h(),w()}),e.addEventListener("change",a=>{const s=a.target.closest(".shopping-amount-input");if(!s)return;const i=s.dataset.id,r=parseFloat(s.value);!isNaN(r)&&r>=0&&U(i,r)}),e.addEventListener("change",a=>{const s=a.target.closest(".shopping-unit-input");if(!s)return;const i=s.dataset.id;V(i,s.value.trim())});const n=document.getElementById("clear-checked");n&&n.addEventListener("click",()=>{G(),f(),h()})}function ut(t){const e={};for(const n of t)e[n.category]||(e[n.category]=[]),e[n.category].push(n);return e}function l(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function O(){const t=window.location.hash||"#/";f();const e=t.match(/^#\/recipe\/(.+)$/);if(e){nt(decodeURIComponent(e[1]));return}if(t==="#/shopping"){h();return}Q()}window.addEventListener("hashchange",O);O();
