import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { FinancialYear } from '../api/financialYears';

const getFinancialYears = vi.fn();

vi.mock('../api/financialYears', () => ({
  getFinancialYears: (...args: unknown[]) => getFinancialYears(...args),
  activateFinancialYear: vi.fn(),
  createFinancialYear: vi.fn(),
}));

import { useFYStore } from './useFYStore';

const seeded = { id: 1, label: '2026-27', is_active: true } as FinancialYear;

describe('useFYStore.refreshFYList', () => {
  beforeEach(() => {
    getFinancialYears.mockReset();
    useFYStore.setState({ fyList: [], loading: false });
  });

  it('replaces the empty list loaded before a company existed', async () => {
    getFinancialYears.mockResolvedValueOnce([seeded]);
    await useFYStore.getState().refreshFYList();
    expect(useFYStore.getState().fyList).toEqual([seeded]);
    expect(useFYStore.getState().loading).toBe(false);
  });

  it('keeps the existing list when the request fails', async () => {
    useFYStore.setState({ fyList: [seeded] });
    getFinancialYears.mockRejectedValueOnce(new Error('409'));
    await useFYStore.getState().refreshFYList();
    expect(useFYStore.getState().fyList).toEqual([seeded]);
  });
});
