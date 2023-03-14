import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VUE_APP_SUPABASE_URL;
// console.log(supabaseUrl);
const supabaseAnonKey = import.meta.env.VUE_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(
  "https://lkkakwypovledixxrrja.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxra2Frd3lwb3ZsZWRpeHhycmphIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODAxMDMwMCwiZXhwIjoxOTkzNTg2MzAwfQ.tn-yAR2ThSjQcr9Z5c58LWzn9yDNvDk-MuF3N5CrWzU"
);
