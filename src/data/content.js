export const subjects = [
  { id: 'math', name: 'الرياضيات', icon: '∑', color: '#4d65d8', description: 'مساحة مخصصة لتنظيم فصول الرياضيات وموادها.' },
  { id: 'physics', name: 'الفيزياء', icon: '⚛', color: '#397ca3', description: 'مساحة مخصصة لتنظيم فصول الفيزياء وموادها.' },
  { id: 'chemistry', name: 'الكيمياء', icon: '⌬', color: '#7657a8', description: 'مساحة مخصصة لتنظيم فصول الكيمياء وموادها.' },
  { id: 'biology', name: 'الأحياء', icon: '⌁', color: '#3b8968', description: 'مساحة مخصصة لتنظيم فصول الأحياء وموادها.' },
  { id: 'arabic', name: 'اللغة العربية', icon: 'ض', color: '#bc714b', description: 'مساحة مخصصة لتنظيم فصول اللغة العربية وموادها.' },
  { id: 'english', name: 'اللغة الإنجليزية', icon: 'En', color: '#36818b', description: 'مساحة مخصصة لتنظيم فصول اللغة الإنجليزية وموادها.' },
  { id: 'islamic', name: 'التربية الإسلامية', icon: '◈', color: '#a57b2d', description: 'مساحة مخصصة لتنظيم فصول التربية الإسلامية وموادها.' },
];

// أضف الفصول لكل مادة هنا بشكل مستقل. لا تشترك المواد في بنية فصلية مفترضة.
export const chaptersBySubject = {
  math: [], physics: [], chemistry: [], biology: [], arabic: [], english: [], islamic: [],
};

export const contentStore = {
  summaries: [], ministryExams: [], questions: [], practiceExams: [], resources: [], experiences: [],
};

export const generalCategories = ['الدراسة', 'تنظيم الوقت', 'الامتحانات', 'تجارب شخصية', 'نصائح الطلاب', 'الصعوبات', 'الجامعة والتقديم', 'الحياة الدراسية'];
export const resourceCategories = ['الكتب', 'الملفات', 'المصادر الرسمية', 'المواقع التعليمية', 'الروابط المفيدة'];
