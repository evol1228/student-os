// --- SHARED MOCK DATA ---

export const CLASSES = [
  { id: 1, name: "Math 101", students: 26 },
  { id: 2, name: "Science 102", students: 24 },
  { id: 3, name: "History 201", students: 28 },
];

export const MOCK_STUDENTS = [
  { id: 1, name: "Alice Johnson", status: "online", battery: 85, recentSearch: "photosynthesis definition", attendance: "present" },
  { id: 2, name: "Bob Smith", status: "online", battery: 92, recentSearch: "history of europe", attendance: "present" },
  { id: 3, name: "Charlie Davis", status: "offline", battery: 12, recentSearch: "math games", attendance: "absent" },
  { id: 4, name: "Diana Prince", status: "locked", battery: 100, recentSearch: "-", attendance: "present" },
  { id: 5, name: "Evan Wright", status: "online", battery: 45, recentSearch: "how to write an essay", attendance: "present" },
  { id: 6, name: "Fiona Gallagher", status: "online", battery: 78, recentSearch: "spanish translation", attendance: "late" },
  { id: 7, name: "George Miller", status: "offline", battery: 0, recentSearch: "coolmathgames", attendance: "absent" },
  { id: 8, name: "Hannah Abbott", status: "online", battery: 60, recentSearch: "science fair ideas", attendance: "present" },
];

export const ANNOUNCEMENTS = [
  {
    id: 1,
    title: "Chapter 7 Review — Quadratic Equations",
    time: "Today, 09:15",
    content: "Please review the following before tomorrow's quiz:",
    bullets: ["Complete exercises 7.1 – 7.4", "Watch the Khan Academy video on factoring", "Bring your graphing calculator"],
    files: [{ name: "Chapter7_StudyGuide.pdf", size: "1.2 MB" }],
  },
  {
    id: 2,
    title: "Science Fair Project Deadline Extended",
    time: "Today, 08:30",
    content: "Good news! The deadline for the Science Fair project proposal has been extended to next Friday. Make sure your hypothesis is clearly stated.",
    bullets: [],
    files: [{ name: "ProjectTemplate.docx", size: "340 KB" }, { name: "Rubric_2026.pdf", size: "89 KB" }],
  },
  {
    id: 3,
    title: "Field Trip Permission Slips",
    time: "Yesterday",
    content: "Reminder: All permission slips for the Gothenburg Museum trip must be submitted by Wednesday.",
    bullets: ["Bring a packed lunch", "We depart at 08:00 sharp from the main entrance"],
    files: [],
  },
];

export const HELP_REQUESTS = [
  { id: 1, name: "Alice Johnson", time: "2m ago", msg: "I can't access the quiz link, it says 'forbidden'.", unread: true },
  { id: 2, name: "Evan Wright", time: "5m ago", msg: "My screen is frozen, can you restart my device?", unread: true },
  { id: 3, name: "Fiona Gallagher", time: "12m ago", msg: "Is the homework due today or tomorrow?", unread: false },
  { id: 4, name: "Hannah Abbott", time: "20m ago", msg: "Can I switch seats? I can't see the projector well.", unread: false },
];

export const SCHEDULE = [
  { time: "08:00", label: "Math 101", room: "Room 302", active: false, done: true },
  { time: "09:30", label: "Free Period", room: "—", active: false, done: true },
  { time: "10:00", label: "Science 102", room: "Lab 2", active: true, done: false },
  { time: "12:00", label: "Lunch", room: "—", active: false, done: false },
  { time: "13:00", label: "History 201", room: "Room 405", active: false, done: false },
];

export const SUBJECT_TABS = ['All', 'Math', 'Science', 'History', 'Homeroom'];

export const FEED_POSTS = [
  {
    id: 1,
    subject: 'Math',
    teacher: 'Carol Davis',
    time: '10 min ago',
    title: 'Chapter 7 Review — Quadratic Equations',
    content: 'Please review the following before tomorrow\'s quiz. Focus on **factoring** and the **quadratic formula**.',
    bullets: ['Complete exercises 7.1 – 7.4', 'Watch the Khan Academy video on factoring', 'Bring your graphing calculator'],
    files: [{ name: 'Chapter7_StudyGuide.pdf', size: '1.2 MB' }],
  },
  {
    id: 2,
    subject: 'Science',
    teacher: 'Mr. Smith',
    time: '35 min ago',
    title: 'Science Fair Project Deadline Extended',
    content: 'Great news! The deadline for the Science Fair project proposal has been extended to **next Friday**. Make sure your hypothesis is clearly stated and your methodology is outlined.',
    bullets: [],
    files: [{ name: 'ProjectTemplate.docx', size: '340 KB' }, { name: 'Rubric_2026.pdf', size: '89 KB' }],
  },
  {
    id: 3,
    subject: 'Homeroom',
    teacher: 'Principal Monia',
    time: '1 hour ago',
    title: 'Field Trip Permission Slips',
    content: 'Reminder: All permission slips for the **Gothenburg Museum trip** must be submitted by Wednesday.',
    bullets: ['Bring a packed lunch', 'We depart at 08:00 sharp from the main entrance', 'Dress code: school uniform required'],
    files: [{ name: 'PermissionSlip.pdf', size: '56 KB' }],
  },
  {
    id: 4,
    subject: 'History',
    teacher: 'Emma Wright',
    time: '2 hours ago',
    title: 'Essay Draft Due Thursday',
    content: 'Your first draft of the **Industrial Revolution essay** is due this Thursday. Please follow the MLA format and include at least 3 cited sources.',
    bullets: ['Minimum 5 paragraphs', 'Use proper citations (MLA)', 'Submit via the class portal'],
    files: [],
  },
  {
    id: 5,
    subject: 'Math',
    teacher: 'Carol Davis',
    time: 'Yesterday',
    title: 'Homework Set 12 Answers Posted',
    content: 'The answer key for **Homework Set 12** has been uploaded. Please self-check your answers before class.',
    bullets: [],
    files: [{ name: 'HW12_AnswerKey.pdf', size: '210 KB' }],
  },
];

export type SidebarTab = 'grid' | 'countin' | 'announcements' | 'help' | 'profile' | 'settings';

// --- STUDENT DASHBOARD DATA ---

export const STUDENT_SCHEDULE = [
  { time: '08:00 – 09:30', label: 'Math 101', teacher: 'Carol Davis', room: 'Room 302', status: 'done' as const },
  { time: '10:00 – 11:30', label: 'Science 102', teacher: 'Mr. Smith', room: 'Lab 2', status: 'active' as const },
  { time: '12:00 – 13:00', label: 'Lunch', teacher: '', room: 'Cafeteria', status: 'upcoming' as const },
  { time: '13:00 – 14:30', label: 'History 201', teacher: 'Emma Wright', room: 'Room 405', status: 'upcoming' as const },
  { time: '14:45 – 15:30', label: 'Homeroom', teacher: 'Principal Monia', room: 'Room 101', status: 'upcoming' as const },
];

export const ACTION_ITEMS = [
  { id: 1, title: 'Math Worksheet Ch. 7', subject: 'Math', due: 'Tomorrow', done: false },
  { id: 2, title: 'Science Fair Proposal Draft', subject: 'Science', due: 'Friday', done: false },
  { id: 3, title: 'History Essay Outline', subject: 'History', due: 'Thursday', done: true },
];

export const QUICK_APPS = [
  { id: 1, label: 'Drive', icon: '📁', color: 'bg-blue-50 text-blue-600 border-blue-100' },
  { id: 2, label: 'Calculator', icon: '🧮', color: 'bg-orange-50 text-orange-600 border-orange-100' },
  { id: 3, label: 'LMS', icon: '📚', color: 'bg-purple-50 text-purple-600 border-purple-100' },
  { id: 4, label: 'Email', icon: '✉️', color: 'bg-neutral-50 text-[#1A1A1A] border-neutral-100' },
];
