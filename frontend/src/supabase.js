import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ciouhyaocyserjkdeaph.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
if (!supabaseKey) {
    throw new Error("supabasekey not found")
}
const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase }