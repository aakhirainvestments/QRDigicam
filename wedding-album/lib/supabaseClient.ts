import { createClient } from '@supabase/supabase-js';

const url =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://jypzpegrodddmphozpbs.supabase.co';

const anonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5cHpwZWdyb2RkZG1waG96cGJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTU2MDk1MDUsImV4cCI6MjExMTE4NTUwNX0.2Fh86CEYx1Y1OIxpOO0CY_IeOFGwy5Vj6QtNI5Og5eQ';

export const supabase = createClient(url, anonKey);
