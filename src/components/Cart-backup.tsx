"use client";
import React, { useEffect, useState } from "react";
import type { Product } from "@/types";

const Cart = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(storedProducts);
  }, []);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  useEffect(() => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((cartItem) => {
        const productInStore = products.find((p) => p.id === cartItem.id);
        return productInStore
          ? { ...cartItem, price: productInStore.price, title: productInStore.title }
          : cartItem;
      });

      if (JSON.stringify(updatedCart) !== JSON.stringify(prevCart)) {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      }
      return prevCart;
    });
  }, [products]);

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      const updatedCart = existingProduct
        ? prevCart.map((item) =>
            item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
          )
        : [...prevCart, { ...product, quantity: 1 }];

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: (item.quantity || 1) - 1 } : item
        )
        .filter((item) => item.quantity > 0);

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Product List (ข้อ8)
      </h1>

      <ul className="space-y-4 mb-6">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </ul>

      <div className="mt-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Shopping Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4 mb-6">
            {cart.map((product) => (
              <CartItem key={product.id} product={product} onRemove={handleRemoveFromCart} />
            ))}
          </ul>
        )}

        <div className="flex justify-between items-center p-4 border-t border-gray-200">
          <h3 className="text-xl font-semibold">Total: ${calculateTotal().toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
};

const ProductItem = ({ product, onAddToCart }: { product: Product; onAddToCart: (product: Product) => void }) => {
  return (
    <li className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
      <div>
        <h3 className="font-semibold text-lg">{product.title}</h3>
        <p className="text-gray-500">${product.price.toFixed(2)}</p>
      </div>
      <button
        onClick={() => onAddToCart(product)}
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Add to Cart
      </button>
    </li>
  );
};

const CartItem = ({ product, onRemove }: { product: Product; onRemove: (id: number) => void }) => {
  return (
    <li className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
      <div>
        <h3 className="font-semibold text-lg">{product.title}</h3>
        <p className="text-gray-500">
          ${product.price.toFixed(2)} x {product.quantity}
        </p>
        <p className="text-gray-700">
          Subtotal: ${(product.price * (product.quantity || 1)).toFixed(2)}
        </p>
      </div>
      <button
        onClick={() => onRemove(product.id)}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Remove
      </button>
    </li>
  );
};

export default Cart;
