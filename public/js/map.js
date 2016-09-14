
var map = L.map('map').setView([51.962377, 7.625153], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Creates a red marker with the coffee icon
var redMarker = L.AwesomeMarkers.icon({
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

L.AwesomeMarkers.Icon.prototype.options.prefix = 'fa';

var greenMarker = L.AwesomeMarkers.icon({
    icon: 'trash-o',
    markerColor: 'green'
});

L.AwesomeMarkers.Icon.prototype.options.prefix = 'glyphicon';

var whiteMarker = L.AwesomeMarkers.icon({
    icon: 'trash',
    markerColor: 'white',
    iconColor: 'black'
});

L.marker([51.962377, 7.625153], { icon: darkredMarker }).addTo(map)
    .bindPopup('Dieser Mülleimer ist komplett voll!');
L.marker([51.962377, 7.624153], { icon: redMarker }).addTo(map)
    .bindPopup('Dieser Mülleimer ist fast voll!');
L.marker([51.961377, 7.625153], { icon: orangeMarker }).addTo(map)
    .bindPopup('Dieser Mülleimer ist mäßig gefüllt!');;
L.marker([51.962377, 7.626153], { icon: greenMarker }).addTo(map)
    .bindPopup('Dieser Mülleimer ist nur ein wenig gefüllt!');
L.marker([51.963377, 7.625153], { icon: whiteMarker }).addTo(map)
    .bindPopup('Dieser Mülleimer ist praktisch leer!');

function init() {

}

// var greenIcon = L.icon({
//     iconUrl: './images/1tonne.png',


//     iconSize:     [38, 30], // size of the icon (x,y)
//     iconAnchor:   [19, 30], // point of the icon which will correspond to marker's location (x/2, y)
//     popupAnchor:  [-3, -30] // point from which the popup should open relative to the iconAnchor
// });
// L.marker([51.962377, 7.625153], {icon:greenIcon} ).addTo(map)
//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//     .openPopup();
