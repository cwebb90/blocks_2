///<reference path="Scene.ts" />
///<reference path="components.ts" />
///<reference path="Scripts/typings/pixi.js/pixi.js.d.ts" />
//game logic goes here.
module Engine {
    export class GameScene extends Scene {
        private game: Logic.Level;

        public testlines: PIXI.Graphics[] = new Array<PIXI.Graphics>(); 

        constructor() {
            super();                               

            this.game = new Logic.Level();

            //this.game.mapLevel(this.game.levelmap);
            //this.addChild(this.game.testshape);

            this.game.start();
            this.addChild(this.game.currentShape.sprite);

            this.game.mapLevel(this.game.levelmap);

            var that = this;
            //var button = new PIXI.Sprite(PIXI.Texture.fromImage("img/MenuButton.png"));
            //button.position.x = ScenesManager.defaultWidth - 200;
            //button.scale.x = 0.5;
            //button.scale.y = 0.5;
            //button.on("click", function () {
            //    if (that.isPaused()) return;
            //    //ScenesManager.goToScene('menu');
            //    console.log(Math.floor(Math.random() * 7));
            //});

            //button.interactive = true;
            //this.addChild(button);
            //this.interactive = true;
            this.registerEvents();


            //testing so we can get the column situation right
            var x = 0;
            var y1 = 0;
            var y2 = ScenesManager.defaultHeight;
            for (var i = 0; i < 10; i++) {                
                var line = new PIXI.Graphics();
                line.lineStyle(1, 0xFFFFFF, 1);
                line.moveTo(x, y1);
                line.lineTo(x, y2);
                this.addChild(line);
                x += 40;
            }
        }
        
        public registerEvents() {
            var that = this;
            document.onkeypress = function (e) {
                if (e.keyCode == 97) {
                    that.game.moveLeft();
                }
                else if (e.keyCode == 100) {
                    that.game.moveRight();
                }
                else if (e.keyCode == 115) {
                    that.game.moveDown();
                }
                else if (e.keyCode == 113) {
                    that.game.currentShape.rotateLeft();
                }
                else if (e.keyCode == 101) {
                    that.game.currentShape.rotateRight();
                }
                else if (e.keyCode == 32) {
                    that.game.currentShape.dropShape();//does nothing yet
                }
            };
        }

        public update() {
            super.update();            
        }
    }
}