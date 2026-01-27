import React from 'react';
import type { TabId } from '../types';
import FishCard from './cards/FishCard';
import CookingCard from './cards/CookingCard';
import GardenCard from './cards/GardenCard';
import ShopCard from './cards/ShopCard';
import OtherCard from './cards/OtherCard';

interface DataGridProps {
  data: any[];
  activeTab: TabId;
}

const DataGrid: React.FC<DataGridProps> = ({ data, activeTab }) => {
  const renderCard = (item: any, index: number) => {
    switch (activeTab) {
      case 'fish':
      case 'bird':
      case 'insect':
        return <FishCard key={index} item={item} />;
      case 'cooking':
        return <CookingCard key={index} item={item} />;
      case 'garden':
        return <GardenCard key={index} item={item} />;
      case 'shop':
        return <ShopCard key={index} item={item} />;
      case 'other':
        return <OtherCard key={index} item={item} />;
      default:
        return null;
    }
  };

  const getEmptyIcon = () => {
    const icons: Record<TabId, string> = {
      fish: '🐟',
      bird: '🐦',
      insect: '🐛',
      cooking: '🍳',
      garden: '🌱',
      shop: '🏪',
      other: '📦',
    };
    return icons[activeTab] || '📦';
  };

  if (data.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">{getEmptyIcon()}</div>
        <p className="text-xl text-gray-600 mb-2">데이터가 없습니다</p>
        <p className="text-gray-500">데이터를 추가해주세요</p>
      </div>
    );
  }

  return (
    <>
      {/* 결과 카운트 */}
      <div className="mb-4 text-gray-600">
        총 <span className="font-bold text-blue-600">{data.length}</span>개의 항목
      </div>

      {/* 그리드 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2">
        {data.map((item, index) => renderCard(item, index))}
      </div>
    </>
  );
};

export default DataGrid;