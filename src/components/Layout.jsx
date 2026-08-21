import { useEffect, useState } from 'react';
import Icon from './Icons';

const nav = [
  ['/', 'الرئيسية'], ['/subjects', 'المواد الدراسية'], ['/summaries', 'الملخصات'], ['/ministry', 'الوزاريات'],
  ['/questions', 'الأسئلة'], ['/exams', 'الاختبارات'], ['/general-qa', 'الأسئلة العامة'], ['/resources', 'المصادر'], ['/about', 'حول الموقع'],
];

export function Link({ to, children, className='', onClick }) {
  const go = (e) => { e.preventDefault(); window.history.pushState({}, '', to); window.dispatchEvent(new PopStateEvent('popstate')); onClick?.(); window.scrollTo({top:0, behavior:'smooth'}); };
  return <a href={to} onClick={go} className={className}>{children}</a>;
}

export function Header({ path }) {
  const [open, setOpen] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installHelp, setInstallHelp] = useState(false);
  const [installed, setInstalled] = useState(() => window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true);

  useEffect(() => {
    const ready = (event) => { event.preventDefault(); setInstallPrompt(event); };
    const done = () => { setInstalled(true); setInstallPrompt(null); };
    window.addEventListener('beforeinstallprompt', ready);
    window.addEventListener('appinstalled', done);
    return () => {
      window.removeEventListener('beforeinstallprompt', ready);
      window.removeEventListener('appinstalled', done);
    };
  }, []);

  const install = async () => {
    if (!installPrompt) { setInstallHelp(true); return; }
    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  };
  return <>
    <div className="topline"><div className="container">منصة تعليمية مجانية لطلبة السادس الإعدادي في العراق <span>• ليست جهة رسمية</span></div></div>
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="السادس الإعدادي - الرئيسية"><img className="brand-mark" src="/app-icon.svg" alt=""/><span><strong>السادس الإعدادي</strong><small>خطوتك نحو تنظيم أفضل</small></span></Link>
        <nav className={`nav ${open ? 'is-open' : ''}`} aria-label="التنقل الرئيسي">
          {nav.map(([to,label]) => <Link key={to} to={to} onClick={()=>setOpen(false)} className={(path === to || (to !== '/' && path.startsWith(to))) ? 'active' : ''}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          {!installed && <button className="install-button" onClick={install}>تثبيت التطبيق</button>}
          <Link to="/search" className="icon-button" aria-label="البحث"><Icon name="search" /></Link>
          <button className="icon-button mobile-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open?'إغلاق القائمة':'فتح القائمة'}><Icon name={open?'close':'menu'} /></button>
        </div>
      </div>
    </header>
    {open && <button className="nav-backdrop" aria-label="إغلاق القائمة" onClick={()=>setOpen(false)} />}
    {installHelp && <div className="modal-backdrop" role="presentation" onClick={()=>setInstallHelp(false)}><div className="install-modal" role="dialog" aria-modal="true" aria-labelledby="install-title" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setInstallHelp(false)} aria-label="إغلاق"><Icon name="close" size={19}/></button><img src="/app-icon.svg" alt="أيقونة تطبيق السادس"/><h2 id="install-title">تثبيت تطبيق السادس</h2><p>على iPhone افتح قائمة المشاركة في Safari ثم اختر «إضافة إلى الشاشة الرئيسية».</p><p>على Android افتح قائمة المتصفح ثم اختر «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية».</p><button className="button secondary wide" onClick={()=>setInstallHelp(false)}>فهمت</button></div></div>}
  </>;
}

export function Footer() {
  return <footer className="footer"><div className="container footer-grid">
    <div className="footer-intro"><div className="brand brand-light"><img className="brand-mark" src="/app-icon.svg" alt=""/><span><strong>السادس الإعدادي</strong></span></div><p>مساحة تعليمية مجانية تساعد الطالب العراقي على الوصول إلى مواده بصورة مرتبة وواضحة.</p><small>منصة مستقلة وغير تابعة لوزارة التربية العراقية.</small></div>
    <div><h3>استكشف</h3><Link to="/subjects">المواد الدراسية</Link><Link to="/summaries">الملخصات</Link><Link to="/ministry">الوزاريات</Link><Link to="/exams">الاختبارات</Link></div>
    <div><h3>المنصة</h3><Link to="/general-qa">الأسئلة العامة</Link><Link to="/resources">المصادر</Link><Link to="/search">البحث</Link><Link to="/about">حول الموقع</Link></div>
    <div><h3>تواصل</h3><span className="muted-link">قنوات التواصل — قريبًا</span><span className="muted-link">البريد الإلكتروني — قريبًا</span></div>
  </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} السادس الإعدادي. جميع الحقوق محفوظة.</span><span>صُنع بعناية للطالب العراقي</span></div></footer>;
}

export function Layout({ children, path }) { return <><Header path={path}/><main>{children}</main><Footer/></>; }
