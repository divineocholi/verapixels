// supabase.ts
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ciwsrafgkybmqhqzwnlm.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_j9hjFcB49vfiKJt7FvG-Gg_6gZlV5pS'

// Create a single instance
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  },
  global: {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    }
  }
})

export { supabase }