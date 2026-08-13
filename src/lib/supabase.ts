import { createClient } from '@supabase/supabase-js';

// Le chiavi arrivano da variabili d'ambiente — mai scritte a mano nel codice.
// PUBLIC_SUPABASE_URL e PUBLIC_SUPABASE_ANON_KEY vanno impostate in .env (locale)
// e nelle variabili d'ambiente del progetto su Cloudflare Pages (produzione).
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
