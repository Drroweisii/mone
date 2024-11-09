import React from 'react';
import { Cpu, Coins, Zap, TrendingUp } from 'lucide-react';
import { Card } from './ui/Card';
import { formatNumber } from '../utils/calculations';

interface Props {
  hashRate: number;
  balance: number;
  powerUsage: number;
  dailyProfit: number;
}

export default function MiningStats({ hashRate, balance, powerUsage, dailyProfit }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <Card gradient className="from-purple-600 via-purple-500 to-purple-700 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-white/10 rounded-lg">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold">Hash Rate</h3>
        </div>
        <p className="text-3xl font-bold">{formatNumber(hashRate)} H/s</p>
      </Card>
      
      <Card gradient className="from-emerald-600 via-emerald-500 to-emerald-700 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-white/10 rounded-lg">
            <Coins className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold">Balance</h3>
        </div>
        <p className="text-3xl font-bold">${formatNumber(balance, 3)}</p>
      </Card>
      
      <Card gradient className="from-amber-600 via-amber-500 to-amber-700 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-white/10 rounded-lg">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold">Power Usage</h3>
        </div>
        <p className="text-3xl font-bold">{powerUsage}W</p>
        <p className="text-sm opacity-75">${formatNumber(powerUsage * 0.00012 * 24, 2)}/day</p>
      </Card>

      <Card gradient className="from-blue-600 via-blue-500 to-blue-700 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-white/10 rounded-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold">Daily Profit</h3>
        </div>
        <p className="text-3xl font-bold">${formatNumber(dailyProfit, 3)}</p>
      </Card>
    </div>
  );
}