// The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken = "pk.eyJ1IjoiaXNzYWNnOSIsImEiOiJjbGNxYTNscTYwMW45M3hwaWhtcjkxZWFtIn0.lAUsNMocZW8xgp3tTI8X8w";

// Define a map object by initialising a Map from Mapbox
const map = new mapboxgl.Map({
  container: "map",
  // Replace YOUR_STYLE_URL with your style URL.
  style: "mapbox://styles/issacg9/cldxnx6l4005r01kg1vyah5jy"
});

//link to dataset
const data_url =
  "https://api.mapbox.com/styles/v1/issacg9/cldxnx6l4005r01kg1vyah5jy.html?title=copy&access_token=pk.eyJ1IjoiaXNzYWNnOSIsImEiOiJjbGNxYTNscTYwMW45M3hwaWhtcjkxZWFtIn0.lAUsNMocZW8xgp3tTI8X8w&zoomwheel=true&fresh=true#12.91/51.52071/-0.14925";

//Add a search bar
const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken, 
    mapboxgl: mapboxgl, 
    marker: false, 
    placeholder: "Search a place in London", // Placeholder text for the search bar
    proximity: {
      longitude: 51.517214,
      latitude: -0.118841
    } // Coordinates of SOHO, London, UK
  });
map.addControl(geocoder, "top-right");

//Adding full screen controls
map.addControl(new mapboxgl.FullscreenControl({container: document.querySelector('body')}));

//Add positioning controls
map.addControl(new mapboxgl.NavigationControl(), "top-right");
map.addControl( new mapboxgl.GeolocateControl({
positionOptions: {
enableHighAccuracy: true }, 
trackUserLocation: true, 
showUserHeading: true }), 
  "top-right"
);

//Add scale bar
const scale = new mapboxgl.ScaleControl({
maxWidth: 50,
unit: 'imperial'
});
map.addControl(scale,"bottom-right");

//create icon details popup
var iconpopup = new mapboxgl.Popup({
  closeButton: false,
  className: "icon-popup"
});

//on hover change cursor icon
map.on("mousemove", "london-3756y1", function (i) {
  map.getCanvas().style.cursor = "pointer";
  //show icon name//
  var feature = i.features[0];
  iconpopup
  .setText(feature.properties.name)
  .setLngLat(feature.geometry.coordinates)
  .addTo(map);
});

//remove hover actions when mouse is moved away//
map.on("mouseleave", "london-3756y1", function () {
  map.getCanvas().style.cursor = "";
  iconpopup.remove();
});

// Click on the icons to display specific information
map.on("click", (event) => {
const features = map.queryRenderedFeatures(event.point, {
    layers: ["london-3756y1"] 
  });
if (!features.length) {
    return;
  }
  const feature = features[0];
 
//Popup details
const popup = new mapboxgl.Popup({ offset: [0, -10], className: "my-popup" })
    .setLngLat(feature.geometry.coordinates)
    .setHTML(
      `<h3><span style="font-size:15px">${feature.properties.name}</span></h3>
    <p>Address: ${feature.properties.address1}<span style = "font: 400 11px 'Ubuntu Mono';"></p>
    <p>Block: ${feature.properties.borough_name}<span style = "font: 400 11px 'Ubuntu Mono';"></p>`
    )
    .addTo(map);
});

//Writing dropbox functions-select different types

const types = map.queryRenderedFeatures({
    Layers: "london-3756y1"
  });

//dropdown filtering
function myFilterFunction(typeFilter, lvlname) {
 document.getElementById("lvlselected").innerHTML = lvlname;
  if (typeFilter == "any") {
    map.setFilter("london-3756y1", null);
    const types = map.queryRenderedFeatures({
      Layers: "london-3756y1"
    });
   
  } else {
    map.setFilter("london-3756y1", ["==", "type", typeFilter]);
    const types = map.queryRenderedFeatures({
      Layers: "london-3756y1",
      Filter: ["==", "type", typeFilter]
    });
    
  }
}