export function getHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Homeschool Evaluation Tracker</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --blue: #2E75B6;
      --dark-blue: #1F3864;
      --green: #1E5C3A;
      --teal: #0E6655;
      --purple: #5B2C6F;
      --orange: #7D3C00;
      --red: #922B21;
      --light: #f5f7fa;
      --border: #dde2ea;
      --text: #1a1a2e;
      --muted: #6b7280;
      --white: #ffffff;
      --radius: 10px;
      --shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      background: var(--light);
      color: var(--text);
      min-height: 100vh;
    }

    nav {
      background: var(--dark-blue);
      color: white;
      padding: 0 2rem;
      display: flex;
      align-items: center;
      gap: 2rem;
      height: 56px;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }
    nav .logo { font-weight: 700; font-size: 1.1rem; letter-spacing: 0.02em; white-space: nowrap; }
    nav .logo span { color: #93c5fd; }
    nav a { color: rgba(255,255,255,0.75); text-decoration: none; font-size: 0.9rem; padding: 0.3rem 0.6rem; border-radius: 6px; transition: all 0.15s; cursor: pointer; }
    nav a:hover, nav a.active { background: rgba(255,255,255,0.12); color: white; }
    main { max-width: 1100px; margin: 0 auto; padding: 2rem 1.5rem; }
    .page { display: none; }
    .page.active { display: block; }
    .card { background: white; border-radius: var(--radius); box-shadow: var(--shadow); padding: 1.5rem; margin-bottom: 1.5rem; }
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem; }
    .card-header h2 { font-size: 1.15rem; color: var(--dark-blue); }
    .btn { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.5rem 1.1rem; border-radius: 7px; border: none; font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: all 0.15s; }
    .btn-primary { background: var(--blue); color: white; }
    .btn-primary:hover { background: var(--dark-blue); }
    .btn-success { background: var(--green); color: white; }
    .btn-success:hover { filter: brightness(1.1); }
    .btn-danger { background: var(--red); color: white; }
    .btn-danger:hover { filter: brightness(1.1); }
    .btn-ghost { background: transparent; color: var(--muted); border: 1px solid var(--border); }
    .btn-ghost:hover { background: var(--light); }
    .btn-sm { padding: 0.3rem 0.75rem; font-size: 0.8rem; }
    .form-group { margin-bottom: 1rem; }
    label { display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.35rem; color: var(--dark-blue); }
    input, select, textarea { width: 100%; padding: 0.55rem 0.8rem; border: 1.5px solid var(--border); border-radius: 7px; font-size: 0.9rem; transition: border-color 0.15s; background: white; }
    input:focus, select:focus, textarea:focus { outline: none; border-color: var(--blue); }
    textarea { resize: vertical; min-height: 80px; }
    table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
    th { background: var(--dark-blue); color: white; padding: 0.65rem 1rem; text-align: left; font-weight: 600; font-size: 0.82rem; letter-spacing: 0.03em; }
    td { padding: 0.65rem 1rem; border-bottom: 1px solid var(--border); }
    tr:last-child td { border-bottom: none; }
    tr:hover td { background: #f0f4ff; }
    .badge { display: inline-block; padding: 0.2rem 0.6rem; border-radius: 99px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; }
    .badge-mastered    { background: #d1fae5; color: #065f46; }
    .badge-proficient  { background: #dbeafe; color: #1e40af; }
    .badge-developing  { background: #fef3c7; color: #92400e; }
    .badge-not_yet     { background: #fee2e2; color: #991b1b; }
    .score-bar { height: 10px; border-radius: 99px; background: #e5e7eb; overflow: hidden; margin-top: 4px; }
    .score-fill { height: 100%; border-radius: 99px; transition: width 0.5s; }
    .pct-90 { background: var(--green); }
    .pct-75 { background: var(--blue); }
    .pct-50 { background: #f59e0b; }
    .pct-low { background: var(--red); }
    .subject-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; margin-top: 1rem; }
    .subject-card { background: white; border-radius: var(--radius); border: 2px solid var(--border); padding: 1rem; cursor: pointer; transition: border-color 0.15s, box-shadow 0.15s; }
    .subject-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    .subject-card .subject-name { font-weight: 700; font-size: 0.92rem; margin-bottom: 0.4rem; }
    .subject-card .subject-score { font-size: 1.4rem; font-weight: 800; }
    .stats-row { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 1rem; margin-bottom: 1.5rem; }
    .stat-box { background: white; border-radius: var(--radius); box-shadow: var(--shadow); padding: 1.1rem; text-align: center; }
    .stat-box .stat-val { font-size: 2rem; font-weight: 800; color: var(--dark-blue); }
    .stat-box .stat-label { font-size: 0.78rem; color: var(--muted); margin-top: 0.2rem; }
    .skill-row select { padding: 0.3rem 0.5rem; font-size: 0.8rem; width: auto; }
    .modal-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.45); z-index: 200; align-items: center; justify-content: center; }
    .modal-overlay.open { display: flex; }
    .modal { background: white; border-radius: var(--radius); padding: 2rem; width: min(600px, 95vw); max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
    .modal h3 { font-size: 1.2rem; color: var(--dark-blue); margin-bottom: 1.2rem; }
    .modal-actions { display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1.5rem; }
    #toast { position: fixed; bottom: 1.5rem; right: 1.5rem; background: var(--dark-blue); color: white; padding: 0.75rem 1.2rem; border-radius: var(--radius); font-size: 0.9rem; opacity: 0; transition: opacity 0.3s; z-index: 300; pointer-events: none; }
    #toast.show { opacity: 1; }
    .mastery-legend { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1rem; }
    .empty { text-align: center; padding: 3rem 1rem; color: var(--muted); }
    .empty svg { width: 48px; height: 48px; margin-bottom: 1rem; opacity: 0.4; }
    @media (max-width: 640px) { nav { gap: 1rem; padding: 0 1rem; } main { padding: 1rem; } }
  </style>
</head>
<body>
<nav>
  <div class="logo">🏫 Homeschool <span>Eval</span></div>
  <a onclick="showPage('dashboard')" class="active" id="nav-dashboard">Dashboard</a>
  <a onclick="showPage('students')" id="nav-students">Students</a>
  <a onclick="showPage('evaluations')" id="nav-evaluations">Evaluations</a>
</nav>
<main>
  <div class="page active" id="page-dashboard">
    <div class="card-header" style="margin-bottom:1rem">
      <h2 style="font-size:1.4rem;color:var(--dark-blue)">Student Dashboard</h2>
      <div style="display:flex;gap:0.75rem;align-items:center">
        <select id="dash-student-select" onchange="loadDashboard()" style="width:auto">
          <option value="">— Select a student —</option>
        </select>
      </div>
    </div>
    <div id="dash-overview" class="stats-row" style="display:none"></div>
    <div id="dash-subjects" style="display:none">
      <div class="card"><div class="card-header"><h2>Results by Subject</h2></div><div class="subject-grid" id="dash-subject-grid"></div></div>
    </div>
    <div id="dash-skills" style="display:none">
      <div class="card">
        <div class="card-header"><h2>Skill Mastery Breakdown</h2></div>
        <div class="mastery-legend">
          <span class="badge badge-mastered">Mastered</span>
          <span class="badge badge-proficient">Proficient</span>
          <span class="badge badge-developing">Developing</span>
          <span class="badge badge-not_yet">Not Yet</span>
        </div>
        <table><thead><tr><th>Subject</th><th>Skill</th><th>Mastery Level</th></tr></thead><tbody id="dash-skills-tbody"></tbody></table>
      </div>
    </div>
    <div id="dash-empty" class="card"><div class="empty"><p>Select a student above to view their progress dashboard.</p></div></div>
  </div>
  <div class="page" id="page-students">
    <div class="card">
      <div class="card-header"><h2>Students</h2><button class="btn btn-primary" onclick="openStudentModal()">+ Add Student</button></div>
      <table><thead><tr><th>Name</th><th>Grade</th><th>Added</th><th>Actions</th></tr></thead><tbody id="students-tbody"><tr><td colspan="4" class="empty">Loading…</td></tr></tbody></table>
    </div>
  </div>
  <div class="page" id="page-evaluations">
    <div class="card">
      <div class="card-header"><h2>Evaluations</h2><button class="btn btn-primary" onclick="openEvalModal()">+ New Evaluation</button></div>
      <div style="display:flex;gap:1rem;margin-bottom:1rem;flex-wrap:wrap">
        <select id="eval-filter-student" onchange="loadEvaluations()" style="width:auto"><option value="">All Students</option></select>
      </div>
      <table><thead><tr><th>Student</th><th>Subject</th><th>Date</th><th>Score</th><th>%</th><th>Actions</th></tr></thead><tbody id="evals-tbody"><tr><td colspan="6" class="empty">Loading…</td></tr></tbody></table>
    </div>
  </div>
</main>
<div class="modal-overlay" id="student-modal">
  <div class="modal">
    <h3 id="student-modal-title">Add Student</h3>
    <input type="hidden" id="student-id" />
    <div class="form-group"><label>Student Name</label><input type="text" id="student-name" placeholder="Enter full name" /></div>
    <div class="form-group"><label>Grade Level</label><select id="student-grade"><option value="2nd">2nd Grade</option><option value="3rd">3rd Grade</option></select></div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal('student-modal')">Cancel</button>
      <button class="btn btn-primary" onclick="saveStudent()">Save</button>
    </div>
  </div>
</div>
<div class="modal-overlay" id="eval-modal">
  <div class="modal">
    <h3>New Evaluation</h3>
    <div class="form-group"><label>Student</label><select id="eval-student"></select></div>
    <div class="form-group"><label>Subject</label><select id="eval-subject" onchange="loadSkillRows()"></select></div>
    <div class="form-group"><label>Score Earned</label><input type="number" id="eval-score" min="0" placeholder="e.g. 32" /></div>
    <div class="form-group"><label>Total Points Possible</label><input type="number" id="eval-total" min="0" placeholder="auto-filled from subject" readonly /></div>
    <div class="form-group"><label>Skill Mastery Ratings</label><div id="skill-rows" style="max-height:260px;overflow-y:auto;border:1.5px solid var(--border);border-radius:7px;padding:0.5rem"></div></div>
    <div class="form-group"><label>Teacher Notes</label><textarea id="eval-notes" placeholder="Optional notes…"></textarea></div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal('eval-modal')">Cancel</button>
      <button class="btn btn-success" onclick="saveEvaluation()">Save Evaluation</button>
    </div>
  </div>
</div>
<div id="toast"></div>
<script>
let students = [];
let subjects = [];
(async () => { await Promise.all([fetchStudents(), fetchSubjects()]); loadEvaluations(); })();
async function api(path, method = 'GET', body = null) {
  const opts = { method, headers: { 'Content-Type': 'application/json' } };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(path, opts);
  return res.json();
}
async function fetchStudents() { students = await api('/api/students'); renderStudents(); populateStudentSelects(); }
async function fetchSubjects() {
  subjects = await api('/api/subjects');
  const sel = document.getElementById('eval-subject');
  sel.innerHTML = subjects.map(s => `<option value="${s.id}" data-total="${s.total_points}">${s.name}</option>`).join('');
}
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  document.getElementById('nav-' + name).classList.add('active');
  if (name === 'dashboard') loadDashboard();
}
function renderStudents() {
  const tbody = document.getElementById('students-tbody');
  if (!students.length) { tbody.innerHTML = '<tr><td colspan="4" class="empty">No students yet.</td></tr>'; return; }
  tbody.innerHTML = students.map(s => `<tr><td><strong>${s.name}</strong></td><td>${s.grade} Grade</td><td>${new Date(s.created_at).toLocaleDateString()}</td><td><button class="btn btn-ghost btn-sm" onclick="openStudentModal(${s.id})">Edit</button> <button class="btn btn-danger btn-sm" onclick="deleteStudent(${s.id})">Delete</button></td></tr>`).join('');
}
function populateStudentSelects() {
  const opts = students.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
  document.getElementById('eval-student').innerHTML = opts;
  document.getElementById('eval-filter-student').innerHTML = '<option value="">All Students</option>' + opts;
  document.getElementById('dash-student-select').innerHTML = '<option value="">— Select a student —</option>' + opts;
}
function openStudentModal(id = null) {
  document.getElementById('student-id').value = id || '';
  document.getElementById('student-name').value = '';
  document.getElementById('student-modal-title').textContent = id ? 'Edit Student' : 'Add Student';
  if (id) { const s = students.find(x => x.id === id); if (s) { document.getElementById('student-name').value = s.name; document.getElementById('student-grade').value = s.grade; } }
  document.getElementById('student-modal').classList.add('open');
}
async function saveStudent() {
  const id = document.getElementById('student-id').value;
  const name = document.getElementById('student-name').value.trim();
  const grade = document.getElementById('student-grade').value;
  if (!name) { toast('Please enter a name.'); return; }
  if (id) { await api(`/api/students/${id}`, 'PUT', { name, grade }); } else { await api('/api/students', 'POST', { name, grade }); }
  closeModal('student-modal'); await fetchStudents(); toast('Student saved!');
}
async function deleteStudent(id) {
  if (!confirm('Delete this student and all their evaluations?')) return;
  await api(`/api/students/${id}`, 'DELETE'); await fetchStudents(); toast('Student deleted.');
}
async function loadEvaluations() {
  const studentId = document.getElementById('eval-filter-student').value;
  const url = studentId ? `/api/evaluations?student_id=${studentId}` : '/api/evaluations';
  const evals = await api(url);
  const tbody = document.getElementById('evals-tbody');
  if (!evals.length) { tbody.innerHTML = '<tr><td colspan="6" class="empty">No evaluations yet.</td></tr>'; return; }
  tbody.innerHTML = evals.map(e => {
    const pct = e.percentage ?? 0;
    const cls = pct >= 90 ? 'pct-90' : pct >= 75 ? 'pct-75' : pct >= 50 ? 'pct-50' : 'pct-low';
    return `<tr><td>${e.student_name}</td><td>${e.subject_name}</td><td>${new Date(e.eval_date).toLocaleDateString()}</td><td>${e.score} / ${e.total_points}</td><td><div style="min-width:80px"><div style="font-weight:700;font-size:0.9rem">${pct}%</div><div class="score-bar"><div class="score-fill ${cls}" style="width:${pct}%"></div></div></div></td><td><button class="btn btn-danger btn-sm" onclick="deleteEval(${e.id})">Delete</button></td></tr>`;
  }).join('');
}
function openEvalModal() { document.getElementById('eval-score').value = ''; document.getElementById('eval-notes').value = ''; loadSkillRows(); document.getElementById('eval-modal').classList.add('open'); }
function loadSkillRows() {
  const sel = document.getElementById('eval-subject');
  const opt = sel.options[sel.selectedIndex];
  document.getElementById('eval-total').value = opt ? opt.dataset.total : '';
  const subjectId = parseInt(sel.value);
  const subject = subjects.find(s => s.id === subjectId);
  const skillSets = {'Reading / ELA':['Phonics — long/short vowel patterns','Decoding multisyllabic words','Main idea and key details','Cause and effect','Fiction vs. nonfiction','Vocabulary from context','Opinion writing','Informative writing','Narrative writing','Grammar and mechanics'],'Math':['Place value to hundreds','Even and odd numbers','Skip counting patterns','3-digit addition','3-digit subtraction','Fractions (halves, thirds, fourths)','Telling time to 5 minutes','Counting money','Measurement — length','Missing number / algebraic thinking'],'Science (NGSS)':['States of matter','Properties of matter','Plant life cycles','Animal life cycles','Habitats and ecosystems','What plants need to grow','Seasons and weather patterns','Science tools and measurement','Scientific inquiry process','Engineering design basics'],'Technology & Coding':['Keyboard and mouse skills','Saving and opening files','Personal information safety','Password creation','Internet safety rules','Sequences and algorithms','Debugging basics','Pattern recognition','Decomposition','Hardware vs. software'],'Engineering':['Engineering design steps','Brainstorming solutions','Selecting appropriate materials','Understanding material properties','Building and testing structures','Understanding constraints','Identifying real-world problems','Improving a design','Scientist vs. engineer distinction','Communicating design plans'],'Social Studies':['Community rules and laws','Community helpers','Cardinal directions','Continents and oceans','Map and globe use','Map key/legend','Past vs. present','Reading a timeline','Goods vs. services','Needs vs. wants'],'Arts':['Elements of art','Primary and secondary colors','Color mixing','Rhythm and beat','Dynamics (loud/soft)','Tempo (fast/slow)','Instrument families','Character and expression in drama','Physical expression / mime','Observing and responding to art'],'Health & Physical Education':['Locomotor skills','Non-locomotor skills','Heart and exercise relationship','Sleep requirements','Healthy eating and food groups','Hygiene habits','Skeletal system basics','Benefits of physical activity','Sportsmanship','Healthy coping strategies'],'Financial Literacy':['Coin identification and value','Counting money combinations','Making change basics','What it means to earn money','Spending decisions','Saving goals','Needs vs. wants','Basic budgeting','What banks do','Smart money decision making']};
  const skills = subject ? (skillSets[subject.name] || []) : [];
  const container = document.getElementById('skill-rows');
  if (!skills.length) { container.innerHTML = '<p style="color:var(--muted);padding:0.5rem;font-size:0.85rem">Select a subject to see skills.</p>'; return; }
  container.innerHTML = skills.map((skill, i) => `<div class="skill-row" style="display:flex;justify-content:space-between;align-items:center;padding:0.4rem 0.25rem;border-bottom:1px solid var(--border)"><span style="font-size:0.85rem">${skill}</span><select name="skill_${i}" data-skill="${skill}" style="width:auto;padding:0.25rem 0.5rem;font-size:0.78rem"><option value="not_yet">Not Yet</option><option value="developing">Developing</option><option value="proficient" selected>Proficient</option><option value="mastered">Mastered</option></select></div>`).join('');
}
async function saveEvaluation() {
  const student_id = parseInt(document.getElementById('eval-student').value);
  const subject_id = parseInt(document.getElementById('eval-subject').value);
  const score = parseInt(document.getElementById('eval-score').value);
  const total_points = parseInt(document.getElementById('eval-total').value);
  const notes = document.getElementById('eval-notes').value;
  if (!student_id || !subject_id || isNaN(score)) { toast('Please fill in all required fields.'); return; }
  const skillSelects = document.querySelectorAll('#skill-rows select');
  const skills = Array.from(skillSelects).map(sel => ({ skill_name: sel.dataset.skill, mastery_level: sel.value }));
  await api('/api/evaluations', 'POST', { student_id, subject_id, score, total_points, notes, skills });
  closeModal('eval-modal'); await loadEvaluations(); toast('Evaluation saved!');
}
async function deleteEval(id) { if (!confirm('Delete this evaluation?')) return; await api(`/api/evaluations/${id}`, 'DELETE'); await loadEvaluations(); toast('Evaluation deleted.'); }
async function loadDashboard() {
  const studentId = document.getElementById('dash-student-select').value;
  const empty = document.getElementById('dash-empty');
  const overview = document.getElementById('dash-overview');
  const subjectsDiv = document.getElementById('dash-subjects');
  const skillsDiv = document.getElementById('dash-skills');
  if (!studentId) { empty.style.display='block'; overview.style.display='none'; subjectsDiv.style.display='none'; skillsDiv.style.display='none'; return; }
  const data = await api(`/api/dashboard?student_id=${studentId}`);
  empty.style.display='none'; overview.style.display='grid'; subjectsDiv.style.display='block'; skillsDiv.style.display='block';
  const s = data.stats || {}; const mb = data.masteryBreakdown || {};
  const pct = s.avg_percentage ? Math.round(s.avg_percentage) : 0;
  overview.innerHTML = `<div class="stat-box"><div class="stat-val">${s.subjects_evaluated??0}</div><div class="stat-label">Subjects Evaluated</div></div><div class="stat-box"><div class="stat-val" style="color:${pct>=90?'var(--green)':pct>=75?'var(--blue)':pct>=50?'#d97706':'var(--red)'}">${pct}%</div><div class="stat-label">Avg Score</div></div><div class="stat-box"><div class="stat-val" style="color:var(--green)">${mb.mastered??0}</div><div class="stat-label">Skills Mastered</div></div><div class="stat-box"><div class="stat-val" style="color:var(--blue)">${mb.proficient??0}</div><div class="stat-label">Proficient</div></div><div class="stat-box"><div class="stat-val" style="color:#d97706">${mb.developing??0}</div><div class="stat-label">Developing</div></div><div class="stat-box"><div class="stat-val" style="color:var(--red)">${mb.not_yet??0}</div><div class="stat-label">Not Yet</div></div>`;
  const grid = document.getElementById('dash-subject-grid');
  if (!data.subjectSummary.length) { grid.innerHTML = '<p style="color:var(--muted);padding:1rem">No evaluations recorded yet.</p>'; }
  else { grid.innerHTML = data.subjectSummary.map(sub => { const p=sub.percentage??0; const c=p>=90?'pct-90':p>=75?'pct-75':p>=50?'pct-50':'pct-low'; return `<div class="subject-card" style="border-color:#${sub.color}33"><div class="subject-name" style="color:#${sub.color}">${sub.subject}</div><div class="subject-score" style="color:#${sub.color}">${p}%</div><div class="score-bar" style="margin-top:0.5rem"><div class="score-fill ${c}" style="width:${p}%"></div></div><div style="font-size:0.78rem;color:var(--muted);margin-top:0.4rem">${sub.score} / ${sub.total_points} pts</div></div>`; }).join(''); }
  const tbody = document.getElementById('dash-skills-tbody');
  if (!data.skills.length) { tbody.innerHTML = '<tr><td colspan="3" class="empty">No skill data yet.</td></tr>'; }
  else { tbody.innerHTML = data.skills.map(sk => `<tr><td style="color:var(--muted);font-size:0.85rem">${sk.subject}</td><td>${sk.skill_name}</td><td><span class="badge badge-${sk.mastery_level}">${sk.mastery_level.replace('_',' ')}</span></td></tr>`).join(''); }
}
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
function toast(msg) { const el = document.getElementById('toast'); el.textContent = msg; el.classList.add('show'); setTimeout(() => el.classList.remove('show'), 2800); }
</script>
</body>
</html>`;
}
