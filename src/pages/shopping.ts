import type { ShoppingItem, ShoppingCategory } from "../types";
import { CATEGORY_ORDER } from "../types";
import {
  getShoppingItems,
  addCustomItem,
  checkItem,
  uncheckItem,
  removeItem,
  restoreItem,
  updateItemAmount,
  updateItemUnit,
  clearChecked,
  pushUndo,
  popUndo,
  getUndoStackLength,
} from "../utils/shoppingList";
import { renderNav } from "../components/nav";

const CATEGORY_ICONS: Record<ShoppingCategory, string> = {
  "frukt & grönt": "🥦",
  "bröd": "🍞",
  "kött & mejeri": "🥩",
  "frys": "❄️",
  "skafferi": "🥫",
  "kryddor & smaksättare": "🧂",
  "barn": "👶",
  "hygien": "🧼",
};

export function renderShopping(): void {
  const main = document.getElementById("main")!;
  const items = getShoppingItems();

  const unchecked = items.filter((i) => !i.checked);
  const checked = items.filter((i) => i.checked);
  const grouped = groupByCategory(unchecked);

  const listHtml = items.length === 0
    ? `<div class="shopping-empty empty-state">
        <span class="empty-state-icon">🛒</span>
        <div class="empty-state-title">Din inköpslista är tom</div>
        <p class="empty-state-text">Lägg till ingredienser från ett recept eller via formuläret ovan.</p>
      </div>`
    : `<div class="shopping-toolbar">
        <span style="color: var(--color-text-muted); font-size: 0.875rem;">
          ${checked.length > 0 ? `${checked.length} avkryssade` : "Inga avkryssade ännu"}
        </span>
        <div class="shopping-toolbar-actions">
          ${checked.length > 0
            ? `<button class="btn btn-secondary" id="clear-checked">🗑️ Rensa avkryssade</button>`
            : ""}
        </div>
      </div>
      <div id="shopping-list">
        ${CATEGORY_ORDER
          .filter((cat) => grouped[cat] && grouped[cat]!.length > 0)
          .map((cat) => renderCategory(cat, grouped[cat]!))
          .join("")}
      </div>`;

  main.innerHTML = `
    <div class="page-header">
      <h1 class="page-title">Inköpslista</h1>
      ${items.length > 0 ? `<p class="page-subtitle">${unchecked.length} av ${items.length} kvar att handla</p>` : ""}
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
            ${CATEGORY_ORDER.map(
              (cat) => `<option value="${escapeHtml(cat)}">${CATEGORY_ICONS[cat]} ${escapeHtml(cat)}</option>`
            ).join("")}
          </select>
          <button type="submit" class="btn btn-primary add-item-submit">Lägg till</button>
        </div>
      </form>
    </div>

    ${listHtml}
  `;

  attachListeners();
  renderUndoBar();
}

function renderCategory(category: ShoppingCategory, items: ShoppingItem[]): string {
  return `
    <div class="shopping-category" data-category="${escapeHtml(category)}">
      <div class="shopping-category-header">
        <span class="shopping-category-icon">${CATEGORY_ICONS[category]}</span>
        <span class="shopping-category-name">${escapeHtml(category)}</span>
        <span class="shopping-category-count">${items.length} st</span>
      </div>
      ${items.map(renderShoppingItem).join("")}
    </div>
  `;
}

function renderShoppingItem(item: ShoppingItem): string {
  return `
    <div class="shopping-item" data-item-id="${escapeHtml(item.id)}">
      <input
        type="checkbox"
        class="shopping-item-checkbox"
        data-id="${escapeHtml(item.id)}"
        ${item.checked ? "checked" : ""}
        title="Kryssa av"
      />
      <span class="shopping-item-name">${escapeHtml(item.name)}</span>
      <div class="shopping-item-amount">
        <input
          type="number"
          class="shopping-amount-input"
          data-id="${escapeHtml(item.id)}"
          value="${item.amount}"
          min="0"
          step="0.5"
          title="Ändra mängd"
        />
        <input
          type="text"
          class="shopping-unit-input"
          data-id="${escapeHtml(item.id)}"
          value="${escapeHtml(item.unit)}"
          title="Ändra enhet"
        />
      </div>
      <button class="shopping-item-remove" data-id="${escapeHtml(item.id)}" title="Ta bort">✕</button>
    </div>
  `;
}

let undoBarTimer: ReturnType<typeof setTimeout> | null = null;

function showUndoBar(): void {
  const existing = document.getElementById("undo-bar");
  if (existing) existing.remove();
  if (undoBarTimer) clearTimeout(undoBarTimer);

  if (getUndoStackLength() === 0) return;

  const bar = document.createElement("div");
  bar.id = "undo-bar";
  bar.className = "undo-bar";
  bar.innerHTML = `
    <span>Ångra senaste åtgärd</span>
    <button class="undo-bar-btn" id="undo-btn">↩ Ångra</button>
  `;
  document.body.appendChild(bar);

  document.getElementById("undo-btn")!.addEventListener("click", () => {
    const action = popUndo();
    if (undoBarTimer) clearTimeout(undoBarTimer);
    bar.remove();
    if (!action) return;

    if (action.type === "check") {
      uncheckItem(action.item.id);
    } else if (action.type === "remove") {
      restoreItem(action.item, action.index);
    }

    renderNav();
    renderShopping();
  });

  undoBarTimer = setTimeout(() => bar.remove(), 5000);
}

function renderUndoBar(): void {
  // Remove any lingering bar when re-rendering the page (e.g. navigation away)
  const existing = document.getElementById("undo-bar");
  if (existing) existing.remove();
}

function attachListeners(): void {
  // Add custom item form
  const form = document.getElementById("add-item-form") as HTMLFormElement;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameEl = document.getElementById("add-item-name") as HTMLInputElement;
    const amountEl = document.getElementById("add-item-amount") as HTMLInputElement;
    const unitEl = document.getElementById("add-item-unit") as HTMLInputElement;
    const categoryEl = document.getElementById("add-item-category") as HTMLSelectElement;

    const name = nameEl.value.trim();
    if (!name) return;

    const amount = parseFloat(amountEl.value) || 0;
    const unit = unitEl.value.trim();
    const category = categoryEl.value as ShoppingCategory;

    addCustomItem(name, amount, unit, category);
    renderNav();
    renderShopping();
  });

  const list = document.getElementById("shopping-list")!;

  // Checkbox: check off item
  list.addEventListener("change", (e) => {
    const cb = (e.target as HTMLElement).closest<HTMLInputElement>(".shopping-item-checkbox");
    if (!cb) return;
    const id = cb.dataset.id!;
    if (cb.checked) {
      const snapshot = checkItem(id);
      if (snapshot) pushUndo({ type: "check", item: snapshot });
      renderNav();
      renderShopping();
      showUndoBar();
    } else {
      uncheckItem(id);
      renderNav();
      renderShopping();
    }
  });

  // Remove button
  list.addEventListener("click", (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>(".shopping-item-remove");
    if (!btn) return;
    const id = btn.dataset.id!;
    const result = removeItem(id);
    if (result) pushUndo({ type: "remove", item: result.item, index: result.index });
    renderNav();
    renderShopping();
    showUndoBar();
  });

  // Amount input
  list.addEventListener("change", (e) => {
    const input = (e.target as HTMLElement).closest<HTMLInputElement>(".shopping-amount-input");
    if (!input) return;
    const id = input.dataset.id!;
    const val = parseFloat(input.value);
    if (!isNaN(val) && val >= 0) {
      updateItemAmount(id, val);
    }
  });

  // Unit input
  list.addEventListener("change", (e) => {
    const input = (e.target as HTMLElement).closest<HTMLInputElement>(".shopping-unit-input");
    if (!input) return;
    const id = input.dataset.id!;
    updateItemUnit(id, input.value.trim());
  });

  // Clear checked button
  const clearBtn = document.getElementById("clear-checked");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      clearChecked();
      renderNav();
      renderShopping();
    });
  }
}

function groupByCategory(items: ShoppingItem[]): Partial<Record<ShoppingCategory, ShoppingItem[]>> {
  const groups: Partial<Record<ShoppingCategory, ShoppingItem[]>> = {};
  for (const item of items) {
    if (!groups[item.category]) groups[item.category] = [];
    groups[item.category]!.push(item);
  }
  return groups;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
