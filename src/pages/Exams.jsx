import { useState } from "react";
import Icon from "../components/Icons";
import ContentGrid from "../components/ContentGrid";
import {
  Breadcrumbs,
  ChapterSelect,
  EmptyState,
  PageHero,
  SubjectSelect,
} from "../components/UI";
import { useContent } from "../hooks/useContent";

export default function Exams() {
  const [subject, setSubject] = useState("");
  const [chapter, setChapter] = useState("");
  const [view, setView] = useState("setup");
  const { items, loading, error } = useContent("exam");
  const published = items.filter(
    (item) =>
      (!subject || item.subject_id === subject) &&
      (!chapter || item.division_id === chapter),
  );
  return (
    <>
      <PageHero
        eyebrow="اختبر استعدادك"
        title="الاختبارات التدريبية"
        description="نظام اختبار متكامل جاهز لاستقبال أسئلة حقيقية عند إضافتها."
      >
        <Breadcrumbs items={[{ label: "الاختبارات" }]} />
      </PageHero>
      <section className="section">
        <div className="container">
          {view === "setup" && (
            <div className="exam-layout">
              <div className="exam-builder">
                <div className="step-label">إعداد اختبار جديد</div>
                <h2>اختر تفاصيل الاختبار</h2>
                <p>حدّد المادة وتقسيمها لبدء الاختبار التدريبي.</p>
                <div className="form-grid">
                  <label>
                    <span>المادة</span>
                    <SubjectSelect
                      value={subject}
                      onChange={(e) => {
                        setSubject(e.target.value);
                        setChapter("");
                      }}
                      allLabel="اختر المادة"
                    />
                  </label>
                  <label>
                    <span>تقسيم المادة</span>
                    <ChapterSelect
                      subjectId={subject}
                      value={chapter}
                      onChange={(e) => setChapter(e.target.value)}
                    />
                  </label>
                </div>
                <button
                  className="button primary wide"
                  disabled={!subject}
                  onClick={() => setView("unavailable")}
                >
                  ابدأ الاختبار <Icon name="arrow" size={18} />
                </button>
              </div>
              <aside className="exam-preview">
                <span className="preview-icon">
                  <Icon name="clock" size={30} />
                </span>
                <h3>تجربة اختبار متكاملة</h3>
                <ul>
                  <li>
                    <Icon name="check" size={18} /> مؤقت واضح للاختبار
                  </li>
                  <li>
                    <Icon name="check" size={18} /> مؤشر للتقدم والتنقل
                  </li>
                  <li>
                    <Icon name="check" size={18} /> اختيار الإجابات ومراجعتها
                  </li>
                  <li>
                    <Icon name="check" size={18} /> نتيجة وعرض للإجابات
                  </li>
                </ul>
                <div className="mock-progress">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </aside>
            </div>
          )}
          {view === "unavailable" && (
            <div className="exam-shell">
              <div className="exam-top">
                <div>
                  <span>اختبار تدريبي</span>
                  <h2>بانتظار إضافة الأسئلة</h2>
                </div>
                <div className="timer">
                  <Icon name="clock" /> 00:00
                </div>
              </div>
              <div className="progress-bar">
                <i style={{ width: "0%" }} />
              </div>
              <EmptyState
                title="لا توجد أسئلة جاهزة لهذا الاختبار"
                text="بعد إضافة الأسئلة الحقيقية، ستظهر هنا واجهة الإجابة والمؤقت والتنقل ثم صفحة النتيجة والمراجعة."
                icon="check"
              />
              <div className="exam-controls">
                <button
                  className="button ghost dark"
                  onClick={() => setView("setup")}
                >
                  العودة للإعداد
                </button>
                <button className="button primary" disabled>
                  تسليم الاختبار
                </button>
              </div>
            </div>
          )}
          <div className="results-head">
            <h2>الاختبارات المنشورة</h2>
            <span>{published.length} اختبار</span>
          </div>
          <ContentGrid
            items={published}
            loading={loading}
            error={error}
            emptyText="لا توجد اختبارات منشورة حاليًا."
          />
        </div>
      </section>
    </>
  );
}
