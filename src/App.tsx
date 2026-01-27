import React, { useState, useMemo } from 'react';
import type { TabId, Filters } from './types';
import Header from './components/Header';
import TabNavigation from './components/TabNavigation';
import SearchFilter from './components/SearchFilter';
import DataGrid from './components/DataGrid';
import { fishData } from './data/data';
import { birdData } from './data/data';
import { insectData } from './data/data';
import { cookingData } from './data/data';
import { gardenData } from './data/data';
import { shopData } from './data/data';
import { otherData } from './data/data';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('fish');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    levels: [],
    weathers: [],
    locations: [],
    shadows: []
  });

  // 현재 활성 탭의 데이터 가져오기
  const getCurrentData = () => {
    const dataMap: Record<TabId, any[]> = {
      fish: fishData,
      bird: birdData,
      insect: insectData,
      cooking: cookingData,
      garden: gardenData,
      shop: shopData,
      other: otherData,
    };
    return dataMap[activeTab] || [];
  };

  const currentData = getCurrentData();

  // 필터링
  const filteredData = useMemo(() => {
    return currentData.filter((item: any) => {
      // 검색
      const matchSearch = item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.crop?.toLowerCase().includes(searchTerm.toLowerCase());
      
      // 레벨 필터 (배열이 비어있으면 모두 통과)
      const matchLevel = filters.levels.length === 0 || 
                         !item.level || 
                         filters.levels.includes(item.level);
      
      // 날씨 필터 (배열이 비어있으면 모두 통과, 하나라도 포함되면 통과)
      const matchWeather = filters.weathers.length === 0 || 
                          !item.weather || 
                          filters.weathers.some(w => item.weather.includes(w));
      
      // 위치 필터
      const matchLocation = filters.locations.length === 0 || 
                           !item.location || 
                           filters.locations.some(l => item.location.includes(l));
      
      // 그림자 필터 (배열이 비어있으면 모두 통과)
      const matchShadow = filters.shadows.length === 0 || 
                         !item.shadow || 
                         filters.shadows.includes(item.shadow);
      
      return matchSearch && matchLevel && matchWeather && matchLocation && matchShadow;
    });
  }, [currentData, searchTerm, filters]);

  // 고유 값 추출
  const uniqueLevels = useMemo(() => {
    const levels = currentData
      .filter((item: any) => item.level !== undefined)
      .map((item: any) => item.level);
    return [...new Set(levels)].sort((a, b) => a - b);
  }, [currentData]);
  
  const uniqueShadows = useMemo(() => {
    const shadows = currentData
      .filter((item: any) => item.shadow !== undefined)
      .map((item: any) => item.shadow);
    return [...new Set(shadows)];
  }, [currentData]);

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-x-hidden">
      <Header />
      
      <TabNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      <main className="w-full px-2 sm:px-4 py-6">
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filters={filters}
          onFiltersChange={setFilters}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
          activeTab={activeTab}
          uniqueLevels={uniqueLevels}
          uniqueShadows={uniqueShadows}
        />

        <DataGrid 
          data={filteredData} 
          activeTab={activeTab} 
        />
      </main>

      <footer className="bg-white border-t mt-12 py-6">
        <div className="w-full px-2 sm:px-4 text-center text-gray-600 text-sm">
          <p>🌈 Heartopia 도감 - 모든 정보를 한눈에</p>
        </div>
      </footer>
    </div>
  );
};

export default App;