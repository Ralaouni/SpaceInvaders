var Projectile = /** @class */ (function () {
    function Projectile(_a) {
        var position = _a.position, velocity = _a.velocity;
        this.position = position;
        this.velocity = velocity;
        this.radius = 3;
    }
    Projectile.prototype.draw = function () {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = 'red';
        c.fill();
        c.closePath();
    };
    Projectile.prototype.update = function () {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    };
    return Projectile;
}());
var Projectile2 = /** @class */ (function () {
    function Projectile2(_a) {
        var position = _a.position, velocity = _a.velocity, radius = _a.radius;
        this.position = position;
        this.velocity = velocity;
        this.radius = radius;
    }
    Projectile2.prototype.draw = function () {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = 'yellow';
        c.fill();
        c.closePath();
    };
    Projectile2.prototype.update = function () {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    };
    return Projectile2;
}());
var InvaderProjectile = /** @class */ (function () {
    function InvaderProjectile(_a) {
        var position = _a.position, velocity = _a.velocity, width = _a.width, height = _a.height, big = _a.big;
        this.position = position;
        this.velocity = velocity;
        this.width = width;
        this.height = height;
        this.big = big;
    }
    InvaderProjectile.prototype.draw = function () {
        c.fillStyle = 'white';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    };
    InvaderProjectile.prototype.update = function () {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    };
    return InvaderProjectile;
}());
