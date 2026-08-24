import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useContent(type) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      let query = supabase.from('content_items').select('*').eq('is_published', true).order('created_at', { ascending: false });
      if (type) query = query.eq('type', type);
      else query = query.neq('type', 'exam');
      const { data, error: requestError } = await query;
      if (!active) return;
      setItems(data || []);
      setError(requestError?.code === '42P01' ? '' : requestError?.message || '');
      setLoading(false);
    };
    load();
    return () => { active = false; };
  }, [type]);

  return { items, loading, error };
}
