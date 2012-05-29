YUI.add('spacemmo-gridview', function (Y) {
    'use strict';
    var ns = Y.namespace('spacemmo');

    ns.GridView = function () {
        var that = Y.Object(ns.makeView()),
            gridSize = 500;
            
        that.paint = function(p){
            var t = this.viewrect.getX(),
                l = this.viewrect.getY(),
                swidth = this.scenerect.getWidth(),
                sheight = this.scenerect.getHeight(),
                line = Math.ceil(t / gridSize) * gridSize,
                to = Math.min(t + this.viewrect.getWidth(), swidth);

            p.strokeStyle = "#666666";
            p.lineWidth = 2;
            p.beginPath();

            if (line < gridSize) {
                line = gridSize;
            }

            while (line < to) {
                p.moveTo(line, 0);
                p.lineTo(line, sheight);
                line += gridSize;
            }

            line = Math.ceil(l / gridSize) * gridSize;
            to = Math.min(l + this.viewrect.getHeight(), sheight);

            if (line < gridSize) {
                line = gridSize;
            }

            while (line < to) {
                p.moveTo(0, line);
                p.lineTo(swidth, line);
                line += gridSize;
            }
            p.stroke();

            p.lineWidth = 10;
            p.strokeStyle = "#FF0000";
            p.beginPath();
            p.rect(0, 0, swidth, sheight);
            p.stroke();

            p.strokeStyle = "#FFCC00";
            p.beginPath();
            p.rect(gridSize * 3, gridSize * 3, swidth - gridSize * 6, sheight - gridSize * 6);
            p.stroke();

            p.strokeStyle = "#00FF00";
            p.beginPath();
            p.rect(gridSize * 6, gridSize * 6, swidth - gridSize * 12, sheight - gridSize * 12);
            p.stroke();
        }
        
        return that;
    };

}, '0.1', {
    requires: ['spacemmo-view']
});