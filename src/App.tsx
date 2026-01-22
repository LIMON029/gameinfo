import React, { useState, useMemo } from 'react';
import { Search, Filter, X, ChevronDown, Fish, Bird, Bug, UtensilsCrossed, Flower, Store, Grid3x3 } from 'lucide-react';
import type { TabId, Filters, FishData, BirdData, InsectData, CookingData, GardenData, ShopData, OtherData } from './types';
import { fishData, birdData, insectData, cookingData, gardenData, shopData, otherData } from './data/data';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('fish');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    level: '',
    weather: '',
    location: '',
    shadow: ''
  });

  const tabs = [
    { id: 'fish' as TabId, name: '물고기', icon: Fish, color: 'bg-blue-500' },
    { id: 'bird' as TabId, name: '새', icon: Bird, color: 'bg-sky-400' },
    { id: 'insect' as TabId, name: '곤충', icon: Bug, color: 'bg-green-500' },
    { id: 'cooking' as TabId, name: '요리', icon: UtensilsCrossed, color: 'bg-orange-500' },
    { id: 'garden' as TabId, name: '원예', icon: Flower, color: 'bg-pink-500' },
    { id: 'shop' as TabId, name: '상점가', icon: Store, color: 'bg-purple-500' },
    { id: 'other' as TabId, name: '기타', icon: Grid3x3, color: 'bg-gray-500' },
  ];

  // 현재 활성 탭의 데이터 가져오기
  const getCurrentData = () => {
    switch (activeTab) {
      case 'fish': return fishData;
      case 'bird': return birdData;
      case 'insect': return insectData;
      case 'cooking': return cookingData;
      case 'garden': return gardenData;
      case 'shop': return shopData;
      case 'other': return otherData;
      default: return [];
    }
  };

  const currentData = getCurrentData();

  // 필터링
  const filteredData = useMemo(() => {
    return currentData.filter((item: any) => {
      const matchSearch = item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.crop?.toLowerCase().includes(searchTerm.toLowerCase());
      
      // 레벨이 있는 데이터만 레벨 필터 적용
      const matchLevel = !filters.level || !item.level || item.level.toString() === filters.level;
      
      // 날씨가 있는 데이터만 날씨 필터 적용
      const matchWeather = !filters.weather || !item.weather || item.weather.includes(filters.weather);
      
      // 장소가 있는 데이터만 장소 필터 적용
      const matchLocation = !filters.location || !item.location || item.location.includes(filters.location);
      
      // 그림자가 있는 데이터만 그림자 필터 적용
      const matchShadow = !filters.shadow || !item.shadow || item.shadow === filters.shadow;
      
      return matchSearch && matchLevel && matchWeather && matchLocation && matchShadow;
    });
  }, [currentData, searchTerm, filters]);

  // 고유 값 추출 (필터용)
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

  // 물고기/새/곤충 카드 렌더링
  const renderCommonCard = (item: FishData | BirdData | InsectData, index: number) => {
    const hasShadow = 'shadow' in item;
    
    return (
      <div
        key={index}
        className="bg-white rounded-lg shadow hover:shadow-lg transition-all p-3 border border-gray-100 hover:border-blue-300"
      >
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

  // 요리 카드 렌더링
  const renderCookingCard = (item: CookingData, index: number) => (
    <div
      key={index}
      className="bg-white rounded-lg shadow hover:shadow-lg transition-all p-3 border border-gray-100 hover:border-orange-300"
    >
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

  // 원예 카드 렌더링
  const renderGardenCard = (item: GardenData, index: number) => (
    <div
      key={index}
      className="bg-white rounded-lg shadow hover:shadow-lg transition-all p-3 border border-gray-100 hover:border-pink-300"
    >
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

  // 상점가 카드 렌더링
  const renderShopCard = (item: ShopData, index: number) => (
    <div
      key={index}
      className="bg-white rounded-lg shadow hover:shadow-lg transition-all p-3 border border-gray-100 hover:border-purple-300"
    >
      <h3 className="text-base font-bold text-gray-800 mb-2">{item.name}</h3>

      <div className="space-y-1 text-xs mb-2">
        <div className="flex items-center gap-1">
          <span className="text-gray-500 w-14">💰 가격:</span>
          <span className="font-bold text-purple-600 text-sm">{item.price.toLocaleString()}</span>
        </div>
        <div className="flex items-start gap-1">
          <span className="text-gray-500 w-14 flex-shrink-0">📋 방법:</span>
          <span className="font-medium text-gray-700 text-xs">{item.method}</span>
        </div>
      </div>
    </div>
  );

  // 기타 카드 렌더링
  const renderOtherCard = (item: OtherData, index: number) => (
    <div
      key={index}
      className="bg-white rounded-lg shadow hover:shadow-lg transition-all p-3 border border-gray-100 hover:border-gray-300"
    >
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

  // 카드 렌더링 함수 선택
  const renderCard = (item: any, index: number) => {
    switch (activeTab) {
      case 'fish':
      case 'bird':
      case 'insect':
        return renderCommonCard(item, index);
      case 'cooking':
        return renderCookingCard(item, index);
      case 'garden':
        return renderGardenCard(item, index);
      case 'shop':
        return renderShopCard(item, index);
      case 'other':
        return renderOtherCard(item, index);
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-x-hidden">
      {/* 헤더 */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="w-full px-2 sm:px-4 py-4">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🌈 Heartopia 도감
          </h1>
        </div>
      </header>

      {/* 탭 네비게이션 */}
      <nav className="bg-white border-b sticky top-16 z-40 overflow-x-auto">
        <div className="w-full px-2 sm:px-4">
          <div className="flex space-x-2 sm:space-x-4 py-3">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? `${tab.color} text-white shadow-lg transform scale-105`
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon size={18} />
                  <span className="hidden sm:inline">{tab.name}</span>
                  <span className="sm:hidden text-xs">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="w-full px-2 sm:px-4 py-6">
        {/* 검색 & 필터 */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* 검색바 */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="이름이나 장소로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* 필터 버튼 (레벨이 있는 탭만) */}
            {(activeTab === 'fish' || activeTab === 'bird' || activeTab === 'insect' || activeTab === 'cooking' || activeTab === 'garden') && (
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Filter size={20} />
                <span>필터</span>
                <ChevronDown className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} size={16} />
              </button>
            )}
          </div>

          {/* 필터 옵션 */}
          {showFilters && (activeTab === 'fish' || activeTab === 'bird' || activeTab === 'insect') && (
            <div className="mt-4 pt-4 border-t grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <select
                value={filters.level}
                onChange={(e) => setFilters({...filters, level: e.target.value})}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">모든 레벨</option>
                {uniqueLevels.map(level => (
                  <option key={level} value={level}>레벨 {level}</option>
                ))}
              </select>

              <select
                value={filters.weather}
                onChange={(e) => setFilters({...filters, weather: e.target.value})}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">모든 날씨</option>
                <option value="☀️">☀️ 맑음</option>
                <option value="🌧️">🌧️ 비</option>
                <option value="🌈">🌈 무지개</option>
              </select>

              {activeTab === 'fish' && (
                <select
                  value={filters.shadow}
                  onChange={(e) => setFilters({...filters, shadow: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">모든 그림자</option>
                  {uniqueShadows.map(shadow => (
                    <option key={shadow} value={shadow}>{shadow}</option>
                  ))}
                </select>
              )}

              <button
                onClick={() => setFilters({ level: '', weather: '', location: '', shadow: '' })}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <X size={16} />
                <span>초기화</span>
              </button>
            </div>
          )}
        </div>

        {/* 결과 카운트 */}
        <div className="mb-4 text-gray-600">
          총 <span className="font-bold text-blue-600">{filteredData.length}</span>개의 항목
        </div>

        {/* 데이터 그리드 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2">
          {filteredData.map((item, index) => renderCard(item, index))}
        </div>

        {/* 데이터 없음 */}
        {filteredData.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">
              {activeTab === 'fish' && '🐟'}
              {activeTab === 'bird' && '🐦'}
              {activeTab === 'insect' && '🐛'}
              {activeTab === 'cooking' && '🍳'}
              {activeTab === 'garden' && '🌱'}
              {activeTab === 'shop' && '🏪'}
              {activeTab === 'other' && '📦'}
            </div>
            <p className="text-xl text-gray-600 mb-2">
              {currentData.length === 0 ? '데이터가 없습니다' : '검색 결과가 없습니다'}
            </p>
            <p className="text-gray-500">
              {currentData.length === 0 ? '데이터를 추가해주세요' : '다른 검색어를 입력하거나 필터를 조정해보세요'}
            </p>
          </div>
        )}
      </main>

      {/* 푸터 */}
      <footer className="bg-white border-t mt-12 py-6">
        <div className="w-full px-2 sm:px-4 text-center text-gray-600 text-sm">
          <p>🌈 Heartopia 도감 - 모든 정보를 한눈에</p>
          <p>본 사이트는 팬이 만든 비공식 정보 사이트이며, 게임 내 수치 및 관련 정보의 모든 저작권은 '두근두근타운(Dudu Town)' 개발사에 있습니다. 요청이 있을 시 정보가 수정되거나 삭제될 수 있습니다.</p>
          <p>정보 출처 : '캐러반 조' 님이 제작한 가이드 스프레드시트</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
