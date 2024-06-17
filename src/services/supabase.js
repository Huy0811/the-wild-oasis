import { createClient } from "@supabase/supabase-js"

export const supabaseUrl = "https://alyrltzwyesgewmltqxw.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFseXJsdHp3eWVzZ2V3bWx0cXh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc4NDk1MTgsImV4cCI6MjAzMzQyNTUxOH0.BSvpFOHCyYzIz-GMGeJc_ACldbnc6nIjPfH_e1nTVrE"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
