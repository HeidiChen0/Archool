import React from 'react';
import { School } from '../types';
import { MapPin, Star } from 'lucide-react';

interface SchoolCardProps {
  school: School;
  onClick: (id: string) => void;
}

const SchoolCard: React.FC<SchoolCardProps> = ({ school, onClick }) => {
  return (
    <div 
      className="bg-[#FFE7CC] rounded-xl shadow-sm border border-[#F8CBA6] overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full"
      onClick={() => onClick(school.id)}
    >
      <div className="h-40 overflow-hidden relative">
        <img src={school.imageUrl} alt={school.name} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" />
        <div className="absolute bottom-2 right-2 bg-[#FFFBEB]/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-slate-700 shadow-sm">
          {school.type}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-slate-900 mb-1">{school.name}</h3>
        <div className="flex items-center text-slate-500 text-sm mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          {school.location}
        </div>
        <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-grow">{school.description}</p>
        
        <div className="flex items-center justify-between border-t border-[#F8CBA6] pt-3">
            <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="ml-1 font-bold text-slate-800">{school.ratings.overall.toFixed(1)}</span>
                <span className="ml-1 text-xs text-slate-500">Overall</span>
            </div>
            <div className="flex space-x-1">
                {school.features.slice(0, 2).map((feature, idx) => (
                    <span key={idx} className="text-[10px] bg-[#ECF9FF] text-slate-800 px-2 py-1 rounded-full">{feature}</span>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolCard;