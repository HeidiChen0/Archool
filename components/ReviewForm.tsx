import React, { useState } from 'react';
import { Sparkles, Send, AlertCircle } from 'lucide-react';
import { analyzeReviewDraft } from '../services/geminiService';

interface ReviewFormProps {
  targetName: string;
  // Added 'Course' to allow reviews for courses in the Program Center
  targetType: 'School' | 'Teacher' | 'Course';
  onSubmit: (rating: number, comment: string) => void;
  onCancel: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ targetName, targetType, onSubmit, onCancel }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);

  const handleAIAnalysis = async () => {
    if (!comment.trim()) return;
    setIsAnalyzing(true);
    const feedback = await analyzeReviewDraft(comment, targetType);
    setAiFeedback(feedback);
    setIsAnalyzing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0 && comment.trim().length > 10) {
      onSubmit(rating, comment);
    }
  };

  return (
    <div className="bg-[#FFE7CC] rounded-xl shadow-lg border border-[#F8CBA6] p-6 max-w-2xl mx-auto">
      <h3 className="text-xl font-bold text-slate-900 mb-2">Reviewing: {targetName}</h3>
      <p className="text-sm text-slate-500 mb-6">Your feedback helps the community. Please be specific, fair, and constructive.</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">Overall Rating</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  rating >= star ? 'bg-yellow-400 text-white scale-110' : 'bg-[#FFFBEB] text-slate-400 hover:bg-[#F8CBA6]'
                }`}
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Your Review
            <span className="text-slate-400 font-normal ml-2">(Describe - Evaluate - Suggest)</span>
          </label>
          <textarea
            className="w-full p-3 border border-[#F8CBA6] bg-[#FFFBEB] rounded-lg focus:ring-2 focus:ring-[#F8CBA6] focus:border-[#F8CBA6] min-h-[150px]"
            placeholder="e.g. The class was challenging but rewarding. The exams are fair if you study the homework. I suggest attending office hours..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        {/* AI Helper Section */}
        <div className="mb-6 bg-[#ECF9FF] rounded-lg p-4 border border-blue-100">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center text-slate-800 font-medium text-sm">
                    <Sparkles className="w-4 h-4 mr-2" />
                    AI Writing Assistant
                </div>
                <button 
                    type="button"
                    onClick={handleAIAnalysis}
                    disabled={isAnalyzing || !comment}
                    className="text-xs bg-[#FFFBEB] text-slate-800 border border-[#F8CBA6] px-3 py-1 rounded-full hover:bg-[#F8CBA6] disabled:opacity-50"
                >
                    {isAnalyzing ? 'Analyzing...' : 'Analyze Draft'}
                </button>
            </div>
            
            {aiFeedback ? (
                <div className="text-sm text-slate-700 bg-[#FFFBEB] p-3 rounded border border-[#F8CBA6] animate-fadeIn">
                    <p className="font-semibold text-xs text-slate-500 uppercase mb-1">Feedback</p>
                    {aiFeedback}
                </div>
            ) : (
                <p className="text-xs text-slate-500 italic">
                    Not sure what to say? Write a rough draft and click "Analyze Draft" for tips.
                </p>
            )}
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-[#F8CBA6]">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-slate-600 font-medium hover:bg-[#FFFBEB] rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={rating === 0 || comment.length < 10}
            className="flex items-center px-6 py-2 bg-[#F8CBA6] text-slate-900 font-medium rounded-lg hover:bg-[#E5B895] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            <Send className="w-4 h-4 mr-2" />
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;