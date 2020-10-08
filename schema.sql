DROP TABLE IF EXISTS holy_cube CASCADE;
DROP TABLE IF EXISTS top CASCADE;
DROP TABLE IF EXISTS left_hand CASCADE;
DROP TABLE IF EXISTS face CASCADE;
DROP TABLE IF EXISTS right_hand CASCADE;
DROP TABLE IF EXISTS bottom CASCADE;
DROP TABLE IF EXISTS rear CASCADE;

CREATE TABLE holy_cube (
  id SERIAL PRIMARY KEY,
  cube_side VARCHAR(10),
  cube_color VARCHAR(10)
);

INSERT INTO holy_cube (cube_side, cube_color) VALUES ('top', 'orange');
INSERT INTO holy_cube (cube_side, cube_color) VALUES ('left_hand', 'green');
INSERT INTO holy_cube (cube_side, cube_color) VALUES ('face', 'white');
INSERT INTO holy_cube (cube_side, cube_color) VALUES ('right_hand', 'blue');
INSERT INTO holy_cube (cube_side, cube_color) VALUES ('bottom', 'red');
INSERT INTO holy_cube (cube_side, cube_color) VALUES ('rear', 'yellow');

CREATE TABLE top(
  id SERIAL PRIMARY KEY,
  row VARCHAR(10),
  positions VARCHAR(255),
  face_id INT NOT NULL,
  FOREIGN KEY (face_id) REFERENCES holy_cube (id)
);
CREATE TABLE left_hand(
  id SERIAL PRIMARY KEY,
  row VARCHAR(10),
  positions VARCHAR(255),
  face_id INT NOT NULL,
  FOREIGN KEY (face_id) REFERENCES holy_cube (id)
);
CREATE TABLE face(
  id SERIAL PRIMARY KEY,
  row VARCHAR(10),
  positions VARCHAR(255),
  face_id INT NOT NULL,
  FOREIGN KEY (face_id) REFERENCES holy_cube (id)
);
CREATE TABLE right_hand(
  id SERIAL PRIMARY KEY,
  row VARCHAR(10),
  positions VARCHAR(255),
  face_id INT NOT NULL,
  FOREIGN KEY (face_id) REFERENCES holy_cube (id)
);
CREATE TABLE bottom(
  id SERIAL PRIMARY KEY,
  row VARCHAR(10),
  positions VARCHAR(255),
  face_id INT NOT NULL,
  FOREIGN KEY (face_id) REFERENCES holy_cube (id)
);
CREATE TABLE rear(
  id SERIAL PRIMARY KEY,
  row VARCHAR(10),
  positions VARCHAR(255),
  face_id INT NOT NULL,
  FOREIGN KEY (face_id) REFERENCES holy_cube (id)
);

INSERT INTO top (row, positions, face_id) VALUES('top', 'orange:00,orange:01,orange:02', 1);
INSERT INTO top (row, positions, face_id) VALUES('middle', 'orange:10,orange:11,orange:12', 1);
INSERT INTO top (row, positions, face_id) VALUES('bottom', 'orange:20,orange:21,orange:22', 1);

INSERT INTO left_hand (row, positions, face_id) VALUES('top', 'green:00,green:01,green:02', 2);
INSERT INTO left_hand (row, positions, face_id) VALUES('middle', 'green:10,green:11,green:12', 2);
INSERT INTO left_hand (row, positions, face_id) VALUES('bottom', 'green:20,green:21,green:22', 2);

INSERT INTO face (row, positions, face_id) VALUES('top', 'white:00,white:01,white:02', 3);
INSERT INTO face (row, positions, face_id) VALUES('middle', 'white:10,white:11,white:12', 3);
INSERT INTO face (row, positions, face_id) VALUES('bottom', 'white:20,white:21,white:22', 3);

INSERT INTO right_hand (row, positions, face_id) VALUES('top', 'blue:00,blue:01,blue:02', 4);
INSERT INTO right_hand (row, positions, face_id) VALUES('middle', 'blue:10,blue:11,blue:12', 4);
INSERT INTO right_hand (row, positions, face_id) VALUES('bottom', 'blue:20,blue:21,blue:22', 4);

INSERT INTO bottom (row, positions, face_id) VALUES('top', 'red:00,red:01,red:02', 5);
INSERT INTO bottom (row, positions, face_id) VALUES('middle', 'red:10,red:11,red:12', 5);
INSERT INTO bottom (row, positions, face_id) VALUES('bottom', 'red:20,red:21,red:22', 5);

INSERT INTO rear (row, positions, face_id) VALUES('top', 'yellow:00,yellow:01,yellow:02', 6);
INSERT INTO rear (row, positions, face_id) VALUES('middle', 'yellow:10,yellow:11,yellow:12', 6);
INSERT INTO rear (row, positions, face_id) VALUES('bottom', 'yellow:20,yellow:21,yellow:22', 6);

SELECT * FROM top JOIN holy_cube ON top.face_id = holy_cube.id;
SELECT * FROM left_hand JOIN holy_cube ON left_hand.face_id = holy_cube.id;
SELECT * FROM face JOIN holy_cube ON face.face_id = holy_cube.id;
SELECT * FROM right_hand JOIN holy_cube ON right_hand.face_id = holy_cube.id;
SELECT * FROM bottom JOIN holy_cube ON bottom.face_id = holy_cube.id;
SELECT * FROM rear JOIN holy_cube ON rear.face_id = holy_cube.id;