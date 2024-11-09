import React, { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { MiningRig } from '../types';
import MiningStats from './MiningStats';
import PartCard from './PartCard';
import StatsPanel from './StatsPanel';
import AchievementNotification from './AchievementNotification';
import ApiTest from './ApiTest';
import { initialPart, upgradePart } from '../utils/partUtils';
import { useMining } from '../hooks/useMining';
import { useAchievements } from '../hooks/useAchievements';
import { LogOut } from 'lucide-react';

export default function Game() {
  const { user, logout, updateGameState } = useAuthStore();
  const [rig, setRig] = React.useState<MiningRig>({
    cpu: initialPart('CPU'),
    gpu: initialPart('GPU'),
    motherboard: initialPart('Motherboard'),
    powerSupply: initialPart('Power Supply'),
  });
  
  const { balance, setBalance, totalHashRate, totalPowerUsage, dailyProfit, stats, setStats } = useMining(rig);
  const { showNotification, lastUnlocked } = useAchievements();

  const handleUpgrade = (partKey: keyof MiningRig) => {
    setRig(prev => {
      const part = prev[partKey];
      if (balance < part.nextUpgradeCost) return prev;

      setBalance(b => b - part.nextUpgradeCost);
      setStats(s => ({ ...s, totalUpgrades: s.totalUpgrades + 1 }));
      return { ...prev, [partKey]: upgradePart(part) };
    });
  };

  useEffect(() => {
    const saveInterval = setInterval(() => {
      updateGameState({
        balance,
        stats,
        rig
      });
    }, 30000);

    return () => clearInterval(saveInterval);
  }, [balance, stats, rig, updateGameState]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-800 text-transparent bg-clip-text">
            Crypto Mining Simulator
          </h1>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* API Connection Test */}
        <div className="mb-8">
          <ApiTest />
        </div>
        
        <MiningStats
          hashRate={totalHashRate}
          balance={balance}
          powerUsage={totalPowerUsage}
          dailyProfit={dailyProfit}
        />
        
        <StatsPanel stats={stats} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(Object.entries(rig) as [keyof MiningRig, Part][]).map(([key, part]) => (
            <PartCard
              key={part.id}
              part={part}
              onUpgrade={() => handleUpgrade(key)}
              balance={balance}
            />
          ))}
        </div>

        <AchievementNotification 
          achievement={lastUnlocked}
          show={showNotification}
        />
      </div>
    </div>
  );
}