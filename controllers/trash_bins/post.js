var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var database_url = require('../../server').database_url;
var Ajv = require('ajv');
var ajv = new Ajv();
var validate = ajv.compile(require('../../models/trash_bin'));


// POST
exports.request = function(req, res) {

    // Validate input
    if (!validate(req.body)) { // TODO: Check if all parameters were sent

        console.error(colors.red('Validation error:', validate.errors[0].message));
        res.status(405).send(validate.errors);

    } else {

        // Connect to database
        pg.connect(database_url, function(err, client, done) {
            if (err) {
                done();
                console.error(err);
            } else {

                // Prepare Query
                var query ="INSERT INTO trashbin (latitude, longitude, wastetype, size, trashcan, owner, comment, hight,sensor_height,measuring_height, green, orange, red) " +
                  "VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) " +
                  "RETURNING *;"; // TODO: Create a new Trash Bin

                // Database query
                client.query(query, [
                    req.body.latitude,
                    req.body.longitude,
                    req.body.wastetype,
                    req.body.size,
                    req.body.trashcan,
                    req.body.owner,
                    req.body.comment,
                    req.body.hight,
                    req.body.sensor_height,
                    req.body.measuring_height,
                    req.body.green,
                    req.body.orange,
                    req.body.red
                ], function(err, result) {
                    done();

                    if (err) {
                        res.status(500).send(err);
                        console.error(colors.red(err));
                    } else {

                        // Check if Trash_Bin exists
                        if (result.rows.length === 0) {
                            res.status(404).send('Trash not created!');
                            console.error(colors.red('Trash bin not created!'));
                        } else {

                            // Send Result
                            res.status(201).send(result.rows[0]);
                        }
                    }

                });
            }
        });
    }
};
