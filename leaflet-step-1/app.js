function createMap(quake) {

  var myMap = L.map("map-id",{
    center: [40.73, -74.0059],
    zoom:12,
    layers:[basemaps,tectonic,quakes]
  });

// Create the tile layer that will be the background of our map
  var background = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

// Create a baseMaps object to hold the tectonic layer
  var basemaps = {
  "Base Map": background
  };

//create overlay maps to hold the quake layer
  var tectonic = {
    "Tectonic Map": tectonicmap
  };

  var quakes = {
    "Quake Map": quake
  };

//create a layer control and add to the map
  L.control.layers(background,tectonicmap,quake,{collapsed: false}).addTo(myMap);
}
// Load in geojson data
var quakedata ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Grab data with d3
d3.json(quakedata, (response) => {
  console.log(response)});
  var Markers = [];
  var depth = response.features.coordinates[2];
  // console.log(station_Info);
  quake.forEach((quake) => {
    var quakeMarker = L.marker([quake.coordinates[0], quake.coordinates[0]]);
    var popup = quakeMarker.bindPopup(
      "<strong>Title: </strong>" +
        quake.title +
        "<br><strong>Magnitude: </strong><br> " +
        quake.mag
    );
    Markers.push(quakeMarker);
  });
  L.layerGroup(quakeMarkers);
  quakes.addTo(myMap);
  
  // Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
  //d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", createMarkers);
  