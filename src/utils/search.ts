import type { Recipe } from "../types";

export function searchRecipes(recipes: Recipe[], query: string): Recipe[] {
  const q = query.trim().toLowerCase();
  if (!q) return recipes;

  return recipes.filter((recipe) => {
    if (recipe.name.toLowerCase().includes(q)) return true;
    if (recipe.tags.some((t) => t.toLowerCase().includes(q))) return true;
    if (recipe.ingredients.some((i) => i.name.toLowerCase().includes(q))) return true;
    return false;
  });
}

export function filterByTags(recipes: Recipe[], activeTags: string[]): Recipe[] {
  if (activeTags.length === 0) return recipes;
  return recipes.filter((recipe) =>
    activeTags.every((tag) => recipe.tags.includes(tag))
  );
}

export function getAllTags(recipes: Recipe[]): string[] {
  const tagSet = new Set<string>();
  recipes.forEach((r) => r.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}
