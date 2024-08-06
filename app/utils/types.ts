import * as v from "valibot";

export const Puzzle = v.object({
  id: v.optional(v.string()),
  puzzle_name: v.string(),
  row_restrictions: v.array(v.string()),
  col_restrictions: v.array(v.string()),
  date: v.string(),
});
export type Puzzle = v.InferOutput<typeof Puzzle>;

export function createInitialPuzzle(date: string): Puzzle {
  return { col_restrictions: [], row_restrictions: [], date, puzzle_name: "" };
}

export const Restriction = v.object({
  id: v.string(),
  name: v.string(),
  hash: v.string(),
  champion_list: v.array(v.string()),
  display_name: v.string(),
  created_at: v.string(),
});

export type Restriction = v.InferOutput<typeof Restriction>;

export const Champion = v.pipe(
  v.object({
      name: v.string(),
      champion_id: v.string(),
  }),
  v.transform((c) => ({
      name: c.name,
      id: c.champion_id,
  }))
);

export type Champion = v.InferOutput<typeof Champion>;