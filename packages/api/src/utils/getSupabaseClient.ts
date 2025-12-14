import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

export const getSupabaseClient = (): SupabaseClient => {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('Missing Supabase URL or Key');
  }
  return createClient(SUPABASE_URL, SUPABASE_KEY);
}
