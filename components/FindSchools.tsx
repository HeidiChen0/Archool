import React, { useState } from 'react';
import SchoolCard from './SchoolCard';
import { MOCK_SCHOOLS } from '../constants';
import { Search, UserCheck } from 'lucide-react';

interface FindSchoolsProps {
  onSchoolClick: (id: string) => void;
  context?: 'school' | 'teacher';
}

const FindSchools: React.FC<FindSchoolsProps> = ({ onSchoolClick, context = 'school' }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSchools = MOCK_SCHOOLS.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isTeacherContext = context === 'teacher';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl font-bold text-slate-900 mb-4 flex items-center justify-center md:justify-start">
            {isTeacherContext && <UserCheck className="w-8 h-8 mr-3 text-[#F8CBA6]" />}
            {isTeacherContext ? 'Find Your Teacher' : 'Find Your School'}
        </h1>
        <p className="text-slate-600 mb-6 max-w-2xl text-lg">
            {isTeacherContext 
                ? "To find a specific teacher, first locate the school they teach at. Select a school below to view its faculty directory."
                : "Browse our complete directory of verified schools. Search by name or location to find the best educational environment for you."
            }
        </p>
        <div className="relative max-w-2xl">
          <input
            type="text"
            placeholder={isTeacherContext ? "Search for the school your teacher works at..." : "Search by school name or location..."}
            className="w-full pl-12 pr-4 py-4 rounded-xl border border-[#F8CBA6] bg-white focus:ring-2 focus:ring-[#F8CBA6] outline-none shadow-sm text-lg placeholder-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
        </div>
      </div>

      {filteredSchools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
          {filteredSchools.map(school => (
            <div key={school.id} className="relative group">
                {isTeacherContext && (
                    <div className="absolute -top-3 left-4 z-10 bg-slate-800 text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
                        Browse Teachers →
                    </div>
                )}
                <SchoolCard school={school} onClick={onSchoolClick} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#FFE7CC] rounded-2xl border border-[#F8CBA6] border-dashed">
          <p className="text-slate-700 text-lg font-medium">No schools found matching "{searchTerm}".</p>
          <button 
            onClick={() => setSearchTerm('')}
            className="mt-4 text-slate-600 hover:text-slate-900 underline"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
};

export default FindSchools;