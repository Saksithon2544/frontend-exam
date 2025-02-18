import { Product } from "@/types";
import React from "react";
import Image from "next/image";

export default function ProductCard({ price, thumbnail, title }: Product) {
  return (
    <div>
      <div className="bg-white shadow-md p-4 rounded-lg h-[300px]"> {/* Set a fixed height */}
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm">Price: {price}</p>
        <div>
          <Image
            src={thumbnail}
            alt={"product-" + title}
            className="w-full h-[150px] object-cover"
            width={300}
            height={150}
          />
        </div>
      </div>
    </div>
  );
}