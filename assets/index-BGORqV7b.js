(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();const T="recept-ai:shopping",O=20;function M(){return Math.random().toString(36).slice(2)+Date.now().toString(36)}function u(){try{const e=localStorage.getItem(T);return e?JSON.parse(e):[]}catch{return[]}}function g(e){localStorage.setItem(T,JSON.stringify(e))}function A(e,t){const n=u();for(const a of t){const s=a.name.toLowerCase(),i=n.find(r=>r.name.toLowerCase()===s&&r.unit===a.unit);i?(i.amount=I(i.amount+a.amount),i.recipeIds.includes(e.id)||i.recipeIds.push(e.id)):n.push({id:M(),name:a.name,amount:a.amount,unit:a.unit,category:a.category,checked:!1,recipeIds:[e.id]})}g(n)}function P(e){const t=u(),n=t.find(a=>a.id===e);return n?(n.checked=!0,g(t),{...n}):null}function C(e){const t=u(),n=t.find(a=>a.id===e);n&&(n.checked=!1,g(t))}function q(e){const t=u(),n=t.findIndex(s=>s.id===e);if(n===-1)return null;const[a]=t.splice(n,1);return g(t),{item:a,index:n}}function V(e,t){const n=u();n.splice(Math.min(t,n.length),0,e),g(n)}function U(e,t){const n=u(),a=n.find(s=>s.id===e);a&&(a.amount=I(t),g(n))}function D(e,t){const n=u(),a=n.find(s=>s.id===e);a&&(a.unit=t,g(n))}function F(e,t,n,a){const s=u(),i=e.toLowerCase(),r=s.find(m=>m.name.toLowerCase()===i&&m.unit===n);r?r.amount=I(r.amount+t):s.push({id:M(),name:e,amount:t,unit:n,category:a,checked:!1,recipeIds:[]}),g(s)}function K(){const e=u().filter(t=>!t.checked);g(e)}let j=[];function w(e){j.push(e),j.length>O&&j.shift()}function _(){return j.pop()}function W(){return j.length}function I(e){return Math.round(e*100)/100}function v(){const e=document.getElementById("nav"),t=window.location.hash||"#/",a=u().filter(s=>!s.checked).length;e.innerHTML=`
    <div class="nav-inner">
      <div class="nav-logo" data-href="#/">
        <span>🍳</span> Receptboken
      </div>
      <div class="nav-links">
        <button class="nav-link ${t==="#/"||t===""?"active":""}" data-href="#/">
          <span class="nav-icon">🏠</span><span class="nav-label"> Recept</span>
        </button>
        <button class="nav-link ${t.startsWith("#/shopping")?"active":""}" data-href="#/shopping">
          <span class="nav-icon">🛒</span><span class="nav-label"> Inköpslista</span>
          ${a>0?`<span class="nav-badge">${a}</span>`:""}
        </button>
      </div>
    </div>
  `,e.querySelectorAll("[data-href]").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.href;window.location.hash=i})})}function Y(e,t){const n=t.trim().toLowerCase();return n?e.filter(a=>!!(a.name.toLowerCase().includes(n)||a.tags.some(s=>s.toLowerCase().includes(n))||a.ingredients.some(s=>s.name.toLowerCase().includes(n)))):e}function z(e,t){return t.length===0?e:e.filter(n=>t.every(a=>n.tags.includes(a)))}function H(e){const t=new Set;return e.forEach(n=>n.tags.forEach(a=>t.add(a))),Array.from(t).sort()}const R=[{id:"tikka-masala-pa-bonor",name:"Tikka masala på bönor",intro:"Serveras med ris eller liknande. Tillbehör: creme fraiche, cashewnötter, lime.",tags:["middag","indiskt","vegetariskt"],servings:2,ingredients:[{name:"Gul lök",amount:1,unit:"st",category:"frukt & grönt"},{name:"Vitlök",amount:2,unit:"klyftor",category:"frukt & grönt"},{name:"Morot",amount:1,unit:"st",category:"frukt & grönt"},{name:"Ingefära",amount:.5,unit:"cm",category:"frukt & grönt"},{name:"Krossade tomater",amount:1,unit:"burk",category:"skafferi"},{name:"Kokosmjölk",amount:2.5,unit:"dl",category:"skafferi"},{name:"Grönsaksbuljong",amount:1,unit:"tärning",category:"kryddor & smaksättare"},{name:"Garam Masala",amount:3,unit:"tsk",category:"kryddor & smaksättare"},{name:"Svarta bönor",amount:400,unit:"g",category:"skafferi"}],steps:["Riv morot.","Hacka gul lök.","Pressa vitlök.","Fräs allting i lite olja på låg värme.","Riv ingefära och lägg i pannan.","Häll i krossade tomater, koksmjölk, lite vatten och grönsaksbuljong.","Låt såsen puttra på låg värme i 10 minuter.","Mixa med stavmixer.","Häll i svarta bönor och garam masala."]},{id:"pajdeg",name:"Pajdeg - grundrecept",intro:"Grundrecept till t.ex. spenatpaj & västerbottenpaj.",tags:["middag","paj"],servings:4,ingredients:[{name:"Vetemjöl",amount:3,unit:"dl",category:"skafferi"},{name:"Smör",amount:125,unit:"g",category:"kött & mejeri"}],steps:["Skär smör i små bitar.","Nyp ihop mjöl och smör.","Tillsätt en matsked kallt vatten.","Tryck ut degen i en pajform. Nagga med gaffel. Låt vila i kylen i 30 minuter.","Sätt ugnen på 225°C","Förgrädda pajskalet mitt i ugnen i ca 10 minuter."]},{id:"spenatpaj",name:"Spenatpaj med ädelost",intro:"Går att göra vegetarisk (bara att skippa skinkan).",tags:["middag","paj"],servings:4,ingredients:[{name:"Fryst bladspenat",amount:250,unit:"g",category:"frys"},{name:"Purjolök",amount:1,unit:"st",category:"frukt & grönt"},{name:"Vitlök",amount:1,unit:"klyftor",category:"frukt & grönt"},{name:"Ädelost",amount:150,unit:"g",category:"kött & mejeri"},{name:"Basturökt skinka",amount:120,unit:"g",category:"kött & mejeri"},{name:"Ägg",amount:3,unit:"st",category:"kött & mejeri"},{name:"Mjölk",amount:3,unit:"dl",category:"kött & mejeri"},{name:"Cayennepeppar",amount:.5,unit:"tsk",category:"kryddor & smaksättare"}],steps:["Gör en pajdeg (följ pajdeg - grundrecept).","Sätt ugnen på 175°C","Stek spenaten på låg värme.","Pressa vitlök och rör i.","Hacka purjolök och ha i.","Hacka skinka och bryt ädelosten.","Blanda ner allting över pajdegen.","Vispa ägg, mjölk, salt och canyennepeppar. Häll över pajdegen.","Grädda mitt i ugnen i 35 minuter."]},{id:"vasterbottenpaj",name:"Västerbottenpaj",intro:"Servera med tångkaviar, finhackad rödlök och gräddfil.",tags:["middag","paj","högtid","vegetarisk"],servings:2,ingredients:[{name:"Purjolök",amount:1,unit:"st",category:"frukt & grönt"},{name:"Västerbottenost",amount:400,unit:"g",category:"kött & mejeri"},{name:"Ägg",amount:3,unit:"st",category:"kött & mejeri"},{name:"Matgrädde",amount:3,unit:"dl",category:"kött & mejeri"}],steps:["Gör en pajdeg (följ pajdeg - grundrecept).","Sätt ugnen på 200°C","Hacka purjolök och lägg över pajdegen.","Riv västerbottenosten och lägg ovanpå pajdegen.","Vispa ägg och matlagningsgrädde. Häll över pajdegen.","Grädda lågt i ugnen i 35 minuter."]},{id:"sockerkaka",name:"Sockerkaka",intro:"Går att byta ut smör mot margarin eller rapsolja samt mjölk mot veganska alternativ.",tags:["bakverk"],servings:4,ingredients:[{name:"Ägg",amount:2,unit:"st",category:"kött & mejeri"},{name:"Socker",amount:2,unit:"dl",category:"skafferi"},{name:"Smör",amount:75,unit:"g",category:"kött & mejeri"},{name:"Mjölk",amount:1,unit:"dl",category:"kött & mejeri"},{name:"Vetemjöl",amount:2,unit:"dl",category:"skafferi"},{name:"Vaniljsocker",amount:2,unit:"tsk",category:"skafferi"},{name:"Bakpulver",amount:1,unit:"tsk",category:"skafferi"}],steps:["Sätt ugnen på 175°C","Vispa ägg och socker poröst.","Smält smör och värm upp tillsammans med mjölk.","Blanda mjöl, vaniljsocker och bakpulver.","Rör ihop allting","Grädda lågt i ugnen i 25 minuter.","Häll ett tunnt lager socker på toppen."]}],S=R;let k="",p=[],L=null;function J(){const e=document.getElementById("main"),t=H(S);e.innerHTML=`
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
          value="${l(k)}"
          autocomplete="off"
        />
        <button class="search-clear ${k?"visible":""}" id="search-clear" title="Rensa sökning">✕</button>
      </div>
    </div>

    <div class="tags-container" id="tags-container">
      ${t.map(n=>`
        <button class="tag-chip ${p.includes(n)?"active":""}" data-tag="${l(n)}">
          ${l(n)}${p.includes(n)?' <span class="tag-x">✕</span>':""}
        </button>
      `).join("")}
    </div>

    <div id="results-area"></div>
  `,E(),X()}function E(){const e=document.getElementById("results-area");let t=Y(S,k);if(t=z(t,p),t.length===0){e.innerHTML=`
      <div class="empty-state">
        <span class="empty-state-icon">🔍</span>
        <div class="empty-state-title">Inga recept hittades</div>
        <p class="empty-state-text">Prova en annan sökning eller rensa filtren</p>
      </div>
    `;return}const n=k||p.length>0?`<div class="results-info">${t.length} recept${t.length===1,""} hittades</div>`:"";e.innerHTML=`
    ${n}
    <div class="recipes-grid">
      ${t.map(Q).join("")}
    </div>
  `,e.querySelectorAll(".recipe-card").forEach(a=>{a.addEventListener("click",()=>{const s=a.dataset.id;window.location.hash=`#/recipe/${s}`})})}function Q(e){const t=e.tags.slice(0,3).map(a=>`<span class="tag-pill">${l(a)}</span>`).join(""),n=e.image?`<img class="recipe-card-image" src="${l(e.image)}" alt="${l(e.name)}" loading="lazy" />`:`<div class="recipe-card-image-placeholder">${ee(e)}</div>`;return`
    <article class="recipe-card" data-id="${l(e.id)}" role="button" tabindex="0">
      ${n}
      <div class="recipe-card-body">
        <div class="recipe-card-name">${l(e.name)}</div>
        <p class="recipe-card-intro">${l(e.intro)}</p>
        <div class="recipe-card-footer">
          <span class="recipe-card-servings">🍽️ ${e.servings} port.</span>
          <div class="recipe-card-tags">${t}</div>
        </div>
      </div>
    </article>
  `}function X(){const e=document.getElementById("search-input"),t=document.getElementById("search-clear");e.addEventListener("input",()=>{k=e.value,t.classList.toggle("visible",k.length>0),L&&clearTimeout(L),L=setTimeout(()=>{E()},200)}),t.addEventListener("click",()=>{k="",e.value="",t.classList.remove("visible"),e.focus(),E()}),document.getElementById("tags-container").addEventListener("click",n=>{const a=n.target.closest(".tag-chip");if(!a)return;const s=a.dataset.tag,i=p.indexOf(s);i===-1?p.push(s):p.splice(i,1),Z(),E()}),document.addEventListener("keydown",n=>{if(n.key==="Enter"){const a=document.activeElement;a.classList.contains("recipe-card")&&a.click()}})}function Z(){const e=H(S),t=document.getElementById("tags-container");t.innerHTML=e.map(n=>`
      <button class="tag-chip ${p.includes(n)?"active":""}" data-tag="${l(n)}">
        ${l(n)}${p.includes(n)?' <span class="tag-x">✕</span>':""}
      </button>
    `).join("")}function ee(e){const t={pasta:"🍝",fisk:"🐟",frukost:"🌅",veganskt:"🌱",vegetariskt:"🥦",gryta:"🍲",middag:"🍽️",fika:"☕",barn:"👶"};for(const n of e.tags)if(t[n])return t[n];return"🍳"}function l(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const te=R;function ne(e){const t=document.getElementById("main"),n=te.find(m=>m.id===e);if(!n){t.innerHTML=`
      <button class="back-btn" id="back-btn">← Tillbaka</button>
      <div class="empty-state">
        <span class="empty-state-icon">😕</span>
        <div class="empty-state-title">Receptet hittades inte</div>
        <p class="empty-state-text">Det verkar som att detta recept inte finns.</p>
      </div>
    `,document.getElementById("back-btn").addEventListener("click",()=>{window.history.back()});return}let a=n.servings;const s=new Set;function i(){const m=n.image?`<img class="recipe-detail-image" src="${f(n.image)}" alt="${f(n.name)}" />`:`<div class="recipe-detail-image-placeholder">${re(n)}</div>`,y=n.tags.map(o=>`<span class="tag-pill">${f(o)}</span>`).join(""),c=n.ingredients.map(o=>({...o,amount:se(o.amount,n.servings,a)}));t.innerHTML=`
      <button class="back-btn" id="back-btn">← Alla recept</button>

      <div class="recipe-detail-header">
        <h1 class="recipe-detail-title">${f(n.name)}</h1>
        <div class="recipe-detail-meta">
          <span class="recipe-meta-item">🍽️ ${n.servings} port. (standard)</span>
          <span class="recipe-meta-item">📋 ${n.steps.length} steg</span>
          <span class="recipe-meta-item">🥕 ${n.ingredients.length} ingredienser</span>
        </div>
        <div class="recipe-detail-tags">${y}</div>
      </div>

      ${m}

      <p class="recipe-detail-intro">${f(n.intro)}</p>

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
              ${c.map(ae).join("")}
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
                <span class="step-text">${f(o)}</span>
              </li>
            `).join("")}
          </ol>
        </section>
      </div>
    `,r(c)}function r(m){document.getElementById("back-btn").addEventListener("click",()=>{window.location.hash="#/"}),document.getElementById("servings-minus").addEventListener("click",()=>{a>1&&(a--,i())}),document.getElementById("servings-plus").addEventListener("click",()=>{a++,i()}),document.getElementById("add-to-shopping").addEventListener("click",()=>{A(n,m),oe(`"${n.name}" lades till i inköpslistan!`),v()}),document.querySelector(".steps-list").addEventListener("click",y=>{const c=y.target.closest(".step-item");if(!c)return;const o=Number(c.dataset.step);s.has(o)?(s.delete(o),c.classList.remove("step-done"),c.querySelector(".step-number").textContent=String(o+1)):(s.add(o),c.classList.add("step-done"),c.querySelector(".step-number").textContent="✓")})}i()}function ae(e){const t=ie(e.amount);return`
    <div class="ingredient-item">
      <span class="ingredient-name">${f(e.name)}</span>
      <span class="ingredient-amount">${t} ${f(e.unit)}</span>
    </div>
  `}function se(e,t,n){const a=e/t*n,s=Math.pow(10,Math.floor(Math.log10(a||1)));return Math.round(a/s*20)/20*s}function ie(e){if(Number.isInteger(e))return String(e);const t=[[.25,"¼"],[.5,"½"],[.75,"¾"],[.333,"⅓"],[.667,"⅔"]],n=e%1,a=Math.floor(e);for(const[s,i]of t)if(Math.abs(n-s)<.04)return a>0?`${a} ${i}`:i;return e.toFixed(1).replace(/\.0$/,"")}function re(e){const t={pasta:"🍝",fisk:"🐟",frukost:"🌅",veganskt:"🌱",vegetariskt:"🥦",gryta:"🍲",middag:"🍽️",fika:"☕",barn:"👶"};for(const n of e.tags)if(t[n])return t[n];return"🍳"}function oe(e){let t=document.querySelector(".toast");t||(t=document.createElement("div"),t.className="toast",document.body.appendChild(t)),t.textContent=e,t.classList.add("show"),setTimeout(()=>t.classList.remove("show"),3e3)}function f(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const x=["frukt & grönt","bröd","kött & mejeri","frys","skafferi","kryddor & smaksättare","barn","hygien"],N={"frukt & grönt":"🥦",bröd:"🍞","kött & mejeri":"🥩",frys:"❄️",skafferi:"🥫","kryddor & smaksättare":"🧂",barn:"👶",hygien:"🧼"};function h(){const e=document.getElementById("main"),t=u(),n=t.filter(r=>!r.checked),a=t.filter(r=>r.checked),s=me(n),i=t.length===0?`<div class="shopping-empty empty-state">
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
        ${x.filter(r=>s[r]&&s[r].length>0).map(r=>ce(r,s[r])).join("")}
      </div>`;e.innerHTML=`
    <div class="page-header">
      <h1 class="page-title">Inköpslista</h1>
      ${t.length>0?`<p class="page-subtitle">${n.length} av ${t.length} kvar att handla</p>`:""}
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
            ${x.map(r=>`<option value="${d(r)}">${N[r]} ${d(r)}</option>`).join("")}
          </select>
          <button type="submit" class="btn btn-primary add-item-submit">Lägg till</button>
        </div>
      </form>
    </div>

    ${i}
  `,ue(),le()}function ce(e,t){return`
    <div class="shopping-category" data-category="${d(e)}">
      <div class="shopping-category-header">
        <span class="shopping-category-icon">${N[e]}</span>
        <span class="shopping-category-name">${d(e)}</span>
        <span class="shopping-category-count">${t.length} st</span>
      </div>
      ${t.map(de).join("")}
    </div>
  `}function de(e){return`
    <div class="shopping-item" data-item-id="${d(e.id)}">
      <input
        type="checkbox"
        class="shopping-item-checkbox"
        data-id="${d(e.id)}"
        ${e.checked?"checked":""}
        title="Kryssa av"
      />
      <span class="shopping-item-name">${d(e.name)}</span>
      <div class="shopping-item-amount">
        <input
          type="number"
          class="shopping-amount-input"
          data-id="${d(e.id)}"
          value="${e.amount}"
          min="0"
          step="0.5"
          title="Ändra mängd"
        />
        <input
          type="text"
          class="shopping-unit-input"
          data-id="${d(e.id)}"
          value="${d(e.unit)}"
          title="Ändra enhet"
        />
      </div>
      <button class="shopping-item-remove" data-id="${d(e.id)}" title="Ta bort">✕</button>
    </div>
  `}let $=null;function B(){const e=document.getElementById("undo-bar");if(e&&e.remove(),$&&clearTimeout($),W()===0)return;const t=document.createElement("div");t.id="undo-bar",t.className="undo-bar",t.innerHTML=`
    <span>Ångra senaste åtgärd</span>
    <button class="undo-bar-btn" id="undo-btn">↩ Ångra</button>
  `,document.body.appendChild(t),document.getElementById("undo-btn").addEventListener("click",()=>{const n=_();$&&clearTimeout($),t.remove(),n&&(n.type==="check"?C(n.item.id):n.type==="remove"&&V(n.item,n.index),v(),h())}),$=setTimeout(()=>t.remove(),5e3)}function le(){const e=document.getElementById("undo-bar");e&&e.remove()}function ue(){document.getElementById("add-item-form").addEventListener("submit",a=>{a.preventDefault();const s=document.getElementById("add-item-name"),i=document.getElementById("add-item-amount"),r=document.getElementById("add-item-unit"),m=document.getElementById("add-item-category"),y=s.value.trim();if(!y)return;const c=parseFloat(i.value)||0,o=r.value.trim(),b=m.value;F(y,c,o,b),v(),h()});const t=document.getElementById("shopping-list");t.addEventListener("change",a=>{const s=a.target.closest(".shopping-item-checkbox");if(!s)return;const i=s.dataset.id;if(s.checked){const r=P(i);r&&w({type:"check",item:r}),v(),h(),B()}else C(i),v(),h()}),t.addEventListener("click",a=>{const s=a.target.closest(".shopping-item-remove");if(!s)return;const i=s.dataset.id,r=q(i);r&&w({type:"remove",item:r.item,index:r.index}),v(),h(),B()}),t.addEventListener("change",a=>{const s=a.target.closest(".shopping-amount-input");if(!s)return;const i=s.dataset.id,r=parseFloat(s.value);!isNaN(r)&&r>=0&&U(i,r)}),t.addEventListener("change",a=>{const s=a.target.closest(".shopping-unit-input");if(!s)return;const i=s.dataset.id;D(i,s.value.trim())});const n=document.getElementById("clear-checked");n&&n.addEventListener("click",()=>{K(),v(),h()})}function me(e){const t={};for(const n of e)t[n.category]||(t[n.category]=[]),t[n.category].push(n);return t}function d(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function G(){const e=window.location.hash||"#/";v();const t=e.match(/^#\/recipe\/(.+)$/);if(t){ne(decodeURIComponent(t[1]));return}if(e==="#/shopping"){h();return}J()}window.addEventListener("hashchange",G);G();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js")});
