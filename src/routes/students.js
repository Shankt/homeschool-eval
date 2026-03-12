export async function handleStudents(request, env, corsHeaders) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();

  if (request.method === 'GET') {
    const { results } = await env.DB.prepare('SELECT * FROM students ORDER BY name').all();
    return Response.json(results, { headers: corsHeaders });
  }
  if (request.method === 'POST') {
    const { name, grade } = await request.json();
    const { results } = await env.DB.prepare('INSERT INTO students (name, grade) VALUES (?, ?) RETURNING *').bind(name, grade).all();
    return Response.json(results[0], { status: 201, headers: corsHeaders });
  }
  if (request.method === 'PUT') {
    const { name, grade } = await request.json();
    await env.DB.prepare('UPDATE students SET name=?, grade=? WHERE id=?').bind(name, grade, id).run();
    return Response.json({ ok: true }, { headers: corsHeaders });
  }
  if (request.method === 'DELETE') {
    await env.DB.prepare('DELETE FROM skill_ratings WHERE evaluation_id IN (SELECT id FROM evaluations WHERE student_id=?)').bind(id).run();
    await env.DB.prepare('DELETE FROM evaluations WHERE student_id=?').bind(id).run();
    await env.DB.prepare('DELETE FROM students WHERE id=?').bind(id).run();
    return Response.json({ ok: true }, { headers: corsHeaders });
  }
}
