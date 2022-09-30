var canvas = document.querySelector('canvas');
var scoreEl = document.querySelector('#scoreEl');
var c = canvas.getContext('2d');
canvas.width = 576;
canvas.height = 700;
var Player = /** @class */ (function () {
    function Player() {
        var _this = this;
        this.velocity = {
            x: 0,
            y: 0
        };
        this.rotation = 0;
        this.opacity = 1;
        var image = new Image();
        image.src = "img/vaisseau_fanny_pourri.png";
        image.onload = function () {
            var scale = 0.04;
            _this.image = image;
            _this.width = image.width * scale;
            _this.height = image.height * scale;
            _this.position = {
                x: canvas.width / 2 - _this.width / 2,
                y: canvas.height - 60
            };
        };
    }
    Player.prototype.draw = function () {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
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
var Particule = /** @class */ (function () {
    function Particule(_a) {
        var position = _a.position, velocity = _a.velocity, radius = _a.radius, color = _a.color, fades = _a.fades;
        this.position = position;
        this.velocity = velocity;
        this.radius = radius;
        this.color = color;
        this.opacity = 1;
        this.fades = fades;
    }
    Particule.prototype.draw = function () {
        c.save();
        c.globalAlpha = this.opacity;
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
        c.restore();
    };
    Particule.prototype.update = function () {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if (this.fades) {
            this.opacity -= 0.01;
        }
    };
    return Particule;
}());
var InvaderProjectile = /** @class */ (function () {
    function InvaderProjectile(_a) {
        var position = _a.position, velocity = _a.velocity;
        this.position = position;
        this.velocity = velocity;
        this.width = 3;
        this.height = 10;
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
            }
        }));
    };
    return Invader;
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
var player = new Player();
var projectiles = [];
var grids = [];
var InvaderProjectiles = [];
var particles = [];
var keys = {
    q: {
        pressed: false
    },
    d: {
        pressed: false
    },
    space: {
        pressed: false
    }
};
var frame = 0;
var randomInterval = (Math.floor((Math.random() * 500) + 500));
var game = {
    over: false,
    active: true
};
var score = 0;
for (var i = 0; i < 100; i++) {
    particles.push(new Particule({
        position: {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height
        },
        velocity: {
            x: 0,
            y: 0.2
        },
        radius: Math.random() * 2,
        color: 'white',
        fades: false
    }));
}
function createParticles(_a) {
    var object = _a.object, color = _a.color, fades = _a.fades;
    for (var i = 0; i < 5; i++) {
        particles.push(new Particule({
            position: {
                x: object.position.x + object.width / 2,
                y: object.position.y + object.height / 2
            },
            velocity: {
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2
            },
            radius: Math.random() * 3,
            color: color,
            fades: fades
        }));
    }
}
function animate() {
    if (!game.active)
        return;
    requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    particles.forEach(function (particle, i) {
        if (particle.position.y - particle.radius >= canvas.height) {
            particle.position.x = Math.random() * canvas.width;
            particle.position.y = -particle.radius;
        }
        if (particle.opacity <= 0) {
            setTimeout(function () {
                particles.splice(i, 1);
            }, 0);
        }
        else {
            particle.update();
        }
    });
    InvaderProjectiles.forEach(function (InvaderProjectile, index) {
        if (InvaderProjectile.position.y + InvaderProjectile.height >= canvas.height) {
            setTimeout(function () {
                InvaderProjectiles.splice(index, 1);
            }, 0);
        }
        else {
            InvaderProjectile.update();
        }
        // Projectile hit player
        if (InvaderProjectile.position.y + InvaderProjectile.height >= player.position.y && InvaderProjectile.position.x + InvaderProjectile.width >= player.position.x && InvaderProjectile.position.x <= player.position.x + player.width) {
            console.log('You Suck');
            setTimeout(function () {
                InvaderProjectiles.splice(index, 1);
                player.opacity = 0;
                game.over = true;
            }, 0);
            setTimeout(function () {
                game.active = false;
            }, 2000);
            createParticles({
                object: player,
                color: 'blue',
                fades: true
            });
        }
    });
    projectiles.forEach(function (projectile, index) {
        if (projectile.position.y + projectile.radius <= 0) {
            setTimeout(function () {
                projectiles.splice(index, 1);
            }, 0);
        }
        else {
            projectile.update();
        }
    });
    grids.forEach(function (grid, gridIndex) {
        grid.update();
        // spawn projectiles invader
        if (frame % 100 === 0 && grid.invaders.length > 0) {
            grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(InvaderProjectiles);
        }
        grid.invaders.forEach(function (invader, i) {
            invader.update({
                velocity: grid.velocity
            });
            // projectile hit enemy
            projectiles.forEach(function (projectile, j) {
                if (projectile.position.y - projectile.radius <= invader.position.y + invader.height && projectile.position.x + projectile.radius >= invader.position.x && projectile.position.x - projectile.radius <= invader.position.x + invader.width && projectile.position.y + projectile.radius >= invader.position.y) {
                    setTimeout(function () {
                        var invaderFound = grid.invaders.find(function (invader2) { return invader2 === invader; });
                        var projectileFound = projectiles.find(function (projectile2) { return projectile2 === projectile; });
                        // remove invader and projectiles
                        if (invaderFound && projectileFound) {
                            score += 1;
                            scoreEl.innerHTML = "".concat(score);
                            createParticles({
                                object: invader,
                                color: '#BAA0DE',
                                fades: true
                            });
                            grid.invaders.splice(i, 1);
                            projectiles.splice(j, 1);
                            if (grid.invaders.length > 0) {
                                var firstInvader = grid.invaders[0];
                                var lastInvader = grid.invaders[grid.invaders.length - 1];
                                grid.width = lastInvader.position.x - firstInvader.position.x + 30;
                                grid.position.x = firstInvader.position.x;
                            }
                            else {
                                grids.splice(gridIndex, 1);
                            }
                        }
                    }, 0);
                }
            });
        });
    });
    if (keys.q.pressed && player.position.x >= 0) {
        player.velocity.x = -5;
    }
    else if (keys.d.pressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = 5;
    }
    else {
        player.velocity.x = 0;
    }
    // spawn ennemies
    if (frame % randomInterval === 0) {
        grids.push(new Grid());
        frame = 0;
        randomInterval = (Math.floor((Math.random() * 500) + 500));
    }
    frame++;
}
animate();
addEventListener('keydown', function (_a) {
    var key = _a.key;
    if (game.over)
        return;
    switch (key) {
        case 'q':
            // console.log('left')
            keys.q.pressed = true;
            break;
        case 'd':
            // console.log('right')
            keys.d.pressed = true;
            break;
        case ' ':
            // console.log('space')
            projectiles.push(new Projectile({
                position: {
                    x: player.position.x + player.width / 2,
                    y: player.position.y
                },
                velocity: {
                    x: 0,
                    y: -10
                }
            }));
            break;
    }
    console.log(key);
});
addEventListener('keyup', function (_a) {
    var key = _a.key;
    switch (key) {
        case 'q':
            // console.log('left')
            keys.q.pressed = false;
            break;
        case 'd':
            // console.log('right')
            player.velocity.x = 5;
            keys.d.pressed = false;
            break;
        case ' ':
            // console.log('space')
            break;
    }
});
