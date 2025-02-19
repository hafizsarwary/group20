import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import { Map, View, Overlay } from 'ol';
import { Tile, Image, Group, Vector } from 'ol/layer';
import { OSM, ImageWMS, BingMaps, StadiaMaps } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';
import { fromLonLat } from 'ol/proj';
import { ScaleLine, FullScreen, MousePosition, ZoomSlider,  } from 'ol/control';
import LayerSwitcher from 'ol-layerswitcher';
import { createStringXY } from 'ol/coordinate';
import { Style, Stroke } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';

let osm = new Tile({
    type: "base",
    title: "Open Street Maps",
    visible: true,
    source: new OSM()
});
let LandslideSusceptibilityMap = new Image({
    title: "Landslide Susceptibility Map",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_20/wms',
        params: { 'LAYERS': 'gisgeoserver_20:LandslideSusceptibilityMap', }
    }),
});
var aspect = new Image({
    title: "Aspect",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_20/wms',
        params: { 'LAYERS': 'gisgeoserver_20:aspect' }
    }),
    opacity: 1
});

var confidence = new Image({
    title: "Confidence",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_20/wms',
        params: { 'LAYERS': 'gisgeoserver_20:confidence' }
    }),
    visible: true
});
var dtm= new Image({
    title: "Dtm",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_20/wms',
        params: { 'LAYERS': 'gisgeoserver_20:dtm' }
    }),
    
});
var dusaf = new Image({
    title: "Dusaf",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_20/wms',
        params: { 'LAYERS': 'gisgeoserver_20:dusaf' }
    }),
    
});
var faultss = new Image({
    title: "Faults",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_20/wms',
        params: { 'LAYERS': 'gisgeoserver_20:faultss' }
    }),
    
});
var ndvi= new Image({
    title: "ndvi",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_20/wms',
        params: { 'LAYERS': 'gisgeoserver_20:ndvi' }
    }),
    
});
var plan = new Image({
    title: "plan",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_20/wms',
        params: { 'LAYERS': 'gisgeoserver_20:plan' }
    }),
    
});
var population = new Image({
    title: "population",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_20/wms',
        params: { 'LAYERS': 'gisgeoserver_20:population' }
    }),
    
});
var profile = new Image({
    title: "profile",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_20/wms',
        params: { 'LAYERS': 'gisgeoserver_20:profile' }
    }),
    
});
var rivers= new Image({
    title: "Rivers",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_20/wms',
        params: { 'LAYERS': 'gisgeoserver_20:rivers' }
    }),
    
});
var roads = new Image({
    title: "roads",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_20/wms',
        params: { 'LAYERS': 'gisgeoserver_20:roads' }
    }),
    
});
var slope = new Image({
    title: "slope",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_20/wms',
        params: { 'LAYERS': 'gisgeoserver_20:slope' }
    }),
    
});

//Create the layer groups and add the layers to them
let basemapLayers = new Group({
    title: "Base Maps",
    layers: [osm]
})

let overlayLayers = new Group({
    title: "Overlay Layers",
    layers: [
        LandslideSusceptibilityMap, 
        aspect, 
        confidence, 
        dtm,
        dusaf,
        faultss,
        ndvi,
        plan,
        population,
        profile,
        rivers,
        roads,
        slope
    ]
})

// Map Initialization
let map = new Map({
    target: document.getElementById('map'),
    layers: [basemapLayers, overlayLayers],
    view: new View({
        center: fromLonLat([9.19, 46.13]),
        zoom: 12
    })
});

// Add the map controls:
map.addControl(new ScaleLine());
map.addControl(new FullScreen());
map.addControl(new MousePosition({
    coordinateFormat: createStringXY(4),
    projection: 'EPSG:4326',
    className: 'custom-control',
    placeholder: '9.19, 46.13' 
}));
let layerSwitcher = new LayerSwitcher({});
map.addControl(layerSwitcher);


//OPTIONAL
//Add the Bing Maps layers
var BING_MAPS_KEY = "AqbDxABFot3cmpxfshRqLmg8UTuPv_bg69Ej3d5AkGmjaJy_w5eFSSbOzoHeN2_H";
var bingRoads = new Tile({
    title: 'Bing Maps—Roads',
    type: 'base',
    visible: false,
    source: new BingMaps({
        key: BING_MAPS_KEY,
        imagerySet: 'Road'
    })
});

var bingAerial = new Tile({
    title: 'Bing Maps—Aerial',
    type: 'base',
    visible: false,
    source: new BingMaps({
        key: BING_MAPS_KEY,
        imagerySet: 'Aerial'
    })
});
basemapLayers.getLayers().extend([bingRoads, bingAerial]);

//Add the Stadia Maps layers
var stadiaWatercolor = new Tile({
    title: "Stadia Watercolor",
    type: "base",
    visible: false,
    source: new StadiaMaps({
        layer: 'stamen_watercolor'
    })
})
var stadiaToner = new Tile({
    title: "Stadia Toner",
    type: "base",
    visible: false,
    source: new StadiaMaps({
        layer: 'stamen_toner'
    })
})
//basemapLayers.addLayer(stadiaWatercolor);
basemapLayers.getLayers().extend([stadiaWatercolor, stadiaToner]);

//Add the WFS layer
let wfsSource = new VectorSource()
let wfsLayer = new Vector({
    title: "NLZ",
    source: wfsSource,

    style: new Style({
        stroke: new Stroke({
            color: 'rgb(255, 102, 102)',
            width: 4
        })
    }),
    zIndex: 9999
});
overlayLayers.getLayers().extend([wfsLayer]);

// This allows to use the function in a callback!
function loadFeatures(response) {
    wfsSource.addFeatures(new GeoJSON().readFeatures(response))
}
// This is not a good practice, but works for the jsonp.
window.loadFeatures = loadFeatures;


var base_url = "https://www.gis-geoserver.polimi.it/geoserver/gis/ows?";
var wfs_url = base_url;
wfs_url += "service=WFS&"
wfs_url += "version=2.0.0&"
wfs_url += "request=GetFeature&"
wfs_url += "typeName=gis%3ACOL_water_areas&"
wfs_url += "outputFormat=text%2Fjavascript&"
wfs_url += "srsname=EPSG:3857&"
wfs_url += "format_options=callback:loadFeatures"

console.log(wfs_url);

map.once('postrender', (event) => {
    // Load the WFS layer
    $.ajax({ url: wfs_url, dataType: 'jsonp' });
    
})

//Add the code for the Pop-up
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

var popup = new Overlay({
    element: container
});
map.addOverlay(popup);

// The click event handler for closing the popup.
// This ensures that JQuery ($) is already available in the page.
$(document).ready(function () {
    map.on('singleclick', function (event) {
        //This iterates over all the features that are located on the pixel of the click (can be many)
        var feature = map.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
            return feature;
        });

        //If there is a feature, open the popup by setting a position to it and put the data from the feature
        if (feature != null) {
            var pixel = event.pixel;
            var coord = map.getCoordinateFromPixel(pixel);
            popup.setPosition(coord);
            content.innerHTML =
                '<h5>Colombia Water Areas</h5><br><b>Name: </b>' +
                feature.get('NAME') +
                '</br><b>Description: </b>' +
                feature.get('HYC_DESCRI');
        } else {
            //Only if the colombiaRoads layer is visible, do the GetFeatureInfo request
            if (colombiaRoads.getVisible()) {
                var viewResolution = (map.getView().getResolution());
                var url = colombiaRoads.getSource().getFeatureInfoUrl(event.coordinate, viewResolution, 'EPSG:3857', { 'INFO_FORMAT': 'text/html' });
                console.log(url);

                if (url) {
                    var pixel = event.pixel;
                    var coord = map.getCoordinateFromPixel(pixel);
                    popup.setPosition(coord);
                    //We do again the AJAX request to get the data from the GetFeatureInfo request
                    $.ajax({ url: url })
                        .done((data) => {
                            //Put the data of the GetFeatureInfo response inside the pop-up
                            //The data that arrives is in HTML
                            content.innerHTML = data;
                        });
                }
            }
        }
    });
});



// Adding map event for pointermove
// The click event handler for closing the popup.
closer.onclick = function () {
    popup.setPosition(undefined);
    closer.blur(); 
    return false;
};

map.on('pointermove', function(event){
    var pixel = map.getEventPixel(event.originalEvent);
    var hit = map.hasFeatureAtPixel(pixel);
    map.getTarget().style.cursor = hit ? 'pointer' : '';
});

map.on('moveend', function(event){
    console.log("moved map");
});