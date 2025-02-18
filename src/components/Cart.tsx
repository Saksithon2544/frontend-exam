"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, loadCartFromLocalStorage } from "@/store/cartSlice";
import { RootState } from "@/store/store";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);

  useEffect(() => {
    dispatch(loadCartFromLocalStorage());
  }, [dispatch]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Shopping Cart</h1>
      <ul className="space-y-4 mb-6">
        {cart.map((product) => (
          <li key={product.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
            <div>
              <h3 className="font-semibold text-lg">{product.title}</h3>
              <p className="text-gray-500">${product.price.toFixed(2)} x {product.quantity}</p>
            </div>
            <button
              onClick={() => dispatch(removeFromCart(product.id))}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
