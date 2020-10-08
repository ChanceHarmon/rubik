DROP TABLE IF EXISTS holy_cube CASCADE;
DROP TABLE IF EXISTS orange CASCADE;
DROP TABLE IF EXISTS green CASCADE;
DROP TABLE IF EXISTS white CASCADE;
DROP TABLE IF EXISTS blue CASCADE;
DROP TABLE IF EXISTS red CASCADE;
DROP TABLE IF EXISTS yellow CASCADE;

CREATE TABLE holy_cube (
  id SERIAL PRIMARY KEY,
  cube_side VARCHAR(10)
);

INSERT INTO holy_cube (cube_side) VALUES ('orange');
INSERT INTO holy_cube (cube_side) VALUES ('green');
INSERT INTO holy_cube (cube_side) VALUES ('white');
INSERT INTO holy_cube (cube_side) VALUES ('blue');
INSERT INTO holy_cube (cube_side) VALUES ('red');
INSERT INTO holy_cube (cube_side) VALUES ('yellow');

CREATE TABLE orange(
  id SERIAL PRIMARY KEY,
  row VARCHAR(10),
  positions VARCHAR(255),
  face_id INT NOT NULL,
  FOREIGN KEY (face_id) REFERENCES holy_cube (id)
);
CREATE TABLE green(
  id SERIAL PRIMARY KEY,
  row VARCHAR(10),
  positions VARCHAR(255),
  face_id INT NOT NULL,
  FOREIGN KEY (face_id) REFERENCES holy_cube (id)
);
CREATE TABLE white(
  id SERIAL PRIMARY KEY,
  row VARCHAR(10),
  positions VARCHAR(255),
  face_id INT NOT NULL,
  FOREIGN KEY (face_id) REFERENCES holy_cube (id)
);
CREATE TABLE blue(
  id SERIAL PRIMARY KEY,
  row VARCHAR(10),
  positions VARCHAR(255),
  face_id INT NOT NULL,
  FOREIGN KEY (face_id) REFERENCES holy_cube (id)
);
CREATE TABLE red(
  id SERIAL PRIMARY KEY,
  row VARCHAR(10),
  positions VARCHAR(255),
  face_id INT NOT NULL,
  FOREIGN KEY (face_id) REFERENCES holy_cube (id)
);
CREATE TABLE yellow(
  id SERIAL PRIMARY KEY,
  row VARCHAR(10),
  positions VARCHAR(255),
  face_id INT NOT NULL,
  FOREIGN KEY (face_id) REFERENCES holy_cube (id)
);

INSERT INTO orange (row, positions, face_id) VALUES('top', 'orange:00,orange:01,orange:02', 1);
INSERT INTO orange (row, positions, face_id) VALUES('middle', 'orange:10,orange:11,orange:12', 1);
INSERT INTO orange (row, positions, face_id) VALUES('bottom', 'orange:20,orange:21,orange:22', 1);

INSERT INTO green (row, positions, face_id) VALUES('top', 'green:00,green:01,green:02', 2);
INSERT INTO green (row, positions, face_id) VALUES('middle', 'green:10,green:11,green:12', 2);
INSERT INTO green (row, positions, face_id) VALUES('bottom', 'green:20,green:21,green:22', 2);

INSERT INTO white(row, positions, face_id) VALUES('top', 'white:00,white:01,white:02', 3);
INSERT INTO white (row, positions, face_id) VALUES('middle', 'white:10,white:11,white:12', 3);
INSERT INTO white (row, positions, face_id) VALUES('bottom', 'white:20,white:21,white:22', 3);

INSERT INTO blue (row, positions, face_id) VALUES('top', 'blue:00,blue:01,blue:02', 4);
INSERT INTO blue (row, positions, face_id) VALUES('middle', 'blue:10,blue:11,blue:12', 4);
INSERT INTO blue (row, positions, face_id) VALUES('bottom', 'blue:20,blue:21,blue:22', 4);

INSERT INTO red (row, positions, face_id) VALUES('top', 'red:00,red:01,red:02', 5);
INSERT INTO red (row, positions, face_id) VALUES('middle', 'red:10,red:11,red:12', 5);
INSERT INTO red (row, positions, face_id) VALUES('bottom', 'red:20,red:21,red:22', 5);

INSERT INTO yellow (row, positions, face_id) VALUES('top', 'yellow:00,yellow:01,yellow:02', 6);
INSERT INTO yellow (row, positions, face_id) VALUES('middle', 'yellow:10,yellow:11,yellow:12', 6);
INSERT INTO yellow (row, positions, face_id) VALUES('bottom', 'yellow:20,yellow:21,yellow:22', 6);

SELECT * FROM orange JOIN holy_cube ON orange.face_id = holy_cube.id;
SELECT * FROM green JOIN holy_cube ON green.face_id = holy_cube.id;
SELECT * FROM white JOIN holy_cube ON white.face_id = holy_cube.id;
SELECT * FROM blue JOIN holy_cube ON blue.face_id = holy_cube.id;
SELECT * FROM red JOIN holy_cube ON red.face_id = holy_cube.id;
SELECT * FROM yellow JOIN holy_cube ON yellow.face_id = holy_cube.id;