/**
 * Supabase Configuration
 * 
 * This file exports Supabase configuration values.
 * It reads from environment variables (for production) with fallback to hardcoded values (for development).
 * 
 * Environment Variables:
 * - VITE_SUPABASE_URL: Full Supabase project URL (e.g., https://project-id.supabase.co)
 * - VITE_SUPABASE_ANON_KEY: Supabase anonymous/public key
 * - VITE_SUPABASE_PROJECT_ID: Supabase project ID
 * 
 * If environment variables are not set, it falls back to hardcoded values for backward compatibility.
 */

// Get project ID from environment variable or use hardcoded fallback
export const projectId = 
  import.meta.env.VITE_SUPABASE_PROJECT_ID || 
  "elznbletkunibhicbizb";

// Get anonymous key from environment variable or use hardcoded fallback
export const publicAnonKey = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsem5ibGV0a3VuaWJoaWNiaXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2NDM3NjYsImV4cCI6MjA3NzIxOTc2Nn0.4HppRI5vcRf2zxjMKBPYghjVL0aYDCniniaDpqOTnvI";

// Get Supabase URL from environment variable or construct from project ID
export const supabaseUrl = 
  import.meta.env.VITE_SUPABASE_URL || 
  `https://${projectId}.supabase.co`;

/**
 * Helper function to get the full Supabase URL
 * Use this when you need the complete URL instead of constructing it
 */
export function getSupabaseUrl(): string {
  return supabaseUrl;
}