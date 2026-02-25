import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://kmyiammapgopglaggnhq.supabase.co"
const supabaseKey = "sb_publishable_8YooNnet_xmiehO3yGK0VQ_d9Bfqces"

export const supabase = createClient(supabaseUrl, supabaseKey)