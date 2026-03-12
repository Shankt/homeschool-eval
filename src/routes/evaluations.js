export async function handleEvaluations(request, env, corsHeaders) {
  const url = new URL(request.url);
  const parts = url.pathname.split('/').filter(Boolean);
  const id = parts[2] ? parseInt(parts[2]) : null;
  const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', ...corsHeaders } });

  if (request.method === 'GET' && !id) {
    const studentId = url.searchParams.get('student_id');
    let query = `SELECT e.*, s.name as student_name, sub.name as subject_name, sub.color
      FROM evaluations e JOIN students s ON e.student_id = s.id JOIN subjects sub ON e.subject_id = sub.id`;
    const params = [];
    if (studentId) { query += ' WHERE e.student_id = ?'; params.push(studentId); }
    query += ' ORDER BY e.eval_date DESC';
    const stmt = params.length ? env.DB.prepare(query).bind(...params) : env.DB.prepare(query);
    const { results } = await stmt.all();
    return json(results);
  }

  if (request.method === 'GET' && id) {
    const ev = await env.DB.prepare(`SELECT e.*, s.name as student_name, sub.name as subject_name, sub.color
      FROM evaluations e JOIN students s ON e.student_id = s.id JOIN subjects sub ON e.subject_id = sub.id WHERE e.id = ?`).bind(id).first();
    if (!ev) return json({ error: 'Not found' }, 404);
    const { results: skills } = await env.DB.prepare('SELECT * FROM skill_results WHERE evaluation_id = ?').bind(id).all();
    const { results: questions } = await env.DB.prepare('SELECT * FROM question_results WHERE evaluation_id = ? ORDER BY question_num').bind(id).all();
    return json({ ...ev, skills, questions });
  }

  if (request.method === 'POST') {
    const body = await request.json();
    const { student_id, subject_id, score, total_points, notes, skills = [], questions = [] } = body;
    if (!student_id || !subject_id) return json({ error: 'student_id and subject_id are required' }, 400);
    const percentage = total_points > 0 ? Math.round((score / total_points) * 100) : null;
    const ev = await env.DB.prepare(`INSERT INTO evaluations (student_id, subject_id, score, total_points, percentage, notes) VALUES (?, ?, ?, ?, ?, ?) RETURNING *`).bind(student_id, subject_id, score, total_points, percentage, notes || null).first();
    for (const s of skills) await env.DB.prepare('INSERT INTO skill_results (evaluation_id, skill_name, mastery_level) VALUES (?, ?, ?)').bind(ev.id, s.skill_name, s.mastery_level).run();
    for (const q of questions) await env.DB.prepare('INSERT INTO question_results (evaluation_id, question_num, question_type, points_possible, points_earned) VALUES (?, ?, ?, ?, ?)').bind(ev.id, q.question_num, q.question_type, q.points_possible, q.points_earned).run();
    return json({ ...ev, skills, questions }, 201);
  }

  if (request.method === 'DELETE' && id) {
    await env.DB.prepare('DELETE FROM skill_results WHERE evaluation_id = ?').bind(id).run();
    await env.DB.prepare('DELETE FROM question_results WHERE evaluation_id = ?').bind(id).run();
    await env.DB.prepare('DELETE FROM evaluations WHERE id = ?').bind(id).run();
    return json({ success: true });
  }
  return json({ error: 'Method not allowed' }, 405);
}
