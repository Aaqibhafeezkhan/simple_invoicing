import { describe, expect, it } from 'vitest';
import { createOption, labelForValueChange } from './productComboboxCreate';

const base = { query: 'Assam Tea', matchCount: 0, settled: true, canCreate: true };

describe('createOption', () => {
  it('offers to create the typed name when nothing matches', () => {
    expect(createOption(base)).toEqual({ name: 'Assam Tea', label: 'Create product "Assam Tea"' });
  });
  it('trims the name', () => {
    expect(createOption({ ...base, query: '  Assam Tea  ' })?.name).toBe('Assam Tea');
  });
  it('offers nothing for an empty or blank query', () => {
    expect(createOption({ ...base, query: '' })).toBeNull();
    expect(createOption({ ...base, query: '   ' })).toBeNull();
  });
  it('offers nothing while products match', () => {
    expect(createOption({ ...base, matchCount: 2 })).toBeNull();
  });
  it('offers nothing before the search settles', () => {
    expect(createOption({ ...base, settled: false })).toBeNull();
  });
  it('offers nothing when the caller did not opt in', () => {
    expect(createOption({ ...base, canCreate: false })).toBeNull();
  });
});

describe('labelForValueChange', () => {
  const bulb = { name: 'LED Bulb 9W', sku: 'LED-9W' };
  it('shows the selected product', () => {
    expect(labelForValueChange('', '7', bulb)).toBe('LED Bulb 9W (LED-9W)');
  });
  it('clears the old name when the form resets the line', () => {
    expect(labelForValueChange('7', '', undefined)).toBe('');
  });
  it('leaves typed text alone while nothing is selected', () => {
    expect(labelForValueChange('', '', undefined)).toBeNull();
  });
  it('leaves the text alone while a selected product is still loading', () => {
    expect(labelForValueChange('', '7', undefined)).toBeNull();
  });
});
