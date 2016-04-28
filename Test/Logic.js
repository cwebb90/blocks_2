var Logic;
(function (Logic) {
    //i need a structure to house all the logic?
    //engine?
    //need lifecycle - dropping etc.
    //have a problem with anchoring the shape.
    //if we anchor in the middle, collisions get thrown off and the size is wonky
    //if we dont anchor in the middle rotations are weird
    var Level = (function () {
        //we'll only need one shape at a time?
        //if they cease to exist once they hit the bottom
        //we'll need to clearly define where the bottom is..
        //goal: get a random block fall from the top of screen.
        //we'll need to make it fall at a specific rate though..
        //one innersize block per second?
        //we could then increase it to one innersize block every 0.9 then 0.8 and so on?
        function Level() {
            this.speed = 1000;
            this.levelmap = new comp.LevelMap();
            this.seed = 0;
            this.first = true;
            this.lower_xlimit = 0;
            this.upper_xlimit = Engine.ScenesManager.defaultWidth;
            this.lower_ylimit = 0;
            this.upper_ylimit = Engine.ScenesManager.defaultHeight;
            this.timeElapsed = 0;
            this.level = 0;
        }
        Level.prototype.mapLevel = function (lvlmap) {
            var x = 0;
            var y = 0;
            var shape1 = new PIXI.Graphics();
            shape1.lineStyle(1, 0x0000FF, 1);
            shape1.beginFill(0xFF700B, 1);
            for (var i = 0; i < lvlmap.level.length; i++) {
                for (var j = 0; j < lvlmap.level[i].length; j++) {
                    shape1.drawRect(x, y, 40, 40);
                    x += 40;
                }
                y += 40;
            }
        };
        Level.prototype.start = function () {
            this.currentShape = this.create();
            this.currentShape.fall(this.speed);
        };
        Level.prototype.resetShapeFall = function () {
            this.currentShape.stop();
            this.currentShape = this.create();
            this.currentShape.fall(this.speed);
        };
        Level.prototype.load = function () {
        };
        Level.prototype.save = function () {
        };
        Level.prototype.loop = function () {
            this.currentShape.fall(this.speed);
        };
        //i dont think i need to pass in the shape every time, because we only have the current shape object to worry about
        Level.prototype.create = function () {
            this.seed = this.GetRandom();
            if (this.seed == 0) {
                return new Shapes.Shape_I();
            }
            else if (this.seed == 1) {
                return new Shapes.Shape_J();
            }
            else if (this.seed == 2) {
                return new Shapes.Shape_L();
            }
            else if (this.seed == 3) {
                return new Shapes.Shape_O();
            }
            else if (this.seed == 4) {
                return new Shapes.Shape_S();
            }
            else if (this.seed == 5) {
                return new Shapes.Shape_T();
            }
            else if (this.seed == 6) {
                return new Shapes.Shape_Z();
            }
        };
        Level.prototype.canMoveLeft = function () {
            this.currentShape.getShapeLimits();
            if (this.currentShape.left_x <= this.lower_xlimit)
                return false;
            else
                return true;
        };
        Level.prototype.canMoveRight = function () {
            this.currentShape.getShapeLimits();
            if (this.currentShape.right_x >= this.upper_xlimit)
                return false;
            else
                return true;
        };
        Level.prototype.canMoveDown = function () {
            this.currentShape.getShapeLimits();
            if (this.currentShape.lower_y >= this.upper_ylimit)
                return false;
            else
                return true;
        };
        Level.prototype.GetRandom = function () {
            if (this.first) {
                this.seed = Math.floor(Math.random() * 6);
                this.first = false;
                return this.seed;
            }
            else {
                var newval = Math.floor(Math.random() * 6);
                if (newval != this.seed) {
                    this.seed = newval;
                    return this.seed;
                }
                else
                    return this.GetRandom();
            }
        };
        return Level;
    }());
    Logic.Level = Level;
})(Logic || (Logic = {}));
//i'll need a way of mapping whats what on the levelmap
//if a shape is colliding on any particular point, map that on array.
//divide actual position by 10 .floor, map to array.
//loop through array, if any arrays total 10 - delete the array. or at least 
//will need to move everything on top of the line down by one or however many lines deleted
//moving things about will be very difficult, idk even where to begin on that.
//MULTIPLE line deletions will also be a thing. 
//# sourceMappingURL=Logic.js.map