"use client";
import React from 'react';
import { FixedSizeList as List } from 'react-window';

const VirtualizedList = () => {
  const itemCount = 100000;
  const itemSize = 50; 
  const listHeight = 500;

  const renderRow = ({ index, style }: { index: number, style: React.CSSProperties }) => {
    return (
      <div 
        style={style} 
        className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <span className="text-gray-800 dark:text-white font-semibold">
          Item #{index + 1}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">Details</span>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-5">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
        Virtualized List (ข้อ1)
      </h2>
      <List
        height={listHeight}
        itemCount={itemCount}
        itemSize={itemSize}
        width={300}
        className="rounded-lg border border-gray-300 dark:border-gray-700"
      >
        {renderRow}
      </List>
    </div>
  );
};

export default VirtualizedList;
