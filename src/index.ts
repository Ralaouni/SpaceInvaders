
const canvas = document.querySelector('canvas')
const scoreEl = document.querySelector('#scoreEl')
const hs = document.querySelector('#highest_score')
const hp_heart = document.querySelector('#hp_heart')
const loseHTML = document.querySelector('#lose')
const numPlayers = parseFloat(sessionStorage.getItem('number_Of_Players'))
const c = canvas.getContext('2d')

hs.innerHTML = `${(document.cookie.split('; ')
.find(row => row.startsWith('highestscore'))
.split('=')[1])}`

canvas.width = 576
canvas.height = 700

class Particule {
    position: any
    velocity: any
    radius: number
    color: any
    opacity: number
    fades: any
    constructor({position, velocity, radius, color, fades}) {
        this.position = position
        this.velocity = velocity

        this.radius = radius
        this.color = color
        this.opacity = 1
        this.fades = fades
    }

    draw() {
        c.save()
        c.globalAlpha = this.opacity
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
        c.restore()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (this.fades) {
            this.opacity -= 0.01   
        }
    }
}


let player = new Player("img/vaisseau_fanny_pourri.png", 1, 0.04, 60)
let player2 = null
if (numPlayers >= 2) {
    player2 = new Player("img/spaceship.png", 2, 0.11, 30)
} 
let player3 = null
if (numPlayers >= 3) {
    player3 = new Player("img/spaceship.png", 3, 0.11, 30)
} 
let player4 = null
if (numPlayers >= 4) {
    player4 = new Player("img/spaceship.png", 4, 0.11, 30)
} 


const projectiles = []
const projectiles2 = []
const projectile2_Explosion = []
const grids = []
const bigInvaders = []
const InvaderProjectiles = []
const particles = []
const keys = {
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
        pressed:false
    },
    0: {
        pressed:false
    },
    r:{
        pressed:false
    },
    t:{
        pressed:false
    },
    y:{
        pressed:false
    },
    u:{
        pressed:false
    },
    i:{
        pressed:false
    },
    o:{
        pressed:false
    },
}

let frame = 0
let randomInterval = (Math.floor((Math.random() * 500) + 500))
let game = {
    over: false,
    active: true
}
let score = 0
let highest_score = 0
let HP = 3

let soundPlayerDeath = new Audio('sound/player_explosion_sound.wav')
let soundInvaderDeath = new Audio('sound/invader_explosion_sound.wav')
let soundHitPlayer = new Audio('sound/hit_player_sound.wav')

for (let i = 0; i < 100; i++) {
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
    }))
}

function animate() {
    if (!game.active) return
    requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width, canvas.height)
    player.update()
    if (player2) player2.update()
    if (player3) player3.update()
    if (player4) player4.update()

    bigInvaders.forEach((bigInvader, i) => {

        bigInvader.update()

        if (frame % 300 === 0) {
            bigInvader.shoot(InvaderProjectiles)
        }

        projectiles.forEach((projectile, j) => {
            if (projectile.position.y - projectile.radius <= bigInvader.position.y + bigInvader.height && projectile.position.x + projectile.radius >= bigInvader.position.x && projectile.position.x - projectile.radius <= bigInvader.position.x + bigInvader.width && projectile.position.y + projectile.radius >= bigInvader.position.y) {


                setTimeout(() => {
                    const invaderFound = bigInvaders.find(invader2 => invader2 === bigInvader)
                    const projectileFound = projectiles.find( projectile2 => projectile2 === projectile)

                    // remove bigInvader and projectiles

                    if ((invaderFound && projectileFound && bigInvaders[i].HP === 0 )) {
                        score += 30
                        scoreEl.innerHTML = `${score}`
                        createParticles({
                            object: bigInvader,
                            color: '#BAA0DE',
                            fades: true
                        })

                        bigInvaders.splice(i, 1)
                        projectiles.splice(j, 1)

                    } else {
                        bigInvaders[i].HP -= 1
                        projectiles.splice(j, 1)
                        createParticles({
                            object: bigInvader,
                            color: '#BAA0DE',
                            fades: true
                        })
                    }
                }, 0);
            }
        })
    })

    particles.forEach( (particle, i) => {

        if (particle.position.y - particle.radius >= canvas.height) {
            particle.position.x = Math.random() * canvas.width
            particle.position.y = -particle.radius
        }
        if (particle.opacity <= 0) {
            setTimeout(() => {
                particles.splice(i, 1)
            }, 0);
        } else {
            particle.update()
        }
    })
    InvaderProjectiles.forEach((InvaderProjectile, index) => {
        if (InvaderProjectile.position.y + InvaderProjectile.height >= canvas.height) {
            setTimeout(() => {
                InvaderProjectiles.splice(index, 1)
            }, 0);
        } else {
            InvaderProjectile.update()
        }

        // Projectile hit player1

        ProjectileHitPlayer(player,InvaderProjectile, index, 'white')

        // Projectile hit player 2
        
        if (player2) {
            ProjectileHitPlayer(player2,InvaderProjectile, index, 'blue')
        }
        
        // Projectile hit player 3

        if (player3) {
            ProjectileHitPlayer(player3,InvaderProjectile, index, 'green')
        }
        
        // Projectile hit player 4

        if (player4) {
            ProjectileHitPlayer(player4,InvaderProjectile, index, 'yellow')
        }
        
    })

    projectiles.forEach((projectile, index) => {
        if (projectile.position.y + projectile.radius <= 0) {
            setTimeout(() => {
                projectiles.splice(index, 1)
            }, 0);
        } else {
            projectile.update()
        }
    })

    projectiles2.forEach((projectile2, index) => {
        if (projectile2.position.y + projectile2.radius <= 0) {
            setTimeout(() => {
                projectiles2.splice(index, 1)
            }, 0);
        } else {
            projectile2.update()
        }
    })

    grids.forEach((grid, gridIndex) => {

        grid.update()

        // spawn projectiles invader

        if (frame % 100 === 0 && grid.invaders.length > 0) {
            grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(InvaderProjectiles)
        }
        grid.invaders.forEach( (invader, i) => {
            invader.update({ 
                velocity : grid.velocity
            })

            // projectile hit enemy

            projectiles.forEach((projectile, j) => {
                if (projectile.position.y - projectile.radius <= invader.position.y + invader.height && projectile.position.x + projectile.radius >= invader.position.x && projectile.position.x - projectile.radius <= invader.position.x + invader.width && projectile.position.y + projectile.radius >= invader.position.y) {
                    
                    soundInvaderDeath.play()

                    setTimeout(() => {
                        const invaderFound = grid.invaders.find(invader2 => invader2 === invader)
                        const projectileFound = projectiles.find( projectile2 => projectile2 === projectile)

                        // remove invader and projectiles

                        if (invaderFound && projectileFound) {
                            score += 1
                            scoreEl.innerHTML = `${score}`
                            createParticles({
                                object: invader,
                                color: '#BAA0DE',
                                fades: true
                            })

                            grid.invaders.splice(i, 1)
                            projectiles.splice(j, 1)

                            if (grid.invaders.length > 0) {
                                const firstInvader = grid.invaders[0]
                                const lastInvader = grid.invaders[grid.invaders.length - 1]

                                grid.width = lastInvader.position.x - firstInvader.position.x + 30
                                grid.position.x = firstInvader.position.x
                            } else {
                                grids.splice(gridIndex, 1)
                            }
                        }
                    }, 0);
                }
            })
            projectiles2.forEach((projectile2, j, projectiles2_Explosion) => {
                if (projectile2.position.y - projectile2.radius <= invader.position.y + invader.height && projectile2.position.x + projectile2.radius >= invader.position.x && projectile2.position.x - projectile2.radius <= invader.position.x + invader.width && projectile2.position.y + projectile2.radius >= invader.position.y) {

                    projectiles2_Explosion.push(new Projectile2({
                        position: {
                            x: projectile2.position.x,
                            y: projectile2.position.y
                        },
                        velocity: {
                            x: 0,
                            y: 0
                        },
                        radius: 80
                    }))
                    projectiles2.splice(0,1)
                    setTimeout(() => {
                        projectiles2_Explosion.splice(0,1)
                    }, 1000);

                    
                }
            })
        })
    })

    // Player 1 mouvement

    if (keys.q.pressed && player.position.x >= 0) {
        player.velocity.x = -5
    } else if (keys.d.pressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = 5
    } else {
        player.velocity.x = 0
    }

    // PLayer 2 mouvement
    
    if (player2) {
        if (keys.ArrowLeft.pressed && player2.position.x >= 0) {
            player2.velocity.x = -5
        } else if (keys.ArrowRight.pressed && player2.position.x + player2.width <= canvas.width) {
            player2.velocity.x = 5
        } else {
            player2.velocity.x = 0
        }
    }

    // PLayer 3 mouvement
    
    if (player3) {
        if (keys.r.pressed && player3.position.x >= 0) {
            player3.velocity.x = -5
        } else if (keys.t.pressed && player3.position.x + player3.width <= canvas.width) {
            player3.velocity.x = 5
        } else {
            player3.velocity.x = 0
        }
    }

    // PLayer 4 mouvement
    
    if (player4) {
        if (keys.u.pressed && player4.position.x >= 0) {
            player4.velocity.x = -5
        } else if (keys.i.pressed && player4.position.x + player4.width <= canvas.width) {
            player4.velocity.x = 5
        } else {
            player4.velocity.x = 0
        }
    }
    
    // spawn ennemies

    if (frame % randomInterval === 0 ) {
        if (randomInterval < 875) {
            grids.push(new Grid())
            console.log(randomInterval, 'ass')
        } else {
            bigInvaders.push(new BigInvader())
            console.log(randomInterval, 'ass1')
        }
        frame = 0
        randomInterval = (Math.floor((Math.random() * 500) + 500))
    }

    frame ++
    
}

animate()

addEventListener('keydown', ({key}) => {
    if (game.over) return
    switch (key) {
        case 'q':
            // console.log('left')
            keys.q.pressed = true
            break;
        case 'd':
            // console.log('right')
            keys.d.pressed = true
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
            }))
            break;
        case 'b':
            // console.log('space')
            if (projectiles2.length < 1) {
                projectiles2.push(new Projectile2({
                    position: {
                        x: player.position.x + player.width / 2,
                        y: player.position.y
                    },
                    velocity: {
                        x: 0,
                        y: -3
                    },
                    radius: 3
                }))
                break; 
            }
        // player2

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            break;
        case '0':
            if (player2) {
                projectiles.push(new Projectile({
                    position: {
                        x: player2.position.x + player2.width / 2,
                        y: player2.position.y
                    },
                    velocity: {
                        x: 0,
                        y: -10
                    }
                }))
            }
            
            break;

        // player3

        case 'r':
            keys.r.pressed = true
            break;
        case 't':
            keys.t.pressed = true
            break;
        case 'y':
            if (player3) {
                projectiles.push(new Projectile({
                    position: {
                        x: player3.position.x + player3.width / 2,
                        y: player3.position.y
                    },
                    velocity: {
                        x: 0,
                        y: -10
                    }
                }))
            }
            
            break;

        // player4

        case 'u':
            keys.u.pressed = true
            break;
        case 'i':
            keys.i.pressed = true
            break;
        case 'o':
            if (player3) {
                projectiles.push(new Projectile({
                    position: {
                        x: player4.position.x + player4.width / 2,
                        y: player4.position.y
                    },
                    velocity: {
                        x: 0,
                        y: -10
                    }
                }))
            }
            
            break;
    }
})

addEventListener('keyup', ({key}) => {
    switch (key) {
        case 'q':
            // console.log('left')
            keys.q.pressed = false
            break;
        case 'd':
            // console.log('right')
            keys.d.pressed = false
            break;


        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break;

        case 'r':
            keys.r.pressed = false
            break;
        case 't':
            keys.t.pressed = false
            break;

        case 'u':
            keys.u.pressed = false
            break;
        case 'i':
            keys.i.pressed = false
            break;
    }
})