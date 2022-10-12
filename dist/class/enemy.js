var Invader = /** @class */ (function () {
    function Invader(_a) {
        var position = _a.position, velocity = _a.velocity, HP = _a.HP, scale = _a.scale, big = _a.big;
        var _this = this;
        this.velocity = {
            x: velocity.x,
            y: velocity.y
        };
        this.position = {
            x: position.x,
            y: position.y
        };
        this.rotation = 0;
        this.HP = HP;
        this.big = big;
        var image = new Image();
        image.src = "img/invader.png";
        image.onload = function () {
            _this.image = image;
            _this.width = image.width * scale;
            _this.height = image.height * scale;
            _this.position.x;
            _this.position.y;
        };
    }
    Invader.prototype.draw = function () {
        // c.fillStyle = 'red'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        if (this.position.y + this.height >= canvas.height - 60) {
            game.over = true;
            loseCondition();
        }
    };
    Invader.prototype.update = function (_a) {
        var velocity = _a.velocity;
        if (!this.big && this.image) {
            this.draw();
            this.position.x += velocity.x;
            this.position.y += velocity.y;
        }
        else {
            if (this.image) {
                this.draw();
                this.position.x += this.velocity.x;
                this.position.y += this.velocity.y;
            }
            this.velocity.y = 0;
            if (this.position.x + this.width >= canvas.width || this.position.x < 0) {
                this.velocity.x = -this.velocity.x;
                this.velocity.y += 60;
            }
        }
    };
    Invader.prototype.shoot = function (InvaderProjectiles) {
        InvaderProjectiles.push(new InvaderProjectile({
            position: {
                x: this.position.x + this.width / 2,
                y: this.position.y + this.height / 2
            },
            velocity: {
                x: 0,
                y: 4
            },
            width: 3,
            height: 10,
            big: false
        }));
    };
    Invader.prototype.bigshoot = function (InvaderProjectiles) {
        InvaderProjectiles.push(new InvaderProjectile({
            position: {
                x: this.position.x + this.width / 2,
                y: this.position.y + this.height / 2
            },
            velocity: {
                x: 0,
                y: 2
            },
            width: 10,
            height: 17,
            big: true
        }));
    };
    return Invader;
}());
var Monster = /** @class */ (function () {
    function Monster() {
        var _this = this;
        this.velocity = {
            x: 1,
            y: 0
        };
        this.position = {
            x: 0,
            y: 0
        };
        this.rotation = 0;
        this.HP = 100;
        var image = new Image();
        image.src = "img/biginvader_2_redim.png";
        image.onload = function () {
            _this.image = image;
            _this.width = image.width;
            _this.height = image.height;
            _this.position.x;
            _this.position.y;
        };
    }
    Monster.prototype.draw = function () {
        // c.fillStyle = 'red'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        if (this.position.y + this.height >= canvas.height - 30) {
            game.over = true;
            loseCondition();
        }
    };
    Monster.prototype.update = function () {
        if (this.image) {
            this.draw();
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        }
        this.velocity.y = 0;
        if (this.position.x + this.width >= canvas.width || this.position.x < 0) {
            this.velocity.x = -this.velocity.x;
            this.velocity.y += 60;
        }
    };
    Monster.prototype.shoot = function (_a) {
        var side = _a.side;
        InvaderProjectiles.push(new InvaderProjectile({
            position: {
                x: this.position.x + (this.width * side),
                y: this.position.y + this.height / 2
            },
            velocity: {
                x: 0,
                y: 4
            },
            width: 3,
            height: 10,
            big: false
        }));
    };
    Monster.prototype.bigshoot = function (InvaderProjectiles) {
        InvaderProjectiles.push(new InvaderProjectile({
            position: {
                x: this.position.x + this.width / 2,
                y: this.position.y + this.height / 2
            },
            velocity: {
                x: 0,
                y: 2
            },
            width: 10,
            height: 17,
            big: true
        }));
    };
    return Monster;
}());
var Grid = /** @class */ (function () {
    function Grid() {
        this.position = {
            x: 0,
            y: 0
        };
        this.velocity = {
            x: 1.5,
            y: 0
        };
        this.invaders = [];
        var columns = Math.floor(Math.random() * 10 + 5);
        var rows = Math.floor(Math.random() * 5 + 2);
        this.width = columns * 30;
        for (var x = 0; x < columns; x++) {
            for (var y = 0; y < rows; y++) {
                this.invaders.push(new Invader({
                    position: {
                        x: x * 30,
                        y: y * 30
                    },
                    velocity: {
                        x: 0,
                        y: 0
                    },
                    HP: 1,
                    scale: 1,
                    big: false
                }));
            }
        }
    }
    Grid.prototype.update = function () {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.velocity.y = 0;
        if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
            this.velocity.x = -this.velocity.x;
            this.velocity.y += 30;
        }
    };
    return Grid;
}());
var FinalBoss = /** @class */ (function () {
    function FinalBoss() {
        var _this = this;
        this.velocity = {
            x: 1,
            y: 0
        };
        this.position = {
            x: 0,
            y: 0
        };
        this.rotation = 0;
        this.HP = 200 * numPlayers;
        var image = new Image();
        image.src = "img/Big_boss_redim.png";
        image.onload = function () {
            _this.image = image;
            _this.width = image.width;
            _this.height = image.height;
            _this.position.x;
            _this.position.y;
        };
    }
    FinalBoss.prototype.draw = function () {
        // c.fillStyle = 'red'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        if (this.position.y + this.height >= canvas.height - 30) {
            game.over = true;
            loseCondition();
        }
    };
    FinalBoss.prototype.update = function () {
        if (this.image) {
            this.draw();
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        }
        this.velocity.y = 0;
        if (this.position.x + this.width >= canvas.width || this.position.x < 0) {
            this.velocity.x = -this.velocity.x;
        }
    };
    FinalBoss.prototype.shoot = function (_a) {
        var side = _a.side;
        InvaderProjectiles.push(new InvaderProjectile({
            position: {
                x: this.position.x + (this.width * side),
                y: this.position.y + this.height
            },
            velocity: {
                x: 0,
                y: 4
            },
            width: 3,
            height: 10,
            big: false
        }));
    };
    FinalBoss.prototype.bigshoot = function (InvaderProjectiles) {
        InvaderProjectiles.push(new InvaderProjectile({
            position: {
                x: this.position.x + this.width / 2,
                y: this.position.y + this.height / 2
            },
            velocity: {
                x: 0,
                y: 2
            },
            width: 10,
            height: 17,
            big: true
        }));
    };
    return FinalBoss;
}());
