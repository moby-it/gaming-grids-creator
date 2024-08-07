import { serverSupabaseServiceRole } from "#supabase/server";
import * as v from "valibot";

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const { output, success, issues } = v.safeParse(
    Puzzle,
    await readBody(event),
  );
  if (!success) {
    setResponseStatus(event, 400);
    console.error(issues.toString());
    return "failed to validate puzzle schema";
  }
  const { error } = await supabase
    .from("puzzle")
    .upsert(output as any)
    .select();
  if (error) throw createError(error);
  setResponseStatus(event, 201);
});
