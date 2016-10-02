L.VtGeojsonHeat = L.GridLayer.extend({

    initialize: function (map, options) {
        this.initFeatureCollection();
        this._heat = L.heatLayer([]).addTo(map);
        this._zoom = map.getZoom();
        L.setOptions(this, options);
    },

    createTile: function (coords, done) {
        var tile = [coords.x, coords.y, coords.z]
        this.vt2geojson(tile)
        return L.DomUtil.create("div");
    },

    initFeatureCollection:function(){
        this._featurecollection = {
            type: 'FeatureCollection',
            features: []
        }
    },

    getFeatureCollection:function(){
        return this._featurecollection;
    },

    vt2geojson: function (tile) {
        if(this._zoom !== tile[2]){
            this._zoom = tile[2];
            this.initFeatureCollection();
            this._heat._latlngs= [];
        }
        var that = this;
        var layers = 'poi_label'
        var tiles = "tilejson+http://localhost:8000/tilejson.json"
        vtgeojson(tiles, {
            tiles: [tile],
            layers: layers ? layers.split(',') : undefined
        })
        .on('data', function (data) {
            that._featurecollection.features.push(data)
            var coord = [data.geometry.coordinates[1], data.geometry.coordinates[0]];
            that._heat.addLatLng(coord);
        })
    }
});

L.vtGeojsonHeat = function (map, options) {
    return new L.VtGeojsonHeat(map, options);
}