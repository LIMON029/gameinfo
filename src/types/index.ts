// 물고기 데이터 타입
export interface FishData {
  level: number;
  name: string;
  time: string;
  weather: string;
  location: string;
  shadow: string;
  star1: number;
  star2: number;
  star3: number;
  star4: number;
  star5: number;
}

// 새 데이터 타입
export interface BirdData {
  level: number;
  name: string;
  time: string;
  weather: string;
  location: string;
  star1: number;
  star2: number;
  star3: number;
  star4: number;
  star5: number;
}

// 곤충 데이터 타입
export interface InsectData {
  level: number;
  name: string;
  time: string;
  weather: string;
  location: string;
  star1: number;
  star2: number;
  star3: number;
  star4: number;
  star5: number;
}

// 요리 데이터 타입
export interface CookingData {
  level: number;
  name: string;
  obtainMethod: string;
  recipe: string;
  cost: number;
  efficiency: string;
  star1: number;
  star2: number;
  star3: number;
  star4: number;
  star5: number;
}

// 원예 데이터 타입
export interface GardenData {
  level: number;
  content: string;
  crop: string;
  cost: number;
  star1: number;
  star2: number;
  star3: number;
  star4: number;
  star5: number;
  time: string;
}

// 상점가 데이터 타입
export interface ShopData {
  name: string;
  price: number;
  method: string;
}

// 기타 데이터 타입
export interface OtherData {
  name: string;
  price: number;
  location: string;
  time: string;
}

// 탭 타입
export type TabId = 'fish' | 'bird' | 'insect' | 'cooking' | 'garden' | 'shop' | 'other';

export interface Tab {
  id: TabId;
  name: string;
  color: string;
}

// 필터 타입
export interface Filters {
  levels: number[];
  weathers: string[];
  locations: string[];
  shadows: string[];
}