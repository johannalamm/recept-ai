import type { Recipe } from "../types";
import { searchRecipes, filterByTags, getAllTags } from "../utils/search";
import recipesData from "../data/recipes.json";

const recipes = recipesData as Recipe[];

let searchQuery = "";
let activeTags: string[] = [];
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

export function renderHome(): void {
  const main = document.getElementById("main")!;
  const allTags = getAllTags(recipes);

  main.innerHTML = `
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
          value="${escapeHtml(searchQuery)}"
          autocomplete="off"
        />
        <button class="search-clear ${searchQuery ? "visible" : ""}" id="search-clear" title="Rensa sökning">✕</button>
      </div>
    </div>

    <div class="tags-container" id="tags-container">
      ${allTags
        .map(
          (tag) => `
        <button class="tag-chip ${activeTags.includes(tag) ? "active" : ""}" data-tag="${escapeHtml(tag)}">
          ${escapeHtml(tag)}${activeTags.includes(tag) ? ' <span class="tag-x">✕</span>' : ""}
        </button>
      `
        )
        .join("")}
    </div>

    <div id="results-area"></div>
  `;

  renderResults();
  attachListeners();
}

function renderResults(): void {
  const area = document.getElementById("results-area")!;
  let filtered = searchRecipes(recipes, searchQuery);
  filtered = filterByTags(filtered, activeTags);

  if (filtered.length === 0) {
    area.innerHTML = `
      <div class="empty-state">
        <span class="empty-state-icon">🔍</span>
        <div class="empty-state-title">Inga recept hittades</div>
        <p class="empty-state-text">Prova en annan sökning eller rensa filtren</p>
      </div>
    `;
    return;
  }

  const infoText =
    searchQuery || activeTags.length > 0
      ? `<div class="results-info">${filtered.length} recept${filtered.length === 1 ? "" : ""} hittades</div>`
      : "";

  area.innerHTML = `
    ${infoText}
    <div class="recipes-grid">
      ${filtered.map(renderRecipeCard).join("")}
    </div>
  `;

  area.querySelectorAll<HTMLElement>(".recipe-card").forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.dataset.id!;
      window.location.hash = `#/recipe/${id}`;
    });
  });
}

function renderRecipeCard(recipe: Recipe): string {
  const tagPills = recipe.tags
    .slice(0, 3)
    .map((t) => `<span class="tag-pill">${escapeHtml(t)}</span>`)
    .join("");

  const imageHtml = recipe.image
    ? `<img class="recipe-card-image" src="${escapeHtml(recipe.image)}" alt="${escapeHtml(recipe.name)}" loading="lazy" />`
    : `<div class="recipe-card-image-placeholder">${getRecipeEmoji(recipe)}</div>`;

  return `
    <article class="recipe-card" data-id="${escapeHtml(recipe.id)}" role="button" tabindex="0">
      ${imageHtml}
      <div class="recipe-card-body">
        <div class="recipe-card-name">${escapeHtml(recipe.name)}</div>
        <p class="recipe-card-intro">${escapeHtml(recipe.intro)}</p>
        <div class="recipe-card-footer">
          <span class="recipe-card-servings">🍽️ ${recipe.servings} port.</span>
          <div class="recipe-card-tags">${tagPills}</div>
        </div>
      </div>
    </article>
  `;
}

function attachListeners(): void {
  const input = document.getElementById("search-input") as HTMLInputElement;
  const clearBtn = document.getElementById("search-clear") as HTMLButtonElement;

  input.addEventListener("input", () => {
    searchQuery = input.value;
    clearBtn.classList.toggle("visible", searchQuery.length > 0);
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      renderResults();
    }, 200);
  });

  clearBtn.addEventListener("click", () => {
    searchQuery = "";
    input.value = "";
    clearBtn.classList.remove("visible");
    input.focus();
    renderResults();
  });

  document.getElementById("tags-container")!.addEventListener("click", (e) => {
    const chip = (e.target as HTMLElement).closest<HTMLElement>(".tag-chip");
    if (!chip) return;
    const tag = chip.dataset.tag!;
    const idx = activeTags.indexOf(tag);
    if (idx === -1) {
      activeTags.push(tag);
    } else {
      activeTags.splice(idx, 1);
    }
    rerenderTagChips();
    renderResults();
  });

  // Keyboard support for recipe cards
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const el = document.activeElement as HTMLElement;
      if (el.classList.contains("recipe-card")) el.click();
    }
  });
}

function rerenderTagChips(): void {
  const allTags = getAllTags(recipes);
  const container = document.getElementById("tags-container")!;
  container.innerHTML = allTags
    .map(
      (tag) => `
      <button class="tag-chip ${activeTags.includes(tag) ? "active" : ""}" data-tag="${escapeHtml(tag)}">
        ${escapeHtml(tag)}${activeTags.includes(tag) ? ' <span class="tag-x">✕</span>' : ""}
      </button>
    `
    )
    .join("");
}

function getRecipeEmoji(recipe: Recipe): string {
  const tagMap: Record<string, string> = {
    pasta: "🍝",
    fisk: "🐟",
    frukost: "🌅",
    veganskt: "🌱",
    vegetariskt: "🥦",
    gryta: "🍲",
    middag: "🍽️",
    fika: "☕",
    barn: "👶",
  };
  for (const tag of recipe.tags) {
    if (tagMap[tag]) return tagMap[tag];
  }
  return "🍳";
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
