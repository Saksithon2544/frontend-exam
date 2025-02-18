import { Product } from "@/types";
import React from "react";

export default function ProductCard({ id, price, thumbnail, title }: Product) {
  return (
    <div>
      <div className="bg-white shadow-md p-4 rounded-lg h-[300px]"> {/* Set a fixed height */}
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm">Price: {price}</p>
        <div>
          <img
            src={thumbnail}
            alt={"product-" + title}
            className="w-full h-[150px] object-cover"
          />
        </div>
      </div>
    </div>
  );
}