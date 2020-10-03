function createMap(quakemap){

  // Create the tile layer that will be the background of our map
  var background = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize:512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var myMap = L.map("map-id",{
    center: [40.73, -74.0059],
    zoom:8,
  });

  // Create a baseMaps object to hold the tectonic layer
  var basemap = {
    "Base Map": background
  };

  var quakes = {
    "Quake Map": quakemap
  };

//create a layer control and add to the map
  L.control.layers(basemap,quakes,{collapsed: false}).addTo(myMap);
}

// create function for labels
function createlabel (response) {
  //console.log(response)});
  var placeholder = response.features;
  //console.log(placeholder)});
  var Markers = [];
  placeholder.forEach((earthquake) => {
    var depth = earthquake.geometry.coordinates[2];
    var longitude = earthquake.geometry.coordinates[0];
    var latitude = earthquake.geometry.coordinates[1];
    //console.log(depth);
    var quakemarker = L.circle([depth,longitude,latitude]),{
      opacity: 1,
      fillOpacity: 1,
      fillColor: red,
      
    };
    var place = earthquake.properties.place;
    //console.log(place);
    var magnitude = earthquake.properties.mag;
    var popup = quakemarker.bindPopup(
      "<strong>Place: </strong>" + place + "<strong>Magnitude: </strong>"+ magnitude
    );
    Markers.push(quakemarker,popup);
  });
  createMap(L.layerGroup(Markers));
}

  // Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", createlabel);



