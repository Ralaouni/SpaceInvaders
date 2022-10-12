class Invader {
    position: { x: number; y: number }
    velocity: { x: number; y: number }
    width: number
    height: number
    image: HTMLImageElement
    rotation: number
    HP: number;
    big: boolean;
    constructor({position, velocity, HP, scale, big}) {
        this.velocity = {
            x: velocity.x,
            y: velocity.y
        }
        this.position = {
            x: position.x,
            y: position.y
        }

        this.rotation = 0
        this.HP = HP
        this.big = big
        
        const image = new Image()
        image.src = "img/invader.png"
        image.onload = () => {
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
            if (this.position.y + this.height >= canvas.height - 60){
            game.over = true
            loseCondition()
            }
    }

    update({velocity}) {

        if (!this.big && this.image) {
            this.draw()
            this.position.x +=  velocity.x
            this.position.y +=  velocity.y
        } else {
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
    bigshoot(InvaderProjectiles){
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

class Monster {
    position: { x: number; y: number }
    velocity: { x: number; y: number }
    width: number
    height: number
    image: HTMLImageElement
    rotation: number
    HP: number
    constructor() {
        this.velocity = {
            x: 1,
            y: 0
        }
        this.position = {
            x: 0,
            y: 0
        }

        this.rotation = 0
        this.HP = 100
        
        const image = new Image()
        image.src = "img/biginvader_2_redim.png"
        image.onload = () => {
            this.image = image
            this.width = image.width
            this.height = image.height
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

    shoot({side}){
        InvaderProjectiles.push(new InvaderProjectile({
            position: {
                x: this.position.x + (this.width * side),
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
    bigshoot(InvaderProjectiles){
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
            x: 1.5,
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
                    },
                    velocity: {
                        x:0,
                        y:0
                    },
                    HP: 1,
                    scale: 1,
                    big: false
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



class FinalBoss {
    position: { x: number; y: number }
    velocity: { x: number; y: number }
    width: number
    height: number
    image: HTMLImageElement
    rotation: number
    HP: number
    constructor() {
        this.velocity = {
            x: 1,
            y: 0
        }
        this.position = {
            x: 0,
            y: 0
        }

        this.rotation = 0
        this.HP = 200*numPlayers
        
        const image = new Image()
        image.src = "img/Big_boss_redim.png"
        image.onload = () => {
            this.image = image
            this.width = image.width
            this.height = image.height
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
        }
    }

    shoot({side}){
        InvaderProjectiles.push(new InvaderProjectile({
            position: {
                x: this.position.x + (this.width * side),
                y: this.position.y + this.height
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
    bigshoot(InvaderProjectiles){
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
