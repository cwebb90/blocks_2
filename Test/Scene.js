/// <reference="Scripts/typings/pixi.js/pixi.js.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//this class is essentially an extended PIXI.container with some extra functionality.
//actually a really good idea.
//any time we make anything using any engine, we should use this tactic.
//just adding our own functionality to the already existing object.
//so good.
var Engine;
(function (Engine) {
    //classes within modules must have export so they can be used elsewhere..
    var Scene = (function (_super) {
        __extends(Scene, _super);
        function Scene() {
            _super.call(this);
            this.paused = false;
            this.updateCB = function () { };
        }
        Scene.prototype.onUpdate = function (updateCB) {
            this.updateCB = updateCB;
        };
        Scene.prototype.update = function () {
            this.updateCB();
        };
        Scene.prototype.pause = function () {
            this.paused = true;
        };
        Scene.prototype.resume = function () {
            this.paused = false;
        };
        Scene.prototype.isPaused = function () {
            return this.paused;
        };
        //my own, might not work but who knows.
        Scene.prototype.changeBackgroundColor = function (render, color) {
            render.backgroundColor = color;
        };
        return Scene;
    })(PIXI.Container);
    Engine.Scene = Scene;
})(Engine || (Engine = {}));
//# sourceMappingURL=Scene.js.map