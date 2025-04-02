import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://efbiuznkmcgfpuidkabc.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmYml1em5rbWNnZnB1aWRrYWJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MTkzNTcsImV4cCI6MjA1OTA5NTM1N30.RVqaWkXyqXYPXXwJlHBbpJ5_Qv0zI0H4xYSEWmo0ECA";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
