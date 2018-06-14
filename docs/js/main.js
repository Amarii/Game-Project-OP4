"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObject = (function () {
    function GameObject(x, y) {
        this.x = x;
        this.y = y;
    }
    GameObject.prototype.draw = function () {
    };
    GameObject.prototype.update = function () {
    };
    return GameObject;
}());
var bullet = (function (_super) {
    __extends(bullet, _super);
    function bullet(x, y, speed) {
        var _this = _super.call(this, x, y) || this;
        _this.x = x;
        _this.y = y;
        _this.speed = speed;
        _this.div = document.createElement("bullet");
        document.body.appendChild(_this.div);
        return _this;
    }
    bullet.prototype.draw = function () {
    };
    bullet.prototype.kill = function () {
        this.div.remove();
    };
    bullet.prototype.update = function () {
        this.x = this.x + this.speed;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    bullet.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    return bullet;
}(GameObject));
var cEnemy = (function (_super) {
    __extends(cEnemy, _super);
    function cEnemy() {
        var _this = _super.call(this, 0, 0) || this;
        _this.enemyDiv = document.createElement("enemy");
        document.body.appendChild(_this.enemyDiv);
        _this.x = window.innerWidth;
        _this.y = Math.random() * (window.innerHeight - 150) + 60;
        _this.speedX = -3 - (Math.random() * 6);
        _this.speedY = Math.random() * 6 - 3;
        return _this;
    }
    cEnemy.prototype.getRectangle = function () {
        return this.enemyDiv.getBoundingClientRect();
    };
    cEnemy.prototype.kill = function () {
        this.enemyDiv.remove();
    };
    cEnemy.prototype.hitWall = function () {
        this.speedX *= -1;
    };
    cEnemy.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y + this.getRectangle().height > (window.innerHeight - 60) || this.y < 40) {
            this.speedY *= -1;
        }
        if (this.x > window.innerWidth) {
            this.speedX *= -1;
        }
        this.enemyDiv.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return cEnemy;
}(GameObject));
var PlayScreen = (function () {
    function PlayScreen(g) {
        var _this = this;
        this.enemy = [];
        this.bullet = [];
        this.spaceKey = 0;
        this.timer = 0;
        this.game = g;
        this.player = new cPlayer(1);
        this.finalScore = this.game.highscore;
        this.health = new health;
        this.score = new cScore;
        this.spaceKey = 32;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        this.score.score = 0;
        for (var i = 0; i < 20; i++) {
            this.enemy.push(new cEnemy());
        }
    }
    PlayScreen.prototype.update = function () {
        if (this.enemy.length < 4) {
            console.log(123);
        }
        this.timer++;
        if (this.timer == 60) {
            this.enemy.push(new cEnemy());
            this.timer = 0;
        }
        for (var _i = 0, _a = this.bullet; _i < _a.length; _i++) {
            var b = _a[_i];
            if (b.x > 1980) {
                this.bullet.splice(0, 1);
                if (this.bullet.length > 0) {
                    this.bullet[0].kill();
                }
            }
            for (var i = 0; i < this.enemy.length; i++) {
                if (this.checkCollision(b.getRectangle(), this.enemy[i].getRectangle())) {
                    this.enemy[i].kill();
                    this.enemy.splice(this.enemy.length, 1);
                }
            }
            b.update();
        }
        for (var _b = 0, _c = this.enemy; _b < _c.length; _b++) {
            var p = _c[_b];
            if (this.checkCollision(p.getRectangle(), this.player.getRectangle())) {
                this.health.health = this.health.health - 10;
                this.health.div.style.width = this.health.health + "px";
                this.player.hitPuppy();
                if (this.health.health == 0) {
                    this.finalScore.push(this.score.score);
                    console.log("highscore" + this.finalScore);
                    this.game.showGameoverScreen(this.score.score, this.finalScore);
                }
            }
            if (this.checkCollision(p.getRectangle(), this.player.getRectangle())) {
            }
            if (p.getRectangle().left < 0) {
                p.hitWall();
            }
            p.update();
        }
        this.player.update();
        this.score.update();
    };
    PlayScreen.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    PlayScreen.prototype.onKeyDown = function (e) {
        switch (e.keyCode) {
            case this.spaceKey:
                this.bullet.push(new bullet(this.player.x + 55, this.player.y + 39, 10));
                break;
        }
    };
    return PlayScreen;
}());
var Game = (function () {
    function Game() {
        this.highscore = [];
        for (var i = 0; i < 5; i++) {
            if (window.localStorage) {
                this.test = localStorage.getItem("" + i);
                this.parsedtest = JSON.parse(this.test);
            }
            this.highscore.push(this.parsedtest);
        }
        this.currentscreen = new StartScreen(this);
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.currentscreen.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.showPlayScreen = function () {
        document.body.innerHTML = "";
        this.currentscreen = new PlayScreen(this);
    };
    Game.prototype.showGameoverScreen = function (score, highscore) {
        this.score = score;
        this.highscore = highscore;
        document.body.innerHTML = "";
        this.currentscreen = new GameOver(this, score, highscore);
    };
    Game.prototype.showStartScreen = function () {
        document.body.innerHTML = "";
        this.currentscreen = new StartScreen(this);
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var GameOver = (function () {
    function GameOver(g, score, highscore) {
        var _this = this;
        this.game = g;
        for (var i = 0; i < highscore.length; i++) {
            localStorage.setItem(JSON.stringify(i), JSON.stringify(highscore[i]));
        }
        this.div = document.createElement("splash");
        document.body.appendChild(this.div);
        this.div.addEventListener("click", function () { return _this.splashClicked(); });
        this.div.innerHTML = "GAME OVER YOUR SCORE: " + score + "<br>" + " TRY AGAIN?";
        highscore.sort(function (a, b) { return b - a; });
        this.highscore = document.createElement("ul");
        document.body.appendChild(this.highscore);
        this.highscore.innerHTML = "HighScore: ";
        for (var i = 0; i < 5; i++) {
            this.highscore = document.createElement("ul");
            document.body.appendChild(this.highscore);
            this.highscore.innerHTML = (i + 1) + ": " + highscore[i];
        }
    }
    GameOver.prototype.update = function () {
    };
    GameOver.prototype.splashClicked = function () {
        this.game.showPlayScreen();
    };
    return GameOver;
}());
var health = (function () {
    function health() {
        this.health = 300;
        this.div = document.createElement('health');
        document.body.appendChild(this.div);
        this.div.innerHTML = "HP";
    }
    return health;
}());
var cPlayer = (function (_super) {
    __extends(cPlayer, _super);
    function cPlayer(xp) {
        var _this = _super.call(this, 0, 0) || this;
        _this.downSpeed = 0;
        _this.upSpeed = 0;
        _this.leftSpeed = 0;
        _this.rightSpeed = 0;
        _this.aKey = 0;
        _this.dKey = 0;
        _this.sKey = 0;
        _this.wKey = 0;
        _this.div = document.createElement("player");
        document.body.appendChild(_this.div);
        _this.upkey = 87;
        _this.downkey = 83;
        _this.leftkey = 65;
        _this.rightkey = 68;
        _this.wKey = 38;
        _this.sKey = 40;
        _this.aKey = 37;
        _this.dKey = 39;
        _this.x = xp;
        _this.y = 200;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        return _this;
    }
    cPlayer.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    cPlayer.prototype.hitPuppy = function () {
    };
    cPlayer.prototype.onKeyDown = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 10;
                break;
            case this.downkey:
                this.downSpeed = 10;
                break;
            case this.leftkey:
                this.leftSpeed = 10;
                break;
            case this.rightkey:
                this.rightSpeed = 10;
                break;
            case this.wKey:
                this.upSpeed = 10;
                break;
            case this.sKey:
                this.downSpeed = 10;
                break;
            case this.aKey:
                this.leftSpeed = 10;
                break;
            case this.dKey:
                this.rightSpeed = 10;
        }
    };
    cPlayer.prototype.onKeyUp = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 0;
                break;
            case this.downkey:
                this.downSpeed = 0;
                break;
            case this.leftkey:
                this.leftSpeed = 0;
                break;
            case this.rightkey:
                this.rightSpeed = 0;
                break;
            case this.wKey:
                this.upSpeed = 0;
                break;
            case this.sKey:
                this.downSpeed = 0;
                break;
            case this.aKey:
                this.leftSpeed = 0;
                break;
            case this.dKey:
                this.rightSpeed = 0;
                break;
        }
    };
    cPlayer.prototype.update = function () {
        var newY = this.y - this.upSpeed + this.downSpeed;
        var newX = this.x - this.leftSpeed + this.rightSpeed;
        if (newY > -10 && newY + 100 < window.innerHeight)
            this.y = newY;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
        if (newX > 0 && newX + 100 < window.innerWidth)
            this.x = newX;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return cPlayer;
}(GameObject));
var cScore = (function () {
    function cScore() {
        this.div = document.createElement('score');
        document.body.appendChild(this.div);
    }
    cScore.prototype.update = function () {
        this.score++;
        this.div.innerHTML = "Score: " + this.score;
        document.cookie = "score=" + this.score;
        if (this.score < 0) {
            this.score = 0;
        }
    };
    cScore.prototype.showScore = function () {
    };
    return cScore;
}());
var StartScreen = (function () {
    function StartScreen(g) {
        var _this = this;
        this.game = g;
        this.div = document.createElement("splash");
        document.body.appendChild(this.div);
        this.div.addEventListener("click", function () { return _this.splashClicked(); });
        this.div.innerHTML = "START THE GAME";
    }
    StartScreen.prototype.update = function () {
    };
    StartScreen.prototype.splashClicked = function () {
        this.game.showPlayScreen();
    };
    return StartScreen;
}());
//# sourceMappingURL=main.js.map