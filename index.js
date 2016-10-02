L.VtGeojsonHeat = L.GridLayer.extend({

    initialize: function (map, options) {
        this.featurecollection = {
            type: 'FeatureCollection',
            features: []
        }
        this.heat = L.heatLayer([]).addTo(map)
        L.setOptions(this, options);
    },

    createTile: function (coords, done) {
        var tile = [coords.x, coords.y, coords.z]
        this.vt2geojson(tile)
        return L.DomUtil.create("div");
    },

    vt2geojson: function (tile) {
        var that = this;
        var layers = 'poi_label'
        var tiles = "tilejson+http://localhost:8000/tilejson.json"
        vtgeojson(tiles, {
            tiles: [tile],
            layers: layers ? layers.split(',') : undefined
        })
        .on('data', function (data) {
            that.featurecollection.features.push(data)
            var coord = [data.geometry.coordinates[1], data.geometry.coordinates[0]];
            that.heat.addLatLng(coord);
        })
    }
});

L.vtGeojsonHeat = function (map, options) {
    return new L.VtGeojsonHeat(map, options);
}