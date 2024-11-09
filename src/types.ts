export interface Part {
  id: string;
  name: string;
  level: number;
  hashRate: number;
  powerUsage: number;
  cost: number;
  nextUpgradeCost: number;
  icon: string;
}

export interface MiningRig {
  cpu: Part;
  gpu: Part;
  motherboard: Part;
  powerSupply: Part;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  isUnlocked: boolean;
  icon: string;
}

export interface Stats {
  totalMined: number;
  totalUpgrades: number;
  peakHashRate: number;
  startTime: number;
}