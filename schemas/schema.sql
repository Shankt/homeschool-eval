-- Homeschool Evaluation Tracker — D1 Schema
CREATE TABLE IF NOT EXISTS students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  grade TEXT NOT NULL DEFAULT '2nd',
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS subjects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  color TEXT NOT NULL,
  total_points INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS evaluations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL,
  subject_id INTEGER NOT NULL,
  eval_date TEXT DEFAULT (datetime('now')),
  score INTEGER,
  total_points INTEGER,
  percentage REAL,
  notes TEXT,
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (subject_id) REFERENCES subjects(id)
);
CREATE TABLE IF NOT EXISTS skill_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  evaluation_id INTEGER NOT NULL,
  skill_name TEXT NOT NULL,
  mastery_level TEXT CHECK(mastery_level IN ('not_yet','developing','proficient','mastered')),
  FOREIGN KEY (evaluation_id) REFERENCES evaluations(id)
);
CREATE TABLE IF NOT EXISTS question_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  evaluation_id INTEGER NOT NULL,
  question_num INTEGER NOT NULL,
  question_type TEXT,
  points_possible INTEGER,
  points_earned INTEGER,
  FOREIGN KEY (evaluation_id) REFERENCES evaluations(id)
);
INSERT OR IGNORE INTO subjects (id, name, color, total_points) VALUES
  (1, 'Reading / ELA', '2E75B6', 38),
  (2, 'Math', '1E5C3A', 38),
  (3, 'Science (NGSS)', '0E6655', 36),
  (4, 'Technology & Coding', '5B2C6F', 34),
  (5, 'Engineering', '7D3C00', 34),
  (6, 'Social Studies', '922B21', 34),
  (7, 'Arts', '5B2C6F', 32),
  (8, 'Health & Physical Education', '0E6655', 34),
  (9, 'Financial Literacy', '7D3C00', 32);
