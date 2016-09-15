var colors = require('colors');
var async = require('async');
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
            var query;

            // Check for parameters
            if (req.query.lat && req.query.lng) {
                query = ""; // TODO: noch nicht!
            } else {
                query = "SELECT * FROM trashbin;"; // TODO: List all trash_bins
            }

            // Database query
            client.query(query, function(err, result) {
                done();

                if (err) {
                    res.status(500).send(err);
                    console.error(colors.red(err));
                } else {

                    var trash_bins = result.rows;

                    // Check for latest measurements
                    if (req.query.latest_measurement && req.query.latest_measurement === 'true') {

                        async.forEachOf(trash_bins, function(trash_bin, key, callback) {

                                // Prepare query
                                var query = "SELECT * FROM measurements WHERE emp_id=$1 ORDER BY measuring_id DESC LIMIT 1; "; // TODO:

                                // Database query
                                client.query(query, [
                                    trash_bin.id
                                ], function(err, result) {
                                    done();

                                    if (err) {
                                        callback(err);
                                    } else {

                                        // Check if Measurement exists
                                        if (result.rows.length === 0) {
                                            _.extend(trash_bins[key], {
                                                timestep: null
                                            });
                                        } else {
                                            _.extend(trash_bins[key], result.rows[0]);
                                        }
                                        callback();
                                    }
                                });
                            },
                            function(err) {
                                // if any of the file processing produced an error, err would equal that error
                                if (err) {
                                    res.status(500).send(err);
                                    console.error(colors.red(err));
                                } else {

                                    // Send Result
                                    res.status(200).send(trash_bins);
                                }
                            });

                    } else {
                        // Send Result
                        res.status(200).send(trash_bins);
                    }

                }
            });
        }
    });
};
