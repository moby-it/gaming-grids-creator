import type { Restriction } from "#imports";

const countOccurrencies =
  <T>(arr: T[]) =>
  (value: T): number =>
    arr.reduce((acc, v) => (v === value ? acc + 1 : acc), 0);

const filterByTwoOccurencies = <T>(arr: T[]) => filterByOccurencies(arr, 2);

const filterByOccurencies = <T>(arr: T[], occurencies: number): T[] =>
  arr.filter((v) => countOccurrencies(arr)(v) >= occurencies);

export function calculateResults(
  restrictions: Restriction[],
  rowRestrictionId: string,
  colRestrictionId: string,
): string[] {
  const rowRestriction = restrictions.find((r) => r.id === rowRestrictionId);
  const colRestriction = restrictions.find((r) => r.id === colRestrictionId);
  if (!rowRestriction || !colRestriction)
    throw createError("invalid restrictions");
  const arr = rowRestriction?.champion_list.concat(
    colRestriction.champion_list,
  );
  return Array.from(new Set(filterByTwoOccurencies(arr)));
}
