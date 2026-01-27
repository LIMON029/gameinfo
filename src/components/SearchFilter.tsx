import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import type { Filters, TabId } from '../types';

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  activeTab: TabId;
  uniqueLevels: number[];
  uniqueShadows: string[];
}

interface CustomDropdownProps {
  dropdownName: string;
  label: string;
  options: { value: number | string; label: string }[];
  selected: (number | string)[];
  onToggle: (value: number | string) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
  dropdownRef: (el: HTMLDivElement | null) => void;
}

// CustomDropdown 컴포넌트를 밖으로 분리
const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  options,
  selected,
  onToggle,
  isOpen,
  onToggleOpen,
  dropdownRef,
}) => {
  const displayText = selected.length > 0 
    ? `${selected.length}개 선택됨` 
    : label;

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={onToggleOpen}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-left flex items-center justify-between"
      >
        <span className={selected.length > 0 ? 'text-blue-600 font-medium' : 'text-gray-700'}>
          {displayText}
        </span>
        <ChevronDown className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} size={16} />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.map(option => (
            <label
              key={option.value}
              className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.includes(option.value)}
                onChange={() => onToggle(option.value)}
                className="mr-3 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  onSearchChange,
  filters,
  onFiltersChange,
  showFilters,
  onToggleFilters,
  activeTab,
  uniqueLevels,
  uniqueShadows,
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const hasFilters = ['fish', 'bird', 'insect', 'cooking', 'garden'].includes(activeTab);
  const showLevelFilter = ['fish', 'bird', 'insect'].includes(activeTab);

  const weatherOptions = [
    { value: '☀️', label: '☀️ 맑음' },
    { value: '🌧️', label: '🌧️ 비' },
    { value: '🌈', label: '🌈 무지개' },
  ];

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown) {
        const currentRef = dropdownRefs.current[openDropdown];
        if (currentRef && !currentRef.contains(event.target as Node)) {
          setOpenDropdown(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  const toggleLevel = (level: number | string) => {
    const levelNum = typeof level === 'string' ? parseInt(level) : level;
    const newLevels = filters.levels.includes(levelNum)
      ? filters.levels.filter(l => l !== levelNum)
      : [...filters.levels, levelNum];
    onFiltersChange({ ...filters, levels: newLevels });
  };

  const toggleWeather = (weather: number | string) => {
    const weatherStr = String(weather);
    const newWeathers = filters.weathers.includes(weatherStr)
      ? filters.weathers.filter(w => w !== weatherStr)
      : [...filters.weathers, weatherStr];
    onFiltersChange({ ...filters, weathers: newWeathers });
  };

  const toggleShadow = (shadow: number | string) => {
    const shadowStr = String(shadow);
    const newShadows = filters.shadows.includes(shadowStr)
      ? filters.shadows.filter(s => s !== shadowStr)
      : [...filters.shadows, shadowStr];
    onFiltersChange({ ...filters, shadows: newShadows });
  };

  const clearFilters = () => {
    onFiltersChange({ levels: [], weathers: [], locations: [], shadows: [] });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* 검색바 */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="이름이나 장소로 검색..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        {/* 필터 버튼 */}
        {hasFilters && (
          <button
            onClick={onToggleFilters}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Filter size={20} />
            <span>필터</span>
            <ChevronDown className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} size={16} />
          </button>
        )}
      </div>

      {/* 필터 옵션 */}
      {showFilters && showLevelFilter && (
        <div className="mt-4 pt-4 border-t grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <CustomDropdown
            dropdownName="levels"
            label="모든 레벨"
            options={uniqueLevels.map(l => ({ value: l, label: `레벨 ${l}` }))}
            selected={filters.levels}
            onToggle={toggleLevel}
            isOpen={openDropdown === 'levels'}
            onToggleOpen={() => setOpenDropdown(openDropdown === 'levels' ? null : 'levels')}
            dropdownRef={(el) => { dropdownRefs.current['levels'] = el; }}
          />

          <CustomDropdown
            dropdownName="weathers"
            label="모든 날씨"
            options={weatherOptions}
            selected={filters.weathers}
            onToggle={toggleWeather}
            isOpen={openDropdown === 'weathers'}
            onToggleOpen={() => setOpenDropdown(openDropdown === 'weathers' ? null : 'weathers')}
            dropdownRef={(el) => { dropdownRefs.current['weathers'] = el; }}
          />

          {activeTab === 'fish' && (
            <CustomDropdown
              dropdownName="shadows"
              label="모든 그림자"
              options={uniqueShadows.map(s => ({ value: s, label: s }))}
              selected={filters.shadows}
              onToggle={toggleShadow}
              isOpen={openDropdown === 'shadows'}
              onToggleOpen={() => setOpenDropdown(openDropdown === 'shadows' ? null : 'shadows')}
              dropdownRef={(el) => { dropdownRefs.current['shadows'] = el; }}
            />
          )}

          <button
            onClick={clearFilters}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <X size={16} />
            <span>초기화</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;