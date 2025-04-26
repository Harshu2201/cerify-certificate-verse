
import { createClient } from '@supabase/supabase-js';

// Ensure environment variables are correctly imported for Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables', {
    supabaseUrl,
    supabaseAnonKey: supabaseAnonKey ? '***' : undefined
  });
  throw new Error('Missing Supabase environment variables. Please check your Supabase configuration.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
