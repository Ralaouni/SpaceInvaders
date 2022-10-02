var Invader = /** @class */ (function () {
    function Invader(_a) {
        var position = _a.position;
        var _this = this;
        this.velocity = {
            x: 0,
            y: 0
        };
        this.rotation = 0;
        var image = new Image();
        image.src = "img/invader.png";
        image.onload = function () {
            var scale = 1;
            _this.image = image;
            _this.width = image.width * scale;
            _this.height = image.height * scale;
            _this.position = {
                x: position.x,
                y: position.y
            };
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
        if (this.image) {
            this.draw();
            this.position.x += velocity.x;
            this.position.y += velocity.y;
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
    return Invader;
}());
var BigInvader = /** @class */ (function () {
    function BigInvader() {
        var _this = this;
        this.velocity = {
            x: 2,
            y: 0
        };
        this.position = {
            x: 0,
            y: 0
        };
        this.rotation = 0;
        this.HP = 20;
        var image = new Image();
        image.src = "img/bigInvader.png";
        image.onload = function () {
            var scale = 3;
            _this.image = image;
            _this.width = image.width * scale;
            _this.height = image.height * scale;
            _this.position.x;
            _this.position.y;
        };
    }
    BigInvader.prototype.draw = function () {
        // c.fillStyle = 'red'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        if (this.position.y + this.height >= canvas.height - 30) {
            game.over = true;
            loseCondition();
        }
    };
    BigInvader.prototype.update = function () {
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
    BigInvader.prototype.shoot = function (InvaderProjectiles) {
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
    return BigInvader;
}());
var Grid = /** @class */ (function () {
    function Grid() {
        this.position = {
            x: 0,
            y: 0
        };
        this.velocity = {
            x: 2,
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
                    }
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
