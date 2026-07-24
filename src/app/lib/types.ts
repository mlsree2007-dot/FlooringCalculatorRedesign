export type FlooringType = 'tile' | 'carpet';

export interface TileCalculation {
  type: 'tile';
  tileWidth: number;
  tileLength: number;
  roomWidth: number;
  roomLength: number;
  pricePerUnit: number;
  wastePercentage: number;
}

export interface CarpetCalculation {
  type: 'carpet';
  roomWidth: number;
  roomLength: number;
  carpetRollWidth: number;
  carpetCostPerSqFt: number;
  wastePercentage: number;
}

export type Calculation = TileCalculation | CarpetCalculation;

export interface CalculationResult {
  area: number;
  quantity: number;
  wasteAmount: number;
  totalQuantity: number;
  totalCost: number;
  costBreakdown: {
    materialCost: number;
    wasteCost: number;
  };
}

export interface Project {
  id: string;
  name: string;
  customerName?: string;
  calculation: Calculation;
  result: CalculationResult;
  createdAt: string;
  updatedAt: string;
}

export interface Room {
  id: string;
  name: string;
  calculation: Calculation;
  result: CalculationResult;
}

export interface MultiRoomProject {
  id: string;
  name: string;
  customerName?: string;
  rooms: Room[];
  createdAt: string;
  updatedAt: string;
}
