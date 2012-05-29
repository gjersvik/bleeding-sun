YUI.add('spacemmo-input', function (Y) {
    'use strict';

    var ns = Y.namespace('spacemmo');
    ns.Input = function (gamenode) {
        var accel = false,
            breaks = false,
            left = false,
            right = false,
            keybord = true,
            mx = 0,
            my = 0;
            
        function keyHandler(e, down) {
            var key = e.keyCode;
            keybord = true;
            if (key === 38 || key === 87) {
                accel = down;
                e.preventDefault();
            } else if (key === 40 || key === 83) {
                breaks = down;
                e.preventDefault();
            } else if (key === 37 || key === 65) {
                left = down;
                e.preventDefault();
            } else if (key === 39 || key === 68) {
                right = down;
                e.preventDefault();
            }
        }
        
        gamenode.on('keydown', function (e){
            keyHandler(e,1);
        });
        gamenode.on('keyup', function (e){
            keyHandler(e,0);
        });
        gamenode.on('mousedown', function (e) {
            keybord = false;
            if (e.button === 3) {
                accel = 1;
                e.preventDefault();
            }
        });

        gamenode.on('mouseup', function (e) {
            if (keybord === false && e.button === 3){
                accel = 0;
                e.preventDefault();
            }
        });

        gamenode.on('mousemove', function (e) {
            mx = e.pageX;
            my = e.pageY;
        });

        gamenode.on('contextmenu', function (e) {
            e.preventDefault();
        });

        return {
            keybordActive: function () {
                return keybord;
            },
            accelActive: function () {
                return accel;
            },
            breakActive: function () {
                return breaks;
            },
            leftActive: function () {
                return left;
            },
            rightActive: function () {
                return right;
            },
            getMouseX: function () {
                return mx;
            },
            getMouseY: function () {
                return my;
            }
        };
    };

}, '0.1', {
    requires: ['node', 'event']
});

