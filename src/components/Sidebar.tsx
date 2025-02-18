"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
    { name: "Form Validation-Register", path: "/" },
    { name: "Form Validation-Login", path: "/login" },
    { name: "Virtualized List Component", path: "/dashboard" },
    { name: "Custom Hook", path: "/product02" },
    { name: "Dark Mode Toggle", path: "/" },
    { name: "ระบบจัดการสินค้า (CRUD)", path: "/product03" },
    { name: "Infinite Scroll", path: "/dashboard" },
    { name: "ระบบจัดการตะกร้าสินค้า", path: "/product03" },
    { name: "Export CSV", path: "/product03" },
    { name: "Redux Toolkit", path: "/product03" },
    
];

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <div className="w-64 h-screen bg-gray-900 text-white p-5">
            <h2 className="text-2xl font-bold mb-5">📊 My App</h2>
            <ul>
                {menuItems.map((item) => (
                    <li key={`${item.path}-${item.name}`} className="mb-3">
                        {/* ✅ ใช้ path + name เพื่อให้ key ไม่ซ้ำกัน */}
                        <Link
                            href={item.path}
                            className={`block p-3 rounded-md ${pathname === item.path ? "bg-gray-700" : "hover:bg-gray-800"
                                }`}
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
