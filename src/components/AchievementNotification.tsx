import React from 'react';
import { Achievement } from '../types';
import * as Icons from 'lucide-react';

interface Props {
  achievement: Achievement | null;
  show: boolean;
}

export default function AchievementNotification({ achievement, show }: Props) {
  if (!show || !achievement) return null;

  const Icon = Icons[achievement.icon as keyof typeof Icons];

  return (
    <div 
      className={`
        fixed bottom-4 right-4 bg-gradient-to-r from-indigo-600 to-indigo-700
        text-white px-6 py-4 rounded-lg shadow-lg transform transition-all duration-500
        ease-out flex items-center gap-4 animate-gradient bg-[length:200%_200%]
        ${show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
      `}
    >
      <div className="p-2 bg-white/10 rounded-lg">
        {Icon && <Icon className="w-6 h-6" />}
      </div>
      <div>
        <h4 className="font-bold text-lg">{achievement.title}</h4>
        <p className="text-sm opacity-90">{achievement.description}</p>
      </div>
    </div>
  );
}