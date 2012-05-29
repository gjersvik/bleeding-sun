YUI.add('spacemmo-viewport', function (Y) {
    'use strict';
    var ns = Y.namespace('spacemmo');

    ns.makeViewport = function () {
        var rect = ns.makeRect(0, 0, 0, 0),
            that = Y.Object(rect),
            canvas = Y.Node.create('<canvas></canvas>'),
            paint = canvas.getDOMNode().getContext('2d'),
            scene = null;

        that.getCanvas = function () {
            return canvas;
        };
        
        that.getViewrect = function(){
            return rect;
        }

        that.setScene = function (newscene) {
            scene = newscene;
            scene.setViewrect(rect);
        };

        that.setHeight = function (h) {
            if (h === undefined) {
                h = canvas.get('winHeight');
            }
            Object.getPrototypeOf(this).setHeight(h);
            canvas.set('height', h);
        };

        that.setWidth = function (w) {
            if (w === undefined) {
                w = canvas.get('winWidth');
            }
            Object.getPrototypeOf(this).setWidth(w);
            canvas.set('width', w);
        };

        that.render = function () {
            paint.clearRect(0,0,this.getWidth(),this.getHeight()); // clear canvas 

            paint.save();
            paint.translate(this.getX() * -1, this.getY() * -1);

            scene.render(paint);

            paint.restore();
        };
        
        return that;
    };

}, '0.1', {
    requires: ['node', 'spacemmo-shapes', 'spacemmo-scene']
});