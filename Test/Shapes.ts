//probably easier to draw each shape ourselves?

//we could stop drawing the shape once it hits the bottom, get its co ordinates and then redraw it statically
//using single blocks/BaseShapes, then we could just delete them as and when and theres no connection between the shapes themselves and the deletions.
//all we would need is to know the colour and the position.
module Shapes {
    //i feel like this doesnt need to be a class of its own,
    //i dont think we'll ever have the need to create a baseshape on its own.
    //interfaces? or something?
    export class BaseShape {
        public innersize: number = 40;
        startx: number = 0;
        starty: number = 0;
        linesize: number = 4;
        linecolour: number = 0xffffff;
        left_x: number;
        right_x: number;
        upper_y: number;
        lower_y: number;

        //middle points array? so we have a set of positions for the center of each innercube?
        mid_points: { x: number, y: number }[];

        //okay so the base shape should be a simple square
        //we can make that using graphic.rect or whatever
        //we possible might have to make that into a sprite later?
        //because i'm not sure how much we can do with a simple graphics object idk.
        //stage one get square on screen. go.

        graphics: PIXI.Graphics = new PIXI.Graphics();
        texture: PIXI.Texture;
        sprite: PIXI.Sprite;

        isactive: boolean; //might not need

        constructor() { }

        createWithRect(startx: number, starty: number, color: number) {
            this.graphics.beginFill(color);
            this.graphics.lineStyle(this.linesize, this.linecolour, 1);
            this.graphics.drawRect(startx, starty, this.innersize, this.innersize);
            this.graphics.endFill();
        }

        createSprite() {
            this.texture = this.graphics.generateTexture(Engine.ScenesManager.renderer);
            this.sprite = new PIXI.Sprite(this.texture);
            this.setAnchorPoint();
            this.getShapeLimits();
            this.sprite.position.x = (Engine.ScenesManager.defaultWidth / 2) ;
            this.sprite.position.y = - this.innersize;
        }

        //basically we need the anchor point to be in the middle,
        //in actual, the left most part of the shape is in the 4th column
        //we could do with a method that calculates where the anchor point should lay.
        //if there isn't an even number of blocks that make the shape.
        //because i think that is the problem.
        //i dont even know where the anchor point should be...

        setAnchorPoint() {
            //if (this.sprite.width % 2 == 0) {
            //    this.sprite.anchor.x = 0.5;
            //    this.sprite.anchor.y = 0.5;
            //}
            this.sprite.anchor.x = 0.5;
            //at lunch check how the rotations work exactly.

        }

        createWithLines() {
            this.graphics.lineStyle(2, 0x0000FF, 1);
            this.graphics.beginFill(0xFF3300);
            this.graphics.moveTo(0, 0);
            this.graphics.lineTo(0, this.innersize);
            this.graphics.lineTo(this.innersize, this.innersize);
            this.graphics.lineTo(this.innersize, 0);
            this.graphics.endFill();
        }

        getShapeLimits() {
            var boundrect: PIXI.Rectangle = this.sprite.getBounds();
            this.left_x = boundrect.x;
            this.right_x = boundrect.x + boundrect.width;
            this.upper_y = boundrect.y;
            this.lower_y = boundrect.y + boundrect.height;
        }
        
        moveLeft() {
            this.sprite.position.x -= 40;            
        }

        moveRight() {
            this.sprite.position.x += 40;
        }

        moveDown() {
            this.sprite.position.y += 40;
        }

        dropShape() {
            //needs to drop to bottom.
            //but we dont know what the bottom is yet.
        }

        //we need to push the shape out again if we rotate along the edge of the screen
        rotateLeft() {
            this.sprite.rotation += Math.PI / 2;
        }

        rotateRight() {
            this.sprite.rotation -= Math.PI / 2;
        }

        //need to figure a good way of putting the movement and the collision detection together.
        canMoveLeft(limit: number) {
            this.getShapeLimits();
            if (this.left_x <= limit) return false;
            else return true;
        }

        canMoveRight(limit: number) {
            this.getShapeLimits();
            if (this.right_x >= limit) return false;
            else return true;
        }

        canMoveDown(limit: number) {
            this.getShapeLimits();
            if (this.lower_y >= limit) return false;
            else {
                this.isactive = false;
                return true;
            }
        }

        stop() {
            //we need to make this method stop drawing the shape and let it become part of the background?
        }

        getStoppedCoords() {
            
        }
    }

    export class Shape_I extends BaseShape {
        fillcolor: number = 0x33ccff;
        constructor() {
            super();
            for (var i = 0; i < 4; i++) {
                this.createWithRect(this.startx, this.starty, this.fillcolor);
                this.startx += this.innersize;
            }
            this.createSprite();
        }
    } 

    export class Shape_O extends BaseShape {
        fillcolor: number = 0xe6e600;
        constructor() {
            super();
            this.createWithRect(this.startx, this.starty, this.fillcolor);
            this.createWithRect(this.startx + this.innersize, this.starty, this.fillcolor);
            this.createWithRect(this.startx, this.starty + this.innersize, this.fillcolor);
            this.createWithRect(this.startx + this.innersize, this.starty + this.innersize, this.fillcolor);
            this.createSprite();
        }
    } 

    export class Shape_T extends BaseShape{
        fillcolor: number = 0x8c1aff;
        constructor() {
            super();
            this.createWithRect(this.startx, this.starty, this.fillcolor);
            this.createWithRect(this.startx + this.innersize, this.starty, this.fillcolor);
            this.createWithRect(this.startx + this.innersize * 2, this.starty, this.fillcolor);
            this.createWithRect(this.startx + this.innersize, this.starty - this.innersize, this.fillcolor);
            this.createSprite();
        }
    } 

    export class Shape_L extends BaseShape {
        fillcolor: number = 0xff9900;
        constructor() {
            super();
            this.createWithRect(this.startx, this.starty, this.fillcolor);
            this.createWithRect(this.startx - this.innersize, this.starty, this.fillcolor);
            this.createWithRect(this.startx - this.innersize*2, this.starty, this.fillcolor);
            this.createWithRect(this.starty, this.starty - this.innersize , this.fillcolor);
            this.createSprite();
        }
    } 

    export class Shape_J extends BaseShape {
        fillcolor: number = 0x0052cc;
        constructor() {
            super();
            this.createWithRect(this.startx, this.starty, this.fillcolor);
            this.createWithRect(this.startx, this.starty - this.innersize, this.fillcolor);
            this.createWithRect(this.startx + this.innersize, this.starty, this.fillcolor);
            this.createWithRect(this.startx + this.innersize*2, this.starty, this.fillcolor);
            this.createSprite();
        }
    } 

    export class Shape_S extends BaseShape{
        fillcolor: number = 0xFF300;
        constructor() {
            super();
            this.createWithRect(this.startx, this.starty, this.fillcolor);
            this.createWithRect(this.startx - this.innersize, this.starty, this.fillcolor);
            this.createWithRect(this.startx - this.innersize, this.starty + this.innersize, this.fillcolor);
            this.createWithRect(this.startx - this.innersize * 2, this.starty + this.innersize, this.fillcolor);
            this.createSprite();
        }
    } 

    export class Shape_Z extends BaseShape {
        fillcolor: number = 0xe60000;
        constructor() {
            super();
            this.createWithRect(this.startx, this.starty, this.fillcolor);
            this.createWithRect(this.startx + this.innersize, this.starty, this.fillcolor);
            this.createWithRect(this.startx + this.innersize, this.starty + this.innersize, this.fillcolor);
            this.createWithRect(this.startx + this.innersize * 2, this.starty + this.innersize, this.fillcolor);
            this.createSprite();
        }
    } 
}