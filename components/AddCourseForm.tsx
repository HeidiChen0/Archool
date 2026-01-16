import React, { useState } from 'react';
import { ArrowLeft, BookOpen, GraduationCap, Plus, Save } from 'lucide-react';
import { MOCK_PROGRAMS } from '../constants';

interface AddCourseFormProps {
  initialProgramId?: string | null;
  onCancel: () => void;
  onSubmit: (course: { programId: string; name: string }) => void;
}

const AddCourseForm: React.FC<AddCourseFormProps> = ({ initialProgramId, onCancel, onSubmit }) => {
  const [programId, setProgramId] = useState(initialProgramId || '');
  const [courseName, setCourseName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (programId && courseName.trim()) {
      onSubmit({ programId, name: courseName.trim() });
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <button 
        onClick={onCancel} 
        className="flex items-center text-slate-600 hover:text-slate-900 font-medium mb-6 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Program Center
      </button>

      <div className="bg-[#FFE7CC] rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-[#F8CBA6] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <BookOpen className="w-48 h-48 text-slate-900 rotate-12" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center mb-8">
            <div className="bg-[#F8CBA6] p-4 rounded-2xl mr-5 shadow-lg">
              <Plus className="w-8 h-8 text-slate-900" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter leading-tight">
                Add a Class
              </h1>
              <p className="text-slate-600 font-bold bg-white/50 px-3 py-1 rounded-lg inline-block mt-1">
                Expand the Program Catalog
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-3 ml-1">
                Select Program
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select 
                  value={programId}
                  onChange={(e) => setProgramId(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-[#F8CBA6] bg-[#FFFBEB] focus:ring-4 focus:ring-[#F8CBA6]/30 outline-none font-bold transition-all appearance-none"
                  required
                >
                  <option value="" disabled>Choose a Program</option>
                  {MOCK_PROGRAMS.map(program => (
                    <option key={program.id} value={program.id}>{program.name} ({program.description})</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-3 ml-1">
                Class Name
              </label>
              <div className="relative">
                <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="e.g. Physics HL, AP Literature, Biology 101"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-[#F8CBA6] bg-[#FFFBEB] focus:ring-4 focus:ring-[#F8CBA6]/30 outline-none font-bold transition-all placeholder:font-normal placeholder:text-slate-400"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </div>
            </div>

            <div className="pt-6 border-t-2 border-[#F8CBA6]/30 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                type="button" 
                onClick={onCancel} 
                className="flex-1 bg-white text-slate-700 border-2 border-[#F8CBA6] font-black py-4 rounded-2xl hover:bg-[#FFFBEB] transition-colors uppercase tracking-widest text-sm shadow-sm"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="flex-1 bg-[#F8CBA6] text-slate-900 border-2 border-slate-900/10 font-black py-4 rounded-2xl hover:bg-[#E5B895] transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl uppercase tracking-widest text-sm flex items-center justify-center group"
              >
                Save Class
                <Save className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <p className="mt-8 text-center text-xs text-slate-400 font-bold uppercase tracking-widest px-4 opacity-70 leading-relaxed">
        Adding a class allows other students to start leaving verified reviews and sharing resources.
      </p>
    </div>
  );
};

export default AddCourseForm;