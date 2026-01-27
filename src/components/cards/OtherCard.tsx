import React from 'react';
import type { OtherData } from '../../types';

interface OtherCardProps {
  item: OtherData;
}

const OtherCard: React.FC<OtherCardProps> = ({ item }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-all p-3 border border-gray-100 hover:border-gray-300">
      <h3 className="text-base font-bold text-gray-800 mb-2">{item.name}</h3>

      <div className="space-y-1 text-xs mb-2">
        <div className="flex items-center gap-1">
          <span className="text-gray-500 w-14">💰 가격:</span>
          <span className="font-bold text-gray-800 text-sm">{item.price.toLocaleString()}</span>
        </div>
        <div className="flex items-start gap-1">
          <span className="text-gray-500 w-14 flex-shrink-0">📍 위치:</span>
          <span className="font-medium text-gray-700 text-xs">{item.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-500 w-14">⏰ 시간:</span>
          <span className="font-medium text-gray-700 text-xs">{item.time}</span>
        </div>
      </div>
    </div>
  );
};

export default OtherCard;