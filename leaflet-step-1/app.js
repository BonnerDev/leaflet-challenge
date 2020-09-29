var newYorkCoords = [40.73, -74.0059];
var mapZoomLevel = 12;
​
// Create the createMap function
var myMap = L.map("map-id", {
  center: newYorkCoords,
  zoom: mapZoomLevel,
});
​
// Create the tile layer that will be the background of our map
L.tileLayer(
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
// Create a baseMaps object to hold the lightmap layer
var darkmap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY,
  }
);

// Load in geojson data
var stationData =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Grab data with d3
d3.json(stationData, (station_info) => {
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
  ​
  