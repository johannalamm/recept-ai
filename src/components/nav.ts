import { getShoppingItems } from "../utils/shoppingList";

export function renderNav(): void {
  const nav = document.getElementById("nav")!;
  const hash = window.location.hash || "#/";
  const items = getShoppingItems();
  const uncheckedCount = items.filter((i) => !i.checked).length;

  nav.innerHTML = `
    <div class="nav-inner">
      <div class="nav-logo" data-href="#/">
        <span>🍳</span> Receptboken
      </div>
      <div class="nav-links">
        <button class="nav-link ${hash === "#/" || hash === "" ? "active" : ""}" data-href="#/">
          <span class="nav-icon">🏠</span> Recept
        </button>
        <button class="nav-link ${hash.startsWith("#/shopping") ? "active" : ""}" data-href="#/shopping">
          <span class="nav-icon">🛒</span> Inköpslista
          ${uncheckedCount > 0 ? `<span class="nav-badge">${uncheckedCount}</span>` : ""}
        </button>
      </div>
    </div>
  `;

  nav.querySelectorAll("[data-href]").forEach((el) => {
    el.addEventListener("click", () => {
      const href = (el as HTMLElement).dataset.href!;
      window.location.hash = href;
    });
  });
}
