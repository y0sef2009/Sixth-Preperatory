import { useState } from "react";
import Icon from "../components/Icons";
import ContentGrid from "../components/ContentGrid";
import { Link } from "../components/Layout";
import {
  Breadcrumbs,
  ChapterSelect,
  EmptyState,
  FilterSearch,
  PageHero,
  SubjectCard,
  SubjectSelect,
} from "../components/UI";
import {
  chaptersBySubject,
  generalCategories,
  subjects,
} from "../data/content";
import { useContent } from "../hooks/useContent";

export function Subjects() {
  const { items: resources } = useContent("resource");
  return (
    <>
      <PageHero
        eyebrow="المواد الدراسية"
        title="كل المواد في مساحة واحدة"
        description="اختر مادتك للوصول إلى تقسيماتها وملخصاتها وأسئلتها ومصادرها عند إضافتها."
      >
        <Breadcrumbs items={[{ label: "المواد الدراسية" }]} />
      </PageHero>
      <section className="section">
        <div className="container">
          <div className="subjects-grid">
            {subjects.map((s) => (
              <SubjectCard
                key={s.id}
                subject={s}
                resourceCount={
                  resources.filter((item) => item.subject_id === s.id).length
                }
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function SubjectDetail({ id }) {
  const { items, loading, error } = useContent();
  const subject = subjects.find((s) => s.id === id);
  if (!subject) return <NotFound />;
  const chapters = chaptersBySubject[id] || [];
  const division = subject.division;
  const subjectItems = items.filter((item) => item.subject_id === id);
  return (
    <>
      <PageHero
        eyebrow="صفحة المادة"
        title={subject.name}
        description={`مساحة المادة المستقلة، جاهزة لإضافة ${division.plural} ومحتواها دون التأثير في بقية المواد.`}
      >
        <Breadcrumbs
          items={[
            { label: "المواد الدراسية", to: "/subjects" },
            { label: subject.name },
          ]}
        />
      </PageHero>
      <section className="section">
        <div className="container">
          <div
            className="subject-banner"
            style={{ "--subject": subject.color }}
          >
            <span className="subject-icon large">{subject.icon}</span>
            <div>
              <h2>{subject.name}</h2>
              <p>تصفح تقسيمات المادة وجميع محتوياتها المنشورة في مكان واحد.</p>
            </div>
            <span className="resource-pill">{subjectItems.length} محتوى</span>
          </div>
          <div className="content-tabs">
            <Link to={`/summaries?subject=${id}`}>الملخصات</Link>
            <Link to={`/ministry?subject=${id}`}>الوزاريات</Link>
            <Link to={`/questions?subject=${id}`}>الأسئلة</Link>
            <Link to={`/exams?subject=${id}`}>الاختبارات</Link>
            <Link to={`/resources?subject=${id}`}>المصادر</Link>
          </div>
          <div className="section-heading mini">
            <div>
              <h2>{division.plural} المادة</h2>
              <p>اختر التقسيم المناسب، ثم استعرض المحتوى المنشور أدناه.</p>
            </div>
          </div>
          {chapters.length ? (
            <div className="cards-grid">
              {chapters.map((c) => (
                <div className="content-card" key={c.id}>
                  {c.name}
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title={`لم تُضف ${division.plural} لهذه المادة بعد`}
              text={`ستظهر ${division.plural} هنا تلقائيًا بعد إضافتها إلى بنية بيانات المادة.`}
            />
          )}
          <div className="results-head">
            <h2>محتوى {subject.name}</h2>
            <span>{subjectItems.length} عنصر</span>
          </div>
          <ContentGrid
            items={subjectItems}
            loading={loading}
            error={error}
            emptyText="لا يوجد محتوى منشور لهذه المادة حاليًا."
          />
        </div>
      </section>
    </>
  );
}

const pageConfigs = {
  summaries: {
    eyebrow: "مكتبة الملخصات",
    title: "الملخصات الدراسية",
    description:
      "واجهة مرتبة للوصول إلى الملخصات حسب المادة وتقسيمها والتصنيف.",
    data: "summaries",
    icon: "file",
  },
  ministry: {
    eyebrow: "الأسئلة الوزارية",
    title: "الوزاريات",
    description:
      "مساحة مخصصة لتنظيم الأسئلة الوزارية الأصلية بحسب المادة وتقسيمها والسنة والدور.",
    data: "ministryExams",
    icon: "book",
  },
  questions: {
    eyebrow: "تدرّب بتركيز",
    title: "بنك الأسئلة",
    description: "اعثر على الأسئلة الأكاديمية باستخدام فلاتر دقيقة ومرنة.",
    data: "questions",
    icon: "chat",
  },
};
export function ListingPage({ type }) {
  const cfg = pageConfigs[type];
  const dbType = type === "summaries" ? "summary" : type;
  const { items, loading, error } = useContent(dbType);
  const params = new URLSearchParams(location.search);
  const [subject, setSubject] = useState(params.get("subject") || "");
  const [chapter, setChapter] = useState("");
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");
  const [examRound, setExamRound] = useState("");
  const selectedSubject = subjects.find((item) => item.id === subject);
  const divisionVisible =
    !selectedSubject?.division.visibleIn ||
    selectedSubject.division.visibleIn.includes(type);
  const ministryYears = [
    ...new Set(items.map((item) => item.year).filter(Boolean)),
  ].sort((a, b) => b - a);
  const filtered = items.filter(
    (item) =>
      (!subject || item.subject_id === subject) &&
      (!chapter || item.division_id === chapter) &&
      (!year || String(item.year) === year) &&
      (!examRound || item.exam_round === examRound) &&
      (!search ||
        `${item.title} ${item.description || ""} ${item.body || ""}`.includes(
          search,
        )),
  );
  const clearFilters = () => {
    setSubject("");
    setChapter("");
    setSearch("");
    setYear("");
    setExamRound("");
  };

  return (
    <>
      <PageHero
        eyebrow={cfg.eyebrow}
        title={cfg.title}
        description={cfg.description}
      >
        <Breadcrumbs items={[{ label: cfg.title }]} />
      </PageHero>
      <section className="section">
        <div className="container">
          <div className="filter-panel">
            <div className="filter-head">
              <div>
                <h2>ابحث وصفِّ النتائج</h2>
                <p>اختر ما يناسبك للوصول إلى المحتوى المطلوب.</p>
              </div>
              <button className="clear-button" onClick={clearFilters}>
                مسح الفلاتر
              </button>
            </div>
            <div className="filters">
              <FilterSearch
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`ابحث في ${cfg.title}…`}
              />
              <SubjectSelect
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  setChapter("");
                }}
              />
              {divisionVisible && (
                <ChapterSelect
                  subjectId={subject}
                  value={chapter}
                  onChange={(e) => setChapter(e.target.value)}
                />
              )}
              {type === "ministry" && (
                <>
                  <select
                    aria-label="السنة"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  >
                    <option value="">جميع السنوات</option>
                    {ministryYears.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <select
                    aria-label="الدور"
                    value={examRound}
                    onChange={(e) => setExamRound(e.target.value)}
                  >
                    <option value="">جميع الأدوار</option>
                    <option>الدور الأول</option>
                    <option>الدور الثاني</option>
                    <option>الدور الثالث</option>
                  </select>
                </>
              )}
            </div>
          </div>
          <div className="results-head">
            <h2>النتائج</h2>
            <span>{filtered.length} عنصر</span>
          </div>
          <ContentGrid
            items={filtered}
            loading={loading}
            error={error}
            emptyText={`ستظهر ${cfg.title} الحقيقية هنا بعد نشرها من لوحة الإدارة.`}
          />
        </div>
      </section>
    </>
  );
}

export function GeneralQA() {
  const [active, setActive] = useState("الكل");
  const [q, setQ] = useState("");
  const { items, loading, error } = useContent("experience");
  const filtered = items.filter(
    (item) =>
      (active === "الكل" || item.category === active) &&
      (!q ||
        `${item.title} ${item.description || ""} ${item.body || ""}`.includes(
          q,
        )),
  );
  return (
    <>
      <PageHero
        eyebrow="خبرات طلابية"
        title="الأسئلة والأجوبة العامة حول السادس"
        description="مساحة مستقلة للأسئلة والتجارب الواقعية المتعلقة برحلة السادس الإعدادي، وليست بنكًا للأسئلة الأكاديمية."
      >
        <Breadcrumbs items={[{ label: "الأسئلة والأجوبة العامة" }]} />
      </PageHero>
      <section className="section">
        <div className="container">
          <div className="qa-toolbar">
            <FilterSearch
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="ابحث في الأسئلة والتجارب…"
            />
            <div className="category-chips">
              <button
                className={active === "الكل" ? "active" : ""}
                onClick={() => setActive("الكل")}
              >
                الكل
              </button>
              {generalCategories.map((c) => (
                <button
                  className={active === c ? "active" : ""}
                  onClick={() => setActive(c)}
                  key={c}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="info-strip">
            <Icon name="check" />
            <p>لا يظهر هنا إلا المحتوى الحقيقي الذي نشره مدير المنصة.</p>
          </div>
          <ContentGrid
            items={filtered}
            loading={loading}
            error={error}
            emptyText="لا توجد أسئلة أو تجارب منشورة حاليًا."
          />
        </div>
      </section>
    </>
  );
}

export function Resources() {
  const { items, loading, error } = useContent("resource");
  const subjectId = new URLSearchParams(location.search).get("subject") || "";
  const bySubject = subjectId
    ? items.filter((item) => item.subject_id === subjectId)
    : items;
  return (
    <>
      <PageHero
        eyebrow="مكتبة موثوقة"
        title="المصادر"
        description="مكان منظم للكتب الدراسية بعد إضافتها والتحقق منها."
      >
        <Breadcrumbs items={[{ label: "المصادر" }]} />
      </PageHero>
      <section className="section">
        <div className="container">
          <div className="category-cards">
            <button type="button" className="active">
              <Icon name="book" />
              <span>الكتب</span>
              <b>{bySubject.length}</b>
            </button>
          </div>
          <div className="results-head">
            <h2>الكتب</h2>
            <span>{bySubject.length} كتاب</span>
          </div>
          <ContentGrid
            items={bySubject}
            loading={loading}
            error={error}
            emptyText="لا توجد كتب منشورة حاليًا."
          />
        </div>
      </section>
    </>
  );
}

export function Search() {
  const [q, setQ] = useState("");
  const [searched, setSearched] = useState(false);
  const [type, setType] = useState("all");
  const { items, loading, error } = useContent();
  const typeMap = {
    summaries: "summary",
    ministry: "ministry",
    questions: "question",
    exams: "exam",
    resources: "resource",
    experiences: "experience",
  };
  const results =
    searched && q
      ? items.filter(
          (item) =>
            (type === "all" || item.type === typeMap[type]) &&
            `${item.title} ${item.description || ""} ${item.body || ""} ${item.source_name || ""}`.includes(
              q,
            ),
        )
      : [];
  const submit = (e) => {
    e.preventDefault();
    setSearched(true);
  };
  return (
    <>
      <PageHero
        eyebrow="البحث الشامل"
        title="اعثر على ما تحتاجه بسرعة"
        description="ابحث عبر جميع أنواع المحتوى المنشور من واجهة واحدة."
      >
        <Breadcrumbs items={[{ label: "البحث" }]} />
      </PageHero>
      <section className="section">
        <div className="container narrow">
          <form className="big-search" onSubmit={submit}>
            <Icon name="search" />
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setSearched(false);
              }}
              placeholder="اكتب كلمة أو عنوانًا للبحث…"
              autoFocus
            />
            <button className="button primary" type="submit">
              بحث
            </button>
          </form>
          <div className="search-types">
            {[
              ["all", "الكل"],
              ["summaries", "الملخصات"],
              ["ministry", "الوزاريات"],
              ["questions", "الأسئلة"],
              ["exams", "الاختبارات"],
              ["resources", "المصادر"],
              ["experiences", "التجارب"],
            ].map(([id, n]) => (
              <button
                key={id}
                className={type === id ? "active" : ""}
                onClick={() => setType(id)}
              >
                {n}
              </button>
            ))}
          </div>
          {searched && q ? (
            <ContentGrid
              items={results}
              loading={loading}
              error={error}
              emptyText={`لم نجد نتائج مطابقة لعبارة «${q}».`}
            />
          ) : (
            <EmptyState
              title="ابدأ بكتابة ما تبحث عنه"
              text="يمكنك البحث في الملخصات والوزاريات والأسئلة والاختبارات والمصادر والتجارب."
              icon="search"
            />
          )}
        </div>
      </section>
    </>
  );
}

export function About() {
  return (
    <>
      <PageHero
        eyebrow="عن المنصة"
        title="مساحة تعليمية أوضح للطالب العراقي"
        description="بُنيت منصة السادس الإعدادي لتجعل الوصول إلى الموارد التعليمية المنظمة أبسط وأكثر مباشرة."
      >
        <Breadcrumbs items={[{ label: "حول الموقع" }]} />
      </PageHero>
      <section className="section">
        <div className="container about-grid">
          <div className="about-main">
            <span className="eyebrow">لماذا هذه المنصة؟</span>
            <h2>لأن تنظيم المعلومة جزء من التعلّم</h2>
            <p>
              يواجه طالب السادس الإعدادي كمًا كبيرًا من المواد والملفات والأسئلة
              المتفرقة. تهدف المنصة إلى تقديم بنية واحدة واضحة تساعده على الوصول
              إلى المحتوى الأصيل عند إضافته، بحسب المادة والفصل والنوع.
            </p>
            <p>
              المنصة موجهة لطلبة السادس الإعدادي في العراق، ومصممة لتبقى مجانية
              وسهلة الاستخدام على الهاتف والحاسوب.
            </p>
            <div className="values">
              <div>
                <Icon name="layers" />
                <h3>تنظيم واضح</h3>
                <p>مسارات مباشرة للمادة ونوع المحتوى.</p>
              </div>
              <div>
                <Icon name="check" />
                <h3>محتوى مسؤول</h3>
                <p>لا تُعرض مواد تعليمية مختلقة أو غير موثقة.</p>
              </div>
              <div>
                <Icon name="grid" />
                <h3>قابلة للتوسع</h3>
                <p>بنية جاهزة للنمو مع احتياجات الطلبة.</p>
              </div>
            </div>
          </div>
          <aside className="about-aside">
            <img
              className="visual-logo"
              src="/app-icon.svg"
              alt="أيقونة السادس الإعدادي"
            />
            <h3>السادس الإعدادي</h3>
            <p>
              منصة تعليمية مستقلة، وليست تابعة أو ممثلة لوزارة التربية العراقية.
            </p>
            <hr />
            <span>المرحلة الحالية</span>
            <strong>واجهة أمامية جاهزة للمحتوى</strong>
          </aside>
        </div>
      </section>
    </>
  );
}

export function NotFound() {
  return (
    <section className="section not-found">
      <div className="container">
        <strong>404</strong>
        <h1>الصفحة غير موجودة</h1>
        <p>قد يكون الرابط غير صحيح أو أن الصفحة نُقلت.</p>
        <Link to="/" className="button primary">
          العودة إلى الرئيسية
        </Link>
      </div>
    </section>
  );
}
