var canvas = document.querySelector('canvas');
var scoreEl = document.querySelector('#scoreEl');
var hs = document.querySelector('#highest_score');
var hp_heart = document.querySelector('#hp_heart');
var loseHTML = document.querySelector('#lose');
var munition1 = document.querySelector('#munition1');
var munition2 = document.querySelector('#munition2');
var munition3 = document.querySelector('#munition3');
var munition4 = document.querySelector('#munition4');
var numPlayers = parseFloat(sessionStorage.getItem('number_Of_Players'));
var c = canvas.getContext('2d');
var spaceship_Player1 = sessionStorage.getItem('Player1');
var spaceship_Player2 = sessionStorage.getItem('Player2');
var spaceship_Player3 = sessionStorage.getItem('Player3');
var spaceship_Player4 = sessionStorage.getItem('Player4');
hs.innerHTML = "".concat((document.cookie.split('; ')
    .find(function (row) { return row.startsWith('highestscore'); })
    .split('=')[1]));
canvas.width = 576;
if (numPlayers > 2) {
    canvas.width = 1024;
}
canvas.height = 700;
var Particule = /** @class */ (function () {
    function Particule(_a) {
        var position = _a.position, velocity = _a.velocity, radius = _a.radius, color = _a.color, fades = _a.fades, fadingtime = _a.fadingtime;
        this.position = position;
        this.velocity = velocity;
        this.radius = radius;
        this.color = color;
        this.opacity = 1;
        this.fades = fades;
        this.fadingtime = fadingtime;
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
            this.opacity -= this.fadingtime;
        }
    };
    return Particule;
}());
var player = new Player("".concat(spaceship_Player1), 1, 1, 40);
var player2 = null;
if (numPlayers >= 2) {
    player2 = new Player("".concat(spaceship_Player2), 2, 1, 40);
}
var player3 = null;
if (numPlayers >= 3) {
    player3 = new Player("".concat(spaceship_Player3), 3, 1, 40);
}
var player4 = null;
if (numPlayers >= 4) {
    player4 = new Player("".concat(spaceship_Player4), 4, 1, 40);
}
var projectiles = [];
var projectiles2 = [];
var projectile2_Explosion = [];
var grids = [];
var bigInvaders = [];
var bigMonsters = [];
var bigBoss = [];
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
    pf2: {
        pressed: false
    },
    r: {
        pressed: false
    },
    t: {
        pressed: false
    },
    y: {
        pressed: false
    },
    u: {
        pressed: false
    },
    i: {
        pressed: false
    },
    o: {
        pressed: false
    }
};
var frame = 0;
var random_IntervalP3 = 0;
var randomInterval = (Math.floor((Math.random() * 500) + 500));
var game = {
    over: false,
    active: true
};
var score = 0;
var score_player = [0, 0, 0, 0];
var highest_score = 0;
var HP = 3;
var shoot_b_p1 = 0;
var shoot_b_p2 = 0;
var shoot_b_p3 = 0;
var shoot_b_p4 = 0;
var projectile2_Munitions = 0;
var time = 0;
var soundPlayerDeath = new Audio('sound/player_explosion_sound.wav');
var soundHitPlayer = new Audio('sound/hit_player_sound.wav');
setInterval(timer, 1000);
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
        fadingtime: 0.01,
        fades: false
    }));
}
function animate() {
    if (!game.active)
        return;
    requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    if (player2)
        player2.update();
    if (player3)
        player3.update();
    if (player4)
        player4.update();
    if (score >= 1500) {
        winCondition();
    }
    if (bigBoss.length > 0) {
        console.log(bigBoss[0].HP);
    }
    munition1.innerHTML = "".concat(Math.floor(score_player[0] / 25) - shoot_b_p1);
    if (player2) {
        munition2.innerHTML = "".concat(Math.floor(score_player[1] / 25) - shoot_b_p2);
    }
    if (player3) {
        munition3.innerHTML = "".concat(Math.floor(score_player[2] / 25) - shoot_b_p3);
    }
    if (player4) {
        munition4.innerHTML = "".concat(Math.floor(score_player[3] / 25) - shoot_b_p4);
    }
    bigBoss.forEach(function (finalboss, i) {
        finalboss.update();
        if (frame % (200) === 0) {
            finalboss.bigshoot(InvaderProjectiles);
        }
        if (frame % (80) === 0) {
            finalboss.shoot({ side: (3 / 4) });
            finalboss.shoot({ side: (1 / 4) });
            setTimeout(function () {
                finalboss.shoot({ side: (1) });
                finalboss.shoot({ side: (0) });
            }, 500);
        }
        projectile_invader(finalboss, bigBoss, i, 500);
        projectile2_invader(finalboss, bigBoss, i, 500);
    });
    bigMonsters.forEach(function (bigMonster, i) {
        bigMonster.update();
        if (frame % (305) === 0) {
            bigMonster.bigshoot(InvaderProjectiles);
        }
        if (frame % (125) === 0) {
            bigMonster.shoot({ side: (3 / 4) });
            bigMonster.shoot({ side: (1 / 4) });
        }
        projectile_invader(bigMonster, bigMonsters, i, 200);
        projectile2_invader(bigMonster, bigMonsters, i, 200);
    });
    bigInvaders.forEach(function (bigInvader, i) {
        bigInvader.update({
            velocity: 0
        });
        if (frame % (305 - ((Math.floor(score / 50)) * 5)) === 0) {
            bigInvader.bigshoot(InvaderProjectiles);
        }
        projectile_invader(bigInvader, bigInvaders, i, 30);
        projectile2_invader(bigInvader, bigInvaders, i, 30);
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
            InvaderProjectiles.splice(index, 1);
        }
        else {
            InvaderProjectile.update();
        }
        // Projectile hit player1
        ProjectileHitPlayer(player, InvaderProjectile, index, 'white');
        // Projectile hit player 2
        if (player2) {
            ProjectileHitPlayer(player2, InvaderProjectile, index, 'blue');
        }
        // Projectile hit player 3
        if (player3) {
            ProjectileHitPlayer(player3, InvaderProjectile, index, 'green');
        }
        // Projectile hit player 4
        if (player4) {
            ProjectileHitPlayer(player4, InvaderProjectile, index, 'yellow');
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
    projectiles2.forEach(function (projectile2, index) {
        if (projectile2.position.y + projectile2.radius <= 0) {
            setTimeout(function () {
                projectiles2.splice(index, 1);
            }, 0);
        }
        else {
            projectile2.update();
        }
    });
    grids.forEach(function (grid, gridIndex) {
        grid.update();
        // spawn projectiles invader
        if (frame % (105 - ((Math.floor(score / 50)) * 5)) === 0 && grid.invaders.length > 0) {
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
                            score_player[projectile.player_number - 1] += 1;
                            scoreEl.innerHTML = "".concat(score);
                            createParticles({
                                object: invader,
                                color: 'lime',
                                fades: true,
                                fadingtime: 0.01,
                                x: 10
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
            projectiles2.forEach(function (projectile2) {
                if (projectile2.position.y - projectile2.radius <= invader.position.y + invader.height && projectile2.position.x + projectile2.radius >= invader.position.x && projectile2.position.x - projectile2.radius <= invader.position.x + invader.width && projectile2.position.y + projectile2.radius >= invader.position.y) {
                    projectiles2.push(new Projectile2({
                        position: {
                            x: projectile2.position.x,
                            y: projectile2.position.y
                        },
                        velocity: {
                            x: 0,
                            y: 0
                        },
                        radius: 80,
                        fades: false,
                        player_number: projectile2.player_number
                    }));
                    projectiles2.splice(0, 1);
                    particles.push(new Particule({
                        position: {
                            x: projectile2.position.x,
                            y: projectile2.position.y
                        },
                        velocity: {
                            x: 0,
                            y: 0
                        },
                        radius: 80,
                        color: 'yellow',
                        fades: true,
                        fadingtime: 0.007
                    }));
                    setTimeout(function () {
                        var invaderFound = grid.invaders.find(function (invader2) { return invader2 === invader; });
                        // remove invader and projectiles
                        if (invaderFound) {
                            score += 1;
                            score_player[projectile2.player_number - 1]++;
                            scoreEl.innerHTML = "".concat(score);
                            createParticles({
                                object: invader,
                                color: 'lime',
                                fades: true,
                                fadingtime: 0.01,
                                x: 10
                            });
                            grid.invaders.splice(i, 1);
                            setTimeout(function () {
                                projectiles2.splice(0, 1);
                            }, 100);
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
    if (player2) {
        if (keys.ArrowLeft.pressed && player2.position.x >= 0) {
            player2.velocity.x = -5;
        }
        else if (keys.ArrowRight.pressed && player2.position.x + player2.width <= canvas.width) {
            player2.velocity.x = 5;
        }
        else {
            player2.velocity.x = 0;
        }
    }
    // PLayer 3 mouvement
    if (player3) {
        if (keys.r.pressed && player3.position.x >= 0) {
            player3.velocity.x = -5;
        }
        else if (keys.t.pressed && player3.position.x + player3.width <= canvas.width) {
            player3.velocity.x = 5;
        }
        else {
            player3.velocity.x = 0;
        }
    }
    // PLayer 4 mouvement
    if (player4) {
        if (keys.u.pressed && player4.position.x >= 0) {
            player4.velocity.x = -5;
        }
        else if (keys.i.pressed && player4.position.x + player4.width <= canvas.width) {
            player4.velocity.x = 5;
        }
        else {
            player4.velocity.x = 0;
        }
    }
    // spawn ennemies
    console.log((Math.floor(score / 50) + 1));
    if (frame % randomInterval === 0 && time > 1 && bigMonsters.length < 1 && score < 1000) {
        if (randomInterval < 910 - ((3 / 4) * random_IntervalP3)) {
            grids.push(new Grid());
        }
        else {
            bigInvaders.push(new Invader({
                position: {
                    x: 0,
                    y: 0
                },
                velocity: {
                    x: 1.5,
                    y: 0
                },
                HP: 20,
                scale: 3,
                big: true
            }));
        }
        frame = 0;
        randomInterval = (Math.floor((Math.random() * 500) + 500 - random_IntervalP3));
    }
    if (500 * Math.floor(score / 500) <= score && score <= 540 * Math.floor(score / 500) && bigMonsters.length < 1 && score > 0 && score < 1000) {
        bigMonsters.push(new Monster());
    }
    if (bigBoss.length < 1 && score >= 1000 && score < 1500 && bigMonsters.length < 1 && grids.length < 1) {
        bigBoss.push(new FinalBoss());
    }
    frame++;
}
animate();
addEventListener('keydown', function (_a) {
    var key = _a.key;
    console.log(key);
    switch (key) {
        case 'Escape':
            sessionStorage.clear();
            window.location.href = "./menu.html";
            break;
    }
    if (game.over)
        return;
    switch (key) {
        case 'q':
            keys.q.pressed = true;
            break;
        case 'd':
            keys.d.pressed = true;
            break;
        case ' ':
            if (!keys.space.pressed) {
                projectiles.push(new Projectile({
                    position: {
                        x: player.position.x + player.width / 2,
                        y: player.position.y
                    },
                    velocity: {
                        x: 0,
                        y: -10
                    },
                    color: 'aqua',
                    player_number: 1
                }));
            }
            keys.space.pressed = true;
            break;
        case 'b':
            if (projectiles2.length < 1 && Math.floor(score_player[0] / 25) - shoot_b_p1 > 0) {
                projectiles2.push(new Projectile2({
                    position: {
                        x: player.position.x + player.width / 2,
                        y: player.position.y
                    },
                    velocity: {
                        x: 0,
                        y: -3
                    },
                    radius: 3,
                    fades: false,
                    player_number: 1
                }));
                shoot_b_p1++;
            }
            break;
        // player2
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            break;
        case '0':
            if (player2 && !keys.pf2.pressed) {
                projectiles.push(new Projectile({
                    position: {
                        x: player2.position.x + player2.width / 2,
                        y: player2.position.y
                    },
                    velocity: {
                        x: 0,
                        y: -10
                    },
                    color: 'red',
                    player_number: 2
                }));
                keys.pf2.pressed = true;
            }
            break;
        case 'Enter':
            if (projectiles2.length < 1 && Math.floor(score_player[1] / 25) - shoot_b_p2 > 0) {
                projectiles2.push(new Projectile2({
                    position: {
                        x: player2.position.x + player2.width / 2,
                        y: player2.position.y
                    },
                    velocity: {
                        x: 0,
                        y: -3
                    },
                    radius: 3,
                    fades: false,
                    player_number: 2
                }));
                shoot_b_p2++;
            }
            break;
        // player3
        case 'r':
            keys.r.pressed = true;
            break;
        case 't':
            keys.t.pressed = true;
            break;
        case 'y':
            if (player3 && !keys.y.pressed) {
                projectiles.push(new Projectile({
                    position: {
                        x: player3.position.x + player3.width / 2,
                        y: player3.position.y
                    },
                    velocity: {
                        x: 0,
                        y: -10
                    },
                    color: 'purple',
                    player_number: 3
                }));
                keys.y.pressed = true;
            }
            break;
        case 'g':
            if (projectiles2.length < 1 && Math.floor(score_player[2] / 25) - shoot_b_p3 > 0) {
                projectiles2.push(new Projectile2({
                    position: {
                        x: player3.position.x + player3.width / 2,
                        y: player3.position.y
                    },
                    velocity: {
                        x: 0,
                        y: -3
                    },
                    radius: 3,
                    fades: false,
                    player_number: 3
                }));
                shoot_b_p3++;
            }
            break;
        // player4
        case 'u':
            keys.u.pressed = true;
            break;
        case 'i':
            keys.i.pressed = true;
            break;
        case 'o':
            if (player4 && !keys.o.pressed) {
                projectiles.push(new Projectile({
                    position: {
                        x: player4.position.x + player4.width / 2,
                        y: player4.position.y
                    },
                    velocity: {
                        x: 0,
                        y: -10
                    },
                    color: 'orange',
                    player_number: 4
                }));
                keys.o.pressed = true;
            }
            break;
        case 'k':
            if (projectiles2.length < 1 && Math.floor(score_player[3] / 25) - shoot_b_p4 > 0) {
                projectiles2.push(new Projectile2({
                    position: {
                        x: player4.position.x + player4.width / 2,
                        y: player4.position.y
                    },
                    velocity: {
                        x: 0,
                        y: -3
                    },
                    radius: 3,
                    fades: false,
                    player_number: 4
                }));
                shoot_b_p4++;
            }
            break;
    }
});
addEventListener('keyup', function (_a) {
    var key = _a.key;
    switch (key) {
        case 'q':
            keys.q.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
        case ' ':
            keys.space.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case '0':
            keys.pf2.pressed = false;
            break;
        case 'r':
            keys.r.pressed = false;
            break;
        case 't':
            keys.t.pressed = false;
            break;
        case 'y':
            keys.y.pressed = false;
            break;
        case 'u':
            keys.u.pressed = false;
            break;
        case 'i':
            keys.i.pressed = false;
            break;
        case 'o':
            keys.o.pressed = false;
            break;
    }
});
