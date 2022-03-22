CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  user_name TEXT,
  email TEXT,
  user_password TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  task TEXT,
  task_priority INTEGER,
  task_duration INTEGER,
  project_id TEXT,
  user_name TEXT ,
  task_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blockers (
  blocker_id SERIAL PRIMARY KEY,
  blocker TEXT,
  blocker_duration Integer,
  project_id TEXT,
  user_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projects (
  project_id SERIAL PRIMARY KEY,
  project_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_projects (
  id SERIAL PRIMARY KEY,
  project_id INTEGER,
  user_id INTEGER,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

