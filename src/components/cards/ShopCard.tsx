import React from 'react';
import type { ShopData } from '../../types';

interface ShopCardProps {
  item: ShopData;
}

const ShopCard: React.FC<ShopCardProps> = ({ item }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-all p-3 border border-gray-100 hover:border-purple-300">
      <h3 className="text-base font-bold text-gray-800 mb-2">{item.name}</h3>

      <div className="space-y-1 text-xs mb-2">
        <div className="flex items-center gap-1">
          <span className="text-gray-500 w-14">💰 가격:</span>
          <span className="font-bold text-purple-600 text-sm">{item.price.toLocaleString()}</span>
        </div>
        <div className="flex items-start gap-1">
          <span className="text-gray-500 w-14 flex-shrink-0">📦 획득 방법:</span>
          <span className="font-medium text-gray-700 text-xs">{item.method}</span>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;