/**
 * Trash bin model
 * @type {Object}
 */
module.exports = {
    "properties": {
      "latitude": {
        "type": "number"
      },
      "longitude":{
        "type": "number"
      } ,
      "wastetype":{
        "type": "string"
      } ,
      "size":{
        "type": "number"
      },
      "trashcan":{
        "type":"string"
      },
      "owner":{
        "type":"string"
      },
      "comment":{
        "type":"string"
      },
      "hight":{
        "type":"number"
      },
      "sensor_height":{
        "type":"number"
      },
      "measuring_height":{
        "type":"number"
      },
      "measured_distance":{
        "type":"number"
      },
      "green":{
        "type":"number",
        "minimum":0
      },
      "orange":{
        "type": "number",
        "minimum":0
      },
      "red":{
        "type": "number",
        "minimum":0
      },
      "picture": {
	"type": "string"
      }
    },
    "required": [
        "latitude",
        "longitude",
        "wastetype",
        "size",
        "trashcan",
        "owner",
        "comment",
        "hight",
        "sensor_height",
        "measuring_height",
        "green",
        "orange",
        "red",
	"picture"
    ]
};
