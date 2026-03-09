import "./styles/main.css";
import { renderNav } from "./components/nav";
import { renderHome } from "./pages/home";
import { renderRecipe } from "./pages/recipe";
import { renderShopping } from "./pages/shopping";

function route(): void {
  const hash = window.location.hash || "#/";
  renderNav();

  const recipeMatch = hash.match(/^#\/recipe\/(.+)$/);
  if (recipeMatch) {
    renderRecipe(decodeURIComponent(recipeMatch[1]));
    return;
  }

  if (hash === "#/shopping") {
    renderShopping();
    return;
  }

  // Default: home
  renderHome();
}

window.addEventListener("hashchange", route);
route();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js");
  });
}
