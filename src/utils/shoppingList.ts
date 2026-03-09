import type { Recipe, Ingredient, ShoppingItem, ShoppingCategory, UndoAction } from "../types";

const STORAGE_KEY = "recept-ai:shopping";
const MAX_UNDO = 20;

function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function getShoppingItems(): ShoppingItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ShoppingItem[];
  } catch {
    return [];
  }
}

function saveShoppingItems(items: ShoppingItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function addRecipeToShoppingList(recipe: Recipe, scaledIngredients: Ingredient[]): void {
  const items = getShoppingItems();

  for (const ing of scaledIngredients) {
    const key = ing.name.toLowerCase();
    const existing = items.find(
      (item) => item.name.toLowerCase() === key && item.unit === ing.unit
    );
    if (existing) {
      existing.amount = roundAmount(existing.amount + ing.amount);
      if (!existing.recipeIds.includes(recipe.id)) {
        existing.recipeIds.push(recipe.id);
      }
    } else {
      items.push({
        id: generateId(),
        name: ing.name,
        amount: ing.amount,
        unit: ing.unit,
        category: ing.category,
        checked: false,
        recipeIds: [recipe.id],
      });
    }
  }

  saveShoppingItems(items);
}

export function checkItem(id: string): ShoppingItem | null {
  const items = getShoppingItems();
  const item = items.find((i) => i.id === id);
  if (!item) return null;
  item.checked = true;
  saveShoppingItems(items);
  return { ...item };
}

export function uncheckItem(id: string): void {
  const items = getShoppingItems();
  const item = items.find((i) => i.id === id);
  if (item) {
    item.checked = false;
    saveShoppingItems(items);
  }
}

export function removeItem(id: string): { item: ShoppingItem; index: number } | null {
  const items = getShoppingItems();
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return null;
  const [item] = items.splice(index, 1);
  saveShoppingItems(items);
  return { item, index };
}

export function restoreItem(item: ShoppingItem, index: number): void {
  const items = getShoppingItems();
  items.splice(Math.min(index, items.length), 0, item);
  saveShoppingItems(items);
}

export function updateItemAmount(id: string, amount: number): void {
  const items = getShoppingItems();
  const item = items.find((i) => i.id === id);
  if (item) {
    item.amount = roundAmount(amount);
    saveShoppingItems(items);
  }
}

export function updateItemUnit(id: string, unit: string): void {
  const items = getShoppingItems();
  const item = items.find((i) => i.id === id);
  if (item) {
    item.unit = unit;
    saveShoppingItems(items);
  }
}

export function addCustomItem(
  name: string,
  amount: number,
  unit: string,
  category: ShoppingCategory
): void {
  const items = getShoppingItems();
  const key = name.toLowerCase();
  const existing = items.find(
    (item) => item.name.toLowerCase() === key && item.unit === unit
  );
  if (existing) {
    existing.amount = roundAmount(existing.amount + amount);
  } else {
    items.push({
      id: generateId(),
      name,
      amount,
      unit,
      category,
      checked: false,
      recipeIds: [],
    });
  }
  saveShoppingItems(items);
}

export function clearChecked(): void {
  const items = getShoppingItems().filter((i) => !i.checked);
  saveShoppingItems(items);
}

// Undo stack stored in memory (not persisted between page loads)
let undoStack: UndoAction[] = [];

export function pushUndo(action: UndoAction): void {
  undoStack.push(action);
  if (undoStack.length > MAX_UNDO) undoStack.shift();
}

export function popUndo(): UndoAction | undefined {
  return undoStack.pop();
}

export function getUndoStackLength(): number {
  return undoStack.length;
}

function roundAmount(n: number): number {
  return Math.round(n * 100) / 100;
}
