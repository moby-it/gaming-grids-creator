import * as v from "valibot";

export const Restriction = v.object({
  id: v.string(),
  hash: v.string(),
  champion_list: v.array(v.string()),
  name: v.string(),
  created_at: v.string(),
});

export type Restriction = v.InferOutput<typeof Restriction>;

export const Puzzle = v.object({
  id: v.optional(v.string()),
  name: v.string(),
  row_restrictions: v.pipe(v.array(Restriction), v.length(3)),
  col_restrictions: v.pipe(v.array(Restriction), v.length(3)),
  date: v.string(),
});
export type Puzzle = v.InferOutput<typeof Puzzle>;

export function createInitialPuzzle(date: string): Puzzle {
  return { col_restrictions: [], row_restrictions: [], date, name: "" };
}



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