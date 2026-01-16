import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Lock, Sparkles, Chrome, Apple } from 'lucide-react';

interface SignInProps {
  onLoginSuccess: () => void;
  onCancel: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onLoginSuccess, onCancel }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would handle actual auth
    onLoginSuccess();
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <button 
        onClick={onCancel}
        className="flex items-center text-slate-600 hover:text-slate-900 font-medium mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Archool
      </button>

      <div className="bg-[#FFE7CC] rounded-3xl p-8 border-4 border-[#F8CBA6] shadow-2xl relative overflow-hidden">
        {/* Subtle Background Accent */}
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <Sparkles className="w-24 h-24 text-slate-900" />
        </div>

        <div className="text-center mb-8 relative z-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2 uppercase">
            {isSignUp ? 'Join the Club' : 'Welcome Back'}
          </h1>
          <p className="text-slate-600 font-medium">
            {isSignUp ? 'Start writing verified reviews' : 'Sign in to your account'}
          </p>
        </div>

        {/* Social Buttons - Just for show */}
        <div className="space-y-3 mb-8">
            <button className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-slate-200 py-3 rounded-2xl hover:bg-slate-50 transition-colors font-bold text-slate-700 shadow-sm">
                <Chrome className="w-5 h-5" />
                <span>Continue with Google</span>
            </button>
            <button className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-slate-200 py-3 rounded-2xl hover:bg-slate-50 transition-colors font-bold text-slate-700 shadow-sm">
                <Apple className="w-5 h-5" />
                <span>Continue with Apple</span>
            </button>
        </div>

        <div className="relative flex items-center mb-8">
            <div className="flex-grow border-t border-slate-300"></div>
            <span className="flex-shrink mx-4 text-slate-400 font-black text-xs uppercase tracking-widest">or email</span>
            <div className="flex-grow border-t border-slate-300"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          {isSignUp && (
            <div className="relative">
                <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Alex Chen"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-[#F8CBA6] bg-[#FFFBEB] focus:ring-4 focus:ring-[#F8CBA6]/30 outline-none font-bold transition-all"
                        required={isSignUp}
                    />
                </div>
            </div>
          )}

          <div className="relative">
            <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2 ml-1">Email Address</label>
            <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                    type="email" 
                    placeholder="alex@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-[#F8CBA6] bg-[#FFFBEB] focus:ring-4 focus:ring-[#F8CBA6]/30 outline-none font-bold transition-all"
                    required
                />
            </div>
          </div>

          <div className="relative">
            <div className="flex justify-between items-center mb-2 ml-1">
                <label className="block text-xs font-black text-slate-700 uppercase tracking-widest">Password</label>
                {!isSignUp && (
                    <button type="button" className="text-xs font-bold text-slate-500 hover:text-slate-900 underline">Forgot?</button>
                )}
            </div>
            <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                    type="password" 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-[#F8CBA6] bg-[#FFFBEB] focus:ring-4 focus:ring-[#F8CBA6]/30 outline-none font-bold transition-all"
                    required
                />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-slate-800 transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl uppercase tracking-widest mt-4"
          >
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm font-bold text-slate-600">
            {isSignUp ? (
                <>Already have an account? <button onClick={() => setIsSignUp(false)} className="text-slate-900 underline hover:text-slate-700">Log In</button></>
            ) : (
                <>Don't have an account? <button onClick={() => setIsSignUp(true)} className="text-slate-900 underline hover:text-slate-700">Sign Up</button></>
            )}
        </div>
      </div>
      
      <p className="mt-8 text-center text-xs text-slate-400 font-medium px-4">
        By continuing, you agree to Archool's Terms of Service and Privacy Policy. We promise not to spam you, we're too busy studying.
      </p>
    </div>
  );
};

export default SignIn;