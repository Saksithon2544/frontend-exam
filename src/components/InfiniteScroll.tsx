"use client";
import React, { useState, useEffect, useCallback } from 'react';
import type { Product } from '@/types';

const InfiniteScroll = () => {
  // state สำหรับเก็บข้อมูลสินค้า
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true); // ตรวจสอบว่ามีข้อมูลให้โหลดอีกหรือไม่
  const [page, setPage] = useState<number>(1); // หน้าเริ่มต้น
  const limit = 10; // กำหนดจำนวนสินค้าในแต่ละหน้า (เปลี่ยนเป็น 10)

  // ฟังก์ชันสำหรับดึงข้อมูลจาก API
  const fetchProducts = useCallback(async () => {
    if (loading) return; // หากกำลังโหลดอยู่จะไม่ทำการโหลดข้อมูลซ้ำ

    setLoading(true);
    const skip = (page - 1) * limit; // คำนวณค่า skip จาก page และ limit

    try {
      // ใช้ API ที่คุณให้มา
      const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,price,thumbnail`);
      const data = await response.json();

      // อัพเดตข้อมูลสินค้า
      setProducts((prevProducts) => [...prevProducts, ...data.products]);

      // ตรวจสอบว่ามีหน้าต่อไปหรือไม่
      if (data.products.length < limit) {
        setHasMore(false); // ไม่มีข้อมูลเพิ่มแล้ว
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [page, loading]);

  // ฟังก์ชันในการตรวจสอบเมื่อถึงจุดสิ้นสุดของหน้า
  const handleScroll = () => {
    const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
    const bottomPosition = document.documentElement.offsetHeight;

    if (scrollPosition >= bottomPosition - 100 && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1); // เพิ่มหน้าใหม่
    }
  };

  // ใช้ useEffect ในการติดตั้ง event scroll และโหลดข้อมูลเมื่อ page เปลี่ยน
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Infinite Scroll (ข้อ7)</h1>

      {/* แสดงรายการสินค้า */}
      <ul className="space-y-4">
        {products.map((product, index) => (
          <li key={`${product.id}-${index}`} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div className="flex items-center">
              <img src={product.thumbnail} alt={product.title} className="w-16 h-16 object-cover rounded-md mr-4" />
              <div>
                <h3 className="font-semibold text-lg">{product.title}</h3>
                <p className="text-gray-500">${product.price.toFixed(2)}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* แสดงสถานะการโหลด */}
      {loading && (
        <div className="flex justify-center mt-6">
          <span className="text-blue-500">Loading...</span>
        </div>
      )}

      {/* แจ้งเตือนเมื่อไม่มีข้อมูลให้โหลด */}
      {!hasMore && (
        <div className="flex justify-center mt-6">
          <span className="text-red-500">No more products available.</span>
        </div>
      )}
    </div>
  );
};

export default InfiniteScroll;
