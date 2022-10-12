
class Projectile {
    position: any
    velocity: any
    radius: number
    color: string
    player_number: number
    constructor({position, velocity, color, player_number}) {
        this.position = position
        this.velocity = velocity
        this.color = color

        this.radius = 3
        this.player_number = player_number

    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
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
    opacity: number
    fades: boolean
    player_number: number
    constructor({position, velocity, radius, fades, player_number}) {
        this.position = position
        this.velocity = velocity

        this.radius = radius
        this.opacity = 1
        this.fades = fades

        this.player_number = player_number

    }

    draw() {
        c.save()
        c.globalAlpha = this.opacity
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = 'yellow'
        c.fill()
        c.closePath()
        c.restore()
    }
    
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
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
        c.fillStyle = 'lime'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}