DROP TABLE measurements;
DROP TABLE trashbin;
CREATE TABLE trashbin(
id SERIAL PRIMARY KEY,
latitude DECIMAL,
longitude DECIMAl,
wastetype TEXT,
size INT,
trashcan TEXT,
owner TEXT,
comment TEXT,
hight INT,
green DECIMAL,
orange DECIMAL,
red DECIMAL
);

CREATE TABLE measurements(
measuring_id SERIAL primary key,
timestep TIMESTAMP,
volume	 int,
emp_id int REFERENCES trashbin (id)ON DELETE CASCADE
);
SELECT * FROM trashbin;
CREATE VIEW measurements_view AS SELECT * FROM measurements;
SELECT * FROM measurements_view;
INSERT INTO trashbin (latitude, longitude, wastetype, size, trashcan, owner, comment, hight, green, orange, red) VALUES (51.955549,7.612711,'Papier', 40, 'Öffentliche Mülltonne','Münster','hier', 100,0,0,0);
INSERT INTO measurements (timestep, volume, emp_id) VALUES (now(), 50, 1);
SELECT * FROM measurements_view;
