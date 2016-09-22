/**
 * Measurement model
 * @type {Object}
 */
module.exports = {
    "properties": {
        "measured_distance": {
            "type": "number",
            "greaterThan": 0
        }
    },
    "required": [
        "measured_distance"
    ]
};
