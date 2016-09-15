var map = L.map('map').setView([51.962377, 7.625153], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Legende
/*var legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');

    var str = '<b><u>Legende</u>:</b>';
    str = str + '<i style="background:green"></i> Leer<br>';
    str = str + '<i style="background:orange"></i> Fast voll<br>';
    str = str + '<i style="background:red"></i> Voll';

//     var str = '<b><u>Legende</u>:</b>';
//     str = str + '<i style="background:green"></i> Leer<br>';
//     str = str + '<i style="background:orange"></i> Fast voll<br>';
//     str = str + '<i style="background:red"></i> Voll';
};*/


// };

// Create marker function
function createMarker(trashbin) {

    var markerSettings = {
        icon: null,
        iconColor: 'black'
    };

    //check for icon
    if (trashbin.wastetype == 'Papier') {
        L.AwesomeMarkers.Icon.prototype.options.prefix = 'fa';
        markerSettings.icon = 'files-o';
    } else if (trashbin.wastetype == 'GelberSack') {
        L.AwesomeMarkers.Icon.prototype.options.prefix = 'fa';
        markerSettings.icon = 'recycle';
    } else if (trashbin.wastetype == 'Restmüll') {
        L.AwesomeMarkers.Icon.prototype.options.prefix = 'glyphicon';
        markerSettings.icon = 'trash';
    } else if (trashbin.wastetype == 'Glas') {
        L.AwesomeMarkers.Icon.prototype.options.prefix = 'fa';
        markerSettings.icon = 'glass';
    } else if (trashbin.wastetype == 'Bio') {
        L.AwesomeMarkers.Icon.prototype.options.prefix = 'glyphicon';
        markerSettings.icon = 'glyphicon apple';
    } else {
        L.AwesomeMarkers.Icon.prototype.options.prefix = 'fa';
        markerSettings.icon = 'trash';
    }

    //check for colors
    if (trashbin.waste_hight <= trashbin.green) {
        markerSettings.markerColor = 'green';
    } else if (trashbin.wastehight <= trashbin.orange) {
        markerSettings.markerColor = 'orange';
    } else if (trashbin.waste_hight <= trashbin.red) {
        markerSettings.markerColor = 'red';
    } else {
        markerSettings.markerColor = 'red';
    }

    // console.log(markerSettings);

    var marker = L.AwesomeMarkers.icon({
        icon: markerSettings.icon,
        markerColor: markerSettings.markerColor
    });

    return marker;

}

// Init - Get all trash bins
function init() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "http://giv-project7.uni-muenster.de:5000/api/trash_bins?latest_measurement=true",
        success: function(data) {
            console.log(data);
            for (i = 0; i < data.length; i++) {
                L.marker([data[i].latitude, data[i].longitude], {
                    icon: createMarker(data[i])
                })
                .bindPopup('<h1>Standort: ' + data[i].comment + '</h1><img src="' + data[i].picture + '" class="picture"/>')
                .addTo(map);
            }
        }
    });
}


// Start
init();
