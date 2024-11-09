import { Part } from '../types';
import { UPGRADE_MULTIPLIERS, INITIAL_VALUES } from '../constants/gameConfig';

export const initialPart = (name: string): Part => ({
  id: name.toLowerCase(),
  name,
  level: 1,
  hashRate: INITIAL_VALUES.HASH_RATE,
  powerUsage: INITIAL_VALUES.POWER_USAGE,
  cost: INITIAL_VALUES.COST,
  nextUpgradeCost: INITIAL_VALUES.COST * UPGRADE_MULTIPLIERS.COST,
  icon: name === 'CPU' ? 'Cpu' :
        name === 'GPU' ? 'Gpu' :
        name === 'Motherboard' ? 'Circuit' :
        'Zap'
});

export const calculateNextUpgradeCost = (currentCost: number) => 
  Math.floor(currentCost * UPGRADE_MULTIPLIERS.COST);

export const upgradePart = (part: Part): Part => ({
  ...part,
  level: part.level + 1,
  hashRate: Math.floor(part.hashRate * UPGRADE_MULTIPLIERS.HASH_RATE),
  powerUsage: Math.floor(part.powerUsage * UPGRADE_MULTIPLIERS.POWER_USAGE),
  cost: part.nextUpgradeCost,
  nextUpgradeCost: calculateNextUpgradeCost(part.nextUpgradeCost),
});