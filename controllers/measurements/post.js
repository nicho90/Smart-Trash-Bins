var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var database_url = require('../../server.js').database_url;
var Ajv = require('ajv');
var ajv = new Ajv();
var validate = ajv.compile(require('../../models/measurement'));


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
                var query = "SELECT * FROM trashbin WHERE id=$1;"; // TODO: Check if Trash Bin exists with requested trash_bin_id

                // Database query
                client.query(query, [
                    req.params.trash_bin_id
                ], function(err, result) {
                    done();

                    if (err) {
                        res.status(500).send(err);
                        console.error(colors.red(err));
                    } else {

                        // Check if Trash_Bin exists
                        if (result.rows.length === 0) {
                            res.status(404).send('Trash bin not found!');
                            console.error(colors.red('Trash bin not found!'));
                        } else {

                            var trash_bin = result.rows[0];
                            var waste_height = trash_bin.measuring_height - req.body.measured_distance;
                            if (waste_height < 0) {
                                waste_height = 0;
                            }

                            // Prepare Query
                            var query = "INSERT INTO measurements (timestep,waste_height,emp_id) " +
                              "VALUES (now(),$1,$2) " +
                              "RETURNING *;"; // TODO: Create a new Measurement for the Trash Bin

                            // Database query
                            client.query(query, [
                                waste_height,
                                req.params.trash_bin_id
                            ], function(err, result) {
                                done();

                                if (err) {
                                    res.status(500).send(err);
                                    console.error(colors.red(err));
                                } else {

                                    // Send result
                                    res.status(201).send(result.rows[0]);
                                }
                            });
                        }
                    }
                });
            }
        });
    }
};
