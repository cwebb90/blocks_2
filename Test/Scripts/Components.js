var comp;
(function (comp) {
    var LevelMap = (function () {
        //i dont know how to initialise the array as is ? :S
        function LevelMap() {
            this.level = new Array(); //10x20
            this.inner = new Array();
            for (var i = 0; i < 10; i++) {
                this.inner.push(0);
            }
            for (var i = 0; i < 20; i++) {
                this.level.push(this.inner);
            }
        }
        return LevelMap;
    })();
    comp.LevelMap = LevelMap;
    var Score = (function () {
        function Score(name, score) {
            this.name = name;
            this.score = score;
        }
        ;
        return Score;
    })();
    comp.Score = Score;
    var HighScores = (function () {
        function HighScores() {
            this.ScoreList = new Array();
        }
        return HighScores;
    })();
    comp.HighScores = HighScores;
    var SaveData = (function () {
        function SaveData() {
        }
        return SaveData;
    })();
    comp.SaveData = SaveData;
})(comp || (comp = {}));
//# sourceMappingURL=Components.js.map