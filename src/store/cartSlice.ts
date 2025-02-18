import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
}

const initialState: CartState = { cart: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ id: number; title: string; price: number }>) => {
      const item = state.cart.find((p) => p.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.cart)); // ✅ บันทึกลง localStorage
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((p) => p.id !== action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.cart)); // ✅ บันทึกลง localStorage
      }
    },
    loadCartFromLocalStorage: (state) => {
      if (typeof window !== "undefined") {
        state.cart = JSON.parse(localStorage.getItem("cart") || "[]");
      }
    },
  },
});

export const { addToCart, removeFromCart, loadCartFromLocalStorage } = cartSlice.actions;
export default cartSlice.reducer;
