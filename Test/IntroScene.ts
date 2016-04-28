///<reference path="Scene.ts" />

module Engine {
    export class IntroScene extends Scene {
        private logo: PIXI.Sprite;

        constructor() {
            super();
            //this.setBackgroundColor(0xffffff); //this doesnt belong to  PIXI.Container anymore but the renderer... i'll fix it later
            this.logo = PIXI.Sprite.fromImage("img/logo.png");
            this.addChild(this.logo);            

            this.logo.scale.x = ScenesManager.defaultWidth / 250;
            this.logo.scale.y = this.logo.scale.x;
            this.logo.anchor.x = 0.5;
            this.logo.anchor.y = 0.5;
            this.logo.alpha = 0;

            //move to center
            this.logo.position.x = ScenesManager.defaultWidth / 2;
            this.logo.position.y = ScenesManager.defaultHeight / 2;
        }

        public update() {
            super.update();
            if (this.logo.alpha < 1) {
                this.logo.alpha += 0.01; //holy shit this is cool
            } else {
                ScenesManager.goToScene('menu');
            }
        }        
    }
}