
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


// Create marker function
function createMarker (trashbin) {

  var markerSettings = {
    iconColor: 'black'
  };
  if(trashbin.wasttype == 'Papier') {
    markerSettings.icon = 'files-o';
  } else if(trashbin.wasttype == 'GelberSack'){
    markerSettings.icon = 'recycle';
  } else if(trashbin.wasttype == 'Restmüll'){
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

// Init - Get all trash bins
function init() {
    $.ajax({
        type : "GET",
        dataType : "json",
        url : "http://giv-project7.uni-muenster.de:5000/api/trash_bins?latest_measurement=true",
        success: function(data){
            console.log(data);
            for(i=0;i<=data.length;i++) {
              L.marker([data[i].latitude, data[i].longitude], { icon: createMarker(data[i]) } ).addTo(map)
             .bindPopup('Dieser Mülleimer ist fast voll! ' + 'Fundort: ' + data[i].comment );
            }
        }
    });
};

init();
