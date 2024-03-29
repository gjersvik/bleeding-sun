YUI.add('bsun-game', function (Y) {
    'use strict';

    var ns = Y.namespace('bsun');
    ns.Game = function () {
        var that = {},
            gamenode = Y.Node.create('<div id="game"></div>'),
            viewport = Y.bsun.makeViewport(),
            scene = Y.bsun.makeScene(10000, 10000),
            ship = Y.bsun.Ship(),
            gridview = Y.bsun.GridView();

        Y.augment(that, Y.EventTarget);
        
        viewport.setScene(scene);

        scene.addView(gridview, 'background');
        scene.addView(ship, 'ship');

        gamenode.prepend(viewport.getCanvas());

        that.getGamenode = function () {
            return gamenode;
        };
        
        that.getShip = function (){
            return ship;
        }
        
        that.tick = function () {
            ship.tick();

            if (ship.getX() < 0) {
                that.fire('endgame');
            }
            if (ship.getX() > scene.getRect().getWidth()) {
                that.fire('endgame');
            }
            if (ship.getY() < 0) {
                that.fire('endgame');
            }
            if (ship.getY() > scene.getRect().getHeight()) {
                that.fire('endgame');
            }
            
            viewport.setX(ship.getX() - viewport.getWidth() / 2);
            viewport.setY(ship.getY() - viewport.getHeight() / 2);
        };

        that.render = function () {
            viewport.render();
        };

        that.updateViewport = function () {
            viewport.resize();
        };

        return that;
    };
}, '0.1', {
    requires: ['node',
               'event',
               'bsun-ship',
               'bsun-viewport',
               'bsun-gridview']
});