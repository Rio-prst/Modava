import { Global, Module, Provider } from '@nestjs/common';
import { createSupabaseClient } from './supabase.client.js';

export const SUPABASE_CLIENT = Symbol('SUPABASE_CLIENT');

const supabaseProvider: Provider = {
  provide: SUPABASE_CLIENT,
  useFactory: createSupabaseClient,
};

@Global()
@Module({
  providers: [supabaseProvider],
  exports: [SUPABASE_CLIENT],
})
export class SupabaseModule {}
