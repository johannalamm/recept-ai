export type ShoppingCategory =
  | "frukt & grönt"
  | "bröd"
  | "kött & mejeri"
  | "frys"
  | "skafferi"
  | "kryddor & smaksättare"
  | "barn"
  | "hygien";

export const CATEGORY_ORDER: ShoppingCategory[] = [
  "frukt & grönt",
  "bröd",
  "kött & mejeri",
  "frys",
  "skafferi",
  "kryddor & smaksättare",
  "barn",
  "hygien",
];

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  category: ShoppingCategory;
}

export interface Recipe {
  id: string;
  name: string;
  intro: string;
  tags: string[];
  servings: number;
  image?: string;
  ingredients: Ingredient[];
  steps: string[];
}

export interface ShoppingItem {
  id: string;
  name: string;
  amount: number;
  unit: string;
  category: ShoppingCategory;
  checked: boolean;
  recipeIds: string[];
}

export type UndoAction =
  | { type: "check"; item: ShoppingItem }
  | { type: "remove"; item: ShoppingItem; index: number };
