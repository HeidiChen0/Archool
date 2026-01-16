export enum UserRole {
  Student = 'Student',
  Parent = 'Parent',
  Admin = 'Admin',
  Moderator = 'Moderator'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  verified: boolean;
  avatarUrl?: string;
  verificationEmail?: string;
  graduationYear?: number;
}

export interface School {
  id: string;
  name: string;
  location: string;
  type: 'Public' | 'Private' | 'Charter' | 'International';
  description: string;
  imageUrl: string;
  ratings: {
    lunch: number;
    happiness: number;
    willingnessBack: number;
    bathroom: number;
    cleanliness: number;
    infrastructure: number;
    wifi: number;
    overall: number;
  };
  features: string[];
  principal?: string;
  programs?: string[];
  ambassadorCount?: number;
}

export interface Teacher {
  id: string;
  schoolId: string;
  name: string;
  subject: string;
  department: string;
  ratings: {
    difficulty: number;
    friendliness: number;
    homework: number;
    pacing: number;
    overall: number;
  };
}

export interface Review {
  id: string;
  targetId: string; // SchoolID or TeacherID or CourseID
  targetType: 'School' | 'Teacher' | 'Course';
  authorName: string;
  verifiedStudent: boolean;
  date: string;
  rating: number; // Overall
  comment: string;
  subRatings?: Record<string, number>;
}

export interface Program {
  id: string;
  name: string; // e.g., IBDP, AP, A-Levels
  description: string;
}

export interface Course {
  id: string;
  programId: string;
  name: string; // e.g., Math AA HL
  ratings: {
    difficulty: number;
    timeConsuming: number;
    homework: number;
    selfStudibility: number;
    overall: number;
  };
}

export interface Resource {
  id: string;
  title: string;
  source: string; // This will now represent the uploader's name or 'Anonymous'
  url: string;
  programId: string;
  courseId?: string | string[]; // Can now be multiple courses
  type: ('Notes' | 'Past Paper' | 'Guide' | 'Other')[]; // Can now be multiple types
  tags: string[];
  uploadedBy?: string;
  showName?: boolean;
}