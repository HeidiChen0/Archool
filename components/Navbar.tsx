import React from 'react';
import { User } from '../types';
import { User as UserIcon, LogOut, BookOpen, UserCheck } from 'lucide-react';

interface NavbarProps {
  user: User | null;
  onNavigate: (page: string) => void;
  onLogin: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onNavigate, onLogin, onLogout }) => {
  return (
    <nav className="bg-[#F8CBA6] text-slate-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <span className="font-bold text-xl tracking-tight">Archool</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button onClick={() => onNavigate('find-schools')} className="hover:bg-[#E5B895] px-3 py-2 rounded-md text-sm font-medium transition-colors">Find Schools</button>
              <button onClick={() => onNavigate('find-teachers')} className="flex items-center hover:bg-[#E5B895] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                <UserCheck className="w-4 h-4 mr-1" />
                Find Teachers
              </button>
              <button onClick={() => onNavigate('programs')} className="flex items-center hover:bg-[#E5B895] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                <BookOpen className="w-4 h-4 mr-1" />
                Programs & Resources
              </button>
               <button onClick={() => onNavigate('about')} className="hover:bg-[#E5B895] px-3 py-2 rounded-md text-sm font-medium transition-colors">About</button>
               <button onClick={() => onNavigate('contact')} className="hover:bg-[#E5B895] px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</button>
               <button 
                  onClick={() => onNavigate('donation')} 
                  className="px-3 py-2 rounded-md text-sm font-bold italic text-rose-700 hover:text-rose-900 transition-colors"
                >
                  Donation
                </button>
            </div>
          </div>
          <div>
            {user ? (
              <div className="flex items-center space-x-4">
                <div 
                    className="flex items-center space-x-2 cursor-pointer hover:bg-[#E5B895] p-1 rounded-full pr-3 transition-colors"
                    onClick={() => onNavigate('profile')}
                >
                    {user.avatarUrl && <img src={user.avatarUrl} alt="Avatar" className="w-8 h-8 rounded-full border-2 border-slate-900/10" />}
                    <span className="text-sm font-medium hidden sm:block">{user.name}</span>
                    {user.verified && <span className="bg-[#ECF9FF] text-slate-900 text-xs px-1.5 py-0.5 rounded-full font-bold">✓</span>}
                </div>
                <button onClick={onLogout} className="p-2 rounded-full hover:bg-[#E5B895] transition-colors" title="Logout">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={onLogin}
                className="flex items-center space-x-1 bg-[#FFFBEB] text-slate-900 px-4 py-2 rounded-md font-medium text-sm hover:bg-[#FFE7CC] transition-colors shadow-sm"
              >
                <UserIcon className="h-4 w-4" />
                <span>Log In</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;