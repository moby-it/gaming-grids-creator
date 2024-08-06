import * as v from "valibot";
import { SupabaseClient } from "@supabase/supabase-js";
import { Puzzle, Restriction, Champion } from "./types";
import type { AsyncData } from "#app";

export async function fetchRestrictions(
  supabase: SupabaseClient,
): Promise<AsyncData<Restriction[], unknown>> {
  return useAsyncData(async () => {
    const { data, error } = await supabase.from("restriction").select();
    if (error) return [];
    const { output, success, issues } = v.safeParse(v.array(Restriction), data);
    if (issues) console.error(issues);
    if (!success) return issues;
    return output;
  });
}

export async function fetchPuzzle(
  supabase: SupabaseClient,
  puzzleDate: string,
): Promise<AsyncData<Puzzle, unknown>> {
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
export async function fetchChampions(supabase: SupabaseClient) {
  return await useAsyncData(async () => {
    const { data, error } = await supabase.from('champion').select('name, champion_id');
    if (error) throw error;
    return v.parse(v.array(Champion), data);
  });
};
export async function upsertPuzzle(supabase: SupabaseClient, puzzle: Puzzle) {
  const { error } = await supabase.from("puzzle").upsert(puzzle).select();
  if (error) throw createError(error);
}
export async function saveRestriction(supabase: SupabaseClient, restriction: Restriction) {
  await $fetch("/api/restriction", {
    method: "POST",
    body: restriction,
  });
}