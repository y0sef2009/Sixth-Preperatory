import { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Exams from './pages/Exams';
import { About, GeneralQA, ListingPage, NotFound, Resources, Search, SubjectDetail, Subjects } from './pages/ContentPages';

function route(path){
  if(path==='/')return <Home/>;
  if(path==='/subjects')return <Subjects/>;
  if(path.startsWith('/subjects/'))return <SubjectDetail id={path.split('/')[2]}/>;
  if(path==='/summaries')return <ListingPage type="summaries"/>;
  if(path==='/ministry')return <ListingPage type="ministry"/>;
  if(path==='/questions')return <ListingPage type="questions"/>;
  if(path==='/exams')return <Exams/>;
  if(path==='/general-qa')return <GeneralQA/>;
  if(path==='/resources')return <Resources/>;
  if(path==='/search')return <Search/>;
  if(path==='/about')return <About/>;
  return <NotFound/>;
}
export default function App(){const [path,setPath]=useState(location.pathname);useEffect(()=>{const fn=()=>setPath(location.pathname);addEventListener('popstate',fn);return()=>removeEventListener('popstate',fn)},[]);useEffect(()=>{document.title=`${path==='/'?'الرئيسية':'السادس الإعدادي'} | السادس الإعدادي`},[path]);return <Layout path={path}>{route(path)}</Layout>}
