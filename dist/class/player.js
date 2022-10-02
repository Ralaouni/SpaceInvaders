var Player = /** @class */ (function () {
    function Player(imgsrc, wichPlayer, taille, y) {
        var _this = this;
        this.velocity = {
            x: 0,
            y: 0
        };
        this.rotation = 0;
        this.opacity = 1;
        var image = new Image();
        image.src = imgsrc;
        image.onload = function () {
            var scale = taille;
            _this.image = image;
            _this.width = image.width * scale;
            _this.height = image.height * scale;
            _this.position = {
                x: (canvas.width / 5) * wichPlayer - _this.width / wichPlayer,
                y: canvas.height - y
            };
        };
    }
    Player.prototype.draw = function () {
        // c.fillStyle = 'red'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.save();
        c.globalAlpha = this.opacity;
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        c.restore();
    };
    Player.prototype.update = function () {
        if (this.image) {
            this.draw();
            this.position.x += this.velocity.x;
        }
    };
    return Player;
}());
