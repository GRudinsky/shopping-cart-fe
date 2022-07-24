type ActionMap<M extends { [index: string]: any }> = {
  type: Key;
  payload?: M[Key];
};

export type ShoppingCartActions =
  ActionMap<ShoppingCartPayloads>[keyof ActionMap<ShoppingCartPayloads>];

export type ErrorType = string | null;

export interface ShoppingCartResponse {
  products: Product[];
  currency?: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  qty: number;
}

export interface ShoppingCart {
  body: ShoppingCartResponse | null;
  error: ErrorType;
}

export interface GlobalState {
  products: Product[];
  currency: string;
  error: ErrorType;
  cartSubTotal: number;
}

export interface ReducedState {
  shoppingCart: GlobalState;
}
