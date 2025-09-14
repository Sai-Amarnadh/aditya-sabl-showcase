import { describe, it, expect, vi } from 'vitest';
import * as DataService from './data-service';
import { supabase } from '@/integrations/supabase/client';

vi.mock('@/integrations/supabase/client', () => {
  return {
    supabase: {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      order: vi.fn(),
    },
  };
});

describe('DataService Bug Fix', () => {
  it('getWinners should filter out winners with null or undefined id', async () => {
    const mockWinners = [
      {
        id: 1,
        name: 'Test Winner',
        roll_number: '12345',
        event: 'Test Event',
        date: '2025-01-01',
        photo_url: 'http://example.com/photo.jpg',
        year: '2025',
        is_week_winner: true,
        created_at: '2025-01-01T00:00:00.000Z'
      },
      {
        id: null,
        name: 'Invalid Winner',
        roll_number: '54321',
        event: 'Invalid Event',
        date: '2025-01-02',
        photo_url: 'http://example.com/invalid.jpg',
        year: '2025',
        is_week_winner: false,
        created_at: '2025-01-02T00:00:00.000Z'
      },
    ];

    // Ensure the mock is for the specific call within getWinners
    const orderMock = vi.fn().mockResolvedValue({ data: mockWinners, error: null });
    const selectMock = vi.fn().mockReturnValue({ order: orderMock });
    (supabase.from as vi.Mock).mockReturnValue({ select: selectMock });


    const winners = await DataService.getWinners();

    expect(supabase.from).toHaveBeenCalledWith('winners');
    expect(winners).toHaveLength(1);
    expect(winners[0].name).toBe('Test Winner');
    expect(winners.find(w => w.name === 'Invalid Winner')).toBeUndefined();
  });
});
