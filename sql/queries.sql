CREATE TABLE trashbin(
id INT PRIMARY KEY,
latitude DECIMAL,
longitude DECIMAl,
wastetype TEXT,
size INT,
trashcan TEXT,
owner TEXT,
comment TEXT,
hight INT,
white DECIMAL,
green DECIMAL,
orange DECIMAL,
red DECIMAL
)

SELECT * FROM trashbin_view;
CREATE TABLE measurements(
measuring_id int primary key,
timestep timestamp,
volume	 int,
emp_id int )
CREATE VIEW measurements_view AS SELECT * FROM measurements;
SELECT * FROM measurements_view;
INSERT INTO trashbin (id, latitude, longitude, wastetype, size, trashcan, owner, comment, hight, white, green, orange, red) VALUES (1, 51.955549,7.612711,'Papier', 40, 'Öffentliche Mülltonne','Münster','hier', 100, 54,0,0,0)
SELECT * FROM trashbin_view;
INSERT INTO measurements (measuring_id, timestep, volume, emp_id) VALUES (1, '2016-09-13 12:49:00', 50, 1);
INSERT INTO measurements (measuring_id, timestep, volume, emp_id) VALUES (2, '2016-09-13 12:50:00', 50, 2);
SELECT * FROM measurements_view;
