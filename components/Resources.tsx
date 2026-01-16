import React, { useState, useEffect } from 'react';
import { ExternalLink, Lock, Search, Tag, Filter, Plus, BookOpen, Upload, User } from 'lucide-react';
import { MOCK_RESOURCES, MOCK_COURSES } from '../constants';

interface ResourcesProps {
    programId?: string;
    preSelectedCourseId?: string | null;
    onUploadRequest: (programId: string) => void;
}

const Resources: React.FC<ResourcesProps> = ({ programId, preSelectedCourseId, onUploadRequest }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState<string>('All');
    const [selectedCourse, setSelectedCourse] = useState<string>(preSelectedCourseId || 'All');

    useEffect(() => {
        if (preSelectedCourseId) {
            setSelectedCourse(preSelectedCourseId);
        }
    }, [preSelectedCourseId]);

    // Filter resources based on program, search, type, and course
    const filteredResources = MOCK_RESOURCES.filter(res => {
        // 1. Filter by Program
        if (programId && res.programId !== programId) return false;

        // 2. Filter by Search Term
        if (searchTerm && !res.title.toLowerCase().includes(searchTerm.toLowerCase()) && !res.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))) return false;

        // 3. Filter by Type
        if (selectedType !== 'All' && !res.type.includes(selectedType as any)) return false;
        
        // 4. Filter by Course (if selected)
        if (selectedCourse !== 'All') {
            if (Array.isArray(res.courseId)) {
                if (!res.courseId.includes(selectedCourse)) return false;
            } else {
                if (res.courseId !== selectedCourse) return false;
            }
        }

        return true;
    });

    const resourceTypes = ['All', 'Notes', 'Past Paper', 'Guide', 'Other'];
    
    // Get courses for this program to populate filter dropdown
    const programCourses = MOCK_COURSES.filter(c => c.programId === programId);

    const handleUploadClick = () => {
        if (programId) onUploadRequest(programId);
    };

    return (
        <div className="animate-fadeIn">
            <div className="mb-8">
                <div className="bg-[#FFFBEB] p-6 rounded-3xl border-2 border-[#F8CBA6] mb-8 shadow-sm">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex-1 flex flex-col sm:flex-row gap-4">
                            {/* Course Selection Dropdown */}
                            <div className="flex-1 relative">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Which Course?</label>
                                <div className="relative">
                                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <select 
                                        value={selectedCourse}
                                        onChange={(e) => setSelectedCourse(e.target.value)}
                                        className="w-full pl-10 pr-10 py-3.5 rounded-2xl border-2 border-[#F8CBA6] bg-white focus:ring-4 focus:ring-[#F8CBA6]/20 outline-none font-bold appearance-none transition-all"
                                    >
                                        <option value="All">All Courses</option>
                                        {programCourses.map(course => (
                                            <option key={course.id} value={course.id}>{course.name}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Search Input */}
                            <div className="flex-1 relative">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Keyword Search</label>
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input 
                                        type="text" 
                                        placeholder="Search topics, papers..." 
                                        className="w-full pl-10 pr-4 py-3.5 rounded-2xl border-2 border-[#F8CBA6] bg-white focus:ring-4 focus:ring-[#F8CBA6]/20 outline-none font-bold placeholder:font-normal placeholder:text-slate-300 transition-all"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Upload Button */}
                        <div className="flex items-end">
                            <button 
                                onClick={handleUploadClick}
                                className="w-full lg:w-auto bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all transform hover:scale-105 active:scale-95 shadow-xl flex items-center justify-center group border-2 border-slate-900"
                            >
                                <Upload className="w-4 h-4 mr-2 group-hover:-translate-y-1 transition-transform" />
                                upload your own resources for others
                            </button>
                        </div>
                    </div>
                    
                    {/* Visual Tags for Quick Type Selection */}
                    <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-[#F8CBA6]/30">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">Filter by Type:</span>
                        {resourceTypes.map(type => (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={`text-[10px] px-4 py-1.5 rounded-full border-2 transition-all font-black uppercase tracking-widest ${
                                    selectedType === type 
                                    ? 'bg-[#F8CBA6] text-slate-900 border-[#F8CBA6] shadow-sm' 
                                    : 'bg-white text-slate-400 border-slate-100 hover:border-[#F8CBA6] hover:text-[#F8CBA6]'
                                }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-[#FFE7CC] rounded-3xl p-8 border-4 border-[#F8CBA6] shadow-sm">
                    <div className="space-y-4">
                        {filteredResources.length > 0 ? (
                            filteredResources.map((res) => (
                                <div key={res.id} className="bg-white p-5 rounded-2xl border-2 border-[#F8CBA6]/20 flex flex-col sm:flex-row sm:justify-between sm:items-center hover:shadow-lg hover:border-[#F8CBA6] transition-all cursor-pointer group relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-[#F8CBA6] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="mb-4 sm:mb-0">
                                        <h3 className="font-black text-slate-900 group-hover:text-slate-700 transition-colors tracking-tight text-lg">{res.title}</h3>
                                        <div className="flex flex-wrap gap-2 mt-2.5">
                                            {res.type.map(t => (
                                                <span key={t} className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100 flex items-center">
                                                    <Tag className="w-3 h-3 mr-1.5" />
                                                    {t}
                                                </span>
                                            ))}
                                            {res.tags.map(tag => (
                                                <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between sm:justify-end gap-6">
                                        <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400 italic">
                                            <User className="w-3 h-3 mr-1.5 opacity-50" />
                                            via {res.source}
                                        </div>
                                        <div className="bg-[#FFFBEB] p-2.5 rounded-xl border border-[#F8CBA6] group-hover:bg-[#F8CBA6] transition-colors">
                                            <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-20 bg-white/50 rounded-2xl border-2 border-dashed border-[#F8CBA6]/50">
                                <Search className="w-12 h-12 text-[#F8CBA6]/30 mx-auto mb-4" />
                                <p className="text-slate-500 font-black uppercase tracking-widest text-sm">No resources found matching your search.</p>
                                <button 
                                    onClick={() => {setSearchTerm(''); setSelectedType('All'); setSelectedCourse('All');}}
                                    className="text-blue-600 font-black uppercase tracking-widest text-xs mt-3 hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 bg-slate-900 rounded-2xl p-8 text-white text-center relative overflow-hidden shadow-2xl">
                        <div className="absolute -top-10 -right-10 opacity-10">
                            <Lock className="w-40 h-40 text-white" />
                        </div>
                        <div className="relative z-10">
                            <div className="bg-yellow-400 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg rotate-12">
                                <Lock className="w-6 h-6 text-slate-900" />
                            </div>
                            <h3 className="font-black text-2xl uppercase tracking-tighter mb-2">Unlock Pro Resources</h3>
                            <p className="text-slate-400 font-medium mb-6 max-w-sm mx-auto">Access 5,000+ curated past papers, leaked guides, and top-tier student notes.</p>
                            <button className="bg-[#F8CBA6] text-slate-900 px-10 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-[#E5B895] transition-all transform hover:scale-105 active:scale-95 shadow-xl">
                                Get Lifetime Access
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resources;