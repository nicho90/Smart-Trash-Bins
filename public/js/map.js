
var map = L.map('map').setView([51.962377, 7.625153], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var greenIcon = L.icon({
    iconUrl: '../images/1tonne.png',


    iconSize:     [38, 30], // size of the icon
    iconAnchor:   [22, 80], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
L.marker([51.962377, 7.625153], {icon:greenIcon} ).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();
