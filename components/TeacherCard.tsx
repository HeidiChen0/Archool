import React from 'react';
import { Teacher } from '../types';
import { BookOpen, Star } from 'lucide-react';

interface TeacherCardProps {
  teacher: Teacher;
  onClick: (id: string) => void;
}

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher, onClick }) => {
  return (
    <div 
      className="bg-[#FFE7CC] rounded-lg border border-[#F8CBA6] p-4 hover:border-slate-400 transition-colors cursor-pointer group"
      onClick={() => onClick(teacher.id)}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold text-slate-900 group-hover:text-slate-700 transition-colors">{teacher.name}</h4>
          <div className="flex items-center text-slate-500 text-xs mt-1">
            <BookOpen className="w-3 h-3 mr-1" />
            {teacher.subject} • {teacher.department}
          </div>
        </div>
        <div className="flex flex-col items-end">
             <div className="flex items-center bg-[#ECF9FF] px-2 py-1 rounded-lg">
                <span className="font-bold text-slate-900 text-sm">{teacher.ratings.overall.toFixed(1)}</span>
                <Star className="w-3 h-3 text-yellow-500 ml-1 fill-current" />
             </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mt-4">
        <div className="bg-[#FFFBEB] p-2 rounded text-center">
            <div className="text-xs text-slate-500 uppercase font-semibold">Difficulty</div>
            <div className="font-mono text-sm font-bold text-slate-700">{teacher.ratings.difficulty}</div>
        </div>
        <div className="bg-[#FFFBEB] p-2 rounded text-center">
            <div className="text-xs text-slate-500 uppercase font-semibold">Friendliness</div>
            <div className="font-mono text-sm font-bold text-slate-700">{teacher.ratings.friendliness}</div>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;