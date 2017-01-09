CREATE TABLE IF NOT EXISTS Students(
      id SERIAL UNIQUE,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT NOT NULL
);