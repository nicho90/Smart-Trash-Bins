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

    div.innerHTML = str;
    return div;

};*/


// Create marker function
function createMarker(trashbin) {

    var markerSettings = {
        iconColor: 'black'
    };
    if (trashbin.wasttype == 'Papier') {
        markerSettings.icon = 'files-o';
    } else if (trashbin.wasttype == 'GelberSack') {
        markerSettings.icon = 'recycle';
    } else if (trashbin.wasttype == 'Restmüll') {
        markerSettings.icon = 'trash';
    } else if (trashbin.wasttype == 'Glas') {
        markerSettings.icon = 'glass';
    } else if (trashbin.wasttype == 'Bio') {
        markerSettings.icon = 'apple';
    } else {
        markerSettings.icon = 'trash';
    }

    if (trashbin.waste_hight <= trashbin.green) {
        markerSettings.markerColor = 'green';
    } else if (trashbin.wastehight <= trashbin.orange) {
        markerSettings.markerColor = 'orange';
    } else if (trashbin.waste_hight <= trashbin.red) {
        markerSettings.markerColor = 'red';
    } else {
        markerSettings.markerColor = 'red';
    }

    console.log(markerSettings);

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
            for (i = 0; i <= data.length; i++) {
                L.marker([data[i].latitude, data[i].longitude], {
                        icon: createMarker(data[i])
                    }).addTo(map)
                    .bindPopup('<b>Standort</b>: ' + data[i].comment + '<br><img src="' + data[i].picture + '" class="picture">');
            }
        }
    });
}


// Start
init();
