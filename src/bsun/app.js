YUI.add('spacemmo-app', function (Y) {
    'use strict';

    var ns = Y.namespace('spacemmo');
    ns.App = function () {
        var input = Y.spacemmo.Input(Y),
            game = Y.spacemmo.Game(),
            gametimer = Y.spacemmo.Gametimer();

        gametimer.on('tick', game.tick);
        gametimer.on('render', game.render);

        game.getShip().setInput(input);

        return {
            start: function () {
                game.updateViewport();
                gametimer.start();
            },
            getGamenode: function () {
                return game.getGamenode();
            }
        };
    };

    ns.bootstrap = function () {
        var app = new ns.App();
        Y.on('load', function () {
            Y.one('#loader_2').setStyle('display','none');
            Y.one('#loader_3').setStyle('display','block');
            Y.one('#loader').replace(app.getGamenode()).destroy();
            app.start();
        });
    };
}, '0.1', {
    requires: ['node',
               'event',
               'spacemmo-input',
               'spacemmo-game',
               'spacemmo-gametimer']
});