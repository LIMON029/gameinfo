import React from 'react';
import type { CookingData } from '../../types';

interface CookingCardProps {
  item: CookingData;
}

const CookingCard: React.FC<CookingCardProps> = ({ item }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-all p-3 border border-gray-100 hover:border-orange-300">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 font-bold text-xs">
          {item.level}
        </div>
        <h3 className="text-base font-bold text-gray-800 truncate">{item.name}</h3>
      </div>

      <div className="space-y-1 text-xs mb-2">
        <div className="flex items-start gap-1">
          <span className="text-gray-500 w-16 flex-shrink-0">📋 얻는법:</span>
          <span className="font-medium text-gray-700 text-xs">{item.obtainMethod}</span>
        </div>
        <div className="flex items-start gap-1">
          <span className="text-gray-500 w-16 flex-shrink-0">🍳 레시피:</span>
          <span className="font-medium text-gray-700 text-xs">{item.recipe}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-500 w-16">💵 원가:</span>
          <span className="font-bold text-gray-800 text-xs">{item.cost.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-500 w-16">📊 효율:</span>
          <span className="font-medium text-green-600 text-xs">{item.efficiency}</span>
        </div>
      </div>

      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded p-2 border border-yellow-200">
        <div className="text-xs font-semibold text-gray-600 mb-1">💰 판매가</div>
        <div className="space-y-0.5">
          {[1, 2, 3, 4, 5].map(star => (
            <div key={star} className="flex items-center justify-between text-xs">
              <span className="text-yellow-600 text-xs">{'⭐'.repeat(star)}</span>
              <span className="font-bold text-gray-800 text-xs">
                {item[`star${star}` as keyof CookingData]?.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CookingCard;