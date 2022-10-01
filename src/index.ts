const canvas = document.querySelector('canvas')
const scoreEl = document.querySelector('#scoreEl')
const hs = document.querySelector('#highest_score')
const hp_heart = document.querySelector('#hp_heart')
const loseHTML = document.querySelector('#lose')

const c = canvas.getContext('2d')

hs.innerHTML = `${(document.cookie.split('; ')
.find(row => row.startsWith('highestscore'))
.split('=')[1])}`


canvas.width = 576
canvas.height = 700


class Player {
    position: { x: number; y: number }
    velocity: { x: number; y: number }
    width: number
    height: number
    image: HTMLImageElement
    rotation: number
    opacity: number
    constructor() {
        this.velocity = {
            x: 0,
            y: 0
        }

        this.rotation = 0
        this.opacity = 1
        
        const image = new Image()
        image.src = "img/vaisseau_fanny_pourri.png"
        image.onload = () => {
            const scale = 0.04
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - 60
            }
        }
    }

    draw() {
        // c.fillStyle = 'red'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)

            c.save()
            c.globalAlpha = this.opacity
            c.drawImage(
                this.image,
                this.position.x,
                this.position.y,
                this.width,
                this.height
                )   
            c.restore()
    }

    update() {
        if (this.image) {
            this.draw()
            this.position.x +=  this.velocity.x
        }
        
    }
}

class Player2 {
    position: { x: number; y: number }
    velocity: { x: number; y: number }
    width: number
    height: number
    image: HTMLImageElement
    rotation: number
    opacity: number
    constructor() {
        this.velocity = {
            x: 0,
            y: 0
        }

        this.rotation = 0
        this.opacity = 1
        
        const image = new Image()
        image.src = "img/spaceship.png"
        image.onload = () => {
            const scale = 0.11
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: canvas.width / 4 - this.width / 2,
                y: canvas.height - 30
            }
        }
    }

    draw() {
        // c.fillStyle = 'red'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)

            c.save()
            c.globalAlpha = this.opacity
            c.drawImage(
                this.image,
                this.position.x,
                this.position.y,
                this.width,
                this.height
                )   
            c.restore()
    }

    update() {
        if (this.image) {
            this.draw()
            this.position.x +=  this.velocity.x
        }
        
    }
}


class Projectile {
    position: any
    velocity: any
    radius: number
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity

        this.radius = 3
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = 'red'
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class Projectile2 {
    position: any
    velocity: any
    radius: number
    constructor({position, velocity, radius}) {
        this.position = position
        this.velocity = velocity

        this.radius = radius
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = 'red'
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

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

class InvaderProjectile {
    position: any
    velocity: any
    radius: number
    width: number
    height: number
    big: boolean
    constructor({position, velocity, width, height, big}) {
        this.position = position
        this.velocity = velocity

        this.width = width
        this.height = height
        this.big = big
    }

    draw() {
        c.fillStyle = 'white'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class Invader {
    position: { x: number; y: number }
    velocity: { x: number; y: number }
    width: number
    height: number
    image: HTMLImageElement
    rotation: number
    constructor({position}) {
        this.velocity = {
            x: 0,
            y: 0
        }

        this.rotation = 0
        
        const image = new Image()
        image.src = "img/invader.png"
        image.onload = () => {
            const scale = 1
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: position.x,
                y: position.y
            }
        }
    }

    draw() {
        // c.fillStyle = 'red'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        
            c.drawImage(
                this.image,
                this.position.x,
                this.position.y,
                this.width,
                this.height
                )   
            if (this.position.y + this.height >= canvas.height-60){
            game.over = true
            loseCondition()
            }
    }

    update({velocity}) {
        if (this.image) {
            this.draw()
            this.position.x +=  velocity.x
            this.position.y +=  velocity.y
        }
    }

    shoot(InvaderProjectiles){
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
        }))
    }
}

class BigInvader {
    position: { x: number; y: number }
    velocity: { x: number; y: number }
    width: number
    height: number
    image: HTMLImageElement
    rotation: number
    HP: number
    constructor() {
        this.velocity = {
            x: 2,
            y: 0
        }
        this.position = {
            x: 0,
            y: 0
        }

        this.rotation = 0
        this.HP = 20
        
        const image = new Image()
        image.src = "img/bigInvader.png"
        image.onload = () => {
            const scale = 3
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position.x
            this.position.y
        }
    }

    draw() {
        // c.fillStyle = 'red'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        
            c.drawImage(
                this.image,
                this.position.x,
                this.position.y,
                this.width,
                this.height
                )   
            if (this.position.y + this.height >= canvas.height - 30){
            game.over = true
            loseCondition()
            }
    }

    update() {
        if (this.image) {
            this.draw()
            this.position.x +=  this.velocity.x
            this.position.y +=  this.velocity.y
        }

        this.velocity.y = 0

        if (this.position.x + this.width >= canvas.width || this.position.x < 0) {
            this.velocity.x = - this.velocity.x
            this.velocity.y += 60
        }
    }

    shoot(InvaderProjectiles){
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
        }))
    }
}

class Grid {
    position: { x: number; y: number }
    velocity: { x: number; y: number }
    invaders: any[]
    width: number
    constructor() {
        this.position = {
            x: 0,
            y: 0
        }

        this.velocity = {
            x: 2,
            y: 0
        }

        this.invaders = []

        const columns = Math.floor(Math.random() * 10 + 5)
        const rows = Math.floor(Math.random() * 5 + 2)

        this.width = columns * 30


        for (let x = 0; x < columns; x++) {
            for (let y = 0; y < rows; y++) {
                this.invaders.push(new Invader({
                    position: {
                    x: x * 30,
                    y: y * 30
                    }
                })
            )
            }
        }
    }

    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.velocity.y = 0

        if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
            this.velocity.x = -this.velocity.x
            this.velocity.y += 30
        }

        
    }
}

const player = new Player()
const player2 = new Player2()

const projectiles = []
const projectiles2 = []
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
    }
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

function animate() {
    if (!game.active) return
    requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width, canvas.height)
    player.update()
    player2.update()

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

        if (InvaderProjectile.position.y + InvaderProjectile.height >= player.position.y && InvaderProjectile.position.x + InvaderProjectile.width >= player.position.x && InvaderProjectile.position.x <= player.position.x + player.width) {
            InvaderProjectiles.splice(index, 1)
            if (InvaderProjectile.big) {
                HP-= 3
            } else {HP -= 1}
            playerhit(player, 'blue')
        }

        // Projectile hit player 2

        if (InvaderProjectile.position.y + InvaderProjectile.height >= player2.position.y && InvaderProjectile.position.x + InvaderProjectile.width >= player2.position.x && InvaderProjectile.position.x <= player2.position.x + player2.width) {

            InvaderProjectiles.splice(index, 1)
            if (InvaderProjectile.big) {
                HP-= 3
            } else {HP -= 1}
            playerhit(player2, 'white')
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

    if (keys.ArrowLeft.pressed && player2.position.x >= 0) {
        player2.velocity.x = -5
    } else if (keys.ArrowRight.pressed && player2.position.x + player2.width <= canvas.width) {
        player2.velocity.x = 5
    } else {
        player2.velocity.x = 0
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

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
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
            }))
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
        case ' ':
            // console.log('space')
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break;
    }
})