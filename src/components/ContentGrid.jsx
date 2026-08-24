import Icon from './Icons';
import { chaptersBySubject, subjects } from '../data/content';
import { EmptyState } from './UI';

const labels={summary:'ملخص',ministry:'وزاريات',question:'سؤال',resource:'مصدر',experience:'تجربة عامة'};
export default function ContentGrid({items,loading,error,emptyText='ستظهر المواد الحقيقية هنا بعد نشرها.'}){
  if(loading)return <div className="content-loading">جارٍ تحميل المحتوى…</div>;
  if(error)return <EmptyState title="تعذر تحميل المحتوى" text="تحقق من الاتصال ثم حاول تحديث الصفحة." icon="link"/>;
  if(!items.length)return <EmptyState title="لا يوجد محتوى حاليًا" text={emptyText}/>;
  return <div className="published-grid">{items.map(item=>{const subject=subjects.find(s=>s.id===item.subject_id);const division=chaptersBySubject[item.subject_id]?.find(d=>d.id===item.division_id);const url=item.file_url||item.external_url;return <article className="published-card" key={item.id}><div className="published-meta"><span>{labels[item.type]}</span>{item.is_published&&<b>منشور</b>}</div><h3>{item.title}</h3>{item.description&&<p>{item.description}</p>}{item.body&&<div className="question-preview">{item.body}</div>}<div className="published-tags">{subject&&<span>{subject.name}</span>}{division&&<span>{division.name}</span>}{item.year&&<span>{item.year}</span>}{item.exam_round&&<span>{item.exam_round}</span>}</div>{item.source_name&&<small>المصدر: {item.source_name}</small>}{url&&<a className="button secondary wide" href={url} target="_blank" rel="noreferrer">{item.file_url?'فتح الملف':'زيارة الرابط'} <Icon name="arrow" size={17}/></a>}</article>})}</div>;
}
