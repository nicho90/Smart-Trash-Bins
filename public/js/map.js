
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

// Creates a red marker with the coffee icon
/*var redMarker = L.AwesomeMarkers.icon({
    icon: 'trash',
    markerColor: 'red'
});

var darkredMarker = L.AwesomeMarkers.icon({
    icon: 'trash',
    markerColor: 'darkred'
});

var orangeMarker = L.AwesomeMarkers.icon({
    icon: 'trash',
    markerColor: 'orange'
});

var greenMarker = L.AwesomeMarkers.icon({
    icon: 'folder-close',
    markerColor: 'green'
});*/

// Marker function
function creatMarker (trashbin) {

  var markerSettings = {
    iconColor: 'black'
  };
  if(trashbin.wasttype == 'Papier') {
    markerSettings.icon = 'files-o';
  } else if(trashbin.wasttype == 'GelberSack'){
    markerSettings.icon = 'recycle';
  }else if(trashbin.wasttype == 'Restmüll'){
    markerSettings.icon = 'trash';
  }else if (trashbin.wasttype == 'Glas') {
    markerSettings.icon = 'glass';
  }else if (trashbin.wasttype == 'Bio') {
    markerSettings.icon = 'glyphicon glyphicon-apple';
  }else {
    markerSettings.icon = 'fa fa-trash';
  }

  if(trashbin.waste_hight<=trashbin.green) {
    markerSettings.markerColor = 'green';
  } else if(trashbin.wastehight<=trashbin.orange) {
    markerSettings.markerColor = 'orange';
  } else if(trashbin.waste_hight<=trashbin.red) {
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

};

// Icon allocation
/*var Papier = L.AwesomeMarkers.icon({
  icon: 'files-o ';
});

var Restmüll = L.AwesomeMarkers.icon({
  icon: 'trash';
});

var GelberSack = L.AwesomeMarkers.icon({
  icon: 'recycle';
});

var Glas = L.AwesomeMarkers.icon({
  icon: 'glass';
});

var Bio = L.bootstrap.icon({
  icon: 'glyphicon glyphicon-apple';
});*/
// L.AwesomeMarkers.Icon.prototype.options.prefix = 'glyphicon';

/*var whiteMarker = L.AwesomeMarkers.icon({
    icon: 'folder-close',
    markerColor: 'white',
    iconColor: 'black'
});*/

/*L.marker([51.962377, 7.625153], { icon: darkredMarker }).addTo(map)
    .bindPopup('Dieser Mülleimer ist komplett voll!');
L.marker([51.962377, 7.624153], { icon: redMarker }).addTo(map)
    .bindPopup('Dieser Mülleimer ist fast voll!');
L.marker([51.961377, 7.625153], { icon: orangeMarker }).addTo(map)
    .bindPopup('Dieser Mülleimer ist mäßig gefüllt!');;
L.marker([51.962377, 7.626153], { icon: greenMarker }).addTo(map)
    .bindPopup('Dieser Mülleimer ist nur ein wenig gefüllt!');
L.marker([51.963377, 7.625153], { icon: whiteMarker }).addTo(map)
    .bindPopup('Dieser Mülleimer ist praktisch leer!');*/



function init() {
    $.ajax({
        type : "GET",
        dataType : "json",
        url : "http://giv-project7.uni-muenster.de:5000/api/trash_bins?latest_measurement=true",
        success: function(data){
            console.log(data);
            for(i=0;i<=data.length;i++) {
              L.marker([data[i].latitude, data[i].longitude], { icon: creatMarker(data[i]) } ).addTo(map)
             .bindPopup('Dieser Mülleimer ist fast voll! ' + 'Fundort: ' + data[i].comment );
            }
        }
    });
};

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
