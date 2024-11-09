import { useState, useEffect, useCallback } from 'react';
import { MiningRig, Stats } from '../types';
import { useAchievements } from './useAchievements';
import { MINING_RATE, POWER_COST_PER_WATT, TICK_RATE, INITIAL_VALUES } from '../constants/gameConfig';
import { calculatePowerCost, calculateEarnings } from '../utils/calculations';

export function useMining(rig: MiningRig) {
  const [balance, setBalance] = useState(INITIAL_VALUES.BALANCE);
  const [stats, setStats] = useState<Stats>({
    totalMined: 0,
    totalUpgrades: 0,
    peakHashRate: 0,
    startTime: Date.now(),
  });
  
  const totalHashRate = Object.values(rig).reduce((sum, part) => sum + part.hashRate, 0);
  const totalPowerUsage = Object.values(rig).reduce((sum, part) => sum + part.powerUsage, 0);
  const powerCostPerSecond = calculatePowerCost(totalPowerUsage);
  const dailyProfit = calculateEarnings(totalHashRate, totalPowerUsage);
  
  const { checkAchievements } = useAchievements();

  const updateStats = useCallback((earnings: number) => {
    setStats(prev => ({
      ...prev,
      totalMined: prev.totalMined + earnings,
      peakHashRate: Math.max(prev.peakHashRate, totalHashRate)
    }));
  }, [totalHashRate]);

  useEffect(() => {
    const interval = setInterval(() => {
      const earnings = (totalHashRate * MINING_RATE * (TICK_RATE / 1000));
      const powerCost = powerCostPerSecond * (TICK_RATE / 1000);
      const netEarnings = earnings - powerCost;
      
      setBalance(prev => prev + netEarnings);
      updateStats(netEarnings);
      checkAchievements({ totalHashRate, balance: balance + netEarnings, stats });
    }, TICK_RATE);

    return () => clearInterval(interval);
  }, [totalHashRate, powerCostPerSecond, balance, updateStats, checkAchievements, stats]);

  return {
    balance,
    setBalance,
    totalHashRate,
    totalPowerUsage,
    dailyProfit,
    stats,
    setStats
  };
}