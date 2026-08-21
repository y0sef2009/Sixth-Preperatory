export const subjects = [
  { id: 'math', name: 'الرياضيات', icon: '∑', color: '#4d65d8', division: { singular: 'فصل', plural: 'فصول' }, description: 'مساحة مخصصة لتنظيم فصول الرياضيات وموادها.' },
  { id: 'physics', name: 'الفيزياء', icon: '⚛', color: '#397ca3', division: { singular: 'فصل', plural: 'فصول' }, description: 'مساحة مخصصة لتنظيم فصول الفيزياء وموادها.' },
  { id: 'chemistry', name: 'الكيمياء', icon: '⌬', color: '#7657a8', division: { singular: 'فصل', plural: 'فصول' }, description: 'مساحة مخصصة لتنظيم فصول الكيمياء وموادها.' },
  { id: 'biology', name: 'الأحياء', icon: '⌁', color: '#3b8968', division: { singular: 'فصل', plural: 'فصول' }, description: 'مساحة مخصصة لتنظيم فصول الأحياء وموادها.' },
  { id: 'arabic', name: 'اللغة العربية', icon: 'ض', color: '#bc714b', division: { singular: 'موضوع', plural: 'مواضيع' }, description: 'مساحة مخصصة لتنظيم مواضيع اللغة العربية وموادها.' },
  { id: 'english', name: 'اللغة الإنجليزية', icon: 'En', color: '#36818b', division: { singular: 'وحدة', plural: 'وحدات' }, description: 'مساحة مخصصة لتنظيم وحدات اللغة الإنجليزية وموادها.' },
  { id: 'french', name: 'اللغة الفرنسية', icon: 'Fr', color: '#536db3', division: { singular: 'موضوع', plural: 'مواضيع' }, description: 'مساحة مخصصة لتنظيم مواضيع اللغة الفرنسية وموادها.' },
  { id: 'islamic', name: 'التربية الإسلامية', icon: '◈', color: '#a57b2d', division: { singular: 'وحدة', plural: 'وحدات', visibleIn: ['summaries', 'questions', 'exams'] }, description: 'مساحة مخصصة لتنظيم وحدات التربية الإسلامية وموادها.' },
];

// أضف تقسيمات كل مادة هنا بشكل مستقل؛ قد تكون فصولًا أو وحدات أو مواضيع.
export const chaptersBySubject = {
  math: [],
  physics: [],
  chemistry: [],
  biology: [],
  arabic: [],
  english: [],
  french: [],
  islamic: [
    { id: 'islamic-recitation-rules', name: 'أحكام التلاوة', order: 1 },
    { id: 'islamic-unit-1', name: 'الوحدة الأولى', order: 2 },
    { id: 'islamic-unit-2', name: 'الوحدة الثانية', order: 3 },
    { id: 'islamic-unit-3', name: 'الوحدة الثالثة', order: 4 },
    { id: 'islamic-unit-4', name: 'الوحدة الرابعة', order: 5 },
    { id: 'islamic-unit-5', name: 'الوحدة الخامسة', order: 6 },
  ],
};

export const contentStore = {
  summaries: [], ministryExams: [], questions: [], practiceExams: [], resources: [], experiences: [],
};

export const generalCategories = ['الدراسة', 'تنظيم الوقت', 'الامتحانات', 'تجارب شخصية', 'نصائح الطلاب', 'الصعوبات', 'الجامعة والتقديم', 'الحياة الدراسية'];
export const resourceCategories = ['الكتب', 'الملفات', 'المصادر الرسمية', 'المواقع التعليمية', 'الروابط المفيدة'];
