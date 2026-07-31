import { createClient } from '@supabase/supabase-js';
import WebSocket from 'ws';

function normalizeSupabaseUrl(raw: string): string {
  const trimmed = raw.replace(/\/rest\/v1\/?$/, '');
  return trimmed.replace(/\/$/, '');
}

export function createSupabaseClient() {
  const rawUrl = process.env['SUPABASE_URL'] || 'https://placeholder.supabase.co';
  const key = process.env['SUPABASE_SERVICE_ROLE_KEY'] || 'placeholder-key-12345';

  return createClient(normalizeSupabaseUrl(rawUrl), key, {
    auth: { persistSession: false },
    realtime: {
      transport: WebSocket as any,
    },
  });
}
