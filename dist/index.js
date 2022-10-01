var canvas = document.querySelector('canvas');
var scoreEl = document.querySelector('#scoreEl');
var hs = document.querySelector('#highest_score');
var hp_heart = document.querySelector('#hp_heart');
var loseHTML = document.querySelector('#lose');
var c = canvas.getContext('2d');
hs.innerHTML = "".concat((document.cookie.split('; ')
    .find(function (row) { return row.startsWith('highestscore'); })
    .split('=')[1]));
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
var Player2 = /** @class */ (function () {
    function Player2() {
        var _this = this;
        this.velocity = {
            x: 0,
            y: 0
        };
        this.rotation = 0;
        this.opacity = 1;
        var image = new Image();
        image.src = "img/spaceship.png";
        image.onload = function () {
            var scale = 0.11;
            _this.image = image;
            _this.width = image.width * scale;
            _this.height = image.height * scale;
            _this.position = {
                x: canvas.width / 4 - _this.width / 2,
                y: canvas.height - 30
            };
        };
    }
    Player2.prototype.draw = function () {
        // c.fillStyle = 'red'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.save();
        c.globalAlpha = this.opacity;
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        c.restore();
    };
    Player2.prototype.update = function () {
        if (this.image) {
            this.draw();
            this.position.x += this.velocity.x;
        }
    };
    return Player2;
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
        c.fillStyle = 'red';
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
var player = new Player();
var player2 = new Player2();
var projectiles = [];
var projectiles2 = [];
var grids = [];
var bigInvaders = [];
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
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    0: {
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
var highest_score = 0;
var HP = 3;
var soundPlayerDeath = new Audio('sound/player_explosion_sound.wav');
var soundInvaderDeath = new Audio('sound/invader_explosion_sound.wav');
var soundHitPlayer = new Audio('sound/hit_player_sound.wav');
function loseCondition() {
    setTimeout(function () {
        if (score > parseFloat(document.cookie.split('; ')
            .find(function (row) { return row.startsWith('highestscore'); })
            .split('=')[1])) {
            setTimeout(function () {
                highest_score = score;
                document.cookie = "highestscore=".concat(highest_score);
                loseHTML.innerHTML = 'YOU SUCK BUT NOT AS MUCH AS THE OTHER POEPLE !<br> F5 TO RETRY';
            }, 2000);
        }
        else {
            loseHTML.innerHTML = 'YOU SUCK !<br> F5 TO RETRY';
        }
        game.active = false;
    }, 2000);
}
function Hplost() {
    hp_heart.innerHTML = null;
    for (var i = 0; i < HP; i++) {
        hp_heart.innerHTML += '<i class="fa-solid fa-heart"></i>';
    }
}
Hplost();
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
    for (var i = 0; i < 10; i++) {
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
function playerhit(player, particles_color) {
    Hplost();
    createParticles({
        object: player,
        color: "".concat(particles_color),
        fades: true
    });
    if (HP > 0) {
        soundHitPlayer.play();
        return;
    }
    else {
        soundPlayerDeath.play();
    }
    setTimeout(function () {
        player.opacity = 0;
        game.over = true;
    }, 0);
    loseCondition();
}
function animate() {
    if (!game.active)
        return;
    requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    player2.update();
    bigInvaders.forEach(function (bigInvader, i) {
        bigInvader.update();
        if (frame % 300 === 0) {
            bigInvader.shoot(InvaderProjectiles);
        }
        projectiles.forEach(function (projectile, j) {
            if (projectile.position.y - projectile.radius <= bigInvader.position.y + bigInvader.height && projectile.position.x + projectile.radius >= bigInvader.position.x && projectile.position.x - projectile.radius <= bigInvader.position.x + bigInvader.width && projectile.position.y + projectile.radius >= bigInvader.position.y) {
                setTimeout(function () {
                    var invaderFound = bigInvaders.find(function (invader2) { return invader2 === bigInvader; });
                    var projectileFound = projectiles.find(function (projectile2) { return projectile2 === projectile; });
                    // remove bigInvader and projectiles
                    if ((invaderFound && projectileFound && bigInvaders[i].HP === 0)) {
                        score += 30;
                        scoreEl.innerHTML = "".concat(score);
                        createParticles({
                            object: bigInvader,
                            color: '#BAA0DE',
                            fades: true
                        });
                        bigInvaders.splice(i, 1);
                        projectiles.splice(j, 1);
                    }
                    else {
                        bigInvaders[i].HP -= 1;
                        projectiles.splice(j, 1);
                        createParticles({
                            object: bigInvader,
                            color: '#BAA0DE',
                            fades: true
                        });
                    }
                }, 0);
            }
        });
    });
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
        // Projectile hit player1
        if (InvaderProjectile.position.y + InvaderProjectile.height >= player.position.y && InvaderProjectile.position.x + InvaderProjectile.width >= player.position.x && InvaderProjectile.position.x <= player.position.x + player.width) {
            InvaderProjectiles.splice(index, 1);
            if (InvaderProjectile.big) {
                HP -= 3;
            }
            else {
                HP -= 1;
            }
            playerhit(player, 'blue');
        }
        // Projectile hit player 2
        if (InvaderProjectile.position.y + InvaderProjectile.height >= player2.position.y && InvaderProjectile.position.x + InvaderProjectile.width >= player2.position.x && InvaderProjectile.position.x <= player2.position.x + player2.width) {
            InvaderProjectiles.splice(index, 1);
            if (InvaderProjectile.big) {
                HP -= 3;
            }
            else {
                HP -= 1;
            }
            playerhit(player2, 'white');
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
                    soundInvaderDeath.play();
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
    // Player 1 mouvement
    if (keys.q.pressed && player.position.x >= 0) {
        player.velocity.x = -5;
    }
    else if (keys.d.pressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = 5;
    }
    else {
        player.velocity.x = 0;
    }
    // PLayer 2 mouvement
    if (keys.ArrowLeft.pressed && player2.position.x >= 0) {
        player2.velocity.x = -5;
    }
    else if (keys.ArrowRight.pressed && player2.position.x + player2.width <= canvas.width) {
        player2.velocity.x = 5;
    }
    else {
        player2.velocity.x = 0;
    }
    // spawn ennemies
    if (frame % randomInterval === 0) {
        if (randomInterval < 875) {
            grids.push(new Grid());
            console.log(randomInterval, 'ass');
        }
        else {
            bigInvaders.push(new BigInvader());
            console.log(randomInterval, 'ass1');
        }
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
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            break;
        case '0':
            projectiles.push(new Projectile({
                position: {
                    x: player2.position.x + player2.width / 2,
                    y: player2.position.y
                },
                velocity: {
                    x: 0,
                    y: -10
                }
            }));
            break;
    }
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
            keys.d.pressed = false;
            break;
        case ' ':
            // console.log('space')
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
    }
});
