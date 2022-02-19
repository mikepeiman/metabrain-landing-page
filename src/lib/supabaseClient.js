import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://nnlhldhudoyhcxzzmoxu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ubGhsZGh1ZG95aGN4enptb3h1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUyODAyNjEsImV4cCI6MTk2MDg1NjI2MX0.7l9_jqyx-aP3xctjSSxkdvyjugMi5XjmAiOuz27IxiY')

export default supabase