import type { Recipe, Ingredient } from "../types";
import recipesData from "../data/recipes.json";
import { addRecipeToShoppingList } from "../utils/shoppingList";
import { renderNav } from "../components/nav";

const recipes = recipesData as Recipe[];

export function renderRecipe(id: string): void {
  const main = document.getElementById("main")!;
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    main.innerHTML = `
      <button class="back-btn" id="back-btn">← Tillbaka</button>
      <div class="empty-state">
        <span class="empty-state-icon">😕</span>
        <div class="empty-state-title">Receptet hittades inte</div>
        <p class="empty-state-text">Det verkar som att detta recept inte finns.</p>
      </div>
    `;
    document.getElementById("back-btn")!.addEventListener("click", () => {
      window.history.back();
    });
    return;
  }

  let currentServings = recipe.servings;
  const checkedSteps = new Set<number>();

  function render(): void {
    const imageHtml = recipe!.image
      ? `<img class="recipe-detail-image" src="${escapeHtml(recipe!.image)}" alt="${escapeHtml(recipe!.name)}" />`
      : `<div class="recipe-detail-image-placeholder">${getRecipeEmoji(recipe!)}</div>`;

    const tagPills = recipe!.tags
      .map((t) => `<span class="tag-pill">${escapeHtml(t)}</span>`)
      .join("");

    const scaledIngredients = recipe!.ingredients.map((ing) => ({
      ...ing,
      amount: scaleAmount(ing.amount, recipe!.servings, currentServings),
    }));

    main.innerHTML = `
      <button class="back-btn" id="back-btn">← Alla recept</button>

      <div class="recipe-detail-header">
        <h1 class="recipe-detail-title">${escapeHtml(recipe!.name)}</h1>
        <div class="recipe-detail-meta">
          <span class="recipe-meta-item">🍽️ ${recipe!.servings} port. (standard)</span>
          <span class="recipe-meta-item">📋 ${recipe!.steps.length} steg</span>
          <span class="recipe-meta-item">🥕 ${recipe!.ingredients.length} ingredienser</span>
        </div>
        <div class="recipe-detail-tags">${tagPills}</div>
      </div>

      ${imageHtml}

      <p class="recipe-detail-intro">${escapeHtml(recipe!.intro)}</p>

      <div class="recipe-layout">
        <aside>
          <div class="servings-card">
            <div class="servings-label">Portioner</div>
            <div class="servings-control">
              <button class="servings-btn" id="servings-minus" ${currentServings <= 1 ? "disabled" : ""}>−</button>
              <span class="servings-count" id="servings-count">${currentServings}</span>
              <button class="servings-btn" id="servings-plus">+</button>
            </div>
            <div class="ingredients-list">
              ${scaledIngredients.map(renderIngredient).join("")}
            </div>
            <button class="btn btn-primary add-to-shopping-btn" id="add-to-shopping">
              🛒 Lägg till i inköpslistan
            </button>
          </div>
        </aside>

        <section>
          <h2 class="section-title">Gör så här</h2>
          <ol class="steps-list">
            ${recipe!.steps
              .map(
                (step, i) => `
              <li class="step-item ${checkedSteps.has(i) ? "step-done" : ""}" data-step="${i}">
                <span class="step-number">${checkedSteps.has(i) ? "✓" : i + 1}</span>
                <span class="step-text">${escapeHtml(step)}</span>
              </li>
            `
              )
              .join("")}
          </ol>
        </section>
      </div>
    `;

    attachListeners(scaledIngredients);
  }

  function attachListeners(scaledIngredients: Ingredient[]): void {
    document.getElementById("back-btn")!.addEventListener("click", () => {
      window.location.hash = "#/";
    });

    document.getElementById("servings-minus")!.addEventListener("click", () => {
      if (currentServings > 1) {
        currentServings--;
        render();
      }
    });

    document.getElementById("servings-plus")!.addEventListener("click", () => {
      currentServings++;
      render();
    });

    document.getElementById("add-to-shopping")!.addEventListener("click", () => {
      addRecipeToShoppingList(recipe!, scaledIngredients);
      showToast(`"${recipe!.name}" lades till i inköpslistan!`);
      renderNav();
    });

    document.querySelector(".steps-list")!.addEventListener("click", (e) => {
      const li = (e.target as HTMLElement).closest<HTMLElement>(".step-item");
      if (!li) return;
      const idx = Number(li.dataset.step);
      if (checkedSteps.has(idx)) {
        checkedSteps.delete(idx);
        li.classList.remove("step-done");
        li.querySelector(".step-number")!.textContent = String(idx + 1);
      } else {
        checkedSteps.add(idx);
        li.classList.add("step-done");
        li.querySelector(".step-number")!.textContent = "✓";
      }
    });
  }

  render();
}

function renderIngredient(ing: Ingredient): string {
  const amount = formatAmount(ing.amount);
  return `
    <div class="ingredient-item">
      <span class="ingredient-name">${escapeHtml(ing.name)}</span>
      <span class="ingredient-amount">${amount} ${escapeHtml(ing.unit)}</span>
    </div>
  `;
}

function scaleAmount(original: number, originalServings: number, newServings: number): number {
  const scaled = (original / originalServings) * newServings;
  // Round to 2 significant decimals max
  const magnitude = Math.pow(10, Math.floor(Math.log10(scaled || 1)));
  return Math.round((scaled / magnitude) * 20) / 20 * magnitude;
}

function formatAmount(amount: number): string {
  if (Number.isInteger(amount)) return String(amount);
  // Format fractions nicely
  const fractions: [number, string][] = [
    [0.25, "¼"], [0.5, "½"], [0.75, "¾"],
    [0.333, "⅓"], [0.667, "⅔"],
  ];
  const decimal = amount % 1;
  const whole = Math.floor(amount);
  for (const [val, sym] of fractions) {
    if (Math.abs(decimal - val) < 0.04) {
      return whole > 0 ? `${whole} ${sym}` : sym;
    }
  }
  return amount.toFixed(1).replace(/\.0$/, "");
}

function getRecipeEmoji(recipe: Recipe): string {
  const tagMap: Record<string, string> = {
    pasta: "🍝", fisk: "🐟", frukost: "🌅", veganskt: "🌱",
    vegetariskt: "🥦", gryta: "🍲", middag: "🍽️", fika: "☕", barn: "👶",
  };
  for (const tag of recipe.tags) {
    if (tagMap[tag]) return tagMap[tag];
  }
  return "🍳";
}

function showToast(message: string): void {
  let toast = document.querySelector<HTMLElement>(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast!.classList.remove("show"), 3000);
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
