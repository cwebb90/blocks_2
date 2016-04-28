//this should help for later down the line when we want to switch between different states.
//its not necessary for right now, but would be nice to get a working project going.

//im pretty sure that this is some type of object ive not come across before.
//we only create references to it? its like it exists mainly here and you can just call it by itself
//instead of creating an actual ScenesManagerObject.
//i need to research it more but if it works how i think that it works, its really really cool

///<reference path="Scripts/typings/pixi.js/pixi.js.d.ts" />
///<reference path="Scene.ts"/>
module Engine {
    export class ScenesManager {
        private static scenes: any = {}; //basically this is a key-value indexing guy, so instead of a flat number being the index its a string. i think.
        private static currentScene: Scene;
        public static renderer: PIXI.WebGLRenderer;

        public static defaultWidth: number;
        public static defaultHeight: number;
        public static width: number;
        public static height: number;

        public static create(width: number, height: number) { //initiate pixi.renderer and start game loop
            if (ScenesManager.renderer) return this; //if it already exists then return it.
            this.defaultWidth = ScenesManager.width = width;
            this.defaultHeight = ScenesManager.height = height;
            ScenesManager.renderer = new PIXI.WebGLRenderer(width, height);
            document.body.appendChild(ScenesManager.renderer.view);
            requestAnimationFrame(ScenesManager.renderloop); //start rendering it as soon as its made
            return this;
        }

        public static renderloop() {
            requestAnimationFrame(function () { ScenesManager.renderloop() });

            if (!this.currentScene || this.currentScene.isPaused()) { return; } //check if current scene exists and is not paused, then update it and render it
            this.currentScene.update();
            ScenesManager.renderer.render(this.currentScene);
        }
        
        public static createScene(id: string, TScene: new () => Scene = Scene): Scene { //wtf. takes id and a Scene, this syntax means we only take a class of type scene and its default value is scene. OR we do it the cheap easier looking way.
            if (ScenesManager.scenes[id]) { //will return undefined if it already exists
                return undefined;
            }

            var scene = new TScene();
            ScenesManager.scenes[id] = scene;
            return scene;
        }

        public static goToScene(id: string): boolean {
            if (ScenesManager.scenes[id]) {
                if (ScenesManager.currentScene) { //pauses current scene before switching to another scene
                    ScenesManager.currentScene.pause();
                }
                ScenesManager.currentScene = ScenesManager.scenes[id];
                ScenesManager.currentScene.resume();
                return true;
            }
            return false;
        }

        //my own, might not work but who knows.
        public static changeBackgroundColor(color: number) {
            this.renderer.backgroundColor = color;
        }
    }
}

//methods are static because we should only ever have one scene manager