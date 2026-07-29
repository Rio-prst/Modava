import { createClient } from '@supabase/supabase-js';

function normalizeSupabaseUrl(raw: string): string {
  const trimmed = raw.replace(/\/rest\/v1\/?$/, '');
  return trimmed.replace(/\/$/, '');
}

export function createSupabaseClient() {
  const rawUrl = process.env['SUPABASE_URL'];
  const key = process.env['SUPABASE_SERVICE_ROLE_KEY'];

  if (!rawUrl) {
    throw new Error('SUPABASE_URL is not configured');
  }

  if (!key) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured');
  }

  return createClient(normalizeSupabaseUrl(rawUrl), key);
}
