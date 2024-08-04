import * as v from "valibot";
import { SupabaseClient } from "@supabase/supabase-js";
import { Puzzle, Restriction } from "./types";
import type { AsyncData } from "#app";

export async function fetchRestrictions(
  supabase: SupabaseClient,
): Promise<Restriction[]> {
  const { data, error } = await supabase.from("restriction").select();
  if (error) return [];
  const { output, success, issues } = v.safeParse(v.array(Restriction), data);
  if (issues) console.error(issues);
  if (!success) throw createError("failed to validate restrictions");
  return output;
}

export async function fetchPuzzle(
  supabase: SupabaseClient,
  puzzleDate: string,
): Promise<AsyncData<Puzzle, Error | undefined>> {
  return await useAsyncData(puzzleDate, async () => {
    const { data, error } = await supabase
      .from("puzzle")
      .select()
      .eq("date", puzzleDate);
    if (error) throw error;
    const { output, success, issues } = v.safeParse(v.array(Puzzle), data);
    if (!success) {
      console.error(issues);
      throw createError("failed to validate puzzle schema");
    }
    return output[0] || createInitialPuzzle(puzzleDate);
  });
}

export async function upsertPuzzle(supabase: SupabaseClient, puzzle: Puzzle) {
  const { data, error } = await supabase.from("puzzle").upsert(puzzle).select();
  console.log(data);
}
