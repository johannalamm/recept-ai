(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const M="recept-ai:shopping",N=20;function C(){return Math.random().toString(36).slice(2)+Date.now().toString(36)}function u(){try{const e=localStorage.getItem(M);return e?JSON.parse(e):[]}catch{return[]}}function g(e){localStorage.setItem(M,JSON.stringify(e))}function q(e,t){const n=u();for(const s of t){const a=s.name.toLowerCase(),i=n.find(r=>r.name.toLowerCase()===a&&r.unit===s.unit);i?(i.amount=w(i.amount+s.amount),i.recipeIds.includes(e.id)||i.recipeIds.push(e.id)):n.push({id:C(),name:s.name,amount:s.amount,unit:s.unit,category:s.category,checked:!1,recipeIds:[e.id]})}g(n)}function P(e){const t=u(),n=t.find(s=>s.id===e);return n?(n.checked=!0,g(t),{...n}):null}function j(e){const t=u(),n=t.find(s=>s.id===e);n&&(n.checked=!1,g(t))}function U(e){const t=u(),n=t.findIndex(a=>a.id===e);if(n===-1)return null;const[s]=t.splice(n,1);return g(t),{item:s,index:n}}function D(e,t){const n=u();n.splice(Math.min(t,n.length),0,e),g(n)}function G(e,t){const n=u(),s=n.find(a=>a.id===e);s&&(s.amount=w(t),g(n))}function F(e,t){const n=u(),s=n.find(a=>a.id===e);s&&(s.unit=t,g(n))}function K(e,t,n,s){const a=u(),i=e.toLowerCase(),r=a.find(p=>p.name.toLowerCase()===i&&p.unit===n);r?r.amount=w(r.amount+t):a.push({id:C(),name:e,amount:t,unit:n,category:s,checked:!1,recipeIds:[]}),g(a)}function _(){const e=u().filter(t=>!t.checked);g(e)}let E=[];function S(e){E.push(e),E.length>N&&E.shift()}function W(){return E.pop()}function Y(){return E.length}function w(e){return Math.round(e*100)/100}function v(){const e=document.getElementById("nav"),t=window.location.hash||"#/",s=u().filter(a=>!a.checked).length;e.innerHTML=`
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
          ${s>0?`<span class="nav-badge">${s}</span>`:""}
        </button>
      </div>
    </div>
  `,e.querySelectorAll("[data-href]").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.href;window.location.hash=i})})}function z(e,t){const n=t.trim().toLowerCase();return n?e.filter(s=>!!(s.name.toLowerCase().includes(n)||s.tags.some(a=>a.toLowerCase().includes(n))||s.ingredients.some(a=>a.name.toLowerCase().includes(n)))):e}function J(e,t){return t.length===0?e:e.filter(n=>t.every(s=>n.tags.includes(s)))}function H(e){const t=new Set;return e.forEach(n=>n.tags.forEach(s=>t.add(s))),Array.from(t).sort()}const R=[{id:"tikka-masala-pa-bonor",name:"Tikka masala på bönor",intro:"Serveras med ris eller liknande. Tillbehör: creme fraiche, cashewnötter, lime.",tags:["middag","indiskt","vegetariskt"],servings:2,ingredients:[{name:"Gul lök",amount:1,unit:"st",category:"frukt & grönt"},{name:"Vitlök",amount:2,unit:"klyftor",category:"frukt & grönt"},{name:"Morot",amount:1,unit:"st",category:"frukt & grönt"},{name:"Ingefära",amount:.5,unit:"cm",category:"frukt & grönt"},{name:"Krossade tomater",amount:1,unit:"burk",category:"skafferi"},{name:"Kokosmjölk",amount:2.5,unit:"dl",category:"skafferi"},{name:"Grönsaksbuljong",amount:1,unit:"tärning",category:"kryddor & smaksättare"},{name:"Garam Masala",amount:3,unit:"tsk",category:"kryddor & smaksättare"},{name:"Svarta bönor",amount:400,unit:"g",category:"skafferi"}],steps:["Riv morot.","Hacka den gul lök.","Pressa vitlök.","Fräs allting i lite olja på låg värme.","Riv ingefära och lägg i pannan.","Häll i krossade tomater, koksmjölk, lite vatten och grönsaksbuljong.","Låt såsen puttra på låg värme i 10 minuter.","Mixa med stavmixer.","Häll i svarta bönor och garam masala."]}],x=R;let y="",m=[],I=null;function V(){const e=document.getElementById("main"),t=H(x);e.innerHTML=`
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
          value="${l(y)}"
          autocomplete="off"
        />
        <button class="search-clear ${y?"visible":""}" id="search-clear" title="Rensa sökning">✕</button>
      </div>
    </div>

    <div class="tags-container" id="tags-container">
      ${t.map(n=>`
        <button class="tag-chip ${m.includes(n)?"active":""}" data-tag="${l(n)}">
          ${l(n)}${m.includes(n)?' <span class="tag-x">✕</span>':""}
        </button>
      `).join("")}
    </div>

    <div id="results-area"></div>
  `,L(),X()}function L(){const e=document.getElementById("results-area");let t=z(x,y);if(t=J(t,m),t.length===0){e.innerHTML=`
      <div class="empty-state">
        <span class="empty-state-icon">🔍</span>
        <div class="empty-state-title">Inga recept hittades</div>
        <p class="empty-state-text">Prova en annan sökning eller rensa filtren</p>
      </div>
    `;return}const n=y||m.length>0?`<div class="results-info">${t.length} recept${t.length===1,""} hittades</div>`:"";e.innerHTML=`
    ${n}
    <div class="recipes-grid">
      ${t.map(Q).join("")}
    </div>
  `,e.querySelectorAll(".recipe-card").forEach(s=>{s.addEventListener("click",()=>{const a=s.dataset.id;window.location.hash=`#/recipe/${a}`})})}function Q(e){const t=e.tags.slice(0,3).map(s=>`<span class="tag-pill">${l(s)}</span>`).join(""),n=e.image?`<img class="recipe-card-image" src="${l(e.image)}" alt="${l(e.name)}" loading="lazy" />`:`<div class="recipe-card-image-placeholder">${ee(e)}</div>`;return`
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
  `}function X(){const e=document.getElementById("search-input"),t=document.getElementById("search-clear");e.addEventListener("input",()=>{y=e.value,t.classList.toggle("visible",y.length>0),I&&clearTimeout(I),I=setTimeout(()=>{L()},200)}),t.addEventListener("click",()=>{y="",e.value="",t.classList.remove("visible"),e.focus(),L()}),document.getElementById("tags-container").addEventListener("click",n=>{const s=n.target.closest(".tag-chip");if(!s)return;const a=s.dataset.tag,i=m.indexOf(a);i===-1?m.push(a):m.splice(i,1),Z(),L()}),document.addEventListener("keydown",n=>{if(n.key==="Enter"){const s=document.activeElement;s.classList.contains("recipe-card")&&s.click()}})}function Z(){const e=H(x),t=document.getElementById("tags-container");t.innerHTML=e.map(n=>`
      <button class="tag-chip ${m.includes(n)?"active":""}" data-tag="${l(n)}">
        ${l(n)}${m.includes(n)?' <span class="tag-x">✕</span>':""}
      </button>
    `).join("")}function ee(e){const t={pasta:"🍝",fisk:"🐟",frukost:"🌅",veganskt:"🌱",vegetariskt:"🥦",gryta:"🍲",middag:"🍽️",fika:"☕",barn:"👶"};for(const n of e.tags)if(t[n])return t[n];return"🍳"}function l(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const te=R;function ne(e){const t=document.getElementById("main"),n=te.find(p=>p.id===e);if(!n){t.innerHTML=`
      <button class="back-btn" id="back-btn">← Tillbaka</button>
      <div class="empty-state">
        <span class="empty-state-icon">😕</span>
        <div class="empty-state-title">Receptet hittades inte</div>
        <p class="empty-state-text">Det verkar som att detta recept inte finns.</p>
      </div>
    `,document.getElementById("back-btn").addEventListener("click",()=>{window.history.back()});return}let s=n.servings;const a=new Set;function i(){const p=n.image?`<img class="recipe-detail-image" src="${f(n.image)}" alt="${f(n.name)}" />`:`<div class="recipe-detail-image-placeholder">${re(n)}</div>`,k=n.tags.map(c=>`<span class="tag-pill">${f(c)}</span>`).join(""),o=n.ingredients.map(c=>({...c,amount:ae(c.amount,n.servings,s)}));t.innerHTML=`
      <button class="back-btn" id="back-btn">← Alla recept</button>

      <div class="recipe-detail-header">
        <h1 class="recipe-detail-title">${f(n.name)}</h1>
        <div class="recipe-detail-meta">
          <span class="recipe-meta-item">🍽️ ${n.servings} port. (standard)</span>
          <span class="recipe-meta-item">📋 ${n.steps.length} steg</span>
          <span class="recipe-meta-item">🥕 ${n.ingredients.length} ingredienser</span>
        </div>
        <div class="recipe-detail-tags">${k}</div>
      </div>

      ${p}

      <p class="recipe-detail-intro">${f(n.intro)}</p>

      <div class="recipe-layout">
        <aside>
          <div class="servings-card">
            <div class="servings-label">Portioner</div>
            <div class="servings-control">
              <button class="servings-btn" id="servings-minus" ${s<=1?"disabled":""}>−</button>
              <span class="servings-count" id="servings-count">${s}</span>
              <button class="servings-btn" id="servings-plus">+</button>
            </div>
            <div class="ingredients-list">
              ${o.map(se).join("")}
            </div>
            <button class="btn btn-primary add-to-shopping-btn" id="add-to-shopping">
              🛒 Lägg till i inköpslistan
            </button>
          </div>
        </aside>

        <section>
          <h2 class="section-title">Gör så här</h2>
          <ol class="steps-list">
            ${n.steps.map((c,b)=>`
              <li class="step-item ${a.has(b)?"step-done":""}" data-step="${b}">
                <span class="step-number">${a.has(b)?"✓":b+1}</span>
                <span class="step-text">${f(c)}</span>
              </li>
            `).join("")}
          </ol>
        </section>
      </div>
    `,r(o)}function r(p){document.getElementById("back-btn").addEventListener("click",()=>{window.location.hash="#/"}),document.getElementById("servings-minus").addEventListener("click",()=>{s>1&&(s--,i())}),document.getElementById("servings-plus").addEventListener("click",()=>{s++,i()}),document.getElementById("add-to-shopping").addEventListener("click",()=>{q(n,p),ce(`"${n.name}" lades till i inköpslistan!`),v()}),document.querySelector(".steps-list").addEventListener("click",k=>{const o=k.target.closest(".step-item");if(!o)return;const c=Number(o.dataset.step);a.has(c)?(a.delete(c),o.classList.remove("step-done"),o.querySelector(".step-number").textContent=String(c+1)):(a.add(c),o.classList.add("step-done"),o.querySelector(".step-number").textContent="✓")})}i()}function se(e){const t=ie(e.amount);return`
    <div class="ingredient-item">
      <span class="ingredient-name">${f(e.name)}</span>
      <span class="ingredient-amount">${t} ${f(e.unit)}</span>
    </div>
  `}function ae(e,t,n){const s=e/t*n,a=Math.pow(10,Math.floor(Math.log10(s||1)));return Math.round(s/a*20)/20*a}function ie(e){if(Number.isInteger(e))return String(e);const t=[[.25,"¼"],[.5,"½"],[.75,"¾"],[.333,"⅓"],[.667,"⅔"]],n=e%1,s=Math.floor(e);for(const[a,i]of t)if(Math.abs(n-a)<.04)return s>0?`${s} ${i}`:i;return e.toFixed(1).replace(/\.0$/,"")}function re(e){const t={pasta:"🍝",fisk:"🐟",frukost:"🌅",veganskt:"🌱",vegetariskt:"🥦",gryta:"🍲",middag:"🍽️",fika:"☕",barn:"👶"};for(const n of e.tags)if(t[n])return t[n];return"🍳"}function ce(e){let t=document.querySelector(".toast");t||(t=document.createElement("div"),t.className="toast",document.body.appendChild(t)),t.textContent=e,t.classList.add("show"),setTimeout(()=>t.classList.remove("show"),3e3)}function f(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const T=["frukt & grönt","bröd","kött & mejeri","frys","skafferi","kryddor & smaksättare","barn","hygien"],O={"frukt & grönt":"🥦",bröd:"🍞","kött & mejeri":"🥩",frys:"❄️",skafferi:"🥫","kryddor & smaksättare":"🧂",barn:"👶",hygien:"🧼"};function h(){const e=document.getElementById("main"),t=u(),n=t.filter(r=>!r.checked),s=t.filter(r=>r.checked),a=pe(n),i=t.length===0?`<div class="shopping-empty empty-state">
        <span class="empty-state-icon">🛒</span>
        <div class="empty-state-title">Din inköpslista är tom</div>
        <p class="empty-state-text">Lägg till ingredienser från ett recept eller via formuläret ovan.</p>
      </div>`:`<div class="shopping-toolbar">
        <span style="color: var(--color-text-muted); font-size: 0.875rem;">
          ${s.length>0?`${s.length} avkryssade`:"Inga avkryssade ännu"}
        </span>
        <div class="shopping-toolbar-actions">
          ${s.length>0?'<button class="btn btn-secondary" id="clear-checked">🗑️ Rensa avkryssade</button>':""}
        </div>
      </div>
      <div id="shopping-list">
        ${T.filter(r=>a[r]&&a[r].length>0).map(r=>oe(r,a[r])).join("")}
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
            ${T.map(r=>`<option value="${d(r)}">${O[r]} ${d(r)}</option>`).join("")}
          </select>
          <button type="submit" class="btn btn-primary add-item-submit">Lägg till</button>
        </div>
      </form>
    </div>

    ${i}
  `,ue(),le()}function oe(e,t){return`
    <div class="shopping-category" data-category="${d(e)}">
      <div class="shopping-category-header">
        <span class="shopping-category-icon">${O[e]}</span>
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
  `}let $=null;function B(){const e=document.getElementById("undo-bar");if(e&&e.remove(),$&&clearTimeout($),Y()===0)return;const t=document.createElement("div");t.id="undo-bar",t.className="undo-bar",t.innerHTML=`
    <span>Ångra senaste åtgärd</span>
    <button class="undo-bar-btn" id="undo-btn">↩ Ångra</button>
  `,document.body.appendChild(t),document.getElementById("undo-btn").addEventListener("click",()=>{const n=W();$&&clearTimeout($),t.remove(),n&&(n.type==="check"?j(n.item.id):n.type==="remove"&&D(n.item,n.index),v(),h())}),$=setTimeout(()=>t.remove(),5e3)}function le(){const e=document.getElementById("undo-bar");e&&e.remove()}function ue(){document.getElementById("add-item-form").addEventListener("submit",s=>{s.preventDefault();const a=document.getElementById("add-item-name"),i=document.getElementById("add-item-amount"),r=document.getElementById("add-item-unit"),p=document.getElementById("add-item-category"),k=a.value.trim();if(!k)return;const o=parseFloat(i.value)||0,c=r.value.trim(),b=p.value;K(k,o,c,b),v(),h()});const t=document.getElementById("shopping-list");t.addEventListener("change",s=>{const a=s.target.closest(".shopping-item-checkbox");if(!a)return;const i=a.dataset.id;if(a.checked){const r=P(i);r&&S({type:"check",item:r}),v(),h(),B()}else j(i),v(),h()}),t.addEventListener("click",s=>{const a=s.target.closest(".shopping-item-remove");if(!a)return;const i=a.dataset.id,r=U(i);r&&S({type:"remove",item:r.item,index:r.index}),v(),h(),B()}),t.addEventListener("change",s=>{const a=s.target.closest(".shopping-amount-input");if(!a)return;const i=a.dataset.id,r=parseFloat(a.value);!isNaN(r)&&r>=0&&G(i,r)}),t.addEventListener("change",s=>{const a=s.target.closest(".shopping-unit-input");if(!a)return;const i=a.dataset.id;F(i,a.value.trim())});const n=document.getElementById("clear-checked");n&&n.addEventListener("click",()=>{_(),v(),h()})}function pe(e){const t={};for(const n of e)t[n.category]||(t[n.category]=[]),t[n.category].push(n);return t}function d(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function A(){const e=window.location.hash||"#/";v();const t=e.match(/^#\/recipe\/(.+)$/);if(t){ne(decodeURIComponent(t[1]));return}if(e==="#/shopping"){h();return}V()}window.addEventListener("hashchange",A);A();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js")});
