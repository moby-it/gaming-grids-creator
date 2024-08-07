import { serverSupabaseServiceRole } from "#supabase/server";
import * as v from 'valibot';
export default defineEventHandler(async event => {
  const supabase = serverSupabaseServiceRole(event);
  const body = await readBody(event);
  const { output: restriction, success, issues } = v.safeParse(Restriction, body);
  if (!success) {
    console.error(issues.map(i => i.message).join(', '));
    setResponseStatus(event, 400, 'failed to parse restriction');
    return;
  }
  const { error } = await supabase.from('restriction').upsert(restriction as any).select();

  if (error) {
    console.error(error);
    setResponseStatus(event, 500, 'failed to save restriction to db');
    return;
  }
  return setResponseStatus(event, 201);
});