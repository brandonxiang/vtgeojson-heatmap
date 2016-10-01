L.VtGeojsonHeat = L.GridLayer.extend({

    initialize: function (map, options) {
        var featurecollection = {
            type: 'FeatureCollection',
            features: []
        }
        this.heat = L.heatmap().addTo(map)
		L.setOptions(this, options);
	},

    createTile: function(coords, done){
          var tile = [coords.x,coord.y,coord.z]
          vt2geojson(tile)

     },

     vt2geojson: function (tile) {
            var layers = 'poi_label'
            var tiles = "tilejson+http://localhost:8000/tilejson.json"
            vtgeojson(tiles, {
                tiles: [tile],
                layers: layers ? layers.split(',') : undefined
            })
            .on('data', function(data) {
                this.featurecollection.features.push(data)
                heat.addLatLng(data.geometry.coordinates);
            })
        }
 });