YUI.add('spacemmo-ship', function (Y) {
    'use strict';
    var ns = Y.namespace('spacemmo'),
        shipcanvas = Y.Node.create('<canvas height="50" width="60"></canvas>').getDOMNode(),
        egninecanvas = Y.Node.create('<canvas height="30" width="20"></canvas>').getDOMNode();

    function prepaint (){
        var p = egninecanvas.getContext('2d'),
            grad = p.createLinearGradient(0,0,10,0);
            grad.addColorStop(0,'rgba(255,255,0,0)');
            grad.addColorStop(1,'rgba(255,255,0,1)');
        p.fillStyle = grad;
        p.beginPath();
        p.moveTo(0, 0);
        p.lineTo(20, 15);
        p.lineTo(0, 30);
        p.fill();
        
        p = shipcanvas.getContext('2d');
        p.fillStyle = "#FFFFFF";
        p.arc(25, 25, 25,Math.PI+Math.PI/12,Math.PI-Math.PI/12,false);
        p.lineTo(10,25);
        p.rect(45,20,15,10);
        p.fill();
        
    }
    prepaint();
    
    
    ns.Ship = function () {
        var that = Y.Object(ns.makePlayerSprite(5000,5000,25)),
            speed = ns.makePoint(0,0),
            turn = 0.05,
            accel = 0.2,
            angle = ns.makeAngle(Math.PI / -2);

        that.getAngle = function (){
            return angle;
        };
        that.setAccel = function (a) {
            accel = a;
        };
        that.setRotateSpeed = function (speed) {
            turn = speed;
        };
        that.tick = function () {
            var input = this.getInput();
            
            if (input.keybordActive()) {
                if (input.breakActive()) {
                    angle.turnTowardPoint(speed, turn, Math.PI);
                } else {
                    angle.sub(turn * input.leftActive());
                    angle.add(turn * input.rightActive());
                }
            } else {
                //angle += angleContain(Math.atan2(input.getMouseY(), input.getMouseX()) - angle, turn);
            }

            speed.add(angle.toPoint(accel * input.accelActive()));
            this.add(speed);
        };
        that.paint = function (p) {
            p.rotate(angle.getRadian());

            if (this.getInput().accelActive() > 0) {
                p.drawImage(egninecanvas,-35,-15);
            }
            p.drawImage(shipcanvas,-25,-25);
        };

        return that;
    };

}, '0.1', {
    requires: ['spacemmo-input','spacemmo-sprite']
});