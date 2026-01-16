import React, { useState } from 'react';
import { ArrowLeft, BookOpen, GraduationCap, Plus, Save, Tag, ShieldCheck, CheckSquare, Upload, Eye, EyeOff } from 'lucide-react';
import { MOCK_PROGRAMS, MOCK_COURSES } from '../constants';

interface UploadResourceFormProps {
  initialProgramId?: string | null;
  onCancel: () => void;
  onSubmit: (resource: { 
    title: string; 
    programId: string; 
    courseIds: string[]; 
    types: string[]; 
    showName: boolean;
  }) => void;
}

const UploadResourceForm: React.FC<UploadResourceFormProps> = ({ initialProgramId, onCancel, onSubmit }) => {
  const [programId, setProgramId] = useState(initialProgramId || '');
  const [title, setTitle] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [showName, setShowName] = useState(true);

  const availableTypes = ['Notes', 'Past Paper', 'Guide', 'Other'];
  
  const programCourses = MOCK_COURSES.filter(c => c.programId === programId);

  const toggleCourse = (id: string) => {
    setSelectedCourses(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const toggleType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (programId && title.trim() && selectedTypes.length > 0) {
      onSubmit({ 
        title: title.trim(), 
        programId, 
        courseIds: selectedCourses, 
        types: selectedTypes, 
        showName 
      });
    } else {
      alert("Please fill in the title and select at least one type.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <button 
        onClick={onCancel} 
        className="flex items-center text-slate-600 hover:text-slate-900 font-medium mb-6 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Resources
      </button>

      <div className="bg-[#FFE7CC] rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-[#F8CBA6] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Upload className="w-48 h-48 text-slate-900 rotate-12" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center mb-8">
            <div className="bg-slate-900 p-4 rounded-2xl mr-5 shadow-lg">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter leading-tight">
                Upload Resource
              </h1>
              <p className="text-slate-600 font-bold bg-white/50 px-3 py-1 rounded-lg inline-block mt-1">
                Share your knowledge with the community
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title */}
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-3 ml-1">
                Resource Name
              </label>
              <div className="relative">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="e.g. Physics HL Option B Summary Notes"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-[#F8CBA6] bg-[#FFFBEB] focus:ring-4 focus:ring-[#F8CBA6]/30 outline-none font-bold transition-all placeholder:font-normal placeholder:text-slate-400"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>

            {/* Program Selection */}
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-3 ml-1">
                Which Program?
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select 
                  value={programId}
                  onChange={(e) => {
                    setProgramId(e.target.value);
                    setSelectedCourses([]); // Reset courses when program changes
                  }}
                  className="w-full pl-12 pr-10 py-4 rounded-2xl border-2 border-[#F8CBA6] bg-[#FFFBEB] focus:ring-4 focus:ring-[#F8CBA6]/30 outline-none font-bold transition-all appearance-none"
                  required
                >
                  <option value="" disabled>Choose a Program</option>
                  {MOCK_PROGRAMS.map(program => (
                    <option key={program.id} value={program.id}>{program.name}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Multi-Type Selection */}
            <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-3 ml-1">
                    Resource Types (Select all that apply)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {availableTypes.map(type => (
                        <button
                            key={type}
                            type="button"
                            onClick={() => toggleType(type)}
                            className={`flex items-center justify-center p-3 rounded-xl border-2 transition-all font-black text-[10px] uppercase tracking-widest ${
                                selectedTypes.includes(type)
                                ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                                : 'bg-white border-[#F8CBA6] text-slate-400 hover:border-slate-400'
                            }`}
                        >
                            <CheckSquare className={`w-3 h-3 mr-2 ${selectedTypes.includes(type) ? 'text-white' : 'text-slate-200'}`} />
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Multi-Course Selection */}
            <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-3 ml-1">
                    Related Courses (Optional - Select all that apply)
                </label>
                {programId ? (
                    <div className="bg-[#FFFBEB] p-5 rounded-2xl border-2 border-[#F8CBA6] max-h-48 overflow-y-auto space-y-2 custom-scrollbar">
                        {programCourses.length > 0 ? (
                            programCourses.map(course => (
                                <button
                                    key={course.id}
                                    type="button"
                                    onClick={() => toggleCourse(course.id)}
                                    className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all text-left ${
                                        selectedCourses.includes(course.id)
                                        ? 'bg-white border-blue-600 shadow-sm'
                                        : 'bg-white border-transparent hover:border-[#F8CBA6]/50'
                                    }`}
                                >
                                    <span className={`text-sm font-bold ${selectedCourses.includes(course.id) ? 'text-blue-600' : 'text-slate-600'}`}>
                                        {course.name}
                                    </span>
                                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${selectedCourses.includes(course.id) ? 'bg-blue-600 border-blue-600' : 'border-slate-200'}`}>
                                        {selectedCourses.includes(course.id) && <Save className="w-3 h-3 text-white" />}
                                    </div>
                                </button>
                            ))
                        ) : (
                            <p className="text-center text-slate-400 text-xs font-bold py-4">No courses available for this program.</p>
                        )}
                    </div>
                ) : (
                    <div className="bg-[#FFFBEB] p-8 rounded-2xl border-2 border-dashed border-[#F8CBA6] text-center">
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Select a program first</p>
                    </div>
                )}
            </div>

            {/* Attribution Toggle */}
            <div className="bg-white/50 p-6 rounded-2xl border-2 border-[#F8CBA6] flex items-center justify-between group">
                <div className="flex items-center">
                    <div className={`p-3 rounded-xl mr-4 transition-all ${showName ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-200 text-slate-500'}`}>
                        {showName ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </div>
                    <div>
                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">Show my name as uploader</h4>
                        <p className="text-xs text-slate-500 font-medium">Otherwise, it will appear as "Anonymous"</p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={() => setShowName(!showName)}
                    className={`relative w-14 h-8 rounded-full transition-colors ${showName ? 'bg-blue-600' : 'bg-slate-300'}`}
                >
                    <div className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-md transition-transform ${showName ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </button>
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
                className="flex-1 bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-slate-800 transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl uppercase tracking-widest text-sm flex items-center justify-center group"
              >
                Upload Resource
                <Save className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <p className="mt-8 text-center text-xs text-slate-400 font-bold uppercase tracking-widest px-4 opacity-70 leading-relaxed flex items-center justify-center">
        <ShieldCheck className="w-4 h-4 mr-2" />
        All uploads are reviewed by moderators before becoming public.
      </p>
    </div>
  );
};

export default UploadResourceForm;