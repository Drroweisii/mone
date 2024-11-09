import { useState, useCallback } from 'react';
import { Achievement, Stats } from '../types';
import { Trophy, Zap, Coins, Clock } from 'lucide-react';

const initialAchievements: Achievement[] = [
  {
    id: 'first-upgrade',
    title: 'Getting Started',
    description: 'Perform your first upgrade',
    isUnlocked: false,
    icon: 'Trophy'
  },
  {
    id: 'hash-1000',
    title: 'Power User',
    description: 'Reach 1,000 H/s',
    isUnlocked: false,
    icon: 'Zap'
  },
  {
    id: 'balance-100',
    title: 'Crypto Wealthy',
    description: 'Accumulate $100',
    isUnlocked: false,
    icon: 'Coins'
  },
  {
    id: 'time-1h',
    title: 'Dedicated Miner',
    description: 'Mine for 1 hour',
    isUnlocked: false,
    icon: 'Clock'
  }
];

interface CheckParams {
  totalHashRate: number;
  balance: number;
  stats: Stats;
}

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [showNotification, setShowNotification] = useState(false);
  const [lastUnlocked, setLastUnlocked] = useState<Achievement | null>(null);

  const unlockAchievement = useCallback((id: string) => {
    setAchievements(prev => {
      const achievement = prev.find(a => a.id === id);
      if (achievement && !achievement.isUnlocked) {
        setLastUnlocked(achievement);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      }
      return prev.map(a => a.id === id ? { ...a, isUnlocked: true } : a);
    });
  }, []);

  const checkAchievements = useCallback(({ totalHashRate, balance, stats }: CheckParams) => {
    if (stats.totalUpgrades > 0) unlockAchievement('first-upgrade');
    if (totalHashRate >= 1000) unlockAchievement('hash-1000');
    if (balance >= 100) unlockAchievement('balance-100');
    if (Date.now() - stats.startTime >= 3600000) unlockAchievement('time-1h');
  }, [unlockAchievement]);

  return {
    achievements,
    checkAchievements,
    showNotification,
    lastUnlocked
  };
}