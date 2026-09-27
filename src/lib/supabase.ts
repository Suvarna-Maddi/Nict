import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hvnqcwgbtrpslhchzbzm.supabase.co';
const supabaseAnonKey = 'sb_publishable_JSEqEetIosmo1GIcwA17YQ_VxUEH-i0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
