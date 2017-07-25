CREATE TABLE albums (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  joined DATE DEFAULT current_date
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  created TIMESTAMP DEFAULT current_timestamp,
  album_id INT REFERENCES albums,
  user_id INT REFERENCES users,
  review VARCHAR NOT NULL
);
