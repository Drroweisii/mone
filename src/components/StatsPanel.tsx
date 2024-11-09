import React from 'react';
import { Stats } from '../types';
import { Clock, TrendingUp, Award } from 'lucide-react';
import { Card } from './ui/Card';
import { formatNumber } from '../utils/calculations';

interface Props {
  stats: Stats;
}

export default function StatsPanel({ stats }: Props) {
  const runtime = Math.floor((Date.now() - stats.startTime) / 1000);
  const minutes = Math.floor(runtime / 60);
  const seconds = runtime % 60;
  
  return (
    <Card className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Mining Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-indigo-600" />
          <div>
            <p className="text-sm text-gray-600">Runtime</p>
            <p className="font-semibold">
              {minutes}m {seconds}s
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-indigo-600" />
          <div>
            <p className="text-sm text-gray-600">Peak Hash Rate</p>
            <p className="font-semibold">{formatNumber(stats.peakHashRate)} H/s</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Award className="w-5 h-5 text-indigo-600" />
          <div>
            <p className="text-sm text-gray-600">Total Mined</p>
            <p className="font-semibold">${formatNumber(stats.totalMined, 3)}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}