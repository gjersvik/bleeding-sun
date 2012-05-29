YUI.add('spacemmo-shapes', function (Y) {
    'use strict';
    var ns = Y.namespace('spacemmo'),
        lang = Y.Lang,
        pointbase = null,
        rectbase = null,
        circlebase = null,
        anglebase = null;

    pointbase = {
        move: function (x, y) {
            if (lang.isObject(x)) {
                y = x.getY();
                x = x.getX();
            }
            this.setX(x);
            this.setY(y);
        },
        add: function (x, y) {
            if (lang.isObject(x)) {
                y = x.getY();
                x = x.getX();
            }
            this.setX(this.getX() + x);
            this.setY(this.getY() + y);
        },
        toObject: function () {
            return {
                x: this.getX(),
                y: this.getY()
            };
        },
        toString: function() {
            var s = 'Point(x=';
            s += this.getX();
            s += ' ,y=';
            s += this.getY();
            s += ' )';
            return s;
        }
    };

    ns.makePoint = function (x, y) {
        var that = {};

        that.getX = function () {
            return x;
        };

        that.setX = function (newx) {
            x = newx;
        };

        that.getY = function () {
            return y;
        };
        that.setY = function (newy) {
            y = newy;
        };

        Y.aggregate(that, pointbase);

        that.move(x, y);

        return that;
    };

    rectbase = {
        resize: function (height, width) {
            if (lang.isObject(height)) {
                width = height.getWidth();
                height = height.getHeight();
            }
            this.setHeight(height);
            this.setWidth(width);
        },
        toObject: function () {
            var point = Object.getPrototypeOf(this).toObject();
            point.height = this.getHeight();
            point.width = this.getWidth();
            return point;
        },
        toString: function() {
            var s = 'Rect(x=';
            s += this.getX();
            s += ' ,y=';
            s += this.getY();
            s += ' ,height=';
            s += this.getHeight();
            s += ' ,width=';
            s += this.getWidth();
            s += ' )';
            return s;
        }
    };

    ns.makeRect = function (x, y, height, width) {
        var that = Y.Object(ns.makePoint(x, y));

        that.getHeight = function () {
            return height;
        };
        that.setHeight = function (h) {
            height = h;
        };

        that.getWidth = function () {
            return width;
        };
        that.setWidth = function (w) {
            width = w;
        };

        Y.aggregate(that, rectbase, true);

        return that;
    };

    circlebase = {
        toObject: function () {
            var point = Object.getPrototypeOf(this).toObject();
            point.radius = this.getRadius();
            return point;
        }
    };

    ns.makeCircle = function (x, y, radius) {
        var that = Y.Object(ns.makePoint(x, y));

        that.getRadius = function () {
            return radius;
        };
        that.setSRadius = function (r) {
            radius = r;
        };

        Y.aggregate(that, circlebase, true);

        return that;
    };

    function angleNormalize(angle) {
        var pi = Math.PI,
            pi2 = pi * 2;
        while (angle < pi * -1) {
            angle += pi2;
        }
        while (angle > pi) {
            angle -= pi2;
        }
        return angle;
    }

    anglebase =  {
        add: function (angle) {
            if (lang.isObject(angle)) {
                angle = angle.getRadian();
            }
            this.setRadian(this.getRadian() + angle);
        },
        sub: function (angle) {
            if (lang.isObject(angle)) {
                angle = angle.getRadian();
            }
            this.setRadian(this.getRadian() - angle);
        },
        turnToward: function (angle, rate) {
            var delta = 0;
            if (!lang.isObject(angle)) {
                angle = ns.makeAngle(angle);
            }

            delta = ns.makeAngle(angle.getRadian() - this.getRadian());
            if (delta.getRadian() > rate) {
                delta.setRadian(rate);
            } else if (delta.getRadian() < rate * -1) {
                delta.setRadian(rate * -1);
            }
            this.add(delta);
        },
        turnTowardPoint: function (point, rate, skrew) {
            skrew = skrew || 0;
            return this.turnToward(Math.atan2(point.getY(), point.getX()) + skrew, rate);
        },
        toPoint: function (dist) {
            var x = Math.cos(this.getRadian()) * dist,
                y = Math.sin(this.getRadian()) * dist;
            return ns.makePoint(x, y);
        }
    };

    ns.makeAngle = function (angle) {
        var that = {};

        that.setRadian = function (r) {
            var pi = Math.PI,
                pi2 = pi * 2;
            while (r < pi * -1) {
                r += pi2;
            }
            while (r > pi) {
                r -= pi2;
            }
            angle = r;
        };
        that.getRadian = function () {
            return angle;
        };

        Y.aggregate(that, anglebase, true);

        that.setRadian(angle);

        return that;
    };

}, '0.1', {
    requires: ['oop']
});

