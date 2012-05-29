YUI.add('spacemmo-view', function (Y) {
    'use strict';
    var ns = Y.namespace('spacemmo');

    ns.makeView = function () {
        var that = {};

        // that.scenerect = Scene.getRect() Size object;
        // that.viewrect = View Rect object;

        that.render = function(p){
            p.save();
            this.paint(p);
            p.restore();
        };
        return that;
    }; 

}, '0.1', {
    requires: ['spacemmo-shapes']
});