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
INSERT INTO holy_cube (cube_side, cube_color) VALUES ('left', 'green');
INSERT INTO holy_cube (cube_side, cube_color) VALUES ('face', 'white');
INSERT INTO holy_cube (cube_side, cube_color) VALUES ('right', 'blue');
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

INSERT INTO top (row, positions, face_id) VALUES('top', 'orange,orange,orange', 1);
INSERT INTO top (row, positions, face_id) VALUES('middle', 'orange,orange,orange', 1);
INSERT INTO top (row, positions, face_id) VALUES('bottom', 'orange,orange,orange', 1);

INSERT INTO left_hand (row, positions, face_id) VALUES('top', 'green,green,green', 2);
INSERT INTO left_hand (row, positions, face_id) VALUES('middle', 'green,green,green', 2);
INSERT INTO left_hand (row, positions, face_id) VALUES('bottom', 'green,green,green', 2);

INSERT INTO face (row, positions, face_id) VALUES('top', 'white,white,white', 3);
INSERT INTO face (row, positions, face_id) VALUES('middle', 'white,white,white', 3);
INSERT INTO face (row, positions, face_id) VALUES('bottom', 'white,white,white', 3);

INSERT INTO right_hand (row, positions, face_id) VALUES('top', 'blue,blue,blue', 4);
INSERT INTO right_hand (row, positions, face_id) VALUES('middle', 'blue,blue,blue', 4);
INSERT INTO right_hand (row, positions, face_id) VALUES('bottom', 'blue,blue,blue', 4);

INSERT INTO bottom (row, positions, face_id) VALUES('top', 'red,red,red', 5);
INSERT INTO bottom (row, positions, face_id) VALUES('middle', 'red,red,red', 5);
INSERT INTO bottom (row, positions, face_id) VALUES('bottom', 'red,red,red', 5);

INSERT INTO rear (row, positions, face_id) VALUES('top', 'yellow,tellow,yellow', 6);
INSERT INTO rear (row, positions, face_id) VALUES('middle', 'yellow,tellow,yellow', 6);
INSERT INTO rear (row, positions, face_id) VALUES('bottom', 'yellow,tellow,yellow', 6);

SELECT * FROM top JOIN holy_cube ON top.face_id = holy_cube.id;
SELECT * FROM left_hand JOIN holy_cube ON left_hand.face_id = holy_cube.id;
SELECT * FROM face JOIN holy_cube ON face.face_id = holy_cube.id;
SELECT * FROM right_hand JOIN holy_cube ON right_hand.face_id = holy_cube.id;
SELECT * FROM bottom JOIN holy_cube ON bottom.face_id = holy_cube.id;
SELECT * FROM rear JOIN holy_cube ON rear.face_id = holy_cube.id;