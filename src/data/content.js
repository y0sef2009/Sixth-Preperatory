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
  math: [
    { id: 'math-chapter-1', name: 'الفصل الأول', order: 1 },
    { id: 'math-chapter-2', name: 'الفصل الثاني', order: 2 },
    { id: 'math-chapter-3', name: 'الفصل الثالث', order: 3 },
    { id: 'math-chapter-4', name: 'الفصل الرابع', order: 4 },
    { id: 'math-chapter-5', name: 'الفصل الخامس', order: 5 },
    { id: 'math-chapter-6', name: 'الفصل السادس', order: 6 },
  ],
  physics: [
    { id: 'physics-chapter-1', name: 'الفصل الأول', order: 1 },
    { id: 'physics-chapter-2', name: 'الفصل الثاني', order: 2 },
    { id: 'physics-chapter-3', name: 'الفصل الثالث', order: 3 },
    { id: 'physics-chapter-4', name: 'الفصل الرابع', order: 4 },
    { id: 'physics-chapter-5', name: 'الفصل الخامس', order: 5 },
    { id: 'physics-chapter-6', name: 'الفصل السادس', order: 6 },
    { id: 'physics-chapter-7', name: 'الفصل السابع', order: 7 },
    { id: 'physics-chapter-8', name: 'الفصل الثامن', order: 8 },
    { id: 'physics-chapter-9', name: 'الفصل التاسع', order: 9 },
  ],
  chemistry: [
    { id: 'chemistry-chapter-1', name: 'الفصل الأول', order: 1 },
    { id: 'chemistry-chapter-2', name: 'الفصل الثاني', order: 2 },
    { id: 'chemistry-chapter-3', name: 'الفصل الثالث', order: 3 },
    { id: 'chemistry-chapter-4', name: 'الفصل الرابع', order: 4 },
    { id: 'chemistry-chapter-5', name: 'الفصل الخامس', order: 5 },
    { id: 'chemistry-chapter-6', name: 'الفصل السادس', order: 6 },
    { id: 'chemistry-chapter-7', name: 'الفصل السابع', order: 7 },
    { id: 'chemistry-chapter-8', name: 'الفصل الثامن', order: 8 },
  ],
  biology: [
    { id: 'biology-chapter-1', name: 'الفصل الأول (الخلية)', order: 1 },
    { id: 'biology-chapter-2', name: 'الفصل الثاني (الأنسجة)', order: 2 },
    { id: 'biology-chapter-3', name: 'الفصل الثالث (التكاثر)', order: 3 },
    { id: 'biology-chapter-4', name: 'الفصل الرابع (التكوين الجنيني)', order: 4 },
    { id: 'biology-chapter-5', name: 'الفصل الخامس (الوراثة)', order: 5 },
  ],
  arabic: [
    { id: 'arabic-topic-1', name: 'الأدب والنصوص', order: 1 },
    { id: 'arabic-topic-2', name: 'الإنشاءات', order: 2 },
    { id: 'arabic-topic-3', name: 'أسلوب الاستفهام', order: 3 },
    { id: 'arabic-topic-4', name: 'النفي', order: 4 },
    { id: 'arabic-topic-5', name: 'أسلوب التقديم والتأخير', order: 5 },
    { id: 'arabic-topic-6', name: 'أسلوب التوكيد', order: 6 },
    { id: 'arabic-topic-7', name: 'أسلوب النداء', order: 7 },
    { id: 'arabic-topic-8', name: 'أسلوبا التعجب', order: 8 },
    { id: 'arabic-topic-9', name: 'أسلوب المدح والذم', order: 9 },
    { id: 'arabic-topic-10', name: 'أسلوبا التمني والترجي', order: 10 },
    { id: 'arabic-topic-11', name: 'أسلوبا العرض والتحضيض', order: 11 },
    { id: 'arabic-topic-12', name: 'أسلوب التحذير والإغراء', order: 12 },
  ],
  english: [
    { id: 'english-unit-1', name: 'الوحدة الأولى', order: 1 },
    { id: 'english-unit-2', name: 'الوحدة الثانية', order: 2 },
    { id: 'english-unit-3', name: 'الوحدة الثالثة', order: 3 },
    { id: 'english-unit-4', name: 'الوحدة الرابعة', order: 4 },
    { id: 'english-unit-5', name: 'الوحدة الخامسة', order: 5 },
    { id: 'english-unit-6', name: 'الوحدة السادسة', order: 6 },
    { id: 'english-unit-7', name: 'الوحدة السابعة', order: 7 },
    { id: 'english-unit-8', name: 'الوحدة الثامنة', order: 8 },
  ],
  french: [
    { id: 'french-topic-1', name: 'الأزمنة', order: 1 },
    { id: 'french-topic-2', name: 'التعويض', order: 2 },
    { id: 'french-topic-3', name: 'الاستفهام', order: 3 },
    { id: 'french-topic-4', name: 'ضمائر الوصل', order: 4 },
    { id: 'french-topic-5', name: 'التأنيث', order: 5 },
    { id: 'french-topic-6', name: 'اشتقاق الظروف', order: 6 },
    { id: 'french-topic-7', name: 'الجمع', order: 7 },
    { id: 'french-topic-8', name: 'حروف الجر', order: 8 },
    { id: 'french-topic-9', name: 'أدوات الربط', order: 9 },
    { id: 'french-topic-10', name: 'الحوارات', order: 10 },
  ],
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
