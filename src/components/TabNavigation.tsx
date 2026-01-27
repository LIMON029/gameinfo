import React from 'react';
import { Fish, Bird, Bug, UtensilsCrossed, Flower, Store, Grid3x3 } from 'lucide-react';
import type { TabId } from '../types';

interface Tab {
  id: TabId;
  name: string;
  icon: React.ElementType;
  color: string;
}

interface TabNavigationProps {
  activeTab: TabId;
  onTabChange: (tabId: TabId) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs: Tab[] = [
    { id: 'fish', name: '물고기', icon: Fish, color: 'bg-blue-500' },
    { id: 'bird', name: '새', icon: Bird, color: 'bg-sky-400' },
    { id: 'insect', name: '곤충', icon: Bug, color: 'bg-green-500' },
    { id: 'cooking', name: '요리', icon: UtensilsCrossed, color: 'bg-orange-500' },
    { id: 'garden', name: '원예', icon: Flower, color: 'bg-pink-500' },
    { id: 'shop', name: '상점가', icon: Store, color: 'bg-purple-500' },
    { id: 'other', name: '기타', icon: Grid3x3, color: 'bg-gray-500' },
  ];

  return (
    <nav className="bg-white border-b sticky top-16 z-40 overflow-x-auto">
      <div className="w-full px-2 sm:px-4">
        <div className="flex space-x-2 sm:space-x-4 py-3">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
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
  );
};

export default TabNavigation;