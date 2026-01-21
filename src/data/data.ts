import type {FishData, BirdData, InsectData, CookingData, GardenData, ShopData, OtherData } from '../types';
import fishDataJson from './fishData.json';
import birdJson from './bird.json';
import cookingJson from './cooking.json';
import gardenJson from './garden.json';
import insectJson from './insect.json';
import shopJson from './shop.json';
import otherJson from './other.json';

// JSON 데이터를 FishData 타입으로 export
export const fishData: FishData[] = fishDataJson as FishData[];

export const birdData: BirdData[] = birdJson as BirdData[];

export const insectData: InsectData[] = insectJson as InsectData[];

export const gardenData: GardenData[] = gardenJson as GardenData[];

export const cookingData: CookingData[] = cookingJson as CookingData[];

export const shopData: ShopData[] = shopJson as ShopData[];

export const otherData: OtherData[] = otherJson as OtherData[];