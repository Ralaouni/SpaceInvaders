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
