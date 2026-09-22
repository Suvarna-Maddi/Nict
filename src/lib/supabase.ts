import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://peddizilpwrcflzqkdyi.supabase.co';
const supabaseAnonKey = 'sb_publishable_8vMQQ24v_icoSjI6y1Ow3g_wnzYsZto';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
