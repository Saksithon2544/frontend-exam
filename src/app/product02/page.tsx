"use client";
import React from "react";
import ProductCard from "@/components/Card/Product";
import { useProducts } from "@/hook/useProducts";

export default function Product() {
  const { products, total, limit, skip, setSkip } = useProducts(10);

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <h1 className="mt-[4rem]">Product List {total} (ข้อ2)</h1>
      <div>
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-10 grid-rows-1 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              thumbnail={product.thumbnail} quantity={0}            />
          ))}
        </div>

        {/* Pagination */}
        <div className="w-full flex justify-center mt-[1rem]">
          {Array.from({ length: Math.ceil(total / limit) }, (_, i) => (
            <button
              className={`mx-2 p-1 ${
                skip === i * limit ? "bg-blue-500 text-white" : "bg-white"
              }`}
              key={`btn-${i + 1}`}
              onClick={() => setSkip(i * limit)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
