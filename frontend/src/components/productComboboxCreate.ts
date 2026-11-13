export type CreateOptionInput = {
  query: string;
  /** How many products the search returned. */
  matchCount: number;
  /** Whether the search has finished, so a late result does not flash the option. */
  settled: boolean;
  /** True when the caller passed `onCreateNew`. */
  canCreate: boolean;
};

/** The name to create and the label to show, or null when no create option should appear. */
export function createOption({ query, matchCount, settled, canCreate }: CreateOptionInput): { name: string; label: string } | null {
  if (!canCreate || !settled || matchCount > 0) return null;
  const name = query.trim();
  if (!name) return null;
  return { name, label: `Create product "${name}"` };
}

/**
 * The label the box should show after its selected product changes, or null to
 * leave the text alone. A cleared selection clears the stale name, but only on
 * the change itself: while nothing is selected, the text is what the user is
 * typing, and a product list refetch must not wipe it.
 */
export function labelForValueChange(
  previousValue: string,
  value: string,
  product: { name: string; sku: string } | undefined,
): string | null {
  if (product) return `${product.name} (${product.sku})`;
  if (previousValue && !value) return '';
  return null;
}
