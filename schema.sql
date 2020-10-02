DROP TABLE IF EXISTS holy_cube;
CREATE TABLE holy_cube (
  id SERIAL PRIMARY KEY,
  positions TEXT
);

-- INSERT INTO holy_cube (positions) VALUES ('[[green, green, green],
-- [green, green, green],
-- [green, green, green]
-- ],
-- [[yellow, yellow, yellow],
-- [yellow, yellow, yellow],
-- [yellow, yellow, yellow],
-- ],
-- [[red, red, red],
-- [red, red, red],
-- [red, red, red]
-- ],
-- [[white, white, white],
-- [white, white, white],
-- [white, white, white]
-- ],
-- [[blue, blue, blue],
-- [blue, blue, blue],
-- [blue, blue blue]
-- ],
-- [[orange, orange, orange],
-- [orange, orange, orange],
-- [orange, orange, orange]
-- ]'
-- );