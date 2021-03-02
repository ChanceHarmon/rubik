DROP TABLE IF EXISTS user_table CASCADE;
DROP TABLE IF EXISTS user_stats CASCADE;


--Not sure if date func works, but we trying things
CREATE TABLE user_table (
  id SERIAL PRIMARY KEY,
  user_handle VARCHAR(255),
  user_email VARCHAR(255),
  date_created DATETIME NOT NULL
                DEFAULT CURRENT_TIMESTAMP
);

--INSERT INTO user_table(date_created) VALUES('This is the first message.');
-- Try this later when you wire this up


CREATE TABLE user_stats(
  id SERIAL PRIMAY KEY,


);



