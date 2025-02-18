"use client";
import React from "react";

interface ExportCSVButtonProps {
  data: Product[]; 
  filename: string;
}
interface Product {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

const ExportCSVButton: React.FC<ExportCSVButtonProps> = ({ data, filename }) => {
  const convertToCSV = (data: Product[]) => {
    if (data.length === 0) return "";

    const headers = Object.keys(data[0]).join(",") + "\n";

    const rows = data
      .map((row) =>
        Object.values(row)
          .map((value) => `"${value}"`)
          .join(",")
      )
      .join("\n");

    return headers + rows;
  };

  const downloadCSV = () => {
    const csvData = convertToCSV(data);
    if (!csvData) return;

    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={downloadCSV}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Export CSV (ข้อ9)
    </button>
  );
};

export default ExportCSVButton;
