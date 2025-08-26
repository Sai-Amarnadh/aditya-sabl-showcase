import { vi } from 'vitest';

vi.mock('@/lib/supabase', () => {
  const from = vi.fn().mockReturnThis();
  const select = vi.fn().mockReturnThis();
  const insert = vi.fn().mockReturnThis();
  const update = vi.fn().mockReturnThis();
  const deleteFn = vi.fn().mockReturnThis();
  const order = vi.fn().mockReturnThis();
  const eq = vi.fn().mockReturnThis();
  const single = vi.fn().mockResolvedValue({ data: {}, error: null });

  return {
    supabase: {
      from,
      select,
      insert,
      update,
      delete: deleteFn,
      order,
      eq,
      single,
    },
  };
});
