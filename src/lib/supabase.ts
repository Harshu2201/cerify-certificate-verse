
// Mock Supabase client for frontend-only functionality
export const supabase = {
  auth: {
    signInWithPassword: async () => ({ data: null, error: new Error('Backend removed') })
  },
  from: () => ({
    select: () => ({ data: [], error: null }),
    insert: () => ({ error: null }),
    update: () => ({ error: null }),
    delete: () => ({ error: null })
  })
};
