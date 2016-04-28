//this should help for later down the line when we want to switch between different states.
//its not necessary for right now, but would be nice to get a working project going.
//im pretty sure that this is some type of object ive not come across before.
//we only create references to it? its like it exists mainly here and you can just call it by itself
//instead of creating an actual ScenesManagerObject.
//i need to research it more but if it works how i think that it works, its really really cool
///<reference path="Scripts/typings/pixi.js/pixi.js.d.ts" />
///<reference path="Scene.ts"/>
var Engine;
(function (Engine) {
    var ScenesManager = (function () {
        function ScenesManager() {
        }
        ScenesManager.create = function (width, height) {
            if (ScenesManager.renderer)
                return this; //if it already exists then return it.
            this.defaultWidth = ScenesManager.width = width;
            this.defaultHeight = ScenesManager.height = height;
            ScenesManager.renderer = new PIXI.WebGLRenderer(width, height);
            document.body.appendChild(ScenesManager.renderer.view);
            requestAnimationFrame(ScenesManager.renderloop); //start rendering it as soon as its made
            return this;
        };
        ScenesManager.renderloop = function () {
            requestAnimationFrame(function () { ScenesManager.renderloop(); });
            if (!this.currentScene || this.currentScene.isPaused()) {
                return;
            } //check if current scene exists and is not paused, then update it and render it
            this.currentScene.update();
            ScenesManager.renderer.render(this.currentScene);
        };
        ScenesManager.createScene = function (id, TScene) {
            if (TScene === void 0) { TScene = Engine.Scene; }
            if (ScenesManager.scenes[id]) {
                return undefined;
            }
            var scene = new TScene();
            ScenesManager.scenes[id] = scene;
            return scene;
        };
        ScenesManager.goToScene = function (id) {
            if (ScenesManager.scenes[id]) {
                if (ScenesManager.currentScene) {
                    ScenesManager.currentScene.pause();
                }
                ScenesManager.currentScene = ScenesManager.scenes[id];
                ScenesManager.currentScene.resume();
                return true;
            }
            return false;
        };
        //my own, might not work but who knows.
        ScenesManager.changeBackgroundColor = function (color) {
            this.renderer.backgroundColor = color;
        };
        ScenesManager.scenes = {}; //basically this is a key-value indexing guy, so instead of a flat number being the index its a string. i think.
        return ScenesManager;
    })();
    Engine.ScenesManager = ScenesManager;
})(Engine || (Engine = {}));
//methods are static because we should only ever have one scene manager 
//# sourceMappingURL=SceneManager.js.map