
var map = L.map('map').setView([51.962377, 7.625153], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// var legend = L.control({position: 'bottomright'});

// legend.onAdd = function (map) {

//     var div = L.DomUtil.create('div', 'info legend'),
//     grades = [0, 10, 20, 50, 100, 200, 500, 1000],
//     labels = [];

//     // loop through our density intervals and generate a label with a colored square for each interval
//     for (var i = 0; i < grades.length; i++) {
//         div.innerHTML +=
//             '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
//             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
// }

// return div;
// };

// Create trash bin markers
var redMarker = L.AwesomeMarkers.icon({
    icon: 'trash',
    markerColor: 'red'
});

var orangeMarker = L.AwesomeMarkers.icon({
    icon: 'trash',
    markerColor: 'orange'
});

var greenMarker = L.AwesomeMarkers.icon({
    icon: 'trash',
    markerColor: 'green'
});
// Create GelberSack markers

L.AwesomeMarkers.Icon.prototype.options.prefix = 'fa';

var redSack = L.AwesomeMarkers.icon({
    icon: 'recycle',
    markerColor: 'red'
});

var orangeSack = L.AwesomeMarkers.icon({
    icon: 'recycle',
    markerColor: 'orange'
});

var greenSack = L.AwesomeMarkers.icon({
    icon: 'recycle',
    markerColor: 'green'
});

// Create Papier markers

L.AwesomeMarkers.Icon.prototype.options.prefix = 'fa';

var redPaper = L.AwesomeMarkers.icon({
    icon: 'file-o',
    markerColor: 'red'
});

var orangePaper = L.AwesomeMarkers.icon({
    icon: 'file-o',
    markerColor: 'orange'
});

var greenPaper = L.AwesomeMarkers.icon({
    icon: 'file-o',
    markerColor: 'green'
});

// Create Restmüll markers

L.AwesomeMarkers.Icon.prototype.options.prefix = 'glyphicon';

var redRest = L.AwesomeMarkers.icon({
    icon: 'trash',
    markerColor: 'red'
});

var orangeRest = L.AwesomeMarkers.icon({
    icon: 'trash',
    markerColor: 'orange'
});

var greenRest = L.AwesomeMarkers.icon({
    icon: 'trash',
    markerColor: 'green'
});

// L.marker([51.962377, 7.625153], { icon: redMarker }).addTo(map)
//     .bindPopup('Dieser Mülleimer ist komplett voll!');

function init() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "http://giv-project7.uni-muenster.de:5000/api/trash_bins?latest_measurement=true",
        success: function (data) {
            console.log(data);
            for (i = 0; i < data.length; i++) {
                var lat = data[i].latitude;
                var lon = data[i].longitude;
                var type = data[i].wastetype;
                var green = data[i].green;
                var orange = data[i].orange;
                var red = data[i].red;
                var height = data[i].waste_height;
                var type = data[i].wastetype;
                var color;
                console.log(data[i].waste_height);


                if (height <= green) {
                    color = "green";
                }
                if (height > green && height <= orange) {
                    color = "orange";
                }
                if (height > orange) {
                    color = "red";
                }
                console.log(color)

                if (type == "GelberSack") {
                    if (color == "green") {
                        L.marker([lat, lon], { icon: greenSack }).addTo(map)
                    };
                    if (color == "orange") {
                        L.marker([lat, lon], { icon: orangeSack }).addTo(map)
                    };
                    if (color == "red") {
                        L.marker([lat, lon], { icon: redSack }).addTo(map)
                    };
                }
                if (type == "Restmüll") {
                   if (color == "green") {
                        L.marker([lat, lon], { icon: greenRest }).addTo(map)
                    };
                    if (color == "orange") {
                        L.marker([lat, lon], { icon: orangeRest }).addTo(map)
                    };
                    if (color == "red") {
                        L.marker([lat, lon], { icon: redRest }).addTo(map)
                    };
                }
                if (type == "Papier") {
                   if (color == "green") {
                        L.marker([lat, lon], { icon: greenPaper }).addTo(map)
                    };
                    if (color == "orange") {
                        L.marker([lat, lon], { icon: orangePaper}).addTo(map)
                    };
                    if (color == "red") {
                        L.marker([lat, lon], { icon: redPaper }).addTo(map)
                    };            
                }
            }
        }
    });
}

init();

// var greenIcon = L.icon({
//     iconUrl: './images/1tonne.png',


//     iconSize:     [38, 30], // size of the icon (x,y)
//     iconAnchor:   [19, 30], // point of the icon which will correspond to marker's location (x/2, y)
//     popupAnchor:  [-3, -30] // point from which the popup should open relative to the iconAnchor
// });
// L.marker([51.962377, 7.625153], {icon:greenIcon} ).addTo(map)
//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//     .openPopup();
