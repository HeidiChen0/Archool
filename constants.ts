import { School, Teacher, Review, User, UserRole, Program, Course, Resource } from './types';

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Alex Chen',
  role: UserRole.Student,
  verified: true,
  avatarUrl: 'https://picsum.photos/id/64/200/200',
  verificationEmail: 'alex.chen@lincolnhigh.edu',
  graduationYear: 2026
};

export const MOCK_SCHOOLS: School[] = [
  {
    id: 's1',
    name: 'Lincoln High School',
    location: 'Seattle, WA',
    type: 'Public',
    description: 'A comprehensive public high school known for its strong STEM program and diverse student body.',
    imageUrl: 'https://picsum.photos/id/49/800/400',
    ratings: { 
      lunch: 3.5, 
      happiness: 4.2, 
      willingnessBack: 4.5, 
      bathroom: 3.2, 
      cleanliness: 3.8, 
      infrastructure: 4.0, 
      wifi: 2.8, 
      overall: 4.0 
    },
    features: ['AP Courses', 'Robotics Club', 'Open Campus Lunch'],
    principal: 'Dr. Sarah Williams',
    programs: ['AP', 'Honors'],
    ambassadorCount: 7
  },
  {
    id: 's2',
    name: 'St. Mary’s Academy',
    location: 'Portland, OR',
    type: 'Private',
    description: 'An independent college-preparatory school with a focus on holistic education.',
    imageUrl: 'https://picsum.photos/id/20/800/400',
    ratings: { 
      lunch: 4.5, 
      happiness: 3.9, 
      willingnessBack: 4.0, 
      bathroom: 4.8, 
      cleanliness: 4.8, 
      infrastructure: 4.5, 
      wifi: 4.2, 
      overall: 4.4 
    },
    features: ['IB Program', 'Small Class Sizes', 'Arts Focus'],
    principal: 'Sister Margaret',
    programs: ['IBDP'],
    ambassadorCount: 10
  }
];

export const MOCK_TEACHERS: Teacher[] = [
  {
    id: 't1',
    schoolId: 's1',
    name: 'Mr. John Anderson',
    subject: 'Calculus BC',
    department: 'Mathematics',
    ratings: { difficulty: 4.5, friendliness: 3.2, homework: 4.8, pacing: 4.5, overall: 4.3 }
  },
  {
    id: 't2',
    schoolId: 's1',
    name: 'Ms. Sarah Lee',
    subject: 'World History',
    department: 'History',
    ratings: { difficulty: 3.2, friendliness: 4.8, homework: 3.5, pacing: 4.0, overall: 4.2 }
  },
  {
    id: 't3',
    schoolId: 's2',
    name: 'Dr. Emily Chen',
    subject: 'Chemistry',
    department: 'Science',
    ratings: { difficulty: 4.2, friendliness: 4.5, homework: 4.0, pacing: 4.8, overall: 4.7 }
  }
];

export const MOCK_PROGRAMS: Program[] = [
  { id: 'p2', name: 'AP', description: 'Advanced Placement' },
  { id: 'p1', name: 'IBDP', description: 'International Baccalaureate Diploma Programme' },
  { id: 'p3', name: 'A-Level', description: 'Advanced Level' },
  { id: 'p4', name: 'GCSE', description: 'General Certificate of Secondary Education' }
];

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    programId: 'p1',
    name: 'Mathematics AA HL',
    ratings: { difficulty: 4.8, timeConsuming: 5.0, homework: 4.5, selfStudibility: 2.5, overall: 3.8 }
  },
  {
    id: 'c2',
    programId: 'p1',
    name: 'Physics HL',
    ratings: { difficulty: 4.9, timeConsuming: 4.8, homework: 4.2, selfStudibility: 3.0, overall: 4.0 }
  },
  {
    id: 'c3',
    programId: 'p2',
    name: 'AP US History',
    ratings: { difficulty: 4.0, timeConsuming: 4.5, homework: 4.0, selfStudibility: 4.2, overall: 4.1 }
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rc1',
    targetId: 'c1',
    targetType: 'Course',
    authorName: 'Math Whiz',
    verifiedStudent: true,
    date: '2024-01-10',
    rating: 4,
    comment: 'Math AA HL is definitely the hardest course in IB. You need to practice past papers every single day. Don\'t rely just on the textbook!',
  },
  {
    id: 'rc2',
    targetId: 'c2',
    targetType: 'Course',
    authorName: 'Future Engineer',
    verifiedStudent: true,
    date: '2024-02-15',
    rating: 5,
    comment: 'Physics HL is amazing if you like understanding how things work. The workload is heavy but the content is very rewarding.',
  },
  {
    id: 'r1',
    targetId: 't1',
    targetType: 'Teacher',
    authorName: 'Verified Student',
    verifiedStudent: true,
    date: '2023-10-15',
    rating: 4,
    comment: 'Mr. Anderson explains concepts very clearly, but his tests are extremely difficult. Make sure to study the challenge problems in the textbook.',
    subRatings: { Difficulty: 5, Friendliness: 3, Homework: 5, Pacing: 5 }
  },
  {
    id: 'r2',
    targetId: 't1',
    targetType: 'Teacher',
    authorName: 'Anonymous',
    verifiedStudent: false,
    date: '2023-09-20',
    rating: 5,
    comment: 'Best math teacher I have ever had. He actually cares if you understand the material.',
    subRatings: { Difficulty: 4, Friendliness: 5, Homework: 4, Pacing: 4 }
  },
  {
    id: 'r3',
    targetId: 's1',
    targetType: 'School',
    authorName: 'Parent of Alumni',
    verifiedStudent: false,
    date: '2023-11-01',
    rating: 4,
    comment: 'Great community and rigorous academics. The cafeteria food could be better though.',
    subRatings: { Lunch: 2, Happiness: 4, Cleanliness: 4 }
  }
];

export const MOCK_RESOURCES: Resource[] = [
    { 
        id: 'res1', 
        title: 'IB Math AA HL Questionbank (2024)', 
        source: 'Math Whiz', 
        url: '#', 
        programId: 'p1',
        courseId: 'c1',
        type: ['Past Paper'],
        tags: ['Math', 'Questionbank', '2024'],
        showName: true
    },
    { 
        id: 'res2', 
        title: 'AP US History Full Notes - Chapter 1-5', 
        source: 'Anonymous', 
        url: '#', 
        programId: 'p2',
        courseId: 'c3',
        type: ['Notes', 'Guide'],
        tags: ['History', 'Notes', 'Summary'],
        showName: false
    },
    { 
        id: 'res3', 
        title: 'Physics HL Past Papers (1999-2023)', 
        source: 'Science Guru', 
        url: '#', 
        programId: 'p1',
        courseId: 'c2',
        type: ['Past Paper'],
        tags: ['Physics', 'Past Papers'],
        showName: true
    },
    { 
        id: 'res4', 
        title: 'Chemistry IA Examples (High Scoring)', 
        source: 'Anonymous', 
        url: '#', 
        programId: 'p1',
        type: ['Guide'],
        tags: ['Chemistry', 'IA', 'Guide'],
        showName: false
    },
    { 
        id: 'res5', 
        title: 'General IB Survival Guide', 
        source: 'IB Survivor', 
        url: '#', 
        programId: 'p1',
        type: ['Guide', 'Other'],
        tags: ['General', 'Tips'],
        showName: true
    },
];