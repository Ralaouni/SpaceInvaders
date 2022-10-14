function loseCondition() {
    setTimeout(function () {
        if (score > parseFloat(document.cookie.split('; ')
            .find(function (row) { return row.startsWith('highestscore'); })
            .split('=')[1])) {
            setTimeout(function () {
                highest_score = score;
                document.cookie = "highestscore=".concat(highest_score);
                loseHTML.innerHTML = 'YOU LOSE BUT NOT AS MUCH AS THE LAST TIME !<br> F5 TO RETRY <br> Escape to MENU';
            }, 2000);
        }
        else {
            loseHTML.innerHTML = 'YOU LOSE !<br> F5 TO RETRY <br> Escape to MENU';
        }
        game.active = false;
    }, 2000);
}
function winCondition() {
    setTimeout(function () {
        loseHTML.innerHTML = 'WELL PLAYED, you save the EARTH !';
        game.active = false;
        game.over = true;
    }, 3000);
}
function Hplost() {
    hp_heart.innerHTML = null;
    for (var i = 0; i < HP; i++) {
        hp_heart.innerHTML += '<i class="fa-solid fa-heart"></i>';
    }
}
function createParticles(_a) {
    var object = _a.object, color = _a.color, fades = _a.fades, fadingtime = _a.fadingtime, x = _a.x;
    for (var i = 0; i < x; i++) {
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
            fadingtime: fadingtime,
            fades: fades
        }));
    }
}
function playerhit(player, particles_color) {
    Hplost();
    createParticles({
        object: player,
        color: "".concat(particles_color),
        fades: true,
        fadingtime: 0.01,
        x: 10
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
function ProjectileHitPlayer(player, InvaderProjectile, index, color) {
    if (InvaderProjectile.position.y + InvaderProjectile.height >= player.position.y && InvaderProjectile.position.x + InvaderProjectile.width >= player.position.x && InvaderProjectile.position.x <= player.position.x + player.width) {
        InvaderProjectiles.splice(index, 1);
        if (InvaderProjectile.big) {
            HP -= 3;
        }
        else {
            HP -= 1;
        }
        playerhit(player, "".concat(color));
    }
}
function timer() {
    time++;
}
function projectile_invader(enemy, enemys, i, score_count) {
    projectiles.forEach(function (projectile, j) {
        if (projectile.position.y - projectile.radius <= enemy.position.y + enemy.height && projectile.position.x + projectile.radius >= enemy.position.x && projectile.position.x - projectile.radius <= enemy.position.x + enemy.width && projectile.position.y + projectile.radius >= enemy.position.y) {
            setTimeout(function () {
                var invaderFound = enemys.find(function (invader2) { return invader2 === enemy; });
                var projectileFound = projectiles.find(function (projectile2) { return projectile2 === projectile; });
                // remove enemy and projectiles
                if ((invaderFound && projectileFound && enemys[i].HP === 0)) {
                    score += score_count;
                    scoreEl.innerHTML = "".concat(score);
                    createParticles({
                        object: enemy,
                        color: 'lime',
                        fades: true,
                        fadingtime: 0.01,
                        x: 15
                    });
                    enemys.splice(i, 1);
                    projectiles.splice(j, 1);
                }
                else {
                    enemys[i].HP -= 1;
                    projectiles.splice(j, 1);
                    createParticles({
                        object: enemy,
                        color: 'lime',
                        fades: true,
                        fadingtime: 0.01,
                        x: 30
                    });
                }
            }, 0);
        }
    });
}
function projectile2_invader(enemy, enemys, i, score_count) {
    projectiles2.forEach(function (projectile2, j) {
        if (projectile2.position.y - projectile2.radius <= enemy.position.y + enemy.height && projectile2.position.x + projectile2.radius >= enemy.position.x && projectile2.position.x - projectile2.radius <= enemy.position.x + enemy.width && projectile2.position.y + projectile2.radius >= enemy.position.y) {
            projectiles2.splice(0, 1);
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
                player_number: 1
            }));
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
                var invaderFound = enemys.find(function (invader2) { return invader2 === enemy; });
                // remove enemy and projectiles
                if ((invaderFound && enemys[i].HP < 1)) {
                    score += score_count;
                    scoreEl.innerHTML = "".concat(score);
                    createParticles({
                        object: enemy,
                        color: 'lime',
                        fades: true,
                        fadingtime: 0.01,
                        x: 15
                    });
                    enemys.splice(i, 1);
                    projectiles2.splice(j, 1);
                }
                else {
                    enemys[i].HP -= 3;
                    projectiles2.splice(j, 1);
                    createParticles({
                        object: enemy,
                        color: 'lime',
                        fades: true,
                        fadingtime: 0.01,
                        x: 30
                    });
                }
            }, 0);
        }
    });
}
