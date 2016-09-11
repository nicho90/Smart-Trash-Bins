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
                var query = // TODO: Create a new Trash Bin

                // Database query
                client.query(query, [
                    // TODO: Add parameters
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
