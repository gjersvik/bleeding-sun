YUI.add('spacemmo-sprite', function (Y) {
    'use strict';
    var ns = Y.namespace('spacemmo'),
        lang = Y.Lang;
    
    ns.makeSprite = function (x,y,r) {
        var that = Y.Object(ns.makeCircle(x,y,r));
        
        // that.scenerect = Scene.getRect() Size object;
        // that.viewport = View Rect object;

        that.render = function(p){
            p.save();
            p.translate(this.getX(), this.getY());
            this.paint(p);
            p.restore();
        };
        
        return that;
    };
    
    ns.makePlayerSprite = function (x,y,r) {
        var that = Y.Object(ns.makeSprite(x,y,r)),
            input = null,
            viewport = null;
            
        that.getInput = function() {
            return input;
        }
        
        that.setInput = function(i){
            input = i;
        }
        
        that.getViewport = function() {
            return viewport;
        }
        
        that.setViewport = function(v){
            viewport = v;
        }
        
        return that;
    };
       

}, '0.1', {
    requires: ['spacemmo-shapes']
});


