DROP TABLE measurements CASCADE;
DROP TABLE trashbin CASCADE;

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
    sensor_height INT,
    measuring_height INT,
    green DECIMAL,
    orange DECIMAL,
    red DECIMAL,
    picture TEXT
);

CREATE TABLE measurements(
    measuring_id SERIAL primary key,
    timestep TIMESTAMP,
    waste_height DECIMAL,
    emp_id int REFERENCES trashbin (id) ON DELETE CASCADE
);

SELECT * FROM trashbin;

CREATE VIEW measurements_view AS SELECT * FROM measurements;

SELECT * FROM measurements_view;

INSERT INTO trashbin (latitude, longitude, wastetype, size, trashcan, owner, comment, hight,sensor_height,measuring_height, green, orange, red, picture) VALUES (51.955549,7.612711,'Papier', 30, 'Öffentliche Mülltonne','Münster','hier', 75,20,20,50,65,90,'https://upload.wikimedia.org/wikipedia/commons/9/9a/Hamburg-M%C3%BClleimer_01.jpg');
INSERT INTO trashbin (latitude, longitude, wastetype, size, trashcan, owner, comment, hight,sensor_height,measuring_height, green, orange, red, picture) VALUES (51.963667,7.609081,'GelberSack', 30, 'Öffentliche Mülltonne','Münster','hier', 75,20,20,50,65,90,'https://upload.wikimedia.org/wikipedia/commons/9/9a/Hamburg-M%C3%BClleimer_01.jpg');
INSERT INTO trashbin (latitude, longitude, wastetype, size, trashcan, owner, comment, hight,sensor_height,measuring_height, green, orange, red, picture) VALUES ( 51.960462,7.622394,'Restmüll', 40, 'Öffentliche Mülltonne','Münster','hier', 75,20,20,50,65,90,'https://upload.wikimedia.org/wikipedia/commons/9/9a/Hamburg-M%C3%BClleimer_01.jpg');

INSERT INTO measurements (timestep, waste_height, emp_id) VALUES (now(), 30, 1);
INSERT INTO measurements (timestep, waste_height, emp_id) VALUES (now(), 40, 2);
INSERT INTO measurements (timestep, waste_height, emp_id) VALUES (now(), 50, 3);
INSERT INTO measurements (timestep, waste_height, emp_id) VALUES (now(), 30, 3);
INSERT INTO measurements (timestep, waste_height, emp_id) VALUES (now(), 340, 3);
INSERT INTO measurements (timestep, waste_height, emp_id) VALUES (now(), 55, 3);
INSERT INTO measurements (timestep, waste_height, emp_id) VALUES (now(), 56, 3);

SELECT * FROM measurements WHERE emp_id=1 ORDER BY measuring_id DESC LIMIT 1;

SELECT * FROM measurements_view;
