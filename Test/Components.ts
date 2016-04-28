module comp {
    export class LevelMap {
        level = new Array<Array<number>>(); //10x20
        inner: number[] = new Array<number>();
        //i dont know how to initialise the array as is ? :S

        constructor() {
            for (var i = 0; i < 10; i++) {
                this.inner.push(0);
            }
            for (var i = 0; i < 20; i++) {
                this.level.push(this.inner);
            }
        }
    }

    export class Score {
        constructor(public name: string, public score: number) { };
    }

    export class HighScores {
        ScoreList: Score[] = new Array<Score>();
    }

    export class SaveData {
        //later
        score: number;
        level: number;
        levelmap: LevelMap;
        shapepos: number;
        shaperotation: number;//?
        timeremaining: number;
        //should really know the last position and rota
    }
}