# Indicators Panel

Interactive panel of hierarchical indicators.

## Input data
----

The input data to feed the panel is projected based on two parts for the indicator data, the model and the raw data, and one part for the geographic data. Both the model and the raw data are designed to work together. The first part is the model that guides the loading of raw data.

The [GeoJSON](https://geojson.org/) file is the format used to provide the geographic data for the map. The identifier attribute for each polygon is mandatory and must be the same used in each CSV data file to link the indicators and the corresponding polygon.

### Model
----

The model defines the hierarchy of the indicator starting at the root node. The identification at each node is the key attribute and is the guide for loading raw data. Each key is used to load a CSV file, so the name of each CSV file must be the same as the corresponding key in the model.

The location of the model file is in the "model" directory in the application's base path and his name is currently blocked for **"ivm_rmvale.json"** and will be parameterized in the future.

The model is formatted as JSON and its structure should follow this example.
```json
{
    "dataversion":"the_version_of_the_data",
    "key":"the_root_node_key",
    "description":"Any text to describe the root node",
    "dimensions":[
        {
            "key":"the_dimension_node_key",
            "description":"Any text to describe the dimension node",
            "indicators":[
                {
                    "key":"the_indicator_node_key",
                    "description":"Any text to describe the indicator node"
                },
                {"more indicators like the first"},
                {"more indicators like the first"}
            ]
        },
        {"more dimensions like the first"},
        {"more dimensions like the first"}
    ]
}
```

### Raw data (CSVs)
----

The raw data is based on a set of CSV files. For each one, the name of the CSV file must be the corresponding key in the model.

Following the example template from the "Model" section, the corresponding set of CSV data files should be:
```
the_root_node_key.csv
the_dimension_node_key.csv
the_indicator_node_key.csv
...
```

The CSV is formatted with the column names on the first line and the data on the other lines, as the follows:
```csv
"geocode","Municipio","value"
3502507,"Aparecida","0,333252595573582"
3503158,"Arapeí","0,83392263959669"
3503505,"Areias",1
...
```
The column names **"geocode"** and **"value"** are required. Other columns are ignored.

### Geographical data
----

The expected geographic data is polygons or multipolygons and formatted as a GeoJSON file. This format is provided by most modern GIS software such as QGIS and GeoServer.

The GeoJSON file can be generated using the QGIS export feature and an input shapefile file.

The names of the attributes associated with the geographic data must be **"gc"** and **"nm"**. Their names are the alias for **"geocoding"** and **"name"**. Reducing attribute names is a technique for reducing the size of the GeoJSON file.

The name of the GeoJSON file is currently blocked for **"rm-vale.geojson"** and will be parameterized in the future.

The projection tested is Geographic/SIRGAS2000 corresponding to the proj4 code: "EPSG: 4674"

## Licenses

There is a lot of software used in this work. Any of these software has a license to use and permission to modify code, so we publicize each one below.

 > D3 https://github.com/d3/d3/blob/master/LICENSE

 > Leaflet https://github.com/Leaflet/Leaflet/blob/master/LICENSE

 > JQuery https://jquery.org/license/

 > Bootstrap https://github.com/twbs/bootstrap/blob/master/LICENSE

### Thanks for the sample code

To build my TreeView i use this example.
 > https://jsfiddle.net/awolf2904/bf43jws1/

 > https://observablehq.com/@d3/collapsible-tree

To build the map i see this example.
 > https://leafletjs.com/examples/choropleth/

### Author

Any questions, please use the email: afacarvalho@yahoo.com.br