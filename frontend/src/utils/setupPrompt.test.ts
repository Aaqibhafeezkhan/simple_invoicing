import { describe, expect, it } from 'vitest';
import { setupPromptChoices } from './setupPrompt';

describe('setupPromptChoices', () => {
  it('offers the first invoice to an admin', () => {
    const c = setupPromptChoices('admin');
    expect(c.showFirstInvoice).toBe(true);
    expect(c.dismissLabel).toBe('Skip for now');
    expect(c.copy).toContain('first invoice');
  });
  it('offers the first invoice to a manager', () => {
    expect(setupPromptChoices('manager').showFirstInvoice).toBe(true);
  });
  it('sends staff to the dashboard', () => {
    const c = setupPromptChoices('staff');
    expect(c.showFirstInvoice).toBe(false);
    expect(c.dismissLabel).toBe('Go to dashboard');
  });
  it('shows no first invoice when the role is unknown', () => {
    expect(setupPromptChoices(null).showFirstInvoice).toBe(false);
  });
  it('never offers invoice numbering', () => {
    for (const role of ['admin', 'manager', 'staff', null] as const) {
      expect(Object.keys(setupPromptChoices(role))).not.toContain('showAdjustSeries');
    }
  });
});
