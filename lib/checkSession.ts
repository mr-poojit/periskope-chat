import { supabase } from './supabaseClient';

export const checkSession = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session;
};