import React from 'react';
import { ArrowLeft, MessageCircle, UserCheck, Star } from 'lucide-react';
import { Review } from '../types';
import { MOCK_SCHOOLS } from '../constants';

interface SchoolCommentsProps {
  schoolId: string;
  reviews: Review[];
  onBack: () => void;
  onAddComment: () => void;
}

const SchoolComments: React.FC<SchoolCommentsProps> = ({ schoolId, reviews, onBack, onAddComment }) => {
  const school = MOCK_SCHOOLS.find(s => s.id === schoolId);
  const schoolReviews = reviews.filter(r => r.targetId === schoolId && r.targetType === 'School');

  const StarSmall = () => <svg className="w-3 h-3 ml-1 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pop-in">
      <button 
        onClick={onBack} 
        className="flex items-center text-slate-600 hover:text-slate-900 font-medium mb-6 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to School Profile
      </button>

      <div className="bg-[#FFE7CC] rounded-3xl p-8 md:p-12 shadow-sm border-4 border-[#F8CBA6] mb-8">
        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-2">
          General Comments
        </h1>
        <p className="text-slate-600 font-bold mb-8">
          What the community is saying about {school?.name || 'this school'}
        </p>

        <button 
          onClick={onAddComment}
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-slate-800 transition-all transform hover:scale-105 shadow-xl flex items-center mb-12"
        >
          <MessageCircle className="w-5 h-5 mr-3" />
          Make a Comment
        </button>

        <div className="space-y-6">
          {schoolReviews.length === 0 ? (
            <div className="bg-[#FFFBEB] p-12 rounded-2xl border-2 border-dashed border-[#F8CBA6] text-center">
               <MessageCircle className="w-10 h-10 text-[#F8CBA6] mx-auto mb-3 opacity-50" />
               <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No general comments yet. Be the first to start the conversation!</p>
            </div>
          ) : (
            schoolReviews.map(review => (
              <div key={review.id} className="bg-white p-8 rounded-3xl border-2 border-[#F8CBA6]/30 shadow-sm hover:shadow-md transition-shadow">
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
                            Verified
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
    </div>
  );
};

export default SchoolComments;