/**
 * Build the map componente based on Leaflet.
 */
var mainMap={
    map:null,// reference to leaflet map component
    geojson:null,// reference to geojson raw data loaded from file
    mainLayer: null,// reference to main leaflet layer based on geojson raw data.
    info:L.control(),

    init:()=>{
        mainMap.map = L.map('mainmap').setView([-6.931510544942377, -37.276561132018195], 8);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/light-v9',
            tileSize: 512,
            zoomOffset: -1
        }).addTo(mainMap.map);

        mainMap.addInfoControl();
        mainMap.addAttribution();
        mainMap.loadGeojson();
        mainMap.addLegend();
    },

    /**
     * Update the indicator value in the geojson data and recreate the Layer.
     * @param {Array} values, An array with the geocode and new values for the "indicator" attribute
     */
    updateMainLayer:(csv)=>{
        mainMap.geojson.features.forEach(
            (f)=>{
                let geocode=f.properties["gc"];
                f.properties["indicator"]=csv.values[geocode];
            }
        );
        mainMap.renewMainLayer(mainMap.geojson);
    },

    // control that shows state info on hover
    addInfoControl:()=>{
        mainMap.info.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info');
            this.update();
            return this._div;
        };

        mainMap.info.update = function (props) {
            this._div.innerHTML = '<h4>Índice de Vulnerabilidade Metropolitana à COVID-19</h4>' +  (props ?
                '<b>' + props.nm + '</b><br />' + props.indicator + ' índice (entre 0 e 1)'
                : 'passe o mause sobre os município');
        };

        mainMap.info.addTo(mainMap.map);
    },


    // get color depending on population indicator value
    getColor:(d)=>{
        return d > 0.8 ? '#800026' :
                d > 0.7  ? '#BD0026' :
                d > 0.6  ? '#E31A1C' :
                d > 0.5  ? '#FC4E2A' :
                d > 0.4  ? '#FD8D3C' :
                d > 0.3  ? '#FEB24C' :
                d > 0.1  ? '#FED976' :
                            '#FFEDA0';
    },

    style:(feature)=>{
        return {
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7,
            fillColor: mainMap.getColor(feature.properties.indicator)
        };
    },

    highlightFeature:(e)=>{
        var layer = e.target;

        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }

        mainMap.info.update(layer.feature.properties);
    },

    resetHighlight:(e)=>{
        mainMap.mainLayer.resetStyle(e.target);
        mainMap.info.update();
    },

    zoomToFeature:(e)=>{
        mainMap.map.fitBounds(e.target.getBounds());
    },

    onEachFeature:(feature, layer)=>{
        layer.on({
            mouseover: mainMap.highlightFeature,
            mouseout: mainMap.resetHighlight,
            click: mainMap.zoomToFeature
        });
    },

    loadGeojson: async ()=>{
        const response = await fetch("data/munis-PB.geojson");
        const data = await response.json();
        mainMap.geojson = data;
        mainMap.renewMainLayer(data);
    },

    renewMainLayer: (data)=>{
        mainMap.mainLayer = L.geoJson(data, {
            style: mainMap.style,
            onEachFeature: mainMap.onEachFeature
        }).addTo(mainMap.map);
    },

    addAttribution:()=>{
        mainMap.map.attributionControl.addAttribution('IVM-COVID-19 &copy; <a href="http://www.inpe.br/">INPE</a>');
    },

    addLegend:()=>{
        var legend = L.control({position: 'bottomright'});

        legend.onAdd = function (map) {

            var div = L.DomUtil.create('div', 'info legend'),
                grades = [0, 0.1, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
                labels = [],
                from, to;

            for (var i = 0; i < grades.length; i++) {
                from = grades[i];
                to = grades[i + 1];

                labels.push(
                    '<i style="background:' + mainMap.getColor(from + 0.01) + '"></i> ' +
                    from + (to ? '&ndash;' + to : '+'));
            }

            div.innerHTML = labels.join('<br>');
            return div;
        };

        legend.addTo(mainMap.map);
    }
};
