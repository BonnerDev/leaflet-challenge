function createMap(quake) {

  var myMap = L.map("map-id",{
    center: [40.73, -74.0059],
    zoom:12,
    layers:[basemaps,tectonic,quakes]
  });

// Create the tile layer that will be the background of our map
  var background = L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
      "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/streets-v11",
      accessToken: API_KEY,
  }
  ).addTo(myMap);
​
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
};


// function createMarkers(response) {
//   //pull the quake data
//   var quakesdata = response.features;

//   //array to hold markers
//   marker = [];

//   //loop through the features array
//   for (var index =0; index < features.length, index++){var}




// }





// Load in geojson data
var quakedata =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
​

// Grab data with d3
d3.json(quakedata, (response) => {
  console.log(station_info);
  var bikeMarkers = [];
  var station = station_info.data.stations;
  // console.log(station_Info);
  station.forEach((station) => {
    var bikeMarker = L.marker([station.lat, station.lon]);
    var popup = bikeMarker.bindPopup(
      "<strong>Station Name: </strong>" +
        station.name +
        "<br><strong>Station Capacity: </strong><br> " +
        station.capacity
    );
    bikeMarkers.push(bikeMarker);
  });
  var bikeLayer = L.layerGroup(bikeMarkers);
  bikeLayer.addTo(myMap);
  
  // Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", createMarkers);
  