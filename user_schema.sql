DROP TABLE IF EXISTS user_table CASCADE;
DROP TABLE IF EXISTS user_stats CASCADE;


--Not sure if date func works, but we trying things
CREATE TABLE user_table (
  id SERIAL PRIMARY KEY,
  user_handle VARCHAR(255),
  user_email VARCHAR(255),
  date_created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--INSERT INTO user_table(date_created) VALUES('This is the first message.');
-- Try this later when you wire this up


CREATE TABLE user_stats(
  id SERIAL PRIMAY KEY,
  total_game INT,
  total_wins INT,
  total_losses INT,
  total_resets INT,
  win_vs_loss_record FLOAT,
  current_game_cube TEXT,
  current_game_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  current_move_count INT,
  best_time TIME,
  best_move_count INT,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user_table (id)
);


-- Intitate the Join of FK on the tables
SELECT * FROM user_stats JOIN user_table ON user_stats.user_id = user_table.id;



