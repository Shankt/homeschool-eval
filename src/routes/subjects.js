export async function handleSubjects(request, env, corsHeaders) {
  const { results } = await env.DB.prepare('SELECT * FROM subjects ORDER BY name').all();
  return Response.json(results, { headers: corsHeaders });
}
