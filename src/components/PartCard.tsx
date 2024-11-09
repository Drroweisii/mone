import React from 'react';
import { Part } from '../types';
import * as Icons from 'lucide-react';
import { Card } from './ui/Card';
import { formatNumber } from '../utils/calculations';

interface Props {
  part: Part;
  onUpgrade: () => void;
  balance: number;
}

export default function PartCard({ part, onUpgrade, balance }: Props) {
  const canUpgrade = balance >= part.nextUpgradeCost;
  const Icon = Icons[part.icon as keyof typeof Icons];
  
  return (
    <Card className="transition-all duration-300 hover:shadow-xl">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-100 rounded-xl">
            {Icon && <Icon className="w-7 h-7 text-indigo-600" />}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{part.name}</h3>
            <p className="text-sm text-gray-600">Level {part.level}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4 mb-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Hash Rate:</span>
            <span className="font-medium">{formatNumber(part.hashRate)} H/s</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-indigo-600 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min((part.hashRate / 1000) * 100, 100)}%` }}
            />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Power Usage:</span>
            <span className="font-medium">{part.powerUsage}W</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-amber-500 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min((part.powerUsage / 100) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>
      
      <button
        onClick={onUpgrade}
        disabled={!canUpgrade}
        className={`
          w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-300
          ${canUpgrade
            ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:from-indigo-700 hover:to-indigo-800 transform hover:-translate-y-1 hover:shadow-lg'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }
        `}
      >
        Upgrade (${formatNumber(part.nextUpgradeCost)})
      </button>
    </Card>
  );
}