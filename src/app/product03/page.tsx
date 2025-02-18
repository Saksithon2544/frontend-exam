"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExportCSVButton from "@/components/ExportCSVButton";
import { addToCart, removeFromCart, loadCartFromLocalStorage } from "@/store/cartSlice";
import { RootState } from "@/store/store";

interface Product {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

const ProductsPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({ title: "", price: "" });
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(storedProducts);
    dispatch(loadCartFromLocalStorage());
  }, [dispatch]);

  const saveProductsToStorage = (updatedProducts: Product[]) => {
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  const addProduct = () => {
    if (!newProduct.title || !newProduct.price) {
      setAlertMessage("⚠️ กรุณากรอกชื่อและราคาสินค้าให้ครบถ้วน!");
      setTimeout(() => setAlertMessage(null), 3000);
      return;
    }

    const newProductData: Product = {
      title: newProduct.title,
      price: parseFloat(newProduct.price),
      thumbnail: "",
      quantity: 1,
      id: "",
    };

    const updatedProducts = [...products, newProductData];
    saveProductsToStorage(updatedProducts);
    setNewProduct({ title: "", price: "" });

    setAlertMessage("✅ เพิ่มสินค้าสำเร็จ!");
    setTimeout(() => setAlertMessage(null), 2000);
  };

  const startEditing = (product: Product) => {
    setEditingProduct(product);
  };

  const saveEditProduct = () => {
    if (!editingProduct) return;

    const updatedProducts = products.map((p) =>
      p.id === editingProduct.id ? editingProduct : p
    );

    saveProductsToStorage(updatedProducts);
    setEditingProduct(null);

    setAlertMessage("✅ บันทึกข้อมูลสินค้าสำเร็จ!");
    setTimeout(() => setAlertMessage(null), 2000);
  };

  const deleteProduct = (id: string) => {
    if (confirm("❌ คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?")) {
      const updatedProducts = products.filter((p) => p.id !== id);
      saveProductsToStorage(updatedProducts);

      setAlertMessage("🗑️ ลบสินค้าสำเร็จ!");
      setTimeout(() => setAlertMessage(null), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">🛍️ Product Manager (ข้อที่3)</h1>
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">ต้องเพิ่มสินค้าก่อนถึงจะแสดงรายการสินค้าครับ</h1>

      

      {alertMessage && (
        <div className="mb-4 p-3 bg-yellow-100 text-yellow-700 rounded-md text-center">
          {alertMessage}
        </div>
      )}

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Product Name"
          className="border p-2 rounded w-1/2"
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          className="border p-2 rounded w-1/4"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <button onClick={addProduct} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add
        </button>
      </div>
      <div>
        <ExportCSVButton data={products} filename="products" />

        <h2 className="text-2xl font-bold text-blue-600 mb-4">📦 Products</h2>

      </div>

      <ul className="space-y-4 mb-6">
        {products.map((product) => (
          <li key={product.id} className="flex justify-between items-center p-4 border rounded-lg">
            <div>
              <h3 className="font-semibold text-lg">{product.title}</h3>
              <p className="text-gray-500">${product.price.toFixed(2)}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => dispatch(addToCart(product))}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add to Cart
              </button>
              <button
                onClick={() => startEditing(product)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProduct(product.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editingProduct && (
        <div className="border p-4 rounded shadow-lg">
          <h2 className="text-xl font-bold mb-4">✏️ Edit Product</h2>
          <input
            type="text"
            className="border p-2 rounded w-full mb-2"
            value={editingProduct.title}
            onChange={(e) =>
              setEditingProduct((prev) => prev && { ...prev, title: e.target.value })
            }
          />
          <input
            type="number"
            className="border p-2 rounded w-full mb-2"
            value={editingProduct.price}
            onChange={(e) =>
              setEditingProduct((prev) => prev && { ...prev, price: parseFloat(e.target.value) })
            }
          />
          <div className="flex gap-2">
            <button onClick={saveEditProduct} className="bg-blue-500 text-white px-4 py-2 rounded">
              Save
            </button>
            <button onClick={() => setEditingProduct(null)} className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">🛒 Shopping Cart (ข้อที่8 และ 10)</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4 mb-6">
            {cart.map((product) => (
              <li key={product.id} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold text-lg">{product.title}</h3>
                  <p className="text-gray-500">
                    ${product.price.toFixed(2)} x {product.quantity}
                  </p>
                  <p className="text-gray-700">
                    Subtotal: ${(product.price * product.quantity).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(product.id))}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
