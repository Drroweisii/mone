import { MINING_RATE, POWER_COST_PER_WATT } from '../constants/gameConfig';

export const calculatePowerCost = (powerUsage: number): number => 
  (powerUsage * POWER_COST_PER_WATT) / 3600;

export const calculateEarnings = (hashRate: number, powerUsage: number): number => {
  const dailyMining = hashRate * MINING_RATE * 24 * 60 * 60;
  const dailyPowerCost = calculatePowerCost(powerUsage) * 24 * 60 * 60;
  return dailyMining - dailyPowerCost;
};

export const formatNumber = (num: number, decimals: number = 2): string => {
  if (num >= 1e6) return `${(num / 1e6).toFixed(decimals)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(decimals)}K`;
  return num.toFixed(decimals);
};