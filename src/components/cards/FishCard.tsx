import React from 'react';
import type { FishData, BirdData, InsectData } from '../../types';

interface FishCardProps {
  item: FishData | BirdData | InsectData;
}

const getShadowColor = (shadow: string): string => {
  const colors: Record<string, string> = {
    '소형': 'bg-green-100 text-green-800',
    '중형': 'bg-blue-100 text-blue-800',
    '대형': 'bg-purple-100 text-purple-800',
    '금색': 'bg-yellow-100 text-yellow-800',
    '반짝': 'bg-pink-100 text-pink-800',
    '빛나는 파랑': 'bg-cyan-100 text-cyan-800'
  };
  return colors[shadow] || 'bg-gray-100 text-gray-800';
};

const FishCard: React.FC<FishCardProps> = ({ item }) => {
  const hasShadow = 'shadow' in item;
  
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-all p-3 border border-gray-100 hover:border-blue-300">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-xs">
          {item.level}
        </div>
        <h3 className="text-base font-bold text-gray-800 truncate">{item.name}</h3>
      </div>

      <div className="space-y-1 text-xs mb-2">
        <div className="flex items-center gap-1">
          <span className="text-gray-500 w-12">⏰</span>
          <span className="font-medium text-gray-700 text-xs">{item.time}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-500 w-12">🌤️</span>
          <span className="text-sm">{item.weather}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-500 w-12">📍</span>
          <span className="font-medium text-gray-700 text-xs truncate">{item.location}</span>
        </div>
        {hasShadow && 'shadow' in item && (
          <div className="flex items-center gap-1">
            <span className="text-gray-500 w-12">👤</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getShadowColor(item.shadow)}`}>
              {item.shadow}
            </span>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded p-2 border border-yellow-200">
        <div className="text-xs font-semibold text-gray-600 mb-1">💰 판매가</div>
        <div className="space-y-0.5">
          {[1, 2, 3, 4, 5].map(star => (
            <div key={star} className="flex items-center justify-between text-xs">
              <span className="text-yellow-600 text-xs">{'⭐'.repeat(star)}</span>
              <span className="font-bold text-gray-800 text-xs">
                {item[`star${star}` as keyof typeof item]?.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FishCard;