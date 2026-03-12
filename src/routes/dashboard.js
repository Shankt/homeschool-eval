export async function handleDashboard(request, env, corsHeaders) {
  const url = new URL(request.url);
  const studentId = url.searchParams.get('student_id');
  const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  if (request.method !== 'GET') return json({ error: 'Method not allowed' }, 405);

  if (!studentId) {
    const { results: students } = await env.DB.prepare(`SELECT s.*, COUNT(e.id) as eval_count, AVG(e.percentage) as avg_score FROM students s LEFT JOIN evaluations e ON s.id = e.student_id GROUP BY s.id ORDER BY s.name`).all();
    return json({ students });
  }

  const [subjectSummary, skills, stats] = await Promise.all([
    env.DB.prepare(`SELECT sub.name as subject, sub.color, sub.total_points, e.score, e.percentage, e.eval_date, e.id as evaluation_id FROM evaluations e JOIN subjects sub ON e.subject_id = sub.id WHERE e.student_id = ? ORDER BY e.eval_date DESC`).bind(studentId).all(),
    env.DB.prepare(`SELECT sr.skill_name, sr.mastery_level, sub.name as subject FROM skill_results sr JOIN evaluations e ON sr.evaluation_id = e.id JOIN subjects sub ON e.subject_id = sub.id WHERE e.student_id = ? ORDER BY sub.name, sr.skill_name`).bind(studentId).all(),
    env.DB.prepare(`SELECT COUNT(DISTINCT e.subject_id) as subjects_evaluated, AVG(e.percentage) as avg_percentage, MIN(e.percentage) as min_percentage, MAX(e.percentage) as max_percentage, SUM(e.score) as total_score_earned, SUM(e.total_points) as total_score_possible FROM evaluations e WHERE e.student_id = ?`).bind(studentId).first(),
  ]);

  const masteryBreakdown = { not_yet: 0, developing: 0, proficient: 0, mastered: 0 };
  for (const skill of skills.results) {
    if (skill.mastery_level in masteryBreakdown) masteryBreakdown[skill.mastery_level]++;
  }
  return json({ stats, masteryBreakdown, subjectSummary: subjectSummary.results, skills: skills.results });
}
