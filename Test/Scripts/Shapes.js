//probably easier to draw each shape ourselves?
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//we could stop drawing the shape once it hits the bottom, get its co ordinates and then redraw it statically
//using single blocks/BaseShapes, then we could just delete them as and when and theres no connection between the shapes themselves and the deletions.
//all we would need is to know the colour and the position.
var Shapes;
(function (Shapes) {
    //i feel like this doesnt need to be a class of its own,
    //i dont think we'll ever have the need to create a baseshape on its own.
    //interfaces? or something?
    var BaseShape = (function () {
        function BaseShape() {
            this.innersize = 40;
            this.startx = 0;
            this.starty = 0;
            this.linesize = 4;
            this.linecolour = 0xffffff;
            //okay so the base shape should be a simple square
            //we can make that using graphic.rect or whatever
            //we possible might have to make that into a sprite later?
            //because i'm not sure how much we can do with a simple graphics object idk.
            //stage one get square on screen. go.
            this.graphics = new PIXI.Graphics();
        }
        BaseShape.prototype.createWithRect = function (startx, starty, color) {
            this.graphics.beginFill(color);
            this.graphics.lineStyle(this.linesize, this.linecolour, 1);
            this.graphics.drawRect(startx, starty, this.innersize, this.innersize);
            this.graphics.endFill();
        };
        BaseShape.prototype.createSprite = function () {
            this.texture = this.graphics.generateTexture(Engine.ScenesManager.renderer);
            this.sprite = new PIXI.Sprite(this.texture);
            this.setAnchorPoint();
            this.getShapeLimits();
            this.sprite.position.x = (Engine.ScenesManager.defaultWidth / 2);
            this.sprite.position.y = -this.innersize;
        };
        //basically we need the anchor point to be in the middle,
        //in actual, the left most part of the shape is in the 4th column
        //we could do with a method that calculates where the anchor point should lay.
        //if there isn't an even number of blocks that make the shape.
        //because i think that is the problem.
        //i dont even know where the anchor point should be...
        BaseShape.prototype.setAnchorPoint = function () {
            //if (this.sprite.width % 2 == 0) {
            //    this.sprite.anchor.x = 0.5;
            //    this.sprite.anchor.y = 0.5;
            //}
            this.sprite.anchor.x = 0.5;
            //at lunch check how the rotations work exactly.
        };
        BaseShape.prototype.createWithLines = function () {
            this.graphics.lineStyle(2, 0x0000FF, 1);
            this.graphics.beginFill(0xFF3300);
            this.graphics.moveTo(0, 0);
            this.graphics.lineTo(0, this.innersize);
            this.graphics.lineTo(this.innersize, this.innersize);
            this.graphics.lineTo(this.innersize, 0);
            this.graphics.endFill();
        };
        BaseShape.prototype.getShapeLimits = function () {
            var boundrect = this.sprite.getBounds();
            this.left_x = boundrect.x;
            this.right_x = boundrect.x + boundrect.width;
            this.upper_y = boundrect.y;
            this.lower_y = boundrect.y + boundrect.height;
        };
        BaseShape.prototype.moveLeft = function () {
            this.sprite.position.x -= 40;
        };
        BaseShape.prototype.moveRight = function () {
            this.sprite.position.x += 40;
        };
        BaseShape.prototype.moveDown = function () {
            this.sprite.position.y += 40;
        };
        BaseShape.prototype.dropShape = function () {
            //needs to drop to bottom.
            //but we dont know what the bottom is yet.
        };
        //we need to push the shape out again if we rotate along the edge of the screen
        BaseShape.prototype.rotateLeft = function () {
            this.sprite.rotation += Math.PI / 2;
        };
        BaseShape.prototype.rotateRight = function () {
            this.sprite.rotation -= Math.PI / 2;
        };
        //need to figure a good way of putting the movement and the collision detection together.
        BaseShape.prototype.canMoveLeft = function (limit) {
            this.getShapeLimits();
            if (this.left_x <= limit)
                return false;
            else
                return true;
        };
        BaseShape.prototype.canMoveRight = function (limit) {
            this.getShapeLimits();
            if (this.right_x >= limit)
                return false;
            else
                return true;
        };
        BaseShape.prototype.canMoveDown = function (limit) {
            this.getShapeLimits();
            if (this.lower_y >= limit)
                return false;
            else {
                this.isactive = false;
                return true;
            }
        };
        BaseShape.prototype.stop = function () {
            //we need to make this method stop drawing the shape and let it become part of the background?
        };
        BaseShape.prototype.getStoppedCoords = function () {
        };
        return BaseShape;
    }());
    Shapes.BaseShape = BaseShape;
    var Shape_I = (function (_super) {
        __extends(Shape_I, _super);
        function Shape_I() {
            _super.call(this);
            this.fillcolor = 0x33ccff;
            for (var i = 0; i < 4; i++) {
                this.createWithRect(this.startx, this.starty, this.fillcolor);
                this.startx += this.innersize;
            }
            this.createSprite();
        }
        return Shape_I;
    }(BaseShape));
    Shapes.Shape_I = Shape_I;
    var Shape_O = (function (_super) {
        __extends(Shape_O, _super);
        function Shape_O() {
            _super.call(this);
            this.fillcolor = 0xe6e600;
            this.createWithRect(this.startx, this.starty, this.fillcolor);
            this.createWithRect(this.startx + this.innersize, this.starty, this.fillcolor);
            this.createWithRect(this.startx, this.starty + this.innersize, this.fillcolor);
            this.createWithRect(this.startx + this.innersize, this.starty + this.innersize, this.fillcolor);
            this.createSprite();
        }
        return Shape_O;
    }(BaseShape));
    Shapes.Shape_O = Shape_O;
    var Shape_T = (function (_super) {
        __extends(Shape_T, _super);
        function Shape_T() {
            _super.call(this);
            this.fillcolor = 0x8c1aff;
            this.createWithRect(this.startx, this.starty, this.fillcolor);
            this.createWithRect(this.startx + this.innersize, this.starty, this.fillcolor);
            this.createWithRect(this.startx + this.innersize * 2, this.starty, this.fillcolor);
            this.createWithRect(this.startx + this.innersize, this.starty - this.innersize, this.fillcolor);
            this.createSprite();
        }
        return Shape_T;
    }(BaseShape));
    Shapes.Shape_T = Shape_T;
    var Shape_L = (function (_super) {
        __extends(Shape_L, _super);
        function Shape_L() {
            _super.call(this);
            this.fillcolor = 0xff9900;
            this.createWithRect(this.startx, this.starty, this.fillcolor);
            this.createWithRect(this.startx - this.innersize, this.starty, this.fillcolor);
            this.createWithRect(this.startx - this.innersize * 2, this.starty, this.fillcolor);
            this.createWithRect(this.starty, this.starty - this.innersize, this.fillcolor);
            this.createSprite();
        }
        return Shape_L;
    }(BaseShape));
    Shapes.Shape_L = Shape_L;
    var Shape_J = (function (_super) {
        __extends(Shape_J, _super);
        function Shape_J() {
            _super.call(this);
            this.fillcolor = 0x0052cc;
            this.createWithRect(this.startx, this.starty, this.fillcolor);
            this.createWithRect(this.startx, this.starty - this.innersize, this.fillcolor);
            this.createWithRect(this.startx + this.innersize, this.starty, this.fillcolor);
            this.createWithRect(this.startx + this.innersize * 2, this.starty, this.fillcolor);
            this.createSprite();
        }
        return Shape_J;
    }(BaseShape));
    Shapes.Shape_J = Shape_J;
    var Shape_S = (function (_super) {
        __extends(Shape_S, _super);
        function Shape_S() {
            _super.call(this);
            this.fillcolor = 0xFF300;
            this.createWithRect(this.startx, this.starty, this.fillcolor);
            this.createWithRect(this.startx - this.innersize, this.starty, this.fillcolor);
            this.createWithRect(this.startx - this.innersize, this.starty + this.innersize, this.fillcolor);
            this.createWithRect(this.startx - this.innersize * 2, this.starty + this.innersize, this.fillcolor);
            this.createSprite();
        }
        return Shape_S;
    }(BaseShape));
    Shapes.Shape_S = Shape_S;
    var Shape_Z = (function (_super) {
        __extends(Shape_Z, _super);
        function Shape_Z() {
            _super.call(this);
            this.fillcolor = 0xe60000;
            this.createWithRect(this.startx, this.starty, this.fillcolor);
            this.createWithRect(this.startx + this.innersize, this.starty, this.fillcolor);
            this.createWithRect(this.startx + this.innersize, this.starty + this.innersize, this.fillcolor);
            this.createWithRect(this.startx + this.innersize * 2, this.starty + this.innersize, this.fillcolor);
            this.createSprite();
        }
        return Shape_Z;
    }(BaseShape));
    Shapes.Shape_Z = Shape_Z;
})(Shapes || (Shapes = {}));
//# sourceMappingURL=Shapes.js.map