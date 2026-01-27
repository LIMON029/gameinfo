import React from 'react';
import type { GardenData } from '../../types';

interface GardenCardProps {
  item: GardenData;
}

const GardenCard: React.FC<GardenCardProps> = ({ item }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-all p-3 border border-gray-100 hover:border-pink-300">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-pink-100 text-pink-600 font-bold text-xs">
          {item.level}
        </div>
        <h3 className="text-base font-bold text-gray-800 truncate">{item.crop}</h3>
      </div>

      <div className="space-y-1 text-xs mb-2">
        <div className="flex items-start gap-1">
          <span className="text-gray-500 w-16 flex-shrink-0">🌱 내용:</span>
          <span className="font-medium text-gray-700 text-xs">{item.content}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-500 w-16">💵 원가:</span>
          <span className="font-bold text-gray-800 text-xs">{item.cost.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-500 w-16">⏰ 시간:</span>
          <span className="font-medium text-gray-700 text-xs">{item.time}</span>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded p-2 border border-green-200">
        <div className="text-xs font-semibold text-gray-600 mb-1">💰 판매가</div>
        <div className="space-y-0.5">
          {[1, 2, 3, 4, 5].map(star => (
            <div key={star} className="flex items-center justify-between text-xs">
              <span className="text-green-600 text-xs">{'⭐'.repeat(star)}</span>
              <span className="font-bold text-gray-800 text-xs">
                {item[`star${star}` as keyof GardenData]?.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GardenCard;