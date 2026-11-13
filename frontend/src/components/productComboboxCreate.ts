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
