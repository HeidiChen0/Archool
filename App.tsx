import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import SchoolCard from './components/SchoolCard';
import TeacherCard from './components/TeacherCard';
import ReviewForm from './components/ReviewForm';
import Dashboard from './components/Dashboard';
import About from './components/About';
import Contact from './components/Contact';
import UserProfile from './components/UserProfile';
import ProgramCenter from './components/ProgramCenter';
import AddSchoolForm from './components/AddSchoolForm';
import AddTeacherForm from './components/AddTeacherForm';
import AddCourseForm from './components/AddCourseForm';
import UploadResourceForm from './components/UploadResourceForm';
import AdminApply from './components/AdminApply';
import AmbassadorApply from './components/AmbassadorApply';
import VerifyIdentity from './components/VerifyIdentity';
import FindSchools from './components/FindSchools';
import Login from './components/Login';
import CourseDetail from './components/CourseDetail';
import Donation from './components/Donation';
import SchoolComments from './components/SchoolComments';

import { MOCK_SCHOOLS, MOCK_TEACHERS, MOCK_REVIEWS, MOCK_USER, MOCK_PROGRAMS, MOCK_COURSES } from './constants';
import { School, Teacher, Review, User, UserRole } from './types';
import { Search, MapPin, UserCheck, AlertCircle, MessageCircle, Heart, Plus, Flag, GraduationCap, ArrowRight, BookOpen, Library, Star, Users, ShieldCheck } from 'lucide-react';
import { generateTrendSummary } from './services/geminiService';

// Expanded Router State
type Page = 
  | 'home' 
  | 'school-detail' 
  | 'school-comments'
  | 'teacher-detail' 
  | 'course-detail'
  | 'review-form' 
  | 'dashboard'
  | 'about'
  | 'contact'
  | 'profile'
  | 'programs'
  | 'add-school'
  | 'add-teacher'
  | 'add-course'
  | 'upload-resource'
  | 'admin-apply'
  | 'ambassador-apply'
  | 'verify-identity'
  | 'find-schools'
  | 'find-teachers'
  | 'login'
  | 'donation'; 

// Scroll Animation Component
const ScrollReveal: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${className} ${isVisible ? 'animate-pop-in' : 'opacity-0'}`}>
      {children}
    </div>
  );
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Selection State
  const [selectedSchoolId, setSelectedSchoolId] = useState<string | null>(null);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);
  const [preSelectedProgramId, setPreSelectedProgramId] = useState<string | null>(null);
  const [verificationReturnPage, setVerificationReturnPage] = useState<Page>('school-detail');
  
  // Navigation Context
  const [findContext, setFindContext] = useState<'school' | 'teacher'>('school');
  
  // Data State
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [teachers, setTeachers] = useState<Teacher[]>(MOCK_TEACHERS);
  const [searchTerm, setSearchTerm] = useState('');

  // AI Summary State
  const [summary, setSummary] = useState<string | null>(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  const handleLoginSuccess = () => {
    setCurrentUser(MOCK_USER);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
  };

  const handleNavigate = (page: string) => {
    if (page === 'find-teachers') {
      setFindContext('teacher');
      setCurrentPage('find-schools');
    } else if (page === 'find-schools') {
      setFindContext('school');
      setCurrentPage('find-schools');
    } else if (page === 'resources' || page === 'programs') {
      setSelectedProgramId(null); // Reset program selection when clicking main nav
      setCurrentPage('programs');
    } else {
      setCurrentPage(page as Page);
    }
  };

  const navigateToSchool = (id: string) => {
    setSelectedSchoolId(id);
    setCurrentPage('school-detail');
    setSummary(null);
  };

  const navigateToTeacher = (id: string) => {
    setSelectedTeacherId(id);
    setCurrentPage('teacher-detail');
    setSummary(null);
  };

  const navigateToCourse = (id: string) => {
    setSelectedCourseId(id);
    setCurrentPage('course-detail');
    setSummary(null);
  };

  const handleReviewSubmit = (rating: number, comment: string) => {
    const targetType = selectedTeacherId ? 'Teacher' : selectedCourseId ? 'Course' : 'School';
    const targetId = selectedTeacherId || selectedCourseId || selectedSchoolId || '';
    
    const newReview: Review = {
      id: `r${Date.now()}`,
      targetId,
      targetType,
      authorName: currentUser?.name || 'Anonymous',
      verifiedStudent: currentUser?.verified || false,
      date: new Date().toISOString().split('T')[0],
      rating,
      comment
    };
    setReviews([newReview, ...reviews]);
    
    if (selectedTeacherId) setCurrentPage('teacher-detail');
    else if (selectedCourseId) setCurrentPage('course-detail');
    else if (currentPage === 'review-form' && !selectedTeacherId && !selectedCourseId) setCurrentPage('school-comments');
    else setCurrentPage('school-detail');
  };

  const handleAddTeacher = (newTeacher: Teacher) => {
    setTeachers([...teachers, newTeacher]);
    setCurrentPage('school-detail');
  };

  const generateSummary = async () => {
    setIsGeneratingSummary(true);
    const targetId = selectedTeacherId || selectedCourseId || selectedSchoolId;
    const targetReviews = reviews.filter(r => r.targetId === targetId).map(r => r.comment);
    
    let targetName = "";
    if (selectedTeacherId) targetName = teachers.find(t => t.id === selectedTeacherId)?.name || "";
    else if (selectedCourseId) targetName = MOCK_COURSES.find(c => c.id === selectedCourseId)?.name || "";
    else targetName = MOCK_SCHOOLS.find(s => s.id === selectedSchoolId)?.name || "";
        
    if (targetName && targetReviews.length > 0) {
        const result = await generateTrendSummary(targetReviews, targetName);
        setSummary(result);
    } else {
        setSummary("Not enough data to generate summary.");
    }
    setIsGeneratingSummary(false);
  };

  const handleAddCourse = (programId: string | null) => {
    setPreSelectedProgramId(programId);
    setCurrentPage('add-course');
  };

  const handleUploadResourceRequest = (programId: string) => {
    if (!currentUser || !currentUser.verified) {
      alert("Verification required: Please verify your identity to upload resources. Help keep Archool clean! 📚");
      setSelectedSchoolId(MOCK_SCHOOLS[0].id); // Default to first school for verification context
      setVerificationReturnPage('school-detail');
      setCurrentPage('verify-identity');
      return;
    }
    setPreSelectedProgramId(programId);
    setCurrentPage('upload-resource');
  };

  // Filtering Helpers
  const filteredSchools = MOCK_SCHOOLS.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const getTeachersBySchool = (schoolId: string) => teachers.filter(t => t.schoolId === schoolId);
  const getReviews = (targetId: string) => reviews.filter(r => r.targetId === targetId);

  // -- RENDERERS --

  const renderHome = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Verified Reviews for <span className="text-[#F8CBA6] text-shadow-sm">Better Education</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
          Archool helps students and parents find the best schools and teachers through verified, actionable feedback.
        </p>
        
        <div className="max-w-xl mx-auto relative mb-4">
          <input
            type="text"
            placeholder="Search for your school..."
            className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-[#F8CBA6] bg-[#FFFBEB] focus:border-[#F8CBA6] focus:ring-4 focus:ring-[#F8CBA6]/30 shadow-lg text-lg outline-none transition-all placeholder-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6" />
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button 
              onClick={() => setCurrentPage('add-school')}
              className="text-sm text-slate-500 hover:text-slate-900 font-medium underline decoration-[#F8CBA6]"
          >
              Can't find your school? Add it here.
          </button>
          <span 
            onClick={() => setCurrentPage('donation')}
            className="text-sm text-slate-400 hover:text-rose-600 font-bold italic cursor-pointer transition-colors"
          >
            Donate if you like our service ;))))))
          </span>
        </div>
      </div>

      <div className="mb-24">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
             < GraduationCap className="w-6 h-6 mr-2 text-slate-700" />
             {searchTerm ? 'Search Results' : 'Featured Schools'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {filteredSchools.slice(0, searchTerm ? undefined : 3).map(school => (
            <SchoolCard key={school.id} school={school} onClick={navigateToSchool} />
            ))}
        </div>
        {!searchTerm && (
            <div className="text-center">
                <button 
                    onClick={() => handleNavigate('find-schools')}
                    className="inline-flex items-center text-slate-700 font-bold hover:text-[#F8CBA6] transition-colors"
                >
                    View More Schools <ArrowRight className="w-4 h-4 ml-2" />
                </button>
            </div>
        )}
      </div>

      {!searchTerm && (
        <div className="space-y-24">
            <ScrollReveal className="flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 order-2 md:order-1">
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">Rate Your Teacher</h3>
                    <div className="bg-[#FFFDF7] rounded-2xl p-8 shadow-sm border border-[#F8CBA6]/30 mb-6 relative">
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Have a teacher who changed your life? Or one who made this semester a nightmare? 
                            Share your anonymous feedback on clarity, grading, and engagement to help future students.
                        </p>
                    </div>
                    <button 
                        onClick={() => handleNavigate('find-teachers')}
                        className="bg-[#FFE7CC] border border-[#F8CBA6] text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-[#F8CBA6] transition-colors shadow-sm flex items-center w-fit"
                    >
                        <AlertCircle className="w-5 h-5 mr-2" /> Find a Teacher
                    </button>
                </div>
                <div className="flex-1 order-1 md:order-2 flex justify-center">
                    <div className="bg-[#FFE7CC] p-8 rounded-full w-64 h-64 flex items-center justify-center border-4 border-[#F8CBA6] shadow-inner transform transition-transform duration-500 hover:scale-105">
                         <UserCheck className="w-24 h-24 text-[#F8CBA6]" />
                    </div>
                </div>
            </ScrollReveal>

             <ScrollReveal className="flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 flex justify-center">
                    <div className="bg-[#ECF9FF] p-8 rounded-full w-64 h-64 flex items-center justify-center border-4 border-blue-200 shadow-inner transform transition-transform duration-500 hover:scale-105">
                         <BookOpen className="w-24 h-24 text-blue-300" />
                    </div>
                </div>
                <div className="flex-1">
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">Program Centers</h3>
                    <div className="bg-[#FFFDF7] rounded-2xl p-8 shadow-sm border border-[#F8CBA6]/30 mb-6">
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Taking IB, AP, or A-Levels? Don't go in blind. 
                            Check course ratings for difficulty, workload, and self-study potential before you sign up.
                        </p>
                    </div>
                    <button 
                        onClick={() => setCurrentPage('programs')}
                        className="bg-[#ECF9FF] border border-blue-200 text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-blue-100 transition-colors shadow-sm flex items-center w-fit"
                    >
                        < GraduationCap className="w-5 h-5 mr-2" /> Rate Your Courses
                    </button>
                </div>
            </ScrollReveal>

            <ScrollReveal className="flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 order-2 md:order-1">
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">Free Resources</h3>
                    <div className="bg-[#FFFDF7] rounded-2xl p-8 shadow-sm border border-[#F8CBA6]/30 mb-6">
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Why pay for what should be free? Access our community-curated collection of 
                            past papers, study guides, and "borrowed" materials from top competitors.
                        </p>
                    </div>
                    <button 
                        onClick={() => setCurrentPage('programs')} 
                        className="bg-[#FFE7CC] border border-[#F8CBA6] text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-[#F8CBA6] transition-colors shadow-sm flex items-center w-fit"
                    >
                        <Library className="w-5 h-5 mr-2" /> Find Resources
                    </button>
                </div>
                <div className="flex-1 order-1 md:order-2 flex justify-center">
                    <div className="bg-[#FFFBEB] p-8 rounded-full w-64 h-64 flex items-center justify-center border-4 border-[#F8CBA6] shadow-inner transform transition-transform duration-500 hover:scale-105">
                         <Library className="w-24 h-24 text-[#F8CBA6]" />
                    </div>
                </div>
            </ScrollReveal>
        </div>
      )}
    </div>
  );

  const renderSchoolDetail = () => {
    const school = MOCK_SCHOOLS.find(s => s.id === selectedSchoolId);
    if (!school) return <div>School not found</div>;
    const schoolTeachers = getTeachersBySchool(school.id);

    const ambassadorCount = school.ambassadorCount || 0;
    const maxAmbassadors = 10;

    const ratingLabels: Record<string, string> = {
        lunch: 'Lunch',
        happiness: 'Happiness',
        willingnessBack: 'Willingness to Return',
        bathroom: 'Bathrooms',
        cleanliness: 'Cleanliness',
        infrastructure: 'Infrastructure',
        wifi: 'WiFi',
        overall: 'Overall Score'
    };

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={() => setCurrentPage(findContext === 'teacher' ? 'find-schools' : 'home')} className="text-slate-700 hover:text-slate-900 hover:underline mb-4 font-medium">← Back to Search</button>
        
        <div className="bg-[#FFE7CC] rounded-2xl shadow-sm border border-[#F8CBA6] overflow-hidden mb-8">
            <div className="h-64 relative">
                <img src={school.imageUrl} className="w-full h-full object-cover" alt="School Banner" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-8 text-white w-full">
                        <h1 className="text-4xl font-bold mb-2">{school.name}</h1>
                        <div className="flex justify-between items-end">
                            <div className="flex items-center text-white/90">
                                <MapPin className="w-5 h-5 mr-2" />
                                {school.location}
                            </div>
                            <div className="hidden md:block">
                                {school.principal && <div className="text-sm bg-white/20 px-3 py-1 rounded backdrop-blur-sm">Principal: {school.principal}</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-[#ECF9FF] p-4 flex items-center justify-between border-b border-blue-100">
                <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3 text-blue-600"><ShieldCheck className="w-4 h-4" /></div>
                    <span className="text-sm text-slate-700 font-medium">Verify your student / staff / parent identity to comment</span>
                </div>
                <div className="flex space-x-2">
                    <button 
                        onClick={() => {
                          setVerificationReturnPage('school-detail');
                          setCurrentPage('verify-identity');
                        }}
                        className="bg-blue-600 text-white text-xs font-black px-6 py-2 rounded-lg hover:bg-blue-700 transition-all uppercase tracking-widest shadow-sm"
                    >
                        Verify Identity
                    </button>
                </div>
            </div>

            <div className="p-8">
                {/* Ambassador Section */}
                <div className="bg-white/50 border-2 border-[#F8CBA6]/40 rounded-2xl p-6 mb-8 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-start">
                            <div className="bg-[#F8CBA6] p-3 rounded-xl mr-4 shadow-sm">
                                <Users className="w-6 h-6 text-slate-900" />
                            </div>
                            <div>
                                <h3 className="font-black text-slate-900 uppercase tracking-tight text-xl flex items-center">
                                    Student Ambassadors
                                </h3>
                                <p className="text-slate-500 text-sm font-medium">
                                    {ambassadorCount} out of {maxAmbassadors} slots filled
                                </p>
                            </div>
                        </div>

                        <div className="flex-1 max-w-sm">
                            <div className="flex gap-1.5 mb-2">
                                {Array.from({ length: maxAmbassadors }).map((_, i) => (
                                    <div 
                                        key={i} 
                                        className={`flex-1 h-2.5 rounded-full border border-slate-900/10 ${i < ambassadorCount ? 'bg-[#F8CBA6]' : 'bg-slate-200'}`}
                                    />
                                ))}
                            </div>
                            <div className="flex justify-between text-[10px] uppercase font-black tracking-widest text-slate-400">
                                <span>Slots filled</span>
                                <span>{maxAmbassadors} Max</span>
                            </div>
                        </div>

                        {ambassadorCount < maxAmbassadors && (
                            <button 
                                onClick={() => setCurrentPage('ambassador-apply')}
                                className="bg-[#F8CBA6] text-slate-900 border-2 border-slate-900/10 px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-[#E5B895] transition-all transform hover:scale-105 shadow-lg active:scale-95"
                            >
                                Apply to be an Ambassador
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                    {school.features.map(f => (
                        <span key={f} className="bg-[#ECF9FF] text-slate-800 px-3 py-1 rounded-full text-sm font-medium">{f}</span>
                    ))}
                    {school.programs?.map(p => (
                         <span key={p} 
                            onClick={() => { setSelectedProgramId(p === 'IBDP' ? 'p1' : p === 'AP' ? 'p2' : null); setCurrentPage('programs'); }}
                            className="bg-[#FFFBEB] text-slate-800 border border-[#F8CBA6] px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-[#F8CBA6]"
                        >
                            {p} Program
                         </span>
                    ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-center">
                    {Object.entries(school.ratings).map(([key, val]) => (
                        <div key={key} className="bg-[#FFFBEB] p-4 rounded-xl border border-[#F8CBA6]">
                            <div className="text-xs uppercase font-bold text-slate-500 mb-1">{ratingLabels[key] || key}</div>
                            <div className="text-2xl font-bold text-slate-900">{val}</div>
                        </div>
                    ))}
                </div>
                
                <div className="grid grid-cols-1 gap-4 mb-8">
                     <button 
                        onClick={() => setCurrentPage('school-comments')}
                        className="bg-[#FFFBEB] border border-[#F8CBA6] p-4 rounded-xl font-bold text-slate-700 hover:bg-[#F8CBA6] flex items-center justify-center"
                     >
                         <MessageCircle className="w-5 h-5 mr-2" /> Leave a General Comment
                     </button>
                </div>

                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">Departments & Teachers</h2>
                    <button 
                        onClick={() => setCurrentPage('add-teacher')}
                        className="text-sm bg-[#F8CBA6] text-slate-900 px-4 py-2 rounded-lg hover:bg-[#E5B895] transition-colors font-semibold flex items-center"
                    >
                        <Plus className="w-3 h-3 mr-1" /> Add Missing Teacher
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {schoolTeachers.map(t => (
                        <TeacherCard key={t.id} teacher={t} onClick={navigateToTeacher} />
                    ))}
                </div>
            </div>
        </div>
      </div>
    );
  };

  const renderTeacherDetail = () => {
    const teacher = teachers.find(t => t.id === selectedTeacherId);
    if (!teacher) return <div>Teacher not found</div>;
    const teacherReviews = getReviews(teacher.id);

    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         <button onClick={() => setCurrentPage('school-detail')} className="text-slate-700 hover:text-slate-900 hover:underline mb-4 font-medium">← Back to School</button>
         
         <div className="bg-[#FFE7CC] rounded-xl shadow-sm border border-[#F8CBA6] p-8 mb-6">
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-1">{teacher.name}</h1>
                    <p className="text-lg text-slate-500">{teacher.subject} • {teacher.department}</p>
                </div>
                <div className="flex flex-col items-center bg-[#ECF9FF] p-3 rounded-xl min-w-[100px]">
                    <span className="text-3xl font-bold text-slate-900">{teacher.ratings.overall.toFixed(1)}</span>
                    <div className="flex text-yellow-400">★★★★☆</div>
                    <span className="text-xs text-slate-500 mt-1">{teacherReviews.length} reviews</span>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                 {Object.entries(teacher.ratings).filter(([k]) => k !== 'overall').map(([key, val]) => (
                        <div key={key} className="text-center p-3 bg-[#FFFBEB] rounded-lg border border-[#F8CBA6]">
                            <div className="text-xs uppercase font-bold text-slate-500 mb-1">{capitalize(key)}</div>
                            <div className="text-xl font-bold text-slate-700">{val}</div>
                        </div>
                ))}
            </div>

            <div className="flex justify-between items-center border-t border-[#F8CBA6] pt-6">
                <button 
                    onClick={() => currentUser ? setCurrentPage('review-form') : setCurrentPage('login')}
                    className="bg-[#F8CBA6] text-slate-900 px-6 py-2 rounded-lg font-medium hover:bg-[#E5B895] transition-colors shadow-sm"
                >
                    Rate this Teacher
                </button>
                <div className="flex space-x-2">
                     <button className="text-slate-400 hover:text-red-500 text-xs font-medium flex items-center bg-[#FFFBEB] px-3 py-1 rounded-full border border-transparent hover:border-red-200">
                        <Flag className="w-3 h-3 mr-1" />
                        Report (Doesn't exist)
                     </button>
                </div>
            </div>
         </div>

         <div className="bg-[#ECF9FF] rounded-xl p-6 text-slate-900 mb-6 shadow-lg border border-blue-100">
             <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center">
                     <div className="bg-white/50 p-2 rounded-full mr-3">
                        <MessageCircle className="w-5 h-5 text-slate-700" />
                     </div>
                     <div>
                         <h3 className="font-bold text-lg">AI Review Summary</h3>
                         <p className="text-slate-500 text-sm">Get a quick overview of what students are saying.</p>
                     </div>
                 </div>
                 {!summary && (
                     <button 
                        onClick={generateSummary}
                        disabled={isGeneratingSummary}
                        className="bg-[#FFFBEB] text-slate-900 border border-[#F8CBA6] px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#F8CBA6] disabled:opacity-50"
                     >
                        {isGeneratingSummary ? 'Analyzing...' : 'Generate Summary'}
                     </button>
                 )}
             </div>
             {summary && (
                 <div className="bg-white/40 p-4 rounded-lg border border-white/40 animate-fadeIn text-sm leading-relaxed whitespace-pre-line font-medium text-slate-700 relative z-10">
                     {summary}
                 </div>
             )}
         </div>

         <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-900">Student Reviews</h3>
            </div>
            {teacherReviews.length === 0 && <p className="text-slate-500 italic">No reviews yet. Be the first!</p>}
            {teacherReviews.map(review => (
                <div key={review.id} className="bg-[#FFE7CC] p-6 rounded-xl border border-[#F8CBA6] shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm mr-4 shadow-sm ${review.verifiedStudent ? 'bg-green-100 text-green-700' : 'bg-[#FFFBEB] text-slate-400'}`}>
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
            ))}
         </div>
      </div>
    );
  };

  const StarSmall = () => <svg className="w-3 h-3 ml-1 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>;

  return (
    <div className="min-h-screen bg-[#FFFBEB] font-sans">
      <Navbar 
        user={currentUser} 
        onNavigate={handleNavigate} 
        onLogin={() => setCurrentPage('login')}
        onLogout={handleLogout}
      />
      
      <main className="pb-12">
        {currentPage === 'home' && renderHome()}
        {currentPage === 'login' && <Login onLoginSuccess={handleLoginSuccess} onCancel={() => setCurrentPage('home')} />}
        {currentPage === 'school-detail' && renderSchoolDetail()}
        {currentPage === 'school-comments' && (
          <SchoolComments 
            schoolId={selectedSchoolId || ''} 
            reviews={reviews} 
            onBack={() => setCurrentPage('school-detail')} 
            onAddComment={() => currentUser ? setCurrentPage('review-form') : setCurrentPage('login')}
          />
        )}
        {currentPage === 'teacher-detail' && renderTeacherDetail()}
        {currentPage === 'course-detail' && (
          <CourseDetail 
            courseId={selectedCourseId || ''} 
            reviews={reviews} 
            onBack={() => setCurrentPage('programs')}
            onRate={() => currentUser ? setCurrentPage('review-form') : setCurrentPage('login')}
            onGenerateSummary={generateSummary}
            isGeneratingSummary={isGeneratingSummary}
            summary={summary}
          />
        )}
        {currentPage === 'about' && <About onBack={() => setCurrentPage('home')} onDonate={() => setCurrentPage('donation')} />}
        {currentPage === 'contact' && <Contact onBack={() => setCurrentPage('home')} onDonate={() => setCurrentPage('donation')} />}
        {currentPage === 'donation' && <Donation onBack={() => setCurrentPage('home')} />}
        {currentPage === 'programs' && (
          <ProgramCenter 
            selectedProgramId={selectedProgramId}
            onSelectProgram={setSelectedProgramId}
            onAddCourse={handleAddCourse} 
            onCourseClick={navigateToCourse} 
            onUploadResource={handleUploadResourceRequest} 
          />
        )}
        {currentPage === 'add-school' && <AddSchoolForm onCancel={() => setCurrentPage('home')} onNavigate={handleNavigate} />}
        {currentPage === 'add-teacher' && (
            <AddTeacherForm 
                schoolId={selectedSchoolId || ''} 
                onCancel={() => setCurrentPage('school-detail')} 
                onSubmit={handleAddTeacher}
            />
        )}
        {currentPage === 'add-course' && (
          <AddCourseForm 
            initialProgramId={preSelectedProgramId}
            onCancel={() => setCurrentPage('programs')}
            onSubmit={(course) => {
              alert(`Course "${course.name}" added to ${MOCK_PROGRAMS.find(p=>p.id === course.programId)?.name}!`);
              setCurrentPage('programs');
            }}
          />
        )}
        {currentPage === 'upload-resource' && (
          <UploadResourceForm 
            initialProgramId={preSelectedProgramId}
            onCancel={() => setCurrentPage('programs')}
            onSubmit={(resource) => {
              alert(`Resource "${resource.title}" submitted for review!`);
              setCurrentPage('programs');
            }}
          />
        )}
        {currentPage === 'admin-apply' && <AdminApply onCancel={() => setCurrentPage('profile')} />}
        {currentPage === 'ambassador-apply' && (
            <AmbassadorApply 
                schoolName={MOCK_SCHOOLS.find(s => s.id === selectedSchoolId)?.name || 'Your School'} 
                onCancel={() => setCurrentPage('school-detail')} 
            />
        )}
        {currentPage === 'verify-identity' && (
            <VerifyIdentity 
                schoolName={MOCK_SCHOOLS.find(s => s.id === selectedSchoolId)?.name || 'Your School'} 
                onCancel={() => setCurrentPage(verificationReturnPage)} 
                onSuccess={() => {
                    setCurrentUser(prev => prev ? {...prev, verified: true} : null);
                    setCurrentPage(verificationReturnPage);
                }}
            />
        )}
        {currentPage === 'find-schools' && <FindSchools onSchoolClick={navigateToSchool} context={findContext} />}
        {currentPage === 'profile' && currentUser && (
            <UserProfile 
                user={currentUser} 
                onUpdate={(u) => setCurrentUser({...currentUser, ...u})} 
                onNavigate={(p) => {
                  if (p === 'verify-identity') {
                    setVerificationReturnPage('profile');
                  }
                  setCurrentPage(p as Page);
                }}
            />
        )}
        {currentPage === 'dashboard' && currentUser?.role === UserRole.Admin && (
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                 <Dashboard 
                    school={MOCK_SCHOOLS[0]} 
                    teachers={teachers.filter(t => t.schoolId === MOCK_SCHOOLS[0].id)} 
                 />
             </div>
        )}
        {currentPage === 'review-form' && (
          <div className="max-w-4xl mx-auto px-4 py-12">
            <ReviewForm 
                targetName={
                  selectedTeacherId ? (teachers.find(t=>t.id === selectedTeacherId)?.name || '') : 
                  selectedCourseId ? (MOCK_COURSES.find(c=>c.id === selectedCourseId)?.name || '') :
                  (MOCK_SCHOOLS.find(s=>s.id === selectedSchoolId)?.name || 'School')
                }
                targetType={selectedTeacherId ? 'Teacher' : selectedCourseId ? 'Course' : 'School'}
                onCancel={() => {
                  if (selectedTeacherId) setCurrentPage('teacher-detail');
                  else if (selectedCourseId) setCurrentPage('course-detail');
                  else if (!selectedTeacherId && !selectedCourseId) setCurrentPage('school-comments');
                  else setCurrentPage('school-detail');
                }}
                onSubmit={handleReviewSubmit}
            />
          </div>
        )}
      </main>

      <footer className="bg-[#FFE7CC] border-t border-[#F8CBA6] py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
            <p>&copy; 2024 Archool. Empowering students with transparency.</p>
            <div className="mt-4 flex justify-center space-x-6">
                <button onClick={() => setCurrentPage('about')} className="hover:text-slate-900">About Us</button>
                <button onClick={() => setCurrentPage('contact')} className="hover:text-slate-900">Contact</button>
                <a href="#" className="hover:text-slate-900">Terms</a>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;