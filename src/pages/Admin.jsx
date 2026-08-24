import { useEffect, useMemo, useState } from "react";
import Icon from "../components/Icons";
import { ChapterSelect, EmptyState, SubjectSelect } from "../components/UI";
import { subjects } from "../data/content";
import { CONTENT_BUCKET, supabase } from "../lib/supabase";

const types = [
  ["summary", "ملخص"],
  ["ministry", "وزاريات"],
  ["question", "سؤال أكاديمي"],
  ["resource", "مصدر"],
  ["experience", "سؤال أو تجربة عامة"],
];
const blank = {
  type: "summary",
  title: "",
  description: "",
  subject_id: "",
  division_id: "",
  category: "",
  source_name: "",
  year: "",
  exam_round: "",
  body: "",
  answer: "",
  external_url: "",
  is_published: false,
};

export default function Admin() {
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState("");
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const load = async () => {
    const { data: isAdmin, error: adminError } =
      await supabase.rpc("is_platform_admin");
    if (adminError || !isAdmin) {
      setAuthError("هذا الحساب غير مخول لإدارة المنصة.");
      await supabase.auth.signOut();
      return;
    }
    const { data, error } = await supabase
      .from("content_items")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setItems((data || []).filter((item) => item.type !== "exam"));
  };
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
      if (data.session) load();
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      if (next) load();
    });
    return () => subscription.unsubscribe();
  }, []);
  const login = async (e) => {
    e.preventDefault();
    setAuthError("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setAuthError("تعذر تسجيل الدخول. تحقق من البريد وكلمة المرور.");
  };
  const divisionAllowed = useMemo(() => {
    const s = subjects.find((x) => x.id === form.subject_id);
    return (
      !s?.division.visibleIn ||
      s.division.visibleIn.includes(
        form.type === "summary"
          ? "summaries"
          : form.type === "question"
            ? "questions"
            : form.type,
      )
    );
  }, [form.subject_id, form.type]);
  const set = (name, value) =>
    setForm((current) => ({ ...current, [name]: value }));
  const reset = () => {
    setForm(blank);
    setEditing("");
    setFile(null);
    setNotice("");
  };
  const edit = (item) => {
    setForm({ ...blank, ...item, year: item.year || "" });
    setEditing(item.id);
    setFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    setNotice("");
    let file_path = editing
      ? items.find((x) => x.id === editing)?.file_path
      : null;
    let file_url = editing
      ? items.find((x) => x.id === editing)?.file_url
      : null;
    if (file) {
      const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
      file_path = `${form.type}/${crypto.randomUUID()}-${safe}`;
      const { error: uploadError } = await supabase.storage
        .from(CONTENT_BUCKET)
        .upload(file_path, file);
      if (uploadError) {
        setNotice(`تعذر رفع الملف: ${uploadError.message}`);
        setBusy(false);
        return;
      }
      file_url = supabase.storage.from(CONTENT_BUCKET).getPublicUrl(file_path)
        .data.publicUrl;
    }
    const payload = {
      ...form,
      year: form.year ? Number(form.year) : null,
      division_id: divisionAllowed ? form.division_id || null : null,
      file_path,
      file_url,
    };
    delete payload.id;
    delete payload.created_at;
    delete payload.updated_at;
    delete payload.created_by;
    delete payload.sort_order;
    delete payload.difficulty;
    delete payload.question_type;
    if (form.type === "resource") payload.category = "الكتب";
    const result = editing
      ? await supabase.from("content_items").update(payload).eq("id", editing)
      : await supabase.from("content_items").insert(payload);
    if (result.error) setNotice(`تعذر الحفظ: ${result.error.message}`);
    else {
      setNotice("تم حفظ المحتوى بنجاح.");
      await load();
      setTimeout(reset, 900);
    }
    setBusy(false);
  };
  const remove = async (item) => {
    if (!confirm(`هل تريد حذف «${item.title}»؟`)) return;
    setBusy(true);
    if (item.file_path)
      await supabase.storage.from(CONTENT_BUCKET).remove([item.file_path]);
    const { error } = await supabase
      .from("content_items")
      .delete()
      .eq("id", item.id);
    if (error) setNotice(error.message);
    else await load();
    setBusy(false);
  };
  if (checking) return <div className="admin-loading">جارٍ التحقق…</div>;
  if (!session)
    return (
      <main className="admin-login">
        <form onSubmit={login}>
          <img src="/app-icon.svg" alt="" />
          <span className="eyebrow">منطقة خاصة</span>
          <h1>دخول مدير المنصة</h1>
          <p>هذه الصفحة مخصصة لمدير المحتوى فقط.</p>
          <label>
            البريد الإلكتروني
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </label>
          <label>
            كلمة المرور
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </label>
          {authError && <div className="form-error">{authError}</div>}
          <button className="button primary wide">تسجيل الدخول</button>
        </form>
      </main>
    );
  return (
    <main className="admin-page">
      <div className="container">
        <header className="admin-head">
          <div>
            <span className="eyebrow">لوحة خاصة</span>
            <h1>إدارة المحتوى</h1>
            <p>{session.user.email}</p>
          </div>
          <button
            className="button secondary"
            onClick={() => supabase.auth.signOut()}
          >
            تسجيل الخروج
          </button>
        </header>
        <div className="admin-grid">
          <form className="admin-form" onSubmit={save}>
            <div className="admin-form-title">
              <h2>{editing ? "تعديل المحتوى" : "إضافة محتوى جديد"}</h2>
              {editing && (
                <button type="button" onClick={reset}>
                  إلغاء التعديل
                </button>
              )}
            </div>
            <div className="admin-fields">
              <label>
                نوع المحتوى
                <select
                  value={form.type}
                  onChange={(e) => set("type", e.target.value)}
                >
                  {types.map(([id, name]) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                العنوان
                <input
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  required
                />
              </label>
              <label>
                المادة
                <SubjectSelect
                  value={form.subject_id}
                  onChange={(e) => {
                    set("subject_id", e.target.value);
                    set("division_id", "");
                  }}
                  allLabel="بدون مادة"
                />
              </label>
              {divisionAllowed && (
                <label>
                  تقسيم المادة
                  <ChapterSelect
                    subjectId={form.subject_id}
                    value={form.division_id}
                    onChange={(e) => set("division_id", e.target.value)}
                  />
                </label>
              )}
              <label className="span-2">
                الوصف
                <textarea
                  value={form.description || ""}
                  onChange={(e) => set("description", e.target.value)}
                  rows="3"
                />
              </label>
              <label>
                المصدر أو المؤلف
                <input
                  value={form.source_name || ""}
                  onChange={(e) => set("source_name", e.target.value)}
                />
              </label>
              {form.type === "experience" && (
                <label>
                  التصنيف
                  <input
                    value={form.category || ""}
                    onChange={(e) => set("category", e.target.value)}
                  />
                </label>
              )}
              {form.type === "resource" && (
                <label>
                  قسم المصدر
                  <select value="الكتب" disabled>
                    <option>الكتب</option>
                  </select>
                </label>
              )}
              {form.type === "ministry" && (
                <>
                  <label>
                    السنة
                    <input
                      type="number"
                      value={form.year}
                      onChange={(e) => set("year", e.target.value)}
                    />
                  </label>
                  <label>
                    الدور
                    <select
                      value={form.exam_round || ""}
                      onChange={(e) => set("exam_round", e.target.value)}
                    >
                      <option value="">اختر الدور</option>
                      <option>الدور الأول</option>
                      <option>الدور الثاني</option>
                      <option>الدور الثالث</option>
                    </select>
                  </label>
                </>
              )}
              {form.type === "question" && (
                <>
                  <label className="span-2">
                    نص السؤال
                    <textarea
                      value={form.body || ""}
                      onChange={(e) => set("body", e.target.value)}
                      rows="4"
                    />
                  </label>
                  <label className="span-2">
                    الإجابة المعتمدة
                    <textarea
                      value={form.answer || ""}
                      onChange={(e) => set("answer", e.target.value)}
                      rows="4"
                    />
                  </label>
                </>
              )}
              <label>
                رابط خارجي
                <input
                  type="url"
                  value={form.external_url || ""}
                  onChange={(e) => set("external_url", e.target.value)}
                />
              </label>
              <label>
                ملف PDF أو صورة
                <input
                  type="file"
                  accept=".pdf,image/png,image/jpeg,image/webp"
                  onChange={(e) => setFile(e.target.files[0] || null)}
                />
              </label>
              <label className="publish-check">
                <input
                  type="checkbox"
                  checked={form.is_published}
                  onChange={(e) => set("is_published", e.target.checked)}
                />
                <span>نشر المحتوى للطلاب</span>
              </label>
            </div>
            {notice && (
              <div
                className={
                  notice.startsWith("تم") ? "form-success" : "form-error"
                }
              >
                {notice}
              </div>
            )}
            <button className="button primary wide" disabled={busy}>
              {busy
                ? "جارٍ الحفظ…"
                : editing
                  ? "حفظ التعديلات"
                  : "إضافة المحتوى"}
            </button>
          </form>
          <section className="admin-list">
            <div className="admin-list-head">
              <h2>المحتوى المضاف</h2>
              <span>{items.length}</span>
            </div>
            {items.length ? (
              items.map((item) => (
                <article className="admin-item" key={item.id}>
                  <div>
                    <span>{types.find((x) => x[0] === item.type)?.[1]}</span>
                    <h3>{item.title}</h3>
                    <p>
                      {subjects.find((x) => x.id === item.subject_id)?.name ||
                        "عام"}{" "}
                      • {item.is_published ? "منشور" : "مسودة"}
                    </p>
                  </div>
                  <div>
                    <button onClick={() => edit(item)} aria-label="تعديل">
                      <Icon name="file" size={18} />
                    </button>
                    <button onClick={() => remove(item)} aria-label="حذف">
                      <Icon name="close" size={18} />
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <EmptyState
                compact
                title="لا يوجد محتوى بعد"
                text="استخدم النموذج لإضافة أول عنصر حقيقي."
              />
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
