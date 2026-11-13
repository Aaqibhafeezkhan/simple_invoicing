import { describe, expect, it } from 'vitest';
import { setupPromptChoices } from './setupPrompt';

describe('setupPromptChoices', () => {
  it('offers the first invoice and the series to an admin', () => {
    const c = setupPromptChoices('admin', true);
    expect(c.showFirstInvoice).toBe(true);
    expect(c.showAdjustSeries).toBe(true);
    expect(c.copy).toContain('first invoice');
  });
  it('offers only the first invoice to a manager', () => {
    const c = setupPromptChoices('manager', false);
    expect(c.showFirstInvoice).toBe(true);
    expect(c.showAdjustSeries).toBe(false);
  });
  it('keeps the old behaviour for staff', () => {
    const c = setupPromptChoices('staff', false);
    expect(c.showFirstInvoice).toBe(false);
    expect(c.showAdjustSeries).toBe(false);
    expect(c.copy).toBe('Setup is complete. You can continue to dashboard now.');
  });
  it('shows no first invoice when the role is unknown', () => {
    expect(setupPromptChoices(null, true).showFirstInvoice).toBe(false);
  });
});
