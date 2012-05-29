YUI.add('spacemmo-scene', function (Y) {
    'use strict';
    var ns = Y.namespace('spacemmo'),
        layersbase = null;

    layersbase = {
        id: function (name) {
            var i = 0,
                l = this.length;
            while (i < l) {
                if (this[i].name === name) {
                    break;
                }
                i += 1;
            }
            if (i === l) {
                return -1;
            } else {
                return i;
            }
        },
        get: function (name, make) {
            var i = this.id(name),
                l;
            if (i !== -1) {
                l = this[i];
            } else if (make) {
                i = this.length;
                this.add(name);
                l = this[i];
            }

            return l;
        },
        add: function (name, after) {
            var layer = [],
                i = this.id(after);

            layer.name = name;

            if (i === -1) {
                this.push(layer);
            } else {
                this.splice(i + 1, 0, layer);
            }
        },
        remove: function (name) {
            var i = this.id(name);

            if (i === -1) {
                return;
            }

            this.splice(i, 1);
        }
    };

    function makeLayers() {
        return Y.aggregate([], layersbase, true);
    }

    ns.makeScene = function (height, width) {
        var that = {},
            layers = makeLayers(),
            rect = ns.makeRect(0, 0, height, width),
            viewrect = null;

        that.getRect = function () {
            return rect;
        };

        that.setViewrect = function (rect) {
            viewrect = rect;
        };

        that.addLayer = Y.bind(layers.add, layers);
        that.removeLayer = Y.bind(layers.remove, layers);

        that.addView = function (view, layer) {
            view.scenerect = rect;
            view.viewrect = viewrect;
            layers.get(layer, true).push(view);
        };
        that.removeView = function (view, layer) {
            var i = null,
                l = layers.get(layer);

            if (!l) {
                return;
            }

            i = l.indexOf(view);

            if (i === -1) {
                return;
            }

            l.splice(i, 1);
        };

        that.render = function (painter) {
            Y.Array.each(layers, function (layer) {
                var i = 0,
                    l = layer.length;

                while (i < l) {
                    painter.save();
                    layer[i].render(painter);
                    painter.restore();
                    i += 1;
                }
            });
        };
        
        return that;
    };

}, '0.1', {
    requires: ['spacemmo-shapes']
});
