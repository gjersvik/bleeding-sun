YUI.add('bsun-gametimer', function (Y) {
    'use strict';

    var ns = Y.namespace('bsun');
    ns.Gametimer = function () {
        var that = {},
            time = 0,
            timeout = null,
            tickframes = 0,
            renderframes = 0,
            fpstick = 0,
            fpsrender = 0;

        Y.augment(that, Y.EventTarget);

        function tick() {
            that.fire('tick');
            tickframes += 1;
            time += 17;
            timeout = setTimeout(tick, time - Date.now());
        }

        function render() {
            that.fire('render');
            renderframes += 1;
        }

        function fps() {
            fpstick = tickframes;
            tickframes = 0;
            fpsrender = renderframes;
            renderframes = 0;
            that.fire('fps');
            console.log('FPS:','tick:',fpstick,'render',fpsrender);
        }

        Y.AnimLoop.on('beforedraw', render);
        setInterval(fps, 1000);

        that.start = function () {
            time = Date.now();
            Y.AnimLoop.start();
            tick();
        };
        that.stop = function () {
            clearTimeout(timeout);
            timeout = null;
            Y.AnimLoop.stop();
        };
        that.isRunning = function () {
            return timeout !== null;
        };
        that.getTickFps = function () {
            return fpstick;
        };
        that.getRenderFps = function () {
            return fpsrender;
        };

        return that;
    };
}, '0.1', {
    requires: ['event', 'gallery-animloop']
});