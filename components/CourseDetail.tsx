import React from 'react';
import { Review, Course } from '../types';
import { MOCK_COURSES, MOCK_PROGRAMS } from '../constants';
import { ArrowLeft, Brain, Clock, PenTool, BookOpen, Star, MessageCircle, UserCheck, ShieldCheck } from 'lucide-react';

interface CourseDetailProps {
  courseId: string;
  reviews: Review[];
  onBack: () => void;
  onRate: () => void;
  onGenerateSummary: () => void;
  isGeneratingSummary: boolean;
  summary: string | null;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ 
  courseId, 
  reviews, 
  onBack, 
  onRate, 
  onGenerateSummary, 
  isGeneratingSummary, 
  summary 
}) => {
  const course = MOCK_COURSES.find(c => c.id === courseId);
  const courseReviews = reviews.filter(r => r.targetId === courseId);
  const program = MOCK_PROGRAMS.find(p => p.id === course?.programId);

  if (!course) return <div className="p-12 text-center font-bold">Course not found</div>;

  const StarSmall = () => <svg className="w-3 h-3 ml-1 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pop-in">
      <button 
        onClick={onBack} 
        className="flex items-center text-slate-600 hover:text-slate-900 font-medium mb-6 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Program
      </button>

      <div className="bg-[#FFE7CC] rounded-3xl p-8 md:p-12 shadow-sm border-4 border-[#F8CBA6] mb-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-2">
                <span className="bg-[#ECF9FF] text-blue-900 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border border-blue-200">
                    {program?.name} Course
                </span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-tight">
                {course.name}
            </h1>
            <p className="text-slate-600 font-bold mt-1">Difficulty & Student Sentiment Overview</p>
          </div>
          
          <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-sm border-2 border-[#F8CBA6] min-w-[140px]">
            <span className="text-4xl font-black text-slate-900 leading-none">{course.ratings.overall.toFixed(1)}</span>
            <div className="flex text-yellow-400 my-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.round(course.ratings.overall) ? 'fill-current' : ''}`} />
                ))}
            </div>
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{courseReviews.length} Reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Difficulty', value: course.ratings.difficulty, icon: Brain, color: 'text-red-500' },
            { label: 'Time', value: course.ratings.timeConsuming, icon: Clock, color: 'text-orange-500' },
            { label: 'Homework', value: course.ratings.homework, icon: PenTool, color: 'text-yellow-600' },
            { label: 'Self-study', value: course.ratings.selfStudibility, icon: BookOpen, color: 'text-green-600' }
          ].map(rating => (
            <div key={rating.label} className="bg-[#FFFBEB] p-4 rounded-xl border-2 border-[#F8CBA6] text-center group hover:scale-105 transition-transform">
                <rating.icon className={`w-5 h-5 mx-auto mb-2 ${rating.color}`} />
                <div className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1">{rating.label}</div>
                <div className="text-2xl font-black text-slate-900">{rating.value.toFixed(1)}</div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center border-t-2 border-[#F8CBA6]/30 pt-8">
          <button 
            onClick={onRate}
            className="bg-[#F8CBA6] text-slate-900 px-8 py-3 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-[#E5B895] transition-all transform hover:scale-105 shadow-lg active:scale-95"
          >
            Rate Course
          </button>
          
          <div className="flex items-center text-slate-500 text-xs font-bold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 mr-2" />
            Verified Content
          </div>
        </div>
      </div>

      {/* AI Summary Section */}
      <div className="bg-[#ECF9FF] rounded-3xl p-8 text-slate-900 mb-8 shadow-lg border-4 border-blue-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <MessageCircle className="w-32 h-32" />
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 relative z-10">
            <div className="flex items-center">
                <div className="bg-white p-3 rounded-2xl mr-4 shadow-sm">
                    <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <h3 className="font-black text-xl uppercase tracking-tighter">AI Review Insights</h3>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Student Consensus Summary</p>
                </div>
            </div>
            {!summary && (
                <button 
                    onClick={onGenerateSummary}
                    disabled={isGeneratingSummary}
                    className="bg-white text-blue-600 border-2 border-blue-100 px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-50 disabled:opacity-50 transition-all shadow-sm"
                >
                    {isGeneratingSummary ? 'Analyzing...' : 'Generate Summary'}
                </button>
            )}
        </div>
        
        {summary && (
            <div className="bg-white/60 p-6 rounded-2xl border-2 border-white animate-fadeIn text-sm leading-relaxed whitespace-pre-line font-medium text-slate-700 relative z-10">
                {summary}
            </div>
        )}
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Student Comments</h3>
        {courseReviews.length === 0 ? (
          <div className="bg-[#FFFBEB] p-12 rounded-2xl border-2 border-dashed border-[#F8CBA6] text-center">
             <MessageCircle className="w-10 h-10 text-[#F8CBA6] mx-auto mb-3 opacity-50" />
             <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No comments yet. Be the first to share your experience!</p>
          </div>
        ) : (
          courseReviews.map(review => (
            <div key={review.id} className="bg-white p-8 rounded-3xl border-2 border-[#F8CBA6]/30 shadow-sm hover:shadow-md transition-shadow relative">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm mr-4 shadow-sm ${review.verifiedStudent ? 'bg-green-100 text-green-700' : 'bg-[#FFFBEB] text-slate-400'}`}>
                            {review.authorName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <div className="font-black text-slate-900 flex items-center tracking-tight">
                                {review.authorName}
                                {review.verifiedStudent && (
                                    <span className="ml-2 flex items-center bg-green-50 text-green-600 text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest border border-green-100">
                                        <UserCheck className="w-2.5 h-2.5 mr-1" />
                                        Verified Student
                                    </span>
                                )}
                            </div>
                            <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">{review.date}</div>
                        </div>
                    </div>
                    <div className="bg-[#FFFBEB] text-slate-900 px-3 py-1.5 rounded-xl text-sm font-black flex items-center border-2 border-[#F8CBA6]">
                        {review.rating} <StarSmall />
                    </div>
                </div>
                <p className="text-slate-700 leading-relaxed font-medium">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CourseDetail;