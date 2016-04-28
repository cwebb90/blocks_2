module Engine {
    export class MenuScene extends Scene {
        private button: PIXI.Sprite;

        private textureButton: PIXI.Texture;
        private textureButtonDown: PIXI.Texture;
        private textureButtonOver: PIXI.Texture;

        private isdown: boolean = false; //these should belong to the button but ehh.
        private isOver: boolean = false;

        constructor() {
            super();
            //this.setBackgroundColor(0xffffff);            
            
            this.textureButton = PIXI.Texture.fromImage("img/button.png");
            this.textureButtonDown = PIXI.Texture.fromImage("img/buttonDown.png");
            this.textureButtonOver = PIXI.Texture.fromImage("img/buttonOver.png");

            this.button = new PIXI.Sprite(this.textureButton);
            this.button.scale.x = ScenesManager.defaultWidth / 400; //?
            this.button.scale.y = this.button.scale.x;

            this.button.anchor.x = 0.5;
            this.button.anchor.y = 0.5;

            this.button.position.x = ScenesManager.defaultWidth / 2;
            this.button.position.y = ScenesManager.defaultHeight / 2;

            this.button.interactive = true;

            this._registerEvents();

            this.addChild(this.button);            
        }

        //so unfortunately we cant make the methods below and call them here because javascript and its scope
        //it loses all memory of what "this" is and cant make any calls to the button as it all ends up being undefined.
        //there may be a cleaner nicer way around this but i don't know it --- YET........?
        private _registerEvents() {
            var that = this;
            this.button
                .on('mousedown', function () {
                    if (that.isPaused()) return;
                    that.isdown = true;
                    that.button.texture = that.textureButtonDown;
                    that.button.alpha = 1;
                }).on('mouseup', function () {
                    if (that.isPaused()) return;
                    that.isdown = false;
                    if (that.isOver) {
                        that.button.texture = that.textureButtonOver;
                    }
                    else {
                        that.button.texture = that.textureButton;
                    }
                }).on('mouseover', function () {
                    if (that.isPaused()) return;
                    that.isOver = true;
                    if (that.isdown) return;
                    that.button.texture = that.textureButtonOver;
                }).on('mouseout', function () {
                    if (that.isPaused()) return;
                    that.isOver = false;
                    if (that.isdown) return;
                    that.button.texture = that.textureButton;
                }).on('click', function () {
                    if (that.isPaused()) return;
                    ScenesManager.goToScene('game');
                });
        }

        public OnButtonDown() {
            var that = this;
            if (that.isPaused) return;

            console.log(that.button);

            that.isdown = true;
            that.button.texture = that.textureButtonDown;
            that.button.alpha = 1;
        }

        public OnButtonUp() {
            if (this.isPaused) return;

            this.isdown = false;

            if (this.isOver) {
                this.button.texture = this.textureButtonOver;
            }
            else {
                this.button.texture = this.textureButton;
            }           
        }

        public OnButtonOver() {
            if (this.isPaused) return;

            this.isOver = true;

            if (this.isdown) return;

            this.button.texture = this.textureButtonOver;

        }

        public OnButtonOut() {
            if (this.isPaused) return;

            this.isOver = false;
            if (this.isdown) return;

            this.button.texture = this.textureButton;
            
        }

        public OnButtonClick() {
            if (this.isPaused) return;
            //ScenesManager.goToScene('game');
        }
    }
}

//function (data) {
//    if (that.isPaused) return;
//    that.isdown = true;
//    that.button.texture = that.textureButtonDown;
//    that.button.alpha = 1;
//}