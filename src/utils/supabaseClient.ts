
import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseUrl = "https://vhnjlvwodmjesvfzexbp.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZobmpsdndvZG1qZXN2ZnpleGJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNDMyNjksImV4cCI6MjA1NjgxOTI2OX0.GfsiUVbInTAHiVqQrf-7bIrzRr5wPPUJ-NZICbLWbAw"

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase
        