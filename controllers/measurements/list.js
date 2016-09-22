var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var database_url = require('../../server.js').database_url;


// LIST
exports.request = function(req, res) {

    // Connect to database
    pg.connect(database_url, function(err, client, done) {
        if (err) {
            done();
            console.error(err);
        } else {

            // Prepare Query
            var query = "SELECT id FROM trashbin WHERE id=$1;"; // TODO: Check if Trash Bin exists with requested trash_bin_id

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

                        // Prepare Query
                        var query = "SELECT * FROM measurements WHERE emp_id=$1;"; // TODO: Get all Measurements of the Trash Bin

                        // Database query
                        client.query(query, [
                            req.params.trash_bin_id,
                        ], function(err, result) {
                            done();

                            if (err) {
                                res.status(500).send(err);
                                console.error(colors.red(err));
                            } else {

                                // Send result
                                res.status(200).send(result.rows);
                            }
                        });
                    }
                }
            });
        }
    });
};
