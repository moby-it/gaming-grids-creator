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
  if (!rowRestriction)
    throw createError(`there is a problem with row restriction with id ${rowRestriction}. Restrictions is part of a puzzle and does not exist in the database.`);
  if (!colRestriction)
    throw createError(
      `there is a problem with row restriction with id ${colRestriction}. Restrictions is part of a puzzle and does not exist in the database.`);
      
  return getRestrictionPossibleAnswers(rowRestriction, colRestriction);
}

export function getRestrictionPossibleAnswers(a: Restriction, b: Restriction): string[] {
  const arr = a?.champion_list.concat(b.champion_list);
  return Array.from(new Set(filterByTwoOccurencies(arr)));
}

export function filterRestrictions(term: string, restrictions: Restriction[]): Restriction[] {
  if (!term) return restrictions;
  term = term.toLowerCase();
  return restrictions.filter(r =>
    r.name.toLowerCase().startsWith(term)
    || r.name.toLowerCase().startsWith(term)
    || r.champion_list.map(c => c.toLowerCase()).join(', ').includes(term)
  );
}