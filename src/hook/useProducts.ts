"use client";
import { useState, useEffect } from "react";
import type { Product, ApiResponse } from "@/types";

export function useProducts(initialLimit = 10) {
  const [limit, setLimit] = useState(initialLimit);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);

  async function fetchProducts() {
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,price,thumbnail`
      );
      const data = (await response.json()) as ApiResponse<Product>;

      setProducts(data.products as Product[]);
      setTotal(data.total);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [limit, skip]);

  return { products, total, limit, skip, setLimit, setSkip };
}
