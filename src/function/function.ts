function loseCondition () {
    setTimeout(() => {
        if (score > parseFloat(document.cookie.split('; ')
        .find(row => row.startsWith('highestscore'))
        .split('=')[1])) {
            setTimeout(() => {
                highest_score = score
                document.cookie = `highestscore=${highest_score}`
                loseHTML.innerHTML = 'YOU SUCK BUT NOT AS MUCH AS THE OTHER POEPLE !<br> F5 TO RETRY'
            }, 2000);
        } else {
            loseHTML.innerHTML = 'YOU SUCK !<br> F5 TO RETRY'
        }
        game.active = false
        
    }, 2000);
}

function Hplost () {
    hp_heart.innerHTML = null
    for (let i = 0; i < HP ; i++) {
        hp_heart.innerHTML += '<i class="fa-solid fa-heart"></i>'
    }
}
Hplost()

function createParticles ({object, color, fades}) {
    for (let i = 0; i < 10; i++) {
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
            fades
        }))
    }
}

function playerhit(player,particles_color) {
    Hplost()
    createParticles({
        object: player,
        color: `${particles_color}`,
        fades: true
    })
    if (HP > 0) {
        soundHitPlayer.play()
        return
    } else {
        soundPlayerDeath.play()
    }
    

    setTimeout(() => {
        player.opacity = 0
        game.over = true
    }, 0);

    loseCondition()
}

function ProjectileHitPlayer (player,InvaderProjectile, index, color) {
    if (InvaderProjectile.position.y + InvaderProjectile.height >= player.position.y && InvaderProjectile.position.x + InvaderProjectile.width >= player.position.x && InvaderProjectile.position.x <= player.position.x + player.width) {
        InvaderProjectiles.splice(index, 1)
        if (InvaderProjectile.big) {
            HP-= 3
        } else {HP -= 1}
        playerhit(player, `${color}`)
    }
}