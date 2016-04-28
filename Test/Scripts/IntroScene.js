///<reference path="Scene.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Engine;
(function (Engine) {
    var IntroScene = (function (_super) {
        __extends(IntroScene, _super);
        function IntroScene() {
            _super.call(this);
            //this.setBackgroundColor(0xffffff); //this doesnt belong to  PIXI.Container anymore but the renderer... i'll fix it later
            this.logo = PIXI.Sprite.fromImage("img/logo.png");
            this.addChild(this.logo);
            this.logo.scale.x = Engine.ScenesManager.defaultWidth / 250;
            this.logo.scale.y = this.logo.scale.x;
            this.logo.anchor.x = 0.5;
            this.logo.anchor.y = 0.5;
            this.logo.alpha = 0;
            //move to center
            this.logo.position.x = Engine.ScenesManager.defaultWidth / 2;
            this.logo.position.y = Engine.ScenesManager.defaultHeight / 2;
        }
        IntroScene.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this.logo.alpha < 1) {
                this.logo.alpha += 0.01; //holy shit this is cool
            }
            else {
                Engine.ScenesManager.goToScene('menu');
            }
        };
        return IntroScene;
    })(Engine.Scene);
    Engine.IntroScene = IntroScene;
})(Engine || (Engine = {}));
//# sourceMappingURL=IntroScene.js.map