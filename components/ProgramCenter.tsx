import React, { useState } from 'react';
import { MOCK_PROGRAMS, MOCK_COURSES } from '../constants';
import { BookOpen, Clock, PenTool, Brain, Library, Plus, Star } from 'lucide-react';
import Resources from './Resources';

interface ProgramCenterProps {
  selectedProgramId: string | null;
  onSelectProgram: (id: string | null) => void;
  onAddCourse: (programId: string | null) => void;
  onCourseClick?: (courseId: string) => void;
  onUploadResource?: (programId: string) => void;
}

const ProgramCenter: React.FC<ProgramCenterProps> = ({ 
  selectedProgramId, 
  onSelectProgram, 
  onAddCourse, 
  onCourseClick, 
  onUploadResource 
}) => {
    const [activeTab, setActiveTab] = useState<'courses' | 'resources'>('courses');
    // To auto-filter resources when clicking "Resources" from a course card
    const [preSelectedCourseId, setPreSelectedCourseId] = useState<string | null>(null);

    const selectedProgram = MOCK_PROGRAMS.find(p => p.id === selectedProgramId);
    const courses = MOCK_COURSES.filter(c => c.programId === selectedProgramId);

    const handleBack = () => {
        onSelectProgram(null);
        setActiveTab('courses');
        setPreSelectedCourseId(null);
    };

    const handleViewCourseResources = (e: React.MouseEvent, courseId: string) => {
        e.stopPropagation();
        setPreSelectedCourseId(courseId);
        setActiveTab('resources');
    };

    const handleRateCourse = (e: React.MouseEvent, courseId: string) => {
        e.stopPropagation();
        if (onCourseClick) onCourseClick(courseId);
    };

    const handleUploadRequest = (pId: string) => {
        if (onUploadResource) onUploadResource(pId);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-slate-900 mb-8 text-center">Program Centers</h1>
            
            {!selectedProgramId ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {MOCK_PROGRAMS.map(program => (
                        <div 
                            key={program.id} 
                            onClick={() => onSelectProgram(program.id)}
                            className="bg-[#FFE7CC] p-10 rounded-2xl border border-[#F8CBA6] cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all text-center flex flex-col justify-center items-center h-full min-h-[250px]"
                        >
                            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">{program.name}</h2>
                            <p className="text-slate-600 text-lg">{program.description}</p>
                            <div className="mt-8 inline-block bg-[#FFFBEB] text-slate-900 px-6 py-2 rounded-full font-bold text-sm border border-[#F8CBA6] hover:bg-[#F8CBA6] transition-colors">
                                View Program
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <button 
                        onClick={handleBack} 
                        className="text-slate-600 hover:text-slate-900 font-medium mb-6 flex items-center"
                    >
                        <span className="mr-2">←</span> Back to Programs
                    </button>
                    
                    <div className="bg-[#FFE7CC] p-8 rounded-2xl border border-[#F8CBA6] mb-8 relative">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <h2 className="text-3xl font-bold text-slate-900">{selectedProgram?.name}</h2>
                            <p className="text-slate-600 text-lg mt-2">{selectedProgram?.description}</p>
                          </div>
                          <button 
                            onClick={() => onAddCourse(selectedProgramId)}
                            className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center shadow-lg"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add a Class
                          </button>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex border-b border-[#F8CBA6] mb-8">
                        <button 
                            className={`pb-3 px-6 font-bold text-lg transition-colors ${activeTab === 'courses' ? 'text-slate-900 border-b-4 border-[#F8CBA6]' : 'text-slate-400 hover:text-slate-700'}`}
                            onClick={() => { setActiveTab('courses'); setPreSelectedCourseId(null); }}
                        >
                            Course Ratings
                        </button>
                        <button 
                            className={`pb-3 px-6 font-bold text-lg transition-colors ${activeTab === 'resources' ? 'text-slate-900 border-b-4 border-[#F8CBA6]' : 'text-slate-400 hover:text-slate-700'}`}
                            onClick={() => setActiveTab('resources')}
                        >
                            Resources
                        </button>
                    </div>
                    
                    {activeTab === 'courses' ? (
                        <>
                            {courses.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
                                    {courses.map(course => (
                                        <div 
                                            key={course.id} 
                                            onClick={() => onCourseClick && onCourseClick(course.id)}
                                            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group hover:border-[#F8CBA6]"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <h4 className="font-bold text-lg text-slate-900 group-hover:text-slate-700">{course.name}</h4>
                                                <div className="flex items-center bg-[#ECF9FF] px-2 py-1 rounded-lg">
                                                    <span className="font-bold text-slate-900 text-sm">{course.ratings.overall.toFixed(1)}</span>
                                                    <Star className="w-3 h-3 text-yellow-500 ml-1 fill-current" />
                                                </div>
                                            </div>
                                            <div className="space-y-3 mb-6">
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="flex items-center text-slate-500"><Brain className="w-4 h-4 mr-2" /> Difficulty</span>
                                                    <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden">
                                                        <div className="bg-red-400 h-full" style={{ width: `${(course.ratings.difficulty / 5) * 100}%` }}></div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="flex items-center text-slate-500"><Clock className="w-4 h-4 mr-2" /> Time</span>
                                                    <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden">
                                                        <div className="bg-orange-400 h-full" style={{ width: `${(course.ratings.timeConsuming / 5) * 100}%` }}></div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="flex items-center text-slate-500"><PenTool className="w-4 h-4 mr-2" /> Homework</span>
                                                    <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden">
                                                        <div className="bg-yellow-400 h-full" style={{ width: `${(course.ratings.homework / 5) * 100}%` }}></div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="flex items-center text-slate-500"><BookOpen className="w-4 h-4 mr-2" /> Self-study</span>
                                                    <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden">
                                                        <div className="bg-green-400 h-full" style={{ width: `${(course.ratings.selfStudibility / 5) * 100}%` }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex space-x-2">
                                                <button 
                                                    onClick={(e) => handleRateCourse(e, course.id)}
                                                    className="flex-1 bg-[#FFFBEB] text-slate-900 border border-[#F8CBA6] py-2 rounded-lg font-bold text-xs hover:bg-[#F8CBA6] transition-colors"
                                                >
                                                    Rate
                                                </button>
                                                <button 
                                                    onClick={(e) => handleViewCourseResources(e, course.id)}
                                                    className="flex-1 bg-[#ECF9FF] text-blue-900 border border-blue-100 py-2 rounded-lg font-bold text-xs hover:bg-blue-100 transition-colors flex items-center justify-center"
                                                >
                                                    <Library className="w-3 h-3 mr-1" />
                                                    Resources
                                                </button>
                                            </div>
                                            <div className="mt-3 pt-3 border-t border-slate-100 text-center">
                                                 <span className="text-xs text-slate-400 font-bold uppercase tracking-widest group-hover:text-[#F8CBA6] transition-colors">View Student Comments</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-[#FFFBEB] p-12 rounded-xl border border-[#F8CBA6] border-dashed text-center">
                                    <BookOpen className="w-12 h-12 text-[#F8CBA6] mx-auto mb-4" />
                                    <p className="text-slate-600 font-medium">No courses rated yet for {selectedProgram?.name}.</p>
                                    <button 
                                      onClick={() => onAddCourse(selectedProgramId)}
                                      className="mt-4 text-[#F8CBA6] font-bold hover:underline"
                                    >
                                      Be the first to add a class
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <Resources 
                            programId={selectedProgramId} 
                            preSelectedCourseId={preSelectedCourseId} 
                            onUploadRequest={handleUploadRequest} 
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default ProgramCenter;
